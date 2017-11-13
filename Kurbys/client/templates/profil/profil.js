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


});



Template.profil.events({
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


Template.profil.rendered = function(){
 var current_id = Router.current().params.post_author;
 var user = Meteor.users.findOne(current_id);
 var confiance = user.indice_confiance;

$('.raty').raty({
  score:confiance,
  showHalf:  true,
  readOnly:  true,
});
   
  };

