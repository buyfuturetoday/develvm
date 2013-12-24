---
layout: post
title: Streams in NodeJS
date: 2013-07-21
author: Jonas Colmsjo
tags: ['post']
---


Links:

 * https://github.com/substack/stream-handbook
 * http://nodejs.org/api/stream.html
 * http://nodejs.org/api/http.html


First make sure you have an updated version of node: `node --version` should show at least v.0.10.13.
Use nvm (node version manager) to upgrade node, see: https://github.com/creationix/nvm


## Simple exmaple of stream

```
var Readable = require('stream').Readable;
var rs = Readable();

var c = 97;
rs._read = function () {
    rs.push(String.fromCharCode(c++));
    if (c > 'z'.charCodeAt(0) ) rs.push(null);
};

rs.pipe(process.stdout);
```

The stream is open and will pull new data with `_read` until is is closed. `rs.push(null)` closes the stream. The `rs._read` function that we've defined generates one character each time it is called. 


## Stream both HTTP request and response

Write (stream) status to HTTP response as the file is uploaded.

```
var express = require('express');
var app = express();


app.post('/', function(req, res){
    var size = 0;

    req.on('data', function (data) {
        size += data.length;
        var msg = 'Got chunk: ' + data.length + ' total: ' + size;
        console.log(msg);
        res.write(msg+"\n");
    });

    req.on('end', function () {
    	var msg = "total size = " + size;
        console.log(msg);
        res.write(msg+"\n");
        res.end("Thanks\n");
    }); 

    req.on('error', function(e) {
    	var msg = "ERROR ERROR: " + e.message;
        console.log(msg);
        res.write(msg+"\n");
    });

});

app.listen(3000);
console.log('Listening on port 3000');
```

On the client side:

 1. create a tar to send: `tar -cf js.tar *.js`
 1. Test with curl: `curl -H "Content-type: application/tar" --data-binary @js.tar http://localhost:3000/`


Now let's see if we can do the client in JavaScript.

The HTTP request library works with streams:

 * https://github.com/mikeal/request

Install the request library in the current directory: `npm install request`

```
var fs = require('fs');
var request = require('request');
fs.createReadStream('js.tar').pipe(request.post('http://localhost:3000/'));
```

This don't show the status since we don't handle the reponse at all.


```
var http = require('http');

var options = {
  hostname: 'localhost',
  port: 3000,
  path: '/',
  method: 'POST'
};

var req = http.request(options, function(res) {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));

  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('BODY: ' + chunk);
  });

});

req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});

// write data to request body
req.write('data\n');
req.write('data\n');
req.end();
```

Now we also the the status as the data is sent but we don't send a file.



```
var http = require('http');

var options = {
  hostname: 'localhost',
  port: 3000,
  path: '/',
  method: 'POST'
};

var req = http.request(options, function(res) {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));

  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('BODY: ' + chunk);
  });

});

req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});

// write data to the http.ClientRequest (which is a stream) returned by http.request() 
var fs = require('fs');
fs.createReadStream('js.tar').pipe(req);
```

Make sure not to call `req.end()` when using pipes since this will close the stream pre-maturely.





