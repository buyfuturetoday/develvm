/*jshint newcap:false*/
// app.js
//------------------------------
//
// 2013-01-23, Jonas Colmsjö
//
//
// Functions:
//  * Just a way to distribute (test) HTML5/JAvaScript apps
//
// Documentation is 'docco style' - http://jashkenas.github.com/docco/
//
// Using Google JavaScript Style Guide - http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml
//
//------------------------------


"use strict";


// Includes
// =========

var express = require('express');


// Variables
// =========

var 
    // Port to use when no running in heroku etc.
    serverPort = 5000,
    
    // Use the port specified unless for istance heroku already has assinged one
    port = process.env.PORT || serverPort,
    
    // The URL of the app, only used when refreshing the log page in the browser
    serverURL  = (process.env.PORT) ? 'http://warm-inlet-2810.herokuapp.com' : 'http://localhost:' + port;




// Web Server 
// ================================

var app = express.createServer(express.logger());


// Support JSON, urlencoded, and multipart requests
app.use(express.bodyParser());


// Show info page
app.get('/', function(request, response) {
    var html = '<html>' +
    '<body>' +
    '<h1>WIP test app!</h1>' +
    '<a href="JavaScript/Persona_BrowserID.html">Persona</a>' +
    '</body></html>';

    response.send(html);
});


// Start the web server
// ---------------------

app.listen(port, function() {
  console.log("Listening on " + port);
});




