SSL('/Users/roussatjean-claude/Desktop/coeurbis/Kurbys/private/server.key','/Users/roussatjean-claude/Desktop/coeurbis/Kurbys/private/server.crt', 443);

var mangopay = require('mangopay2-nodejs-sdk');

var api = new mangopay({
    clientId: '07101987',
    clientPassword: 'XTPq9o43LiGbKHnmkLh7hUZk2ATfQ8Nj8fAKo3jSmkYJF96Hg1',
    // Set the right production API url. If testing, omit the property since it defaults to sandbox URL
    baseUrl: 'https://api.sandbox.mangopay.com'
});



 Meteor.methods({
    mangopay: function(postAttributes) {

 var userId = Meteor.userId();

const bound = Meteor.bindEnvironment((callback) => {callback();});

api.Users.create({
    Name: 'MangoPay',
    Email: 'info@mangopay.com',
    LegalPersonType: 'BUSINESS',
    LegalRepresentativeFirstName: 'Mango',
    LegalRepresentativeLastName: 'Pay',
    LegalRepresentativeEmail: 'mango@mangopay.com',
    PersonType: "LEGAL",
    HeadquartersAddress: {
        "AddressLine1": "4101 Reservoir Rd NW",
        "AddressLine2": "",
        "City": "Washington",
        "Region": "District of Columbia",
        "PostalCode": "20007",
        "Country": "US"
    },
    LegalRepresentativeBirthday: 1300186358,
    LegalRepresentativeNationality: 'FR',
    LegalRepresentativeCountryOfResidence: 'FR',
    Tag: 'custom tag'
}, function(data) {
   bound(() => {
    // Output the created user data to console
    console.log(data.Name + ' user created at ' + data.CreationDate);
    var post = {
      userId: userId, 
      Id_user_mangopay:data.Id,
      Wallet_Id:"0"
    };

    Mangopay.insert(post);

    /*var request = Mangopay.findOne(userId);
var mangopay_id = request.Id_user_mangopay;*/

        api.Wallets.create({
        "Tag": "custom meta",
        "Owners": [ data.Id ],
        "Balance": {
        "Currency": "EUR",

        },
        "FundsType": "DEFAULT",
        "Description": "My big project",
        "Currency": "EUR"

        }, function(data) {
           bound(() => {
            // Output the created user data to console
            console.log(data.Id + ' user created at ' + data.CreationDate);

            Mangopay.update({userId:userId},  {$set: {Wallet_Id:data.Id}});
             });
        });

     });
});

       
    },

CartRegister: function(post) {
const bound = Meteor.bindEnvironment((callback) => {callback();});
var userId = Meteor.userId();
var request = Mangopay.findOne({userId:userId});
var mangopay_id = request.Id_user_mangopay;


       api.CardRegistrations.create({ 
      "Tag": "custom meta007",
      "UserId": mangopay_id,
      "Currency": "EUR",
      "CardType": "CB_VISA_MASTERCARD"
      }, function(data) {
       bound(() => {
            // Output the created user data to console
            console.log(data);

       Mangopay.update({userId:userId},  {$set: {AccessKey:data.AccessKey, PreregistrationData:data.PreregistrationData, CardId:data.Id, CardRegistrationURL:data.CardRegistrationURL}});







        }); // fin de function(data)
           
      });

},

});









api.PayIns.create({
"Tag": "custom meta",
"AuthorId": "40706141",
"CreditedUserId": "40706141",
"CreditedWalletId": "40706171",
"DebitedFunds": {
"Currency": "EUR",
"Amount": 1200
},
"DebitedWalletId": "40706171",
"CreditedFunds": {
"Currency": "EUR",
"Amount": 1200
},
"Fees": {
"Currency": "EUR",
"Amount": 10
},
"SecureModeReturnURL": "http://www.my-site.com/returnURL",
"CardId": "40706151",
"SecureMode": "DEFAULT",
"StatementDescriptor": "Mar2016",
"ResultMessage": "The transaction was successful",
"Type": "PAYIN",
"PaymentType": "CARD",
"ExecutionType": "DIRECT"
});


/*
api.CardRegistrations.get({
           "Id": "39924627"
            },function( error, response ) {
  if ( error ) {
    console.log( error );
  } else {
    console.log( response);
   }
});
*/

/*
api.Users.get(
           40587612
            ,function( error, response ) {
  if ( error ) {
    console.log( error );
  } else {
    console.log( response);
   }
});
*/


/*
api.Wallets.create({
"Id": "1r1gfhc214vgfd",
"CreationDate": 12926321,
"Tag": "custom meta",
"Owners": [ "39677373" ],
"Balance": {
"Currency": "EUR",
"Amount": 12630.0
},
"FundsType": "DEFAULT",
"Description": "My big project",
"Currency": "EUR"

}).then(function(){
    // Output the created user data to console
    console.log();
});
*/




