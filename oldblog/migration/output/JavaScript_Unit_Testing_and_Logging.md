Yet another post

[meta:author]: <> (Jonas Colmsjo)
[meta:title]: <> (JavaScript_Unit_Testing_and_Logging.md)
[meta:date]: <> (2012-01-01)
[meta:nested:key]: <> (Metadata value)

##!!truncate


JavaScript Unit Testing and Logging
===================================

All JavaScript exmaples will use a simple unit testing framework from John Resig's Ninja book. 

The unit testing framework has two functions:

1. assert(value, desc) - make sure that `value` is true and show the `desc` in either green or red based on the result
1. test(name, fn) - group asserts into tests executed together. `fn` is a function containg the tests to run and `name` is the description of the tests 


```
(function(){

	//--------- Unit test functions ---------

	var results;
	
	this.assert = function assert( value, desc ) {
		var li = document.createElement("li");
		li.className = value ? "pass" : "fail";
		li.appendChild( document.createTextNode( desc ) );
		results.appendChild( li );
		if ( !value ) {
			li.parentNode.parentNode.className = "fail";
		}
		return li;
	};
	
	this.test = function test(name, fn) {
		results = document.getElementById("results");
		results = assert( true, name ).appendChild(
			document.createElement("ul") );
		fn();
	};

```


The logging function simple logs to the console or shows an alert if there is no console.


```
	//--------- Logging ---------
	
	// A simple logging statement that works in all browsers.
	this.log = function log() {
	  try {
	    console.log.apply( console, arguments );
	  } catch(e) {
	    try {
	      opera.postError.apply( opera, arguments );
	    } catch(e){
	      alert( Array.prototype.join.call( arguments, " " ) );
	    }
	  }
	}

})();
```
All examples going forward will use these functions.
