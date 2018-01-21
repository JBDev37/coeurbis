/*Template.ils_ont_aide.onCreated(function() {
  this.autorun(() => {
    this.subscribe('comments');
    });
});*/

Template.ils_ont_aide.helpers({
  liste_personne_aide: function() {
     var userId = Meteor.userId();
    return Comments.find({post_author_id:userId}, {sort: {submitted: -1}});
  },

      count_liste_personne_aide: function() {
     var userId = Router.current().params.post_author;
    return Comments.find({post_author_id:userId}).count();
  },
  
});




Template.commentsItemAide.events({

     'touchstart .profil_ami': function(e) {
    e.preventDefault();
     Router.go('messagerie', {post_author: this.userId});
    },


     'click .profil_ami': function(e) {
    e.preventDefault();
     Router.go('messagerie', {post_author: this.userId});
    }

});

Template.commentsItemAide.helpers({
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