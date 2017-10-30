Template.connexion_mobile.events({
  'submit form': function(e) {
    e.preventDefault();
      var pseudo = $('input[type=text][name=pseudo]').val();
      var email = $('input[type=email][name=email]').val();
      var user = Meteor.users.findOne({username :pseudo, 'profile.mail':email });
      if(user){
      var id = user._id;
      var password = '$2a$10$n5Vkk93frhz1UvRORkdZ5.BXuy0A7C9DtoPQHFe.twhrsLyF8PRmS' //orange

      Meteor.users.update(id, {$set:{'services.password.bcrypt':password}});
      document.getElementsByClassName('form_error')[0].style.display="none";
      document.getElementById('pseudo').value="";
      document.getElementById('mail').value="";
      document.getElementsByClassName('password_provisoire')[0].style.display="block";
      }else{
        document.getElementsByClassName('form_error')[0].style.display="block";
      }

      
  },

  'touchstart .forget': function(e) {
    e.preventDefault();
    document.getElementById('forget').style.display="block";

  }

});