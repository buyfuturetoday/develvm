# MySQL Server with Apache and phpmyadmin
#
# VERSION               0.0.1

FROM     ubuntu:latest
MAINTAINER Jonas Colmsjö "jonas@gizur.com"


# Keep upstart from complaining
#RUN dpkg-divert --local --rename --add /sbin/initctl
#RUN ln -s /bin/true /sbin/initctl

# archive.ubuntu.com not supported anymore for this ubuntu version
#RUN echo "deb http://old-releases.ubuntu.com/ubuntu quantal main universe multiverse" > /etc/apt/sources.list
RUN apt-get update

RUN apt-get install -y wget nano curl git


#
# Install supervisord (used to handle processes)
#

RUN apt-get install -y supervisor
ADD ./supervisord.conf /etc/supervisor/conf.d/supervisord.conf


#
# Install Apache and PHP
#

RUN apt-get install -y apache2 php5 php5-curl php5-mysql php5-mcrypt
RUN a2enmod rewrite

# Bundle everything and install
ADD ./src-phpmyadmin/phpMyAdmin-4.0.8-all-languages.tar.gz /var/www/html/
ADD ./conf/etc /etc

#RUN cd /var/www/html; tar -xzf phpMyAdmin-4.0.8-all-languages.tar.gz
RUN rm /var/www/html/index.html

#ADD ./src-phpmyadmin/config.inc.php /var/www/html/phpMyAdmin-4.0.8-all-languages/config.inc.php

ADD ./vtigercrm-5.4.0.tar.gz /var/www/html/
#RUN cd /var/www/html; tar -xzf vtigercrm-5.4.0.tar.gz


#
# Install MySQL
#

# Bundle everything
ADD ./src-mysql /src-mysql

# Load SQL dumps
#ADD ./sql-script/latest.sql /sql-script/latest.sql
ADD ./sql-script/ /sql-script/

# Install MySQL server
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y mysql-server && apt-get clean && rm -rf /var/lib/apt/lists/*

# Fix configuration
RUN sed -i -e"s/^bind-address\s*=\s*127.0.0.1/bind-address = 0.0.0.0/" /etc/mysql/my.cnf

# Setup admin user
RUN /src-mysql/mysql-setup.sh

# Load data
RUN /src-mysql/load-data.sh


#
# Start apache and mysql using supervisord
#

ADD ./start.sh /

EXPOSE 3306 80 443
CMD ["/start.sh"]
