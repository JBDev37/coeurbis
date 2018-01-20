Template.rejoindre.events({
  'submit form': function(e) {
    e.preventDefault();

    var post = {    
    nom: $(e.target).find('[name=nom]').val(),
    prenom: $(e.target).find('[name=prenom]').val(),
    age: $(e.target).find('[name=age]').val(),
    email: $(e.target).find('[name=email]').val(),
    motivation: $(e.target).find('[name=motivation]').val(),
    };

    var errors = validatePost(post);
    if (errors.nom || errors.email)
      return Session.set('postSubmitErrors', errors);

    Meteor.call('rejoindre', post, function(error, result) { // on recherche la methode 'postInsert' 
            // affiche l'erreur à l'utilisateur et s'interrompt
            if (error)
                return throwError(error.reason);
            
        });
    document.getElementById("me").value="";
    Router.go('confirmation_rejoindre');
    
  }
});

Template.rejoindre.helpers({
  classement: function() {
    Meteor.subscribe('comments');
    Meteor.subscribe('contact_Chat_profil');
    Meteor.subscribe('conseilleres_acceuil');
  },
});
