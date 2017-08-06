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

Template.postItem.events({
  'click .upvotable': function(e) {
    e.preventDefault();
    Meteor.call('upvote1', this._id);
  },

  'click .private_message': function(e) {
    e.preventDefault();

    var user = Meteor.user();
    var userId = Meteor.userId();
    var to_id = this.post_author;
    var request = ContactChat.findOne({$or : [{from_id: userId, to_id:to_id}, {from_id: to_id, to_id:userId}]});
    if(to_id){
        if (request) {
               ContactChat.update(request._id, {$set: {show:true} }, function(error) {
              if (error) {
               return throwError(error.reason);
              } else {}
              });
             }
           }

    Router.go('messagerie', {post_author: this.post_author});
  },


});