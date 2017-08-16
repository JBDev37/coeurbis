Template.classementComplet.helpers({

  classement: function() {
    var counters= [];
    var result= [];
    var counters = Conseilleres.find({}, {sort: {indice_confiance: -1}});
    counters.forEach(function(doc){
    result.push({name: doc.username, gender:doc.gender, user_id:doc.user_id, presentation:doc.presentation});
    });
    return result;
  },

    true_classement: function(n) {
    var m = n+1;
    return m;
  },

  

  });

