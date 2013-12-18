
// test-lgger.js
//------------------------------
//
// 2013-02-20, Jonas Colmsjö
//
// Copyright Gizur AB 2012
//
// Simple test of the remote logger
//
// dependencies: npm install -g jQuery nodeunit
//
// Using Google JavaScript Style Guide - http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml
//
//------------------------------



/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

"use strict";


// Includes
// ================

var nodeunit = require('nodeunit'),
    $        = require('jQuery'),
    helpers  = require('../lib/helpers-1.0.js'),
    config   = require('../config.js').Config;
        

exports['test-logger'] = nodeunit.testCase( {

  setUp: function(callback) {


    // Globals
    //==============

    var localURL    = config.SERVER_URL           + '/log',
        remoteURL   = config.UNIT_TEST_SERVER_URL + '/log',
        clientID    = 'TEST_CLIENT';



    // set logging level
    logging.threshold  = logging.debug;

    //
    // Log a message
    //-----------------------------

    this.testLogMessage = function testLogMessage(test, msg, local){

        logDebug('logMessage: ' + msg + ' at:' + ((local===undefined) ? remoteURL : localURL) );

        var request = $.ajax({

            // REST function to use
            url:      (local===undefined) ? remoteURL : localURL,
            type:     'POST',
            dataType: 'json',
            //headers:  {'Accept':'text','Content-Type':'application/json'},
            data:     {
                "client"    : clientID,
                "timestamp" : new Date(),
                "message"   : msg 
            },

            success: function(data){
                test.ok(true, 'logMessage: Yea, it worked...' + JSON.stringify(data) );
                test.done();
            },

            error: function(data){
                test.ok(false, 'logMessage: Shit hit the fan...' + JSON.stringify(data) );
                test.done();
            }

        });

        return request;
    }

    callback();
    
  },

  'testing logging on local server (make sure it is up)': function(test) {
    test.expect(1);

    // tests here
    this.testLogMessage(test, "Logging on the local server", true)

  },

  'testing logging on remote server (make sure it is up)': function(test) {
    test.expect(1);

    // tests here
    this.testLogMessage(test, "Logging on the remote server")

  }

});