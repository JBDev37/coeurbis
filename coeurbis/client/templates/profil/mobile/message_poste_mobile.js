Template.messages_poste_mobile.helpers({
  mes_messages_mobile: function() {
     var userId = Meteor.userId();
    return Posts.find({post_author:userId }, {sort: {post_date: -1}});
  }
});

Template.messages_poste_mobile.events({
  'click .retour': function(e) {
     window.history.back();
   }
});


Template.messagePosteItem_mobile.events({

     'click .profil_ami': function(e) {
     e.preventDefault();
     Router.go('postPage', {_id: this._id});
    },

    'click .supprimer_ami': function(e) {
    e.preventDefault();
    Posts.remove(this._id);
    },

});

/*Template.messages_poste_mobile.events({

     'click .profil_ami': function(e) {
      e.preventDefault();
     Router.go('messagerie', {post_author: this.userId});
    },

});*/