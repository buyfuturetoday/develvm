#!/usr/bin/env node

var config = require('./config.js').create(),
    http   = require('http'),
    async  = require('async');

var options = {
  hostname: config.COUCHDB_HOSTNAME,
  port:     config.COUCHDB_PORT,
  auth:     config.COUCHDB_ADMIN+":"+config.COUCHDB_ADMIN_PASS,
  headers: {
    'Content-Type': 'application/json',
  }
};

function response(res) {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('BODY: ' + chunk);
    console.log("-----------------------------------------------");
  });
}

function error(e) {
  console.log('problem with request: ' + e.message);
};


// run tests in a series
async.series()


// Simple DELETE
// -------------------------------------------------------

options.path   = '/test/';
options.method = 'DELETE';

var data = 
  {
    "message" : "hello world"
  };

console.log("OPTIONS:"+JSON.stringify(options)+"\n"+JSON.stringify(data));
var req = http.request(options, response);
req.on('error', error);
req.write(JSON.stringify(data));

// Simple PUT
// -------------------------------------------------------

options.path   = '/test/';
options.method = 'PUT';

var data = 
  {
    "message" : "hello world"
  };

console.log("OPTIONS:"+JSON.stringify(options)+"\n"+JSON.stringify(data));
var req = http.request(options, response);
req.on('error', error);
req.write(JSON.stringify(data));


// Finish up
// -------------------------------------------------------

req.end();
