ContactChat = new Mongo.Collection('contact_Chat');

ContactChat.allow({
  
  update: function(userId) {  return true },
  remove: function(userId) {  return true },
});

 Meteor.methods({
    contact_chat: function(postAttributes) {
        var post = _.extend(postAttributes, {
            date: new Date(),
        });
        var postId = ContactChat.insert(post);
        return {
            _id: postId
        };
    }
});