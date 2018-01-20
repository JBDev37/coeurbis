Favoris = new Mongo.Collection('favoris');

Favoris.allow({
  
  update: function(userId, post) { return ownsDocument(userId, post); },
  remove: function(userId, post) { return ownsDocument(userId, post); },
});

Meteor.users.allow({
    update: function(userId, post) { return true },
});


 Meteor.methods({
    AddFavoris: function(postAttributes) {
        var user = Meteor.user();
        var post = _.extend(postAttributes, {
            author_name_add_favoris: user.username,
            post_date: new Date(),
        });
        var postId = Favoris.insert(post);
        return {
            _id: postId
        };
    },
});


validatePost = function (post) {
  var errors = {};
  if (!post.post_title)
    errors.title = "Please fill in a headline";
  if (!post.content)
    errors.url = "Please fill in a URL";
  return errors;
}
