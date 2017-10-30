Template.supprimer_mon_compte.events({
  'touchstart .suprim_compte': function(e) {
    e.preventDefault();
      
     
      var userId = Meteor.userId();
      Meteor.users.remove(userId);
      
      var search = Conseilleres.findOne({user_id:userId});
      if(search){
         Conseilleres.remove(search._id);
      }

      /*var contact1 = ContactChat.find({from_id :userId})
      ContactChat.remove({from_id :userId});
      ContactChat.remove({to_id :userId});*/

      Router.go('index');
      
      

      
  },


});