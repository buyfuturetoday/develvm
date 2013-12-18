
---
layout: post
title: Setup
date: 2012-01-01
author: Jonas Colmsjo
tags: ['post']
---

Yet another post





[[Main_Page]] > [[Gizur server admin]] > [[OpenQRM]]


#= Resources =
* http://www.openqrm.com/?q=node/174 -KVM on Ubuntu Howto
* http://www.openqrm.com/?q=node/112 - Cloud Computing Howto
* http://www.openqrm.com/?q=node/125 - LinuxCOE
* http://www.openqrm-enterprise.com/news/details/article/in-depth-documentation-of-openqrm-available.html - In Depth docs
* http://www.openqrm-enterprise.com/news/details/article/howto-setup-openqrm-cloud-deploying-physical-windows-systems-on-centos-55.html - Physical Windows Node
* http://sourceforge.net/projects/openqrm/forums/forum/513343/topic/2838525 - forum discussion
* http://www.giis.co.in/openQRM.pdf

#= 1. Plugins =

Enable and start plugins in this order:
* dhcpd
* tftpd
* lvm-storage
* dns
* image-shelf
* xen (says vmware-server2 in the guide)
* xen-storage
* cloud
* linuxcoe

I'm also using:
* nfs-storage

Not using these at the moment
* local-server
* local-storage


#== Problems with dns ==

* the named deamon was not started
* when trying to start I got an error
* I changed /etc/resolv.conf
<pre>
search gizur
nameserver 127.0.0.1
nameserver 192.168.1.1
</pre>

#= 2. Xen plugin configuration =

http://www.openqrm.com/?q=node/116

* edit /usr/share/openqrm/plugins/xen/etc
** OPENQRM_PLUGIN_XEN_INTERNAL_BRIDGE=xenbr0
* reboot


#= 3. Storage, Resources etc =
* Components -> Create -> Storage
** Deployment: LVM-NFS
** Name: hubert_storage
* Components -> Storage -> Mgmt -> VolGroup00 -> Add LUN -> CentOS, 5000 MB


#= 4. Images =
* Components -> Create -> Image
** Root device: /dev/VolGroup00/CentOS
** Name: centos_54_x86_64
* Deployment -> Image shelf -> Import -> openqrm-enterprise -> CentOs-x86-64
** Choose centos_54_x86_64 image in LVM-NFS storage
* Check event list


#= 5. Create Xen-storage host =



* Storage -> Create 
** Name: xen_storage
** Deployment: Xen LVM storage 

* Appliance -> Create 
** Name: Hubert_xen_storage_host
** Resource: Xen storage host

#= 6. Create Xen VM =

From Virtualization -> Xen storage -> About

<pre>
1. Xen Storage Management : 
* Create a new storage from type "xen-storage"
* Create a new logical volume on this storage
* Use the "local-storage" plugin to populate the new logical volume
or use the "linuxcoe-plugin" to automatically install a Linux distribution on it.
* Another option is to connect to the VMs VNC console and install an OS in the regular way.
Create an Image using the new created logical volume as root-device
Result is an openQRM Image (server-template) which can be deployed to a Xen-Storage VM (on the same system) via an Appliance
</pre>


* Virtualization -> Xen-storage -> Xen VMs -> hubert.gizur
** VMs

* Appliance -> Create -> Idle1
** Name: ___
** Resource: Xen VM

* Goto resources and see the new machine

#= 7. LinuxCOE =

Did not manage to install.


#= 8. VNC =

Try to connect to VM using VNC once it has been created

<pre>
yum install vnc


</pre>
