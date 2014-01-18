#!/usr/bin/env node

/*
 * Make a series of rest http calls. The next call is started in
 * in the on('end') callback for the previous call.
 *
 * Pseudo code:
 *
 * http_calls = [obj1, ..., objn]
 * counter = 0
 * var request = null
 * response = function(res)
 *   handle result - just log it
 *   if(https_calls[counter].data is defined)
 *     request.write(JSON.strinigy(http_calls[counter].data))
 *   if(counter < http_calls.length)
 *     options.path   = http_calls[counter].path
 *     options.method = http_calls[counter].method
 *     log the call to be made
 *     counter++
 *     reqeust = http.request(options, response)
 *
 * options.path   = http_calls[counter].path
 * options.method = http_calls[counter].method
 * request = http.request(options, response)
 *
 */

var config = require('./config.js').create(),
    http   = require('http');

var options = {
  hostname: config.COUCHDB_HOSTNAME,
  port:     config.COUCHDB_PORT,
  auth:     config.COUCHDB_ADMIN+":"+config.COUCHDB_ADMIN_PASS,
  headers: {
    'Content-Type': 'application/json',
  }
};

var http_calls = [],
    counter    = 0,
    request    = null,
    data       = null;

http_calls[0] = {
  path:   '/test/',
  method: 'DELETE',
  data:   { "message" : "hello world" }
};

http_calls[1] = {
  path:   '/test/',
  method: 'PUT',
  data:   { "message" : "hello world" }
};

http_calls[2] = {
  path:   '/test/',
  method: 'GET'
};

function response(res) {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');

  res.on('data', function (chunk) {
    console.log('BODY: ' + chunk);
    console.log("-----------------------------------------------");
  });

  res.on('end', function () {
    counter++;
    if(counter < http_calls.length)
      options.path   = http_calls[counter].path;
      options.method = http_calls[counter].method;
      data           = http_calls[counter].data;
      console.log("OPTIONS:"+JSON.stringify(options)+"\n"+JSON.stringify(data));
      request        = http.request(options, response);
      if (data != null) req.write(JSON.stringify(data));
      req.end();
  });

}

function error(e) {
  console.log('problem with request: ' + e.message);
};

options.path   = http_calls[counter].path;
options.method = http_calls[counter].method;
data           = http_calls[counter].data;

console.log("OPTIONS:"+JSON.stringify(options)+"\n"+JSON.stringify(data));
var req = http.request(options, response);
req.on('error', error);
if (data != null) req.write(JSON.stringify(data));
req.end();



