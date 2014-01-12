#
# Postfix with POP3 and IMAP (courier)
#

from ubuntu:12.04
maintainer Vo Minh Thu <noteed@gmail.com>

run echo "deb http://archive.ubuntu.com/ubuntu precise main universe" > /etc/apt/sources.list # 20103-08-24
run apt-get update
run apt-get install -q -y language-pack-en
run update-locale LANG=en_US.UTF-8

#run echo mail > /etc/hostname
add etc-hosts.txt /etc/hosts
#run chown root:root /etc/hosts

run apt-get install -q -y vim

#
# Install Postfix.
#

run echo "postfix postfix/main_mailer_type string Internet site" > preseed.txt
run echo "postfix postfix/mailname string mail.example.com" >> preseed.txt
# Use Mailbox format.
run debconf-set-selections preseed.txt
run DEBIAN_FRONTEND=noninteractive apt-get install -q -y postfix

run postconf -e myhostname=mail.example.com
run postconf -e mydestination="mail.example.com, example.com, localhost.localdomain, localhost"
# not in the original setup, needed? RUN postconf -e "mynetworks = 127.0.0.0/8, 192.168.1.0/24"
# RUN postconf -e "inet_interfaces = all"
run postconf -e mail_spool_directory="/var/spool/mail/"
run postconf -e mailbox_command=""
RUN postconf -e "home_mailbox = Maildir/"


# Add a local user to receive mail at someone@example.com, with a delivery directory
# (for the Mailbox format).

# Two slightly different ways of adding a user
RUN useradd -m -s /bin/bash fmaster
RUN echo fmaster:password |chpasswd

run useradd -m -s /bin/bash someone
RUN echo someone:password |chpasswd
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


#
# Setup POP3 and IMAP
#
# From this guide https://help.ubuntu.com/community/PostfixBasicSetupHowto
#

RUN apt-get install -y courier-pop courier-imap

#
# Start things
#

expose 25
cmd ["sh", "-c", "service syslog-ng start ; service postfix start ; service courier-pop start ; service courier-imap start ; tail -F /var/log/mail.log -F /var/log/messages"]
