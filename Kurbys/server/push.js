/*Push.Configure({
  apn: {
    certData: Assets.getText('meteorApp-cert-prod.pem'),
    keyData: Assets.getText('meteorApp-key-prod.pem'),
    passphrase: 'rocky***',
    production: true,
    gateway: 'gateway.push.apple.com',
  },

   gcm: {
    apiKey: 'xxxxxxx',
  }
});

Push.allow({
        send: function(userId, notification) {
            return true; // Allow all users to send
        }
    });



Meteor.methods({
    serverNotification: function(text,title) {
        var badge = 1
        Push.send({
            from: 'push',
            title: title,
            text: text,
            badge: badge,
            /*sound: 'airhorn.caf',*/
            /*payload: {
                title: title,
                text:text,
                historyId: result
            },
            query: {
                // this will send to all users
            }
        });
    },

});*/