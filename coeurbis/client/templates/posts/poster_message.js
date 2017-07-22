Template.postSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var post = {
      post_title: $(e.target).find('[name=titre_message]').val(),
      post_content: $(e.target).find('[name=contenu]').val(),
      categorie: $('input[type=radio][name=categorie]:checked').attr('value'),
    };

    Meteor.call('postInsert', post, function(error, result) { // on recherche la methode 'postInsert' 
            // affiche l'erreur à l'utilisateur et s'interrompt
            if (error)
                return alert(error.reason);
            //Router.go('postPage', {_id: result._id});
        });
  }
});