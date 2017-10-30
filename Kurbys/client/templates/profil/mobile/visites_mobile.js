Template.visites_mobile.helpers({
  visites_mobile: function() {
  	var userId = Meteor.userId();
    return Visites.find({to_id:userId }, {sort: {post_date: -1}});
  }
});

Template.visites_mobile.events({
  'touchstart .retour': function(e) {
     window.history.back();
   }
});


Template.Itemvisites_mobile.events({

     'touchstart .profil_ami': function(e) {
    e.preventDefault();
     Router.go('messagerie_mobile', {post_author: this.from_id});
    }

});


Template.Itemvisites_mobile.helpers({
  gender_fille: function() {
    var user = Meteor.users.findOne(this.from_id);
    var gender = user.profile.gender;
    if (gender =='fille') {
      return true;
    } else {
      return false;
    }
  },

  gender_garcon: function() {
    var user = Meteor.users.findOne(this.from_id);
    var gender = user.profile.gender;
    if (gender =='garcon') {
      return true;
    } else {
      return false;
    }
  },

    presentation: function() {
     var user = Meteor.users.findOne(this.from_id);
    var presentation = user.profile.presentation;
      return presentation;
  }

});