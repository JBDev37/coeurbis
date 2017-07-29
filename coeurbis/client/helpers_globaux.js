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



