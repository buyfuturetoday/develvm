(function (self, undefined) {

	var main = function() {
		console.log("Starting tests...");

		var s = require('../main.js').create();
		s.init();

		console.log("datajs initilized: "+JSON.stringify(s) );


		console.log("Running tests...")

		console.log("End of tests...")
	};

	// Exports
	this.main = main;

})(this);

main();