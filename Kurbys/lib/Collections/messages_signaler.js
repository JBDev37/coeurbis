Signaler = new Mongo.Collection('messages_signaler');

Signaler.allow({
  
  update: function(userId, post) { return true; },
  remove: function(userId, post) { return true; },
});


 Meteor.methods({
    signaler_message: function(postAttributes) {
        var post = _.extend(postAttributes, {
            date: new Date(),
        });
        var postId = Signaler.insert(post);
        return {
            _id: postId
        };
    },
});


