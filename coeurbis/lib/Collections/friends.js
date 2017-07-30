Friends = new Mongo.Collection('friends');

Friends.allow({
  
  update: function(userId, post) { return true; },
  remove: function(userId, post) { return true; },
});

Meteor.methods({
    ami_accepte: function(postAttributes) {
        /*check(Meteor.userId(), String);
        check(postAttributes, {
            post_title: String,
            post_content: String,
            categorie: String
        });*/
        var user = Meteor.user();
        var post = _.extend(postAttributes, {
            date: new Date(),
        });
        var postId = Friends.insert(post);
        return {
            _id: postId
        };
    },

});