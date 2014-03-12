[[Main_Page]]


== Admin GUI ==


websvn

<pre>
wget http://websvn.tigris.org/files/documents/1380/49056/websvn-2.3.3.tar.gz
gunzip
tar -xvf
mv websvn-2.3.3 /var/www/html/websvn
chown -R apache.apache /var/www/html/websvn

</pre>


usvn

Fick inte att fungera.

<pre>
wget --no-check-certificate http://www.usvn.info/download/get/1.0.3+Boo/tgz.dl
gunzip usvn-usvn-1.0.3-0-g60b55f3.tar.gz 
tar -xvf usvn-usvn-1.0.3-0-g60b55f3.tar 
mv usvn-usvn-60b55f3 /var/www/html/usvn
chown -R apache.apache /var/www/html/usvn/
</pre>

Submin:
<pre>
wget http://supermind.nl/submin/current/submin-2.0.tar.gz
gunzip submin-2.0.tar.gz 
tar -xvf submin-2.0.tar

</pre>


== Move a subversion repository ==

* http://www.digitalmediaminute.com/article/2251/how-to-move-a-subversion-repository
* http://www.tonyspencer.com/2007/03/02/setup-a-subversion-server-in-4-minutes/
* http://wiki.centos.org/HowTos/Subversion

Old server:
<pre>
"c:\local\VisualSVN Server\bin\svnadmin" dump Inox > Inox.dmp
"c:\local\VisualSVN Server\bin\svnadmin" dump DigitalLocker > DigitalLocker.dmp
</pre>


New server:
<pre>
service httpd stop
yum install mod_dav_svn subversion
serive httpd start
cd /etc/httpd/conf.d/
vi subversion.conf
Remove  comments for Location...and change /repos to /svn and change path for passwd file to /etc/svn-auth-conf 

mkdir /var/www/svn
cd /var/www/svn

svnadmin create Inox
svnadmin load Inox < ~/dwnl/Inox.dmp
chown -R apache.apache Inox

svnadmin create DigitalLocker
svnadmin load DigitalLocker< ~/dwnl/DigitalLocker.dmp
chown -R apache.apache DigitalLocker

svnadmin create TradeServer
svnadmin load TradeServer< ~/dwnl/TradeServer.dmp
chown -R apache.apache TradeServer


htpasswd -cm /etc/svn-auth-conf jonas

service httpd restart
</pre>

== Git ==

* http://www.kernel.org/pub/software/scm/git/docs/gittutorial.html
* http://cworth.org/hgbook-git/tour/

<pre>
git config --global user.name "Jonas Colmsjo"
git config --global user.email "jonas.colmsjo@gizur.com"

git clone ...                                               # create local copy of remote repository
git pull                                                    # get changes in remote repository
git fetch                                                   # show changes in remote repository
git push                                                    # publish changes to remote repository



</pre>
