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
      var gender = Router.current().params.gender;
      var les_deux = Router.current().params.les_deux;
    
    if(les_deux == 'true'){
    return Conseilleres.find({$or :[
        {college:college,
        lycee:lycee,
        adulte:adulte},

        {amour:amour,
        amitie:amitie,
        confiance:confiance,
        sexo:sexo,
        autre:autre},

        {gender:'fille'},
         {gender:'garcon'},
        

    ]}, {sort: {lastLogin: -1}});
    }else {

    return Conseilleres.find({$or :[
        {college:college,
        lycee:lycee,
        adulte:adulte},

        {amour:amour,
        amitie:amitie,
        confiance:confiance,
        sexo:sexo,
        autre:autre},

        {gender:gender},
        

    ]}, {sort: {lastLogin: -1}});
  }
  }
});