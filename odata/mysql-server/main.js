// main2.js
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
//         var t = require('../main.js');
//        t.init();
//
//        // exports for easy access
//        mysqlodata = t.mysqlodata;
//        OData      = t.OData;
//        datajs     = t.datajs;
//
// Using Google JavaScript Style Guide - http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml
//
//------------------------------


(function (self, undefined) {

  var mos    = self.mysqlodata || {};
  var odata  = self.OData      || {};
  var datajs = self.datajs     || {};


  // Class Properties
  // ================

  // Mapping from MySQL primitive types to odata primitive types. Initilized in init()
  mos._types            = [];


  // Helpers
  // ================

  // Import the datajs module. datajs is built for browsers so we need to fix DOMParser and XMLHttpRequest
  // Using this approach: http://gokcergokdal.blogspot.se/2014/04/consuming-odata-services-from-node.html
  var	_initDatajs = function() {

    var fs             = require('fs');
    var DOMParser      = require('xmldom').DOMParser;
    var XMLSerializer  = require('xmldom').XMLSerializer;
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var doc            = new DOMParser().parseFromString("<html><body></body></html>","text/html");

    var scope = {
        XMLHttpRequest : XMLHttpRequest,
        DOMParser      : DOMParser,
        document       : doc,
        XMLSerializer  : XMLSerializer,

        execute : function(fileName) {
            var filedata = fs.readFileSync(fileName,'utf8');
            eval(filedata);
        }
    };

//    scope.execute(__dirname+'/datajs-1.1.2.min.js');
    scope.execute(__dirname+'/datajs-1.1.2.js');

    // access to generated services from our custom scope
    odata  = scope.OData;
    datajs = scope.datajs;
	};


  // Class methods
  // =============


  // Initialize object
  // -----------------

  var init = function() {

    	// Setup mapping between MySQL and odata primitive types
    	mos._types["TINYINT"]   = "Int16";
    	mos._types["SMALLINT"]  = "Int16";
    	mos._types["MEDIUMINT"] = "Int16";
    	mos._types["INT"]       = "Int16";
    	mos._types["DECIMAL"]   = "Decimal";
    	mos._types["FLOAT"]     = "Single";
    	mos._types["DOUBLE"]    = "Double";
    	mos._types["DATETIME"]  = "DateTime";
    	mos._types["DATET"]     = "DateTime";
    	mos._types["YEAR"]      = "DateTime";
    	mos._types["TIME"]      = "Time";
    	mos._types["CHAR"]      = "String";
    	mos._types["VARCHAR"]   = "String";

    	_initDatajs();


      module.exports.OData      = odata;
      module.exports.datajs     = datajs;
  };


  // Exports
  // =======

  module.exports.mysqlodata = mos;
  module.exports.init       = init;

})(this);