import { Meteor } from 'meteor/meteor';


Meteor.startup(function () { 
  var today = new Date();
  var targetDate = new Date();

  targetDate.setDate(today.getDate() - 7); 
  targetDate.setHours(0);
  targetDate.setMinutes(0);
  targetDate.setSeconds(0);

  Posts.remove({post_date: {$lt: targetDate}});
  Comments.remove({submitted: {$lt: targetDate}});
  Visites.remove({post_date: {$lt: targetDate}});

  var targetDate_chat = new Date();

  targetDate_chat.setDate(today.getDate() - 30); 
  targetDate_chat.setHours(0);
  targetDate_chat.setMinutes(0);
  targetDate_chat.setSeconds(0);

  Chat.remove({post_date: {$lt:  targetDate_chat}});
		
	
});


/*Accounts.onCreateUser(function( user) {
    /*console.log(user);
    return user;
});*/
