[[Wiki]]


h1. ProcessMaker


Create DNS and virtual host in Scalr:
* DocumentRoot /var/www/processmaker/workflow/public_html

Start from apache role:
<pre>
sudo apt-get install mysql-server php5-mcrypt php-soap php5-xmlrpc php5-ldap php5-gd php5-curl

apache2ctl -M | grep rewrite

# enable mod_rewrite
a2enmod rewrite

# enable mod_expires
a2enmod expires

a2enmod deflate
a2enmod vhost_alias

service apache2 restart


wget http://downloads.sourceforge.net/project/processmaker/ProcessMaker/2.0/2.0.37/processmaker-2.0.37.tar.gz?r=&ts=1330417840&use_mirror=garr
mv processmaker-2.0.37.tar.gz?r= processmaker-2.0.37.tar.gz
gunzip processmaker-2.0.37.tar.gz 
tar -xf processmaker-2.0.37.tar

mysql> grant all on *.* to 'processmaker'@'localhost' identified by 'PASSWORD' with grant option;


mv processmaker/* /opt/processmaker/
cd /opt/processmaker/
chown -R www-data:www-data *

chmod 770 /opt/processmaker/shared
cd /opt/processmaker/workflow/engine/
chmod 770 config content/languages plugins xmlform js/labels

cp /opt/processmaker/etc/pmos.conf /etc/apache2/sites-available/
a2ensite pmos.conf
service apahce2 restart


</pre>



Apache config:
<pre>
 DirectoryIndex index.html index.php
    <Directory  "{$document_root}">
       AddDefaultCharset UTF-8
       AllowOverRide none
       Options FollowSymlinks
       Order allow,deny
       Allow from all
       RewriteEngine on
       RewriteRule ^.*/(.*)$ sysGeneric.php [NC,L]
       ExpiresActive On
       ExpiresDefault "access plus 1 day"
       ExpiresByType image/gif "access plus 1 day"
       ExpiresByType image/png "access plus 1 day"
       ExpiresByType image/jpg "access plus 1 day"
       ExpiresByType text/css "access plus 1 day"
       ExpiresByType text/javascript "access plus 1 day"
       AddOutputFilterByType DEFLATE text/html
    </Directory>
</pre>