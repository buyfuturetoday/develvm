// app.js
//------------------------------
//
// 2013-10-31 Jonas Colmsjö
//
//
// Deploy to your private cloud based on docker.io and hipache
//
// Using Google JavaScript Style Guide - http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml
//
//------------------------------


(function(){

	var _commands = '[list|status|help]';


    // Includes
    // ================

    var helpers = require('helpersjs').create();

//    helpers.logging_threshold  = helpers.logging.debug;
    helpers.logging_threshold  = helpers.logging.warning;

    var argv    = require('optimist')
                    .usage('Usage: $0 '+ _commands)
//                    .demand(['cmd'])
                    .argv;


	var node_docker = require('node-docker').create();


    // helpers
    //======================================================================

    this._isset = function(a, message, dontexit){
      helpers.logDebug('_isset: checking - ' + a + ' (exit message:'+message+')');
      if (!helpers.isset(a)) {
        console.log(message);
        if(dontexit !== undefined && dontexit) {
          helpers.logDebug('_isset: returning false ');
          return false;
        } else {
          helpers.logDebug('_isset: exiting process');
          process.exit();
        }        
      }
      helpers.logDebug('_isset: returning true ');
      return true;
    };


    // Docker functions
    //======================================================================


    this.list = function() {
        var docker = require('docker.io')({ socketPath: false, host: 'http://localhost', port: '4243'});

        var options = {}; // all options listed in the REST documentation for Docker are supported.

        docker.containers.list(options /* optional*/, function(err, res) {
            if (err) { 
                throw err;
            }
            console.log("data returned from Docker as JS object: ", res);
        });

    };

    // main
    //-------------------------------------------------------------------------------------------------
    //

    this._isset(argv._ , 'jacc requires a command - node app.js ' + _commands);


    switch (argv._[0]) {

        case "list":
            this.list();
            break;

        case "help":
            console.log('--cmd push --name=www.example.com --port=8080 [--path=/path_to_webapp/]: webapp.tar in the current directory (or the path specified) will be deployed to the cloud');
            console.log('--cmd status [--name=XXX]: show logs for container or overall status for all containers');
            console.log('--help: show this message');
            break;

        case "status":
            this.status();
            break;

        default:
            console.log('No such command: ' + argv._);

    }


}());