/*
 * Trivial test that NodeJS and MySQL package works
 *
 * run like this: 
 *    >docker run -t -i <IMAGE ID> /bin/bash 
 *    >supervisord > /tmp/out.txt &
 *    >cd /src-node; node simple2.js
 */

var hdb    = require('hdb');
var client = hdb.createClient({
  host     : '54.75.228.30',
  port     : 30015,
  user     : 'SYSTEM',
  password : 'Homeend02'
});

client.connect(function (err) {
  if (err) {
    return console.error('Connect error', err);
  } 
  client.exec('select * from DUMMY', function (err, rows) {
    client.end();
    if (err) {
      return console.error('Execute error:', err);
    }
    console.log('Results:', rows);  
  });
});