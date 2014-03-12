Yet another post

[meta:author]: <> (Jonas Colmsjo)
[meta:title]: <> (Xen.md)
[meta:date]: <> (2012-01-01)
[meta:nested:key]: <> (Metadata value)

##!!truncate


[[Main_Page]] > [[Cloud Solutions]]


Articles
* http://wiki.centos.org/HowTos/Xen/InstallingCentOSDomU
* http://www.virtuatopia.com/index.php/Building_a_Xen_Virtual_Guest_Filesystem_on_a_Disk_Image_(Cloning_Host_System)


== Paravitualized drivers for Windows ==

*  http://www.linux-kvm.com/content/tip-how-setup-windows-guest-paravirtual-network-drivers

* http://www.redhat.com/docs//en-US/Red_Hat_Enterprise_Linux/5.5/html/Virtualization_Guide/chap-Virtualization-KVM_Para_virtualized_Drivers.html

* http://www.windowsservercatalog.com/results.aspx?text=Red+Hat&bCatID=1282&avc=10&ava=0&OR=5&=Go&chtext=&cstext=&csttext=&chbtext=

== Notes ==

Performance is best with partitions or LVM. File backed xen guest will have poo I/O performance:
* https://www.centos.org/modules/newbb/viewtopic.php?topic_id=10592

Create new vm:
* location: nfs://jonas:pwd@192.168.1.8/gizur2/Install/Microsoft/Windows_Server/windowsserver_2003_R2_32bit_cd1.iso

CentOS5.5 Installation:
* Grub Boot load installed on /dev/hda


== Create empty image ==

<pre>
dd if=/dev/zero of=/srv/xen/mailserver.img oflag=direct bs=1M count=2048
</pre>

== Using images with Xen ==

<pre>
xm create -c centos.5-4.x86.xen3.pygrub.cfg
nmap -sP 192.168.1.0/24
ssh 192.168.122.XXX
xm shutdown centos.5-4.x86 (from another shell)
</pre>


== Mounting images ==

* http://linuxwave.blogspot.com/2008/02/accessing-data-on-xen-lvm-guest-image.html

Howto mount CentOS images (https://secure.stacklet.com/node/124):
<pre>
For the Xen 3 images, the mount command is simply:
mount -o loop centos.5-4.x86.img /mnt/loop
Of course the actual image file and mount directory can be changed. The Xen 3 images are ext3 vbd's. and do not require an offset in the mount command.
For the qemu images an actual offset is needed:
mount -o loop,offset=32256 ...
The given offset should work for all stacklet images.
For vmdk images, you need to mount them with the vmware tools which are not distributed with the free player unfortunately. Or convert it back to a qemu raw using the qemu-img tool
</pre>



== Convert file based guest to LVM based guest ==

* http://www.howtoforge.com/xen-how-to-convert-an-image-based-guest-to-an-lvm-based-guest
* http://www.virtuatopia.com/index.php/Building_a_Xen_Virtual_Guest_Filesystem_using_Logical_Volume_Management_(LVM)
* Should use xvda instead of sda (xvdaX vs. sdX) - http://lists.xensource.com/archives/html/xen-users/2009-06/msg00786.html

<pre>
dd if=/vm/allan.img of=/dev/VolGroup00/allan

vi /etx/xen/allan

Change file:... to phy:...
</pre>


== VNC/Runleve problem ==

* Problems connecting - http://www.realvnc.com/pipermail/vnc-list/2007-September/058139.html

<pre>

init 3
init 5

Try to connect again
</pre>

The root cause is that runlevel 5 isnt' started. /etc/inittab controls this:
* http://www.comptechdoc.org/os/linux/howlinuxworks/linux_hlrunlevels.html


<pre>
Start in runlevel 5
...
id:5:initdefault:
...

My inittab looks like this:
...
id:3:initdefault:
...
</pre>

I changed my inittab.

== Problem installing WinXP ==

Problems installing win xp:
* http://lists.xensource.com/archives/cgi-bin/mesg.cgi?a=xen-users&i=200607061110.34601.yuanjue@yuanjue.net

<pre>
About this freeze issue, that is mainly because the domU OS cannot get enough 
memory as it wants, which is because dom0 gets too much memory (almost all) 
from the computer.

solutions:
1. "xm mem-set 0 XXX" to set a suitable memory for dom0, and be sure that is 
still enough memory left for domU, which could be checked by "xm info"

2. if you don't wanna use "xm mem-set" everytime you boot up a domU, go to 
change the /boot/grub/menu.lst, adding "dom0_mem=XXX" behind the "kernel" 
line. Note that here the memory is measured by KB
</pre>


== NIC Performance ==

* http://bitsandchaos.wordpress.com/2008/02/23/red-hat-pv-drivers-made-a-huge-difference/
* http://www.redhat.com/docs/manuals/enterprise/RHEL-5-manual/en-US/RHEL510/pdf/Para-Virtualized_Drivers.pdf


== Install PVM ==

* http://wiki.centos.org/HowTos/Xen/InstallingCentOSDomU

<pre>
virt-install -p --name=linux_server3 --location=http://mirror.nsc.liu.se/CentOS/5.5/isos/i386/CentOS-5.5-i386-bin-DVD.iso --bridge=xenbr0 --file=/dev/VolGroup00/linux_server3 --ram=1024

</pre>


<pre>
kernel = "/mnt/linksys_gizur2/Install/Linux/CentOS-5.5/xen/i386/vmlinuz"
ramdisk = "/mnt/linksys_gizur2/Install/Linux/CentOS-5.5/xen/i386/initrd.img"
name = "linux_server3"
memory = "512"
disk = [ 'phy:/dev/VolGroup00/linux_server3,sda1,w', ]
vif = [ 'bridge=xenbr0', ]
vcpus=1
on_reboot = 'destroy'
on_crash = 'destroy'
</pre>

Tried using this as the location for the files:
http://mirrors.kernel.org/centos/5.5/os/i386/images/


Seams to hang...
NFS path using virt-manager: nfs:jonas:pwd@linksys:/gizur2/...
