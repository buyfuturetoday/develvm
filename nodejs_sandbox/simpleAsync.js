/*jshint browser:true, devel:true*/
(function(exports) {

// simpleAsync.js
//------------------------------
//
// 2013-07-26, Jonas Colmsjö
//
// Copyright 2013 Gizur AB 
//
// Simple helper for async development
//
// dependencies: None
//
// Using Google JavaScript Style Guide - http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml
//
// The code is commented in 'docco style' - http://jashkenas.github.com/docco/ 
//
//
// Use in browser:
//---------------
// <script type="text/javascript" src="https://raw.github.com/colmsjo/helpersjs/master/lib/js/simpleAsync.js"></script>
// ...
// var h = simpleAsync.create();
// h.firstThen
// ...
//
// Use in node:
// var async = require('./path/simpleAsync.js').create();
// async.firstThen( function() {...}, function(){...} )
//
//------------------------------

    "use strict";

    exports.create = function() {

        return {
            _asyncRunning     : false,
            _timeoutIntervall : 200,
            _result           : [],

            started   : function() {this._asyncRunning = true;},
            stopped   : function() {this._asyncRunning = false;},
            getResult : function() {return (!_asyncRunning) ? this._result : null;},

            firstThen : function (first, then) {
                var counter = 0,
                    intervalId;

                // start the first function, this function must call stopped
                this.started();
                this._result.push(first());

                // check if first() has finished periodically
                intervalId = setInterval(
                    function() {
                    if(async_processing) {
                        counter++;
                    }
                    else {
                        // stop the checking
                        clearInterval(intervalId);

                        // start the second function and return (we will not for this to finish)
                        this.started();
                        this._result.push(then());
                    }
                }
                , this._timeoutIntervall);
            },

            delayed : function(args, callback, milliseconds) {
                if(milliseconds === undefined) {
                    milliseconds = 1000;
                }
                setTimeout(
                    function() {
                        return callback(args);
                        }
                    , milliseconds);
            }
        };
    };

}(typeof exports === 'undefined' ? this['simpleAsync']={} : exports));