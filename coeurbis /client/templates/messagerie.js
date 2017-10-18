Template.Item_message_gauche.rendered = function() {
var element = document.getElementById('msgbox');
element.scrollTop = element.scrollHeight - element.clientHeight;

};

Template.Item_message_gauche_mobile.rendered = function() {
var element = document.getElementById('msgbox');
element.scrollTop = element.scrollHeight - element.clientHeight;

};

Template.messagerie.helpers({
    
    mes_messages: function() {
    var curentUser = this._id;
    var current_id = Router.current().params.post_author;
    var my_id = Meteor.userId();
    var messages_recu = Chat.find({$or : [{from_id: curentUser, to_id:my_id}, {from_id: my_id, to_id:curentUser}]});
    
   

    return messages_recu;
  },


    message_unread: function() {
    var current_id = Router.current().params.post_author;
    var my_id = Meteor.userId();
    var messages_recu = Chat.findOne({$or : [{from_id: current_id, to_id:my_id}, {from_id: my_id, to_id:current_id}]});

    if (current_id==messages_recu.from_id){ 
    var id = messages_recu.from_id;}

    if (current_id==messages_recu.to_id){
    var id = messages_recu.to_id;}
    
    
   return 'ssssss';
    /*if (current_id != id){
      return alert('ok');
    } */

  },

    bloquer: function() {
    var to_id = Router.current().params.post_author;  
    var userId = Meteor.userId();
    var request = UserBloquer.findOne({"from_id": userId , "to_id":to_id });
    if (request) { 
      return 'Débloquer';
    } 
    else {
      return 'Bloquer'; 
    }
  },

    add_contact_chat: function() {
    var user = Meteor.user();
    var userId = Meteor.userId();
    var to_id = this._id;
    var name = Meteor.users.findOne(this._id);
    var username = name.username;
    var request = ContactChat.findOne({$or : [{from_id: userId, to_id:to_id}, {from_id: to_id, to_id:userId}]});
    if(to_id){
        if (request) {
               ContactChat.update(request._id, {$set: {show:true} }, function(error) {
              if (error) {
               return throwError(error.reason);
              } else {}
              });
        } 
        else {
          var post = {
          from_id: Meteor.userId(),
          from_name: user.username,
          to_id: this._id,
          to_name: username,
          show:true
        };

        var errors = validatePost(post);
        if (errors.user)
          return Session.set('postSubmitErrors', errors);

        Meteor.call('contact_chat', post, function(error, result) { 
                if (error)
                    return throwError(error.reason);
                //Router.go('postPage', {_id: result._id});
            });
        
        }
    }
  },

    mes_contacts: function() {
    var userId = Meteor.userId();
    var current_id = Router.current().params.post_author;
    var request = Meteor.users.findOne(current_id);
    if(!request){ 
      var search = ContactChat.findOne({from_id :current_id, to_id:userId });
      if(search){ ContactChat.remove(search._id);}
      var search1 = ContactChat.findOne({to_id :current_id, from_id:userId });
      if(search1){ ContactChat.remove(search._id);}
  }
    return ContactChat.find({$or : [{from_id: userId, show:true }, {to_id:userId, show:true}]}, {sort: {date: -1}});
  },

    contact_bloque: function() {
    var userId = Meteor.userId();
    return UserBloquer.find({from_id: userId});
 
   
  },

    not_current_user: function() {
    var current_id = Router.current().params.post_author;

    var userId = Meteor.userId();
    var user = ContactChat.findOne({$or : [{from_id: userId, to_id:current_id }, {to_id:userId,from_id:current_id }]});
  
    if (userId==user.from_id){ 
    var id = user.to_id;
   
    return true;

    }else{ 
    var id = user.from_id;
    
      return true;
  }
  },

});

Template.messagerie_mobile.helpers({
    
    mes_messages: function() {
    var curentUser = this._id;
    var current_id = Router.current().params.post_author;
    var my_id = Meteor.userId();
    var messages_recu = Chat.find({$or : [{from_id: curentUser, to_id:my_id}, {from_id: my_id, to_id:curentUser}]});

    return messages_recu;
  },

    bloquer: function() {
    var userId = Meteor.userId();
    var to_id = Router.current().params.post_author;
    var request = UserBloquer.findOne({"from_id": userId , "to_id":to_id });
    if (request) { 
      return 'Débloquer';
    } 
    else {
      return 'Bloquer';
    }
  },

  add_contact_chat: function() {
    var user = Meteor.user();
    var userId = Meteor.userId();
    var to_id = this._id;
    var name = Meteor.users.findOne(this._id);
    var username = name.username;
    var request = ContactChat.findOne({$or : [{from_id: userId, to_id:to_id}, {from_id: to_id, to_id:userId}]});
    if(to_id){
        if (request) {
               ContactChat.update(request._id, {$set: {show:true} }, function(error) {
              if (error) {
               return throwError(error.reason);
              } else {}
              });
        } 
        else {
          var post = {
          from_id: Meteor.userId(),
          from_name: user.username,
          to_id: this._id,
          to_name: username,
          show:true
        };

        var errors = validatePost(post);
        if (errors.user)
          return Session.set('postSubmitErrors', errors);

        Meteor.call('contact_chat', post, function(error, result) { 
                if (error)
                    return throwError(error.reason);
                //Router.go('postPage', {_id: result._id});
            });
        
        }
    }
  },
});

Template.messagerie_mobile.events({
  'click .retour': function(e) {
     window.history.back();
},

  'click .bloquer_user':function(e) {
    e.preventDefault();
   
    var userId = Meteor.userId();
    var to_id = this._id;
    var request = UserBloquer.findOne({"from_id": userId , "to_id":to_id });
    if (request) {
     var is_bloquer = true;
    } 
    else {
     var is_bloquer = false;
    }

    if(is_bloquer == true){
      var recherche = UserBloquer.findOne({"from_id": userId , "to_id":to_id });
      id = recherche._id;
      UserBloquer.remove(id);
    }else{
    
    var user = Meteor.user();
    var name = Meteor.users.findOne(this._id);
    var username = name.username;
    var post = {
      from_id: Meteor.userId(),
      from_name: user.username,
      to_id: this._id,
      to_name: username
    };

    var errors = validatePost(post);
    if (errors.message)
      return Session.set('postSubmitErrors', errors);

    Meteor.call('bloquer_user', post, function(error, result) { // on recherche la methode 'postInsert' 
            // affiche l'erreur à l'utilisateur et s'interrompt
            if (error)
                return throwError(error.reason);
            //Router.go('postPage', {_id: result._id});
        });

    }

  },

'submit form': function(e) {
    e.preventDefault();
    var userId = Meteor.userId();
    var user = Meteor.user();
    var name = Meteor.users.findOne(this._id);
    var username = name.username;
    var last_message= $(e.target).find('[name=message]').val();
    var today = new Date();
    var post = {
      message: $(e.target).find('[name=message]').val(),
      from_id: Meteor.userId(),
      from_name: user.username,
      to_id: this._id,
      to_name: username
    };

    var search = ContactChat.findOne({$or : [{from_id: userId, to_id:this._id }, {to_id:userId,from_id:this._id }]});
    var contact_id = search._id;

        ContactChat.update(contact_id, {$set: {last_message :last_message, read:false, last_date:today} }, function(error) {
      if (error) {
        // affiche l'erreur à l'utilisateur
       return throwError(error.reason);
      } else {
        
      }
    });

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

    'focus #mes': function(e) {
     document.getElementById('mes').placeholder="";
  },

    'focusout #mes': function(e) {
     document.getElementById('mes').placeholder="Ecrire un message";
  },

     'click .delete_msg':function() {
     Chat.remove(this._id);

  },


});

Template.messagerie.events({
  'submit form': function(e) {
    e.preventDefault();
    var userId = Meteor.userId();
    var user = Meteor.user();
    var name = Meteor.users.findOne(this._id);
    var username = name.username;
    var last_message= $(e.target).find('[name=message]').val();
    var post = {
      message: $(e.target).find('[name=message]').val(),
      from_id: Meteor.userId(),
      from_name: user.username,
      to_id: this._id,
      to_name: username
    };

    var search = ContactChat.findOne({$or : [{from_id: userId, to_id:this._id }, {to_id:userId,from_id:this._id }]});
    var contact_id = search._id;

        ContactChat.update(contact_id, {$set: {last_message :last_message, read:false} }, function(error) {
      if (error) {
        // affiche l'erreur à l'utilisateur
       return throwError(error.reason);
      } else {
        
      }
    });

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

  'click .bloquer_user':function(e) {
    e.preventDefault();
   
    var userId = Meteor.userId();
    var to_id = this._id;
    var request = UserBloquer.findOne({"from_id": userId , "to_id":to_id });
    if (request) {
     var is_bloquer = true;
    } 
    else {
     var is_bloquer = false;
    }

    if(is_bloquer == true){
      var recherche = UserBloquer.findOne({"from_id": userId , "to_id":to_id });
      id = recherche._id;
      UserBloquer.remove(id);
    }else{
    
    var user = Meteor.user();
    var name = Meteor.users.findOne(this._id);
    var username = name.username;
    var post = {
      from_id: Meteor.userId(),
      from_name: user.username,
      to_id: this._id,
      to_name: username
    };

    var errors = validatePost(post);
    if (errors.message)
      return Session.set('postSubmitErrors', errors);

    Meteor.call('bloquer_user', post, function(error, result) { // on recherche la methode 'postInsert' 
            // affiche l'erreur à l'utilisateur et s'interrompt
            if (error)
                return throwError(error.reason);
            //Router.go('postPage', {_id: result._id});
        });

    }

  },

 'click .receive_message':function() {
  var userId = Meteor.userId();
  //var user = ContactChat.findOne({$or : [{from_id: userId, to_id:current_id}, {to_id:userId,from_id:current_id }]});
  if(this.to_id == userId){
    id=this.from_id
  }else {id=this.to_id}

   Router.go('messagerie', {post_author: id});
  },

   'click .receive_message_mobile':function() {
  var userId = Meteor.userId();
  //var user = ContactChat.findOne({$or : [{from_id: userId, to_id:current_id}, {to_id:userId,from_id:current_id }]});
  if(this.to_id == userId){
    id=this.from_id
  }else {id=this.to_id}

   Router.go('messagerie_mobile', {post_author: id});
  },

  'mouseenter .receive_message':function() {
    var userId = Meteor.userId();
    if(this.to_id == userId){
    id=this.from_id
    }else {id=this.to_id}

    document.getElementById(id).style.display="block";
  },

   'mouseleave .receive_message':function() {
    var userId = Meteor.userId();
    if(this.to_id == userId){
    id=this.from_id
    }else {id=this.to_id}
    document.getElementById(id).style.display="none";
  },

    'mouseenter .receive_message_mobile':function() {
    var userId = Meteor.userId();
    if(this.to_id == userId){
    id=this.from_id
    }else {id=this.to_id}

    document.getElementById(id).style.display="block";
  },

   'mouseleave .receive_message_mobile':function() {
    var userId = Meteor.userId();
    if(this.to_id == userId){
    id=this.from_id
    }else {id=this.to_id}
    document.getElementById(id).style.display="none";
  },

   'click .delete_contact':function() {
    var userId = Meteor.userId();
    if(this.to_id == userId){
    id=this.from_id
    }else {id=this.to_id}

    var search = ContactChat.findOne({$or : [{from_id: userId, to_id:id }, {to_id:userId,from_id:id }]});
    var contact_id = search._id;

    ContactChat.update(contact_id, {$set: {show:false} }, function(error) {
          if (error) {
           return throwError(error.reason);
          } else {}
      });

  },

     'click .delete_msg':function() {
    Chat.remove(this._id);

  },

     'click .en_cour':function() {
    var userId = Meteor.userId();
    document.getElementById('member_list').style.display='block';
    document.getElementById('member_bloque').style.display='none';
    

  },

     'click .user_bloquer_chat':function() {
    var userId = Meteor.userId();
    document.getElementById('member_bloque').style.display='block';
    document.getElementById('member_list').style.display='none';


  },


     'click .en_cour_mobile':function() {
    var userId = Meteor.userId();
    document.getElementById('member_list_mobile').style.display='block';
    document.getElementById('member_bloque_mobile').style.display='none';

  },

     'click .user_bloquer_chat_mobile':function() {
    var userId = Meteor.userId();
    document.getElementById('member_bloque_mobile').style.display='block';
    document.getElementById('member_list_mobile').style.display='none';

  },

      'focus #mes': function(e) {
     document.getElementById('mes').placeholder="";
},

      'focusout #mes': function(e) {
     document.getElementById('mes').placeholder="Ecrire un message";
},













    




});