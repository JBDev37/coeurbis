Template.postsList.helpers({
  posts: function() {
    return Posts.find({}, {sort: {post_date: -1}});
  }
});

Template.postItem.helpers({
	ownPost: function() {
    return this.post_author=== Meteor.userId();
  },
  domain: function() {
    var a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  },
  commentsCount: function() {
    return Comments.find({postId: this._id}).count();
  }
});