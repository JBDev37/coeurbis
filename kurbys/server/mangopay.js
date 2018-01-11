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
         var user = Meteor.user();
         var name = user.username;
         var mail = user.profile.mail;
        api.Users.create({
            Name: name,
            Email: mail,
            LegalPersonType: 'BUSINESS',
            LegalRepresentativeFirstName: 'rien ',
            LegalRepresentativeLastName: 'rien ',
            LegalRepresentativeEmail: mail,
            PersonType: "LEGAL",
            /*HeadquartersAddress: {
                "AddressLine1": "4101 Reservoir Rd NW",
                "AddressLine2": "",
                "City": "Washington",
                "Region": "District of Columbia",
                "PostalCode": "20007",
                "Country": "US"
            },*/
            LegalRepresentativeBirthday: 1300186358,
            LegalRepresentativeNationality: 'FR',
            LegalRepresentativeCountryOfResidence: 'FR',
            Tag: name
        }, function(data) {
           bound(() => {
            // Output the created user data to console
            console.log(data.Name + ' user created at ' + data.CreationDate);
            var post = {
              userId: userId, 
              Id_user_mangopay:data.Id,
              Wallet_Id:"0",
              CardId:"0",
              Num_BankAccount:"0",
              url:"0",
              name : name
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
                "Description": data.Name,
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
var name = request.name;

       api.CardRegistrations.create({ 
      "Tag": "post.name_carte",
      "UserId": mangopay_id,
      "Currency": "EUR",
      "CardType": "CB_VISA_MASTERCARD"
      }, function(data) {
       bound(() => {
            // Output the created user data to console
            console.log(data);

       Mangopay.update({userId:userId},  {$set: {AccessKey:data.AccessKey, PreregistrationData:data.PreregistrationData, CardIdRegister:data.Id, CardRegistrationURL:data.CardRegistrationURL}});

        }); // fin de function(data)
           
      });

},

CardId: function(post) {
var userId = Meteor.userId();
Mangopay.update({userId:userId},  {$set: {CardId:post.CardId}});
},




PayIn: function(post) {
const bound = Meteor.bindEnvironment((callback) => {callback();});
var userId = Meteor.userId();
var frais = post.frais * 100;
var don = post.don * 100;
var from = post.From_id;
var to = post.To_id;

var request_from = Mangopay.findOne({userId:from});
var From_id = request_from.Id_user_mangopay;
var Wallet_from = request_from.Wallet_Id;
var CardId_from = request_from.CardId;
var name = request_from.name;
var message = post.message

var request_to = Mangopay.findOne({userId:to});
var To_id = request_to.Id_user_mangopay;
var Wallet_to = request_to.Wallet_Id;
var CardId_to = request_to.CardId;
var transfert = don - frais;
    
    api.PayIns.create({
    "Tag": "message",
    "AuthorId": From_id,
    "CreditedUserId": From_id,
    "CreditedWalletId": Wallet_from,
    "DebitedFunds": {
    "Currency": "EUR",
    "Amount": don,
    },
    "Fees": {
    "Currency": "EUR",
    "Amount": frais,
    },
    "SecureModeReturnURL": "https://www.kurbys.com/index",
    "CardId": CardId_from,
    "SecureMode": "DEFAULT",
    "StatementDescriptor": "Don",
    "ResultMessage": "Transaction réussi",
    "Type": "PAYIN",
    "PaymentType": "CARD",
    "ExecutionType": "DIRECT"
    }, function(data) {
       bound(() => {
            // Output the created user data to console
            console.log(data);
            var url = data.SecureModeRedirectURL;
            if(url){
                    Mangopay.update({userId:userId},  {$set: {url_3DS:url}});
                   
                   /* api.Hooks.create({
                    "Tag": "custom meta",
                    "EventType": "PAYIN_NORMAL_CREATED",
                    "Url": url
                  }, function(data) {
       
            // Output the created user data to console
            console.log(data);

      });*/
            }
          });
      });
},

Transfert: function(post) {

var frais = post.frais * 100;
var don = post.don * 100;
var from = post.From_id;
var to = post.To_id;

var request_from = Mangopay.findOne({userId:from});
var From_id = request_from.Id_user_mangopay;
var Wallet_from = request_from.Wallet_Id;
var CardId_from = request_from.CardId;
var name = request_from.name;
var message = post.message

var request_to = Mangopay.findOne({userId:to});
var To_id = request_to.Id_user_mangopay;
var Wallet_to = request_to.Wallet_Id;
var CardId_to = request_to.CardId;
var transfert = don - frais;
    
/*
    api.Transfers.create({

    "Tag": "transfert",
    "DebitedFunds": {
    "Currency": "EUR",
    "Amount": transfert,
    },
    "Fees": {
    "Currency": "EUR",
    "Amount": 0
    },
    "DebitedWalletId": Wallet_from,
    "CreditedWalletId": Wallet_to,
    "AuthorId": From_id,
    "CreditedUserId": To_id,
    "Nature": "REGULAR",
    "Status": "SUCCEEDED",
    "ResultCode": "000000",
    "ResultMessage": "Transaction réussi",
    //"Type": "PAYIN"
    }, function(data) {
       
            // Output the created user data to console
            console.log(data);

      });*/
},


Account: function(post) {
const bound = Meteor.bindEnvironment((callback) => {callback();});
var id =post.userId;
var iban = post.Iban;
var nom = post.nom;
var prenom = post.prenom;
var ville = post.ville;
var code = post.code;
var adresse = post.adresse;
var pays = post.pays;
var nom_complet = prenom + " " + nom;


    api.Users.createBankAccount(id,{

    "Type": "IBAN",
    "OwnerAddress": {
    "AddressLine1": adresse,
    "City": ville,
    "PostalCode": code,
    "Country": pays,
    },
    "OwnerName": nom_complet,
    "Active": true,
    "IBAN": iban,
    
    }, function(data) {
           
               bound(() => {
            console.log(data);

       Mangopay.update({Id_user_mangopay:id},  {$set: {Num_BankAccount:data.Id}});

        });
      });


/*
api.PayOuts.create({
"Tag": "custom meta145",
"AuthorId": id,
"DebitedFunds": {
"Currency": "EUR",
"Amount": 1200
},
"Fees": {
"Currency": "EUR",
"Amount": 0
},
"BankAccountId": "40888161",
"DebitedWalletId": "40719040",
"BankWireRef": "invoice 7282",
"PaymentType": "BANK_WIRE"
}, function(data) {
           
                // Output the created user data to console
                console.log(data);

          });
*/

},

});