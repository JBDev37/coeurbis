Template.presentation_conseiller.events({
  'submit form#4': function(e) {
    e.preventDefault();
    
    var currentId = Meteor.userId();
    
    var postProperties = {
        'presentation': $(e.target).find('[name=presentation]').val()
    };
    var search = Conseilleres.findOne({user_id :currentId});
    var id = search._id;
    Conseilleres.update(id, {$set: postProperties}, function(error) {
      if (error) {
        // affiche l'erreur à l'utilisateur
       return throwError(error.reason);
      } else {
        document.getElementById("tabbm").style.display = "none";
      }
    });
  },

    'touchstart .taba': function(e) {
       e.preventDefault();
        document.getElementById("tabbm").style.display = "block";
  },


    'click .taba': function(e) {
       e.preventDefault();
        document.getElementById("tabbm").style.display = "block";
  },


});

Template.presentation_conseiller.helpers({
    presentation: function() {
    var currentId = Meteor.userId();  
    var user = Conseilleres.findOne({user_id:currentId});
    var presentation = user.presentation;
    return presentation;
  }

});




