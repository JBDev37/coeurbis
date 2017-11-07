Template.side_bar_left.helpers({
  conseillers: function() {
    Meteor.subscribe('conseilleres_acceuil');
    return Conseilleres.find({}, {sort: {indice_confiance: -1}, limit:2});
  },

  counter: function() {
  	var counters= [];
    var result= [];
    var counters = Conseilleres.find({}, {sort: {indice_confiance: -1}, limit:10});
    counters.forEach(function(doc){
    result.push({name: doc.username, gender:doc.gender, user_id:doc.user_id, presentation:doc.presentation, confiance:doc.indice_confiance});
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

    true_value: function(n) {
    var m = n+1;
    return m;
  },


});






