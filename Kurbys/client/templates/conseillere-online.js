Template.conseiller_online.helpers({
  conseillere: function() {
    return Conseilleres.find({online:true});
  },

    classement: function() {
    Meteor.subscribe('comments');
    Meteor.subscribe('contact_Chat_profil');
    Meteor.subscribe('conseilleres_acceuil');
  },
});



Template.Itemvisites_online.events({

     'touchstart .profil_ami': function(e) {
    e.preventDefault();
     Router.go('messagerie', {post_author: this.from_id});
    },

     'click .profil_ami': function(e) {
    e.preventDefault();
     Router.go('messagerie', {post_author: this.from_id});
    },


});


Template.Itemvisites_online.helpers({
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
