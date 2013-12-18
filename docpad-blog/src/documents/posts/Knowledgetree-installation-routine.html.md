
---
layout: post
title: Knowledgetree
date: 2012-01-01
author: Jonas Colmsjo
tags: ['post']
---

Yet another post





h1. KnowledgeTree installation routine


* Pre-requisites: http://wiki.knowledgetree.org/Version_3.7
* Installation: http://wiki.knowledgetree.org/KnowledgeTree_Installation_and_Upgrade_Guide

<pre>
yum install wget
yum -y install php-mysql php-xmlrpc php-ldap php-mbstring php-pecl-apc php-pecl-json
service httpd restart

wget --no-check-certificate http://repos.knowledgetree.com/downloads/ktdms-ce-linux-latest
wget --no-check-certificate http://repos.knowledgetree.com/downloads/ktdms-ce-linux-src-latest

tar -xvzf kt-src-oss-3.7.0.2.tgz 
mv ktgit-knowledgetree-c389d34 knowledgetree
mv knowledgetree /var/www/html/
chown -R apache:apache /var/www/html/knowledgetree/




</pre>


h2. Testing


DID NOT WORK, GOT 5.3:
* http://serverfault.com/questions/354895/upgrading-to-php-5-2-in-centos-5-7-64-bit-how-easiest
<pre>
yum install wget
wget http://rpms.famillecollet.com/enterprise/remi.repo
yum remove php-\*
yum --enablerepo=remi install php-pdo php-xml php-pear php-mhash php-mcrypt php-gd php-mysql

</pre>



DID NOT WORK:
* PHP 5.2.x for instance -  http://wiki.centos.org/HowTos/PHP_5.1_To_5.2

<pre>
vi /etc/yum.repos.d/CentOS-Testing.repo

# CentOS-Testing:
# !!!! CAUTION !!!!
# This repository is a proving grounds for packages on their way to CentOSPlus and CentOS Extras.
# They may or may not replace core CentOS packages, and are not guaranteed to function properly.
# These packages build and install, but are waiting for feedback from testers as to
# functionality and stability. Packages in this repository will come and go during the
# development period, so it should not be left enabled or used on production systems without due
# consideration.
[c5-testing]
name=CentOS-5 Testing
baseurl=http://dev.centos.org/centos/5/testing/x86_64/
enabled=1
gpgcheck=1
gpgkey=http://dev.centos.org/centos/RPM-GPG-KEY-CentOS-testing
includepkgs=php*



rpm -qa |grep php
</pre>
