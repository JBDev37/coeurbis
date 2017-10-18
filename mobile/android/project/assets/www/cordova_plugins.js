cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "cordova-plugin-meteor-webapp.WebAppLocalServer",
        "file": "plugins/cordova-plugin-meteor-webapp/www/webapp_local_server.js",
        "pluginId": "cordova-plugin-meteor-webapp",
        "merges": [
            "WebAppLocalServer"
        ]
    },
    {
        "id": "cordova-plugin-splashscreen.SplashScreen",
        "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
        "pluginId": "cordova-plugin-splashscreen",
        "clobbers": [
            "navigator.splashscreen"
        ]
    },
    {
        "id": "cordova-plugin-statusbar.statusbar",
        "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
        "pluginId": "cordova-plugin-statusbar",
        "clobbers": [
            "window.StatusBar"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-meteor-webapp": "1.4.0",
    "cordova-plugin-splashscreen": "4.0.1",
    "cordova-plugin-statusbar": "2.2.1",
    "cordova-plugin-whitelist": "1.3.1",
    "cordova-plugin-wkwebview-engine": "1.1.1"
};
// BOTTOM OF METADATA
});