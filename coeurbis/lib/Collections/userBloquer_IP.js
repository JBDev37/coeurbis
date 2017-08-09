UserBloquer_IP = new Mongo.Collection('user_bloquer_IP');

UserBloquer_IP.allow({
  
  update: function(userId, post) { return true; },
  remove: function(userId, post) { return true; },
});


Meteor.methods({
    bloquerUser_IP: function(postAttributes) {
        var post = _.extend(postAttributes, {
            date: new Date(),
        });
        var postId = UserBloquer_IP.insert(post);
        return {
            _id: postId
        };
    },

    

});
