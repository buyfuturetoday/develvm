
---
layout: post
title: Kvm
date: 2012-01-01
author: Jonas Colmsjo
---

Yet another post





[[Main_Page]] > [[Cloud Solutions]]


== Links ==

* http://wiki.centos.org/HowTos/KVM - setup KVM and bridged networking
* http://wiki.centos.org/HowTos/Network/IPTables
* http://www.cyberciti.biz/faq/rhel-linux-kvm-virtualization-bridged-networking-with-libvirt/

== Installation ==

rpmforge repositories CANNOT  be enabled. I have not been able to get qemu to work using qemu from rpmforge.

<pre>
egrep '(vmx|svm)' --color=always /proc/cpuinfo
yum install kvm kmod-kvm qemu-kvm-img virt-manager
modprobe kvm-amd
/sbin/lsmod | grep kvm
usermod -G kvm -a jonas etc.

reboot
</pre>

Copy scripts for creating a bridge and TAP tunnels from the subversion repositiry

Install a windows server
<pre>
qemu-img create -f qcow2 disk.img 5G
dd if=/dev/zero of=disk.img bs=1G count=5
# change img and iso etc
qemu-kvm -hda win2k.img -cdrom win2k.iso -m 512 -boot d
# run the machine
qemu-kvm -hda win2k.img
</pre>

== Network ==

Chenge the device of teh machine if it has been cloned
<pre>
virsh
edit lserverXX
find the interface section and change vnetX toi vnetY
</pre>


== Disable NAT ==

* http://www.cyberciti.biz/faq/linux-kvm-disable-virbr0-nat-interface/
