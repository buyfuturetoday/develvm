var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

server.listen(8082);

app.get('/lib/socket.io.js', function (req, res) {
  res.sendfile(__dirname + '/bower_components/socket.io-client/dist/socket.io.min.js');
});

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/mtgox.html');
});

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
