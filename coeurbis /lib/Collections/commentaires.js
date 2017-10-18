Commentaires = new Mongo.Collection('commentaires');

Commentaires.allow({
  
  update: function(userId, post) {  return true },
  remove: function(userId, post) {  return true },
});

Meteor.methods({
    AddComment: function(postAttributes) {
        var post = _.extend(postAttributes, {
            date: new Date(),
            read:false
        });
        var postId = Commentaires.insert(post);
        return {
            _id: postId
        };
    },

    

});