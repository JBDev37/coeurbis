ContactChat = new Mongo.Collection('contact_Chat');

ContactChat.allow({
  
  update: function() {  return true },
  remove: function(userId) {  return true },
});

 Meteor.methods({
    contact_chat: function(postAttributes) {
        var post = _.extend(postAttributes, {
            date: new Date(),
            last_message : ' '
        });
        var postId = ContactChat.insert(post);
        return {
            _id: postId
        };
    }
});


 
 Meteor.methods({
    update_active: function(postAttributes) {
    var userId = Meteor.userId();
    if(postAttributes.id_from_active){
   ContactChat.update( { from_id : userId }, { $set:{ "id_from_active" : false } }, { multi : true } );
   ContactChat.update({_id: postAttributes._id}, {$set:{ "id_from_active" : true }} );}
    
    if(postAttributes.id_to_active){
   ContactChat.update( { to_id : userId }, { $set:{ "id_to_active" : false } }, { multi : true } );
   ContactChat.update({_id: postAttributes._id}, {$set:{ "id_to_active" : true }} );}
    //ContactChat.update({from_id : userId}, {$set:{ "active" : false }} );
    //ContactChat.update({to_id : userId}, {$set:{ "active" : false }} );
   ContactChat.update({_id: postAttributes._id}, {$set:{ "active" : true }} );
	}
 });