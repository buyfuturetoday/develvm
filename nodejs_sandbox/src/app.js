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
                    .argv,
        async      = require('async');


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
        var _options = {},
            _containers;

        helpers.logDebug('Start...');

        async.series([

            // List the running containers
            function(fn){ 
                docker.containers.list(_options /* optional*/, function(err, res) {
                    if (err) { 
                        throw err;
                    }
                    this.helpers.logDebug("data returned from Docker as JS object: ", res);
                    this._containers = res;
                });

                fn(null, 'containers.list');
            }.bind(this),

            // Inspect each container
            function(fn){

                this._containers.forEach(function(container,index,array) {

                    // all options listed in the REST documentation for Docker are supported.
                    var options = {};

                    docker.containers.inspect(container, options, function (err, res) {
                        if (err) {
                            throw err;
                        }
                        console.log("data returned from Docker as JS object: ", res);
                    });

                    fn(null, 'containers.inspect');
                });

            }.bind(this),

        ],

        // Manage errors
        function(err, results){
          this._helpers.logDebug('results of async functions - ' + results);
          this._helpers.logDebug('errors (if any) - ' + err);
        }.bind(this));


        this._helpers.logDebug('End of function, async processing will continue');


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