[[Wiki]]

h1. Gizur Scalr installation

* http://wiki.scalr.net/pages/viewpage.action?pageId=327743

On server with scalr archive:
<pre>
scp -i ~/keys/scalr-server.pem scalr-3.0.r6748.tar.gz ubuntu@ec2-79-125-77-38.eu-west-1.compute.amazonaws.com:/tmp 
</pre>

On Scalr-server:
<pre>
sudo apt-get update
sudo apt-get install apache2-mpm-prefork php5 php5-mysql php5-curl php5-mcrypt php5-snmp php-pear rrdtool librrd-dev libcurl4-openssl-dev mysql-server snmp libssh2-php apparmor-utils

cd /tmp
tar xvfz scalr-3.0.r6748.tar.gz
sudo mv scalr-3.0.r6748/app /var/www
sudo chown root.www-data /var/www/app -R
sudo chmod g+w /var/www/app/etc/.cryptokey
sudo chmod g+w /var/www/app/cache -R

# Skip this step, does not seam necessary for 3.0...
# sudo nano /var/www/app/src/Scalr/Net/Dns/Bind/RemoteBind.php
ctrl+_ 36
//                        if (count($this->zonesConfig) == 0)
//                                throw new Exception("Zones config is empty");

#
# MySQL
#

mysql -uroot -p -e 'create database scalr; grant all on scalr.* to scalr@localhost identified by "<scalrpassword>";flush privileges;'
  
# cat /tmp/scalr-3.0.r6748/sql/structure.sql | mysql -uscalr -p scalr
# cat /tmp/scalr-3.0.r6748/sql/data.sql | mysql -uscalr -p scalr
cat /tmp/scalr-3.0.r6748/sql/scalr.sql | mysql -uscalr -pXXX scalr 


sudo nano /var/www/app/etc/config.ini

driver=mysqli
host = "localhost"
name = "scalr"
user = "scalr"
pass = "<scalrpassword>"

#
# Apache
#

sudo rm /etc/apache2/sites-enabled/000-default

sudo nano /etc/apache2/sites-available/scalr
<VirtualHost *:80>
        ServerAdmin webmaster@localhost
        ServerName scalr.local
        DocumentRoot /var/www/app/www
        <Directory /var/www/app/www>
                Options Indexes FollowSymLinks MultiViews
                AllowOverride All
        </Directory>
</VirtualHost>
  
sudo a2ensite scalr
sudo service apache2 reload

sudo pecl install rrd

sudo /etc/php5/apache2/conf.d/rrd.ini
extension=rrd.so

sudo pecl install pecl_http

sudo nano /etc/php5/apache2/conf.d/http.ini
extension=http.so 

sudo a2enmod rewrite
sudo service apache2 restart


# sudo cat <<EOF> /etc/cron.d/scalr

crontab -e
*/2 * * * *  root /usr/bin/php -q  /var/www/app/cron-ng/cron.php --Poller
* * * * *  root /usr/bin/php -q /var/www/app/cron/cron.php --Scheduler
*/10 * * * *  root /usr/bin/php -q  /var/www/app/cron/cron.php --MySQLMaintenance
* * * * *  root /usr/bin/php -q  /var/www/app/cron/cron.php --DNSManagerPoll
17 5 * * * root /usr/bin/php -q  /var/www/app/cron/cron.php --RotateLogs
*/2 * * * *  root /usr/bin/php -q  /var/www/app/cron/cron.php --EBSManager
*/20 * * * *  root /usr/bin/php -q  /var/www/app/cron/cron.php --RolesQueue
*/5 * * * *  root /usr/bin/php -q  /var/www/app/cron-ng/cron.php --DbMsrMaintenance
*/2 * * * *  root /usr/bin/php -q  /var/www/app/cron-ng/cron.php --Scaling
*/5 * * * *  root /usr/bin/php -q  /var/www/app/cron/cron.php --DBQueueEvent
*/2 * * * *  root /usr/bin/php -q  /var/www/app/cron/cron.php --SzrMessaging
*/4 * * * *  root /usr/bin/php -q  /var/www/app/cron/cron.php --RDSMaintenance
*/2 * * * *  root /usr/bin/php -q  /var/www/app/cron/cron.php --BundleTasksManager
* * * * *  root /usr/bin/php -q  /var/www/app/cron-ng/cron.php --ScalarizrMessaging
* * * * *  root /usr/bin/php -q  /var/www/app/cron-ng/cron.php --MessagingQueue
*/2 * * * *  root /usr/bin/php -q  /var/www/app/cron-ng/cron.php --DeployManager

crontab -l

#
# Bind
#

sudo apt-get install bind9
sudo chmod g+w /etc/bind/named.conf

sudo nano /etc/bind/named.conf
include "/var/named/etc/namedb/client_zones/zones.include";

sudo mkdir -p /var/named/etc/namedb/client_zones
sudo chown root.bind /var/named/etc/namedb/client_zones
sudo chmod 2775 /var/named/etc/namedb/client_zones
  
# New domains will go to this file
sudo nano /var/named/etc/namedb/client_zones/zones.include
# insert space and save

sudo chown root.bind /var/named/etc/namedb/client_zones/zones.include
sudo chmod g+w /var/named/etc/namedb/client_zones/zones.include
  
# Put Bind in apparmor complain mode. This will allow Bind to include **zones.include** as mentioned above. May need to setup a more secure configuration
sudo aa-complain /usr/sbin/named
  
# Restart
sudo service bind9 restart

</pre>




Login - should fix so that the root is used instead:
* http://ec2-79-125-77-38.eu-west-1.compute.amazonaws.com/app/www/
** Email: admin
** Password: admin

* Change Admin password (upper right corner of the screen)

* Change Core settings

* Create a scalr user. Then login as that user to create your first server farm

* Create your first server farm