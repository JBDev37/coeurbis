Requests = new Mongo.Collection('requests');

Requests.allow({
  
  update: function() { return true; },
  remove: function() { return true; },
});

Meteor.methods({
    demande_ami: function(postAttributes) {

        var user = Meteor.user();
        var post = _.extend(postAttributes, {
            date: new Date(),
        });
        var postId = Requests.insert(post);
        createFriendsNotification(post);
        return {
            _id: postId
        };
    },

    delete_request:function(postAttributes) {
    var user= Meteor.userId();
    var post = _.extend(postAttributes, {
         
        });

    Requests.remove({"from_id": post.from_id , "to_id":user });
    Requests.remove({"from_id": user , "to_id":post.from_id });
  },

});