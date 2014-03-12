Logging in JavaScript

[meta:author]: <> (Jonas Colmsjo)
[meta:title]: <> (Logging in JavaScript)
[meta:date]: <> (2013-02-19)
[meta:nested:key]: <> (Metadata value)

##!!truncate

## Logging in JavaScript

Step one is to make sure that the right stuff actually is logged. Some thoughts:

 * http://raven-js.readthedocs.org/en/latest/

Also check out this: http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/ 

Stack traces in any browser: http://www.eriwen.com/javascript/js-stack-trace/

## Logging alternatives

Some alternatives:
 
 * http://stacktracejs.com/
 * http://rescuejs.com/
 * https://github.com/flatiron/winston
  * https://github.com/ifit/winston-express
 * http://log4js.berlios.de/
 * Node version of above - https://github.com/nomiddlename/log4js-node
 * http://log4javascript.org/
 * http://log4js.sourceforge.net/
 * http://www.gscottolson.com/blackbirdjs/
 * Advanced platform - https://github.com/getsentry/sentry
  * https://getsentry.com/welcome/
 * https://github.com/bpaquet/node-logstash
 
 
winston together with winston-express could be an alternative for logging from the browser.

Sentry seams like a powerful and interesting alternative, perhaps too powerful?


There are winston transports for some centralized logging services:

 * https://github.com/indexzero/winston-loggly
 * https://github.com/kenperkins/winston-papertrail
 * https://github.com/erichelgeson/winston-splunk
 * https://github.com/guzru/winston-sentry
 * https://github.com/indexzero/winston-mongodb

Not really JS, but logging:

Open source:

 * http://www.logstash.net/
 * http://graylog2.org/
 * Real time aggregation - https://github.com/facebook/scribe
 * https://cwiki.apache.org/FLUME/home.html
 
Commercial:

 * https://crashlog.io
 * https://airbrake.io
 * http://loggly.com/
 * http://www.splunk.com/
 * https://papertrailapp.com/
 * http://www.cloudpelican.com/
 * http://boundary.com/

 * https://github.com/basho/riaktant


Some articles:

 * https://www.wunki.org/posts/2012-01-19-centralized-logging-with-sentry.html
 * https://npmjs.org/browse/keyword/logging
 * http://devopsangle.com/2012/04/19/8-splunk-alternatives/
 
 