(function() {

	//
	// Define a module named gizur
	//===========================
	// This is a example module that I'll try to load with jQuery.getScript 

	// save referenfce to the global object (`window` in the browser or `global` on the server)
	var root = this;


	// Define the top-level gizur namespace. Exported both for CommonJS and the browser
	var gizur;
	if(!gizur) {
		if (typeof exports !== 'undefined') {
			gizur = exports;
		} else {
			gizur = root.gizur = {};
		}
		
		gizur.VERSION = '0.0.1';
	}
	
	// A simple module
	gizur.modules = {
		
		// A constructor
		MyModule: function() {
			
			// a private variable
			this._myString = "";
		},
		
		// Getter
		getString: function() {
			return this._myString;	
		},
		
		// Setter
		setString: function(str) {
			this._myString = str;	
		}
		
	};
	
}).call(this);