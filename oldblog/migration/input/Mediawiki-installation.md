[[Wiki]]

h1. Mediawiki installation

* http://www.mediawiki.org/wiki/Manual:Installing_MediaWiki

<pre>

wget http://download.wikimedia.org/mediawiki/1.18/mediawiki-1.18.2.tar.gz

</pre>



h1. Export and import wiki

* http://www.mediawiki.org/wiki/Manual:Importing_XML_dumps
* http://meta.wikimedia.org/wiki/Help:Export

<pre>
# Export
/usr/bin/php /var/www/html/mediawiki/maintenance/dumpBackup.php  --full > /backups/mediawik.dmp

#import
cd /var/www/html/mediawiki/maintenance
php importDump.php ~/tmp/mediawiki-120403.dmp

</pre>