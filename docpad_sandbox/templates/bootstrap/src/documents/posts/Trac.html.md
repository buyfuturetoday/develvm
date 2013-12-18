
---
layout: post
title: Trac
date: 2012-01-01
author: Jonas Colmsjo
---

Yet another post





[[Main_Page]]


== Installation ==

* http://trac.edgewall.org/wiki/TracInstall#InstallingTrac

Create a a MySql database: s2.gizur.com/phpMyAdmin

<pre>
yum install python-setuptools
yum install MySQL-python

easy_install Genshi
easy_install Babel==0.9.5
easy_install Trac

mkdir /var/www/trac
chown -R apache.apache /var/www/trac

trac-admin /var/www/trac/ghpf initenv
# mysql://tracghpf:xxxx@localhost:3306/tracghpf

chown -R apache.apache /var/www/trac/ghpf

tracd  --port 8000 --basic-auth="ghpf,/etc/svn-auth-conf,ghpf env" /var/www/trac/ghpf &> /var/log/trac.log &

vi /etc/sysconfig/iptables
# -A RH-Firewall-1-INPUT -m state --state NEW -p tcp --dport 8000 -j ACCEPT

service iptables stop
service iptables start
</pre>



<pre>

tracd  --port 8000 --basic-auth="ghpf,/etc/svn-auth-conf,ghpf env" /var/www/trac/ghpf &> /var/log/trac.log &



</pre>
