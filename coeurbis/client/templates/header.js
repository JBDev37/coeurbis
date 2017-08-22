Template.header.helpers({
    id: function() {
    return Meteor.userId();
  }
});

accountsUIBootstrap3.logoutCallback = function(error) {

  if(error) console.log("Error:" + error);
  Router.go('index');
}
 /*var id = Meteor.userId();
var on = Meteor.users.find({"_id":id, "status.online": true })
if(on){

}*/

Template.header.events({
     'click .messagerie_ecran':function() {
    var userId = Meteor.userId();
    var search = ContactChat.findOne({$or : [{from_id: userId, show:true }, {to_id:userId, show:true}]}, {sort: {date: -1}});
    
    if(search.from_id == userId){
    var id = search.to_id} else{
    var id = search.from_id
    }

    Router.go('messagerie', {post_author: id});
  },
});

accountsUIBootstrap3.setLanguage('fr');

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY'
});


i18n.map("fr",{
  loginButtonsLoggedOutDropdown: {
    signIn: "Connexion",
    up: "Inscription"
  }
});

/*accountsUIBootstrap3.setCustomSignupOptions = function() {

    return {
        histoire: ' ',
        titre_histoire: ' ',
        on_line: new Date(),
    }
}*/

Accounts.ui.config({
    requestPermissions: {},
    extraSignupFields: [

	{
        fieldName: 'mail',
        fieldLabel: 'Email',
        inputType: 'mail',
        visible: true,
    },

    
    {
        
        fieldName: 'naissance',
        fieldLabel: 'Date de naissance (+ 13 ans)',
        inputType: 'date',
        showFieldLabel: true,
        visible: true
 		},

 	{
        fieldName: 'gender',
        showFieldLabel: false,      // If true, fieldLabel will be shown before radio group
        fieldLabel: 'Gender',
        inputType: 'radio',
        radioLayout: 'vertical',    // It can be 'inline' or 'vertical'
        data: [{                    // Array of radio options, all properties are required
    		id: 1,                  // id suffix of the radio element
            label: 'Garçon',          // label for the radio element
            value: 'garcon'              // value of the radio element, this will be saved.
          }, {
            id: 2,
            label: 'Fille',
            value: 'fille',
            checked: 'checked'
        }],
        visible: true
    },

    {
        fieldName: 'pays',
        fieldLabel: 'Pays',
        inputType: 'select',
        showFieldLabel: true,
        empty: 'Sélectionner un pays',
        data: [{
            id: 1,
            label: 'France',
            value: 'Fr'
          }, {
            id: 2,
            label: 'Canada',
            value: 'Ca',
        },{
            id: 3,
            label: 'Belgique',
            value: 'Bel',
        },
        {
            id: 4,
            label: 'Maroc',
            value: 'Ma',
        },
        {
            id: 5,
            label: 'Algerie',
            value: 'Al',
        },
        {
            id: 6,
            label: 'Tunisie',
            value: 'Tu',
        }
        ],
        visible: true
    }, {
        fieldName: 'terms',
        fieldLabel: 'J\'accepte les conditions générales',
        inputType: 'checkbox',
        visible: true,
        saveToProfile: false,
        validate: function(value, errorFunction) {
            if (value) {
                return true;
            } else {
                errorFunction('Vous devez accepter les conditions générales');
                return false;
            }
        }
    }]
});