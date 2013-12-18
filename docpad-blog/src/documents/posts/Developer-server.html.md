
---
layout: post
title: Developer
date: 2012-01-01
author: Jonas Colmsjo
tags: ['post']
---

Yet another post





[[Wiki]]

h1. Developer server

Install LDAP client.

h2. Code Sniffer Code review & PHP Unit

Documentation:
* http://pear.php.net/package/PHP_CodeSniffer/docs

<pre>
sudo apt-get install phpunit
pear install PHP_CodeSniffer
</pre>



h2. Selenium

Continuous integration

* http://pear.phpunit.de/
* http://seleniumhq.org/docs/05_selenium_rc.html
* http://seleniumhq.org/projects/remote-control/


Need Java
* https://github.com/flexiondotorg/oab-java6

<pre>
wget https://github.com/flexiondotorg/oab-java6/raw/0.2.3/oab-java.sh -O oab-java.sh
chmod +x oab-java.sh
sudo ./oab-java.sh

sudo apt-cache search sun
sudo apt-get install sun-java6-jdk


sudo update-alternatives --config java

# Update bashrc
sudo vi /etc/profile

#
# Jonas Colmsjö
#

export JAVA_HOME=/usr/lib/jvm/java-6-sun


</pre>

<pre>
wget http://selenium.googlecode.com/files/selenium-server-standalone-2.23.0.jar

mkdir /opt/selenium
mv selenium-server-standalone-2.23.0.jar /opt/selenium/
adduser --system --group --shell /bin/bash selenium
chown -R selenium /opt/selenium
su - selenium

java -version

sudo nano /etc/rc.local

#
# 2012-06-08, Jonas Colmsjö - Start Selenium server (for testing)
#
su selenium -C "java -jar /opt/selenium/selenium-server-standalone-2.23.0.jar > /var/log/selenium.log 2>&1 &"


sudo ufw allow 4444/tcp
</pre>


<pre>
sudo apt-get upgrade
sudo apt-get install php5-curl
pear upgrade pear

pear channel-discover pear.phpunit.de
sudo pear channel-discover components.ez.no
sudo pear channel-discover pear.symfony-project.com
sudo pear install phpunit/PHPUnit

pear remote-list -c phpunit
pear install --alldeps phpunit/PHPUnit_Selenium

</pre>

h2. xdebug


* http://www.xdebug.org/
* http://www.xdebug.org/docs/install


<pre>
sudo apt-get install php5-dev
sudo pecl install xdebug

sudo nano /etc/php5/apache2/php.ini
...
;;;;;;;;;;;;;;;;;;;;;;
; Dynamic Extensions ;
;;;;;;;;;;;;;;;;;;;;;;
...
zend_extension="/usr/lib/php5/20090626/xdebug.so"


sudo nano /etc/php5/cli/php.ini
...
;;;;;;;;;;;;;;;;;;;;;;
; Dynamic Extensions ;
;;;;;;;;;;;;;;;;;;;;;;
...
zend_extension="/usr/lib/php5/20090626/xdebug.so"


</pre>

<pre>
sudo nano /var/www/xdebug_info.php
<?php
phpinfo();
?>

# Should show xdebug?
php -m
</pre>

h1. OSX


<pre>
cd /tmp && mkdir pear && cd pear
curl http://pear.php.net/go-pear.phar > go-pear.phar
sudo php -d detect_unicode=0 go-pear.phar


sudo cp /opt/local/etc/php5/php.ini-development  /opt/local/etc/php5/php.ini
sudo nano  /opt/local/etc/php5/php.ini
...
include_path = ".:/Users/jonas/pear/share/pear:/php/includes"
...

php -i | grep 'Configuration File'

php -i | grep include_path



cd
sudo .profil_bash
/Users/jonas/pear/bin
</pre>


<pre>
sudo pear channel-discover pear.phpunit.de
sudo pear channel-discover components.ez.no
sudo pear channel-discover pear.symfony-project.com
sudo pear install phpunit/PHPUnit

pear remote-list -c phpunit

sudo pear install phpunit/PHPUnit_Selenium 
</pre>
