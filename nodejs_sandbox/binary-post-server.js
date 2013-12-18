var express = require('express');
var app = express();


app.post('/', function(req, res){
    var size = 0;

    req.on('data', function (data) {
        size += data.length;
        console.log('Got chunk: ' + data.length + ' total: ' + size);
    });

    req.on('end', function () {
        console.log("total size = " + size);
        res.end("Thanks");
    }); 

    req.on('error', function(e) {
        console.log("ERROR ERROR: " + e.message);
    });

});

app.post('/build', function(req, res){
    var size = 0;

    req.on('data', function (data) {
        size += data.length;
        console.log('Got chunk: ' + data.length + ' total: ' + size);
    });

    req.on('end', function () {
        console.log("total size = " + size);
        res.end("Thanks");
    }); 

    req.on('error', function(e) {
        console.log("ERROR ERROR: " + e.message);
    });

});

app.listen(3000);
console.log('Listening on port 3000');