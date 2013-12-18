
---
layout: post
title: Concrete
date: 2012-01-01
author: Jonas Colmsjo
tags: ['post']
---

Yet another post





[[Main_Page]]

* http://www.concrete5.org/documentation/installation/installing_concrete5/


Istnallation on ubuntu 10.04
<pre>
apt-get install unzip
wget http://downloads.sourceforge.net/project/concretecms/concrete5/5.4.2.2/concrete5.4.2.2.zip?r=http%3A%2F%2Fsourceforge.net%2Fprojects%2Fconcretecms%2F&ts=1326102087&use_mirror=switch
mv concrete5.4.2.2.zip?r=http:%2F%2Fsourceforge.net%2Fprojects%2Fconcretecms%2F concrete5.4.2.2.zip
unzip concrete5.4.2.2.zip
mv concrete5.4.2.2 /var/www
chown -R www-data:www-data /var/www/concrete5

# Enable PHPMyAdmin i scalr: server farm -> Manage -> <FARM> -> Options -> MySQL status
# Create a database in MySQL

# on both servers
aptitude update
aptitude safe-upgrade
reboot

aptitude install php5-gd
service apache2 restart

# test mysql connection oon app server
mysql --host=int-mysql-master.c5test.gizurcloud.com -uconcrete5 -p

# open http://c5test.gizurcloud.com/index.php



</pre>
