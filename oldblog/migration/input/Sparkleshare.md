

Gick inte att installera pga. gammal intltool i centos

<pre>
wget --no-check-certificate https://github.com/downloads/hbons/SparkleShare/sparkleshare-0.2.5.tar.gz
gunzip sparkleshare-0.2.5.tar.gz 
tar -xf sparkleshare-0.2.5.tar
cd sparkleshare-0.2.5
yum install intltool
./configure

checking for intltool >= 0.40.6... 0.35.0 found
configure: error: Your intltool is too old.  You need intltool 0.40.6 or later.
</pre>
