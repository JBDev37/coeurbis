Template.commentSubmit.onCreated(function() {
  Session.set('commentSubmitErrors', {});
});

Template.commentSubmit.helpers({
  errorMessage: function(field) {
    return Session.get('commentSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('commentSubmitErrors')[field] ? 'has-error' : '';
  }
});

Template.commentSubmit.events({
  'submit form': function(e, template) {
    e.preventDefault();

    var postId= template.data._id;
    var search = Posts.findOne(postId);
    var post_author_id = search.post_author;
    var search1 = Meteor.users.findOne(post_author_id);
    var post_author_name = search1.username;

    var $body = $(e.target).find('[name=contenu]');
    var comment = {
      body: $body.val(),
      postId: template.data._id,
      post_author_id:post_author_id,
      post_author_name:post_author_name
    };

    var errors = {};
    if (! comment.body) {
      errors.body = "Le commentaire est vide";
      return Session.set('commentSubmitErrors', errors);
    }

    Meteor.call('commentInsert', comment, function(error, commentId) {
      if (error){
        throwError(error.reason);
      } else {
        $body.val('');
      }
    });
    document.getElementById("ma").value=""; // on vide les champs du formulaire
    
  }
});