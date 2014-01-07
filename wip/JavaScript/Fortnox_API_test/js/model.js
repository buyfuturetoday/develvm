/*jshint newcap:false*/

// model.js
//------------------------------
//
// 2013-02-13, Jonas Colmsjö
//
// The Model object in the MVC model
//
// Documentation is 'docco style' - http://jashkenas.github.com/docco/
//
// Using Google JavaScript Style Guide - http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml
//
//------------------------------


'use strict';

var FortnoxSettingsModel = Stapes.subclass({
    'constructor' : function(store) {
        this.set( store );
   },


});

var FortnoxSettingsStore = Stapes.subclass({
    'constructor' : function() {
        if (!'localStorage' in window) {
            logErr("Saving is not supported in your browser :(")
        }
    },

    'load': function() {
        var result = window.localStorage['fortnox-api-test'];
        logDebug('Loaded data from local storage: ' + result );
        return result ? JSON.parse(result) : {};
    },

    'save': function(data) {
        logDebug('Saving data to local storage: ' + JSON.stringify( data ) );
        window.localStorage['fortnox-api-test'] = JSON.stringify( data );
    }
});