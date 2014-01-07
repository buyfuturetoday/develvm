/*jshint evil:true devel:true */

//
// Stolen, with pride, from misc sources. John Resig's Ninja book for instance.
//
//
// Use in Node
// var $       = require('jQuery');
// var helpers = require('./lib/helpers-1.0.js');
//
// set logging level
// logging.threshold  = logging.debug;
// logDebug('Loading page...');
//
// Browser
// <script src="https://raw.github.com/colmsjo/helpersjs/master/lib/js/helpers-1.0.js"></script>
//
// set logging level
// logging.threshold  = logging.debug;
// logDebug('Loading page...');

(function(){

	// Unit test functions
    // -------------------------------------------------------------------------

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
	

	// Logging
    //-------------------------------------------------------------------------
	
	this.logging = {
		emerg:   0,
		alert:   1,
		crit:    2,
		err:     3,
		warning: 4,
		notice:  5,
		info:    6,
		debug:   7
	};

	this.logging.threshold = this.logging.warning;


	// A simple logging statement that works in all browsers.
	this.logEmerg = function(){
		if(this.logging.emerg <= this.logging.threshold ) {
			log(arguments);
		}
	};

	this.logAlert = function(){
		if(this.logging.alert <= this.logging.threshold ) {
			log(arguments);
		}
	};

	this.logCrit = function(){
		if(this.logging.crit <= this.logging.threshold ) {
			log(arguments);
		}
	};

	this.logErr = function(){
		if(this.logging.err <= this.logging.threshold ) {
			log(arguments);
		}
	};

	this.logWarning = function(){
		if(this.logging.warning <= this.logging.threshold ) {
			log(arguments);
		}
	};

	this.logNotice = function(){
		if(this.logging.notice <= this.logging.threshold ) {
			log(arguments);
		}
	};

	this.logInfo = function(){
		if(this.logging.info <= this.logging.threshold ) {
			log(arguments);
		}
	};

	this.logDebug = function(){
		if(this.logging.debug <= this.logging.threshold ) {
			log(arguments);
		}
	};

	this.log = function log() {
		try {
			console.log.apply( console, arguments );

            // check for node or browser
            if (typeof module !== 'undefined' && module.exports) {
                // in node

            } else {
                // in browser

                // use printStackTrace if available
                if (typeof printStackTrace !== 'undefined') {
                    console.log(printStackTrace());
                }
            }

		} catch(e) {
			try {
				opera.postError.apply( opera, arguments );
			} catch(e){
				alert( Array.prototype.join.call( arguments, " " ) );
			}
		}
	};


	// Templating
    //-------------------------------------------------------------------------

	// Simple JavaScript Templating
	// John Resig - http://ejohn.org/ - MIT Licensed 
	var cache = {};
	this.tmpl = function tmpl(str, data){
	
		// Figure out if we're getting a template, or if we need to 
		// load the template - and be sure to cache the result. 
		var fn = !/\W/.test(str) ?
			cache[str] = cache[str] || tmpl(document.getElementById(str).innerHTML) :
		
		// Generate a reusable function that will serve as a template 
		// generator (and which will be cached).
		new Function(
			"obj","var p=[],print=function(){p.push.apply(p,arguments);};" + 
			
			// Introduce the data as local variables using with(){}
			"with(obj){p.push('" +
			
			// Convert the template into pure JavaScript
			str
				.replace(/[\r\t\n]/g, " ")
				.split("<%").join("\t")
				.replace(/((^|%>)[^\t]*)'/g, "$1\r")
				.replace(/\t=(.*?)%>/g, "',$1,'")
				.split("\t").join("');")
				.split("%>").join("p.push('")
				.split("\r").join("\\'") + 
				"');}" + 
				"return p.join('');"
			);
		
		// Provide some basic currying to the user
		return data ? fn( data ) : fn; 
	};


    // checkBrowser 
    // -------------------------------------------------------------------------
    // Returns "opera", "firefox", "safari", "chrome" or "ie"

    this.checkBrowser = function checkBrowser() {

      // Opera 8.0+
      var isOpera = !!(window.opera && window.opera.version);
      if(isOpera) return "opera";

      // FF 0.8+
      var isFirefox = testCSS('MozBoxSizing');
      if(isFirefox) return "firefox";

      // At least Safari 3+: "[object HTMLElementConstructor]"
      var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
      if(isSafari) return "safari";

      // Chrome 1+
      var isChrome = !isSafari && testCSS('WebkitTransform');
      if(isChrome) return "chrome";

      // At least IE6
      var isIE = /*@cc_on!@*/false || testCSS('msTransform');
      if(isIE) return "ie";

      return "ERROR: Could not determine browser!"

      function testCSS(prop) {
          return prop in document.documentElement.style;
      }

    };

    // ISODateString
    //-------------------------------------------------------------------------
    //

    this.ISODateString = function ISODateString(d) {

        function pad(n){
            return n < 10 ? '0' + n : n;
        }

        return d.getUTCFullYear()  + '-' + 
            pad(d.getUTCMonth()+1) + '-' + 
            pad(d.getUTCDate())    + 'T' +
            pad(d.getUTCHours())   + ':' + 
            pad(d.getUTCMinutes()) + ':' +
    //          pad(d.getUTCSeconds())+'Z'
            pad(d.getUTCSeconds()) +
            (d.getTimezoneOffset() < 0 ? '+' : '-') +
            pad(Math.abs(Math.floor(d.getTimezoneOffset() / 60 ))) + ':' +
            pad(d.getTimezoneOffset() % 60) ; 
    };


    // signString
    //-------------------------------------------------------------------------------------------------
    // Example of usage:
    // var unixtimestamp = new Date().getTime();
    // var timestamp     = this.ISODateString(new Date(unixtimestamp + (delta * 1000)) );

    this.signString = function signString(stringToSign, secret) {

        // Generate the hash
        var shaObj = new this.jsSHA(stringToSign, "ASCII");
        var hmac   = shaObj.getHMAC(secret, "TEXT", "SHA-256", "B64");

        // usefull for debuggning
        this.logDebug('sign: stringToSign - ' + stringToSign + ' - hash - ' + hmac );

        return hmac;
    };


    // sign
    //-------------------------------------------------------------------------------------------------
    // Example of usage:
    // sha       = require('./lib/sha256.js'),
    // signature = sign('HelpDesk', 'GET', API_KEY, SECRET_KEY, 3600*2);

    this.sign = function sign(model, method, key, secret, delta) {

        // Get Current UNIX time
        var unixtimestamp = new Date().getTime();

        // Check if delta is defined
        if (delta === undefined) { 
            delta = 0; 
        }

        // The ISO-8601 date 
        var timestamp = this.ISODateString(new Date(unixtimestamp + (delta * 1000)) );

        // I'm using a 10 digit random number as salt
        var salt     =  Math.floor( Math.random() * 1000000000 );

        // Build the string to sign
        var signatureArray =[ 
                'Verb' +       method,
                'Model' +      model,
                'Version' +    '0.1',
                'Timestamp' +  timestamp,
                'KeyID' +      key,
                'UniqueSalt' + salt 
            ];

        // Sort the array
        signatureArray.sort();

        // Create a string out of array
        var stringToSign = signatureArray.join('');

        var encoded = this.signString(stringToSign, secret);

        // return a object with timestamp, salt and the signture
        return { timestamp: timestamp, salt: salt, base64: encoded };
    };


    // generateApiKeyAndSecret
    //-------------------------------------------------------------------------------------------------
	// var bigint = require('../lib/BigInt.js');
	// var keyAndSecret = generateApiKeyAndSecret(bigint);

    this.generateApiKeyAndSecret = function generateApiKeyAndSecret(bigint) {
        return { apiKey    : bigint.bigInt2str(bigint.randBigInt(64,0), 32), 
                 apiSecret : bigint.bigInt2str(bigint.randBigInt(128,0), 58) };
    };


}());

