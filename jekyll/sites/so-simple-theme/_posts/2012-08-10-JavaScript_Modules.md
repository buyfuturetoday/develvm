---
layout: post
description: JavaScript Modules
title: JavaScript Modules
date: 2012-08-10
author: Jonas Colmsjo
tags: ['post']
---

THere are several ways to modularize JavaScript





JavaScript Modules
#================

Some articles:
 * http://caolanmcmahon.com/posts/writing_for_node_and_the_browser/
 * http://www.2ality.com/2011/11/module-gap.html



Example
-------

This exmaple has been taken from David Flannagans book, 'JavaScript: The Definite Guide'.


```

<html>
<head>
	<title>Module Example</title>
	<script src="lib/basic.js"></script>
	<script>

	//
	// Define a module. This should be placed in the folder gizur/MyModule.js 
	//
	
	var gizur;
	if(!gizur) gizur = {};
	
	// A simple module
	gizur.modules = (function () {
		
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
		

	window.onload = function(){
		test("Testing the module MyModule.", function(){
			
			var _myModule = new gizur.modules.MyModule();	// create a MyModule object (by cloning the gizur.modules.MyModule)
			
			_myModule.setString("testing");
			assert( _myModule.getString() == "testing", "Make sure that custom setter and getter works" );
		});
  
	};
	</script>
	<style>
		#results li.pass { color: green; }
		#results li.fail { color: red; }
	</style>
</head>
<body>
	<ul id="results"></ul>
</body>
</html>

```

There are three main points in this:

1. The module `gizur.modules` has been encapsulated in a anonymouns function expresssion in order not to clutter the global namespace. All variables and functions in JavaScript have global scope. They are assigned as properties to the window object which is the context that everthing runs within. This expression avoid the side effect of creating new global properties on the windows object.
1. New objects are created with the `new` operator applied on constructurs which simply are functions. In this module is the MyModule constructor hidden within the anonymous function but a new object is returned by the function. The expression `new gizur.modules.MyModule()` will invoke the constructor and return a new object.
1. New public methods and properties are assigned to the object through `prototype`, for instance `MyModule.prototype.getString`.
