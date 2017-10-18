Template.side_bar_left.helpers({
  conseillers: function() {
    return Conseilleres.find({}, {sort: {indice_confiance: -1}});
  },

  counter: function() {
  	var counters= [];
    var result= [];
    var counters = Conseilleres.find({}, {sort: {indice_confiance: -1}});
    counters.forEach(function(doc){
    result.push({name: doc.username, gender:doc.gender, user_id:doc.user_id, presentation:doc.presentation});
     var user = Meteor.users.findOne(doc.user_id);
	 var confiance = user.indice_confiance;

	$('.'+doc.user_id).raty({
	  score:confiance,
	  showHalf:  true,
	  readOnly:  true,
	});
    });
    return result;
  },

    true_value: function(n) {
    var m = n+1;
    return m;
  },

 /*  confiance_etoile: function(id) {
	var current_id = Router.current().params.post_author;
	 var user = Meteor.users.findOne(id);
	 var confiance = user.indice_confiance;

	$('.'+id).raty({
	  score:confiance,
	  showHalf:  true,
	  readOnly:  true,
	});
  },*/

});

/*Template.side_bar_left.onRendered = function(){
 var current_id = Router.current().params.post_author;
 var user = Meteor.users.findOne(this.user_id);
 var confiance = user.indice_confiance;
 
$('.'+this.user_id).raty({
  score:confiance,
  showHalf:  true,
  readOnly:  true,
});
   
  };*/




