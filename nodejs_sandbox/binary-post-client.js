var fs = require('fs');
var request = require('request');
fs.createReadStream('js.tar').pipe(request.post('http://localhost:3000/'));