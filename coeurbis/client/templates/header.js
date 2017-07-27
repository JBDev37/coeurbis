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
        fieldName: 'presentation',
        showFieldLabel: false,     
        fieldLabel: 'Presentation',
        inputType: 'radio',
        radioLayout: 'vertical',    
        data: [{
            id: 1,
            label: 'presentation',
            value: 'dddd',
            checked: 'checked'
        }],
        visible: true
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