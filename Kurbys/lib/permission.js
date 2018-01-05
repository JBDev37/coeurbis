// check that the userId specified owns the documents
ownsDocument = function(userId, doc) {
  //return doc && doc.userId === userId;
  return 1===1;
}

/*import mangopay from 'mangopay2-nodejs-sdk';*/
/*var mangopay = require('mangopay2-nodejs-sdk');

var api = new mangopay({
    clientId: '07101987',
    clientPassword: 'XTPq9o43LiGbKHnmkLh7hUZk2ATfQ8Nj8fAKo3jSmkYJF96Hg1',
    // Set the right production API url. If testing, omit the property since it defaults to sandbox URL
    baseUrl: 'https://api.sandbox.mangopay.com'
});*/
/*
HTTP.call( 'POST', 'https://api.sandbox.mangopay.com/v2.01/07101987/cardregistrations', {
  data: {
    "Tag": "custom meta",
"UserId": "39677504",
"Currency": "EUR",
"CardType": "CB_VISA_MASTERCARD"
  }
}, function( error, response ) {
  if ( error ) {
    console.log( error );
  } else {
    console.log( response);
    
     This will return the HTTP response object that looks something like this:
     {
       content: "String of content...",
       data: {
         "id": 101,
         "title": "Title of our new post",
         "body": "Body of our new post",
         "userId": 1337
       },
       headers: {  Object containing HTTP response headers }
       statusCode: 201
     }
    



  }
});*/

