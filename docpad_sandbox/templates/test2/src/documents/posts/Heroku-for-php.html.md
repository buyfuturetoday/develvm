
---
layout: post
title: Heroku for php
date: 2012-11-26
author: Jonas Colmsjo
tags: ['post']
---

Heroku do support PHP, even though they don't advertise this





Some solutions similar to Heroku for PHP:

* http://phpfog.com
* http://heroku.com <-- "hidden" support for PHP! see John Barton
 * http://www.quora.com/John-Barton-2
* http://pagodabox.com
* http://cloudcontrol.com
* http://kodingen.com
* http://orchestra.io
* http://dotcloud.com
* http://aws.amazon.com/elasticbea... <-- PHP added Mar 20, 2012
* http://stackblaze.com
* https://openshift.redhat.com/app/
* http://fortrabbit.com
* https://omnicloudapp.com/ (soon)

Articles:

 * http://www.quora.com/Is-there-anything-like-Heroku-I-can-use-for-a-PHP-site

# Setup wordpress on Heroku

Articles:

 * http://decielo.com/articles/350/wordpress-on-heroku-up-and-running

## Guide


```
heroku create --stack cedar --remote production
heroku rename REPO-NAME # Or call it whatever you like for your project

heroku addons:add stillalive:basic
Adding stillalive:basic on mysterious-ravine-7314... done, v3 (free)
Thank you. Please log in to StillAlive via Heroku to setup your monitoring.
Use `heroku addons:docs stillalive:basic` to view documentation.

heroku addons:add cleardb:ignite     # Adds the MySQL option to the Heroku app's config
Adding cleardb:ignite on mysterious-ravine-7314... done, v4 (free)
Use `heroku addons:docs cleardb:ignite` to view documentation.

heroku config                        # See the URLs for your new databases
heroku config:add DATABASE_URL=mysql://... # Replace the "mysql://..." with the URL from CLEARDB_DATABASE_URL
```

Update wp-config.php:
```
if (isset($_SERVER["DATABASE_URL"])) {
 $db = parse_url($_SERVER["DATABASE_URL"]);
 define("DB_NAME", trim($db["path"],"/"));
 define("DB_USER", $db["user"]);
 define("DB_PASSWORD", $db["pass"]);
 define("DB_HOST", $db["host"]);
}
else {
 die("Your heroku DATABASE_URL does not appear to be correctly specified.");
}
```

Update wp-config.php with:

 * random strings from here: https://api.wordpress.org/secret-key/1.1/salt/
 * site URL - define('WP_SITEURL', 'http://' . $_SERVER['SERVER_NAME'] );


Then commit and push to heroku!


## Manage MySQL on cleardb

Heroku/CLeardb don't support phpMyAdmin. Command line tools can be used instead.

```
# Show configuration
heroku config
CLEARDB_DATABASE_URL: mysql://USER:PASWORD@us-cdbr-east-02.cleardb.com/DATABASE?reconnect=true

# Connect with mysql etc.
mysql -uUSER -pPASSWORD -hus-cdbr-east-02.cleardb.com -DDATABASE
```

Export database:
```
mysqldump -uUSER -pPASSWORD -hus-cdbr-east-02.cleardb.com DATABASE > data.sql
```

Import database dump:
```
mysql -uUSER -pPASSWORD -hus-cdbr-east-02.cleardb.com DATABASE < data.sql
```
