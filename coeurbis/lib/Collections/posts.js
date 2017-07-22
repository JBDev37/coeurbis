Posts = new Mongo.Collection('posts');

/*Posts.allow({
  insert: function(userId, doc) {
    // autoriser les posts seulement si l'utilisateur est authentifié
    return !! userId;
  }
 });*/

Posts.allow({
  
  update: function(userId, post) { return ownsDocument(userId, post); },
  remove: function(userId, post) { return ownsDocument(userId, post); },
});

/*var errors = validatePost(postAttributes);
    if (errors.post_title || errors.post_content)
      throw new Meteor.Error('invalid-post', "You must set a title and URL for your post");*/

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

validatePost = function (post) {
  var errors = {};
  if (!post.post_title)
    errors.title = "Please fill in a headline";
  if (!post.content)
    errors.url = "Please fill in a URL";
  return errors;
}
