#
# Dockerfile that builds container with Postgres
# When not using vagrant, run it manually with: docker build .
#


# Image: Postgres
#
# VERSION               0.0.1

FROM     ubuntu
MAINTAINER Jonas Colmsjö "jonas@gizur.com"


# make sure the package repository is up to date
RUN echo "deb http://archive.ubuntu.com/ubuntu precise main universe" > /etc/apt/sources.list
RUN apt-get update -y


#
# Install Postfix
#

RUN DEBIAN_FRONTEND=noninteractive apt-get -y install postfix mutt vim dnsutils rsyslog

echo admin@gizur.com > /root/.forward

mkdir -p /var/mail/root
mkdir /sent

echo Europe/Stockholm > /etc/timezone
/usr/sbin/dpkg-reconfigure -f noninteractive tzdata


echo ypdomainname gizurcloud.com. > /etc/rc.local

#
# Add configuration changes
#

ADD ./etc/postgresql/9.1/main /etc/postgresql/9.1/main


# Create postgres user for OpenERP
ADD . /src
RUN chown -R postgres:root /src
RUN /src/init.sh


#
# Start Postgres
#

EXPOSE 5432

CMD ["/bin/su","postgres","-c","/usr/lib/postgresql/9.1/bin/postgres -D /var/lib/postgresql/9.1/main -c config_file=/etc/postgresql/9.1/main/postgresql.conf"]
