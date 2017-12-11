Template.mes_favoris.helpers({
  mes_favoris: function() {
  	var userId = Meteor.userId();
    return Favoris.find({id_user_add_favoris:userId }, {sort: {post_date: -1}});
  },

  count_favoris:function() {
  var current_id = Router.current().params.post_author;
  return Favoris.find({ id_user_add_favoris:current_id}).count();
  },
});



Template.ItemFavoris.events({

    'click .supprimer_favoris': function(e) {
    e.preventDefault();
    Favoris.remove(this._id);
    },

    'touchstart .supprimer_favoris': function(e) {
    e.preventDefault();
    Favoris.remove(this._id);
    },


});


Template.ItemFavoris.helpers({
  gender_fille: function() {
    var user = Meteor.users.findOne(this.id_author);
    var gender = user.profile.gender;
    if (gender =='fille') {
      return true;
    } else {
      return false;
    }
  },

  gender_garcon: function() {
    var user = Meteor.users.findOne(this.id_author);
    var gender = user.profile.gender;
    if (gender =='garcon') {
      return true;
    } else {
      return false;
    }
  },


});