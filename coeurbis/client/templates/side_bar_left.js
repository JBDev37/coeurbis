Template.side_bar_left.helpers({
  conseillers: function() {
    return Conseilleres.find({}, {sort: {date: -1}});
  },

  counter: function() {
  	var counters= [];
    var result= [];
    var counters = Conseilleres.find({}, {sort: {date: -1}});
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



