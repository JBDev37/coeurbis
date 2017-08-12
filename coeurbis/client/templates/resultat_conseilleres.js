Template.resultat_conseillere.helpers({

  show_conseilleres: function() {
    
      var college = Router.current().params.college;
      var lycee = Router.current().params.lycee;
      var adulte = Router.current().params.adulte;
      
      var amour = Router.current().params.amour;
      var amitie = Router.current().params.amitie;
      var confiance = Router.current().params.confiance;
      var sexo = Router.current().params.sexo;
      var autre = Router.current().params.autre;


      var sexe_garcon = Router.current().params.sexe_garcon;
      var sexe_fille = Router.current().params.sexe_fille;
      var les_deux = Router.current().params.les_deux;
    

    return Conseilleres.find({$or :[
        {college:college},
        {lycee:lycee},
        {adulte:adulte},

        {amour:amour},
        {amitie:amitie},
        {confiance:confiance},
        {sexo:sexo},
        {autre:autre},

        {sexe_garcon:sexe_garcon},
        {sexe_fille:sexe_fille},

    ]});
  }
});