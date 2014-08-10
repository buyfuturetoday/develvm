/*jshint -W054, evil:true, devel:true, browser:true*/

//
// Unit tests 
//
// Run like this:
// >nodeunit test_redis-dns.js
//
// NOTE: THIS TESTS HAVE NOT BEEN COMPLETED, TESTING FROM COMMAND LINE WITH DIG

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
// Basic tests for redis-dns

exports['test_odatamysql'] = {

	setUp: function(done) {
		// setup here

		// setup finished
		done();
	},

	'testing odatamysql': function(test) {

		var mysqlodata = require('../main.js')

		// Incorrect URLs
		var ic = [];
		ic.push('http://localhost/xyz/schema/table?$select=col1,col2&$filter=co1 eq "help"&$orderby=col2');
		ic.push('http://localhost/schema/table(2)');

		// Correct URLs
		var c = [];
		c.push('http://localhost/schema/table?$select=col1,col2&$filter=co1 eq "help"&$orderby=col2&$skip=10');
		c.push('http://localhost/schema/table');
		c.push('http://localhost/schema/table?$select=col1,col2&$filter=Price add 5 gt 10&$orderby=col2');

		for (var i=0; i<c.length; i++ ) {
		    console.log("url: "+c[i]);
		    var o = mysqlodata.parseQuery(c[i]);
		    console.log("Parsed URL: "+JSON.stringify(o,0,4));
		}

		for (var i=0; i<ic.length; i++ ) {
		    console.log("url: "+ic[i]);
		    try {
		        var o = mysqlodata.parseQuery(ic[i]);
		        console.log("Parsed URL: "+JSON.stringify(o,0,4));
		    } catch(e) {
		        console.log(e);
		    }
		}

		test.done();

/*		
		EXMAPLE OF ASYNC TESTS

		var redis        = require("redis"),
			redis_client = redis.createClient(),
			dns          = require('dns'),
			domain       = 'redis-dns.local',
			ip           = '123.456.789.012';

		// There should be X tests
		test.expect(1);

		// tests here
		redis_client.on("connect", function () {

			// first set the IP for the domain in redis
			redis_client.set("redis-dns:"+domain, ip, function(err, res) {
				redis_client.quit();

				// Now check if the expected answer
				dns.resolve4(domain, function (err, addresses) {
					if (err) {
						throw err;
					}

					test.equal(addresses[0], ip, 'logDebug');

					console.log('addresses: ' + JSON.stringify(addresses));

					// All tests performed
					test.done();

				});
			}.bind(this));
		}.bind(this));

		// redis error management
		redis_client.on("error", function (err) {
			console.log("Redis error: " + err);
		});
*/		
	}

};