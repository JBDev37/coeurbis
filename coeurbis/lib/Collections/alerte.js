Alertes = new Mongo.Collection('alertes');

Alertes.allow({
  
  update: function(userId, post) {  return true },
  remove: function(userId, post) {  return true },
});


 Meteor.methods({
    alerteInsert: function(postAttributes) {
       var user = Meteor.user();
        var post = _.extend(postAttributes, {
            author_id: user._id,
            author_name: user.username,
            gender :user.profile.gender,
            post_date: new Date(),
        });
        var postId = Alertes.insert(post);
        return {
            _id: postId
        };
    },

        alerteInsert1: function(postAttributes) {
       var user = Meteor.user();
        var post = _.extend(postAttributes, {
            author_id: user._id,
            author_name: user.username,
            gender :user.profile.gender,
            post_date: new Date(),
        });
        var postId = Alertes.insert(post);
        return {
            _id: postId
        };
    }
});
