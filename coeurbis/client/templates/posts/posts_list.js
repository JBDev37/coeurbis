Template.postsList.helpers({
  posts: function() {
    return Posts.find({}, {sort: {post_date: -1}});
  }
});

Template.postItem.helpers({
	ownPost: function() {
    return this.post_author=== Meteor.userId();
  },
  domain: function() {
    var a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  },
  commentsCount: function() {
    return Comments.find({postId: this._id}).count();
  },

  upvotedClass: function() {
    var userId = Meteor.userId();
    if (userId && !_.include(this.upvoters, userId)) {
      return 'btn-primary upvotable';
    } else {
      return 'disabled';
    }
  },

    deja_signale: function() {
    var userId = Meteor.userId();
    var to_id = this.post_author;
    var request = Signaler.findOne({"id_post":this._id,"id_author": to_id , "signaler_par_id":userId });
    if (request) { 
      return 'disabled';
    } 
    else {
      return 'rien';
    }
  },

    text_signale: function() {
    var userId = Meteor.userId();
    var to_id = this.post_author;
    var request = Signaler.findOne({"id_post":this._id,"id_author": to_id , "signaler_par_id":userId });
    if (request) { 
      return 'Message signalé';
    } 
    else {
      return 'Signaler';
    }
  },

    supprimer_message: function(id) {//on supprime les message signalé 3 fois
    var request = Signaler.find({"id_post":id}).count();
    if (request>2) { 
            var userId = this.post_author;
            var date = new Date();
            Avertissement.insert({user_id:userId,date:date});
            Posts.remove(id);
    } 
  },

});


Template.postItem.events({
  'click .upvotable': function(e) {
    e.preventDefault();
    Meteor.call('upvote1', this._id);
  },

  /*'click .private_message': function(e) {
    e.preventDefault();

    var user = Meteor.user();
    var userId = Meteor.userId();
    var to_id = this.post_author;
    var request = ContactChat.findOne({$or : [{from_id: userId, to_id:to_id}, {from_id: to_id, to_id:userId}]});
    if(to_id){
        if (request) {
               ContactChat.update(request._id, {$set: {show:true} }, function(error) {
              if (error) {
               return throwError(error.reason);
              } else {}
              });
             }
           }

    Router.go('messagerie', {post_author: this.post_author});
  },*/


  'click .signaler': function(e) {
    e.preventDefault();
      var userId = Meteor.userId();
      var to_id = this.post_author;
      var post = {
      id_post:this._id,
      id_author:this.post_author,
      signaler_par_id:userId,
    };
    var request = Signaler.findOne({"id_post":this._id,"id_author": to_id , "signaler_par_id":userId });
    if(!request){
    var errors = validatePost(post);
    if (errors.id_post || errors.id_author)
      return Session.set('postSubmitErrors', errors);

    Meteor.call('signaler_message', post, function(error, result) { // on recherche la methode 'postInsert' 
            // affiche l'erreur à l'utilisateur et s'interrompt
            if (error)
                return throwError(error.reason);
            //Router.go('postPage', {_id: result._id});
        });
  }
  },


});