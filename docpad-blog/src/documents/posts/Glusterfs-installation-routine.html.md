
---
layout: post
title: Glusterfs
date: 2012-01-01
author: Jonas Colmsjo
tags: ['post']
---

Yet another post





[[wiki]] > [[Technical Architecture]] > [[Execution Architecture]]


h1. Notes

* Should stop mounting Gluster drives. Should use rsync instead. I think some ports are missing below for the mount to work
* Scaling of Gluster servers do not work

h1. Build SCM Tree

On both
<pre>
crontab -e

0,5,10,15,20,25,30,35,40,45,50,55 * * * * /root/scripts/gluster-main.sh
</pre>

On gluster2
<pre>
crontab -e
0,5,10,15,20,25,30,35,40,45,50,55 * * * * /root/scripts/scm-build-tree.sh
</pre>


h1. GlusterFS installation routine

* http://download.gluster.com/pub/gluster/glusterfs/3.2/Documentation/IG/html/sect-Installation_Guide-Installing-Debian.html

<pre>
cd dwnl
wget http://download.gluster.com/pub/gluster/glusterfs/LATEST/Ubuntu/10.10/glusterfs_3.2.6-1_amd64.deb

s3cmd get s3://gizur-install/glusterfs_3.2.5-1_amd64.deb

sudo apt-get install openssh-server wget nfs-common
sudo dpkg -i glusterfs_3.2.5-1_amd64.deb

service glusterd start
gluster peer status

# start at boot
update-rc.d glusterd defaults
</pre>

Ensure that TCP ports 111, 24007, 24008, 24009-(24009 + number of bricks across all volumes) are open on all Gluster servers. If you will be using NFS, open additional ports 38465 to 38467


Start a second server (here using Scalr MySQL Master/Slave setup)
<pre>
gluster peer probe int-mysql-slave.fs.gizurcloud.com
</pre>


Create a volume:
<pre>
# gluster volume create vol1 replica 2 transport tcp int-mysql-master.fs.gizurcloud.com:/mnt/dbstorage/exp1 int-mysql-slave.fs.gizurcloud.com:/mnt/dbstorage/exp2

gluster volume create vol1 replica 2 transport tcp int-custom-glusterfs1.fs1.gizurcloud.com:/mnt/storage/exp1 int-custom-glusterfs2.fs2.gizurcloud.com:/mnt/storage/exp2

gluster volume start vol1
</pre>


h3. Scaling Gluster - DOES NOT WORK

There is a script that automatically adds new slaves to the cluster (looking at the domain).
The script also creates a directory in the slave and adds this to the volume.

<pre>

crontab -e

@hourly /root/scripts/gluster-main.sh


sudo apt-get install libnet-dns-perl libuuid-tiny-perl

</pre>


h3. Security

<pre>
sudo apt-get install ufw

sudo ufw default deny
chmod g-w /etc

sudo ufw allow ssh
sudo ufw allow 8014/udp
sudo ufw allow 8013/tcp

sudo ufw allow 111/tcp
sudo ufw allow 111/udp

sudo ufw allow 24007/tcp
sudo ufw allow 24008/tcp
sudo ufw allow 24009/tcp
sudo ufw allow 24010/tcp
sudo ufw allow 24011/tcp
sudo ufw allow 24012/tcp


sudo ufw allow 38465/tcp
sudo ufw allow 38466/tcp
sudo ufw allow 38467/tcp
sudo ufw allow 38468/tcp

sudo ufw allow 10000/tcp

sudo ufw enable

sudo ufw status

sudo ufw logging on

</pre>

h2. Mount the drive

<pre>
vi /etc/fstab

localhost:/vol1 /mnt/vol1 glusterfs defaults,_netdev,log-level=ERROR,log-file=/var/log/gluster.log,nobootwait 0 0

mkdir /mnt/storage/vol1
mount /mnt/storage/vol1 

</pre>
