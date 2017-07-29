Meteor.publish('posts', function(options) {
return Posts.find();
});

Meteor.publish('users', function() {
  return Meteors.users.find();
});

Meteor.publish('comments', function() {
  return Comments.find();
});

Meteor.publish('notifications', function() {
  return Notifications.find({userId: this.userId, read: false});
});

Meteor.publish('histoires', function() {
  return Histoires.find();
});

