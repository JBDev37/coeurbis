Template.ils_ont_aide_mobile.helpers({
  liste_personne_aide_mobile: function() {
     var userId = Meteor.userId();
    return Comments.find({post_author_id:userId}, {sort: {submitted: -1}});
  }
});

Template.ils_ont_aide_mobile.events({
     'touchstart .profil_ami': function(e) {
      e.preventDefault();
     Router.go('messagerie_mobile', {post_author: this.userId});
    },

    'touchstart .retour': function(e) {
     window.history.back();
   }
   
});


Template.commentsItemAide_mobile.helpers({
  gender_fille: function() {
    var user = Meteor.users.findOne(this.userId);
    var gender = user.profile.gender;
    if (gender =='fille') {
      return true;
    } else {
      return false;
    }
  },

  gender_garcon: function() {
    var user = Meteor.users.findOne(this.userId);
    var gender = user.profile.gender;
    if (gender =='garcon') {
      return true;
    } else {
      return false;
    }
  },

});