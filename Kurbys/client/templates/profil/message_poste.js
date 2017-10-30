Template.messages_poste.helpers({
  mes_messages: function() {
     var userId = Router.current().params.post_author;
    return Posts.find({post_author:userId }, {sort: {post_date: -1}});
  }
});


Template.messagePosteItem.events({

     'touchstart .profil_ami': function(e) {
     e.preventDefault();
     Router.go('postPage', {_id: this._id});
    },

    'touchstart .supprimer_ami': function(e) {
    e.preventDefault();
    Posts.remove(this._id);
    },

});