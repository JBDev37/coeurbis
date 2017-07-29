Requests = new Mongo.Collection('requests');

Meteor.methods({
    demande_ami: function(postAttributes) {
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
        var postId = Requests.insert(post);
        return {
            _id: postId
        };
    }
});