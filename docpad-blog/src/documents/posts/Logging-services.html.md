
---
layout: post
title: Logging services
date: 2012-10-22
author: Jonas Colmsjo
tags: ['post']
---

Hosted external logging solutions come in handy when using AWS, Heroku etc.





Articles:

 * http://www.dark.ca/2011/11/17/send-your-logs-to-the-cloud-loggly-vs-papertrail/
 * http://www.dexterlegaspi.com/journal/?p=214

Some alternatives:

* https://loggly.com
 * PHP SDK - https://github.com/loggly/loggly-php
* https://papertrailapp.com/
 * Seams more established than loggly
 * Seams to be necessary to use the syslog protocol for logging
 * REST API only for queries??
* https://www.splunkstorm.com/
 * Cheaper than loggly
 * REST not supported yet, 'Coming soon...'
* http://www.sumologic.com/
 * expensive - starts at $300/month

Requires server:

 * http://logstash.net/
