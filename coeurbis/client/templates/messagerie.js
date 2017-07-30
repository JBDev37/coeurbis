Template.messagerie.rendered = function() {
var element = document.getElementById('msgbox');
element.scrollTop = element.scrollHeight - element.clientHeight;

};



Template.messagerie.helpers({
    
    mes_messages: function() {
    var curentUser = this._id;
    var my_id = Meteor.userId();
    var messages_recu = Chat.find({$or : [{from_id: curentUser, to_id:my_id}, {from_id: my_id, to_id:curentUser}]});
    
    return messages_recu;
  },
});

Template.messagerie.events({
  'submit form': function(e) {
    e.preventDefault();
    var user = Meteor.user();
    var name = Meteor.users.findOne(this._id);
    var username = name.username;
    var post = {
      message: $(e.target).find('[name=message]').val(),
      from_id: Meteor.userId(),
      from_name: user.username,
      to_id: this._id,
      to_name: username
    };

    var errors = validatePost(post);
    if (errors.message)
      return Session.set('postSubmitErrors', errors);

    Meteor.call('message', post, function(error, result) { // on recherche la methode 'postInsert' 
            // affiche l'erreur à l'utilisateur et s'interrompt
            if (error)
                return throwError(error.reason);
            //Router.go('postPage', {_id: result._id});
        });
        document.getElementById("mes").value=""; // on vide les champs du formulaire
        var element = document.getElementById('msgbox');
        element.scrollTop = element.scrollHeight - element.clientHeight;
  },


});