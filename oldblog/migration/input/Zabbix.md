[[Main_Page]]

* http://www.zabbix.com/wiki/
* http://www.zabbix.com/forum/showthread.php?t=20728

== sqlite ==

* http://www.zabbix.com/documentation/1.8/manual/installation/installation_from_source
* http://www.zabbix.com/wiki/howto/install/debian/zabbix_proxy_on_debian_sqlite

<pre>
apt-get install build-essential snmp libsnmp9-dev snmpd libcurl3-dev fping curl sqlite libsqlite3-dev ntpdate libiksemel-dev

mkdir /var/lib/sqlite/

sudo adduser zabbix
sudo adduser zabbix adm

su - zabbix
cd ~

wget http://downloads.sourceforge.net/project/zabbix/ZABBIX%20Latest%20Stable/1.8.11/zabbix-1.8.11.tar.gz?r=http%3A%2F%2Fwww.zabbix.com%2Fdownload.php&ts=1333394819&use_mirror=ignum
mv zabbix-1.8.11.tar.gz?r=http:%2F%2Fwww.zabbix.com%2Fdownload.php zabbix-1.8.11.tar.gz

# wget http://optusnet.dl.sourceforge.net/sourceforge/zabbix/zabbix-1.6.tar.gz
# tar zxvpf zabbix-1.6.tar.gz

tar zxvpf zabbix-1.8.11.tar.gz

cd zabbix-1.8.11/

cd create/schema
cat sqlite.sql | sqlite3 /var/lib/sqlite/zabbix.db 
cd ../data 
cat data.sql | sqlite3 /var/lib/sqlite/zabbix.db
cat images_sqlite3.sql | sqlite3 /var/lib/sqlite/zabbix.db


#./configure --prefix=/opt --enable-proxy --enable-agent --with-sqlite3 --with-net-snmp --with-libcurl &amp;&amp; make

./configure --enable-server --with-sqlite3 --with-net-snmp --with-jabber --with-libcurl
make
make install


nano /etc/services
zabbix-agent    10050/tcp  Zabbix Agent
zabbix-agent    10050/udp  Zabbix Agent
zabbix-trapper  10051/tcp  Zabbix Trapper
zabbix-trapper  10051/udp  Zabbix Trapper 

cp misc/conf/zabbix_server.conf  /etc/zabbix/

</pre>


Setup PHP front-end:
# Create DNS pointing to /usr/share/zabbix/
# Create virtual host on Scalr

<pre>
nano nano /etc/zabbix/dbconfig.php 
$DB_TYPE        = "SQLITE3";
$DB_SERVER      = "localhost";
$DB_DATABASE    = "/var/lib/sqlite/zabbix.db";

 sudo apt-get install php5-sqlite
</pre>


<pre>
mkdir /etc/zabbix
chown -R zabbix.zabbix /etc/zabbix/
cp misc/conf/zabbix_proxy.conf /etc/zabbix/
cp misc/conf/zabbix_agentd.conf /etc/zabbix/


nano /etc/zabbix/zabbix_agentd.conf
Server=127.0.0.1

nano /etc/zabbix/zabbix_proxy.conf
# IP address (or hostname) of ZABBIX servers.
Server=MASTER_ZABBIX_SERVER_IP
# Database name
DBName=/home/zabbix/zabbix.db
# Unique hostname.
Hostname=MACHINE_HOST_NAME


cp misc/init.d/debian/zabbix-server /etc/init.d/zabbix-proxy
cp misc/init.d/debian/zabbix-agent /etc/init.d

nano /etc/init.d/zabbix-proxy
NAME=zabbix_proxy
PATH=/bin:/usr/bin:/sbin:/usr/sbin:/home/zabbix/bin
DAEMON=/usr/sbin/${NAME}
DESC="Zabbix proxy daemon"
PID=/var/tmp/$NAME.pid

nano /etc/init.d/zabbix-agent
DAEMON=/usr/sbin/${NAME}  (old versions use /usr/bin/${NAME})

chmod 755 /etc/init.d/zabbix-proxy
update-rc.d zabbix-proxy defaults
chmod 755 /etc/init.d/zabbix-agent
update-rc.d zabbix-agent defaults

/etc/init.d/zabbix-proxy start
/etc/init.d/zabbix-agent start

ps -aux | grep zabbix
</pre>


== MySQL ==

Server:
<pre>
root@ec2-46-137-54-126:SBX:~# apt-get install zabbix-server-mysql
Reading package lists... Done
Building dependency tree       
Reading state information... Done
zabbix-server-mysql is already the newest version.
The following packages were automatically installed and are no longer required:
  lvm2 libdevmapper-event1.02.1 watershed mdadm libreadline5 ri1.8
Use 'apt-get autoremove' to remove them.
0 upgraded, 0 newly installed, 0 to remove and 95 not upgraded.
1 not fully installed or removed.
After this operation, 0B of additional disk space will be used.
Setting up zabbix-server-mysql (1:1.8.1-1ubuntu1) ...
dbconfig-common: writing config to /etc/dbconfig-common/zabbix-server-mysql.conf
Replacing config file /etc/dbconfig-common/zabbix-server-mysql.conf with new version
Replacing config file /etc/zabbix/zabbix_server.conf with new version
chown: invalid user: `zabbix'
 * Starting Zabbix server zabbix_server                                                        [ OK ] 

</pre>


Agent:
<pre>
sudo apt-get install zabbix-agent

sudo apt-get install zabbix-frontend-php

Reading package lists... Done
Building dependency tree       
Reading state information... Done
The following packages were automatically installed and are no longer required:
  lvm2 libdevmapper-event1.02.1 watershed mdadm libreadline5 ri1.8
Use 'apt-get autoremove' to remove them.
The following extra packages will be installed:
  php5
The following NEW packages will be installed
  php5 zabbix-frontend-php
0 upgraded, 2 newly installed, 0 to remove and 95 not upgraded.
Need to get 1,427kB of archives.
After this operation, 6,087kB of additional disk space will be used.
Do you want to continue [Y/n]? 
Get: 1 http://eu-west-1.ec2.archive.ubuntu.com/ubuntu/ lucid-updates/main php5 5.3.2-1ubuntu4.14 [1,114B]
Get: 2 http://eu-west-1.ec2.archive.ubuntu.com/ubuntu/ lucid/universe zabbix-frontend-php 1:1.8.1-1ubuntu1 [1,426kB]
Fetched 1,427kB in 0s (10.1MB/s)        
Preconfiguring packages ...
Selecting previously deselected package php5.
(Reading database ... 76826 files and directories currently installed.)
Unpacking php5 (from .../php5_5.3.2-1ubuntu4.14_all.deb) ...
Selecting previously deselected package zabbix-frontend-php.
Unpacking zabbix-frontend-php (from .../zabbix-frontend-php_1%3a1.8.1-1ubuntu1_all.deb) ...
Setting up php5 (5.3.2-1ubuntu4.14) ...
Setting up zabbix-frontend-php (1:1.8.1-1ubuntu1) ...
dbconfig-common: writing config to /etc/dbconfig-common/zabbix-frontend-php.conf

Creating config file /etc/dbconfig-common/zabbix-frontend-php.conf with new version

Creating config file /etc/zabbix/dbconfig.php with new version
dbconfig-common: flushing administrative password



# Browse to http://yourhostname/zabbix
# Login as admin with a password of zabbix

</pre>
