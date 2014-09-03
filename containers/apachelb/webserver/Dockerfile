# Apache configured as a load balancer
#
# VERSION               0.0.1
#
# Docs: 
# - http://www.rackspace.com/knowledge_center/article/simple-load-balancing-with-apache
#


FROM     ubuntu:latest
MAINTAINER Jonas Colmsjö "jonas@gizur.com"

RUN echo "export HOME=/root" >> /root/.profile

RUN apt-get update
RUN apt-get install -y wget nano curl git


#
# Install Apache
#

RUN apt-get install -y apache2
RUN a2enmod rewrite status

rm /var/www/html/index.html


#
# Start apache
#

# Fix permissions
RUN chown -R www-data:www-data /var/www/html

# Create a volume
RUN mkdir /volume
VOLUME ["/volume"]


EXPOSE 80 443
CMD /usr/sbin/apache2ctl -D FOREGROUND
