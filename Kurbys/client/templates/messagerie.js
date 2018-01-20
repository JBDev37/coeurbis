Template.Item_message_gauche.rendered = function() {
var element = document.getElementById('msgbox');
element.scrollTop = element.scrollHeight - element.clientHeight;

};

Template.Item_message_gauche_mobile.rendered = function() {
var element = document.getElementById('msgbox');
element.scrollTop = element.scrollHeight - element.clientHeight;

};

Template.messagerie.rendered = function() {



};

Template.messagerie.onCreated(function() {
  var user= Router.current().params.post_author;
  this.autorun(() => {
      this.subscribe('chat', user);
      //this.subscribe('contact_Chat');
      this.subscribe('favoris');
      this.subscribe('userBloquer');
    });


});

Template.messagerie_mobile.onCreated(function() {
  var user= Router.current().params.post_author;
  this.autorun(() => {
      this.subscribe('chat', user);
      this.subscribe('contact_Chat');
      this.subscribe('favoris');
      this.subscribe('userBloquer');
    });

});

Template.Item_message_gauche.helpers({
    favoris_mess: function() {
    var userId = Meteor.userId();
    //Meteor.subscribe('favoris');
    var request = Favoris.findOne({"id_post":this._id, "id_user_add_favoris":userId});
    if (request) { 
      return 'Favoris';
    } 
    else {
      return 'Ajouter aux favoris';
    }
  },

    etoile_favoris_mess: function() {
    var userId = Meteor.userId();
    //Meteor.subscribe('favoris')
    var request = Favoris.findOne({"id_post":this._id, "id_user_add_favoris":userId});
    if (request) { 
      return 'fa-star';
    } 
    else {
      return 'fa-star-o';
    }
  },

});

Template.Item_message_gauche_mobile.helpers({
    favoris_mess: function() {
    var userId = Meteor.userId();
    //Meteor.subscribe('favoris');
    var request = Favoris.findOne({"id_post":this._id, "id_user_add_favoris":userId});
    if (request) { 
      return 'Favoris';
    } 
    else {
      return 'Ajouter aux favoris';
    }
  },

    etoile_favoris_mess: function() {
    var userId = Meteor.userId();
    //Meteor.subscribe('favoris');
    var request = Favoris.findOne({"id_post":this._id, "id_user_add_favoris":userId});
    if (request) { 
      return 'fa-star';
    } 
    else {
      return 'fa-star-o';
    }
  },

});

Template.Item_message_gauche.events({
    'click .favoris': function(e) {
    e.preventDefault();
    //Meteor.subscribe('favoris');
      var userId = Meteor.userId();
      var post = {
      id_user_add_favoris: userId, 
      id_post:this._id,
      id_author:this.from_id,
      author_name:this.from_name,
      content:this.message,
    };
    var request = Favoris.findOne({"id_post":this._id, "id_user_add_favoris":userId});
    if(!request){
    var errors = validatePost(post);
    if (errors.id_post || errors.id_author)
      return Session.set('postSubmitErrors', errors);

    Meteor.call('AddFavorisChat', post, function(error, result) { // on recherche la methode 'postInsert' 
            // affiche l'erreur à l'utilisateur et s'interrompt
            if (error)
                return throwError(error.reason);
            //Router.go('postPage', {_id: result._id});
        });
  }
  },

    'touchstart .favoris': function(e) {
    e.preventDefault();
    //Meteor.subscribe('favoris');
      var userId = Meteor.userId();
      var post = {
      id_user_add_favoris: userId, 
      id_post:this._id,
      id_author:this.from_id,
      author_name:this.from_name,
      content:this.message,
    };
    var request = Favoris.findOne({"id_post":this._id, "id_user_add_favoris":userId});
    if(!request){
    var errors = validatePost(post);
    if (errors.id_post || errors.id_author)
      return Session.set('postSubmitErrors', errors);

    Meteor.call('AddFavorisChat', post, function(error, result) { // on recherche la methode 'postInsert' 
            // affiche l'erreur à l'utilisateur et s'interrompt
            if (error)
                return throwError(error.reason);
            //Router.go('postPage', {_id: result._id});
        });
  }
  },

});

Template.Item_message_gauche_mobile.events({
    'click .favoris': function(e) {
    e.preventDefault();
    //Meteor.subscribe('favoris');
      var userId = Meteor.userId();
      var post = {
      id_user_add_favoris: userId, 
      id_post:this._id,
      id_author:this.from_id,
      author_name:this.from_name,
      content:this.message,
    };
    var request = Favoris.findOne({"id_post":this._id, "id_user_add_favoris":userId});
    if(!request){
    var errors = validatePost(post);
    if (errors.id_post || errors.id_author)
      return Session.set('postSubmitErrors', errors);

    Meteor.call('AddFavorisChat', post, function(error, result) { // on recherche la methode 'postInsert' 
            // affiche l'erreur à l'utilisateur et s'interrompt
            if (error)
                return throwError(error.reason);
            //Router.go('postPage', {_id: result._id});
        });
  }
  },

    'touchstart .favoris': function(e) {
    e.preventDefault();
    //Meteor.subscribe('favoris');
      var userId = Meteor.userId();
      var post = {
      id_user_add_favoris: userId, 
      id_post:this._id,
      id_author:this.from_id,
      author_name:this.from_name,
      content:this.message,
    };
    var request = Favoris.findOne({"id_post":this._id, "id_user_add_favoris":userId});
    if(!request){
    var errors = validatePost(post);
    if (errors.id_post || errors.id_author)
      return Session.set('postSubmitErrors', errors);

    Meteor.call('AddFavorisChat', post, function(error, result) { // on recherche la methode 'postInsert' 
            // affiche l'erreur à l'utilisateur et s'interrompt
            if (error)
                return throwError(error.reason);
            //Router.go('postPage', {_id: result._id});
        });
  }
  },

});

Template.Item_message_droite.helpers({
    favoris_mess: function() {
    var userId = Meteor.userId();
    //Meteor.subscribe('favoris');
    var request = Favoris.findOne({"id_post":this._id, "id_user_add_favoris":userId});
    if (request) { 
      return 'Favoris';
    } 
    else {
      return 'Ajouter aux favoris';
    }
  },

    etoile_favoris_mess: function() {
    var userId = Meteor.userId();
    //Meteor.subscribe('favoris');
    var request = Favoris.findOne({"id_post":this._id, "id_user_add_favoris":userId});
    if (request) { 
      return 'fa-star';
    } 
    else {
      return 'fa-star-o';
    }
  },

});


Template.Item_message_droite_mobile.helpers({
    favoris_mess: function() {
    var userId = Meteor.userId();
    //Meteor.subscribe('favoris');
    var request = Favoris.findOne({"id_post":this._id, "id_user_add_favoris":userId});
    if (request) { 
      return 'Favoris';
    } 
    else {
      return 'Ajouter aux favoris';
    }
  },

    etoile_favoris_mess: function() {
    var userId = Meteor.userId();
    //Meteor.subscribe('favoris');
    var request = Favoris.findOne({"id_post":this._id, "id_user_add_favoris":userId});
    if (request) { 
      return 'fa-star';
    } 
    else {
      return 'fa-star-o';
    }
  },

});

Template.Item_message_droite.events({
    'click .favoris': function(e) {
    e.preventDefault();
    //Meteor.subscribe('favoris');
      var userId = Meteor.userId();
      var post = {
      id_user_add_favoris: userId, 
      id_post:this._id,
      id_author:this.from_id,
      author_name:this.from_name,
      content:this.message,
    };
    var request = Favoris.findOne({"id_post":this._id, "id_user_add_favoris":userId});
    if(!request){
    var errors = validatePost(post);
    if (errors.id_post || errors.id_author)
      return Session.set('postSubmitErrors', errors);

    Meteor.call('AddFavorisChat', post, function(error, result) { // on recherche la methode 'postInsert' 
            // affiche l'erreur à l'utilisateur et s'interrompt
            if (error)
                return throwError(error.reason);
            //Router.go('postPage', {_id: result._id});
        });
  }
  },

    'touchstart .favoris': function(e) {
    e.preventDefault();
    //Meteor.subscribe('favoris');
      var userId = Meteor.userId();
      var post = {
      id_user_add_favoris: userId, 
      id_post:this._id,
      id_author:this.from_id,
      author_name:this.from_name,
      content:this.message,
    };
    var request = Favoris.findOne({"id_post":this._id, "id_user_add_favoris":userId});
    if(!request){
    var errors = validatePost(post);
    if (errors.id_post || errors.id_author)
      return Session.set('postSubmitErrors', errors);

    Meteor.call('AddFavorisChat', post, function(error, result) { // on recherche la methode 'postInsert' 
            // affiche l'erreur à l'utilisateur et s'interrompt
            if (error)
                return throwError(error.reason);
            //Router.go('postPage', {_id: result._id});
        });
  }
  },

});

Template.Item_message_droite_mobile.events({
    'click .favoris': function(e) {
    e.preventDefault();
    //Meteor.subscribe('favoris');
      var userId = Meteor.userId();
      var post = {
      id_user_add_favoris: userId, 
      id_post:this._id,
      id_author:this.from_id,
      author_name:this.from_name,
      content:this.message,
    };
    var request = Favoris.findOne({"id_post":this._id, "id_user_add_favoris":userId});
    if(!request){
    var errors = validatePost(post);
    if (errors.id_post || errors.id_author)
      return Session.set('postSubmitErrors', errors);

    Meteor.call('AddFavorisChat', post, function(error, result) { // on recherche la methode 'postInsert' 
            // affiche l'erreur à l'utilisateur et s'interrompt
            if (error)
                return throwError(error.reason);
            //Router.go('postPage', {_id: result._id});
        });
  }
  },

    'touchstart .favoris': function(e) {
    e.preventDefault();
    //Meteor.subscribe('favoris');
      var userId = Meteor.userId();
      var post = {
      id_user_add_favoris: userId, 
      id_post:this._id,
      id_author:this.from_id,
      author_name:this.from_name,
      content:this.message,
    };
    var request = Favoris.findOne({"id_post":this._id, "id_user_add_favoris":userId});
    if(!request){
    var errors = validatePost(post);
    if (errors.id_post || errors.id_author)
      return Session.set('postSubmitErrors', errors);

    Meteor.call('AddFavorisChat', post, function(error, result) { // on recherche la methode 'postInsert' 
            // affiche l'erreur à l'utilisateur et s'interrompt
            if (error)
                return throwError(error.reason);
            //Router.go('postPage', {_id: result._id});
        });
  }
  },

});


Template.messagerie.helpers({
    
    mes_messages: function() {
    
    var curentUser = this._id;
    var current_id = Router.current().params.post_author;
    //Meteor.subscribe('chat',current_id);
    var my_id = Meteor.userId();
    var messages_recu = Chat.find({$or : [{from_id: curentUser, to_id:my_id}, {from_id: my_id, to_id:curentUser}]});
    return messages_recu;
  },

  
    message_unread: function() {
    var current_id = Router.current().params.post_author;
    var my_id = Meteor.userId();
    //Meteor.subscribe('chat',current_id);
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
    //Meteor.subscribe('userBloquer');
    var request = UserBloquer.findOne({"from_id": userId , "to_id":to_id });
    if (request) { 
      return 'Débloquer';
    } 
    else {
      return 'Bloquer ce contact'; 
    }
  },

    add_contact_chat: function() {
     
    const handle = Meteor.subscribe('contact_Chat');
    Tracker.autorun(() => {
    const isReady = handle.ready();
    if (isReady==true){
              var user = Meteor.user();
              var userId = Meteor.userId();
              var to_id = this._id;
              var name = Meteor.users.findOne(this._id);
              var username = name.username;
              var request = ContactChat.findOne({$or : [{from_id: userId, to_id:to_id}, {from_id: to_id, to_id:userId}]}); 

                  if(request) {
                         ContactChat.update(request._id, {$set: {show:true} }, function(error) {
                        if (error) {
                         return throwError(error.reason);
                        } 
                        });
                  } 

                 if(!request) {
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
     };

    });
  },

    mes_contacts: function() {
    var userId = Meteor.userId();
    var current_id = Router.current().params.post_author;
    var request = Meteor.users.findOne(current_id);
    //Meteor.subscribe('contact_Chat');
    if(!request){ 
      var search = ContactChat.findOne({from_id :current_id, to_id:userId });
      if(search){ ContactChat.remove(search._id);}
      var search1 = ContactChat.findOne({to_id :current_id, from_id:userId });
      if(search1){ ContactChat.remove(search._id);}
  }
    return ContactChat.find({$or : [{from_id: userId, show:true }, {to_id:userId, show:true}]}, {sort: {last_date: -1}});
  },

    contact_bloque: function() {
    var userId = Meteor.userId();
     //Meteor.subscribe('userBloquer');
    return UserBloquer.find({from_id: userId});
 
   
  },

    not_current_user: function() {
    var current_id = Router.current().params.post_author;
    //Meteor.subscribe('contact_Chat');
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
    //Meteor.subscribe('chat',current_id);
    var messages_recu = Chat.find({$or : [{from_id: curentUser, to_id:my_id}, {from_id: my_id, to_id:curentUser}]});

    return messages_recu;
  },

    bloquer: function() {
    var userId = Meteor.userId();
    var to_id = Router.current().params.post_author;
    //Meteor.subscribe('userBloquer');
    var request = UserBloquer.findOne({"from_id": userId , "to_id":to_id });
    if (request) { 
      return 'Débloquer';
    } 
    else {
      return 'Bloquer ce contact';
    }
  },

  add_contact_chat: function() {
    const handle = Meteor.subscribe('contact_Chat');
    Tracker.autorun(() => {
    const isReady = handle.ready();
    if (isReady==true){
              var user = Meteor.user();
              var userId = Meteor.userId();
              var to_id = this._id;
              var name = Meteor.users.findOne(this._id);
              var username = name.username;
              var request = ContactChat.findOne({$or : [{from_id: userId, to_id:to_id}, {from_id: to_id, to_id:userId}]}); 

                  if(request) {
                         ContactChat.update(request._id, {$set: {show:true} }, function(error) {
                        if (error) {
                         return throwError(error.reason);
                        } 
                        });
                  } 

                 if(!request) {
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
     };

    });
  },
});

Template.messagerie_mobile.events({
  'touchstart .retour_mobile': function(e) {
     window.history.back();
},

  'touchstart .bloquer_user':function(e) {
    e.preventDefault();
   
    var userId = Meteor.userId();
    var to_id = this._id;
    //Meteor.subscribe('userBloquer');
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

    'click .bloquer_user':function(e) {
    e.preventDefault();
   
    var userId = Meteor.userId();
    var to_id = this._id;
    //Meteor.subscribe('userBloquer');
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
    //Meteor.subscribe('contact_Chat')
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

     'touchstart .delete_msg':function() {
     Chat.remove(this._id);

  },

     'click .delete_msg':function() {
     Chat.remove(this._id);

  },


});

Template.messagerie.events({
  'submit form': function(e) {
    e.preventDefault();
    var userId = Meteor.userId();
    var today = new Date();
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
    //Meteor.subscribe('contact_Chat');
    var search = ContactChat.findOne({$or : [{from_id: userId, to_id:this._id }, {to_id:userId,from_id:this._id }]});
    var contact_id = search._id;

        ContactChat.update(contact_id, {$set: {last_message :last_message, last_date :today, read:false} }, function(error) {
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

  'touchstart .bloquer_user':function(e) {
    e.preventDefault();
   
    var userId = Meteor.userId();
    var to_id = this._id;
    //Meteor.subscribe('userBloquer');
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

    'click .bloquer_user':function(e) {
    e.preventDefault();
   
    var userId = Meteor.userId();
    var to_id = this._id;
    //Meteor.subscribe('userBloquer');
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

 'touchstart .receive_message':function() {
  var userId = Meteor.userId();
  //var user = ContactChat.findOne({$or : [{from_id: userId, to_id:current_id}, {to_id:userId,from_id:current_id }]});
  if(this.to_id == userId){
    id=this.from_id
  }else {id=this.to_id}

   Router.go('messagerie', {post_author: id});
  },

   'click .receive_message':function() {
  var userId = Meteor.userId();
  //var user = ContactChat.findOne({$or : [{from_id: userId, to_id:current_id}, {to_id:userId,from_id:current_id }]});
  if(this.to_id == userId){
    id=this.from_id
  }else {id=this.to_id}

   Router.go('messagerie', {post_author: id});
  },

   'touchstart .receive_message_mobile':function(e) {
    e.stopPropagation();
  var userId = Meteor.userId();
  //var user = ContactChat.findOne({$or : [{from_id: userId, to_id:current_id}, {to_id:userId,from_id:current_id }]});
  if(this.to_id == userId){
    id=this.from_id
  }else {id=this.to_id}

   Router.go('messagerie_mobile', {post_author: id});
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

   'touchstart .delete_contact':function() {
    var userId = Meteor.userId();
    if(this.to_id == userId){
    id=this.from_id
    }else {id=this.to_id}
    //Meteor.subscribe('contact_Chat');
    var search = ContactChat.findOne({$or : [{from_id: userId, to_id:id }, {to_id:userId,from_id:id }]});
    var contact_id = search._id;

    ContactChat.update(contact_id, {$set: {show:false} }, function(error) {
          if (error) {
           return throwError(error.reason);
          } else {}
      });

  },

     'click .delete_contact':function() {
    var userId = Meteor.userId();
    if(this.to_id == userId){
    id=this.from_id
    }else {id=this.to_id}
    //Meteor.subscribe('contact_Chat');
    var search = ContactChat.findOne({$or : [{from_id: userId, to_id:id }, {to_id:userId,from_id:id }]});
    var contact_id = search._id;
    
    ContactChat.update(contact_id, {$set: {show:false} }, function(error) {
          if (error) {
           return throwError(error.reason);
          } else {}
      });

  },

     'touchstart .delete_msg':function() {
      var current_id = Router.current().params.post_author;
      //Meteor.subscribe('chat',current_id);
      Chat.remove(this._id);

  },

    'click .delete_msg':function() {
      var current_id = Router.current().params.post_author;
      //Meteor.subscribe('chat',current_id);
      Chat.remove(this._id);

  },

   'touchstart .favoris': function(e) {
    e.preventDefault();
    //Meteor.subscribe('favoris');
      var userId = Meteor.userId();
      var post = {
      id_user_add_favoris: userId, 
      id_post:this._id,
      id_author:this.from_id,
      author_name:this.from_name,
      content:this.message,
    };
    var request = Favoris.findOne({"id_post":this._id, "id_user_add_favoris":userId});
    if(!request){
    var errors = validatePost(post);
    if (errors.id_post || errors.id_author)
      return Session.set('postSubmitErrors', errors);

    Meteor.call('AddFavoris', post, function(error, result) { // on recherche la methode 'postInsert' 
            // affiche l'erreur à l'utilisateur et s'interrompt
            if (error)
                return throwError(error.reason);
            //Router.go('postPage', {_id: result._id});
        });
  }
  },




     'touchstart .en_cour':function() {
    var userId = Meteor.userId();
    document.getElementById('member_list').style.display='block';
    document.getElementById('member_bloque').style.display='none';

  },

    'click .en_cour':function() {
    var userId = Meteor.userId();
    document.getElementById('member_list').style.display='block';
    document.getElementById('member_bloque').style.display='none';
    

  },

     'touchstart .user_bloquer_chat':function() {
    var userId = Meteor.userId();
    document.getElementById('member_bloque').style.display='block';
    document.getElementById('member_list').style.display='none';

  },

    'click .user_bloquer_chat':function() {
    var userId = Meteor.userId();
    document.getElementById('member_bloque').style.display='block';
    document.getElementById('member_list').style.display='none';
  },


     'touchstart .en_cour_mobile':function() {
    var userId = Meteor.userId();
    document.getElementById('member_list_mobile').style.display='block';
    document.getElementById('member_bloque_mobile').style.display='none';
  },

    'click .en_cour_mobile':function() {
    var userId = Meteor.userId();
    document.getElementById('member_list_mobile').style.display='block';
    document.getElementById('member_bloque_mobile').style.display='none';

  },

     'touchstart .user_bloquer_chat_mobile':function() {
    var userId = Meteor.userId();
    document.getElementById('member_bloque_mobile').style.display='block';
    document.getElementById('member_list_mobile').style.display='none';
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