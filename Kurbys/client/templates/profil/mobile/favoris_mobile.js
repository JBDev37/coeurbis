Template.favoris_mobile.onCreated(function() {
  var user= Router.current().params.post_author;
  this.autorun(() => {
    this.subscribe('favoris',user);
    });
});


Template.favoris_mobile.helpers({
mes_favoris: function() {
    var userId = Meteor.userId();
    return Favoris.find({id_user_add_favoris:userId }, {sort: {post_date: -1}});
  }
});

Template.favoris_mobile.events({
  'touchstart .retour': function(e) {
     window.history.back();
   }
});


Template.ItemFavoris_mobile.events({

    'click .supprimer_favoris_mobile': function(e) {
    e.preventDefault();
    Favoris.remove(this._id);
    },

    'touchstart .supprimer_favoris_mobile': function(e) {
    e.preventDefault();
    Favoris.remove(this._id);
    },

});


Template.ItemFavoris_mobile.helpers({
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