
---
layout: post
title: Virtualbox
date: 2012-01-01
author: Jonas Colmsjo
tags: ['post']
---

Yet another post





[[Main_Page]] > [[Cloud Solutions]]



== Links ==
* http://wiki.centos.org/HowTos/Virtualization/VirtualBox



== Installation ==

<pre>
cd /etc/yum.repos.d
wget http://download.virtualbox.org/virtualbox/rpm/rhel/virtualbox.repo

yum --enablerepo rpmforge install dkms
yum groupinstall "Development Tools"
yum install kernel-devel

yum install VirtualBox-3.2

usermod -G vboxusers jonas ...
</pre>


=== Make USB work ===

<pre>
mkdir /vbusbfs
echo "none /vbusbfs usbfs rw,devgid=$(awk -F : '/vboxusers/ {print $3}' /etc/group),devmode=664 0 0" >> /etc/fstab
mount -a
</pre>


== Configure guest ==

* http://wiki.centos.org/HowTos/I_need_the_Kernel_Source

<pre>
yum install kernel-devel

</pre>
