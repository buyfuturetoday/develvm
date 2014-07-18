(function(exports) {

/*
 * 
 *
 * use like this
 * var s = require('./simple3.js').create().main();
 */


"use strict";

exports.create = function() {

  return {

    _mysql_cred : {
          host     : 'localhost',
          user     : 'clab',
          password : '48796e76'
        },
    _columns    : [],
    _tables     : null,

    clone : function (a) {
         return JSON.parse(JSON.stringify(a));
    },

    getColumns : function(table_name, cb) {
      var mysql      = require('mysql');
      var connection = mysql.createConnection(this._mysql_cred);

      connection.query(
        "select column_name, data_type from information_schema.columns where table_name = '"+table_name+"'", 
        function(err, rows, fields) {
          if (err) throw err;

          // save the columns
          this._columns.push( { table_name : table_name, rows : this.clone(rows) });

          connection.end();

          cb(null, 'end of getColumns');
        }.bind(this)
      );
    },


    getTables : function(cb) {
      var mysql      = require('mysql');
      var connection = mysql.createConnection(this._mysql_cred);

      connection.query(
        'select table_name from information_schema.tables', 
        function(err, rows, fields) {
          if (err) throw err;

          // save the array of tables
          this._tables = this.clone(rows); 

          connection.end();

          cb(null, 'end of getTables');
        }.bind(this)
      );
    },

    main : function() {
      var async = require('async');

      async.series([
        function(cb){
          this.getTables(cb);
        }.bind(this),

        function(cb){
          this.getColumns("vtiger_wsapp", cb);
        }.bind(this),

        function(cb){
          console.log('List of MySQL tables');
          console.log(JSON.stringify(this._tables));
          console.log('Fetching columns for table tiger_wsapp');
          console.log(JSON.stringify(this._columns));
          cb(null, 'end')
        }.bind(this)
        ],
        function(err, result){
          console.log(JSON.stringify(result));
        }

      );
    }

  };
};

}(typeof exports === 'undefined' ? this['simple']={} : exports));
