
---
layout: post
title: Php
date: 2012-01-01
author: Jonas Colmsjo
tags: ['post']
---

Yet another post





[[Main_Page]] > [[IT resources]]

* http://openlife.cc/blogs/2011/june/mythbusters-how-configure-innodb-buffer-pool-large-mysql-servers
-* http://www.notesbit.com/index.php/web-mysql/mysql/mysql-tuning-optimizing-my-cnf-file/

# Drift och support 

* http://www.percona.com/prices/mysql-support/

Exempel på tjäsnter och verktyg:
* RightScale
* Scalr

Performance:
* SmartOptimizer
*use db slave for reading
* use inmemory cache - memcached etc.
* http://eliw.com/presentations/zendcon-2007-high-perf.pdf
* http://eliw.com/presentations/zendcon-2007-high-perf.pdf
* http://httpd.apache.org/docs/2.0/programs/ab.html
* http://en.wikipedia.org/wiki/Web_server_benchmarking
* http://www.opensourcetesting.org/performance.php
* http://en.wikipedia.org/wiki/List_of_PHP_accelerators
* http://www.script-tutorials.com/how-to-install-apc-on-linux/
* http://www.scribd.com/mobile/documents/2602028/download?secret_password=1j1e9fj5jikq8k6hu35d
* sql bench included with mysql
* mybench
* mysqlslap
* jmeter complex...



#= MySQL =

Probably good, $300 per year for one server
* http://www.webyog.com/en/

Packages:
* mysql-bench
* mysqlreport - yum install mysqlreport
* mysqltuner
* mtop - mtop --dbuser=root --password=
*

Comprehensive tests:
* http://sourceforge.net/apps/mediawiki/osdldbt/index.php?title=Main_Page

Alternatives: Nagios 25 xxxxxxxxxxxxxxxxxxxxxxxxx MONyog 8 xxxxxxxx Cacti 4 xxxx Munin 3 xxx MySQL Enterprise Monitor/Merlin 3 xxx

Nagios:
<pre>
yum install gcc glibc glibc-common
yum install gd gd-devel
yum install nagios
yum install nagios-plugins-all
service nagios start
# open https://<IP>/nagios, nagiosadmin/nagiosadmin
</pre>



Increase php resource limit to 1024M in Webmin
Also set timezone

* http://www.cyberciti.biz/faq/fedora-rhel-install-cacti-monitoring-rrd-software/
* http://docs.cacti.net/plugins
* http://www.cacti.net/downloads/docs/html/unix_configure_cacti.html

<pre>
# cerate cacti database in mysql
yum install net-snmp-utils php-snmp net-snmp-libs
yum install cacti
service httpd restart
cd /usr/share/cacti

rpm -ql cacti | grep cacti.sql
mysql cacti -ucacti -p  < /usr/share/doc/cacti-0.8.7h/cacti.sql

# remove #
vi /etc/cron.d/cacti

# Login with admin/admin
http://31.222.155.9/cacti/install/
</pre>


#= Scalr installation =

* http://code.google.com/p/scalr/
* http://wiki.scalr.net/Getting_Started
* http://wiki.scalr.net/Installing_Scalr

Setup bind in webmin

<pre>
yum -y install libssh2 openssl net-snmp-utils bind php-ZendFramework-Db-Adapter-Mysqli gettext php-php-gettext php-mcrypt mhash php-pecl-ssh2 php-xml php-pear-SOA php-snmp 
wget http://scalr.googlecode.com/files/scalr-2.2.1.tar.gz

# Might need this also
yum install php-pear
pear install pecl_html
</pre>


Apache:
* php-pecl-apc
