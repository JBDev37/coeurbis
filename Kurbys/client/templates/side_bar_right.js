Template.side_bar_right.helpers({
 
  New_conseillers: function() {
    Meteor.subscribe('conseilleres_right');
    return Conseilleres.find({},{sort: {date: -1}, limit:10});
  },



});