Dons = new Mongo.Collection('dons');

Dons.allow({
  
  update: function(userId, post) { return ownsDocument(userId, post); },
  remove: function(userId, post) { return ownsDocument(userId, post); },
});

Meteor.methods({
    Dons: function(postAttributes) {
        var post = _.extend(postAttributes, {
            
        });
        var postId = Dons.insert(post);
        return {
            _id: postId
        };
    },

    

});





