// config.js
//------------------------------
//
// 2013-02-20, Jonas Colmsjö
//
// Copyright Gizur AB 2013
//
// File with config
//
// Documentation is 'docco style' - http://jashkenas.github.com/docco/
//
// Using Google JavaScript Style Guide - http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml
//
//------------------------------


// Globals with configuration are stored in the Config object
//==========================================================
//
// Use like this:
//
// var config = require('config.js').Config;
//
// * Config.SERVER\_PORT 
// * Config.HOSTNAME 
// * Config.IS\_HTTPS
// * Config.AWS\_ACCOUNT_ID 
// * Config.AWS\_API\_KEY
// * Config.AWS\_SECRET\_KEY 
//
// These environment variables needs to be set when runing locally. These can also be set in `.env` if 
// the app is started with `foreman`
//
// * NODE\_ENV
// * AWS\_ACCOUNT\_ID
// * AWS\_API\_KEY
// * AWS\_SECRET\_KEY
//
// When deploying to Heroku:
//
// * _heroku config:set NODE\_ENV='production'_
// * _heroku config:set AWS\_ACCOUNT\_ID=xxxx-xxxx-xxxx-xxxxxx_
// * _heroku config:set AWS\_API\_KEY=yyyy-yyyyy-yyy-yyyyy_
// * _heroku config:set AWS\_SECRET\_KEY=zzzzzzzzzzzzzzzzzzzzzzzz_
//


(function(){

    // Global Config object
    // with browser window or with node module
    var Config = (typeof window === 'undefined') ? exports.Config = {} : window.Config = {}; 


    // local variables used for storing the setup for all environments
    var _SERVER_PORT = {}, _HOSTNAME = {}, _IS_HTTPS = {};

    // Do your setup below
    //-------------------------------------------------------------------------------

    _SERVER_PORT['production']           = 80;
    _HOSTNAME['production']              = 'stormy-eyrie-8403.herokuapp.com';
    _IS_HTTPS['production']              = false;

    _SERVER_PORT['qa']                   = 80;
    _HOSTNAME['qa']                      = 'stormy-eyrie-8403.herokuapp.com';
    _IS_HTTPS['qa']                      = false;

    _SERVER_PORT['test']                  = 80;
    _HOSTNAME['test']                     = 'stormy-eyrie-8403.herokuapp.com';
    _IS_HTTPS['test']                     = false;

    _SERVER_PORT['development']           = 80;
    _HOSTNAME['development']              = 'boiling-woodland-7566.herokuapp.com';
    _IS_HTTPS['development']              = false;

    _SERVER_PORT['local']                 = 5000;
    _HOSTNAME['local']                    = 'localhost';
    _IS_HTTPS['local']                    = false;

    // Set to the Heroku environment that the unit tests should run agains
    _UNIT_TEST_SERVER                     = 'development';

    // ser logging  level, supported levels: emerg, alert, crit, err, warning, notice, info, debug
    logging.threshold  = logging.debug;

    // End of setup
    //-------------------------------------------------------------------------------


    // The actual configuration used when running an instance

    // Check if we are runnin in Heroku or locally
    if (process.env.NODE_ENV) {
        Config.SERVER_PORT        = process.env.PORT;
        Config.HOSTNAME           = _HOSTNAME[process.env.NODE_ENV];
        Config.IS_HTTPS           = _IS_HTTPS[process.env.NODE_ENV];
    }
    else {
        Config.SERVER_PORT        = _SERVER_PORT['local'];
        Config.HOSTNAME           = _HOSTNAME['local'];
        Config.IS_HTTPS           = _IS_HTTPS['local'];
    }

    // Set, just for convenience
    Config.SERVER_URL             = ( (Config.IS_HTTPS) ? 'https://' : 'http://' ) + 
                                    Config.HOSTNAME + ':' + Config.SERVER_PORT;

    // This is the URL for the server that unit tests run against
    Config.UNIT_TEST_SERVER_URL   = ( (_IS_HTTPS[_UNIT_TEST_SERVER]) ? 'https://' : 'http://' ) + 
                                    _HOSTNAME[_UNIT_TEST_SERVER] + ':' + 
                                    _SERVER_PORT[_UNIT_TEST_SERVER];

    // The AWS credentials are stored in environment variables
    Config.AWS_ACCOUNT_ID                      = process.env.AWS_ACCOUNT_ID;
    Config.AWS_API_KEY                         = process.env.AWS_API_KEY;
    Config.AWS_SECRET_KEY                      = process.env.AWS_SECRET_KEY;

})();