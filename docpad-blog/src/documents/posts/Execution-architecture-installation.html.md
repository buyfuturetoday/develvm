
---
layout: post
title: Execution
date: 2012-01-01
author: Jonas Colmsjo
tags: ['post']
---

Yet another post





[[wiki]] > [[Technical Architecture]] > [[Execution Architecture]]


h1. Execution Architecture Installation

h3. All environments but production

The vTiger CRM archives that contains the installation resides in the repository: http://s2.gizur.com:81/projects/cikab1/repository/show/setup.
The repository must be checkout to this path: /root/svn/gom-dev

Each vTiger environment (baseline, sandbox, development, test, prod etc.) has a setup script. The scripts are also found here:
* http://s2.gizur.com:81/projects/cikab1/repository/show/setup

There are two configuration files that also needs to be managed manually on the application server. The files should be copied to subversion after the initial installation. Updates are then automatically deployed from subversion in the same way as all other php files. 
# config.inc.php - example for the baseline environment - http://s2.gizur.com:81/projects/cikab1/repository/show/root-dir/var/www/html/vtigerbase
# portal/PortalConfig.php - example for the baseline environment - http://s2.gizur.com:81/projects/cikab1/repository/show/root-dir/var/www/html/vtigerbase/portal

The database also needs to be initialized when a new database is installed. This needs to be performed before the config.inc.php file is deployed. Open the page http://<server>/<environment> and follow the instructions.


h3. Setup of production environment

Everything related to deployment to the production server is managed by the subversion repository:
* https://s2.gizur.com/svn/gom-prod
* The repository must be checkout to this path: /root/svn/gom-prod

The structure of the repository is the same as the development repository. Setup on the production server is performed by first checking out the repository.
* Edit the setup script and make changes according to the OS that vTiger is installed on
* Then execute the setup script.

There are two configuration files that also needs to be managed manually on the application server. The files should be copied to subversion after the initial installation. Updates are then automatically deployed from subversion in the same way as all other php files. 
# config.inc.php
# portal/PortalConfig.php


The usual vTiger installation procedure should then be followed:
* http://wiki.vtiger.com/index.php/Vtiger_CRM_5.3_Installation
* http://wiki.vtiger.com/index.php/Customer_Portal


h4. Workaround

In case the Settings > Customer Portal meny show 'CustomerPortal not active': try to uncheck and then re-check the CustomerPortal module.


h2. Application server installation routine

Installation routine:
* Ubuntu (now used in all environments) - [[ubuntu installation of app server]]
* Centos - [[Server installation instructions]]


h2. phpMyAdmin installation


* phpmyadmin.gizurcloud.com has been setup in the DNS with a virtual host pointing to /var/www/html/phpmyadmin
* There is a setup script in svn/gom-dev/setup

Dependencies needs to be installed:
<pre>
root@ec2-46-137-62-95:~# apt-cache depends phpmyadmin
phpmyadmin
 |Depends: libapache2-mod-php5
 |Depends: php5-cgi
  Depends: php5
 |Depends: php5-mysql
  Depends: <php5-mysqli>
  Depends: php5-mcrypt
  Depends: perl
 |Depends: debconf
  Depends: <debconf-2.0>
    cdebconf
    debconf
  Depends: dbconfig-common
  Depends: ucf
  Depends: libjs-mootools
  Suggests: mysql-server
    mysql-cluster-server-5.1
    mysql-server-5.1
 |Recommends: apache2
    apache2-mpm-itk
    apache2-mpm-event
    apache2-mpm-prefork
    apache2-mpm-worker
 |Recommends: lighttpd
  Recommends: <httpd>
    apache2-mpm-itk
    bozohttpd
    monkey
    tntnet
    aolserver4-core
    aolserver4-daemon
    apache2-mpm-event
    apache2-mpm-prefork
    apache2-mpm-worker
    boa
    cherokee
    dhttpd
    ebhttpd
    fnord
    lighttpd
    mathopd
    micro-httpd
    mini-httpd
    nginx
    ocsigen
    thttpd
    webfs
    yaws
  Recommends: php5-gd
  Recommends: mysql-client
    mysql-client-5.1
    mysql-cluster-client-5.1
</pre>





