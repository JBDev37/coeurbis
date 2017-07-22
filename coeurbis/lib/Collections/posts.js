Posts = new Mongo.Collection('posts');

Posts.allow({
  insert: function(userId, doc) {
    // autoriser les posts seulement si l'utilisateur est authentifié
    return !! userId;
  }
 });

 Meteor.methods({
    postInsert: function(postAttributes) {
        check(Meteor.userId(), String);
        check(postAttributes, {
            post_title: String,
            post_content: String,
            categorie: String
        });
        var user = Meteor.user();
        var post = _.extend(postAttributes, {
            post_author: user._id,
            author_name: user.username,
            post_date: new Date()
        });
        var postId = Posts.insert(post);
        return {
            _id: postId
        };
    }
});

