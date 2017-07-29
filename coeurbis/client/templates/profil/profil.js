Template.profil.helpers({
  
});

Template.profil.events({
  'click .ami': function(e) {
    e.preventDefault();

    var name = Meteor.users.findOne(this._id);
    var username = name.username;
    var user = Meteor.user();
   
    var post = {
      from_id: Meteor.userId(),
      name_from_id: user.username,
      to_id: this._id,
      name_to_id: username
    };

    var errors = validatePost(post);
    if (errors.from_id || errors.to_id)
      return Session.set('postSubmitErrors', errors);

    Meteor.call('demande_ami', post, function(error, result) { // on recherche la methode 'postInsert' 
            // affiche l'erreur à l'utilisateur et s'interrompt
            if (error)
                return throwError(error.reason);
            //Router.go('postPage', {_id: result._id});
        });
    
    /*document.getElementById("m").value=""; // on vide les champs du formulaire
    document.getElementById("titre").value="";// on vide les champs du formulaire*/
  }
});

