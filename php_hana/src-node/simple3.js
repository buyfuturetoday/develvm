(function(exports) {

/*
 * 
 *
 * use like this:
 * var s = require('./simple3.js').create().main();
 */


"use strict";

exports.create = function() {

  return {

    _output_filename : './mysqldb.json',

    // MySQL system tables we're not interested in
    _system_tables : ["CHARACTER_SETS","COLLATIONS","COLLATION_CHARACTER_SET_APPLICABILITY","COLUMNS",
                      "COLUMN_PRIVILEGES","ENGINES","EVENTS","FILES","GLOBAL_STATUS","GLOBAL_VARIABLES",
                      "KEY_COLUMN_USAGE","PARAMETERS","PARTITIONS","PLUGINS","PROCESSLIST","PROFILING",
                      "REFERENTIAL_CONSTRAINTS","ROUTINES","SCHEMATA","SCHEMA_PRIVILEGES","SESSION_STATUS",
                      "SESSION_VARIABLES","STATISTICS","TABLES","TABLESPACES","TABLE_CONSTRAINTS",
                      "TABLE_PRIVILEGES","TRIGGERS","USER_PRIVILEGES","VIEWS","INNODB_CMP_RESET",
                      "INNODB_TRX","INNODB_CMPMEM_RESET","INNODB_LOCK_WAITS","INNODB_CMPMEM","INNODB_CMP",
                      "INNODB_LOCKS"],

    _mysql_cred : {
          host     : 'localhost',
          user     : 'clab',
          password : '48796e76'
        },
    _columns    : [],
    _tables     : [],

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
          this._columns.push( { table_name : table_name, columns : this.clone(rows) });

          connection.end();

          cb(null, 'getColumns');
        }.bind(this)
      );
    },

    getAllColumns : function(cb) {
      var u     = require('underscore');
      var async = require('async');

      async.mapSeries(
        this._tables, 
        this.getColumns.bind(this), 
        function(err, result){
          if (err) throw err;
          cb(null, 'getAllColumns');
        }
      );

    },

    getTables : function(cb) {
      var mysql      = require('mysql');
      var connection = mysql.createConnection(this._mysql_cred);
      var u          = require('underscore');

      connection.query(
        'select table_name from information_schema.tables', 
        function(err, rows, fields) {
          if (err) throw err;

          // save the array of tables
          this._tables = u.map(rows, function(o){return o.table_name});
          
          // filter out the system tables
          this._tables = u.filter(this._tables, function(i){return !u.contains(this._system_tables, i);}.bind(this));

          connection.end();

          cb(null, 'getTables');
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
          this.getAllColumns(cb);
        }.bind(this),

        function(cb){
          var fs = require('fs');

          fs.writeFile(this._output_filename, JSON.stringify(this._columns, null, 4), function(err) {
            if(err) {
              console.log(err);
            } else {
              console.log("JSON saved to " + this._output_filename);
            }
            cb(null, 'end')
          }.bind(this)); 

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
