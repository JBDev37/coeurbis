UserBloquer = new Mongo.Collection('userBloquer');

UserBloquer.allow({
  
  update: function(userId) {  return true },
  remove: function(userId) {  return true },
});