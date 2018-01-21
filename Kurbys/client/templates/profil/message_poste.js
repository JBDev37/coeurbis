/*Template.messages_poste.onCreated(function() {
  var user= Router.current().params.post_author;
  this.autorun(() => {
    this.subscribe('posts');
    });
});*/


Template.messages_poste.helpers({
  mes_messages: function() {
     var userId = Router.current().params.post_author;
    return Posts.find({post_author:userId }, {sort: {post_date: -1}});
  },

  count_mes_messages: function() {
     var userId = Router.current().params.post_author;
    return Posts.find({post_author:userId}).count();
  },

    visite_profil:function() {
  var current_id = Router.current().params.post_author;
  var userId = Meteor.userId();
  if(current_id!==userId){
   return "visite-profil"
  }else{
  }
  
  },
});


Template.messagePosteItem.events({

     'touchstart .profil_ami': function(e) {
     e.preventDefault();
     Router.go('postPage', {_id: this._id});
    },

    'click .profil_ami': function(e) {
     e.preventDefault();
     Router.go('postPage', {_id: this._id});
    },

    'touchstart .supprimer_ami': function(e) {
    e.preventDefault();
    Posts.remove(this._id);
    },

    'click .supprimer_ami': function(e) {
    e.preventDefault();
    Posts.remove(this._id);
    },

});