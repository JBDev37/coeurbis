Template.side_bar_right.helpers({
 
  New_conseillers: function() {
    Meteor.subscribe('conseilleres');
    return Conseilleres.find({},{sort: {date: -1}, limit:10});
  },

  counter: function() {
  	var counters= [];
    var result= [];
    var counters = Conseilleres.find({});
    counters.forEach(function(doc){
    result.push({name: doc.username, gender:doc.gender, user_id:doc.user_id, presentation:doc.presentation});
    });
    return result;
  },

    true_value: function(n) {
    var m = n+1;
    return m;
  },

});