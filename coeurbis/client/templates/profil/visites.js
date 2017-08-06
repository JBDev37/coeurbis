Template.visites.helpers({
  visites: function() {
  	var userId = Meteor.userId();
    return Visites.find({to_id:userId }, {sort: {post_date: -1}});
  }
});