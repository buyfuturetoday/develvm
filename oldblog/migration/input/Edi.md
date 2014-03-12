[[Main_Page]]


= Links =

* Messages - http://www.gs1.org/ecom/xml/overview
* Tech guide - http://www.gs1.org/docs/gsmp/EDIINT_AS1_AS2_Transport_Comm_Guide_i1.pdf
* User gudie - http://www.gs1.eu/downloader.php?kfdskf=43&s8skfld2568slk&&i=8&l=8&ad=234_a
* MIG - http://www.edidev.com/articles/createIG/HowToCreateIG.html

* http://www.easylink.com/easylink-services/edi/
* http://www.psol.be/old/1/xmledi/
* http://www.edidev.com/


== Exempel ==

* http://www.skf.com/files/100400.pdf


= AS2Secure =

[[File:Api.pdf]]


= Lösningar =

Open Source / Lågbudgetlösningar

ediint / as2:
# as2secure.com
# mendelson, 2500 eur, tyskt
# openas2, verkar vinte särskillt vaktiv
# freeas,2 5000 usd, amerikanskt
# orion path finder - går inte att ladda ner på nätet


De stora leverantörerna
# http://www.easylink.com/easylink-services/edi/


== Medelson ==

Installationen kräver tillgång till GUI. Har inte lyckats få igång denna.

* http://www.mad-computer-scientist.com/blog/2010/02/08/setting-up-mendelson-as2-howto/

=== Installation ===

* http://www.centos.org/modules/smartfaq/faq.php?faqid=50
* http://wiki.centos.org/HowTos/VNC-Server
* http://www.ndchost.com/wiki/server-administration/centos5-vnc-x11

<pre>
wget http://javadl.sun.com/webapps/download/AutoDL?BundleId=56691
# or
wget http://download.oracle.com/otn-pub/java/jdk/7u1-b08/jdk-7u1-linux-x64.rpm
wget http://download.oracle.com/otn-pub/java/jce/7/UnlimitedJCEPolicyJDK7.zip
unzip
mv ... /usr/java/default/lib/security/

yum -y groupinstall "X Window System"
yum -y groupinstall "GNOME Desktop Environment"
yum -y install vnc-server unzip

vi /etc/sysconfig/vncservers 
VNCSERVERARGS[2]="-geometry 800x600"

mkdir mec
cd mec

wget http://downloads.sourceforge.net/project/mec-as2/install_mendelson_opensource_as2_1.1b37.zip?r=http%3A%2F%2Fsourceforge.net%2Fprojects%2Fmec-as2%2Ffiles%2F&ts=1322905813&use_mirror=heanet

chmod +x mendelson...start
chmod +x mendelson...stop

</pre>



== FreeAS2 ==

Installationen var enkel:
* http://www.rssbus.com/

<pre>
wget wget http://www.rssbus.com/download/GetFile.aspx?file=beta/AAY3-V/setup.tar.gz&name=AS2%20Connector%20SE%20\(Java%20Setup\)&go=true

s3cmd get s3://gizur-tmp/AS2ConnectorSEJavaSetup.gz

gunzip
tar
./run.sh start


http://localhost:8181
Login with admin and the password you provided

</pre>


== OpenAS2 ==

Vet inte om denna är stabil. Verkar inte har någor GUI. Kanske den går att använda för i Talend och undvika att skapa filer i EDI konverteringen.

<pre>
wget http://downloads.sourceforge.net/project/openas2/OpenAS2_20100816.zip?r=http%3A%2F%2Fsourceforge.net%2Fprojects%2Fopenas2%2F&ts=1322990284&use_mirror=netcologne

</pre>
