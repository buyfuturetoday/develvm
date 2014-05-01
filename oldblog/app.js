/*jshint newcap:false*/
// app.js
//------------------------------
//
// 2012-11-29, Jonas Colmsjö
//
// Copyright Gizur AB 2012
//
// Functions:
//  * Simple blog built with blacksmith and http-server
//
// Install with dependencies: npm install 
//
// Documentation is 'docco style' - http://jashkenas.github.com/docco/
//
// Using Google JavaScript Style Guide - http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml
//
//------------------------------


"use strict";


// Includes
// =========

var colors     = require('colors'),
    httpServer = require('http-server'),
    argv       = require('optimist').argv,
    portfinder = require('portfinder');
 //   path       = require('path');


// Variables
// =========

    // Port to use when no running in heroku etc.
var serverPort = 8080,
    
    // Use the port specified unless for istance heroku already has assinged one
    port = process.env.PORT || serverPort,

    // The path to the html files
    root = './blog/public',                         // path.join(__dirname, 'myblog/public', 'root');

    host = argv.a || '0.0.0.0',

    // Either log to console or don't log at all if the silent switch is used
    log = (argv.s || argv.silent) ? (function () {}) : console.log;


// Functions
// =========


function listen(port) {

    // create the web server
    var server = httpServer.createServer({
      root:      root,    
      autoIndex: argv.i,
      cache:     argv.c,
      ext:       true 
    });

    // Start listening for requests
    server.listen(port, host, function() {
      log('Starting up http-server, serving '.yellow
        + server.root.cyan
        + ' on port: '.yellow
        + port.toString().cyan);
      log('Hit CTRL-C to stop the server');
    });
}


// Signal handlers don't work on Windows.
if (process.platform !== 'win32') {
  process.on('SIGINT', function () {
    log('http-server stopped.'.red);
    process.exit();
  });
}


// Start the web server
listen(port);

