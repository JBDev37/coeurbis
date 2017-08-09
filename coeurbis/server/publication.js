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

Meteor.publish('requests', function() {
  return Requests.find();
});

Meteor.publish('friends', function() {
  return Friends.find();
});

Meteor.publish('chat', function() {
  return Chat.find();
});

Meteor.publish('userBloquer', function() {
  return UserBloquer.find();
});

Meteor.publish('contact_Chat', function() {
  return ContactChat.find();
});

Meteor.publish("userStatus", function() {
  return Meteor.users.find({ "status.online": true });
});

Meteor.publish("visites", function() {
    return Visites.find();
});

Meteor.publish('commentaires', function() {
  return Commentaires.find();
});

Meteor.publish('messages_signaler', function() {
  return Signaler.find();
});

Meteor.publish('avertissement_user', function() {
  return Avertissement.find();
});

Meteor.publish("userIP", function() {
  return Meteor.users.find({ "status.lastLogin.ipAddr": true });
});

Meteor.publish('user_bloquer_IP', function() {
  return UserBloquer_IP.find();
});

Meteor.publish('alertes', function() {
  return Alertes.find();
});
