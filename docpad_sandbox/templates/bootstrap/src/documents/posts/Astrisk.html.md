
---
layout: post
title: Astrisk
date: 2012-01-01
author: Jonas Colmsjo
---

Yet another post





[[Main_Page]]


Notes:
* Should test on CentOS 6 which has PHP 5.3, should get version 2.9 of freepbx instead of 2.7

Commands
* service asterisk start / stop / status
* amportal start / stop
* http://<IP>/admin    admin/admin or freepbx/freep


== Bria ==

Bria:
* Bria settings for CellIP: http://screencast.com/t/LjOtMdzSLaGa
* http://www.counterpath.com/x-lite-4-for-mac-download.html


== FreePBX & Asterisk on CentOS ==

* http://www.freepbx.org/
* http://www.freepbx.org/forum/freepbx/installation/asterisk-1-8-installation
* http://www.freepbx.org/support/documentation/installation/first-steps-after-installation

<pre>
vi /etc/yum.repos.d/centos-asterisk.repo
[asterisk-current]
name=CentOS-$releasever - Asterisk - Current
baseurl=http://packages.asterisk.org/centos/$releasever/current/$basearch/
enabled=1
gpgcheck=0
#gpgkey=http://packages.asterisk.org/RPM-GPG-KEY-Digium


vi /etc/yum.repos.d/centos-digium.repo
[digium-current]
name=CentOS-$releasever - Digium - Current
baseurl=http://packages.digium.com/centos/$releasever/current/$basearch/
enabled=1
gpgcheck=0
#gpgkey=http://packages.digium.com/RPM-GPG-KEY-Digium

yum install asterisk18 asterisk18-configs

# Hardware support
yum install dahdi-linux dahdi-tools libpri

# Also did this since FreePB seams to require PHP 5.3
yum upgrade
yum info php

yum install freepbx

cd /usr/srcfreepbx
./install_amp...

http://<ip>/admin
</pre>


== Cellip konfiguration ==

* http://www.cellip.com/asterisk-skola-for-ip-telefoni-sipconf/



= Fix errors =


<pre>
# comment out the TTY line
vi /usr/sbin/safe_asterisk

</pre>


= Testing =

* http://www.scribd.com/doc/3905321/10-Minutes-Asterisk-PBX-on-Amazon-EC2-A-Quickstart-Guide#open_download

<pre>
vi /etc/asterisk/sip.conf 

disallow=all                   ; First disallow all codecs
allow=ulaw                     ; Allow codecs in order of preference

; Add at the end
[1234]
type=friend
callerid="Asterisk" <1234>
host=dynamic
canreinvite=no
secret=1234
dtmfmode=rfc2833
context=default
qualify=yes





vi /etc/asterisk/extensions.conf 
; Add at the enbd
exten => *98,1,VoiceMailMain
exten => *98,2,Hangup


service asterisk restart

# start propmt
asterisk -r

</pre>
