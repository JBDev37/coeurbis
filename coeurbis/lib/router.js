Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', {
	name: 'index',
	template : 'postsList'
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