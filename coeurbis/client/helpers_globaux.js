Template.registerHelper('pluralize', function(n, thing) {
  // pluraliser assez simpliste
  if (n < 2) {
    return n +' ' + thing;
  } else {
    return n + ' ' + thing + 's';
  }
});

Template.registerHelper('date_francais', function(date) {
  // affiche la date en francais
   var jours = new Array("dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi");
   var mois = new Array("janvier", "fevrier", "mars", "avril", "mai", "juin", "juillet", "aout", "septembre", "octobre", "novembre", "decembre");
   // on recupere la date
   var date_fr = new Date(date);
   // on construit le message
   /*affiche_date = jours[date.getDay()] + " ";   // nom du jour*/
   var affiche_date = date.getDate(date_fr) + " ";   // numero du jour
   affiche_date += mois[date_fr.getMonth()] + " ";   // mois
   affiche_date += date_fr.getFullYear();

   var heure = date_fr.getHours();
   var minutes = date_fr.getMinutes();
   if(minutes < 10){
        minutes = "0" + minutes;
   }
 
   return affiche_date;

});

Template.registerHelper('date_contact_chat', function(date) {
  // affiche la date en francais
   var jours = new Array("dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi");
   var mois = new Array("janvier", "fevrier", "mars", "avril", "mai", "juin", "juillet", "aout", "septembre", "octobre", "novembre", "decembre");
   // on recupere la date
   var date_fr = new Date(date);
   // on construit le message
   /*affiche_date = jours[date.getDay()] + " ";   // nom du jour*/
   var jours = date.getDate(date_fr);
   if(jours< 10){
        jours = "0" + jours;
   }

   var mois = date_fr.getMonth()+1;   // mois
   if(mois< 10){
        mois = "0" + mois;
   }

   var annee = date_fr.getFullYear();

   var heure = date_fr.getHours();
   var minutes = date_fr.getMinutes();
   if(minutes < 10){
        minutes = "0" + minutes;
   }
   la_date = jours+"/"+mois+"/" +annee+" " +heure + "h" + minutes;
   return la_date;

});



Template.registerHelper('date_francais_heures', function(date) {
  // affiche la date en francais
   var jours = new Array("dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi");
   var mois = new Array("janvier", "fevrier", "mars", "avril", "mai", "juin", "juillet", "aout", "septembre", "octobre", "novembre", "decembre");
   // on recupere la date
   var date_fr = new Date(date);
   // on construit le message
   /*affiche_date = jours[date.getDay()] + " ";   // nom du jour*/
   var affiche_date = date.getDate(date_fr) + " ";   // numero du jour
   affiche_date += mois[date_fr.getMonth()] + " ";   // mois
   affiche_date += date_fr.getFullYear();

   var heure = date_fr.getHours();
   var minutes = date_fr.getMinutes();
   if(minutes < 10){
        minutes = "0" + minutes;
   }
   la_date = affiche_date +" " +heure + "h" + minutes;
   return la_date;

});


Template.registerHelper('count', function(votes) {
  // pluraliser assez simpliste
  if (votes > 0) {
    return '+' + votes;
  } else {
    return votes;
  }
});

Template.registerHelper('is_fille', function(sexe) {
  // on recherche le sexe de l'utilisateur
  if (sexe =='fille') {
    return true;
  } else {
    return false;
  }
});

Template.registerHelper('is_garcon', function(sexe) {
  // on recherche le sexe de l'utilisateur
  if (sexe =='garcon') {
    return true;
  } else {
    return false;
  }
});

Template.registerHelper('breaklines', function(text) {
  text1 = text.replace(/(\r\n|\n|\r)/g, "<br>");
  return text1;
});

Template.registerHelper('my_id', function(id) {
  if(Meteor.userId()==this._id){
  return true; }
});

Template.registerHelper('is_friends', function(id) {
   var my_id = Meteor.userId();
   var request = Friends.findOne({"from_id": my_id , "to_id":id });
   var request1 = Friends.findOne({"from_id": id, "to_id":my_id });

  if(request1 || request){
  return true; }
});

Template.registerHelper('mon_message', function(id) {
   var my_id = Meteor.userId();
  if(my_id == id){
  return true; }
});

Template.registerHelper('message_read', function(from_id) {
   var current_id = Router.current().params.post_author;
   var my_id = Meteor.userId();
  var contact = ContactChat.findOne({$or : [{from_id: my_id, to_id:from_id }, {to_id:my_id,from_id:from_id}]});

  if(from_id == current_id){
     Chat.update(this._id,  {$set: {read:true}});
     
   } else{
    ContactChat.update(contact._id,  {$set: {read:true}});
   }
});

Template.registerHelper('not_read', function() {
   var userId = Meteor.userId();
  if(this.to_id == userId){
    id=this.from_id
  }else {id=this.to_id}
   var contact = Chat.find({from_id: id, to_id:userId, read:false}).count();

  if(contact>0){
    return true;
  }
});


Template.registerHelper('id_contact', function() {
  var userId = Meteor.userId();
  if(this.to_id == userId){
    id=this.from_id
  }else {id=this.to_id}
    return id;
});



Template.registerHelper('is_bloquer', function(id) {
    var userId = Meteor.userId();
    var to_id = id;
    var request = UserBloquer.findOne({"from_id":id, "to_id":userId });
    if (request) { 
      return true;
    } 
    else {
      return false;
    }
});

Template.registerHelper('my_name', function(name) {
  var user = Meteor.user();
  var my_name = user.username;
  if(my_name==name){
    return true;
  }
});


Template.registerHelper('scroll_bottom', function() {
    var element = document.getElementById('msgbox');
    element.scrollTop = element.scrollHeight - element.clientHeight;
   return element.scrollTop;
});

Template.registerHelper('current_chat_from', function(id) {

    var request = ContactChat.findOne({"_id":id, "id_from_active":true });
    if(request){
   return true  ;}
});

Template.registerHelper('current_chat_to', function(id) {

    var request = ContactChat.findOne({"_id":id, "id_to_active":true });
    if(request){
   return true  ;}
});

Template.registerHelper('not_current_user', function(id) {
   var current_id = Router.current().params.post_author;

    var userId = Meteor.userId();
    var user = ContactChat.findOne({$or : [{from_id: userId, to_id:current_id, _id:id }, {to_id:userId,from_id:current_id,_id:id  }]});
 if (!user) {
 return true;}
});

Template.registerHelper('current_user', function(id) {
  
   var current_id = Router.current().params.post_author;

    var userId = Meteor.userId();
    var user = ContactChat.findOne({$or : [{from_id: userId, to_id:current_id, _id:id }, {to_id:userId,from_id:current_id,_id:id  }]});
 if (user) {
 return true;}
  
});

Template.registerHelper('user_online_chat', function(current_id) {
  var userId = Meteor.userId();
  var user = ContactChat.findOne({$or : [{from_id: userId, to_id:current_id}, {to_id:userId,from_id:current_id }]});

  if(userId==user.from_id){
    var id=user.to_id; }
  else{
    var id=user.from_id;
  }
  var request = Meteor.users.findOne(id);
  return request.status.online;

});

Template.registerHelper("limite_caractere", function(text) {
  return text.substring(0, 30);
});

Template.registerHelper("url_contact", function() {
  var userId = Meteor.userId();
  var current_id = Router.current().params.post_author;
  var user = ContactChat.findOne({$or : [{from_id: userId, to_id:current_id}, {to_id:userId,from_id:current_id }]});

  if(userId==user.from_id){id=user.to_id
  }
    else{id=user.from_id}
  return id;
});



