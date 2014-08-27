# MySQL Server with Apache and phpmyadmin
#
# VERSION               0.0.1
#
# Docs: 
# - http://cweiske.de/tagebuch/Running%20Apache%20with%20a%20dozen%20PHP%20versions.htm
# - http://cweiske.de/tagebuch/Introducing%20phpfarm.htm
#


FROM     ubuntu:latest
MAINTAINER Jonas Colmsjö "jonas@gizur.com"

RUN echo "export HOME=/root" >> /root/.profile

RUN apt-get update
RUN apt-get install -y wget nano curl git


#
# Install supervisord (used to handle processes)
#

RUN apt-get install -y supervisor
ADD ./supervisord.conf /etc/supervisor/conf.d/supervisord.conf


-------------

#
# Preparations
#

RUN apt-get update
RUN apt-get install -y libxml2-dev libbz2-dev libmcrypt-dev libxslt1-dev libssl-dev libsslcommon2-dev libapr1-dev libaprutil1-dev libreadline-dev make


#
# Use phpfarm to manage PHP versions
#

RUN cd /opt; git clone git://git.code.sf.net/p/phpfarm/code phpfarm
RUN cd /opt/phpfarm/src; ./compile.sh 5.3.2


#
# Manage PHP versions in Apache using FastCGI
#

RUN apt-get install -y libapache2-mod-fastcgi apache2-mpm-worker apache2-suexec
RUN a2enmod actions fastcgi suexec


-------------

#
# Preparations
#

RUN apt-get update
RUN apt-get install -y libxml2-dev libbz2-dev libmcrypt-dev libxslt1-dev libssl-dev libsslcommon2-dev libapr1-dev libaprutil1-dev libreadline-dev make


#
# Compile Apache2
#

RUN wget http://apache.mirrors.spacedump.net//httpd/httpd-2.4.10.tar.gz
RUn wget http://apache.mirrors.spacedump.net//httpd/httpd-2.2.27.tar.gz
RUN tar -xzf httpd-2.2.27.tar.gz
RUN cd httpd-2.2.27; ./configure --enable-so; make; make install; 


#
# Compile PHP
#


RUN wget -O php-5.3.28.tar.gz http://se1.php.net/get/php-5.3.28.tar.gz/from/this/mirror
RUN tar -xzf php-5.3.28.tar.gz
RUN cd php-5.3.28; ./configure --with-apxs2=/usr/local/apache2/bin/apxs --with-mysql; make; make install

RUN cd /cd php-5.3.28; cp php.ini-development /usr/local/lib/php.ini


#
# Install Apache and PHP
#

RUN apt-get install -y apache2 php5 php5-curl php5-mysql php5-mcrypt php5-gd php5-imap
RUN a2enmod rewrite
RUN a2enmod status
RUN php5enmod imap
ADD ./etc-apache2-mods-available-status.conf /etc/apache2/mods-available/status.conf
ADD ./etc-php5-apache2-php.ini /etc/php5/apache2/php.ini
RUN rm /var/www/html/index.html
RUN echo "<?php\nphpinfo();\n " > /var/www/html/info.php

# Install phpMyAdmin
ADD ./src-phpmyadmin/phpMyAdmin-4.0.8-all-languages.tar.gz /var/www/html/
ADD ./src-phpmyadmin/config.inc.php /var/www/html/phpMyAdmin-4.0.8-all-languages/config.inc.php

# Install vTiger
ADD ./vtigercrm-5.4.0.tar.gz /var/www/html/


#
# Install MySQL
#

# Bundle everything
ADD ./src-mysql /src-mysql

# Install MySQL server
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y mysql-server && apt-get clean && rm -rf /var/lib/apt/lists/*

# Fix configuration
RUN sed -i -e"s/^bind-address\s*=\s*127.0.0.1/bind-address = 0.0.0.0/" /etc/mysql/my.cnf

# Setup admin user and load data
RUN /src-mysql/mysql-setup.sh

#
# Start apache and mysql using supervisord
#

# Fix permissions
RUN chown -R www-data:www-data /var/www/html


ADD ./start.sh /

EXPOSE 3306 80 443
CMD ["/start.sh"]
