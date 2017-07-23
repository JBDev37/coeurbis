Template.postPage.helpers({
  comments: function() {
    return Comments.find({postId: this._id},{sort: {submitted: -1}} );
  }
});

Template.commentItem.helpers({
  submittedText: function() {
    return this.submitted.toString();
  },

  upvotedClass: function() {
    var userId = Meteor.userId();
    if (userId && !_.include(this.upvoters, userId)) {
      return 'upvotable';
    } else {
      return 'disabled';
    }
  },

  downvotedClass: function() {
    var userId = Meteor.userId();
    if (userId && !_.include(this.upvoters, userId)) {
      return 'downvotable';
    } else {
      return 'disabled';
    }
  },

});

Template.postContent.helpers({
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
  },

  upvotedClass: function() {
    var userId = Meteor.userId();
    if (userId && !_.include(this.upvoters, userId)) {
      return 'btn-primary upvotable';
    } else {
      return 'disabled';
    }
  }

});



Template.commentItem.events({
  'click .upvotable': function(e) {
    e.preventDefault();
    Meteor.call('upvote', this._id);
  },

  'click .downvotable': function(e) {
    e.preventDefault();
    Meteor.call('downvote', this._id);
  }


});