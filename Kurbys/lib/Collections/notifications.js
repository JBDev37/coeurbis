Notifications = new Mongo.Collection('notifications');

Notifications.allow({
  update: function(userId, doc, fieldNames) {
    return ownsDocument(userId, doc) &&
      fieldNames.length === 1 && fieldNames[0] === 'read';
  }
});

createCommentNotification = function(comment) {
  var post = Posts.findOne(comment.postId);
  if (comment.userId !== post.post_author) {
    Notifications.insert({
      userId: post.post_author,
      postId: post._id,
      commentId: comment._id,
      commenterName: comment.author,
      read: false
    });
  }
};

createFriendsNotification = function(post) {
    Notifications.insert({
      from_id: post.from_id,
      to_id:post.to_id,
      name_from_id:post.name_from_id,
      name_to_id:post.name_to_id,
      date:post.date,
      read: false
    });

};