Template.messages_poste.helpers({
  mes_messages: function() {
     var userId = Meteor.userId();
    return Posts.find({post_author:userId }, {sort: {post_date: -1}});
  }
});