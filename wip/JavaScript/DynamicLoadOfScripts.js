	//
	// THIS GIVES A STRANGE RECURSIVE DEFINITION OF constructors, 
	// USE THE OTHER METHOD in DynamivLoadOfScripts2.js INSTEAD
	//


	var gizur2;
	if(!gizur2) gizur2 = {};
	
	// A simple module
	gizur2.modules = (function () {
		
		// A private constructor
		function MyModule() {
			this._myString = "";			// a private variable
		}
		
		MyModule.prototype.getString = function() {
			return this._myString;	
		}
		
		MyModule.prototype.setString = function(str) {
			this._myString = str;	
		}
		
		
		return { MyModule: MyModule };					// make the module public by returning the constructors
	}());


