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

  notificationCount: function(){
    var userId = Meteor.userId();
    var comment = Notifications.find({userId: Meteor.userId(), read: false}).count();
    var friends = Notifications.find({to_id: Meteor.userId(), read: false}).count();
    if( Router.current().route.getName() !=='messagerie'){
    var messages = Chat.find({to_id:userId, read:false}).count();
    }
    var total = comment + friends + messages;
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
  'click a': function() {
    Notifications.update(this._id, {$set: {read: true}});
  }
});

Template.notificationItemMessages.helpers({
  notificationPathMessage: function() {
    return Router.routes.messagerie.path({post_author: this.from_id});
  },

});

Template.notificationItemFriends.events({
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

  'click .non': function() {
    Requests.remove({"from_id": from_id , "to_id":user._id });
    Requests.remove({"from_id": user._id , "to_id":from_id });
    Notifications.update(this._id, {$set: {read: true}});
  }
});

