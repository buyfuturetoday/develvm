Webapps that are possible to run offline

[meta:author]: <> (Jonas Colmsjo)
[meta:title]: <> (Offline Web Apps)
[meta:date]: <> (2013-02-09)
[meta:nested:key]: <> (Metadata value)

##!!truncate


### Web apps in traditional browsers

Links:

 * http://diveintohtml5.info/offline.html
 * http://www.html5rocks.com/en/tutorials/appcache/beginner/
 * http://diveintohtml5.info/storage.html

Old style offline web applications.

The manifest makes it possible to user web apps also without network connectivity. It is 
also possible to store data locally in the browser. Both for a session and between sessions.


### Web apps in Firefox OS

Links:

 * https://developer.mozilla.org/en-US/docs/Apps/Getting_Started
 * http://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser



The Firefox browser will support offline web apps in the future. Is is currently available
in the beta version of Firefox. Here I'll do a small test of the API. This will also be the
way apps are installed in Firefox OS which is a new OS for mobile devices.
 
A Manifest is needed in order to publish the app on Firefox OS Market.

The manifest must be hosted from the same domain as your website, 
and must be served with a Content-Type of application/x-web-app-manifest+json`
 
Small Offline Web App Example:

```
<html>
  <head>
    <title>Offline webapp</title>


    <!-- Bootstrap -->
    <link href="http://netdna.bootstrapcdn.com/twitter-bootstrap/2.2.2/css/bootstrap-combined.min.css" rel="stylesheet">

    <!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
      <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->

  </head>

  <body>

    <div class="container">

      <!-- The menu used to show different templates -->
     <div id="test1">
        Menu:
        <a href="#route1">#screen1</a> 
        <a href="#route2">#screen2</a> 
        <a href="#route3">#screen3</a>
      </div>


      <!-- Templates are rendered here -->
      <div id="ui">
      </div>

    </div> <!-- /container -->


    <!-- Show test results -->
    <ul id="results"></ul>


    <!-- Templates -->

    <script type="text/template" id="template1">
      <h3>This is screen 1</h3>
    </script>

    <script type="text/template" id="template2">
      <h3>This is screen 2</h3>
    </script>

    <script type="text/template" id="template3">
      <h3>This is screen 3</h3>
    </script>



    <!-- Scripts at the end for better performance -->

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
    <script src="http://netdna.bootstrapcdn.com/twitter-bootstrap/2.2.2/js/bootstrap.min.js"></script>
    <script src="https://raw.github.com/colmsjo/helpersjs/master/lib/js/helpers-1.0.js"></script>
    <script src="https://login.persona.org/include.js"></script>

    <script src="https://raw.github.com/colmsjo/helpersjs/master/lib/js/signals.js"></script>
    <script src="https://raw.github.com/colmsjo/helpersjs/master/lib/js/crossroads.min.js"></script>
    <script src="https://raw.github.com/colmsjo/helpersjs/master/lib/js/hasher.min.js"></script>
    <script src="https://raw.github.com/colmsjo/helpersjs/master/lib/js/plates.js"></script>


    <script type="text/javascript">

    // Make sure the page is loading
    // -----------------------------

    window.onload = function(){


      // Define some functions
      // ---------------------

      (function(){

        // Check if the web apps has been installed and install otherwise
        // --------------------------------------------------------------

        this.installApp = function installApp() {

          var request = navigator.mozApps.getSelf();

          request.onsuccess = function() {
            if (request.result) {
              // we're installed
              logDebug('App has already been installed');
            } else {
              // not installed
              logDebug('App has not been installed');

              var request2 = navigator.mozApps.install("http://path.to/my/example.webapp");
              request2.onsuccess = function() {
                // great - display a message, or redirect to a launch page
                logDebug('App was successfully installed: Name: ' + request2.result.manifest.name);
              };
              request2.onerror = function() {
                // whoops - this.error.name has details
                logErr('ERROR: Could not install app! Error: ' + request2.error.name);

              };
            }
          };

          request.onerror = function() {
            logError('Error checking installation status: ' + this.error.message);
          };

 
        };

      }());


      // Some general setup
      // -------------------------------

      logging.threshold  = logging.debug;
      logDebug('Loading page...');

      if(checkBrowser() != "firefox") {
        logErr('ERROR: only firefox supports offline webapps! You are running ' + checkBrowser() + '.');
        logErr("Continuing but you'll most likely get a bunch of erorrs!");
      }

      // Install the app
      installApp();

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
      
      //update URL fragment generating new history record 
      hasher.setHash('route1');


    } // window.onload

    </script>
  </body>
</html>
```


