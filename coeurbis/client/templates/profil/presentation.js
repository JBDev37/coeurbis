Template.presentation.events({
  'submit form#1': function(e) {
    e.preventDefault();
    
    var currentId = Meteor.userId();
    
    var postProperties = {
        'profile.presentation': $(e.target).find('[name=presentation]').val()
    }

    Meteor.users.update(currentId, {$set: postProperties}, function(error) {
      if (error) {
        // affiche l'erreur à l'utilisateur
       return throwError(error.reason);
      } else {
        document.getElementById("tabb").style.display = "none";
      }
    });
  },

    'click .taba': function(e) {
       e.preventDefault();
        document.getElementById("tabb").style.display = "block";
  }

});


