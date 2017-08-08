Template.profil.events({
  'click .show-com': function(e) {
    e.preventDefault();
   document.getElementById('show-com').style.display="block";
  },

  'submit form#com': function(e) {
    e.preventDefault();
    
    var user = Meteor.user();
    var userId = Meteor.userId();
    var to_id = this._id;
    var name = Meteor.users.findOne(to_id);
    var username = name.username;
    
    var post = {
        commentaire: $(e.target).find('[name=commentaire]').val(),
        from_id : userId,
        to_id : to_id,
        from_name: user.username,
        to_name: username,
    }

    var errors = validatePost(post);
    if (errors.to_id)
      return Session.set('postSubmitErrors', errors);

    Meteor.call('AddComment', post, function(error, result) { // on recherche la methode 'postInsert' 
            // affiche l'erreur à l'utilisateur et s'interrompt
            if (error)
                return throwError(error.reason);
            //Router.go('postPage', {_id: result._id});
        });
    
    document.getElementById("idcom").value=""; 
    document.getElementById('show-com').style.display="none";
   //Router.go('postPage', {_id: result._id});
    },
  
});

Template.commentaires.helpers({
  commentaires: function() {
    var curentUser = this._id;
    return Commentaires.find({to_id:curentUser }, {sort: {date: -1}});
  },

  mes_commentaires: function() {
    var userId = Meteor.userId();
    return Commentaires.find({to_id:userId }, {sort: {date: -1}});
  },

});