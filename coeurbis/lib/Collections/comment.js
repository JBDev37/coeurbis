Comments = new Mongo.Collection('comments');


Meteor.methods({
  commentInsert: function(commentAttributes) {
    check(this.userId, String);
    check(commentAttributes, {
      postId: String,
      body: String
    });
    var user = Meteor.user();
    var post = Posts.findOne(commentAttributes.postId);
    if (!post)
      throw new Meteor.Error('invalid-comment', 'Vous devez commenter sur un post');
      comment = _.extend(commentAttributes, {
      userId: user._id,
      gender :user.profile.gender,
      author: user.username,
      submitted: new Date(),
      upvoters: [],
  	  votes: 0
    });
    // crée le commentaire et enregistre l'id
    comment._id = Comments.insert(comment);
    // crée maintenant une notification, informant l'utilisateur qu'il y a eu un commentaire
    createCommentNotification(comment);
    return comment._id;
  },

  upvote: function(commentId) {
    check(this.userId, String);
    check(commentId, String);
    var comment = Comments.findOne(commentId);
    if (!comment)
      throw new Meteor.Error('invalid', 'Post not found');
    if (_.include(comment.upvoters, this.userId))
      throw new Meteor.Error('invalid', 'Already upvoted this post');
    Comments.update(comment._id, {
      $addToSet: {upvoters: this.userId},
      $inc: {votes: 1}
    });
  },

   downvote: function(commentId) {
    check(this.userId, String);
    check(commentId, String);
    var comment = Comments.findOne(commentId);
    if (!comment)
      throw new Meteor.Error('invalid', 'Post not found');
    if (_.include(comment.upvoters, this.userId))
      throw new Meteor.Error('invalid', 'Already upvoted this post');
    Comments.update(comment._id, {
      $addToSet: {upvoters: this.userId},
      $inc: {votes: -1}
    });
  }

});

