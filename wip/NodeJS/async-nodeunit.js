
// async-nodeunit.js
//------------------------------
//
// 2013-02-19, Jonas Colmsjö
//
// Copyright Gizur AB 2012
//
// Simple test of the sendmail REST fucntion
//
// node dependencies: npm install jsdom xmlhttprequest jQuery optimist
//
// Documentation is 'docco style' - http://jashkenas.github.com/docco/
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

var nodeunit = require('nodeunit');
var $        = require('jQuery');
var helpers  = require('../lib/js/helpers-1.0.js');


exports['async-nodeunit'] = nodeunit.testCase({

  setUp: function(callback) {

    // set logging level
    logging.threshold  = logging.debug;

    this.asyncFunc = function asyncFunc(test) {
        logDebug('asyncFunc');
 
        $.ajax({
            url:      'https://api.github.com/repos/colmsjo/wip/contents/JavaScript/GitContentExample.text',
            origin:   'https://s3-eu-west-1.amazonaws.com/',
            type:     'GET',
            success: function(data) {
                logDebug('AJAX success' + JSON.stringify(data) );
                test.ok(true, JSON.stringify(data) );
                test.done();
           },
            error: function (x, status, error) {
                logDebug('AJAX error' + error);
                test.ok(false, 'Got an error: ' + status + 'Error details:' + error);
                test.done();
            }
        });

    }

    callback();

  },

  'Running AJAX request (towards git)': function(test) {
    test.expect(1);

    // tests here
    this.asyncFunc(test);

  }


});
