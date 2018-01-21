/*Template.personne_aide.onCreated(function() {
  var user= Router.current().params.post_author;
  this.autorun(() => {
    this.subscribe('comments');
    });
});*/


Template.personne_aide.helpers({
  liste_personne: function() {
     var userId =  Router.current().params.post_author;
    return Comments.find({userId:userId }, {sort: {submitted: -1}});
  },

     count_liste_personne: function() {
     var userId = Router.current().params.post_author;
    return Comments.find({userId:userId }).count() ;
  },

    visite_profil:function() {
  var current_id = Router.current().params.post_author;
  var userId = Meteor.userId();
  if(current_id!==userId){
   return "visite-profil"
  }else{
  }
  
  },

});

Template.commentsItem.helpers({
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

Template.commentsItem.events({

     'touchstart .profil_ami': function(e) {
    e.preventDefault();
     Router.go('messagerie', {post_author: this.post_author_id});
    },

      'click .profil_ami': function(e) {
    e.preventDefault();
     Router.go('messagerie', {post_author: this.post_author_id});
    },


});