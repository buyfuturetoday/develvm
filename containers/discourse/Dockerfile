#
# Dockerfile that builds container with Postgres
# When not using vagrant, run it manually with: docker build .
#


# Image: Postgres
#
# VERSION               0.0.1

FROM     ubuntu
MAINTAINER Jonas Colmsjö "jonas@gizur.com"


# sudo will complain about unknown host otherwise
#RUN echo "127.0.0.1\tlocalhost" >> /etc/hosts
#RUN echo "127.0.0.1\t`hostname`" >> /etc/hosts

# make sure the package repository is up to date
RUN echo "deb http://archive.ubuntu.com/ubuntu precise main universe" > /etc/apt/sources.list
RUN apt-get update -y


#
# Install Postgres
#

RUN apt-get install postgresql -y


#
# Add configuration changes
#

ADD ./etc/postgresql/9.1/main /etc/postgresql/9.1/main


# Stop the database
RUN /bin/su postgres -c "/usr/sbin/service postgresql stop"

# Hack, manual cleanup seams necessary
RUN if [ -e /var/lib/postgresql/9.1/main/postmaster.pid ]; then rm /var/lib/postgresql/9.1/main/postmaster.pid; fi
RUN if [ -d /var/run/postgresql ]; then rm -rf /var/run/postgresql; fi
RUN mkdir -p /var/run/postgresql
RUN chown -R postgres:postgres /var/run/postgresql


# Create postgres user for OpenERP
ADD . /src
RUN chown -R postgres:root /src
RUN /src/init.sh



#-----------------------------------------------------------

run echo "deb http://archive.ubuntu.com/ubuntu precise main universe" > /etc/apt/sources.list # 20103-08-24
run apt-get update
run apt-get install -q -y language-pack-en
run update-locale LANG=en_US.UTF-8

#run echo mail > /etc/hostname
add etc-hosts.txt /etc/hosts
#run chown root:root /etc/hosts

run apt-get install -q -y vim

# Install Postfix.
run echo "postfix postfix/main_mailer_type string Internet site" > preseed.txt
run echo "postfix postfix/mailname string mail.example.com" >> preseed.txt
# Use Mailbox format.
run debconf-set-selections preseed.txt
run DEBIAN_FRONTEND=noninteractive apt-get install -q -y postfix

run postconf -e myhostname=mail.example.com
run postconf -e mydestination="mail.example.com, example.com, localhost.localdomain, localhost"
run postconf -e mail_spool_directory="/var/spool/mail/"
run postconf -e mailbox_command=""

# Add a local user to receive mail at someone@example.com, with a delivery directory
# (for the Mailbox format).
run useradd -s /bin/bash someone
run mkdir /var/spool/mail/someone
run chown someone:mail /var/spool/mail/someone

add etc-aliases.txt /etc/aliases
#run chown root:root /etc/aliases
#run newaliases

# Use syslog-ng to get Postfix logs (rsyslog uses upstart which does not seem
# to run within Docker).
run apt-get install -q -y syslog-ng


#
# Jonas C.
#

# Good foor debugging
run apt-get -y install mutt vim dnsutils

# Need to use smarthost when running in docker (since these IP-adresses often are blocked for spam purposes)
# See: http://www.inboxs.com/index.php/linux-os/mail-server/52-configure-postfix-to-use-smart-host-gmail

run echo smtp.gmail.com USERNAME:PASSWORD > /etc/postfix/relay_passwd
run chmod 600 /etc/postfix/relay_passwd
run postmap /etc/postfix/relay_passwd
add etc-postfix-main.cf /etc-postfix-main.cf
run cat /etc-postfix-main.cf >> /etc/postfix/main.cf


#---------------------------------------------

#
# Misc stuff
#

run apt-get -y install build-essential libssl-dev libyaml-dev git libtool libxslt-dev libxml2-dev libpq-dev gawk curl pngcrush imagemagick python-software-properties

#
# Latest stable version of redis
#

run apt-add-repository -y ppa:rwky/redis
run apt-get update
run apt-get install redis-server


#
# Latest stable version of ngix
#

# Remove any existing versions of nginx
run apt-get remove '^nginx.*$'

# Setup a sources.list.d file for the nginx repository
#run cat << 'EOF' | tee /etc/apt/sources.list.d/nginx.list
#deb http://nginx.org/packages/ubuntu/ precise nginx
#deb-src http://nginx.org/packages/ubuntu/ precise nginx
#EOF

run /bin/sh -c "echo deb http://nginx.org/packages/ubuntu/ precise nginx >> /etc/apt/sources.list.d/nginx.list"
run /bin/sh -c "echo deb-src http://nginx.org/packages/ubuntu/ precise nginx >> /etc/apt/sources.list.d/nginx.list"


# Add nginx key
run curl http://nginx.org/keys/nginx_signing.key | apt-key add -

# install nginx
run apt-get update && apt-get -y install nginx


#
# Fetch the discourse code
#

run git clone https://github.com/discourse/discourse.git /discourse


#
# Install RVM
#

run curl -s -S -L https://get.rvm.io | bash -s stable

# Install missing ubuntu packages
run /bin/sh -c ".  /etc/profile.d/rvm.sh && rvm --autolibs=read-fail requirements"

# Install Ruby
run /bin/sh -c ". /etc/profile.d/rvm.sh && rvm install 2.0.0"

# Install discourse
run /bin/sh -c ". /etc/profile.d/rvm.sh && rvm use 2.0.0 --default && cd /discourse && gem install bundler"



#---------------------------------------------


#
# Start postfix and postgres
#

EXPOSE 25 5432

CMD ["/bin/su","postgres","-c","/usr/lib/postgresql/9.1/bin/postgres -D /var/lib/postgresql/9.1/main -c config_file=/etc/postgresql/9.1/main/postgresql.conf"]
#cmd ["sh", "-c", "service syslog-ng start ; service postfix start ; tail -F /var/log/mail.log"]


