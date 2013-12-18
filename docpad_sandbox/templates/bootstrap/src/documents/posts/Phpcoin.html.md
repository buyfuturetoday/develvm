
---
layout: post
title: Phpcoin
date: 2012-01-01
author: Jonas Colmsjo
---

Yet another post





[[Main_Page]] > [[IT resources]]

* https://www.phpcoin.com/mod.php?mod=downloads


<pre>
s3cmd get  s3://gizur-dropbox/phpcoin_v165_full_2009-09-26.zip


mysql -pXXX
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 54
Server version: 5.0.77 Source distribution

Type 'help;' or '\h' for help. Type '\c' to clear the buffer.

mysql> create database phpcoin;
Query OK, 1 row affected (0.05 sec)

mysql>grant all privileges on *.* to phpcoin@localhost identified by 'XXX'

mkdir phpcoin
mv phpcoin_v165_full_2009-09-26.zip phpcoin
unzip phpcoin_v165_full_2009-09-26.zip
cd ..
mv phpcoin /var/www/html

cd /var/www/html
chown -R apache.apache phpcoin

</pre>
