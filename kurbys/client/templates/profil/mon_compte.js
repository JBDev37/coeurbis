Template.mon_compte.helpers({
  Dons_effectue: function() {
     var userId = Meteor.userId(); 
    return Dons.find({From_id:userId }, {sort: {date: -1}});
  },

    Dons_recus: function() {
     var userId = Meteor.userId(); 
    return Dons.find({To_id:userId }, {sort: {date: -1}});
  },

     count_don_effectue: function() {
     var userId = Meteor.userId(); 
     var total = 0;
     Dons.find({From_id:userId}).map(function(doc) {
     total += doc.don;
    });
    return total ;
  },

     count_don_recu: function() {
     var userId = Meteor.userId(); 
     var total = 0;
     Dons.find({To_id:userId}).map(function(doc) {
     total += doc.don;
    });
    return total ;
  },



});

Template.Dons_effectues.helpers({
  gender_fille: function(id) {
    var user = Meteor.users.findOne(id);
    var gender = user.profile.gender;
    if (gender =='fille') {
      return true;
    } else {
      return false;
    }
  },

  gender_garcon: function(id) {
    var user = Meteor.users.findOne(id);
    var gender = user.profile.gender;
    if (gender =='garcon') {
      return true;
    } else {
      return false;
    }
  },

});

Template.Dons_recu.helpers({
  gender_fille: function(id) {
    var user = Meteor.users.findOne(id);
    var gender = user.profile.gender;
    if (gender =='fille') {
      return true;
    } else {
      return false;
    }
  },

  gender_garcon: function(id) {
    var user = Meteor.users.findOne(id);
    var gender = user.profile.gender;
    if (gender =='garcon') {
      return true;
    } else {
      return false;
    }
  },
});

Template.Dons_effectues.events({

     'touchstart .profil_ami': function(e) {
    e.preventDefault();
     Router.go('messagerie', {post_author: this.To_id});
    },

      'click .profil_ami': function(e) {
    e.preventDefault();
     Router.go('messagerie', {post_author: this.To_id});
    },

});

Template.Dons_recu.events({

     'touchstart .profil_ami': function(e) {
    e.preventDefault();
     Router.go('messagerie', {post_author: this.From_id});
    },

      'click .profil_ami': function(e) {
    e.preventDefault();
     Router.go('messagerie', {post_author: this.From_id});
    },

});