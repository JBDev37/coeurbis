Template.alerte.helpers({
  les_alertes: function() {
    return Alertes.find({});
  },

  dont_show_alert: function(id) {
    var my_id = Meteor.userId();
    search = DeleteAlertes.findOne({"id_alerte":id, "delete_from_id": my_id});
    if(!search){
    return true;}
  },

    deja_alerte: function() {
    var my_id = Meteor.userId();
    var search = Alertes.findOne({"author_id":my_id});
    if(!search){
    return true;}
    else {return false}
  },

});


Template.alerte.events({
  'submit form#2alertes': function(e) {
    e.preventDefault();

    var post = {
      titre_alerte: $(e.target).find('[name=titre-alerte]').val(),
      alerte: $(e.target).find('[name=alerte1]').val(),
      read: [],
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

   'touchstart .t22': function(e) {
         e.preventDefault();
         document.getElementById("exp1").style.display = "block";
  },

    'click .t22': function(e) {
         e.preventDefault();
         document.getElementById("exp1").style.display = "block";
  },

   'touchstart .delete_alerte': function(e) {
    e.preventDefault();
    var my_id = Meteor.userId();
    var id = this._id;
    var date= new Date();

    var post = {
      id_alerte: id,
      delete_from_id:my_id ,
      date:date,

    };

    var errors = validatePost(post);
    if (errors.id_alerte || errors.alerte)
      return Session.set('postSubmitErrors', errors);

    Meteor.call('delete_alerte', post, function(error, result) { // on recherche la methode 'postInsert' 
            // affiche l'erreur à l'utilisateur et s'interrompt
            if (error)
                return throwError(error.reason);
            //Router.go('postPage', {_id: result._id});
        });
      
  },

     'click .delete_alerte': function(e) {
    e.preventDefault();
    var my_id = Meteor.userId();
    var id = this._id;
    var date= new Date();

    var post = {
      id_alerte: id,
      delete_from_id:my_id ,
      date:date,

    };

    var errors = validatePost(post);
    if (errors.id_alerte || errors.alerte)
      return Session.set('postSubmitErrors', errors);

    Meteor.call('delete_alerte', post, function(error, result) { // on recherche la methode 'postInsert' 
            // affiche l'erreur à l'utilisateur et s'interrompt
            if (error)
                return throwError(error.reason);
            //Router.go('postPage', {_id: result._id});
        });
      
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

    'touchstart .modifier_alerte': function(e) {
       e.preventDefault();
        document.getElementById("modifAlerte").style.display = "block";
  },

    'click .modifier_alerte': function(e) {
       e.preventDefault();
        document.getElementById("modifAlerte").style.display = "block";
  }
});


Template.ItemAlerte.helpers({

    id_unique: function() {
    var my_id = Meteor.userId();
    var id = this._id;
    var unique = my_id +id;
   return unique;
  },

});




