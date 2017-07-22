Template.postPage.helpers({
  comments: function() {
    return Comments.find({postId: this._id});
  }
});

Template.commentItem.helpers({
  submittedText: function() {
    return this.submitted.toString();
  }
});