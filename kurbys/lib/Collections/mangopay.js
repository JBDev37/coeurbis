Mangopay = new Mongo.Collection('mangopay');

Mangopay.allow({
  
  update: function(userId, post) {  return true },
  remove: function(userId, post) {  return true },
});

