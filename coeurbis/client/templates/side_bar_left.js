Template.side_bar_left.helpers({
  conseillers: function() {
    return Conseilleres.find({}, {sort: {date: -1}});
  }
});

Template.conseillerItem.helpers({
  counter: function() {
  	var counters= [];
  var result= [];
    var counters = Conseilleres.find({});
    counters.forEach(function(doc){
        
         
         result.push({name: doc.profile.counters.date});
    });
    return result;
  }
});

