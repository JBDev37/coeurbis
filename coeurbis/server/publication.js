Meteor.publish('posts', function() {
  return Posts.find();
});

Meteor.publish('users', function() {
  return Meteors.users.find();
});

Meteor.publish('comments', function() {
  return Comments.find();
});