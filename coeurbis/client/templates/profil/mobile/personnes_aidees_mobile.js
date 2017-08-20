Template.personne_aide_mobile.helpers({
  liste_personne_mobile: function() {
     var userId = Meteor.userId();
    return Comments.find({userId:userId }, {sort: {submitted: -1}});
  }
});

Template.commentsItem_mobile.helpers({
  gender_fille: function() {
    var user = Meteor.users.findOne(this.post_author_id);
    var gender = user.profile.gender;
    if (gender =='fille') {
      return true;
    } else {
      return false;
    }
  },

  gender_garcon: function() {
    var user = Meteor.users.findOne(this.post_author_id);
    var gender = user.profile.gender;
    if (gender =='garcon') {
      return true;
    } else {
      return false;
    }
  },

});

Template.commentsItem_mobile.events({

     'click .profil_ami': function(e) {
    e.preventDefault();
     Router.go('messagerie_mobile', {post_author: this.post_author_id});
    }

});

Template.personne_aide_mobile.events({
   'click .retour': function(e) {
     window.history.back();
   }
});