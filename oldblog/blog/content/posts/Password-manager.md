Yet another post

[meta:author]: <> (Jonas Colmsjo)
[meta:title]: <> (Password-manager.md)
[meta:date]: <> (2012-01-01)
[meta:nested:key]: <> (Metadata value)

##!!truncate


[[IT Resources]]



* http://www.keepassx.org/
* http://www.safenoteapp.com/
* http://www.teampass.net/

== TeamPass ==

* http://www.teampass.net/category/installation-and-update/

<pre>
 rpm -Uvh http://download.fedora.redhat.com/pub/epel/5/x86_64/epel-release-5-4.noarch.rpm
yum install php53-mcrypt

wget http://cpassman.googlecode.com/files/cpassman_2.0RC4.zip
unzip cpassman_2.0RC4.zip
mv cpassman /var/www/html/
chown -R apache.apache /var/www/html/cpassman

</pre>
