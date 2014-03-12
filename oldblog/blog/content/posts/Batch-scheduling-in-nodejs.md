AWS don't have batch scheduling, let's do something in Node on Heroku

[meta:author]: <> (Jonas Colmsjo)
[meta:title]: <> (Batch scheduling in NodeSJ)
[meta:date]: <> (2012-10-18)
[meta:nested:key]: <> (Metadata value)

##!!truncate


Requirements:

1. Make periodic calls to REST Services - typically php jobs hosted in AWS Elastic Beanstalk (or engineyard, phpfog etc.)
1. Possible to view log files in one way or another
1. GUI is not vital, can make changes in config/code that is pushed using git etc. 


# Online servies

There are probably some, found this in a quick search:

* http://www.onlinecronservices.com/
* http://www.webbasedcron.com/
* http://www.mywebcron.com/
* https://www.setcronjob.com/

Feels old school...

# NodeJS

Greater flexibility will be achieved with NodeJS.

Search for cron with npm:
```
$ npm search cron
info trying registry request attempt 1 at 13:53:23
http GET https://registry.npmjs.org/-/all/since?stale=update_after&startkey=1349506031000
http 200 https://registry.npmjs.org/-/all/since?stale=update_after&startkey=1349506031000
NAME               DESCRIPTION                                                   AUTHOR                DATE              KEYWORDS
abiogenesis        Asyncronous, nested 'task' runner framework with dependency resolution. =jakeluer   2012-10-12 01:04
ajs                Experimental asyncronous templating in Node                   =kainosnoema          2011-06-08 04:35  ajs ejs
asynct             simple asyncronous test runner                                =dominictarr          2012-05-07 12:07
chronos            Log cronjob results to graylog2                               =jkrems               2012-04-15 21:36  loggin g
Cron                                                                             =ushus                2012-05-08 06:18
cron               CronJob's for your node                                       =ncb000gt             2012-09-13 23:17
cron-as-a-service  Remote cron service                                           =fzaninotto           2012-06-04 21:41  cron ser
cron-jayubba       CronJob's for your node                                       =jayubba              2012-03-06 21:13
cron2              CronJob's for your node                                       =architectd           2011-09-12 05:21
crontab            A module for reading, manipulating, and writing user crontabs with node.js =blago   2012-03-07 16:32  cron cro
cronworker         cron tabs + node jobs                                         =architectd           2012-08-21 13:15
custodian          A different sort of cron                                      =jvinet               2012-05-17 18:11
dateselect         Dateselect is a time-based job scheduler (like cron). The syntax is built on CSS-like selectors, so it's easy
hook.io-cron       emit arbitrary Hook.io events with arbitrary data on specified time intervals =marak =indexzero =jameson 2011-
hook.io-ws         hook for websocket connection                                 =cronopio =marak      2011-09-16 00:43
http-proxy         A full-featured http reverse proxy for node.js                =indexzero =cronopio =bradleymeck =avianflu =mma
http-timeout       Distributed timeout for HTTP                                  =tjanczuk             2012-03-09 00:44  http app
jscron             Cron Format Parser And Schedule Dates Generator               =romansky             2012-10-16 18:14  cron sch
later              Determine later occurrences of recurring schedules            =bunkat               2012-07-11 17:28  schedule
log-cleaner        NODE module for cleaning log files uing node-cron             =tolgaakyuz           2012-07-09 12:44  log cron
momo               Cronjob with web hooks.                                       =totendev             2012-09-24 18:10  cron cro
node-schedule      A cron-like and not-cron-like job scheduler for Node.         =mattpat              2012-02-16 19:24  schedule
northwatcher       NorthWatcher is cron for filesystem changes.                  =sjs                  2012-02-25 04:10
omicron            A library for object manipulation and differential operations, prototypal inheritance, and more. =nickfargo 20
p                  pattern matching in javascript for asyncronous iteration      =dscape               2012-02-19 18:19  pattern
poolq              NodeJS Background Process Management w/ Queue                 =edwardhotchkiss      2011-12-08 17:01  queue cr
qejs               Asyncronous Embedded JavaScript Templates with Q              =forbeslindesay       2012-08-27 13:47  templati
recaptcha-async    Handles calling reCAPTCHA asyncronously.                      =aldipower            2011-06-19 17:44  recaptch
redshed            A scheduler system backed by redis                            =koopa                2012-10-16 17:32  schedule
repeat             Repeat.js is a javascript library that makes working with repeated actions pure joy by removing the need for s
rush               The ultimate solution of writing asyncronous code in a beautiful way. =scaryzet     2012-05-17 09:50  async
scheduler          Cron scheduler for node.js                                    =podviaznikov         2011-07-06 16:00  schedule
scriptjs           Asyncronous JavaScript loader and dependency manager          =ded =fat             2012-04-24 19:40  ender sc
synct              simple test framework for syncronous tests                    =dominictarr          2011-08-09 09:02
tits               TITS is a recursive acronym for "TITS is Templating System"   =eprev                2012-10-12 11:00  template
tock               Distributed cron-style job system that has many features missing from cron =rfink   2012-04-20 15:03
```


Some notes:
 * node-cron seams to be fairly established (https://github.com/ncb000gt/node-cron)



