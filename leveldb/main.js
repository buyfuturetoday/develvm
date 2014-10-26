//
// sudo node -e "require('./main.js').start();"
//
//

(function (self, undefined) {

    var mos    = self.mysqlodata || {};

    // change to false to stop this logging
    var debug        = true,
        info         = true,
        noLogging    = false;

    var defaultPort     = 80;

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
            var data = '';

            request
                // read the data in the stream, if there is any
                .on('data', function (chunk) {

                	// Perhaps I can save chunk by chunk in the db?
                    data += chunk;
                })
                // request closed, process it
                .on('end', function () {

                    try {

                        // parse data and prepare insert for POST requests
                        if (request.method == 'POST') {
                        	//log(data);

                        	// This is where the data should be saved into leveldb, in not chunk bny chunk

                        	log('finished receiving data..doing nothing right now');

                	        response.writeHead(200, {"Content-Type": "application/json"});
					        response.write('{status: ok}');
					        response.end();

                        }


                    } catch(e) {
                        writeError(response, e);
                    }

                });

        });

        server.listen(defaultPort);

        log("Server is listening on port " + defaultPort);

    }


    // Exports
    // =======

    module.exports = mos;

})(this);