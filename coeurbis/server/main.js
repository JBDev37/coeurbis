import { Meteor } from 'meteor/meteor';


Meteor.startup(function () { 

});


Accounts.onCreateUser(function( user) {
    /*console.log(user);*/
    return user;
});
