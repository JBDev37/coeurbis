Template.profil.helpers({
    request: function() {
    var userId = Meteor.userId();
    var to_id = this._id;
    var request1 = Requests.findOne({"from_id": userId , "to_id":to_id });
    var request2 = Friends.findOne({"from_id": userId , "to_id":to_id });
    var request3 = Friends.findOne({"from_id": to_id, "to_id":userId });
    if (request1) { 
      return 'disabled';
    } 
    if (request2 || request3) { 
      return 'disabled';
    } 
    else {
      return 'ami';
    }
  },

    en_attente: function() {
    var userId = Meteor.userId();
    var to_id = this._id;
    var request1 = Requests.findOne({"from_id": userId , "to_id":to_id });
    var request2 = Friends.findOne({"from_id": userId , "to_id":to_id });
    var request3 = Friends.findOne({"from_id": to_id, "to_id":userId });
    if (request1) { 
      return 'En attente';
    }
    if (request2 || request3) { 
      return 'Ami';
    }
     else {
      return '+1 Ami';
    }
  },

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



Template.profil.events({
  'click .ami': function(e) {
    e.preventDefault();

    var name = Meteor.users.findOne(this._id);
    var username = name.username;
    var user = Meteor.user();
   
    var post = {
      from_id: Meteor.userId(),
      name_from_id: user.username,
      to_id: this._id,
      name_to_id: username
    };

    var errors = validatePost(post);
    if (errors.from_id || errors.to_id)
      return Session.set('postSubmitErrors', errors);
    
    Meteor.call('demande_ami', post, function(error, result) { // on recherche la methode 'postInsert' 
            // affiche l'erreur à l'utilisateur et s'interrompt
            if (error)
                return throwError(error.reason);
            //Router.go('postPage', {_id: result._id});
        });  
  }
});

