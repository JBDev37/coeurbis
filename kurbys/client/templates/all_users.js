Template.all_users.helpers({
  user: function() {
    var search = Meteor.users.find();
    var counters = Conseilleres.find({}, {sort: {indice_confiance: -1}});
    return  search;
  },

    count_user: function() {
    var search = Meteor.users.find().count();
    return  search;

  },

    classement: function() {
    Meteor.subscribe('comments');
    Meteor.subscribe('contact_Chat_profil');
    Meteor.subscribe('conseilleres_acceuil');
  },
});



Template.ItemAll_user.events({

     'touchstart .profil_ami': function(e) {
    e.preventDefault();
     Router.go('messagerie', {post_author: this.from_id});
    },

     'click .profil_ami': function(e) {
    e.preventDefault();
     Router.go('messagerie', {post_author: this.from_id});
    },


});


Template.ItemAll_user.helpers({
  gender_fille: function() {
    var user = Meteor.users.findOne(this._id);
    var gender = user.profile.gender;
    if (gender =='fille') {
      return true;
    } else {
      return false;
    }
  },

  gender_garcon: function() {
    var user = Meteor.users.findOne(this._id);
    var gender = user.profile.gender;
    if (gender =='garcon') {
      return true;
    } else {
      return false;
    }
  },



});
