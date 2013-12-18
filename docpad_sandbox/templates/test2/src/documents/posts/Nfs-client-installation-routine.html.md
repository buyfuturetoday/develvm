
---
layout: post
title: Nfs
date: 2012-01-01
author: Jonas Colmsjo
tags: ['post']
---

Yet another post





[[wiki]] > [[Technical Architecture]] > [[Execution Architecture]]


h1. NFS client installation routine


<pre>
apt-get install nfs-common 


sudo vi /etc/default/nfs-common 
NEED_IDMAPD=yes
NEED_GSSD=no # no is default
NEED_STATD=no

mkdir /nfs-mnt1

</pre>



On both server and client
<pre>

# Make sure the domain is the same on both server and client
 sudo vi /etc/idmapd.conf
Domain = gizurcloud.com

# Also check mapping
[Mapping]

Nobody-User = nobody
Nobody-Group = nogroup

modprobe nfs

sudo vi /etc/modules
# add nfs on the last line
</pre>


<pre>
service idmapd start

# Test to mount the drive
mount -t nfs4 -o proto=tcp,port=2049 int-backend-ubuntu-ebs1.nfs.gizurcloud.com:/ /nfs-mnt1

</pre>
