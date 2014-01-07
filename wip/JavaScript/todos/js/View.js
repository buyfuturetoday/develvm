/*jshint newcap:false*/

// View.js
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
var FortnoxView = Stapes.subclass({
    'constructor' : function() {
        this.bindEventHandlers();
        this.loadTemplates();
    }
});

// Static methods and properties
FortnoxView.extend({
    ENTER_KEY_KEYCODE : 13
});

// Prototype methods and properties
FortnoxView.proto({

    'bindEventHandlers' : function() {

        // Save the data when the database_id input lose focus
        $('#database_id').on('blur', function(e) {
          logDebug('Blur for database_id');
        }.bind(this));

        // Save the data when the api_token input lose focus
        $('#api_token').on('blur', function(e) {
          logDebug('Blur for api_token');
        }.bind(this));

    }

});