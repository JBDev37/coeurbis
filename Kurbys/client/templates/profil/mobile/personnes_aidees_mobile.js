Template.personne_aide_mobile.onCreated(function() {
  var user= Router.current().params.post_author;
  this.autorun(() => {
    this.subscribe('comments');
    });
});


Template.personne_aide_mobile.helpers({
  liste_personne_mobile: function() {
     var userId = Meteor.userId();
    return Comments.find({userId:userId }, {sort: {submitted: -1}});
  },

    liste_personne_user: function() {
     var userId = Router.current().params.post_author;
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

     'touchstart .profil_ami': function(e) {
    e.preventDefault();
     Router.go('messagerie_mobile', {post_author: this.post_author_id});
    }

});

Template.personne_aide_mobile.events({
   'touchstart .retour': function(e) {
     window.history.back();
   }
});