#!/usr/bin/env node

var forever = require('forever-monitor');

var child = new (forever.Monitor)(__dirname + '/signals.js', {
    max: 3,
    silent: false,
    options: [],
    'logFile': '/var/log/node-forever.log', // Path to log output from forever process (when daemonized)
    'outFile': '/var/log/node-child.log',   // Path to log output from child stdout
    'errFile': '/var/log/node-child.err'    // Path to log output from child stderr
});

child.on('exit', function () {
    console.log('signals.js has exited after 3 restarts');
});

child.start();

// this code is run twice
// see implementation notes below
console.log(process.pid);

// after this point, we are a daemon
require('daemon')();

// different pid because we are now forked
// original parent has exited
console.log(process.pid);