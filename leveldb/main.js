//
// sudo node -e "require('./main.js').start();"
//
//

//
// npm install levelup
// npm install leveldown
//
// NOTE: npm install level seams broken. It is using a older version of leveldb than leveldown
//



(function (self, undefined) {

    var mos    = self.mysqlodata || {};
    var u      = require('underscore');

    // change to false to stop this logging
    var debug        = true,
        info         = true,
        noLogging    = false;

    var defaultPort     = 80;

	var levelup = require('level')

	// 1) Create our database, supply location and options.
	//    This will create or open the underlying LevelDB store.
	var leveldb = levelup('./mydb')


    //
    // Helpers
    // ===================

    var logDebug = function(text) {
        if(debug && !noLogging) console.log('DEBUG: '+text);
    }

    var logInfo = function(text) {
        if(info && !noLogging) console.log('INFO: '+text);
    }

    var log = function(text) {
        if(!noLogging) console.log(text);
    }


	// a - the number to convert 
	// b - number of resulting characters
    var pad = function(a,b) {
    	return(1e15+a+"").slice(-b);
    }


    //
    // Leveldb
    // =======
    //
    // Store data/blobs in chunks in the database. Keys have the following form: key~rev#~chunk#
    // rev# and chunk# are 9 digits key~000000001~000000001
    //

    // maximum 999.999.999 revisions and 999.999.999 chunks
    var readKeys = function(keyPrefix, cb) {

		var keyStream = leveldb.createReadStream({
		    start     : keyPrefix + '~000000000'
		  , end       : keyPrefix + '~999999999'
		  , limit     : 999999999
		  , reverse   : false
		  , keys      : true
		  , values    : false
		});

		var keys = [];

		keyStream.on('data', function (data) {
			keys.push(data);
		});

		keyStream.on('error', function(err) {
			log('Error reading leveldb stream: '+ err);
		});

		keyStream.on('close', function () {
			cb(keys);
		});
	}

    // maximum 999.999.999 revisions and 999.999.999 chunks
    var readValue = function(keyPrefix, rev, cbData, cbEnd) {

    	rev = pad(rev,9);

		var keyStream = leveldb.createReadStream({
		    start     : keyPrefix + '~' + rev + '~000000000'
		  , end       : keyPrefix + '~' + rev + '~999999999'
		  , limit     : 999999999
		  , reverse   : false
		  , keys      : false
		  , values    : true
		});

		keyStream.on('data', function (data) {
			cbData(data);
		});

		keyStream.on('error', function(err) {
			log('Error reading leveldb stream: '+ err);
		});

		keyStream.on('close', function () {
			cbEnd();
		});
	}

	// Get the last revison of a key that is stored in the database
	var getCurrentRev = function(keyPrefix, cb) {
		readKeys(keyPrefix, function(keys) {
			if(keys.length == 0) {
				cb( 0 );
				return;
			}

			var revs = u.map(
				keys
			  , function(key) { return key.slice(keyPrefix.length+1, keyPrefix.length+1+9); }
			);

			cb( parseInt( u.max(revs, function(rev) { return parseInt(rev); } ) ) );
		});
	}

	var formatKey = function(key, revNum, chunkNum) {
		return key+'~'+pad(revNum,9)+'~'+pad(chunkNum,9);

	}

    //
    // HTTP Server helpers
    // ====================

    // Respond with 406 and end the connection
    var writeError = function(response, err) {
        // Should return 406 when failing
        // http://www.odata.org/documentation/odata-version-2-0/operations/
        response.writeHead(406, {"Content-Type": "application/json"});
        response.write(err.toString()+'\n');
        response.end();

        log(err.toString());
    }

    //
    // Main
    // ====

    mos.start = function () {
        var http = require("http");

        var server = http.createServer(function(request, response) {

            log("Processing request: " +
                            JSON.stringify(request.method) + " - " +
                            JSON.stringify(request.url) + " - " +
                            JSON.stringify(request.headers));


            // save input from POST and PUT here
            var data    = '', 
                counter = 0;

            getCurrentRev(request.url, function(rev) {

            	if (request.method == 'POST') rev = rev + 1;

	            request
	                // read the data in the stream, if there is any
	                .on('data', function (chunk) {

	                        // parse data and prepare insert for POST requests
	                        if (request.method == 'POST') {

			                	var key = formatKey(request.url, rev, ++counter);

								leveldb.put(key, chunk, function (err) {
									if (err) return console.log('Ooops!', err);
								});

						}

	                })
	                // request closed, process it
	                .on('end', function () {

	                    try {

	                        // parse data and prepare insert for POST requests
	                        if (request.method == 'GET') {

	                        	var counter2 = 0;

	                        	log('Fetching: ' + request.url);

	                	        response.writeHead(200, {"Content-Type": "application/json"});

	                        	readValue(request.url, rev, 
	                        	function(value) {
									counter2++;
							        response.write(value);
								},
								function(){
									log('Finished reading: ' +request.url+', revision: '+rev+', number of chunks sent: '+counter2);
							        response.end();
								});
		  					}

	                        // parse data and prepare insert for POST requests
	                        if (request.method == 'POST') {

	                	        response.writeHead(200, {"Content-Type": "application/json"});
						        response.write('{status: ok}');
						        response.end();

						        getCurrentRev(request.url, function(rev) {
						        	log('Finished saving: ' + request.url + ', new revision: ' 
						        		+ rev + ', number of chunks: ' + counter);
						        });

	                        }

	                    } catch(e) {
	                        writeError(response, e);
	                    }

	                });
			});

        });

        server.listen(defaultPort);

        log("Server is listening on port " + defaultPort);

    }


    // Exports
    // =======

    module.exports = mos;

})(this);