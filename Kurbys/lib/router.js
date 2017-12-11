Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
   waitOn: function() {
    var my_id = Meteor.userId();
    return [
    /*Meteor.subscribe('notifications'),*/
    /*Meteor.subscribe('requests'),*/
    /*Meteor.subscribe('chat_notif'),*/
    
    Meteor.subscribe('userStatus'),
    Meteor.subscribe('messages_signaler'),
    Meteor.subscribe('avertissement_user'),
    Meteor.subscribe('alertes'),
    Meteor.subscribe('delete_alertes'),
    Meteor.subscribe('lastlogin'),
    Meteor.subscribe('password'),
    Meteor.subscribe('conseilleres'),

    /*Meteor.subscribe('posts'),*/
    /*Meteor.subscribe('comments'),*/
    /*Meteor.subscribe('histoires'),*/
    /*Meteor.subscribe('friends'),*/
    /*Meteor.subscribe('userBloquer'),
    Meteor.subscribe('contact_Chat'),*/
    /*Meteor.subscribe('userIP'),*/
    /*Meteor.subscribe('visites'),*/
    Meteor.subscribe('commentaires'),
    /*Meteor.subscribe('user_bloquer_IP'),*/
    /*Meteor.subscribe('conseilleres_acceuil'),*/
    /*Meteor.subscribe('favoris'),*/
     ];
     },

});



PostsListController = RouteController.extend({
  template: 'postsList',
  increment: 5,

  postsLimit: function() {
    return parseInt(this.params.postsLimit) || this.increment;
  },
  findOptions: function() {
    return {sort: {post_date: -1}, limit: this.postsLimit()};
  },
  subscriptions: function() {
    this.postsSub = Meteor.subscribe('posts', this.findOptions());
  },
  posts: function() {

    return Posts.find({}, this.findOptions());
  },
  data: function() {
    var hasMore = this.posts().count() === this.postsLimit();
    var nextPath = this.route.path({postsLimit: this.postsLimit() + this.increment});
    return {
      posts: this.posts(),
      ready: this.postsSub.ready,
      nextPath: hasMore ? nextPath : null
    };
  },
  waitOn: function() {
    return  [
    Meteor.subscribe('comments'),
    Meteor.subscribe('contact_Chat_profil'),
    

    ];
     },
 
});


if (Meteor.isClient) { // google analytic
    Router.plugin('reywood:iron-router-ga');
    Router.configure({
    trackPageView: true
});
}


Router.route('/', function () {
  this.redirect('/index');
});

Router.route('index/:postsLimit?', {
name: 'postsList',
});

/*Router.route('/index/:postsLimit?', {
name: 'postsList',
template: 'postsList',
waitOn: function() {
    return  [
    Meteor.subscribe('posts'),
    ];
     },
  data: function() {
   return Posts.find();
    },
});*/

Router.route('/posts/:_id', {
  name: 'postPage',
  template: 'postPage',
  waitOn: function() {
    return  [
    Meteor.subscribe('Singleposts', this.params._id),
    Meteor.subscribe('comments', this.params._id),
    Meteor.subscribe('favoris'),
    ];
     },
  data: function() {
   return Posts.findOne(this.params._id);
    },
  
});

Router.route('/posts_mobile/:_id', {
  name: 'postPage_mobile',
  template: 'postPage_mobile',
    waitOn: function() {
    return  [
    Meteor.subscribe('Singleposts', this.params._id),
    Meteor.subscribe('comments', this.params._id),
    Meteor.subscribe('favoris'),
    ];
     },
  data: function() {
   return Posts.findOne(this.params._id);
    },
});


Router.route('/posts/:_id/edit', {
  name: 'postEdit',
  data: function() {
   return Posts.findOne(this.params._id); 
 },
  waitOn: function() {
    return  [
    Meteor.subscribe('Singleposts', this.params._id),
    ];
     },
});

Router.route('/contact', {
	name: 'contact',
	template : 'contact',

});

Router.route('/profil/:post_author?', {
	name: 'profil',
	template : 'profil',
	data: function() {
    return Meteor.users.findOne(this.params.post_author); 
  },
  waitOn: function() {
    return [
    Meteor.subscribe('posts'),
    Meteor.subscribe('comments'),
    Meteor.subscribe('histoires'),
    Meteor.subscribe('friends'),
    Meteor.subscribe('visites'),
    Meteor.subscribe('commentaires'),
    Meteor.subscribe('messages_signaler'),
    Meteor.subscribe('avertissement_user'),
    Meteor.subscribe('favoris'),
     ];
     },

});


Router.route('/profil/:_id', {
	name: 'mon_profil',
	template : 'profil',
  waitOn: function() {
    return [
    Meteor.subscribe('posts'),
    Meteor.subscribe('comments'),
    Meteor.subscribe('histoires'),
    Meteor.subscribe('friends'),
    Meteor.subscribe('visites'),
    Meteor.subscribe('commentaires'),
    Meteor.subscribe('messages_signaler'),
    Meteor.subscribe('avertissement_user'),
     ];
     },
});

Router.route('/messagerie/:post_author?', {
	name: 'messagerie',
	template : 'messagerie',
    waitOn: function() {
    return [
     Meteor.subscribe('chat',this.params.post_author),
     Meteor.subscribe('userBloquer'),
     Meteor.subscribe('contact_Chat'),
     Meteor.subscribe('favoris'),
     ];
     },
   data: function() {
    return Meteor.users.findOne(this.params.post_author); 
  },


})


Router.route('/messagerie_vierge/:post_author?', {
  name: 'messagerie_vierge',
  template : 'messagerie_vierge',
    data: function() {
    return Meteor.users.findOne(this.params.post_author); 
  },
    waitOn: function() {
    return [
     Meteor.subscribe('chat',this.params.post_author),
     Meteor.subscribe('userBloquer'),
     Meteor.subscribe('contact_Chat'),
    Meteor.subscribe('favoris'),
     ];
     },


});

Router.route('/messagerie_mobile/:post_author?', {
  name: 'messagerie_mobile',
  template : 'messagerie_mobile',
    data: function() {
    return Meteor.users.findOne(this.params.post_author); 
  },
    waitOn: function() {
    return [
     Meteor.subscribe('chat',this.params.post_author),
     Meteor.subscribe('userBloquer'),
     Meteor.subscribe('contact_Chat'),
     Meteor.subscribe('favoris'),
     ];
     },

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

Router.route('/devenir_conseillere_mobile', {
  name: 'devenir_conseillere_mobile',
  template : 'devenir_conseillere_mobile',

});

Router.route('/confirmation_conseillere', {
  name: 'confirmation_conseillere',
  template : 'confirmation_conseillere',
});

Router.route('/confirmation_conseillere_mobile', {
  name: 'confirmation_conseillere_mobile',
  template : 'confirmation_conseillere_mobile',
});

Router.route('/recherche_conseillere', {
  name: 'recherche_conseillere',
  template : 'recherche_conseillere',

});

Router.route('/recherche_mobile', {
  name: 'recherche_mobile',
  template : 'recherche_mobile',

});

Router.route('/resultat_conseillere/:gender?/:college?/:lycee?/:adulte?/:amour?/:amitie?/:confiance?/:sport?/:mode?/:sante?/:beaute?/:sexo?/:autre?/:les_deux?', {
  name: 'resultat_conseillere',
  template : 'resultat_conseillere',
      data: function() {
    return Conseilleres.find();
  },

});

Router.route('/resultat_conseillere_mobile/:gender?/:college?/:lycee?/:adulte?/:amour?/:amitie?/:confiance?/:sport?/:mode?/:sante?/:beaute?/:sexo?/:autre?/:les_deux?', {
  name: 'resultat_conseillere_mobile',
  template : 'resultat_conseillere_mobile',
      data: function() {
    return Conseilleres.find();
  },

});

Router.route('/classement-conseilleres', {
  name: 'classementComplet',
  template : 'classementComplet',
  /*waitOn: function() {
    return Meteor.subscribe('conseilleres');
     }*/
});

Router.route('/classement-conseilleres-mobile', {
  name: 'classementComplet_mobile',
  template : 'classementComplet_mobile',
});

Router.route('/conseiller_online', {
  name: 'conseiller_online',
  template : 'conseiller_online',

});

Router.route('/conseiller_online_mobile', {
  name: 'conseiller_online_mobile',
  template : 'conseiller_online_mobile',

});

Router.route('/user_online', {
  name: 'user_online',
  template : 'user_online',
});

Router.route('/conseiller/:post_author?', {
  name: 'presentation_conseiller',
  template : 'presentation_conseiller',
  data: function() {
    return Meteor.users.findOne(this.params.post_author); 
  },
  waitOn: function() {
    return [
    Meteor.subscribe('posts'),
    Meteor.subscribe('comments'),
    Meteor.subscribe('histoires'),
    Meteor.subscribe('friends'),
    Meteor.subscribe('visites'),
    Meteor.subscribe('commentaires'),
    Meteor.subscribe('messages_signaler'),
    Meteor.subscribe('favoris'),
    
     ];
     },
});

Router.route('/favoris/:post_author?', {
  name: 'mes_favoris',
  template : 'mes_favoris',
  data: function() {
    return Meteor.users.findOne(this.params.post_author); 
  },
  waitOn: function() {
    return [
    Meteor.subscribe('posts'),
    Meteor.subscribe('comments'),
    Meteor.subscribe('histoires'),
    Meteor.subscribe('friends'),
    Meteor.subscribe('visites'),
    Meteor.subscribe('commentaires'),
    Meteor.subscribe('messages_signaler'),
    Meteor.subscribe('favoris'),
    
     ];
     },
});

Router.route('/favoris_mobile/:post_author?', {
  name: 'favoris_mobile',
  template : 'favoris_mobile',
  data: function() {
    return Meteor.users.findOne(this.params.post_author); 
  },
  waitOn: function() {
    return [
    Meteor.subscribe('posts'),
    Meteor.subscribe('comments'),
    Meteor.subscribe('histoires'),
    Meteor.subscribe('friends'),
    Meteor.subscribe('visites'),
    Meteor.subscribe('commentaires'),
    Meteor.subscribe('messages_signaler'),
    Meteor.subscribe('favoris'),
    
     ];
     },
});


Router.route('/presentation_conseiller_mobile/:post_author?', {
  name: 'presentation_conseiller_mobile',
  template : 'presentation_conseiller_mobile',
  data: function() {
    return Meteor.users.findOne(this.params.post_author); }
});



Router.route('/histoire/:post_author?', {
  name: 'histoire',
  template : 'histoire',
  data: function() {
    return Meteor.users.findOne(this.params.post_author); 
  },
  waitOn: function() {
    return [
    Meteor.subscribe('posts'),
    Meteor.subscribe('comments'),
    Meteor.subscribe('histoires'),
    Meteor.subscribe('friends'),
    Meteor.subscribe('visites'),
    Meteor.subscribe('commentaires'),
    Meteor.subscribe('messages_signaler'),
    Meteor.subscribe('favoris'),
     ];
     },
});

Router.route('/histoire_mobile/:post_author?', {
  name: 'histoire_mobile',
  template : 'histoire_mobile',
  data: function() {
    return Meteor.users.findOne(this.params.post_author);
     },
  waitOn: function() {
    return [
    Meteor.subscribe('posts'),
    Meteor.subscribe('comments'),
    Meteor.subscribe('histoires'),
    Meteor.subscribe('friends'),
    Meteor.subscribe('visites'),
    Meteor.subscribe('commentaires'),
    Meteor.subscribe('messages_signaler'),
    Meteor.subscribe('favoris'),
     ];
     },
});

Router.route('/amis/:post_author?', {
  name: 'amis',
  template : 'amis',
  data: function() {
    return Meteor.users.findOne(this.params.post_author); 
  },
    waitOn: function() {
    return [
    Meteor.subscribe('posts'),
    Meteor.subscribe('comments'),
    Meteor.subscribe('histoires'),
    Meteor.subscribe('friends'),
    Meteor.subscribe('visites'),
    Meteor.subscribe('commentaires'),
    Meteor.subscribe('messages_signaler'),
    Meteor.subscribe('favoris'),
     ];
     },
});

Router.route('/visites/:post_author?', {
  name: 'visites',
  template : 'visites',
  data: function() {
    return Meteor.users.findOne(this.params.post_author); 
  },
  waitOn: function() {
    return [
    Meteor.subscribe('posts'),
    Meteor.subscribe('comments'),
    Meteor.subscribe('histoires'),
    Meteor.subscribe('friends'),
    Meteor.subscribe('visites'),
    Meteor.subscribe('commentaires'),
    Meteor.subscribe('messages_signaler'),
    Meteor.subscribe('favoris'),
     ];
     },
});

Router.route('/mon_compte/:post_author?', {
  name: 'mon_compte',
  template : 'mon_compte',
  data: function() {
    return Meteor.users.findOne(this.params.post_author); 
  },
  
});

Router.route('/compte_bancaire/:post_author?', {
  name: 'compte_bancaire',
  template : 'compte_bancaire',
  data: function() {
    return Meteor.users.findOne(this.params.post_author); 
  },
  
});

Router.route('/visites_mobile/:post_author?', {
  name: 'visites_mobile',
  template : 'visites_mobile',
  data: function() {
    return Meteor.users.findOne(this.params.post_author); 
  },
  waitOn: function() {
    return [
    Meteor.subscribe('posts'),
    Meteor.subscribe('comments'),
    Meteor.subscribe('histoires'),
    Meteor.subscribe('friends'),
    Meteor.subscribe('visites'),
    Meteor.subscribe('commentaires'),
    Meteor.subscribe('messages_signaler'),
    Meteor.subscribe('favoris'),
     ];
     },
});

Router.route('/personne_aide/:post_author?', {
  name: 'personne_aide',
  template : 'personne_aide',
  data: function() {
    return Meteor.users.findOne(this.params.post_author); 
  },
  waitOn: function() {
    return [
    Meteor.subscribe('posts'),
    Meteor.subscribe('comments'),
    Meteor.subscribe('histoires'),
    Meteor.subscribe('friends'),
    Meteor.subscribe('visites'),
    Meteor.subscribe('commentaires'),
    Meteor.subscribe('messages_signaler'),
    Meteor.subscribe('favoris'),
     ];
     },
});

Router.route('/personne_aide_mobile/:post_author?', {
  name: 'personne_aide_mobile',
  template : 'personne_aide_mobile',
  data: function() {
    return Meteor.users.findOne(this.params.post_author); 
  },
  waitOn: function() {
    return [
    Meteor.subscribe('posts'),
    Meteor.subscribe('comments'),
    Meteor.subscribe('histoires'),
    Meteor.subscribe('friends'),
    Meteor.subscribe('visites'),
    Meteor.subscribe('commentaires'),
    Meteor.subscribe('messages_signaler'),
    Meteor.subscribe('favoris'),
     ];
     },
});

Router.route('/messages_poste/:post_author?', {
  name: 'messages_poste',
  template : 'messages_poste',
  data: function() {
    return Meteor.users.findOne(this.params.post_author); 
  },
  waitOn: function() {
    return [
    Meteor.subscribe('posts'),
    Meteor.subscribe('comments'),
    Meteor.subscribe('histoires'),
    Meteor.subscribe('friends'),
    Meteor.subscribe('visites'),
    Meteor.subscribe('commentaires'),
    Meteor.subscribe('messages_signaler'),
    Meteor.subscribe('favoris'),
     ];
     },
});

Router.route('/messages_poste_mobile/:post_author?', {
  name: 'messages_poste_mobile',
  template : 'messages_poste_mobile',
  data: function() {
    return Meteor.users.findOne(this.params.post_author); 
  },
  waitOn: function() {
    return [
    Meteor.subscribe('posts'),
    Meteor.subscribe('comments'),
    Meteor.subscribe('histoires'),
    Meteor.subscribe('friends'),
    Meteor.subscribe('visites'),
    Meteor.subscribe('commentaires'),
    Meteor.subscribe('messages_signaler'),
    Meteor.subscribe('favoris'),
     ];
     },
});

Router.route('/commentaires/:post_author?', {
  name: 'commentaires',
  template : 'commentaires',
  data: function() {
    return Meteor.users.findOne(this.params.post_author);
     },
  /*waitOn: function() {
    return [
    Meteor.subscribe('posts'),
    Meteor.subscribe('comments'),
    Meteor.subscribe('histoires'),
    Meteor.subscribe('friends'),
    Meteor.subscribe('visites'),
    Meteor.subscribe('commentaires'),
    Meteor.subscribe('messages_signaler'),
    Meteor.subscribe('favoris'),
     ];
     },*/ 
});

Router.route('/commentaires_mobile/:post_author?', {
  name: 'commentaires_mobile',
  template : 'commentaires_mobile',
  data: function() {
    return Meteor.users.findOne(this.params.post_author); 
  },
  waitOn: function() {
    return [
    Meteor.subscribe('posts'),
    Meteor.subscribe('comments'),
    Meteor.subscribe('histoires'),
    Meteor.subscribe('friends'),
    Meteor.subscribe('visites'),
    Meteor.subscribe('commentaires'),
    Meteor.subscribe('messages_signaler'),
    Meteor.subscribe('favoris'),
     ];
     }, 
});

Router.route('/rediger_commentaires_mobile/:post_author?', {
  name: 'rediger_commentaires_mobile',
  template : 'rediger_commentaires_mobile',
  data: function() {
    return Meteor.users.findOne(this.params.post_author); 
  },
  waitOn: function() {
    return Meteor.subscribe('commentaires');
     }  
});

Router.route('/ils_ont_aide/:post_author?', {
  name: 'ils_ont_aide',
  template : 'ils_ont_aide',
  data: function() {
    return Meteor.users.findOne(this.params.post_author); 
  },
  waitOn: function() {
    return [
    Meteor.subscribe('posts'),
    Meteor.subscribe('comments'),
    Meteor.subscribe('histoires'),
    Meteor.subscribe('friends'),
    Meteor.subscribe('visites'),
    Meteor.subscribe('commentaires'),
    Meteor.subscribe('messages_signaler'),
    Meteor.subscribe('favoris'),
     ];
     },
});

Router.route('/ils_ont_aide_mobile/:post_author?', {
  name: 'ils_ont_aide_mobile',
  template : 'ils_ont_aide_mobile',
  data: function() {
    return Meteor.users.findOne(this.params.post_author); 
  },
  waitOn: function() {
    return [
    Meteor.subscribe('posts'),
    Meteor.subscribe('comments'),
    Meteor.subscribe('histoires'),
    Meteor.subscribe('friends'),
    Meteor.subscribe('visites'),
    Meteor.subscribe('commentaires'),
    Meteor.subscribe('messages_signaler'),
    Meteor.subscribe('favoris'),
     ];
     },
})

Router.route('/alerte/:post_author?', {
  name: 'alerte',
  template : 'alerte',
  data: function() {
    return Meteor.users.findOne(this.params.post_author); 
  },
  waitOn: function() {
    return [
    Meteor.subscribe('posts'),
    Meteor.subscribe('comments'),
    Meteor.subscribe('histoires'),
    Meteor.subscribe('friends'),
    Meteor.subscribe('visites'),
    Meteor.subscribe('commentaires'),
    Meteor.subscribe('messages_signaler'),
    Meteor.subscribe('favoris'),
     ];
     },
});

Router.route('/avertissement/:post_author?', {
  name: 'avertissement',
  template : 'avertissement',
  data: function() {
    return Meteor.users.findOne(this.params.post_author); 
  },
  waitOn: function() {
    return [
    Meteor.subscribe('posts'),
    Meteor.subscribe('comments'),
    Meteor.subscribe('histoires'),
    Meteor.subscribe('friends'),
    Meteor.subscribe('visites'),
    Meteor.subscribe('commentaires'),
    Meteor.subscribe('messages_signaler'),
    Meteor.subscribe('favoris'),
     ];
     }, 
});

Router.route('/avertissement_mobile/:post_author?', {
  name: 'avertissement_mobile',
  template : 'avertissement_mobile',
  data: function() {
    return Meteor.users.findOne(this.params.post_author); 
  },
 waitOn: function() {
    return [
    Meteor.subscribe('posts'),
    Meteor.subscribe('comments'),
    Meteor.subscribe('histoires'),
    Meteor.subscribe('friends'),
    Meteor.subscribe('visites'),
    Meteor.subscribe('commentaires'),
    Meteor.subscribe('messages_signaler'),
    Meteor.subscribe('favoris'),
     ];
     },
});

Router.route('/add_commentaire_mobile/:post_author?', {
  name: 'add_commentaire_mobile',
  template : 'add_commentaire_mobile',
  data: function() {
    return Meteor.users.findOne(this.params.post_author); }
});

Router.route('/valider_commentaire_mobile/:post_author?', {
  name: 'valider_commentaire_mobile',
  template : 'valider_commentaire_mobile',
  data: function() {
    return Meteor.users.findOne(this.params.post_author); }
});

Router.route('/presentation/:post_author?', {
  name: 'presentation',
  template : 'presentation',
  data: function() {
    return Meteor.users.findOne(this.params.post_author);
     },
  waitOn: function() {
    return [
    Meteor.subscribe('posts'),
    Meteor.subscribe('comments'),
    Meteor.subscribe('histoires'),
    Meteor.subscribe('friends'),
    Meteor.subscribe('visites'),
    Meteor.subscribe('commentaires'),
    Meteor.subscribe('messages_signaler'),
    Meteor.subscribe('favoris'),
     ];
     },
});

Router.route('/alertes_mobile/:post_author?', {
  name: 'alertes_mobile',
  template : 'alertes_mobile',
  data: function() {
    return Meteor.users.findOne(this.params.post_author); }
});

Router.route('/creerAlerte/:post_author?', {
  name: 'creerAlerte',
  template : 'creerAlerte',
  data: function() {
    return Meteor.users.findOne(this.params.post_author); }
});

Router.route('/valider_Alerte/:post_author?', {
  name: 'valider_Alerte',
  template : 'valider_Alerte',
  data: function() {
    return Meteor.users.findOne(this.params.post_author); }
});

Router.route('/presentation_mobile/:post_author?', {
  name: 'presentation_mobile',
  template : 'presentation_mobile',
  data: function() {
    return Meteor.users.findOne(this.params.post_author); }
});

Router.route('/notifications_mobile', {
  name: 'notifications_mobile',
  template : 'notifications_mobile1',
  
});

Router.route('/profil_mobile/:post_author?', {
  name: 'profil_mobile',
  template : 'profil_mobile',
  data: function() {
    return Meteor.users.findOne(this.params.post_author); 
  },
  waitOn: function() {
    return [
    Meteor.subscribe('posts'),
    Meteor.subscribe('comments'),
    Meteor.subscribe('histoires'),
    Meteor.subscribe('friends'),
    Meteor.subscribe('visites'),
    Meteor.subscribe('commentaires'),
    Meteor.subscribe('messages_signaler'),
    Meteor.subscribe('favoris'),
     ];
     },
});

Router.route('/amis_mobile/:post_author?', {
  name: 'amis_mobile',
  template : 'amis_mobile',
  data: function() {
    return Meteor.users.findOne(this.params.post_author); 
  },
  waitOn: function() {
    return [
    Meteor.subscribe('posts'),
    Meteor.subscribe('comments'),
    Meteor.subscribe('histoires'),
    Meteor.subscribe('friends'),
    Meteor.subscribe('visites'),
    Meteor.subscribe('commentaires'),
    Meteor.subscribe('messages_signaler'),
    Meteor.subscribe('favoris'),
     ];
     },
});


Router.route('/connexion_mobile', {
  name: 'connexion_mobile',
  template : 'connexion_mobile',
});

Router.route('/supprimer_mon_compte', {
  name: 'supprimer_mon_compte',
  template : 'supprimer_mon_compte',
});

Router.route('/dashboard', {
  name: 'dashboard',
  template : 'dashboard',
});

Router.route('/dons', {
  name: 'dons',
  template : 'dons',
});

Router.route('/cgu', {
  name: 'cgu',
  template : 'cgu',
});

Router.route('/numero', {
  name: 'numero',
  template : 'numero',
});

Router.route('/rejoindre', {
  name: 'rejoindre',
  template : 'rejoindre',
});

Router.route('/confirmation-rejoindre', {
  name: 'confirmation_rejoindre',
  template : 'confirmation_rejoindre',
});

Router.route('/poeme', {
  name: 'poeme',
  template : 'poeme',
});

/*Router.route('/le_secret_de_cendrillon', function() {
    var filePath = process.env.PWD + "/server/le_secret_de_cendrillon.pdf";
    var fs = Meteor.npmRequire('fs');
    var data = fs.readFileSync(filePath);
    this.response.write(data);
    this.response.end();
}, {
    where: 'server'
});*/

Router.route('/le_secret_de_cendrillon', {
  name: 'le_secret_de_cendrillon',
  template : 'le_secret_de_cendrillon',
});

Router.onBeforeAction('dataNotFound', {only: 'postPage'});