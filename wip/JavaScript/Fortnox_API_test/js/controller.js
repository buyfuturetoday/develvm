/*jshint newcap:false*/

// controller.js
//------------------------------
//
// 2013-02-13, Jonas Colmsjö
//
// The Controller object in the MVC model
//
// Documentation is 'docco style' - http://jashkenas.github.com/docco/
//
// Using Google JavaScript Style Guide - http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml
//
//------------------------------

// Design overview
//=========================================================
//
// The stapesjs micro MVC library is used. 
//
// A publish/subscribe model is used in Stapes
//----------------------------------------------------------------
//
// <pre>
// | Stapes Event       | Publishers          | Subscribers               |
// |--------------------|---------------------|---------------------------|
// | database_id_update | #database_id (DOM)  | settingsController        |
// |                    |                     | settingsView              |
// | api_token_update   | #api_token (DOM)    | settingsController        |
// |                    |                     | settingsView              |
//</pre>
//
// DOM objects:
//----------------------------------------------------------------
// <pre>
// | Object         | Event          | Notes          |
// |----------------|----------------|----------------|
// | Window         |                |                |
// | database_id    |                | input          |
// | api_token      |                | input          |
//</pre>
//
//
// View objects:
//---------------------------------------------------------------
// <pre>
// | Object         | Event          | Notes          |
// |----------------|----------------|----------------|
// | settingsView   |                |                |
//</pre>
//
//
// Controller objects:
//---------------------------------------------------------------
// <pre>
// | Object             | Event          | Notes          |
// |---------------------|----------------|----------------|
// | settingsConstroller |                |                |
//</pre>
//
//
// Model objects:
//---------------------------------------------------------------
// <pre>
// | Object         | Event          | Notes          |
// |----------------|----------------|----------------|
// | settingsModel  |                |                |
//</pre>
//
//
//
// Store objects:
//---------------------------------------------------------------
// <pre>
// | Object         | Event          | Notes          |
// |----------------|----------------|----------------|
// | settingsStore  |                |                |
//</pre>
//

'use strict';


// the main function
//=========================


window.main = function() {

    // Add some event listeners
    // ------------------------

    window.applicationCache.addEventListener("error", function(e) {
      logDebug("Error fetching manifest: a good chance we are offline");
    });

    window.addEventListener("offline", function(e) {
      logDebug("offline...");
    }, false);

    window.addEventListener("online", function(e) {
      logDebug("online...");
    }, false);


    // Check the application cache
    // --------------------------------------------------------------

    this.checkAppCache = function checkAppCache() {

      var appCache = window.applicationCache,
          status   = {};
      
      status[appCache.UNCACHED]    = 'UNCACHED';
      status[appCache.IDLE]        = 'IDLE';
      status[appCache.CHECKING]    = 'CHECKING';
      status[appCache.DOWNLOADING] = 'DOWNLOADING';
      status[appCache.UPDATEREADY] = 'UPDATEREADY';
      status[appCache.OBSOLETE]    = 'OBSOLETE';


      if(status[appCache.status]) {
        logDebug(status[appCache.status]);
      } else {
        logDebug('UKNOWN CACHE STATUS');
      }

    };

    // Some general setup
    // -------------------------------

    var runUnitTest = ( window.location.hash == '#unittest');

    logging.threshold  = logging.debug;
    logDebug('Loading page...');
    logDebug('You are running ' + checkBrowser() + '.');
    logDebug('Running unit tests: ' + runUnitTest);

    if (Modernizr.localstorage) {
      logDebug("window.localStorage is available!");
    } else {
      logDebug("window.localStorage is NOT available!");
    }

    checkAppCache();

    // Setup routing
    // -------------------------------

    // Screen 1
    crossroads.addRoute('route1', function() { 
      var html = $('#template1').html();
      var output = Plates.bind(html, null, null);
      $('#ui').html(output);
      logDebug('logging static route1...');} 
    );


     // Screen 2
     crossroads.addRoute('route2', function() {
     var html = $('#template2').html();
      var output = Plates.bind(html, null, null);
      $('#ui').html(output);
      logDebug('logging static route2...');} 
    ); 

    // Screen 3      
    crossroads.addRoute('route3', function() {
      var html = $('#template3').html();
      var output = Plates.bind(html, null, null);
      $('#ui').html(output);
      logDebug('logging static route3...');} 
    ); 


    // Also log routes that did not match anything (useful for debugging)
    crossroads.bypassed.add(function(request){
      logDebug("A route that wasn't matched:"+request); 
    });


    // Setup hasher
    // -------------------------------

    function parseHash(newHash, oldHash){
      crossroads.parse(newHash); 
    }

    // parse initial hash 
    hasher.initialized.add(parseHash);

    // parse hash changes
    hasher.changed.add(parseHash);

    // start listening for history change
    hasher.init();

    // update URL fragment generating new history record 
    hasher.setHash('route1');

    // Create the MVC model
    this.app = new FortnoxSettingsController();


    // Just testing profiling
    // ---------------------------------------------

    //jQuery.profile.start();

    // The hash for the object ot fetch
    var objSHA;
    $.ajax({
      url:      'https://api.github.com/repos/colmsjo/wip/contents/JavaScript/GitContentExample.text',
      origin:   'https://s3-eu-west-1.amazonaws.com/',
      type:     'GET',
      success: function(data) {
        objSHA = data.sha;
      }
    });

    //jQuery.profile.done();


    // Run In-browser unit tests of the hash has been set to '#unittest'
    // -----------------------------------------------------------------

    if (runUnitTest) {

      test("Validate that the app has loaded ok...", function(){
        
        assert( "testing" == "testing", "Tests are executing and the page has been loaded if this is shown" );
      });

    }     

}

 

// .bind shim for IE8
if (!Function.prototype.bind) {
    Function.prototype.bind = function(context) {
        var self = this;
        return function() {
            return self.apply(context, arguments);
        };
    };
}

// The Controller object which creates a View and Model
var FortnoxSettingsController = Stapes.subclass({

    'constructor' : function() {
        this.settingsView  = new FortnoxSettingsView();
        this.settingsStore = new FortnoxSettingsStore();
        this.settingsModel = new FortnoxSettingsModel( this.settingsStore.load() );

        this.bindEventHandlers();

    },

    'bindEventHandlers': function() {

        // settingsController subscribes to `database_id_update`
        this.on({
            'database_id_update': function(value) {
                logDebug('Controller received database_id_update: '+ value);
                logDebug('Saving model to store: ' + JSON.stringify(this.settingsModel.getAll()) );
                this.settingsStore.save( this.settingsModel.getAll() );
            }
        });

        // settingsController subscribes to `api_token_update`
        this.on({
            'api_token_update': function(value) {
                logDebug('Controller received api_token_update: '+ value);
                logDebug('Saving model to store: ' + JSON.stringify(this.settingsModel.getAll()) );
                this.settingsStore.save( this.settingsModel.getAll() );
            }
        });

        // settingsView subscribes to `database_id_update`
        this.settingsView.on({
            'database_id_update': function(value) {
                logDebug('View received database_id_update:' + value);
            }

        }, this);
 
        // settingsView subscribes to `api_token_update`
        this.settingsView.on({
            'api_token_update': function(value) {
                logDebug('View received api_token_update:' + value);
            }

        }, this);


    }

});