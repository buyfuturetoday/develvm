//
// Unit tests
//
// npm install nodeunit
// ./node_modules/.bin/nodeunit unittest.js
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
// Basic tests

exports['test_leveldb'] = {

	setUp: function(done) {


		// setup finished
		done();
	},

	'testing POST': function(test) {

		test.expect(2);

		fs = require('fs');
		var readStream = fs.createReadStream('./projektledning_w767.png');

		readStream.on('open', function () {
			var http = require('http');

			// path and method is set in each test
			this.options = {
				hostname: 'localhost',
				port: 80,
				headers : {
					user: 'wp',
					password: 'wp',
//					'content-type': 'application/octet-stream'
				}
			};

			this.options.method = 'POST';
			this.options.path   = '/image1';

	        var data = '';

			var req = http.request(this.options, function(res) {
				res.setEncoding('utf8');

				test.ok(true, 'Did not receive what we expected.');

				res.on('data', function (chunk) {
					data += chunk;
				});
			});

			req.on('error', function(e) {
				console.log('problem with request: ' + e.message);
			});

			req.on('close', function() {
				var data = '', counter = 0;

				// path and method is set in each test
				var options2 = {
					hostname: 'localhost',
					port: 80,
					method: 'GET',
					path: '/image1',
					headers : {
						user: 'wp',
						password: 'wp'
					}
				};

				var req2 = http.request(options2, function(res) {
					res.setEncoding('utf8');

					test.ok(true, 'Did not receive what we expected.');

					res.on('data', function (chunk) {
						data += chunk;
						counter++;
					});
				});

				req2.on('error', function(e) {
					console.log('problem with request: ' + e.message);
				});

				req2.on('close', function() {
					console.log('Number of chunks received: ' + counter);
					test.done();
				});

				req2.end();

			});

			// This just pipes the read stream to the response object (which goes to the client)
			readStream.pipe(req);

		});

		// This catches any errors that happen while creating the readable stream (usually invalid names)
		readStream.on('error', function(err) {
			console.log('Error: '+err);
		});

	}

};
