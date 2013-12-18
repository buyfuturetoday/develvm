
---
layout: post
title: Open
date: 2012-01-01
author: Jonas Colmsjo
tags: ['post']
---

Yet another post





[[Main_Page]] > [[IT resources]]


#= Links =

* http://www.start-base.se/bokfoumlringsprogram.html
* http://www.idg.se/2.1085/1.275921/del-1-kom-igang-samt-import-och-export

#= Lösningar =

* DoFree
* Fortnox - inte open source men billigt


#= Lazy8 =


<pre>
yum install php-xml
wget http://www.cross-connect.se/lazy8/download/lazy8web_02.03.zip

# Login to webmin and change Others > PHP Configuration > Other Settings > Change Timezone to Stockholm (PHP will crash otherwise)
# Login to phpMyAdmin and create database

chown -R apache.apache lazy8
chown -R apache.apache yii
mv lazy8 yii /var/www/html/

# http://<IP>/lazy8
# Login with admin:amin

</pre>
