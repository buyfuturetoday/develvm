Yet another post

[meta:author]: <> (Jonas Colmsjo)
[meta:title]: <> (Eucalyptus.md)
[meta:date]: <> (2012-01-01)
[meta:nested:key]: <> (Metadata value)

##!!truncate


[[Main_Page]] > [[Gizur server admin]]

Articles:
* http://open.eucalyptus.com/wiki/EucalyptusInstallationCentos_v1.6

== Installation ==


* export VERSION=1.6.2
* yum install java-1.6.0-openjdk ant ant-nodeps dhcp bridge-utils httpd
* vi /etc/yum.repos.d/euca.repo
<pre>
[euca]
name=Eucalyptus
baseurl=http://www.eucalyptussoftware.com/downloads/repo/eucalyptus/1.6.2/yum/centos/
enabled=1
</pre>
* Frontend
** yum install eucalyptus-cloud.x86_64 eucalyptus-cc.x86_64 eucalyptus-walrus.x86_64 eucalyptus-sc.x86_64 --nogpgcheck
* Node
** yum install eucalyptus-nc.x86_64 --nogpgcheck

=== Post installtion ===

* vi /etc/libvirt/libvirt.conf
** unix_sock_group = "libvirt"
* reboot
* su eucalyptus -c "virsh list"
* Frontend
** /etc/init.d/eucalyptus-cloud start
** /etc/init.d/eucalyptus-cc start
* Node
** /etc/init.d/eucalyptus-nc start


=== Permission problems ===

home directory

<pre>
mkdir /home/eucalyptus
chown eucalyptus /home/eucalyptus
</pre>


Passwd file

<pre>
/etc/passwd
eucalyptus:x:501:501::/home/eucalyptus:/bin/bash

eucalyptus:x:501:0::/home/eucalyptus:/bin/bash
</pre>


NO DIFFERENCE
