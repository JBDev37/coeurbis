/*Template.side_bar_right.onCreated(function() {
  var user= Router.current().params.post_author;
  this.autorun(() => {
    this.subscribe('conseilleres_right');
    });
});*/


Template.side_bar_right.helpers({
 
  New_conseillers: function() {

    return Conseilleres.find({},{sort: {date: -1}, limit:10});
  },



});