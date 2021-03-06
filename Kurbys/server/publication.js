Meteor.publish('posts', function() {
  return Posts.find();
});


Meteor.publish('Singleposts', function(id) {
  return Posts.find(id);
});


Meteor.publish('users', function() {
  return Meteors.users.find({}, {
      fields:{ 
       username:1,
     }});
});



Meteor.publish('comments', function() {
  return Comments.find();
});


Meteor.publish('notifications', function() {
  var my_id = Meteor.userId();
  return Notifications.find({read: false});
});

Meteor.publish('histoires', function(id) {
  return Histoires.find({ "post_author": id });
});

Meteor.publish('all_histoires', function() {
  return Histoires.find();
});

Meteor.publish('requests', function() {
  
  return Requests.find();
});

Meteor.publish('friends', function() {
   var my_id = Meteor.userId();
  return Friends.find();
});



Meteor.publish('chat', function(id) {
   var my_id = Meteor.userId();
      return Chat.find({$or :[{from_id:id, to_id:my_id},{to_id:id, from_id:my_id}]});
});

Meteor.publish('all_chat', function() {
var my_id = Meteor.userId();
      return Chat.find({$or :[{to_id:my_id},{from_id:my_id}]});
});

Meteor.publish('chat_notif', function() {
  var my_id = Meteor.userId();
      return Chat.find({$or :[
        {from_id:my_id},
        {to_id:my_id},
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

Meteor.publish('conseilleres', function() {
  return Conseilleres.find();});

Meteor.publish('rejoindre', function() {
  return Rejoindre.find();});

Meteor.publish('conseilleres_right', function() {
  return Conseilleres.find({}, {
      fields:{ 
       gender:1,
       username:1,
       user_id:1,
       presentation:1,
       date:1,
       user_id:1,
     }});
});

Meteor.publish('conseilleres_left', function() {
  return Conseilleres.find({}, {
      fields:{ 
       gender:1,
       username:1,
       indice_confiance:1,
       user_id:1,
     }});
});

Meteor.publish('favoris', function(id) {
  return Favoris.find({ "id_user_add_favoris": id });
});

Meteor.publish('all_favoris', function() {
  return Favoris.find();
});

