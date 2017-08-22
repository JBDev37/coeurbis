Template.add_commentaire_mobile.events({

  'submit form#com': function(e) {
    e.preventDefault();
    
    var user = Meteor.user();
    var userId = Meteor.userId();
    var to_id = Router.current().params.post_author;
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
    Router.go('valider_commentaire_mobile', {post_author: to_id});
    },

      'click .retour': function(e) {
     window.history.back();
   }
  
});

Template.commentaires_mobile.helpers({
  commentaires_mobile: function() {
    var curentUser = this._id;
    return Commentaires.find({to_id:curentUser }, {sort: {date: -1}});
  },

  mes_commentaires_mobile: function() {
    var userId = Meteor.userId();
    return Commentaires.find({to_id:userId }, {sort: {date: -1}});
  },

});


Template.ItemCommentaire_mobile.helpers({
  gender_fille: function() {
    var user = Meteor.users.findOne(this.from_id);
    var gender = user.profile.gender;
    if (gender =='fille') {
      return true;
    } else {
      return false;
    }
  },

  gender_garcon: function() {
    var user = Meteor.users.findOne(this.from_id);
    var gender = user.profile.gender;
    if (gender =='garcon') {
      return true;
    } else {
      return false;
    }
  },
});

Template.ItemCommentaire_mobile.events({

     'click .profil_ami': function(e) {
    e.preventDefault();
     Router.go('messagerie_mobile', {post_author: this.from_id});
    }

});

Template.commentaires_mobile.events({

  'click .retour': function(e) {
     window.history.back();
   }
});

Template.valider_commentaire_mobile.events({
      'click .retour': function(e) {
        var to_id = Router.current().params.post_author;
        Router.go('profil_mobile', {post_author: to_id});
   }


});

