Template.ils_ont_aide.helpers({
  liste_personne_aide: function() {
     var userId = Meteor.userId();
    return Comments.find({post_author_id:userId}, {sort: {submitted: -1}});
  }
});