Yet another post

[meta:author]: <> (Jonas Colmsjo)
[meta:title]: <> (Cloud.com.md)
[meta:date]: <> (2012-01-01)
[meta:nested:key]: <> (Metadata value)

##!!truncate


[[Main_Page]] > [[Gizur server admin]]

== Installation ==

=== Install KVM ===

* http://www.cyberciti.biz/faq/centos-rhel-linux-kvm-virtulization-tutorial/
* http://wiki.centos.org/HowTos/KVM

The xen kernel cannot be used together with kvm. Make sure you boot a non-xen kernel (/boot/grub.conf etc).

KVM is included in CentOS 5.5 64 bit.

It's not possbile to run the xen kernel and kvm at the same time. Xen can rum HVM (hardware assisted) guest though.

<pre>
yum install kvm kmod-kvm
yum install qemu

yum groupinfo KVM

egrep '(vmx|svm)' --color=always /proc/cpuinfo

modprobe kvm_intel
modprobe kvm_amd

lsmod | grep kvm

cat /proc/cpuinfo | grep vm     # will be supressed if xen is running
 
yum install qemu                # make sure that the qemu tools are installed and latest version
</pre>

=== Install cloud.com ===

Single server
1. Install agenet
2. Install server

Agent
<pre>
cd /etc/yum.repos.d/
wget http://download.cloud.com/foss/centos/cloud.repo

setenforce permissive                      # disable SELinux

yum clean all
yum install cloud-agent

cloud-setup-agent

iptables -I INPUT -i cloud0 -j ACCEPT
iptables -I FORWARD -i cloud0 -o cloud0 -j ACCEPT
iptables -I FORWARD -i cloudbr0 -o cloudbr0 -j ACCEPT
iptables –I INPUT -m tcp -p tcp --dport 5900:6100 –j ACCEPT

Then save your new iptables rules:
service iptables save

</pre>


Management Server:
<pre>
yum install mysql-server

# service mysqld start
# chkconfig mysqld on

cd /etc/yum.repos.d/
wget http://download.cloud.com/foss/centos/cloud.repo

cloud-setup-databases cloud kvm --deploy-as=root                 # if there is no password set for mysql
cloud-setup-databases cloud:<dbpassword> kvm --deploy-as=root:<rootpassword>     # if there is a password for mysql

cloud-setup-management

http://management-server-ip-address:8080/client

Setup zone, dhcp, storage etc. See install guide...
</pre>


=== Troubleshooting ===


== Configuration ==
