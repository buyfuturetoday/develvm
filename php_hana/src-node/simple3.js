/*
 * Trivial test that NodeJS and HANA package works
 *
 * run like this: 
 *    >docker run -t -i <IMAGE ID> /bin/bash 
 *    >cd /src-node; node simple3.js
 */

/*
 * MySQL stuff
 */

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'myself',
  password : 'and I'
});

console.log('List of MySQL tables');

connection.connect();
connection.query('select * from information_schema.tables', function(err, rows, fields) {
  if (err) throw err;

  for(i=0; i<rows.length; i++) {
    console.log('Table '+i+':'rows[i]);
  }

});

connection.end();


/*
 * HANA Stuff
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