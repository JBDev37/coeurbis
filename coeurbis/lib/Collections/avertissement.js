Avertissement = new Mongo.Collection('avertissement_user');

Avertissement.allow({
  
  update: function(userId, post) {  return true },
  remove: function(userId, post) {  return true },
});

