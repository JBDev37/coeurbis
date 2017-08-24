Template.devenir_conseillere_mobile.events({
  'submit form': function(e) {
    e.preventDefault();

    Sexe_fille = $('input[type=checkbox][name=fille]:checked').attr('value');
     if(Sexe_fille){sexe_fille = $('input[type=checkbox][name=fille]:checked').attr('value');}else{sexe_fille=false}

    Sexe_garcon = $('input[type=checkbox][name=garcon]:checked').attr('value');
     if(Sexe_garcon){sexe_garcon = $('input[type=checkbox][name=garcon]:checked').attr('value');}else{sexe_garcon=false}

    College = $('input[type=checkbox][name=college]:checked').attr('value');
     if(College){college = $('input[type=checkbox][name=college]:checked').attr('value');}else{college=false}

    Lycee= $('input[type=checkbox][name=lycee]:checked').attr('value');
     if(Lycee){lycee = $('input[type=checkbox][name=lycee]:checked').attr('value');}else{lycee=false}

    Adulte = $('input[type=checkbox][name=adulte]:checked').attr('value');
     if(Adulte){adulte = $('input[type=checkbox][name=adulte]:checked').attr('value');}else{adulte=false}

    Amour = $('input[type=checkbox][name=amour]:checked').attr('value');
     if(Amour){amour = $('input[type=checkbox][name=amour]:checked').attr('value');}else{amour=false}

    Amitie = $('input[type=checkbox][name=amitie]:checked').attr('value');
     if(Amitie){amitie = $('input[type=checkbox][name=amitie]:checked').attr('value');}else{amitie=false}

    Confiance = $('input[type=checkbox][name=confiance]:checked').attr('value');
     if(Confiance){confiance = $('input[type=checkbox][name=confiance]:checked').attr('value');}else{confiance=false}

    Sexo = $('input[type=checkbox][name=sexo]:checked').attr('value');
     if(Sexo){sexo = $('input[type=checkbox][name=sexo]:checked').attr('value');}else{sexo=false}

    Autre = $('input[type=checkbox][name=autre]:checked').attr('value');
     if(Autre){autre = $('input[type=checkbox][name=autre]:checked').attr('value');}else{autre=false}
    
    var post = {    
      sexe_garcon: sexe_garcon,
      sexe_fille: sexe_fille,
      
      college: college,
      lycee: lycee,
      adulte: adulte,
      
      amour: amour,
      amitie: amitie,
      confiance: confiance,
      sexo: sexo,
      autre: autre,
      
      presentation: $(e.target).find('[name=presentation]').val(),
    };

    var errors = validatePost(post);
    if (errors.sexe || errors.presentation)
      return Session.set('postSubmitErrors', errors);

    Meteor.call('AddConseillere', post, function(error, result) { // on recherche la methode 'postInsert' 
            // affiche l'erreur à l'utilisateur et s'interrompt
            if (error)
                return throwError(error.reason);
            
        });
    document.getElementById("me").value="";
    Router.go('confirmation_conseillere_mobile');
    
  },


  'click .retour': function(e) {
     window.history.back();
   },
});

Template.confirmation_conseillere_mobile.events({
  'click .retour': function(e) {
    var my_id = Meteor.userId();
    Router.go('profil_mobile', {post_author: my_id});
  }

});