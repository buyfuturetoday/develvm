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

	var _commands          = '[list|status|help]',
        _dockerConnOptions = { socketPath: false, host: 'http://localhost', port: '4243'};


    // Includes
    // ================

    var docker      = require('docker.io')( _dockerConnOptions ),
        helpers     = require('helpersjs').create(),
        node_docker = require('node-docker').create(),
        argv        = require('optimist')
                    .usage('Usage: $0 '+ _commands)
                    .argv;

//    helpers.logging_threshold  = helpers.logging.debug;
    helpers.logging_threshold  = helpers.logging.warning;


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

        // all options listed in the REST documentation for Docker are supported.
        var options = {},
            _containerList;

        docker.containers.list(options /* optional*/, function(err, res) {
            if (err) { 
                throw err;
            }
            console.log("data returned from Docker as JS object: ", res);
            _containerList = res;
        });

        return _containerList;

    };


    this.inspect = function(container) {

        function handler(err, res) {
            if (err) {
                throw err;
            }
            console.log("data returned from Docker as JS object: ", res);
        }

        // all options listed in the REST documentation for Docker are supported.
        var options = {};

        docker.containers.inspect(container, options, handler);
        // OR
        //docker.containers.inspect(container, handler);

    };



    // main
    //-------------------------------------------------------------------------------------------------
    //

    this._isset(argv._ , 'jacc requires a command - node app.js ' + _commands);

    switch (argv._[0]) {

        case "list":
            console.log(this.list());
            break;

        case "help":
            console.log('list');
            console.log('help: show this message');
            break;

        default:
            console.log('No such command: ' + argv._);

    }


}());