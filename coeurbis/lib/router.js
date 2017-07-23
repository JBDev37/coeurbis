Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
   waitOn: function() {
    return [
    Meteor.subscribe('notifications'),
   
     Meteor.subscribe('comments')
     ];
     }
});




Router.route('/:postsLimit?', {
	name: 'index',
	template : 'postsList',
	waitOn: function() {
    var limit = parseInt(this.params.postsLimit) || 50;
    return Meteor.subscribe('posts', {sort: {submitted: -1}, limit: limit});
  },
  data: function() {
    var limit = parseInt(this.params.postsLimit) || 50;
    return {
      posts: Posts.find({}, {sort: {post_date: -1}, limit: limit})
    };
  }

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

Router.onBeforeAction('dataNotFound', {only: 'postPage'});