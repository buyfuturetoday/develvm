
---
layout: post
title: Distributed
date: 2012-01-01
author: Jonas Colmsjo
tags: ['post']
---

Yet another post





[[Main_Page]]


== Alternatives to NFS ==

* http://serverfault.com/questions/36065/which-distributed-file-system-as-a-backend-for-cloud-computing
* http://en.wikipedia.org/wiki/List_of_file_systems

* http://code.google.com/p/s3ql/wiki/other_s3_filesystems

Candidates:
* HDFS - Hadoop (Java)
* CloudStore
* Lustre - special kernel- http://wiki.lustre.org/index.php/Main_Page
* MogileFS - NOT POSIX Compliant -- you don't run regular Unix applications or databases against MogileFS. It's meant for archiving write-once files and doing only sequential reads
* GlusterFS - NAS file system - http://www.gluster.org/ - Used by RedHat for a new Appliance, should work!!
* MooseFS - POSIX compliant - http://www.moosefs.org/


Use S3:
* http://code.google.com/p/s3backer/ - Simple solution, not a file system, good enough if one server writes and the others only read
* s3fs
* http://ubuntuservergui.com/ubuntu-server-guide/mount-s3-ubuntu-server


Dropbox:
* http://ubuntuservergui.com/ubuntu-server-guide/install-dropbox-ubuntu-server



== NFS ==

High availability NFS setup

* http://www.howtoforge.com/high_availability_nfs_drbd_heartbeat
