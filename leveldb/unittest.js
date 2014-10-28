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
			console.log('Piping...hoping the pipe will do req.end...');

			var http = require('http');

			// path and method is set in each test
			this.options = {
				hostname: 'localhost',
				port: 80,
				headers : {
					user: 'wp',
					password: 'wp',
					'content-type': 'application/octet-stream'
				}
			};

			this.options.method = 'POST';
			this.options.path   = '/image1';

	        var data = '';

			console.log('before http.request: '+JSON.stringify(this.options));

			var req = http.request(this.options, function(res) {
				console.log('in http.request...');
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
				console.log('POST received: ' + data);
				console.log('Now testing to GET the data');

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

				console.log(JSON.stringify(options2));

				var req2 = http.request(options2, function(res) {
					console.log('in http.request...');
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

				console.log('before end...');

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
