Template.footer.events({
  'touchstart .profil_menu': function(e) {
  	var userId = Meteor.userId();
     /*Router.go('profil_mobile', {post_author: userId});*/

   }
});


Template.footer.helpers({

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

    var total = comment + friends + messages + commentaires
    return total;
  },

  id: function() {
    var userId = Meteor.userId();
    return  Meteor.users.find(userId);
  }
});