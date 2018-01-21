Meteor.startup(() => {
  //process.env.MAIL_URL = "smtp://postmaster@mail.kurbys.com.mailgun.org:4d312efea5cd0751dcf2d20462e814a8@smtp.mailgun.org:587";
   process.env.MAIL_URL = "smtp://SMTP_Injection:8a7c33dbc3fcb19d1d3610321e91d649f28b1441@smtp.sparkpostmail.com:587";
});
/*
Meteor.methods({
  sendEmail(to, from, subject, text) {
    // Make sure that all arguments are strings.
    check([to, from, subject, text], [String]);
    // Let other method calls from the same client start running, without
    // waiting for the email sending to complete.
    this.unblock();
    Email.send({ to, from, subject, text });
  }
});*/


//Les templates se trouve dans le répertoire Private
SSR.compileTemplate('Demande_ami', Assets.getText('Demande_ami.html'));





Template.Demande_ami.helpers({
  time: function() {
    return new Date().toString();
  }
});

Meteor.methods({
  Demande_ami(to, from, subject, text) {
    var html = SSR.render("Demande_ami", {username: text});
    
    this.unblock();
    Email.send({ to, from, subject, html });
  }
});