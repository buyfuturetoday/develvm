Mail server as a Docker image
============================

This is a Dockerfile to get a Postfix mail server. Only Postfix is installed,
no Dovecot, no spamassassin, and so on (contributions are welcome).

To get Postfix logs (and write them to stdout when the image is running), we
also install syslog-ng (I think rsyslog does not work within a container
because of the way upstart works; this needs to be checked).


Outgoing mail
------------
Many mail servers don't accept incoming connections from IP-adresses
from virtual machines. A smarthost needs to be used in these cases. This
image requires an account at Google. 

Update USERNAME and PASSWORD in this row in the Dockerfile: 
run echo smtp.gmail.com USERNAME:PASSWORD > /etc/postfix/relay_passwd

Start with: `docker build .`


Incoming mail
-------------

The Dockerfile (and thus the resulting image) is specific to
`mail.example.com` and a user `someone` is created. Simply replace
"example.com", and "someone" in all this repository files and you should get a
running mail server with the following commands:

    > docker build .
    > mkdir maildirs
    > docker run -p 25:25 -v `pwd`/maildirs:/var/mail example.com/mail

Note: You have to setup a reverse MX DNS entry pointing back to your mail server's
hostname.


Testing
------

Start a interactive container: `docker run -t -i <image> /bin/bash`

Send a test mail:

```
telnet localhost 25
ehlo localhost
mail from: root@localhost
rcpt to: fmaster@localhost
data
Subject: My first mail on Postfix

Hi,
Are you there?
regards,
Admin
. (Type the .[dot] in a new Line and press Enter )
quit
```


See if it came through: `ls /home/fmaster/Maildir/new/`

Being it up in a mail client:

```
su - fmaster
mutt
```


Now try to connect using POP3:

```
telnet localhost 110
user fmaster
+OK Password required.
pass password
+OK logged in.
quit
```


Node POP3 client
---------------

A small test wit a node POP3 client:

```
cd pop3-client && npm install
cd node_modules
# edit demos/basic.js and set HOSTNAME, USERNAME and PASSWORD
node demos/basic.js
```
