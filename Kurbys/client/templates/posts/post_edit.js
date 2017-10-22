Template.postEdit.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentPostId = this._id;

    var postProperties = {
      post_title: $(e.target).find('[name=titre]').val(),
      post_content: $(e.target).find('[name=message]').val()
    }

    Posts.update(currentPostId, {$set: postProperties}, function(error) {
      if (error) {
        // affiche l'erreur à l'utilisateur
       return throwError(error.reason);
      } else {
        Router.go('postPage', {_id: currentPostId});
      }
    });
  },

  'click .delete-msg': function(e) {
    e.preventDefault();

    /*if (confirm("Supprimer ce message ?")) {*/
      var currentPostId = this._id;
      Posts.remove(currentPostId);
      Router.go('index');
     /* window.history.back();*/
    /*}*/
  }
});