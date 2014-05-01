Yet another post

[meta:author]: <> (Jonas Colmsjo)
[meta:title]: <> (Execution-Architecture.md)
[meta:date]: <> (2012-01-01)
[meta:nested:key]: <> (Metadata value)

##!!truncate


[[wiki]] > [[Technical Architecture]]


# Overview

The Execution Architecture consists of the following components:
 * Apache running PHP
 * MySQL
 * RabbitMQ
 * GlusterFS
 * LDAP catalogue



# Scalr Roles

## Common setup for all custom roles

### Generic

Open port 10000 in the role in Scalr.

<pre>
dpkg-reconfigure tzdata

sudo vi /etc/environment

# 2012-XX-XX, Jonas Colmsjö, Used in misc jobs
GOM_ROLE="NAME_OF_NEW_ROLE" 

sudo vi .profile
source /etc/environment
PS1='${debian_chroot:+($debian_chroot)}\u@\h:$GOM_ROLE:\w\$ '


mkdir svn && cd svn
apt-get install subversion

# The user gizur-om should be used, the system administrator has the password
sudo svn co http://svn.gizurcloud.com/svn/gom-prod

cd

mkdir scripts && cd scripts
cp ../svn/gom-prod/root-dir/root/scripts/check_logfiles.pl .
cp ../svn/gom-prod/root-dir/root/scripts/scm-main-prod.sh .
cp ../svn/gom-prod/root-dir/root/scripts/rsync-main.sh .
chmod +x *.sh 
sudo apt-get install libparse-syslog-perl

crontab -e
# m h  dom mon dow   command
@hourly /root/scripts/scm-main-prod.sh
@daily /root/scripts/check_logfiles.pl
@daily /root/scripts/app-backups.sh

0,5,10,15,20,25,30,35,40,45,50,55 * * * * /root/scripts/rsync-main.sh

crontab -l

# Install mail server and mail client
# Enter gizurcloud.com. as the domain, NOT gizur.com!!!!!
sudo apt-get install postfix mutt

# Test that mutt works
mutt

sudo nano .forward
admin@gizur.com

sudo apt-get install zabbix-agent
# sudo vi /etc/zabbix/zabbix_agent.conf
sudo vi /etc/zabbix/zabbix_agentd.conf 

Server=int-gc1-svn-ldap-opman.zabbix.gizurcloud.com
# Hostname=<ROLE>
Hostname="$GOM_ROLE:$HOSTNAME"

service zabbix-agent restart

# Add server in zabbix.gizurcloud.com ->Configuration -> Hosts
# Make sure that the name is the same as the Hostname given above
# Also add a template -> Linked templates -> Linux
# Restart the agent again
service zabbix-agent restart
</pre>


Follow this guide for security setup: https://redmine.gizurcloud.com/projects/sysadm/wiki/Hardening_ubuntu

On Scalr Apache application server role:
<pre>
sudo vi /etc/rc.local

#
# Jonas Colmsjö, 2012-03-20, Get rid of warning from postfix regarding NIS domain name not set
#
ypdomainname gizurcloud.com.
</pre>


### webmin

* Download: http://www.ubuntu.com/server/get-ubuntu/download
* Setup guide: https://help.ubuntu.com/community/UEC/CDInstall


* http://www.webmin.com/deb.html
* https://help.ubuntu.com/community/AddUsersHowto

<pre>
cd
mkdir dwnl && cd dwnl
wget http://downloads.sourceforge.net/project/webadmin/webmin/1.570/webmin_1.570_all.deb?r=http%3A%2F%2Fwebmin.com%2F&ts=1326657701&use_mirror=ignum
mv webmin_1.570_all.deb?r=http:%2F%2Fwebmin.com%2F webmin_1.570_all.deb
apt-get install perl libnet-ssleay-perl openssl libauthen-pam-perl libpam-runtime libio-pty-perl apt-show-versions python
dpkg --install webmin_1.570_all.deb
apt-get -f install

# Add webmin user, the system administrator will provide you with the password to use
sudo adduser webmin
cat /etc/sudoers
vi /etc/sudoers.d/webmin 
# root and users in group wheel can run anything on any machine as any user
webmin		ALL = (ALL) ALL

chmod 0440 /etc/sudoers.d/webmin


sudo visudo

# Add this, do not remove the #
#includedir /etc/sudoers.d

service webmin start
service webmin status
</pre>

Setup:
* Login at https://<IP>:10000
* Select refresh modules
* Select Others -> System and Server status
* Click on Scheduled monitoring and add the e-mail adress admin@gizur.com
* Add a monitor for free disk space - should not be below 30%


There seams to be a problem with starting webmin at boot on ubuntu 10.04. It works on ubuntu 11.10 though.


### s3cmd


<pre>
sudo apt-get install s3cmd
sudo s3cmd --configure

</pre>


## Frontend Scalr roles

Frontend roles can acccess the MySQL backend roles as well as the Gluster cluster.

Setup Gluster client using NFS:
* http://download.gluster.com/pub/gluster/glusterfs/3.2/Documentation/AG/html/sect-Administration_Guide-GlusterFS_Client-NFS.html

<pre>
mkdir -p /mnt/storage/vol1 
sudo apt-get install nfs-common

sudo vi /etc/fstab
int-custom-glusterfs1.fs1.gizurcloud.com:/vol1 /mnt/storage/vol1 nfs defaults,_netdev,mountproto=tcp,intr,sync 0 0

mount /mnt/storage/vol1 
</pre>


Use rsync to copy data from the local drive to the gluster server. See above.



### Apache & PHP

Standard Scalr role

PHP/MySQL [[Execution Architecture Design]]
PHP/MySQL [[Execution Architecture Installation]]


### Java frontend role

Use for Enterprise Service Bus, ESB (UltraESB).

Use for Pentaho for Reporting and ETL (includes Kettle ETL tool):
[[Pentaho installation routine]]

[[UltraESB installation routine]]

[[NFS client installation routine]] - NOT USED, See Gluster/NFS client above


### Subversion role

Use for:
* Subversion (running Apache and mount Gluster filesystem)
* LDAP server
* ftp server


# Backend Scalr roles

## MySQL

Standard Scalr role

PHP/MySQL [[Execution Architecture Design]]
PHP/MySQL [[Execution Architecture Installation]]


## GlusterFS


[[Backend installation routines]] - NFS server isn't used

[[GlusterFS installation routine]]


## RabbitMQ

Standard Scalr role is used.

[[Rabbitmq server installation routine]] - NOT USED

[[RabbitMQ configuration routine]]
 

# Integration

An Enterprise Service Bus will be used for integration. Integration scenarios includes:
* Between Gizur PHP/MySQL applications 
* Between Gizur applications and external applications

A large number of communications techniques are likely to be used. Initially there is a need for send files using ftp. Use of web services is likely in the future.

A generic integration framework will be established in order to ensure that integration is performed in a consistent way. Real time integration using web services is preferred but often not possible.
Integration using batch processes sending files will likely often be the case. EDI communication using AS2 will likely also be required in the future.



# Client portal architecture

vTiger is the first application installed in the GizurCloud. A number of applications for different purposes will be installed:
* OrangeHRM for HR
* Collabtive for project management support
* Pentaho for reporting

More applications are likely added as time goes.

All applications will both be used by the backoffice and by the clients users.

It is necessary to establish a common framework for the portals users. This framework should manage:
* Login, preferable Single Sign On. LDAP support with one sigle password is a minimum
* Start page with links to the different applications. Perhaps a menu bar that is always accessible

Joomla is a established Content Management System that will be considered for this portal framework.
