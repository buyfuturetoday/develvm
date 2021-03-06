# MySQL Server with Apache and phpmyadmin
#
# VERSION               0.0.1

FROM     base
MAINTAINER Jonas Colmsjö "jonas@gizur.com"


# Keep upstart from complaining
RUN dpkg-divert --local --rename --add /sbin/initctl
RUN ln -s /bin/true /sbin/initctl

# archive.ubuntu.com not supported anymore for this ubuntu version
RUN echo "deb http://old-releases.ubuntu.com/ubuntu quantal main universe multiverse" > /etc/apt/sources.list
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
ADD ./src-phpmyadmin /var/www
ADD ./conf/etc /etc

RUN cd /var/www; tar -xzf phpMyAdmin-4.0.8-all-languages.tar.gz
RUN rm /var/www/index.html

ADD ./src-phpmyadmin/config.inc.php /var/www/phpMyAdmin-4.0.8-all-languages/config.inc.php


#
# Install Wordpress
#

#ADD ./src-wordpress /var/www


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
# Install NodeJS
#

# Download and install using npm
# old RUN curl https://raw.github.com/creationix/nvm/master/install.sh | sh
RUN curl https://raw.githubusercontent.com/creationix/nvm/v0.11.1/install.sh | bash
RUN echo "[ -s $HOME/.nvm/nvm.sh ] && . $HOME/.nvm/nvm.sh" > /.profile
RUN /bin/bash -c "source /.profile && nvm install v0.11.2"

# Install node for root user
ADD ./src-node /src-node
RUN /src-node/init-node.sh


#
# Install the SAP HANA driver
#

RUN apt-get update
RUN apt-get install -y unixodbc php5-odbc libaio1

ADD ./sap_hana_linux64_client_rev80 /tmp
RUN chmod +x /tmp/hdbinst; chmod +x /tmp/hdbsetup; chmod +x /tmp/hdbuninst; chmod +x /tmp/instruntime/sdbrun
RUN sudo /tmp/hdbinst -b -a client

ADD ./odbc.ini /etc/
#ADD ./test_conn.php /var/www/
ADD ./src-php /var/www


#
# Start apache and mysql using supervisord
#

EXPOSE 3306 80 443
CMD ["supervisord","-n"]
