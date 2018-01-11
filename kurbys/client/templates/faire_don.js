Template.faire_don.events({
  'submit form': function(e) {
    e.preventDefault();

      var dix = $('input[type=radio][name=10]:checked').attr('value');
      var vingt = $('input[type=radio][name=20]:checked').attr('value');
      var trente = $('input[type=radio][name=30]:checked').attr('value');
      var quarante = $('input[type=radio][name=40]:checked').attr('value');
      var cinquante = $('input[type=radio][name=50]:checked').attr('value');
      var message = $(e.target).find('[name=presentation]').val();
      
      if(dix){var don = 1000; var frais = 100}
      if(vingt){var don = 2000; var frais = 300}
      if(trente){var don = 3000; var frais = 400}
      if(quarante){var don = 4000; var frais = 600}
      if(cinquante){var don = 5000; var frais = 700}


      var userId = Meteor.userId();
      var id = Router.current().params.post_author;
      var user = Meteor.users.findOne(id);
      var my_name = Meteor.users.findOne(userId);
      var montant = don / 100;
      var montant_frais = frais / 100;
      var date = new Date();
      var post = {
              From_id: userId,
              From_name:my_name.username,
              To_id:id,
              To_name:user.username,
              message:message,
              don: montant,
              frais: montant_frais,
              date : date
            };

            
     
      var user_mango = Mangopay.findOne({userId:userId});
      var card = parseInt(user_mango.CardId);
      if (card==0) {
         Router.go('compte_bancaire', {post_author:userId});
      
      }else{

         Meteor.call('Dons', post, function(error, result) { // on recherche la methode 'postInsert' 
            // affiche l'erreur à l'utilisateur et s'interrompt
            if (error)
                return throwError(error.reason);
          });

         Meteor.call('PayIn', post, function(error, result) { // on recherche la methode 'postInsert' 
            var userId = Meteor.userId();
            var user_mango = Mangopay.findOne({userId:userId});
            var url = user_mango.url_3DS;
            if (result){}
              
            if(url=="0"){Router.go('confirmation_don');
             }else{Router.go(url)}
                return throwError(error.reason);
            if (error)
                return throwError(error.reason);
          });

           

         Meteor.call('Transfert', post, function(error, result) { // on recherche la methode 'postInsert' 
            // affiche l'erreur à l'utilisateur et s'interrompt
            if (error)
                return throwError(error.reason);
          });

        // Router.go('confirmation_don');
      }

      
      
      //document.getElementById('147').value="";
     


    

    //document.getElementById("me").value="";
    //Router.go('confirmation_conseillere');
    
  }



});


