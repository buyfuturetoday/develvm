---
layout: post
description: Ftp
title: Ftp
date: 2012-01-01
author: Jonas Colmsjo
tags: ['post']
---

Yet another post





[[Wiki]]

h1. Ftp server


* https://help.ubuntu.com/10.04/serverguide/ftp-server.html


<pre>
sudo apt-get install vsftpd
#sudo mkdir /srv/ftp
sudo usermod -d /srv/ftp ftp 
sudo /etc/init.d/vsftpd restart

sudo nano /etc/vsftpd.conf
local_enable=YES
write_enable=YES

chroot_local_user=YES

sudo /etc/init.d/vsftpd restart

</pre>
