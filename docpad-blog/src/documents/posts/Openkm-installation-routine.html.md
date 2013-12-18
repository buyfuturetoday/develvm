
---
layout: post
title: Openkm
date: 2012-01-01
author: Jonas Colmsjo
tags: ['post']
---

Yet another post





[[Wiki]]

h1. OpenKM installation routine

* http://wiki.openkm.com/index.php/Quick_Install:_OpenKM_5

<pre>

wget http://downloads.sourceforge.net/project/openkm/5.1/OpenKM-5.1.9_JBoss-4.2.3.GA.zip?r=http%3A%2F%2Fsourceforge.net%2Fprojects%2Fopenkm%2F&ts=1332750796&use_mirror=netcologne
mv OpenKM-5.1.9_JBoss-4.2.3.GA.zip\?r\=http\:%2F%2Fsourceforge.net%2Fprojects%2Fopenkm%2F  OpenKM-5.1.9_JBoss-4.2.3.GA.zip

unzip OpenKM-5.1.9_JBoss-4.2.3.GA.zip

mv jboss-4.2.3.GA openkm

mv openkm/ /opt/

adduser --system --group --shell /bin/bash openkm
chown -R openkm:openkm /opt/openkm

sudo aptitude install tesseract-ocr openoffice.org imagemagick swftools clamav

sudo nano /etc/rc.local
# Start OpenKM
su openkm -c "/opt/openkm/bin/run.sh -b 0.0.0.0 > /var/log/openkm.log &"

touch /var/log/openkm.log
chown openkm:openkm /var/log/openkm.log

# Change the configuration in OpenKm after login Administration->Configuration and change repository.home
sudo mkdir -p /mnt/openkm/repository

sudo ufw allow 8080
</pre>

Wait a whole for the server to start

Open http://docs.gizurcloud.com:8080/OpenKM/frontend/index.jsp

Login with Log in to OpenKM using user "okmAdmin" with password "admin



h2. LDAP configuration


* http://wiki.openkm.com/index.php/LDAP_and_Active_Directory_user_examples
* http://www.jasig.org/cas
* http://wiki.openkm.com/index.php/Central_Authentication_Service



h2. WebDAV setup

* http://wiki.openkm.com/index.php/WebDAV_access
* http://forum.openkm.com/viewtopic.php?f=5&t=5747

h2. Mail setup

* http://wiki.openkm.com/index.php/JBoss_mail_configuration

<pre>
sudo /opt/openkm/bin/shutdown.sh -S
cd /opt/openkm/server/default/data/wsdl
mv OpenKM.war OpenKM.war.org
wget http://integration.openkm.com/5.1.x/OpenKM.war


reboot
</pre>
