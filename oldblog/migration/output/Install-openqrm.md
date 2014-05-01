Yet another post

[meta:author]: <> (Jonas Colmsjo)
[meta:title]: <> (Install-openqrm.md)
[meta:date]: <> (2012-01-01)
[meta:nested:key]: <> (Metadata value)

##!!truncate


[[Main_Page]] > [[Gizur server admin]] > [[OpenQRM]]


This guide describes how to install OpenQRM on the same server as xen and kvm is running. Installing on a separate server is simpler since the network bridges doesn't need to be installed.

Will install from source in order to get the latest plugins such as support for windowsetc.

Good resources:
* libvirt networking: http://wiki.libvirt.org/page/Networking
* Check bridging part on iptables and DHCP: http://watzmann.net/blog/2007/04/networking-with-kvm-and-libvirt.html
* More on iptables: http://wiki.centos.org/HowTos/Network/IPTables
* http://www.linuxtopia.org/online_books/centos5/centos_5_xen_virtualization/centos5_sect-Virtualization-Virtualized_network_devices-Laptop_network_configuration.html
* http://cosi.clarkson.edu/docs/installingxen/2009/Xen_Training_Sessions_2009_v2.pdf
* http://www.openqrm-enterprise.com/fileadmin/DATA/Whitepapers/Setup_your_own_openQRM_Cloud_on_Ubuntu_Lucid_Lynx.10052010.pdf
* http://www.techotopia.com/index.php/Creating_a_CentOS_KVM_Networked_Bridge_Interface
* Network bridge: https://www.centos.org/modules/newbb/viewtopic.php?topic_id=23789
* About routes: http://www.centos.org/docs/5/html/5.1/Deployment_Guide/s1-networkscripts-static-routes.html



== 1. Preparations ==

I installed CentOs 5.5 with the options:
* Server GUI
* Virtualization


=== 1.1 Install xen if it isn't installed already ===

You need to install Xen using yum if you didn't install the virtualization option. Take a look at this article if you need guidance: http://www.cyberciti.biz/tips/rhel-centos-xen-virtualization-installation-howto.html.

<pre>
# yum install xen virt-manager kernel-xen
# chkconfig xend on
# reboot
</pre>

=== 1.2 Create network bridges ===

Comment out the part of /etc/xen/xend-config.sxp that creates the default network bridges:

<pre>
cd /etc/xen
cp xend-config.sxp xend-config.sxp.org
vi xend-config.sxp

# (network-script network-bridge)
#
# Your default ethernet device is used as the outgoing interface, by default.
# To use a different one (e.g. eth1) use
#
# (network-script 'network-bridge netdev=eth1')
#
# The bridge is named xenbr0, by default.  To rename the bridge, use
#
# (network-script 'network-bridge bridge=<name>')
#
# It is possible to use the network-bridge script in more complicated
# scenarios, such as having two outgoing interfaces, with two bridges, and
# two fake interfaces per guest domain.  To do things like this, write
# yourself a wrapper script, and call network-bridge from it, as appropriate.
#
# Jonas C. - will setup my own bridges for OpenQRM ind Xen instead
# (network-script network-bridge)

# The script used to control virtual interfaces.  This can be overridden on a
# per-vif basis when creating a domain or a configuring a new vif.  The
# vif-bridge script is designed for use with the network-bridge script, or
# similar configurations.
#
# If you have overridden the bridge name using
# (network-script 'network-bridge bridge=<name>') then you may wish to do the
# same here.  The bridge name can also be set when creating a domain or
# configuring a new vif, but a value specified here would act as a default.
#
# If you are using only one bridge, the vif-bridge script will discover that,
# so there is no need to specify it explicitly.
#
# Jonas C. - will setup my own bridges for OpenQRM ind Xen instead
# (vif-script vif-bridge)

</pre>

Run ifconfig and check that xenbr doesn't exist anymore.

Create new network bridges:

<pre>
[root@hubert etc]# cat /etc/sysconfig/network-scripts/ifcfg-br0
#
# Jonas C. 100815
#
# Create a bridge for OpenQRM and xen
#
DEVICE=br0
TYPE=Bridge
IPADDR=192.168.1.11
GATEWAY=192.168.1.1
NETMASK=255.255.255.0
NETWORK=192.168.1.0
ONBOOT=yes

[root@hubert etc]# cat /etc/sysconfig/network-scripts/ifcfg-br1
#
# Jonas C. 100815
#
# Create an internal bridge for OpenQRM and xen
#
# This bridge does not have a gateway to the external network
#

DEVICE=br1
TYPE=Bridge
IPADDR=192.168.10.1
# GATEWAY=192.168.1.1
NETMASK=255.255.255.0
NETWORK=192.168.10.0
ONBOOT=yes

[root@hubert etc]# cat /etc/sysconfig/network-scripts/ifcfg-br2
#
# Jonas C. 100815
#
# Create an external bridge for OpenQRM and xen
#
# This bridge has a gateway to the external network
#

DEVICE=br2
TYPE=Bridge
IPADDR=192.168.11.1
GATEWAY=192.168.1.1
NETMASK=255.255.255.0
NETWORK=192.168.11.0
ONBOOT=yes


service network restart
</pre>



Check that the network bridges have been created:

<pre>
[root@hubert ~]# brctl show
bridge name     bridge id               STP enabled     interfaces
br0             8000.000000000000       no
br1             8000.000000000000       no
br2             8000.000000000000       no
virbr0          8000.000000000000       yes
</pre>

== 2. Installation ==

<pre>
yum install subversion
yum install mysql-server
svn co https://openqrm.svn.sourceforge.net/svnroot/openqrm openqrm
cd openqrm/trunc/src
make
make (yes, two times)
cd etc
vi openqrm-server.conf
change OPENQRM_SERVER_INSTERFACE=xenbr0
cd ..
make install
make start

</pre>


[[Old OpenQRM Notes]]
