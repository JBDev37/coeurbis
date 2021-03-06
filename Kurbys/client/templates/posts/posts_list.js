Template.postsList.onCreated(function() {
  this.autorun(() => {
    /*this.subscribe('comments');
    this.subscribe('contact_Chat_profil');
    this.subscribe('posts');*/
    });
});

Template.classer.onCreated(function() {
  this.autorun(() => {
    /*this.subscribe('comments');
    this.subscribe('contact_Chat_profil');
    this.subscribe('posts');*/
    });
});

Template.postsList.helpers({
  posts: function() {
    var limit= Router.current().params.postsLimit;
    var theme = Router.current().params.theme;
    
    if(theme){
      return Posts.find({'categorie':theme}, {sort: {post_date: -1}});
    }else{
      return Posts.find({}, {sort: {post_date: -1}});
    }
  },

   


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

    'touchstart .upvotable': function(e) {
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

    'touchstart .signaler': function(e) {
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

    'click .signaler_mobile': function(e) {
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

    'touchstart .signaler_mobile': function(e) {
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

Template.classer.events({
  'submit form': function(e) {
    e.preventDefault();

   
      var amitie = $('input[type=radio][name=amitie]:checked').attr('value');
      var amour = $('input[type=radio][name=amour]:checked').attr('value');
      var confiance = $('input[type=radio][name=confiance]:checked').attr('value');
      var sexo = $('input[type=radio][name=sexo]:checked').attr('value');
      var autre = $('input[type=radio][name=autre]:checked').attr('value');
            
      if(amitie){
      Router.go('postsList', {postsLimit: 30, theme:amitie});
      $("input:radio").attr("checked", false);
          }

      if(amour){
      Router.go('postsList', {postsLimit: 30, theme:amour});
      $("input:radio").attr("checked", false);
          }

      if(confiance){
      Router.go('postsList', {postsLimit: 30, theme:confiance});
      $("input:radio").attr("checked", false);
          }

      if(sexo){
      Router.go('postsList', {postsLimit: 30, theme:sexo});
      $("input:radio").attr("checked", false);
          }

      if(autre){
      Router.go('postsList', {postsLimit: 30, theme:autre});
      $("input:radio").attr("checked", false);
          }

    
    
    
  },
  });

