Template.histoire.onCreated(function() {
  var user= Router.current().params.post_author;
  this.autorun(() => {
    this.subscribe('histoires', user);
    });
});

Template.histoire.helpers({
  histoires: function() {
    var curentUser = this._id;
    return Histoires.find({post_author: curentUser});
  },
  count_histoires: function() {
    var curentUser = this._id; 
    return Histoires.find({post_author: curentUser}).count();
  },

    visite_profil:function() {
  var current_id = Router.current().params.post_author;
  var userId = Meteor.userId();
  if(current_id!==userId){
   return "visite-profil"
  }else{
  }
  
  },

});


Template.histoire.events({
  'submit form#2': function(e) {
    e.preventDefault();

    var post = {
      titre_histoire: $(e.target).find('[name=titre-histoire]').val(),
      histoire: $(e.target).find('[name=histoire]').val()
    };

    var errors = validatePost(post);
    if (errors.titre_histoire || errors.histoire)
      return Session.set('postSubmitErrors', errors);

    Meteor.call('histoireInsert', post, function(error, result) { // on recherche la methode 'postInsert' 
            // affiche l'erreur à l'utilisateur et s'interrompt
            if (error)
                return throwError(error.reason);
            //Router.go('postPage', {_id: result._id});
        });
        document.getElementById("exp").style.display = "none";
        document.getElementById("titre-histoire").value=""; // on vide les champs du formulaire
        document.getElementById("histoire").value="";// on vide les champs du formulaire
  },

      'touchstart .t2': function(e) {
         e.preventDefault();
         document.getElementById("exp").style.display = "block";
  },

      'click .t2': function(e) {
         e.preventDefault();
         document.getElementById("exp").style.display = "block";
  },

   'touchstart .delete': function(e) {
    e.preventDefault();
    
      var currentPostId = this._id;
      Histoires.remove(currentPostId);
      /*Router.go('index');*/
  },

    'click .delete': function(e) {
    e.preventDefault();
    
      var currentPostId = this._id;
      Histoires.remove(currentPostId);
      /*Router.go('index');*/
  },

  'submit form#hist': function(e) {
    e.preventDefault();
    
    var currentId = this._id;
    
    var postProperties = {
        'histoire': $(e.target).find('[name=modif_histoire]').val()
    }

    Histoires.update(currentId, {$set: postProperties}, function(error) {
      if (error) {
        // affiche l'erreur à l'utilisateur
       return throwError(error.reason);
      } else {
        document.getElementById("modif").style.display = "none";
      }
    });
  },

    'touchstart .modifier': function(e) {
       e.preventDefault();
        document.getElementById("modif").style.display = "block";
  },

    'click .modifier': function(e) {
       e.preventDefault();
        document.getElementById("modif").style.display = "block";
  },

});




