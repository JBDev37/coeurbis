Visites = new Mongo.Collection('visites');

Visites.allow({
  
  update: function(userId) {  return true },
  remove: function(userId) {  return true },
});

Meteor.methods({
    add_visites: function(postAttributes) {
        var post = _.extend(postAttributes, {
            post_date: new Date(),
            
        });
        var postId = Visites.insert(post);
       
        return {
            _id: postId
        };
    },

});