Template.postPage.helpers({
  comments: function() {
    return Comments.find({postId: this._id},{sort: {submitted: -1}} );
  }
});

Template.commentItem.helpers({
  submittedText: function() {
    return this.submitted.toString();
  },

  upvotedClass: function() {
    var userId = Meteor.userId();
    if (userId && !_.include(this.upvoters, userId)) {
      return 'upvotable';
    } else {
      return 'disabled';
    }
  },

  downvotedClass: function() {
    var userId = Meteor.userId();
    if (userId && !_.include(this.upvoters, userId)) {
      return 'downvotable';
    } else {
      return 'disabled';
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

});

Template.postContent.helpers({
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
  downvotedClass: function() {
    var userId = Meteor.userId();
    if (userId && !_.include(this.upvoters, userId)) {
      return 'btn-primary upvotable';
    } else {
      return 'disabled';
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

});




Template.postContent.events({
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


Template.commentItem.events({
  'click .upvotable': function(e) {
    e.preventDefault();
    Meteor.call('upvote', this._id);
  },

  'click .downvotable': function(e) {
    e.preventDefault();
    Meteor.call('downvote', this._id);
  },


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