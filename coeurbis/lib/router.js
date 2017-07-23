Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
   waitOn: function() {
    return [
    Meteor.subscribe('notifications'),
    Meteor.subscribe('posts'),
    Meteor.subscribe('comments')
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

Router.route('/profil', {
	name: 'profil',
	template : 'profil',

});

Router.route('/messagerie', {
	name: 'messagerie',
	template : 'messagerie',

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