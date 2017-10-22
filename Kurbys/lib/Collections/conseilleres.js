Conseilleres = new Mongo.Collection('conseilleres');

Conseilleres.allow({
  
  update: function(userId, post) {  return true },
  remove: function(userId, post) {  return true },
});

 Meteor.methods({
    AddConseillere: function(postAttributes) {
       var user = Meteor.user();
        var post = _.extend(postAttributes, {
            user_id: user._id,
            username: user.username,
            gender :user.profile.gender,
            date: new Date(),
            lastLogin: new Date(),
        });
        var postId = Conseilleres.insert(post);
        return {
            _id: postId
        };
    }
});


/*validatePost = function (post) {
  var errors = {};
  if (!post.post_title)
    errors.title = "Please fill in a headline";
  if (!post.content)
    errors.url = "Please fill in a URL";
  return errors;
}*/
