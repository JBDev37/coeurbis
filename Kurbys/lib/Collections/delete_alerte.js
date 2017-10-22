DeleteAlertes = new Mongo.Collection('delete_alertes');

DeleteAlertes.allow({
  
  update: function(userId, post) {  return true },
  remove: function(userId, post) {  return true },
});

Meteor.methods({
    delete_alerte: function(postAttributes) {
        var post = _.extend(postAttributes, {
            
        });
        var postId = DeleteAlertes.insert(post);
        return {
            _id: postId
        };
    },

    

});