Chat = new Mongo.Collection('chat');

Chat.allow({
  
  update: function(userId, post) {  return true },
  remove: function(userId, post) {  return true },
});

 Meteor.methods({
    message: function(postAttributes) {
        var post = _.extend(postAttributes, {
            post_date: new Date(),
        });
        var postId = Chat.insert(post);
        return {
            _id: postId
        };
    },

    bloquer_user: function(postAttributes) {
    var post = _.extend(postAttributes, {
        date: new Date(),
    });
    var postId = UserBloquer.insert(post);
    return {
        _id: postId
    };
},



});