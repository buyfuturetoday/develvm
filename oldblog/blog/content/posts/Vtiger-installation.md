Yet another post

[meta:author]: <> (Jonas Colmsjo)
[meta:title]: <> (Vtiger-installation.md)
[meta:date]: <> (2012-01-01)
[meta:nested:key]: <> (Metadata value)

##!!truncate


[[vTigerCRM]]


== Upgrade ==

* http://wiki.vtiger.com/index.php/Vtiger530:Migration

<pre>
wget ...
unzip ...
chown -R apache.apache vtigercrm
mv /var/www/html/vtigercrm/ /var/www/html/vtigercrm.old
mv vtigercrm /var/www/html/ 

# Create new database in MySQL
# Login and access installation, choose migrate, Fix table engine, Do database copy of contents
</pre>


ALternative:
<pre>
wget http://downloads.sourceforge.net/project/vtigercrm/vtiger%20CRM%205.3.0/Add-ons/vtigercrm-521-530-patch.zip?r=http%3A%2F%2Fwww.vtiger.com%2Fvtiger-crm%2Fdownload&ts=1323200950&use_mirror=kent
cp vtigercrm-521-530-patch.zip /var/www/html/vtigercrm
unzip vtigercrm-521-530-patch.zip

</pre>


== Setup customer portal ==

* http://wiki.vtiger.com/index.php/Vtiger530:Customer_Portal_User_Manual

<pre>
wget http://sourceforge.net/projects/vtigercrm/files/vtiger%20CRM%205.3.0/Add-ons/vtigercrm-customerportal-5.3.0.zip/download
mkdir portal
mv vtigercrm-customerportal-5.3.0.zip portal
unzip vtigercrm-customerportal-5.3.0.zip 
cd ..
chown -R apache.apache portal
mv portal /var/www/html/vtigercrm

cd /var/www/html/vtigercrm/portal
vi PortalConfig.php


mkdir tmp
chown apache.apache tmp
chmod ug+w tmp


</pre>


== Upgrade from 5.2.0 to 5.2.1 ==

Not tested yet.

* http://www.vtiger.com/blogs/2010/11/16/vtiger-crm-521-is-released/


== Configure mail ==

* Setup gmail - http://swik.net/Vtiger-CRM/Vtiger+Blogs/GMail+integration+with+vtiger+CRM/b32wx
* http://wiki.vtiger.com/index.php/vtiger510:Config_Files#config.cron.php

<pre>
cd /var/www/html/vtigercrm
grep application_unique_key config.inc.php
cd cron
vi config.cron.php
'app_key' => ...

also setup cron to run  MailScannerCron.sh
</pre>


Problems with segmentation fault:

* http://www.linuxcompatible.org/news/story/php_5217_for_centos_5.html
* http://forums.vtiger.com/viewtopic.php?f=104&t=40906


<pre>
yum erase php php-common
yum install php53
yum install php53-xmlrpc php53-mbstring php53-imap php53-common php53-gd php53-mysql php53-cli php53-ldap php53-pdo
</pre>


Problems with mails being sent twice:

* Happens when the receiving mail is the same as some in the contacts
** Fixed in Relese 5.2.1  (I havee 5.2.0) - http://wiki.vtiger.com/index.php/Vtiger521:Release_Notes

* http://forums.vtiger.com/viewtopic.php?t=11428


== Installation - ubuntu ==

FUNGERAR EJ

<pre>
wget http://sourceforge.net/projects/vtigercrm/files/vtiger%20CRM%205.2.0/Core%20Product/vtigercrm-5.2.0.tar.gz/download

sudo apt-get install Xlibs xlibs-dev libgd2 libfreetype6 libfreetype6-dev zlib-1.2.1 Libpng-1.2.5 jpeg-6b Unzip openssl libssl-dev libkrb5-de imap-2004


sudo apt-get install apache2 php5 mysql-server libapache2-mod-php5
 
</pre>

== Installation - centos ==

* http://www.vtiger.com/index.php?option=com_content&task=view&id=30&Itemid=57
* http://wiki.vtiger.com/index.php/Vtiger521:Linux_Installation
* http://www.howtoforge.com/vtiger-installation-on-centos-5.x

<pre>
wget http://sourceforge.net/projects/vtigercrm/files/vtiger%20CRM%205.2.0/Core%20Product/vtigercrm-5.2.0.tar.gz/download
or
wget http://downloads.sourceforge.net/project/vtigercrm/vtiger%20CRM%205.2.0/Core%20Product/vtigercrm-5.2.0.tar.gz?r=http%3A%2F%2Fwiki.vtiger.com%2Findex.php%2FVtiger521%3ALinux_Installation&ts=1298907744&use_mirror=kent

yum install gd mysql-server libpng libpng-devel libjpeg libjpeg-devel freetype freetype-devel xfree Xfree86-dev openssl openssl-devel krb5 krb5-devel make zlib krb5-devel binutils automake gcc flex  autoconf bison libxml2-devel gcc-c++ perl-XML-LibXML

yum insatall php-imap php-gd

mv vtigercrm /var/www/html/
cd /var/www/html/
chown -R apache.apache vtigercrm
chmod -R a+rw /var/www/html/vtigercrm

service mysqld start
http://localhost/vtigercrm/install.php
</pre>

Script for creating instances:
<pre>
#!/bin/bash


EXPECTED_ARGS=1
E_BADARGS=65

if [ $# -ne $EXPECTED_ARGS ]
then
  echo "Usage: `basename $0` {instance number}"
  exit $E_BADARGS
fi

rm -rf /var/www/html/vtigercrm$1
tar -xvf vtigercrm-5.2.0.tar
mv vtigercrm vtigercrm$1
mv vtigercrm$1 /var/www/html/
cd /var/www/html/
chown -R apache.apache vtigercrm$1
chmod -R a+rw /var/www/html/vtigercrm$1
</pre>


<pre>
vi /etc/php.ini


display_errors
...
max_execution_time
...
allow_call_time_pass_reference
...
log_errors
...
short_open_tag



</pre>

* FEL: Sorry! Attempt to access restricted file.
** http://forums.vtiger.com/viewtopic.php?t=22045

<pre>
vtigercrm-5.2.0 is all set to go!
Getting Started: 
You can start using your CRM now.

    * Your login page: http://localhost/vtigercrm.
    * Please log in using the "admin" user name and the password you entered in step 3/4.
    * To add more users, please visit the Settings page..


Recommended Steps:
It is important that you complete the following steps

    * Do not forget to set the outgoing email server (setup accessible from Settings->Outgoing Server)
    * Setup 'Backup Server' so that your CRM data and files are archived to another location on a daily basis
    * Rename htaccess.txt file to .htaccess to control public file access. More Information


      This .htaccess file will work if "AllowOverride All" is set on Apache server configuration file (httpd.conf) for the DocumentRoot or for the current vtiger path.
      If this AllowOverride is set as None ie., "AllowOverride None" then .htaccess file will not take into effect.
      If AllowOverride is None then add the following configuration in the apache server configuration file (httpd.conf)
      <Directory "C:/Program Files/vtigercrm/apache/htdocs/vtigerCRM">
      Options -Indexes
      </Directory>
      So that without .htaccess file we can restrict the directory listing


Documentation And Tutorial

    * Documentation including User Manual can be found at http://wiki.vtiger.com
    * Video Tutorials are available at http://youtube.com/vtigercrm


We aim to be - simply the best. We welcome your feedback.

    * Talk to us at forums
    * Discuss with us at blogs
    * Drop us an email to feedback@vtiger.com

    * Your install.php file has been renamed to 8083192304d6d3317c4a218.10498832install.php.txt.
    * Your install folder too has been renamed to 8083192304d6d3317c4a218.10498832install.

</pre>
