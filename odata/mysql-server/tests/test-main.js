(function (window, undefined) {

	var _initODataTests = function() {

		var fs             = require('fs');
	    var DOMParser      = require('xmldom').DOMParser;
	    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

	    var scope = {
	        XMLHttpRequest : XMLHttpRequest,
	        DOMParser      : DOMParser,

	        module         : function(dummy) {
	        	return null;
	        },

	        execute : function(fileName) {
	        	module.exports.module = module;
	            var filedata = fs.readFileSync(fileName,'utf8');
	            eval(filedata);
	        }
	    };

	    scope.execute(__dirname+'/odata-atom-tests.js');

	};

	var main = function() {
		console.log("Starting tests...");

		var s = require('../main.js').create();
		s.init();

		console.log("datajs initilized: "+JSON.stringify(s) );


		console.log("Running tests...")
		_initODataTests();

	};

	// Exports
	this.main = main;

})(this);

main();