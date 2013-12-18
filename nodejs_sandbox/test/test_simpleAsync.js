// the functions to test
var async = require('../simpleAsync.js').create();

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

exports['simpleAsync_test'] = {

  setUp: function(done) {
    // setup here

    // setup finished
    done();
  },

  'testing firstThen': function(test) {

    var asyncLib = {
      i   : 2,
      inc : function(x){ async.stopped(); return x+this.i;},
      sq  : function(x){ async.stopped(); return x*x;},
      I   : function(x){ async.stopped(); return x;}
    };

    // There should be X tests
    test.expect(1);

    // tests here
    test.equal([2, 8], 
      async.firstThen(
        function() { async.delayed(2, asyncLib.sq); },
        function() { async.delayed(6, asyncLib.inc.bind(lib) );}
      ),
      'firstThen');

    // All tests performed
    test.done();
  }

};
