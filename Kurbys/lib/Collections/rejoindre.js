Rejoindre = new Mongo.Collection('rejoindre');

Rejoindre.allow({
  
  update: function(userId, post) {  return true },
  remove: function(userId, post) {  return true },
});

 Meteor.methods({
    rejoindre: function(postAttributes) {
       var user = Meteor.user();
        var post = _.extend(postAttributes, {
            user_id: user._id,
            username: user.username,
            gender :user.profile.gender,
            date: new Date(),
        });
        var postId = Rejoindre.insert(post);
        return {
            _id: postId
        };
    }
});


