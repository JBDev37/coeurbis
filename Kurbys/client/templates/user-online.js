Template.user_online.helpers({
  user: function() {
    var search = Meteor.users.find({"status.online" : true});
    return  search;
  },

    count_user: function() {
    var search = Meteor.users.find({"status.online" : true}).count();
    return  search;

  },

    classement: function() {
    Meteor.subscribe('comments');
    Meteor.subscribe('contact_Chat_profil');
    Meteor.subscribe('conseilleres_acceuil');
  },
});



Template.Itemvisites_user_online.events({

     'touchstart .profil_ami': function(e) {
    e.preventDefault();
     Router.go('messagerie', {post_author: this.from_id});
    },

     'click .profil_ami': function(e) {
    e.preventDefault();
     Router.go('messagerie', {post_author: this.from_id});
    },


});


Template.Itemvisites_user_online.helpers({
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
