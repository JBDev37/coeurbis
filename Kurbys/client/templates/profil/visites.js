Template.visites.onCreated(function() {
  var user= Router.current().params.post_author;
  this.autorun(() => {
    this.subscribe('visites');
    });
});


Template.visites.helpers({
  visites: function() {
  	var userId = Meteor.userId();
    return Visites.find({to_id:userId }, {sort: {post_date: -1}});
  },

    count_visites: function() {
    var userId = Router.current().params.post_author;
    return Visites.find({to_id:userId}).count();
  },
});



Template.Itemvisites.events({

     'touchstart .profil_ami': function(e) {
    e.preventDefault();
     Router.go('messagerie', {post_author: this.from_id});
    },

     'click .profil_ami': function(e) {
    e.preventDefault();
     Router.go('messagerie', {post_author: this.from_id});
    },


});


Template.Itemvisites.helpers({
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