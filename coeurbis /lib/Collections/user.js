import {Mongo} from 'meteor/mongo';
Meteor.users.allow({
  
  /*update: function(userId, post) { return ownsDocument(userId, post); },*/
  remove: function(userId) { return true ; },
});