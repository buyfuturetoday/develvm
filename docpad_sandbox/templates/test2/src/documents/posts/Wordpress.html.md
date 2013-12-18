
---
layout: post
title: Wordpress
date: 2012-01-01
author: Jonas Colmsjo
tags: ['post']
---

Yet another post





Lite om wordpress.

# Pretty links

Bra artikel: https://help.ubuntu.com/community/EnablingUseOfApacheHtaccessFiles

1. Kolla a mod_rewrite är på `sudo apache2ctl -M`. Slå på med `sudo a2enmod rewrite`
1. Ändra så att Wordpress har skrivrättigheter i det bibliotek det installalerats (satte g+w tror jag)
1. Gå in i Wordpress: Settings > Permalinks > Custom - /%post_id%/%postname%/
1. Lägg till följande

```
vi /etc/httpd/conf/httpd.conf
<Directory "var/www/html/dev-gizur-com">
    AllowOverride All
</Directory>
```

# Ta bort leave a reply

Stäng av under Settings > Discussion för nya sidor.

* http://wordpress.org/support/topic/how-to-disable-leave-a-reply-section-to-a-blog-post

```
UPDATE wp_posts SET comment_status='closed' WHERE post_status = 'publish' AND post_type = 'page';
```


# Installation

```
wget http://wordpress.org/latest.zip
unzip

ELLER 
wget http://wordpress.org/wordpress-2.8.4.tar.gz
gunzip ...
tar -xvf wordpress-2.8.4.tar
mv wordpress test-gizur.com
mv test-gizur.com/ /var/www/html/
chown -R apache.apache /var/www/html/test-gizur.com/


http://s2.gizur.com/phpMyAdmin/
Create database user and schema

http://.../wordpress
```


# Multilingual

* http://wordpress.org/extend/plugins/qtranslate/

```
wget http://downloads.wordpress.org/plugin/qtranslate.2.5.20.zip
unzip qtranslate.2.5.20.zip
chown -R apache.apache qtranslate
mv qtranslate /var/www/html/gizurguide/wp-content/plugins/
```
