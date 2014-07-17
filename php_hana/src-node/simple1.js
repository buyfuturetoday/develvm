/*
 * Trivial test that NodeJS and MySQL package works
 *
 * run like this: 
 * 		>docker run -t -i <IMAGE ID> /bin/bash 
 *		>supervisord > /tmp/out.txt &
 * 		>cd /src-node; node simple1.js
 */

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'myself',
  password : 'and I'
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
  if (err) throw err;

  console.log('The solution is: ', rows[0].solution);
});

connection.end();