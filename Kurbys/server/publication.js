Meteor.publish('posts', function(options) {
  return Posts.find({}, options);
});


Meteor.publish('Singleposts', function(id) {
  return Posts.find(id);
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

Meteor.publish('chat', function(id) {
   var my_id = Meteor.userId();
      return Chat.find({$or :[
        {from_id:id, to_id:my_id},
        {to_id:id, from_id:my_id},
    ]});
});

Meteor.publish('chat_notif', function(id) {
      return Chat.find({$or :[
        {from_id:id },
        {to_id:id},
    ]});
});


Meteor.publish('userBloquer', function() {
  return UserBloquer.find();
});

Meteor.publish('contact_Chat', function() {
 var id = Meteor.userId();
 return ContactChat.find({$or :[
        {from_id:id},
        {to_id:id},
    ]});
});

Meteor.publish('contact_Chat_profil', function() {
 return ContactChat.find();
});

Meteor.publish("userStatus", function() {
  return Meteor.users.find({ "status.online": true });
});

Meteor.publish("password", function() {
  return Meteor.users.find({ "services.password.bcrypt": true });
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
  return Meteor.users.find({},{ "status.lastLogin.ipAddr": true });
});

Meteor.publish("lastlogin", function() {
  return Meteor.users.find({},{ "status.lastLogin.date": true });
});

Meteor.publish('user_bloquer_IP', function() {
  return UserBloquer_IP.find();
});

Meteor.publish('alertes', function() {
  return Alertes.find();
});

Meteor.publish('delete_alertes', function() {
  return DeleteAlertes.find();
});

Meteor.publish('conseilleres_acceuil', function() {
  return Conseilleres.find({},{limit:10});
});

Meteor.publish('conseilleres', function() {
  return Conseilleres.find();
});

Meteor.publish('favoris', function() {
  return Favoris.find();
});

