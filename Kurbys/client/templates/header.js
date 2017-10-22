Template.header.helpers({
    id: function() {
    Meteor.subscribe('contact_Chat');
        
    return Meteor.userId();
  },

    notificationAlertes : function() {
    var userId = Meteor.userId();
   return Alertes.find( { read: { $ne:userId }, author_id: { $ne:userId } });
  },

    notificationCount: function(){
    var userId = Meteor.userId();
    var alertes = Alertes.find( { read: { $ne:userId }, author_id: { $ne:userId } }).count();
    return alertes;
  },



});

accountsUIBootstrap3.logoutCallback = function(error) {

  if(error) console.log("Error:" + error);
  Router.go('postsList');
}

/*Accounts.onLogin(function () {
 Router.go('index');
});*/


 /*var id = Meteor.userId();
var on = Meteor.users.find({"_id":id, "status.online": true })
if(on){

}*/

Template.header.events({
     'click .messagerie_ecran':function() {

    var userId = Meteor.userId();

    var search = ContactChat.findOne({$or : [{from_id: userId, show:true }, {to_id:userId, show:true}]}, {sort: {date: -1}});
    if(search){
    if(search.from_id == userId){
    var id = search.to_id} else{
    var id = search.from_id
    }
    Router.go('messagerie', {post_author: id});
    }else{
    Router.go('messagerie_vierge', {post_author: userId});
    }
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

    /*{
        fieldName: 'pays',
        fieldLabel: 'Pays',
        inputType: 'select',
        showFieldLabel: true,
        empty: 'Sélectionner un pays',
        data: [{
            id: 1,
            label: 'France',
            value: 'Fr'
          }, 

          {id:70,label:' ',value:' ',},

          {
            id: 2,
            label: 'Canada',
            value: 'Ca',
        },

        {
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
        },

        {id:7,label:'Afghanistan ',value:'AF:  ',},
{id:8,label:'Afrique du Sud ',value:'ZA:  ',},
{id:9,label:'Albanie ',value:'AL:  ',},
{id:10,label:'Algérie ',value:'DZ:  ',},
{id:11,label:'Allemagne ',value:'DE:  ',},
{id:12,label:'Andorre ',value:'AD:  ',},
{id:13,label:'Angola ',value:'AO:  ',},
{id:14,label:'Anguilla ',value:'AI:  ',},
{id:15,label:'Antarctique ',value:'AQ:  ',},
{id:16,label:'Antigua-et-Barbuda ',value:'AG:  ',},
{id:17,label:'Antilles néerlandaises ',value:'AN:  ',},
{id:18,label:'Arabie saoudite ',value:'SA:  ',},
{id:19,label:'Argentine ',value:'AR:  ',},
{id:20,label:'Arménie ',value:'AM:  ',},
{id:21,label:'Aruba ',value:'AW:  ',},
{id:22,label:'Australie ',value:'AU:  ',},
{id:23,label:'Autriche ',value:'AT:  ',},
{id:24,label:'Azerbaïdjan ',value:'AZ:  ',},
{id:25,label:'Bahamas ',value:'BS:  ',},
{id:26,label:'Bahreïn ',value:'BH:  ',},
{id:27,label:'Bangladesh ',value:'BD:  ',},
{id:28,label:'Barbade ',value:'BB:  ',},
{id:29,label:'Bélarus ',value:'BY:  ',},
{id:30,label:'Belgique ',value:'BE:  ',},
{id:31,label:'Belize ',value:'BZ:  ',},
{id:32,label:'Bénin ',value:'BJ:  ',},
{id:33,label:'Bermudes ',value:'BM:  ',},
{id:34,label:'Bhoutan ',value:'BT:  ',},
{id:35,label:'Bolivie ',value:'BO:  ',},
{id:36,label:'Bosnie-Herzégovine ',value:'BA:  ',},
{id:37,label:'Botswana ',value:'BW:  ',},
{id:38,label:'Brésil ',value:'BR:  ',},
{id:39,label:'Brunéi Darussalam ',value:'BN:  ',},
{id:40,label:'Bulgarie ',value:'BG:  ',},
{id:41,label:'Burkina Faso ',value:'BF:  ',},
{id:42,label:'Burundi ',value:'BI:  ',},
{id:43,label:'Cambodge ',value:'KH:  ',},
{id:44,label:'Cameroun ',value:'CM:  ',},
{id:45,label:'Canada ',value:'CA:  ',},
{id:46,label:'Cap-Vert ',value:'CV:  ',},
{id:47,label:'Ceuta et Melilla ',value:'EA:  ',},
{id:48,label:'Chili ',value:'CL:  ',},
{id:49,label:'Chine ',value:'CN:  ',},
{id:50,label:'Chypre ',value:'CY:  ',},
{id:51,label:'Colombie ',value:'CO:  ',},
{id:52,label:'Comores ',value:'KM:  ',},
{id:53,label:'Congo-Brazzaville ',value:'CG:  ',},
{id:54,label:'Corée du Nord ',value:'KP:  ',},
{id:55,label:'Corée du Sud ',value:'KR:  ',},
{id:56,label:'Costa Rica ',value:'CR:  ',},
{id:57,label:'Côte d’Ivoire ',value:'CI:  ',},
{id:58,label:'Croatie ',value:'HR:  ',},
{id:59,label:'Cuba ',value:'CU:  ',},
{id:60,label:'Danemark ',value:'DK:  ',},
{id:61,label:'Diego Garcia ',value:'DG:  ',},
{id:62,label:'Djibouti ',value:'DJ:  ',},
{id:63,label:'Dominique ',value:'DM:  ',},
{id:64,label:'Égypte ',value:'EG:  ',},
{id:65,label:'El Salvador ',value:'SV:  ',},
{id:66,label:'Émirats arabes unis ',value:'AE:  ',},
{id:67,label:'Équateur ',value:'EC:  ',},
{id:68,label:'Érythrée ',value:'ER:  ',},
{id:69,label:'Espagne ',value:'ES:  ',},
{id:70,label:'Estonie ',value:'EE:  ',},
{id:71,label:'État de la Cité du Vatican ',value:'VA:  ',},
{id:72,label:'États fédérés de Micronésie ',value:'FM:  ',},
{id:73,label:'États-Unis ',value:'US:  ',},
{id:74,label:'Éthiopie ',value:'ET:  ',},
{id:75,label:'Fidji ',value:'FJ:  ',},
{id:76,label:'Finlande ',value:'FI:  ',},
{id:77,label:'France ',value:'FR:  ',},
{id:78,label:'Gabon ',value:'GA:  ',},
{id:79,label:'Gambie ',value:'GM:  ',},
{id:80,label:'Géorgie ',value:'GE:  ',},
{id:81,label:'Géorgie du Sud et les îles Sandwich du Sud ',value:'GS:  ',},
{id:82,label:'Ghana ',value:'GH:  ',},
{id:83,label:'Gibraltar ',value:'GI:  ',},
{id:84,label:'Grèce ',value:'GR:  ',},
{id:85,label:'Grenade ',value:'GD:  ',},
{id:86,label:'Groenland ',value:'GL:  ',},
{id:87,label:'Guadeloupe ',value:'GP:  ',},
{id:88,label:'Guam ',value:'GU:  ',},
{id:89,label:'Guatemala ',value:'GT:  ',},
{id:90,label:'Guernesey ',value:'GG:  ',},
{id:91,label:'Guinée ',value:'GN:  ',},
{id:92,label:'Guinée équatoriale ',value:'GQ:  ',},
{id:93,label:'Guinée-Bissau ',value:'GW:  ',},
{id:94,label:'Guyana ',value:'GY:  ',},
{id:95,label:'Guyane française ',value:'GF:  ',},
{id:96,label:'Haïti ',value:'HT:  ',},
{id:97,label:'Honduras ',value:'HN:  ',},
{id:98,label:'Hongrie ',value:'HU:  ',},
{id:99,label:'Île Bouvet ',value:'BV:  ',},
{id:100,label:'Île Christmas ',value:'CX:  ',},
{id:101,label:'Île Clipperton ',value:'CP:  ',},
{id:103,label:'Île de Man ',value:'IM:  ',},
{id:104,label:'Île Norfolk ',value:'NF:  ',},
{id:105,label:'Îles Åland ',value:'AX:  ',},
{id:106,label:'Îles Caïmans ',value:'KY:  ',},
{id:107,label:'Îles Canaries ',value:'IC:  ',},
{id:108,label:'Îles Cocos - Keeling ',value:'CC:  ',},
{id:109,label:'Îles Cook ',value:'CK:  ',},
{id:110,label:'Îles Féroé ',value:'FO:  ',},
{id:111,label:'Îles Heard et MacDonald ',value:'HM:  ',},
{id:112,label:'Îles Malouines ',value:'FK:  ',},
{id:113,label:'Îles Mariannes du Nord ',value:'MP:  ',},
{id:114,label:'Îles Marshall ',value:'MH:  ',},
{id:115,label:'Îles Mineures Éloignées des États-Unis ',value:'UM:  ',},
{id:116,label:'Îles Salomon ',value:'SB:  ',},
{id:117,label:'Îles Turks et Caïques ',value:'TC:  ',},
{id:118,label:'Îles Vierges britanniques ',value:'VG:  ',},
{id:119,label:'Îles Vierges des États-Unis ',value:'VI:  ',},
{id:120,label:'Inde ',value:'IN:  ',},
{id:121,label:'Indonésie ',value:'ID:  ',},
{id:122,label:'Irak ',value:'IQ:  ',},
{id:123,label:'Iran ',value:'IR:  ',},
{id:124,label:'Irlande ',value:'IE:  ',},
{id:125,label:'Islande ',value:'IS:  ',},
{id:126,label:'Israël ',value:'IL:  ',},
{id:127,label:'Italie ',value:'IT:  ',},
{id:128,label:'Jamaïque ',value:'JM:  ',},
{id:129,label:'Japon ',value:'JP:  ',},
{id:130,label:'Jersey ',value:'JE:  ',},
{id:131,label:'Jordanie ',value:'JO:  ',},
{id:132,label:'Kazakhstan ',value:'KZ:  ',},
{id:133,label:'Kenya ',value:'KE:  ',},
{id:134,label:'Kirghizistan ',value:'KG:  ',},
{id:135,label:'Kiribati ',value:'KI:  ',},
{id:136,label:'Koweït ',value:'KW:  ',},
{id:137,label:'Laos ',value:'LA:  ',},
{id:138,label:'Lesotho ',value:'LS:  ',},
{id:139,label:'Lettonie ',value:'LV:  ',},
{id:140,label:'Liban ',value:'LB:  ',},
{id:141,label:'Libéria ',value:'LR:  ',},
{id:142,label:'Libye ',value:'LY:  ',},
{id:143,label:'Liechtenstein ',value:'LI:  ',},
{id:144,label:'Lituanie ',value:'LT:  ',},
{id:145,label:'Luxembourg ',value:'LU:  ',},
{id:146,label:'Macédoine ',value:'MK:  ',},
{id:147,label:'Madagascar ',value:'MG:  ',},
{id:148,label:'Malaisie ',value:'MY:  ',},
{id:149,label:'Malawi ',value:'MW:  ',},
{id:150,label:'Maldives ',value:'MV:  ',},
{id:151,label:'Mali ',value:'ML:  ',},
{id:152,label:'Malte ',value:'MT:  ',},
{id:153,label:'Maroc ',value:'MA:  ',},
{id:154,label:'Martinique ',value:'MQ:  ',},
{id:155,label:'Maurice ',value:'MU:  ',},
{id:156,label:'Mauritanie ',value:'MR:  ',},
{id:157,label:'Mayotte ',value:'YT:  ',},
{id:158,label:'Mexique ',value:'MX:  ',},
{id:159,label:'Moldavie ',value:'MD:  ',},
{id:160,label:'Monaco ',value:'MC:  ',},
{id:161,label:'Mongolie ',value:'MN:  ',},
{id:162,label:'Monténégro ',value:'ME:  ',},
{id:163,label:'Montserrat ',value:'MS:  ',},
{id:164,label:'Mozambique ',value:'MZ:  ',},
{id:165,label:'Myanmar ',value:'MM:  ',},
{id:166,label:'Namibie ',value:'NA:  ',},
{id:167,label:'Nauru ',value:'NR:  ',},
{id:168,label:'Népal ',value:'NP:  ',},
{id:169,label:'Nicaragua ',value:'NI:  ',},
{id:170,label:'Niger ',value:'NE:  ',},
{id:171,label:'Nigéria ',value:'NG:  ',},
{id:172,label:'Niue ',value:'NU:  ',},
{id:173,label:'Norvège ',value:'NO:  ',},
{id:174,label:'Nouvelle-Calédonie ',value:'NC:  ',},
{id:175,label:'Nouvelle-Zélande ',value:'NZ:  ',},
{id:176,label:'Oman ',value:'OM:  ',},
{id:177,label:'Ouganda ',value:'UG:  ',},
{id:178,label:'Ouzbékistan ',value:'UZ:  ',},
{id:179,label:'Pakistan ',value:'PK:  ',},
{id:180,label:'Palaos ',value:'PW:  ',},
{id:181,label:'Panama ',value:'PA:  ',},
{id:182,label:'Papouasie-Nouvelle-Guinée ',value:'PG:  ',},
{id:183,label:'Paraguay ',value:'PY:  ',},
{id:184,label:'Pays-Bas ',value:'NL:  ',},
{id:185,label:'Pérou ',value:'PE:  ',},
{id:186,label:'Philippines ',value:'PH:  ',},
{id:187,label:'Pitcairn ',value:'PN:  ',},
{id:188,label:'Pologne ',value:'PL:  ',},
{id:189,label:'Polynésie française ',value:'PF:  ',},
{id:190,label:'Porto Rico ',value:'PR:  ',},
{id:191,label:'Portugal ',value:'PT:  ',},
{id:192,label:'Qatar ',value:'QA:  ',},
{id:193,label:'R.A.S. chinoise de Hong Kong ',value:'HK:  ',},
{id:194,label:'R.A.S. chinoise de Macao ',value:'MO:  ',},
{id:195,label:'régions éloignées de l’Océanie ',value:'QO:  ',},
{id:196,label:'République centrafricaine ',value:'CF:  ',},
{id:197,label:'République démocratique du Congo ',value:'CD:  ',},
{id:198,label:'République dominicaine ',value:'DO:  ',},
{id:199,label:'République tchèque ',value:'CZ:  ',},
{id:200,label:'Réunion ',value:'RE:  ',},
{id:201,label:'Roumanie ',value:'RO:  ',},
{id:202,label:'Royaume-Uni ',value:'GB:  ',},
{id:203,label:'Russie ',value:'RU:  ',},
{id:204,label:'Rwanda ',value:'RW:  ',},
{id:205,label:'Sahara occidental ',value:'EH:  ',},
{id:206,label:'Saint-Barthélémy ',value:'BL:  ',},
{id:207,label:'Saint-Kitts-et-Nevis ',value:'KN:  ',},
{id:208,label:'Saint-Marin ',value:'SM:  ',},
{id:209,label:'Saint-Martin ',value:'MF:  ',},
{id:210,label:'Saint-Pierre-et-Miquelon ',value:'PM:  ',},
{id:211,label:'Saint-Vincent-et-les Grenadines ',value:'VC:  ',},
{id:212,label:'Sainte-Hélène ',value:'SH:  ',},
{id:213,label:'Sainte-Lucie ',value:'LC:  ',},
{id:214,label:'Samoa ',value:'WS:  ',},
{id:215,label:'Samoa américaines ',value:'AS:  ',},
{id:216,label:'Sao Tomé-et-Principe ',value:'ST:  ',},
{id:217,label:'Sénégal ',value:'SN:  ',},
{id:218,label:'Serbie ',value:'RS:  ',},
{id:219,label:'Serbie-et-Monténégro ',value:'CS:  ',},
{id:220,label:'Seychelles ',value:'SC:  ',},
{id:221,label:'Sierra Leone ',value:'SL:  ',},
{id:222,label:'Singapour ',value:'SG:  ',},
{id:223,label:'Slovaquie ',value:'SK:  ',},
{id:224,label:'Slovénie ',value:'SI:  ',},
{id:225,label:'Somalie ',value:'SO:  ',},
{id:226,label:'Soudan ',value:'SD:  ',},
{id:227,label:'Sri Lanka ',value:'LK:  ',},
{id:228,label:'Suède ',value:'SE:  ',},
{id:229,label:'Suisse ',value:'CH:  ',},
{id:230,label:'Suriname ',value:'SR:  ',},
{id:231,label:'Svalbard et Île Jan Mayen ',value:'SJ:  ',},
{id:232,label:'Swaziland ',value:'SZ:  ',},
{id:233,label:'Syrie ',value:'SY:  ',},
{id:234,label:'Tadjikistan ',value:'TJ:  ',},
{id:235,label:'Taïwan ',value:'TW:  ',},
{id:236,label:'Tanzanie ',value:'TZ:  ',},
{id:237,label:'Tchad ',value:'TD:  ',},
{id:238,label:'Terres australes françaises ',value:'TF:  ',},
{id:240,label:'Territoire palestinien ',value:'PS:  ',},
{id:241,label:'Thaïlande ',value:'TH:  ',},
{id:242,label:'Timor oriental ',value:'TL:  ',},
{id:243,label:'Togo ',value:'TG:  ',},
{id:244,label:'Tokelau ',value:'TK:  ',},
{id:245,label:'Tonga ',value:'TO:  ',},
{id:246,label:'Trinité-et-Tobago ',value:'TT:  ',},
{id:247,label:'Tristan da Cunha ',value:'TA:  ',},
{id:248,label:'Tunisie ',value:'TN:  ',},
{id:249,label:'Turkménistan ',value:'TM:  ',},
{id:250,label:'Turquie ',value:'TR:  ',},
{id:251,label:'Tuvalu ',value:'TV:  ',},
{id:252,label:'Ukraine ',value:'UA:  ',},
{id:254,label:'Uruguay ',value:'UY:  ',},
{id:255,label:'Vanuatu ',value:'VU:  ',},
{id:256,label:'Venezuela ',value:'VE:  ',},
{id:257,label:'Viêt Nam ',value:'VN:  ',},
{id:258,label:'Wallis-et-Futuna ',value:'WF:  ',},
{id:259,label:'Yémen ',value:'YE:  ',},
{id:260,label:'Zambie ',value:'ZM:  ',},
{id:261,label:'Zimbabwe ',value:'ZW:  ',},
{id:262,label:'Yémen ',value:'YE:  ',},
{id:263,label:'Zambie ',value:'ZM:  ',},
{id:264,label:'Zimbabwe ',value:'ZW:  ',},




        ],
        visible: true
    },*/ {
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