#!/usr/bin/env node

var http = require('http');
var pd = require('pretty-data').pd;

var makeRequest = function(host, path, formatter) {

  var options = {
    host: host,
    path: path,
    port: '80',
    //This is the only line that is new. `headers` is an object with the headers to request
    //headers: {'custom': 'Custom Header Demo works'}
  };

  callback = function(response) {
    var str = ''
    response.on('data', function (chunk) {
      str += chunk;
    });

    response.on('end', function () {
      console.log(JSON.stringify(options));
      if(formatter !== undefined) str = formatter(str);
      console.log(str);
    });
  }

  var req = http.request(options, callback);
  req.end();

};

var pJSON = function (s) { 
  return JSON.stringify(JSON.parse(s),0,2);
};

makeRequest('services.odata.org', '/V4/Northwind/Northwind.svc/', pJSON );

makeRequest('services.odata.org', '/V4/Northwind/Northwind.svc/Categories', pJSON );

//makeRequest('services.odata.org', "/V4/Northwind/Northwind.svc/$filter=City eq 'Miami'", pJSON );




