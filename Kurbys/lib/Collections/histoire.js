Histoires = new Mongo.Collection('histoires');

Histoires.allow({
  
  update: function(userId, post) {  return true },
  remove: function(userId, post) {  return true },
});

 Meteor.methods({
    histoireInsert: function(postAttributes) {
       var user = Meteor.user();
        var post = _.extend(postAttributes, {
            post_author: user._id,
            author_name: user.username,
            gender :user.profile.gender,
            post_date: new Date(),
        });
        var postId = Histoires.insert(post);
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
