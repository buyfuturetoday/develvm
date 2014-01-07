/*jshint newcap:false*/

// view.js
//------------------------------
//
// 2013-02-13, Jonas Colmsjö
//
// The View object in the MVC model
//
// Documentation is 'docco style' - http://jashkenas.github.com/docco/
//
// Using Google JavaScript Style Guide - http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml
//
//------------------------------


'use strict';

// Create Fortnox View Object
var FortnoxSettingsView = Stapes.subclass({
    'constructor' : function() {
        this.bindEventHandlers();
    }
});

// Static methods and properties
FortnoxSettingsView.extend({
    ENTER_KEY_KEYCODE : 13
});

// Prototype methods and properties
FortnoxSettingsView.proto({

    'bindEventHandlers' : function() {

        // Save the data when the database_id input loose focus
        $('#database_id').on('blur', function(e) {
          logDebug('Blur for database_id');
          this.emit('database_id_update', $('#database_id').val());
        }.bind(this));

        // Save the data when the api_token input lose focus
        $('#api_token').on('blur', function(e) {
          logDebug('Blur for api_token');
          this.emit('api_token_update', $('#api_token').val());
        }.bind(this));

    }

});