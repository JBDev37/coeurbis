Template.classementComplet.helpers({

  classement: function() {
    Meteor.subscribe('comments');
    Meteor.subscribe('contact_Chat_profil');
    /*Meteor.subscribe('conseilleres_acceuil');*/
    var counters= [];
    var result= [];
    var counters = Conseilleres.find({}, {sort: {indice_confiance: -1}});
    counters.forEach(function(doc){
    result.push({name: doc.username, gender:doc.gender, user_id:doc.user_id, presentation:doc.presentation});
    var confiance = doc.indice_confiance;
    var user = doc.user_id;
    
    

    $('.'+user).raty({
    score:confiance,
    showHalf:  true,
    readOnly:  true,
    starHalf   : 'star-half.png',
    starOff    : 'star-off.png',
    starOn     : 'star-on.png'
  });

    });
    return result;


  },

    true_classement: function(n) {
    var m = n+1;
    return m;
  },








  

  });

