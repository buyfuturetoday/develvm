[[Main_Page]] > [[Gizur server admin]]


== Stacklet images ==

Install vi:
<pre>
yum install vim-common vim-minimal
</pre>


Install VNC:
* See CentOs guide.


Install gnome:
<pre>
yum groypinstall "GNOME Desktop Environment"
yum groupinstall "X Window System"
</pre>

Tried yum install gnome-desktop first - I don't this install everything needed though.

== Stackbundler ==

<pre>
rpm -q python
rpm -q libxml2-python
rpm -q python-devel
yum install python-devel

rpm -q xulrunner

wget http://stacklet.com/sites/default/files/release/stacklet.beta_release_20100411


chmod +x stacklet.beta_release_20100411
sudo ./stacklet.beta_release_20100411

Self Extracting Installer

./installer
./stacklet.alpha_release_20100411.tar.bz2
Running Installer

The following command can be used to run the application:
/usr/lib/stacklet/stackbundler/stackbundler
</pre>

Files are installed to /usr/lib/stacklet/


Config:
* AMI User: Amazon account numer without dashes (-)
* Private key: /etc/ec2/private-key.pem
* Certificate:/etc/ec2/cert.pem
* EC2 certificate: /etc/ec2/amitools/cert-ec2.pem

* Need to setup sudo: http://edipage.wordpress.com/2008/09/30/quickly-secure-centos-5-by-enabling-sudo-disabling-root-and-limiting-access/

/usr/lib/stacklet/stackbundler/stackbundler &
