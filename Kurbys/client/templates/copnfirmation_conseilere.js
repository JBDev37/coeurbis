Template.confirmation_conseillere.helpers({

  classement: function() {
    Meteor.subscribe('comments');
    Meteor.subscribe('contact_Chat_profil');
    Meteor.subscribe('conseilleres_acceuil');



  },



  

  }); 
