/*jshint -W054, evil:true, devel:true, browser:true*/

//
// Unit tests for the helper functions that are executed from node
//
// Run like this:
// >nodeunit helpers_test.js
//

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

// Unit test
//-------------------------------------------------------------------------------------------------
// Basic tests that just calls the functions to make sure that execute ok

exports['test_node_docker'] = {

  setUp: function(done) {
    // setup here
    this._async      = require('async');

    // the functions to test
    this._node_docker = require('node-docker').create();
    this._helpers     = require('helpersjs').create();
    this._helpers.logging_threshold = this._helpers.logging.debug;

    // setup finished
    done();
  },

  'test1': function(test) {

    this._helpers.logDebug('testing testing');

    // There should be X tests
    test.expect(1);

    this._helpers.logDebug('test: Start...');

    var _imageID       = "test-imageID",
        _name          = "test-name",
        _containerID   = "test-containerID";

    this._async.series([

        // Dummy test
        function(fn) {
            test.equal(true,  this._helpers.isEmptyObject({}),      'isEmptyObject');
            fn(null, 'isEmptyObject');
        }.bind(this),

        function(fn) { 
            // All tests performed
            test.done();
            fn(null, 'test.done');
        }.bind(this),        

    ],
    function(err, results){
      this._helpers.logDebug('test: results of async functions - ' + results);
      this._helpers.logDebug('test: errors (if any) - ' + err);
    }.bind(this));

    this._helpers.logDebug('test: End of function, async processing will continue');

  }


};