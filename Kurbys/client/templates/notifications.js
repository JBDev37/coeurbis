Template.notifications.helpers({
  notifications: function() {
    return Notifications.find({userId: Meteor.userId(), read: false});
  },

  notificationFriends : function() {
    return Notifications.find({to_id: Meteor.userId(), read: false});
  },

  notificationMessages : function() {
   var userId = Meteor.userId();
   if( Router.current().route.getName() !=='messagerie'){
   return Chat.find({to_id:userId, read:false});}
  },

  notificationCommentaires : function() {
   var userId = Meteor.userId();
   return Commentaires.find({to_id:userId, read:false});
  },

  notificationAlertes : function() {
    var userId = Meteor.userId();
   return Alertes.find( { read: { $ne:userId }, author_id: { $ne:userId } });
  },

  dont_show_alertNot: function(id) {
    var my_id = Meteor.userId();
    search = DeleteAlertes.findOne({"id_alerte":id, "delete_from_id": my_id});
    if(!search)
    return true;
  },

  id_unique: function() {
    var my_id = Meteor.userId();
    var id = this._id;
    var unique = my_id + id;
    return unique;
  },

  notificationCount: function(){
    var userId = Meteor.userId();
    var comment = Notifications.find({userId: Meteor.userId(), read: false}).count();
    var friends = Notifications.find({to_id: Meteor.userId(), read: false}).count();
    var commentaires = Commentaires.find({to_id: Meteor.userId(), read: false}).count();
    if( Router.current().route.getName() !=='messagerie'){
    var messages = Chat.find({to_id:userId, read:false}).count();
    }else{
      var messages = 0;
    }
    var alertes = Alertes.find( { read: { $ne:userId }, author_id: { $ne:userId } }).count();
    var total = comment + friends + messages + commentaires + alertes;
    
    var title = "(" + total + ") " + "Kurbys"  ;
    DocHead.setTitle(title);
   
    return total;
  },


});

Template.notificationItem.helpers({
  notificationPostPath: function() {
    return Router.routes.postPage.path({_id: this.postId});
  }
});

Template.notificationItemFriends.helpers({
   notificationPostPathFriend: function() {
    return Router.routes.profil.path({post_author: this.from_id});
  }
});

Template.notificationItem.events({
  'touchstart a': function() {
    Notifications.update(this._id, {$set: {read: true}});
  },

  'click a': function() {
    Notifications.update(this._id, {$set: {read: true}});
  }
});

Template.notificationItemMessages.helpers({
  notificationPathMessage: function() {
    return Router.routes.messagerie.path({post_author: this.from_id});
  },

});

Template.notificationItemCommentaires.events({
  'touchstart .comm': function() {
    Commentaires.update(this._id,{$set:{read:true}})
    //Router.routes.profil.path({post_author: this.to_id});
    Router.go('presentation', {_id: this.to_id});
  },

    'click .comm': function() {
    Commentaires.update(this._id,{$set:{read:true}})
    //Router.routes.profil.path({post_author: this.to_id});
    Router.go('presentation', {_id: this.to_id});
  },

  'touchstart .comm_mobile': function() {
    Commentaires.update(this._id,{$set:{read:true}})
    //Router.routes.profil.path({post_author: this.to_id});
    Router.go('commentaires_mobile', {_id: this.to_id});
  },

  'click .comm_mobile': function() {
    Commentaires.update(this._id,{$set:{read:true}})
    //Router.routes.profil.path({post_author: this.to_id});
    Router.go('commentaires_mobile', {_id: this.to_id});
  },
}); 

Template.notificationAlertesItem.events({
  'touchstart .Une_alerte': function() {
    var my_id = Meteor.userId();
    var id = this._id;
    var unique = my_id + id;
      Alertes.update(id, {$addToSet: {read: my_id}});
    //document.getElementById(unique).style.display = "none";
    Router.go('mon_profil', {_id: my_id});
  },

  'click .Une_alerte': function() {
    var my_id = Meteor.userId();
    var id = this._id;
    var unique = my_id + id;
      Alertes.update(id, {$addToSet: {read: my_id}});
    //document.getElementById(unique).style.display = "none";
    Router.go('mon_profil', {_id: my_id});
  },
}); 

Template.notificationItemFriends.events({
  'touchstart .oui': function(e) {
    e.preventDefault();
    var from_id = this.from_id;
    var name_from_id = Meteor.users.findOne(this.from_id);
    var username = name_from_id.username;
    var user = Meteor.user();
    
    var post = {
      from_id: from_id,
      name_from_id: name_from_id,
      to_id: user._id,
      name_to_id: user.username
    };

    var errors = validatePost(post);
    if (errors.from_id || errors.to_id)
      return Session.set('postSubmitErrors', errors);
    
    Meteor.call('delete_request', post, function(error, result) { // on recherche la methode 'postInsert' 
            // affiche l'erreur à l'utilisateur et s'interrompt
            if (error)
                return throwError(error.reason);
            //Router.go('postPage', {_id: result._id});
        });
   
    Meteor.call('ami_accepte', post, function(error, result) { // on recherche la methode 'postInsert' 
            // affiche l'erreur à l'utilisateur et s'interrompt
            if (error)
                return throwError(error.reason);
            //Router.go('postPage', {_id: result._id});
        });

    Notifications.update(this._id, {$set: {read: true}});
  },

    'click .oui': function(e) {
    e.preventDefault();
    var from_id = this.from_id;
    var name_from_id = Meteor.users.findOne(this.from_id);
    var username = name_from_id.username;
    var user = Meteor.user();
    
    var post = {
      from_id: from_id,
      name_from_id: name_from_id,
      to_id: user._id,
      name_to_id: user.username
    };

    var errors = validatePost(post);
    if (errors.from_id || errors.to_id)
      return Session.set('postSubmitErrors', errors);
    
    Meteor.call('delete_request', post, function(error, result) { // on recherche la methode 'postInsert' 
            // affiche l'erreur à l'utilisateur et s'interrompt
            if (error)
                return throwError(error.reason);
            //Router.go('postPage', {_id: result._id});
        });
   
    Meteor.call('ami_accepte', post, function(error, result) { // on recherche la methode 'postInsert' 
            // affiche l'erreur à l'utilisateur et s'interrompt
            if (error)
                return throwError(error.reason);
            //Router.go('postPage', {_id: result._id});
        });

    Notifications.update(this._id, {$set: {read: true}});
  },

  'touchstart .non': function() {
    Requests.remove({"from_id": from_id , "to_id":user._id });
    Requests.remove({"from_id": user._id , "to_id":from_id });
    Notifications.update(this._id, {$set: {read: true}});
  },

    'click .non': function() {
    Requests.remove({"from_id": from_id , "to_id":user._id });
    Requests.remove({"from_id": user._id , "to_id":from_id });
    Notifications.update(this._id, {$set: {read: true}});
  }
});

