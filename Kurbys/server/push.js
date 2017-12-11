Push.debug = true;

Push.Configure({
  apn: {
    certData: Assets.getText('meteorApp-cert-prod.pem'),
    keyData: Assets.getText('meteorApp-key-prod.pem),
    passphrase: 'rocky***',
    production: true,
    //gateway: 'gateway.push.apple.com',
  }
});

Push.allow({
  send: (userId, notification) => {
    // allow all users to send notifications
    return true;
  }
});

Meteor.methods({
  'serverNotification'(title, text) {
    Push.send({
      title,
      text,
      from: 'server',
      badge: 1,
      query: {
  userId: 'target-user-id'
}
    });
  }
});