Template.presentation_mobile.events({
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
  },

    'click .retour': function(e) {
     window.history.back();
   }

});

Template.presentation_mobile.helpers({
  add_visites: function() {
    var userId = Meteor.userId();
    var current_id = Router.current().params.post_author;
    var name = Meteor.users.findOne(current_id);
    var username = name.username;
    var user = Meteor.user();

    var post = {
      from_id: userId,
      name_from_id: user.username,
      to_id: current_id,
      name_to_id: username
    };

    if (userId !== current_id) {
        Meteor.call('add_visites', post, function(error, result) { 
            if (error)
                return throwError(error.reason);
        }); 
    };
  },
});
