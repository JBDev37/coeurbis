Template.alerte.helpers({
  les_alertes: function() {
    return Alertes.find({});
  }
});


Template.alerte.events({
  'submit form#2alertes': function(e) {
    e.preventDefault();

    var post = {
      titre_alerte: $(e.target).find('[name=titre-alerte]').val(),
      alerte: $(e.target).find('[name=alerte1]').val()
    };

    var errors = validatePost(post);
    if (errors.titre_alerte || errors.alerte)
      return Session.set('postSubmitErrors', errors);

    Meteor.call('alerteInsert', post, function(error, result) { // on recherche la methode 'postInsert' 
            // affiche l'erreur à l'utilisateur et s'interrompt
            if (error)
                return throwError(error.reason);
            //Router.go('postPage', {_id: result._id});
        });
        document.getElementById("exp1").style.display = "none";
        document.getElementById("titre-alerte").value=""; // on vide les champs du formulaire
        document.getElementById("alerte").value="";// on vide les champs du formulaire
  },

      'click .t22': function(e) {
         e.preventDefault();
         document.getElementById("exp1").style.display = "block";
  },

   'click .delete_alerte': function(e) {
    e.preventDefault();
    
      var currentPostId = this._id;
      Alertes.remove(currentPostId);
      /*Router.go('index');*/
  },

  'submit form#al': function(e) {
    e.preventDefault();
    
    var currentId = this._id;
    
    var postProperties = {
        'alerte': $(e.target).find('[name=modif_alerte]').val()
    }

    Alertes.update(currentId, {$set: postProperties}, function(error) {
      if (error) {
        // affiche l'erreur à l'utilisateur
       return throwError(error.reason);
      } else {
        document.getElementById("modifAlerte").style.display = "none";
      }
    });
  },

    'click .modifier_alerte': function(e) {
       e.preventDefault();
        document.getElementById("modifAlerte").style.display = "block";
  }
});




