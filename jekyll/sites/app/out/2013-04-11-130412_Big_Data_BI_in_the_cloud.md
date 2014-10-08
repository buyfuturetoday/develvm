---
layout: post
description: Big Data BI in the cloud
title: Big Data BI in the cloud
date: 2013-04-11
author: Jonas Colmsjo
tags: ['post']
---

Big Data BI in the cloud





## Introduction

Big data solutiuons is marching into the BI space big time. The space for traditional data warehouses
solutions will mos tlikely decrease and big data solutions with web based front-ends will take market
shares.

This is s high level overview over some alternatives.


## List of solutions

The open source Hadoop stack is dominating this space. These solutions are not very end user friendly 
but there are popping up miscellaneous solutions, often based on Haddop that adress that issue.

Some solutions:

 * SiSense - Web front-end. In-memory solution for the back-end, needs to be installed on a local server, cloud options are coming
 * KarmaSphere - appliance that neeeds to be installed
 * Datameer - 
 * Platfora - cloud and on-premise solution available
 * Birst

 My plan is to find some time the coming week to try these out.

More solutions to check out:
 * http://www.qubole.com/
 * http://www.hapyrus.com/


## Datameer

I've tried to signup for a cloud based trial but haven't received any mail. I've contacted support about this.

 * Download - http://download.datameer.com/trial/Datameer-2.1/Datameer-2.1.2.5/Datameer-2.1.2.5.dmg
 * http://www.datameer.com/download-direct.html

The personal edition seams to run ok on my mac. The web based interface is intuitive and easy to use. JDBC drivers needs to be setup in order to access relational databses. 

An interesting feature is that there is an app market with apps for SalesForce, Zendesk, Web site stats etc. 


## Karmasphere

* Installation Guide - http://support.karmasphere.com/customer/portal/articles/792010-trial-vm-configuration?mkt_tok=3RkMMJWWfF9wsRonvK%2FJZKXonjHpfsX56ewrUaW%2FlMI%2F0ER3fOvrPUfGjI4DTcNqI%2BSLDwEYGJlv6SgFSLnBMbhrwLgEWRY%3D

 * Resource center - http://support.karmasphere.com/customer/portal/articles/768615-karmasphere-resource-center?mkt_tok=3RkMMJWWfF9wsRonvK%2FJZKXonjHpfsX56ewrUaW%2FlMI%2F0ER3fOvrPUfGjI4DTcNqI%2BSLDwEYGJlv6SgFSLnBMbhrwLgEWRY%3D


start a medium size ubuntu 12.04 instance and login

Install Ubuntu desktop. I'm using a NoMachine client to login (VNC etc. can also be used) s

 * https://github.com/colmsjo/ubuntu_desktop

```
# This cfengine script install what is needed

sudo apt-get install -y cfengine3 git

cd /etc/cfengine3
sudo git clone git://github.com/colmsjo/ubuntu_desktop.git .
sudo chmod -R og=r /etc/cfengine3/roles

sudo nano /etc/default/cfengine3
sudo /etc/init.d/cfengine3 restart

sudo sh -c "cf-agent --verbose --define phonegap> cfengine-log.txt" && more cfengine-log.txt

# This needs to be fixed manually, the cfengine script doesn't
sudo nano /etc/ssh/sshd_config 
...
PasswordAuthentication yes


# reboot in order to restart all processes, sshd etc. has changed configuration
sudo reboot
```

The root password needs to be set in order to login with NX

```
sudo passwd ubuntu
```


Download Oracle Java 6: http://www.oracle.com/technetwork/java/javase/downloads/jre6downloads-1902815.html

* http://askubuntu.com/questions/67909/how-do-i-install-oracle-jdk-6


```
# I'm using a S3 bucket to upload the Java install file
sudo apt-get install s3cmd

s3cmd --configure

s3cmd get ...

chmod +x jre-6u45-linux-x64.bin 
./jre-6u45-linux-x64.bin

mv jre1.6.0_45 java-6-oracle
sudo mkdir /usr/lib/jvm
sudo mv java-6-oracle /usr/lib/jvm

# Update path etc.
nano .bashrc
export PATH=$PATH:/usr/lib/jvm/java-6-oracle/bin
export JAVA_HOME=/usr/lib/jvm/java-6-oracle

```


Connect with NoMachine

```
s3cmd get s3://gizur-tmp/ksanalyst_linux_emr.sh
chmod +x ksanalyst_linux_emr.sh 
./ksanalyst_linux_emr.sh 
```


## Some links


 * http://whatsthebigdata.com/2012/06/11/3-big-data-startups-datameer-dataxu-bison/


