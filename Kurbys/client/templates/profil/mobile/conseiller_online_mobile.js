Template.conseiller_online_mobile.helpers({
  conseillere: function() {
    return Conseilleres.find({online:true});
  },

});

Template.conseiller_online_mobile.events({
  'touchstart .retour': function(e) {
     window.history.back();
   }
});

Template.Itemvisites_online_mobile.events({

     'touchstart .profil_ami': function(e) {
    e.preventDefault();
     Router.go('messagerie_mobile', {post_author: this.from_id});
    },

     'click .profil_ami': function(e) {
    e.preventDefault();
     Router.go('messagerie_mobile', {post_author: this.from_id});
    },


});


Template.Itemvisites_online_mobile.helpers({
  gender_fille: function() {
    var user = Meteor.users.findOne(this.user_id);
    var gender = user.profile.gender;
    if (gender =='fille') {
      return true;
    } else {
      return false;
    }
  },

  gender_garcon: function() {
    var user = Meteor.users.findOne(this.user_id);
    var gender = user.profile.gender;
    if (gender =='garcon') {
      return true;
    } else {
      return false;
    }
  },



});
