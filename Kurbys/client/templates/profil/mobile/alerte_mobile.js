Template.alertes_mobile.helpers({
  notificationAlertesMobile : function() {
    var userId = Meteor.userId();
   return Alertes.find( { read: { $ne:userId }, author_id: { $ne:userId } });
  },

    deja_alerte: function() {
    var my_id = Meteor.userId();
    var search = Alertes.findOne({"author_id":my_id});
    if(!search){
    return 'rien'}
    else {return 'disabled'}
  },

});

Template.alertes_mobile.events({
  'touchstart .creat_alert' : function() {
    var my_id = Meteor.userId();
    var search = Alertes.findOne({"author_id":my_id});
    if(!search){
   Router.go('creerAlerte', {post_author: my_id});
      }
  },

});

Template.creerAlerte.events({

   'touchstart .retour': function(e) {
     window.history.back();
   },


    'focus #titre_alerte': function(e) {
     document.getElementById('titre-alerte').placeholder="";
  },

    'focusout #titre_alerte': function(e) {
     document.getElementById('titre-alerte').placeholder="Titre";
  },


     'focus #alerte': function(e) {
     document.getElementById('alerte').placeholder="";
  },

    'focusout #alerte': function(e) {
     document.getElementById('alerte').placeholder="Explique ton histoire...";
  },

  'submit form#2alertesM': function(e) {
    e.preventDefault();

    var post = {
      titre_alerte: $(e.target).find('[name=titre-alerte]').val(),
      alerte: $(e.target).find('[name=alerte1]').val(),
      read: [],
    };

    var errors = validatePost(post);
    if (errors.titre_alerte || errors.alerte)
      return Session.set('postSubmitErrors', errors);

    Meteor.call('alerteInsert1', post, function(error, result) { 
            if (error)
                return throwError(error.reason);
        });
       
        Router.go('valider_Alerte')
  },

   
});

Template.ItemAlerte_mobile.events({
  'touchstart #delete_alerte': function(e) {
     var my_id = Meteor.userId(); 
    var id = this._id;
    var unique = my_id + id;
      Alertes.update(id, {$addToSet: {read: my_id}});
   },
  });

