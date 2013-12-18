
---
layout: post
title: JavaScript Routing
date: 2012-08-10
author: Jonas Colmsjo
tags: ['post']
---

Client side routing in JavaScript





JavaScript Routing
==================


We need a solid way of managing navigation between different parts (pages etc.) in the application that is easy to understand and maintain. Using different routing techniques has become common in web applications and there are JavaScript libraries for this.

We'll take a look at crossroads.js and Hasher. 


```
<html>
<head>
	<title>Module Example</title>
	<script src="lib/basic.js"></script>
	<script src="lib/signals.js"></script>
	<script src="lib/crossroads.min.js"></script>
	<script src="lib/hasher.min.js"></script>
	<script>

	window.onload = function(){
		test("Testing Crossroads.js and Hasher.", function(){
			
			// setup crossroads, using the global object. 
			// It is also possible to have several independent Routers
			crossroads.addRoute('route1', function() { 
				log('logging static route1...');} 
			);
			
			crossroads.addRoute('route2', function() {
				log('logging static route2...');} 
			); 
			
			crossroads.addRoute('/{route}/{param1}/{param2}', function(route, param1, param2){
				log('logging dynamic route:'+route+', param1:'+param1+', param2:'+param2+'...');} 
			); 
			
			// default listener, log all routes that has been matched
			crossroads.routed.add(console.log, console); 
			
			// Also log routes that did not match anything (useful for debugging)
			crossroads.bypassed.add(function(request){
				log("A route that wasn't matched:"+request); 
			});
			
			//setup hasher
			function parseHash(newHash, oldHash){
				crossroads.parse(newHash); 
			}
			
			hasher.initialized.add(parseHash); // parse initial hash 
			hasher.changed.add(parseHash); 	// parse hash changes 
			hasher.init(); 					// start listening for history change
			
			//update URL fragment generating new history record 
			hasher.setHash('route1');

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
	
	
	<div id="test1">
		Some links:<br/>
		<a href="#route1">#route1</a><br/>
		<a href="#route2">#route2</a><br/>
		<a href="#/route3/i_love/this">#route3</a><br/>
		<a href="#route4">#route4</a><br/>
	</div>
	
</body>
</html>
```

crossroads associates a route with a callback functions. Callbaks are very common in modern JavaScript so just get used to them (if you're not already). For instance will clikcing on the link `<a href="#route1">#route1</a>` trigger a call to the function `function() { log('logging static route1...');} );`. This function was associated with the event using `crossroads.addRoute`.

The statement `hasher.changed.add(parseHash)` will make sure that Hasher calls the function `parseHash` each time the URL in the application changes. This is so called hash navigation.
