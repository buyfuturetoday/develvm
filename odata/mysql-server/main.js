(function(exports) {

// main.js
//------------------------------
//
// 2014-08-01, Jonas Colmsjö
//
//------------------------------
//
// MySQL to odata primitiva data types:
//
// * tinyint, smallint - int16
// * mediumint, int - int32
// * bigint - int64
// * decimal - decimal
// * float - single
// * double - doouble
// * DateTime, date, year - DateTime
// * time - time
// * char, varchar - string
//
// MySQL types not implemented:
//
// * bit - up to 64 bits
// * Timestamp - utc format
// * binary & varbinary - same as char/varchar but handled as digits
// * BLOB & TEXT
// * enum - list of values with indexes
// * set - list of values
//
//
// use like this:
//
//	>npm install
//	>node
//	>var s = require('./main.js').create();
//	>s.init();
//
// Using Google JavaScript Style Guide - http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml
//
//------------------------------


"use strict";

exports.create = function() {

  return {

  	// Class Properties
  	// ================

  	// Mapping from MySQL primitive types to odata primitive types. Initilized in init()
    _types            : [],
    _datajs_scope     : {},


  	// Helpers
  	// ================

	// Import the datajs module. datajs is built for browsers so we need to fix DOMParser and XMLHttpRequest
	// Using this approach: http://gokcergokdal.blogspot.se/2014/04/consuming-odata-services-from-node.html
  	_initDatajs : function() {

		var fs             = require('fs');
	    var DOMParser      = require('xmldom').DOMParser;
	    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

	    var scope = {
	        XMLHttpRequest : XMLHttpRequest,
	        DOMParser      : DOMParser,

	        execute : function(fileName) {
	            var filedata = fs.readFileSync(fileName,'utf8');
	            eval(filedata);
	        }
	    };

	    scope.execute(__dirname+'/datajs-1.1.2.min.js');

	    // access to generated services from our custom scope
	    module.exports.OData = scope.OData;
	    module.exports.datajs = scope.datajs;

	    this._datajs_scope = scope;

	},


    // Class methods
    // =============


    // Initialize object
    // -----------------

    init : function() {

    	// Setup mapping between MySQL and odata primitive types
    	this._types["TINYINT"]   = "Int16";
    	this._types["SMALLINT"]  = "Int16";
    	this._types["MEDIUMINT"] = "Int16";
    	this._types["INT"]       = "Int16";
    	this._types["DECIMAL"]   = "Decimal";
    	this._types["FLOAT"]     = "Single";
    	this._types["DOUBLE"]    = "Double";
    	this._types["DATETIME"]  = "DateTime";
    	this._types["DATET"]     = "DateTime";
    	this._types["YEAR"]      = "DateTime";
    	this._types["TIME"]      = "Time";
    	this._types["CHAR"]      = "String";
    	this._types["VARCHAR"]   = "String";

    	this._initDatajs();

    }

  };
};

}(typeof exports === 'undefined' ? this['mysql_odata_server']={} : exports));