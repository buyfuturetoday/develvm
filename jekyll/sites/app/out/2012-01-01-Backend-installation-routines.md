---
layout: post
description: Backend
title: Backend
date: 2012-01-01
author: Jonas Colmsjo
tags: ['post']
---

Yet another post





[[wiki]] > [[Technical Architecture]] > [[Execution Architecture]]


h1. Backend installation routines

Create a Scalr role based in the MySQL roles. This gives us a master/slave setup and also scheduled bundles.


h2. Install NFS server - NOT USED!!

Guide: https://help.ubuntu.com/community/SettingUpNFSHowTo
* http://www.migrate2cloud.com/blog/how-to-setup-nfs-server-on-aws-ec2

I'm assuming that a EBS fiel system has been created and mounted. I've started from the Scalr MySQL Role which has this in /mnt/dbstorage

Use Elastic IP:s for the NFS clients to we know what IP:s that should be able to mount drives.
* http://oav.net/mirrors/cidr.html

<pre>
apt-get install nfs-kernel-server
mkdir -p /export/nfs-data1
chmod -R 777 /export
mkdir /mnt/nfs-data1

mount --bind /mnt/nfs-data1 /export/nfs-data1

sudo vi /etc/fstab
/mnt/nfs-data1  /export/nfs-data1   none    bind  0  0

sudo vi /etc/default/nfs-kernel-server 
NEED_SVCGSSD=no # no is default

sudo vi /etc/default/nfs-common
NEED_IDMAPD=yes
NEED_GSSD=no # no is default


sudo vi /etc/exports
# All server in this network (within the same Amazon Security Group) are allowed to mount these drives
/export       10.0.0.0/8(rw,fsid=0,insecure,no_subtree_check,async)
/export/nfs-data1  10.0.0.0/8(rw,nohide,insecure,no_subtree_check,async)
sudo exportfs -ra

# Skip this
sudo vi /etc/hosts.deny
portmap mountd nfsd statd lockd rquotad : ALL

# Skip this
sudo vi /etc/hosts.allow
portmap mountd nfsd statd lockd rquotad : 176.34.125.222

# enable logging
sudo vi /etc/default/nfs-common
RPCGSSDOPTS="-vvv"

sudo vi /etc/default/nfs-kernel-server
RPCSVCGSSDOPTS="-vvv"

tail -f /var/log/daemon.log


service portmap restart
service nfs-kernel-server restart

</pre>


On both server and client
<pre>

# Make sure the domain is the same on both server and client
 sudo vi /etc/idmapd.conf

# Also check mapping
[Mapping]

Nobody-User = nobody
Nobody-Group = nogroup

</pre>


<pre>
service idmapd start
/etc/init.d/nfs-kernel-server restart
</pre>


h2. Setup LDAP

* https://help.ubuntu.com/community/OpenLDAPServer
* https://help.ubuntu.com/10.04/serverguide/C/openldap-server.html

<pre>
sudo apt-get install slapd ldap-utils
</pre>

# Webmin > LDAP > Configuration, change user and password etc.
# Access Control ... install CPAN...
# Start ser
# error: no root DN -> create
# Apply configuration
# 

# error: Your LDAP server's database does not contain the root DN dc=gizur,dc=com yet, which means that no data can be added until you create it. However, Webmin can do this for you by clicking the button below.
# Press create DN



* http://www.ldap-account-manager.org/
