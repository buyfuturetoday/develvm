Yet another post

[meta:author]: <> (Jonas Colmsjo)
[meta:title]: <> (JavaScript_Apps.md)
[meta:date]: <> (2012-01-01)
[meta:nested:key]: <> (Metadata value)

##!!truncate


JavaScript Apps
===============

HTML and JavaScript has matured and are quickly becoming a common platform development of large scale applications, often using REST services on the server.

Here I'll take a deep dive into to details of JavaScript. You'll see that JavaScript actually has very little in common with Java other than the syntax being  C-like. JavaScript is protoype based object oriented language similar to Scheme and is well suited for so called functional programming. _This means that it does take some effort to understand the quirks of the language and the libraries often used together with it_.

Browsers, the new operating systems, are also all but easy to work with, often behaving differently and oriented around a complex Document Object Model Tree (DOM Tree).

Nevertheless, it is possible to develop solid, large scale applications if you have a sound development methodology and take care to write code that is compatible cross browsers. There are also libraries, such as jQuery, that are of great help.

At least four things are needed when developing web applications:

1. A methdology for unit testing and logging 
1. A modular design
1. Event handling and routing between different parts of the application
1. Separation of data, presentation and logic - typically som MVC framework

We'll take a look at these things going forward:

1. [[JavaScript Unit Testing and Logging]] - based on John Resig's Ninja book
1. [[JavaScript Modules]] - based on David Flannagan's book
1. [[JavaScript Routing]] - taking a look at crossroads.js and Hasher
1. [[JavaScript MVC frameworks]] - taking a look at backbone.js


## UI Framework

The framework used by twitter, boostrap, is open source and available for everyone to use. This framework manages rendering mobiles, tablets and web browsers. See the Boostrap-Example files here:

* https://github.com/colmsjo/wip/tree/master/JavaScript

The library is downloaded here:

 * http://twitter.github.com/bootstrap/


## Things to check out

* http://net.tutsplus.com/tutorials/javascript-ajax/building-and-testing-a-backbone-app/
