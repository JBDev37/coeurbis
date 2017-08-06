Template.personne_aide.helpers({
  liste_personne: function() {
     var userId = Meteor.userId();
    return Comments.find({userId:userId }, {sort: {submitted: -1}});
  }
});