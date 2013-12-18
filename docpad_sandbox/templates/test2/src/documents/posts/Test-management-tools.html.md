
---
layout: post
title: Test
date: 2012-01-01
author: Jonas Colmsjo
tags: ['post']
---

Yet another post





[[Main_Page]]


* http://en.wikipedia.org/wiki/Test_management_tools



== Test Link ==

Nytt försök:
* http://www.teamst.org/

see setup script







LADDADE NER EN GAMMAL VERSION!

<pre>
wget http://downloads.sourceforge.net/project/testlink/TestLink%201.9/TestLink%201.9.2/testlink-1.9.2.tar.gz?r=http%3A%2F%2Fsourceforge.net%2Fprojects%2Ftestlink%2Ffiles%2F&ts=1323175588&use_mirror=freefr
gunzip testlink-1.9.2.tar.gz 
tar -xvf testlink-1.9.2.tar
mv testlink-1.9.2 /var/www/html/testlink
chown -R apache.apache /var/www/html/testlink


# After successful installation
cp custom_config.inc.php.example custom_config.inc
chown apache.apache custom_config.inc
vi custom_config.inc.php   # Fix mai settings
mv install install.remove

</pre>
