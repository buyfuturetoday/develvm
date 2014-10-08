---
layout: post
description: Limesurvey
title: Limesurvey
date: 2012-01-01
author: Jonas Colmsjo
tags: ['post']
---

Yet another post





[[Main_Page]] > [[IT resources]]

* http://www.limesurvey.org/en/download
* http://docs.limesurvey.org/Installation&structure=English+Instructions+for+LimeSurvey

<pre>
wget http://sourceforge.net/projects/limesurvey/files/1._LimeSurvey_stable/1.90%2B/limesurvey190plus-build9642-20101214.tar.gz/download
gunzip limesurvey190plus-build9642-20101214.tar.gz
tar -xvf limesurvey190plus-build9642-20101214.tar
mv limesurvey /var/www/html/
cd /var/www/html/
chown -R apache.apache limesurvey/
cd /var/www/html/limesurvey/
vi config.php

$databasepass = 'mypassword'
...
$defaultpass        = 'mypassword'


open http://s2.gizur.com/limesurvey/admin/install
1. Create database
2. Populate database
3. Main admin screen

mv admin/install admin/install2

4. Try again
5. login with admin/mypassword
</pre>
