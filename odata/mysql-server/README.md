Intrduction
----------

My intention is to create a odata server for MySQL based on Microsoft's datajs library. datajs is a 
cross-browser library for odata. datajs needs the following objects now available in NodeJS: XMLHttpRequest, DOMParser, XMLSerializer and document. These are injected when initilizing datajs, see main.js.

So far I've been playing around with the odata library datajs in NodeJS. 


Usage
----

Install: `npm install`

Run the tests: `./node_modules/.bin/qunit -t tests/sandbox.js -c main.js`
