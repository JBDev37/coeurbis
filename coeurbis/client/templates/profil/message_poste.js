Template.messages_poste.helpers({
  mes_messages: function() {
     var userId = Meteor.userId();
    return Posts.find({post_author:userId }, {sort: {post_date: -1}});
  }
});


Template.messagePosteItem.events({

     'click .profil_ami': function(e) {
     e.preventDefault();
     Router.go('postPage', {_id: this._id});
    },

    'click .supprimer_ami': function(e) {
    e.preventDefault();
    Posts.remove(this._id);
    },

});