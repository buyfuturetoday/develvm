---
layout: post
title: First cut at Gentoo
date: 2013-10-27
author: Jonas Colmsjo
tags: ['post']
---

Gentoo Linux


Links: 

 * http://www.gentoo.org/doc/en/gentoo-x86-quickinstall.xml
 * http://wiki.gentoo.org/wiki/GRUB2_Quick_Start

Download the ISO file and mount it in the virtualization platform (I'm using VirtualBox)
Make sure that bridge networking is setup before starting up the VM.


```
# Start SSH server
/etc/init.d/sshd start

# Set password for root user so we can login
passwd

# Check what IP-adress to SSH into
ifconfig

# Login from SSH
ssh root@IP-ADRESS
```

Now it is possible to copy and paste into the terminal.

Partition the disks:

```
fdisk /dev/sda

# Create something like this, remember to save before quiting

   Device Boot      Start         End      Blocks   Id  System
/dev/sda1   *           1          12       96358+  83  Linux
/dev/sda2              13         110      787185   82  Linux swap / Solaris
/dev/sda3             111       72943   585031072+  83  Linux
```

Now create some file systems

```
mkfs.ext2 /dev/sda1
mkfs.ext3 /dev/sda3
mkswap /dev/sda2 && swapon /dev/sda2
```

Mount the file systems:

```
mount /dev/sda3 /mnt/gentoo
mkdir /mnt/gentoo/boot
mount /dev/sda1 /mnt/gentoo/boot
cd /mnt/gentoo
```

Download the software and unpack it:

```
wget ftp://distfiles.gentoo.org/pub/gentoo/releases/x86/current-stage3/stage3-i686-*.tar.bz2
time tar xjpf stage3*
```

Chrooting:

```
cd /
mount -t proc proc /mnt/gentoo/proc
mount --rbind /dev /mnt/gentoo/dev
mount --rbind /sys /mnt/gentoo/sys
cp -L /etc/resolv.conf /mnt/gentoo/etc/ 
chroot /mnt/gentoo /bin/bash
source /etc/profile
```

IMPORTANT - Set root password:

```
passwd
```

Install a portage snapshot

First a fix:

```
mkdir -p /usr/portage/profiles/
echo "gentoo" > /usr/portage/profiles/repo_name
chown -R portage:portage /usr/portage/
```

```
mkdir /usr/portage
emerge-webrsync
```

Select a profile:

```
eselect profile list
...
eselect profile set 1
```

Set hostname:

```
cd /etc
echo "127.0.0.1 mybox.at.myplace mybox localhost" > hosts
sed -i -e 's/hostname.*/hostname="mybox"/' conf.d/hostname
hostname mybox
hostname -f
```

Install a kernel (this takes time):

```
time emerge gentoo-sources
cd /usr/src/linux-3.10.7-gentoo-r1
make menuconfig
#make config
make -j2
make modules_install
cp arch/i386/boot/bzImage /boot/kernel
```

This is optional:

```
emerge genkernel
genkernel --install --no-ramdisk-modules initramfs
```

Setup fstab:

```
cd /etc

nano -w fstab
/dev/sda1   /boot     ext2    noauto,noatime     1 2
/dev/sda3   /         ext3    noatime            0 1
/dev/sda2   none      swap    sw                 0 0

```

Setup networking:

```
cd /etc/init.d
ln -s net.lo net.eth0
cd ../conf.d
# Use DHCP instead
#echo 'config_eth0="192.168.1.10 netmask 255.255.255.0 brd 192.168.1.255"' >> net
#echo 'routes_eth0="default via 192.168.1.1"' >> net
echo 'hostname="gentoo"' > hostname
rc-update add net.eth0 default
echo 'modules="r8169"' >> /etc/conf.d/modules
rc-update add sshd default
```

Install grub bootloar:

```
time emerge grub
grub2-install /dev/sda 

#mv /boot/kernel /boot/kernel-3.10.7

grub2-mkconfig -o /boot/grub/grub.cfg

# Just checking
cat /boot/grub/grub.cfg
```

```
exit
umount -l /mnt/gentoo/dev{/shm,/pts,}
umount -l /mnt/gentoo{/proc,/boot,/sys,}
reboot
(Don't forget to remove the CD)
```

Tips and tricks
----------------

1. If grub won't boot
```
linux /kernel root=/dev/sda3
boot
```







