---
layout: post
description: JavaScript MVC Framework
title: JavaScript MVC Framework
date: 2012-08-10
author: Jonas Colmsjo
tags: ['post']
---

Good old MVC for JavaScript





JavaScript MVC frameworks
#=======================


Separation of data, presentation and logic is often achieved through so called MVC frameworks. This is also true in JavaScript.

There are some different frameworks out there. Just Google or check this article:

 * http://codebrief.com/2012/01/the-top-10-javascript-mvc-frameworks-reviewed/

We'll start with looking at underscore.js with mainly is a library for programming in a functional style. It also has e nice template function that we'll use for views.


Underscore.js
------------

An extraxt of the code from ViewExample1.html is showed below:

``` 
...
	window.onload = function(){

		// Cache the template function 
		var tmpl = _.template($('#item-template').html());
		
		// Manage the event when add is clicked
		$('#add').on('click', function() {
			
			var _todo = $('#new-todo')[0];
			log('logging add '+_todo.value +'...');
description: _todo.value} );
			$('#todos')[0].innerHTML = tmpl( {title: _todo.value} );
			
		});
		
		...

	<!-- Templates -->
	
	<script type="text/template" id="item-template">
	  <div>
	    <br/><label><%= title %></label><br/><br/>
	  </div>
	</script>

```

Templates are entered into the body of the HTML document inside a script tag. The tags `<%` and `%>` marks variables, for instance `<%= title %>`. These variables are bound to values when invoking the underscore function `_.template`. In in this example has the template been pre-compiled and the function cashed in order to improve performance when re-rendering the page.


Backbone.js
-----------

Backbone is a MVC framework that uses underscore.js views. The framework has a number of classes:

 * Model and Collection (a set of Model objects)
 * Events
 * Router
 * View

I had problems understanding how it works when running applications built with it soo I took the Todo example and started the debugger. 

Here is the program flow in the Todos example application:

1. A key is pressed in the input field
1. The `createOnEnter` function is triggered (has been registered to the keypress event). It is checked if enter was pressed, return doing nothing otherwise
1. `create`is called on the `Collection` object which contains a set of `Model` objects
1. `create` function calls the `add` function in the `Collection`. 
1. `addOne` in the `Backbone.View` object is invoked by the `trigger`function in `Backbone.Events`
1. A new `TodoView` object is created and appended to the todo-list. The `render`function in the new view is invoked in order to generate the HTML
1. The `save` function in `Backbone.Model` is called. Ajax request, if registered, are executed.

Note: `_onModelEven` in `Backbone.Collection` seams to run the `addOne` function…

I turns out that `Events` are sent between `Model` and `View` objects. 
This seams too complex for me when comparing to what is achieved. Let's try something else.


Ember.js
--------

Ember.js is based on SproutCore, a web development framework that has been around for some time. After spending a couple of hours poking around in Ember I realize that this is an even more complex framework. Also, the documentation is almost non-existing. It used the templating library handlebars.js which seams good. This is a refinement of mustache.js. It is not all that different from underscore.js though.


Conclusion
----------

I'll stick to templating libraries like _.template or perhaps handlebars.js. Mayby backbone.js is worth learning after all. It has events that are propagated between the View and the Model which does reduce the amount of coding required. The code of backbone.js is possible to understand if you put some effort into it. Ember seams much more comprehensive.

