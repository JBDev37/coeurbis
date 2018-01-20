Template.postSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var post = {
      post_title: $(e.target).find('[name=titre_message]').val(),
      post_content: $(e.target).find('[name=contenu]').val(),
      categorie: $('input[type=radio][name=categorie]:checked').attr('value'),
    };

    var errors = validatePost(post);
    if (errors.post_title || errors.post_content)
      return Session.set('postSubmitErrors', errors);

    Meteor.call('postInsert', post, function(error, result) { // on recherche la methode 'postInsert' 
            // affiche l'erreur à l'utilisateur et s'interrompt
            if (error)
                return throwError(error.reason);
            //Router.go('postPage', {_id: result._id});
        });
    
    document.getElementById("m").value=""; // on vide les champs du formulaire
    document.getElementById("titre").value="";// on vide les champs du formulaire
  },



});

Template.postSubmit.onCreated(function() {
  Session.set('postSubmitErrors', {});
});
Template.postSubmit.helpers({
  errorMessage: function(field) {
    return Session.get('postSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('postSubmitErrors')[field] ? 'has-error' : '';
  }
});