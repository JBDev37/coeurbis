Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
   waitOn: function() {
    return [
    Meteor.subscribe('notifications'),
    Meteor.subscribe('posts'),
    Meteor.subscribe('comments'),
    Meteor.subscribe('histoires'),
    Meteor.subscribe('requests'),
    Meteor.subscribe('friends'),
    Meteor.subscribe('chat'),
    Meteor.subscribe('userBloquer'),
    Meteor.subscribe('contact_Chat'),
    Meteor.subscribe('userStatus'),
    Meteor.subscribe('userIP'),
    Meteor.subscribe('visites'),
    Meteor.subscribe('commentaires'),
    Meteor.subscribe('messages_signaler'),
    Meteor.subscribe('avertissement_user'),
    Meteor.subscribe('user_bloquer_IP'),
    Meteor.subscribe('alertes'),
    Meteor.subscribe('delete_alertes'),
    Meteor.subscribe('conseilleres'),
    Meteor.subscribe('lastlogin'),
     ];
     }
});




Router.route('/', {
	name: 'index',
	template : 'postsList',
	
});


Router.route('/posts/:_id', {
  name: 'postPage',
  template: 'postPage',
  data: function() {
   return Posts.findOne(this.params._id); }
});

Router.route('/posts/:_id/edit', {
  name: 'postEdit',
  data: function() {
   return Posts.findOne(this.params._id); }
});

Router.route('/contact', {
	name: 'contact',
	template : 'contact',

});

Router.route('/profil/:post_author?', {
	name: 'profil',
	template : 'profil',
	data: function() {
    return Meteor.users.findOne(this.params.post_author); }
});

Router.route('/profil/:_id', {
	name: 'mon_profil',
	template : 'profil',

});

Router.route('/messagerie/:post_author?', {
	name: 'messagerie',
	template : 'messagerie',
  

    data: function() {
    return Meteor.users.findOne(this.params.post_author); 

  }
});

Router.route('/messagerie_mobile/:post_author?', {
  name: 'messagerie_mobile',
  template : 'messagerie_mobile',
  

    data: function() {
    return Meteor.users.findOne(this.params.post_author); 

  }
});

Router.route('/mot_de_passe', {
	name: 'mot_de_passe',
	template : 'mot_de_passe',

});

Router.route('/signaler_bug', {
	name: 'signaler_bug',
	template : 'signaler_bug',

});

Router.route('/ameliore_site', {
	name: 'ameliore_site',
	template : 'ameliore_site',

});

Router.route('/supprimer_compte', {
	name: 'supprimer_compte',
	template : 'supprimer_compte',

});

Router.route('/inscription', {
	name: 'inscription',
	template : 'inscription',

});

Router.route('/devenir_conseillere', {
  name: 'devenir_conseillere',
  template : 'devenir_conseillere',

});

Router.route('/confirmation_conseillere', {
  name: 'confirmation_conseillere',
  template : 'confirmation_conseillere',

});

Router.route('/recherche_conseillere', {
  name: 'recherche_conseillere',
  template : 'recherche_conseillere',

});

Router.route('/resultat_conseillere/:gender?/:college?/:lycee?/:adulte?/:amour?/:amitie?/:confiance?/:sexo?/:autre?/:les_deux?', {
  name: 'resultat_conseillere',
  template : 'resultat_conseillere',
      data: function() {
    return Conseilleres.find();
  }

});

Router.route('/classement-conseilleres', {
  name: 'classementComplet',
  template : 'classementComplet',

});


Router.route('/conseiller/:post_author?', {
  name: 'presentation_conseiller',
  template : 'presentation_conseiller',
  data: function() {
    return Meteor.users.findOne(this.params.post_author); }
});

Router.route('/histoire/:post_author?', {
  name: 'histoire',
  template : 'histoire',
  data: function() {
    return Meteor.users.findOne(this.params.post_author); }
});

Router.route('/amis/:post_author?', {
  name: 'amis',
  template : 'amis',
  data: function() {
    return Meteor.users.findOne(this.params.post_author); }
});

Router.route('/visites/:post_author?', {
  name: 'visites',
  template : 'visites',
  data: function() {
    return Meteor.users.findOne(this.params.post_author); }
});

Router.route('/personne_aide/:post_author?', {
  name: 'personne_aide',
  template : 'personne_aide',
  data: function() {
    return Meteor.users.findOne(this.params.post_author); }
});

Router.route('/messages_poste/:post_author?', {
  name: 'messages_poste',
  template : 'messages_poste',
  data: function() {
    return Meteor.users.findOne(this.params.post_author); }
});

Router.route('/commentaires/:post_author?', {
  name: 'commentaires',
  template : 'commentaires',
  data: function() {
    return Meteor.users.findOne(this.params.post_author); }
});

Router.route('/ils_ont_aide/:post_author?', {
  name: 'ils_ont_aide',
  template : 'ils_ont_aide',
  data: function() {
    return Meteor.users.findOne(this.params.post_author); }
});

Router.route('/alerte/:post_author?', {
  name: 'alerte',
  template : 'alerte',
  data: function() {
    return Meteor.users.findOne(this.params.post_author); }
});

Router.route('/avertissement/:post_author?', {
  name: 'avertissement',
  template : 'avertissement',
  data: function() {
    return Meteor.users.findOne(this.params.post_author); }
});

Router.route('/presentation/:post_author?', {
  name: 'presentation',
  template : 'presentation',
  data: function() {
    return Meteor.users.findOne(this.params.post_author); }
});

Router.route('/notifications', {
  name: 'notifications',
  template : 'notifications_mobile',
  
});
















Router.onBeforeAction('dataNotFound', {only: 'postPage'});