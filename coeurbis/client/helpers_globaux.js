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
   if(date){
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
   }
});

Template.registerHelper('date_contact_chat', function(date) {
  // affiche la date en francais
     if(date){
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
   }

});



Template.registerHelper('date_francais_heures', function(date) {
  // affiche la date en francais
   if(date){
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
   }
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

Template.registerHelper('is_fille_global', function() {
  var user = Meteor.user();
  var gender = user.profile.gender;
  if (gender =='fille') {
    return true;
  } else {
    return false;
  }
});

Template.registerHelper('is_garcon_global', function() {
  var user = Meteor.user();
  var gender = user.profile.gender;
  if (gender =='garcon') {
    return true;
  } else {
    return false;
  }
});

Template.registerHelper('is_garcon_conseillere', function(gender) {
  if (gender =='garcon') {
    return true;
  } else {
    return false;
  }
});

Template.registerHelper('is_fille_conseillere', function(gender) {
  if (gender =='fille') {
    return true;
  } else {
    return false;
  }
});

Template.registerHelper('breaklines', function(text) {
  if(text){
  text1 = text.replace(/(\r\n|\n|\r)/g, "<br>");
  return text1;}
});

Template.registerHelper('my_id', function(id) {
  if(Meteor.userId()==id){
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

Template.registerHelper('name_user', function() {
  var user = Meteor.users.findOne(this._id);
  var name = user.username;
  return name;

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
  if(userId==current_id){
    return false}
  else{
  var request = Meteor.users.findOne(current_id);
  return request.status.online;
  }
 

});

Template.registerHelper('user_online_conseillere', function(id) {
  var request = Meteor.users.findOne(id);
  return request.status.online;

});

Template.registerHelper("limite_caractere", function(text) {
  return text.substring(0, 30);
});

Template.registerHelper("limite_caractere_conseillere", function(text) {
  return text.substring(0, 200);
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


Template.registerHelper('user_IP', function() {
  var userId = Meteor.userId();
  var user = Meteor.user();
  var my_name = this.username;
  var search = Meteor.users.findOne(userId);
  var adress_ip = search.status.lastLogin.ipAddr;
  if(adress_ip){
  var count = Avertissement.find({user_id:userId}).count();
  if(count >2){
  var post = {
      User_id:userId,
      User_name:my_name,
      User_IP:adress_ip
    };
    var errors = validatePost(post);
    if (errors.User_id || errors.User_name)
      return Session.set('postSubmitErrors', errors);

    Meteor.call('bloquerUser_IP', post, function(error, result) { // on recherche la methode 'postInsert' 
            // affiche l'erreur à l'utilisateur et s'interrompt
            if (error)
                return throwError(error.reason);
            //Router.go('postPage', {_id: result._id});
        });
    var delet = Avertissement.findOne({user_id:userId});
    var id = delet._id;
    Avertissement.remove(id);

  }
}

});

Template.registerHelper("user_bloquer_url", function() {
  var userId = Meteor.userId();
  var search = Meteor.users.findOne(userId);
  var adress_ip = search.status.lastLogin.ipAddr;
  if(adress_ip){
  var user = UserBloquer_IP.findOne({User_IP :adress_ip});
  if(user){
    Router.go('contact');
    return true;
  }
  }
   
});

Template.registerHelper("is_conseiller", function() {
  var userId = Meteor.userId();
  var search = Conseilleres.findOne({user_id:userId});
  if(search){
    return true
  }
   
});

Template.registerHelper("is_conseiller_user", function(id) {
  var search = Conseilleres.findOne({user_id:id});
  if(search){
    return true
  }
   
});

Template.registerHelper("last_login_conseillere", function() {
  var userId = Meteor.userId();
  var search = Meteor.users.findOne(userId);
  var lastLogin = search.status.lastLogin.date;
  if(lastLogin){
  var conseillere = Conseilleres.findOne({user_id :userId});
  var conseillere_id = conseillere._id; 
   if(conseillere_id){
   Conseilleres.update( conseillere_id,  {$set: {lastLogin:lastLogin}});
   }
  }
});

Template.registerHelper("calcul_confiance", function(id) {
 var total = 0;
 var votant = 0;
 Comments.find({userId:id}).map(function(doc) {
  total += doc.votes;
})
 Comments.find({userId:id}).map(function(doc) {
  votant += doc.nbr_votant;
})

 var vote_up= ((votant - total)/2) + total
  
  if(total >0){
 var  result = (vote_up / votant)*5;

 Meteor.users.update(id, {$set:{indice_confiance:result}});

  var search = Conseilleres.findOne({user_id:id});
  if(search){
    Conseilleres.update(search._id, {$set:{indice_confiance:result}});
  }
}


  if(total <=0){
 var  result = 0;
 Meteor.users.update(id, {$set:{indice_confiance:result}});
 var search = Conseilleres.findOne({user_id:id});
  if(search){
    Conseilleres.update(search._id, {$set:{indice_confiance:result}});
  }
}
 
});


Template.registerHelper("confiance", function() {
 var current_id = Router.current().params.post_author;
 var user = Meteor.users.findOne(current_id);
 var confiance = user.indice_confiance;
 var round = confiance.toFixed(2);

 return round;
});


Template.registerHelper("etoile", function(id) {
   var user = Meteor.users.findOne(id);
   var confiance = user.indice_confiance;

  $('.'+id).raty({
    score:confiance,
    showHalf:  true,
    readOnly:  true,
  });
});

Template.registerHelper("status_conseiller", function(id) {
   var user = Conseilleres.findOne({user_id:id});
   if(user){
   var search = user.indice_confiance;
   var round = search.toFixed(2);
   var confiance = parseInt(round)
   
   if(confiance  < 2 ){
    return "Bronze";
   }

    if(confiance <3){
    return "Rubis";
   }

   if(confiance <4.5){
    return "Diamant";
   }

   if(confiance >4.5){
    return "Ange gardien";
   }
  }
});


Template.registerHelper("bronze", function(id) {
   var user = Conseilleres.findOne({user_id:id});
   if(user){
   var search = user.indice_confiance;
   var round = search.toFixed(2);
   var confiance = parseInt(round)
   
   if(confiance  < 2 ){
    return true;
   }

  }
});

Template.registerHelper("rubis", function(id) {
   var user = Conseilleres.findOne({user_id:id});
   if(user){
   var search = user.indice_confiance;
   var round = search.toFixed(2);
   var confiance = parseInt(round)
   
   if(confiance  < 3 ){
    return true;
   }

  }
});

Template.registerHelper("diamant", function(id) {
   var user = Conseilleres.findOne({user_id:id});
   if(user){
   var search = user.indice_confiance;
   var round = search.toFixed(2);
   var confiance = parseInt(round)
   
   if(confiance  < 4.5 ){
    return true;
   }

  }
});

Template.registerHelper("ange", function(id) {
   var user = Conseilleres.findOne({user_id:id});
   if(user){
   var search = user.indice_confiance;
   var round = search.toFixed(2);
   var confiance = parseInt(round)
   
   if(confiance  > 4.5 ){
    return true;
   }

  }
});

Template.registerHelper("user_not_disponible", function(id) {
    var search = Meteor.users.findOne(id);
    var disponible = search.disponible;
    if(disponible==false){
       return true;
    }
});

Template.registerHelper("date_last_connexion", function(id) {
    var userId = Meteor.userId();
    var search = Meteor.users.findOne(id);
    var last_connect = search.status.lastLogin.date;
    
    var today = new Date();

    var diff = {}                          
    var tmp = today - last_connect;
 
    tmp = Math.floor(tmp/1000);            
    diff.sec = tmp % 60;                  
 
    tmp = Math.floor((tmp-diff.sec)/60);    
    diff.min = tmp % 60;                   
 
    tmp = Math.floor((tmp-diff.min)/60);   
    diff.hour = tmp % 24;                   
     
    tmp = Math.floor((tmp-diff.hour)/24);   
    diff.day = tmp;

    var request = Meteor.users.findOne(id);
    if(request.status.online == true){
    	return 'En ligne';
    }else{
	    if(diff.day>1){
	     return 'Connecté il y a ' + diff.day + ' jours';
	    }

	    if(diff.day>0){
	     return 'Connecté il y a ' + diff.day + ' jour';
	    }

	    if(diff.hour>1){
	     return 'Connecté il y a ' + diff.hour + ' heures';
	    }

	    if(diff.hour>0){
	     return 'Connecté il y a ' + diff.hour + ' heure';
	    }

	    if(diff.min>1){
	     return 'Connecté il y a ' + diff.min + ' minutes';
	    }

	    if(diff.min>0){
	     return 'Connecté il y a ' + diff.min + ' minute';
	    }

	    if(diff.sec>1){
	     return 'Connecté il y a ' + diff.sec + ' secondes';
	    }

	    if(diff.sec>0){
	     return 'Connecté il y a ' + diff.sec + ' seconde';
	    }
    }

    
});



