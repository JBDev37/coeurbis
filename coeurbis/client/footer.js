Template.footer.events({
  'click .profil_menu': function(e) {
  	var userId = Meteor.userId();
     Router.go('mon_profil', {_id: userId});
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
    var alertes = Alertes.find( { read: { $ne:userId }, author_id: { $ne:userId } }).count();

    var total = comment + friends + messages + commentaires + alertes;
    return total;
  },
});