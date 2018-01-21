Template.presentation.onCreated(function() {
  var user= Router.current().params.post_author;
  this.autorun(() => {
   /*this.subscribe('posts');
    this.subscribe('comments');
    //this.subscribe('histoires');
    this.subscribe('friends', user);
    this.subscribe('visites');
    this.subscribe('commentaires');
    this.subscribe('messages_signaler');
    this.subscribe('avertissement_user');
    this.subscribe('requests');
    this.subscribe('favoris', user);*/
    });


});


Template.presentation.events({
  'submit form#1': function(e) {
    e.preventDefault();
    
    var currentId = Meteor.userId();
    
    var postProperties = {
        'profile.presentation': $(e.target).find('[name=presentation]').val()
    }

    Meteor.users.update(currentId, {$set: postProperties}, function(error) {
      if (error) {
        // affiche l'erreur à l'utilisateur
       return throwError(error.reason);
      } else {
        document.getElementById("tabb").style.display = "none";
      }
    });
  },

    'touchstart .taba': function(e) {
       e.preventDefault();
        document.getElementById("tabb").style.display = "block";
  },

    'click .taba': function(e) {
       e.preventDefault();
        document.getElementById("tabb").style.display = "block";
  },

  'touchstart .ami': function(e) {
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
  },

    'click .ami': function(e) {
    e.preventDefault();

    var name = Meteor.users.findOne(this._id);
    var username = name.username;
    var user = Meteor.user();
    var name_from = user.username;
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

    Meteor.call(
    'Demande_ami',
    'jbroussat@orange.fr',
    'Kurbys <kurbys@mail.kurbys.com>',
    'Tu as reçu une demande en ami',
    name_from
    );  
  },

  'touchstart .disponible': function(e) {
    e.preventDefault();
    var userId = Meteor.userId();
    var search = Meteor.users.findOne(userId);
    var disponible = search.disponible;
   
    if(disponible==true){
        Meteor.users.update(userId, {$set:{disponible:false}});
    }else{
        Meteor.users.update(userId, {$set:{disponible:true}});
    }
  },

  'click .disponible': function(e) {
    e.preventDefault();
    var userId = Meteor.userId();
    var search = Meteor.users.findOne(userId);
    var disponible = search.disponible;
   
    if(disponible==true){
        Meteor.users.update(userId, {$set:{disponible:false}});
    }else{
        Meteor.users.update(userId, {$set:{disponible:true}});
    }
  },



});



Template.presentation.helpers({
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

  request: function() {
    var userId = Meteor.userId();
    var to_id = this._id;
    var request1 = Requests.find({"from_id": userId , "to_id":to_id }).count();
    var request2 = Friends.find({"from_id": userId , "to_id":to_id }).count();
    var request3 = Friends.find({"from_id": to_id, "to_id":userId });
    if (request1>0) { 
      return 'disabled';
    } 
    if (request2>0 || request3>0) { 
      return 'disabled';
    } 
    else {
      return 'ami';
    }
  },

    en_attente: function() {
    var userId = Meteor.userId();
    var to_id = this._id;
    var request1 = Requests.find({"from_id": userId , "to_id":to_id }).count();
    var request2 = Friends.find({"from_id": userId , "to_id":to_id }).count();
    var request3 = Friends.find({"from_id": to_id, "to_id":userId }).count();
    if (request1>0) { 
      return 'En attente';
    }
    if (request2>0 || request3>0) { 
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

    

  activeRouteClass: function(name) {
    var args = Array.prototype.slice.call(arguments, 0);
    args.pop();

    var active = _.any(args, function(name) {
      return Router.current() && Router.current().route.getName() === name
    });

    return active && 'active';
  },

    is_disponible: function() {
    var userId = Meteor.userId();
    var search = Meteor.users.findOne(userId);
    var disponible = search.disponible;
    if(disponible==true){
       return 'btn-success';
    }if(disponible==false){
       return 'btn-danger';
    }else{
      return 'btn-success';
    }


   
  },

    disponible_text: function() {
    var userId = Meteor.userId();
    var search = Meteor.users.findOne(userId);
    var disponible = search.disponible;
    if(disponible==true){
       return 'Disponible';
    }if(disponible==false){
       return 'Indisponible';
    }else{
      return 'Disponible';
    }
   
  },


    explication: function() {
    var userId = Meteor.userId();
    var search = Meteor.users.findOne(userId);
    var disponible = search.disponible;
    if(disponible==true){
       return 'Tout le monde peut te contacter';
    }if(disponible==false){
       return 'Tu ne peux pas recevoir de nouveaux contacts';
    }else{
      return 'Tout le monde peut te contacter';
    }
   
  },

  count_histoires: function() {
    var curentUser = this._id; 
    return Histoires.find({post_author: curentUser}).count();
  },

    count_amis: function() {
    var userId = Meteor.userId();
    count1 =  Friends.find({"from_id": userId}).count();
    count2 =  Friends.find({"to_id": userId}).count();

    return count1 + count2;
  },

    count_visites: function() {
    var userId = Router.current().params.post_author;
    return Visites.find({to_id:userId}).count();
  },

    count_liste_personne: function() {
     var userId = Router.current().params.post_author;
    return Comments.find({userId:userId }).count();
  },

    count_mes_messages: function() {
     var userId = Router.current().params.post_author;
    return Posts.find({post_author:userId}).count();
  },

    count_commentaires: function() {
    var curentUser = this._id;
    return Commentaires.find({to_id:curentUser }).count();
  },

    count_mes_commentaires: function() {
    var userId = Router.current().params.post_author;
    return Commentaires.find({to_id:userId }).count();
  },

    count_liste_personne_aide: function() {
     var userId = Router.current().params.post_author;
    return Comments.find({post_author_id:userId}).count();
  },

  count_avertissement:function() {
  var current_id = Router.current().params.post_author;
  return Avertissement.find({user_id:current_id}).count();
  },

  count_alertes: function() {
    return Alertes.find().count();
  },

  count_favoris:function() {
  var current_id = Router.current().params.post_author;
  return Favoris.find({ id_user_add_favoris:current_id}).count();
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




Template.presentation.rendered = function(){
 var current_id = Router.current().params.post_author;
 var user = Meteor.users.findOne(current_id);
 var confiance = user.indice_confiance;

$('.raty').raty({
  score:confiance,
  showHalf:  true,
  readOnly:  true,
});
   
  };




