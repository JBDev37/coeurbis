Template.recherche_mobile.events({
  'submit form': function(e) {
    e.preventDefault();

      var College = $('input[type=radio][name=college]:checked').attr('value');
      var Lycee = $('input[type=radio][name=lycee]:checked').attr('value');
      var Adulte = $('input[type=radio][name=adulte]:checked').attr('value');
      
      var Amour = $('input[type=radio][name=amour]:checked').attr('value');
      var Amitie = $('input[type=radio][name=amitie]:checked').attr('value');
      var Confiance = $('input[type=radio][name=confiance]:checked').attr('value');
      var Sexo = $('input[type=radio][name=sexo]:checked').attr('value');
      var Autre = $('input[type=radio][name=autre]:checked').attr('value');


      var Sexe_garcon = $('input[type=radio][name=garcon]:checked').attr('value');
      var Sexe_fille = $('input[type=radio][name=fille]:checked').attr('value');
      var Les_deux = $('input[type=radio][name=les_deux]:checked').attr('value');
      
      
     if(Sexe_fille){gender = 'fille';}else{gender='garcon'}  
     if(Sexe_garcon){gender = 'garcon';}else{gender='fille'}  
     if(College){college = true;}else{college=false}
     if(Lycee){lycee = true;}else{lycee=false}
     if(Adulte){adulte = true;}else{adulte=false}
     if(Amour){amour = true;}else{amour=false}
     if(Amitie){amitie = true;}else{amitie=false}
     if(Confiance){confiance = true;}else{confiance=false}
     if(Sexo){sexo = true;}else{sexo=false}
     if(Autre ){autre = true;}else{autre=false}
     if(Les_deux ){les_deux = true;}else{les_deux=false}


      Router.go('resultat_conseillere_mobile', {
        college:college,
        lycee:lycee,
        adulte:adulte,

        amour:amour,
        amitie:amitie,
        confiance:confiance,
        sexo:sexo,
        autre:autre,

        gender:gender,
        les_deux:les_deux



      });
      
      //document.getElementById('147').value="";
     


    

    //document.getElementById("me").value="";
    //Router.go('confirmation_conseillere');
    
  }



});

