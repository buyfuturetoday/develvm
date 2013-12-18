
---
layout: post
title: Freeside
date: 2012-01-01
author: Jonas Colmsjo
tags: ['post']
---

Yet another post





== ubuntu ==

* http://www.freeside.biz/mediawiki/index.php/Freeside:2.1:Documentation:Installation:Ubuntu

<pre>
...
 createdb -E Unicode freeside -T template0
...
apt-get install ftp
cpan FS/part_svc.pm FS/pkg_svc.pm
</pre>


== centos ==

<pre>
wget http://www.freeside.biz/freeside/freeside-1.9.5.tar.gz
gunzip freeside-1.9.5.tar.gz
tar -xvf freeside-1.9.5.tar
mv freeside-1.9.5 /var/www/html/
chown -R apache.apache /var/www/html/freeside-1.9.5/

</pre>
