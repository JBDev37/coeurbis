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
    Meteor.subscribe('visites'),
    Meteor.subscribe('commentaires'),
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

Router.onBeforeAction('dataNotFound', {only: 'postPage'});