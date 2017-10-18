Avertissement = new Mongo.Collection('avertissement_user');

Avertissement.allow({
  insert:function(userId, post) {  return true },
  update: function(userId, post) {  return true },
  remove: function(userId, post) {  return true },
});

