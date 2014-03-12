[[wiki]] > [[Technical Architecture]] > [[Execution Architecture]]


h1. Pentaho installation routine

Open the ports 8080 and 8099 in the role in Scalr.

* Java - https://help.ubuntu.com/community/Java
* http://www.oracle.com/technetwork/java/javase/downloads/jdk-6u31-download-1501634.html

https://github.com/flexiondotorg/oab-java6
<pre>
cd ~/dwnl
wget https://raw.github.com/flexiondotorg/oab-java6/master/oab-java6.sh -O oab-java6.sh
chmod +x oab-java6.sh
sudo ./oab-java6.sh
</pre>


<pre>
sudo apt-cache search sun
sudo apt-get install sun-java6-jdk


sudo update-alternatives --config java

# Update bashrc
sudo vi /etc/profile

#
# Jonas Colmsjö
#

export JAVA_HOME=/usr/lib/jvm/java-6-sun


</pre>

<pre>
wget http://downloads.sourceforge.net/project/pentaho/Business%20Intelligence%20Server/3.10.0-stable/biserver-ce-3.10.0-stable.tar.gz?r=http%3A%2F%2Fsourceforge.net%2Fprojects%2Fpentaho%2Ffiles%2FBusiness%2520Intelligence%2520Server%2F3.10.0-stable%2F&ts=1330367621&use_mirror=ignum
mv biserver-ce-3.10.0-stable.tar.gz?r=http:%2F%2Fsourceforge.net%2Fprojects%2Fpentaho%2Ffiles%2FBusiness%20Intelligence%20Server%2F3.10.0-stable%2F biserver-ce-3.10.0-stable.tar.gz
gunzip biserver-ce-3.10.0-stable.tar.gz 
mkdir pentaho
cp biserver-ce-3.10.0-stable.tar pentaho/
cd pentaho
tar -xf biserver-ce-3.10.0-stable.tar 

rm biserver-ce-3.10.0-stable.tar

cd ..
mv pentaho /opt/

adduser --system --group --shell /bin/bash pentaho
chown -R pentaho /opt/pentaho
su - pentaho

root@ec2-46-137-54-126:~/dwnl/pentaho/biserver-ce# java -version
java version "1.6.0_20"
OpenJDK Runtime Environment (IcedTea6 1.9.10) (6b20-1.9.10-0ubuntu1~10.04.2)
OpenJDK Client VM (build 19.0-b09, mixed mode, sharing)

cd /opt/pentaho/biserver-ce/

sudo ./set-pentaho-env.sh

root@ec2-46-137-54-126:/opt/pentaho/biserver-ce# sudo ./start-pentaho.sh 
/opt/pentaho/biserver-ce
/opt/pentaho/biserver-ce
WARNING: Using java from path
DEBUG: _PENTAHO_JAVA_HOME=
DEBUG: _PENTAHO_JAVA=java
--------------------------------------------------------------------------------------------
The Pentaho BI Platform now contains a version checker that will notify you
when newer versions of the software are available. The version checker is enabled by default.
For information on what the version checker does, why it is beneficial, and how it works see:
http://wiki.pentaho.com/display/ServerDoc2x/Version+Checker
Press Enter to continue, or type cancel or Ctrl-C to prevent the server from starting.
You will only be prompted once with this question.
--------------------------------------------------------------------------------------------
[OK]:
Using CATALINA_BASE:   /opt/pentaho/biserver-ce/tomcat
Using CATALINA_HOME:   /opt/pentaho/biserver-ce/tomcat
Using CATALINA_TMPDIR: /opt/pentaho/biserver-ce/tomcat/temp
Using JRE_HOME:        /usr
Using CLASSPATH:       /opt/pentaho/biserver-ce/tomcat/bin/bootstrap.jar
root@ec2-46-137-54-126:/opt/pentaho/biserver-ce#

# change port in biserver-ce/tomcat/conf/server.xml

# open http://sbx.gizurcloud.com:8080/pentaho/Login


cd ../administration-console/
root@ec2-46-137-54-126:/opt/pentaho/administration-console# sudo ./start-pac.sh 
/opt/pentaho/administration-console
/opt/pentaho/administration-console
WARNING: Using java from path
DEBUG: _PENTAHO_JAVA_HOME=
DEBUG: _PENTAHO_JAVA=java
18:59:04,995 INFO  [JettyServer] Console is starting
18:59:05,047 INFO  [/] org.pentaho.pac.server.BrowserLocaleServlet-7668057: init
18:59:05,048 INFO  [/] org.pentaho.pac.server.DefaultConsoleServlet-22894293: init
18:59:05,048 INFO  [/] org.pentaho.pac.server.PacServiceImpl-13582581: init
18:59:05,048 INFO  [/] org.pentaho.pac.server.SchedulerServiceImpl-5298332: init
18:59:05,048 INFO  [/] org.pentaho.pac.server.SolutionRepositoryServiceImpl-22996593: init
18:59:05,048 INFO  [/] org.pentaho.pac.server.SubscriptionServiceImpl-12926414: init
18:59:05,048 INFO  [/] org.pentaho.pac.server.common.HibernateConfigurationServiceImpl-22710119: init
18:59:05,048 INFO  [/] org.pentaho.pac.server.common.JdbcDriverDiscoveryServiceImpl-8548382: init
18:59:05,078 INFO  [JettyServer] Console is now started. It can be accessed using http://ec2-46-137-54-126.eu-west-1.compute.amazonaws.com:8099 or http://10.224.119.102:8099

# Edit security group on Scalrt role, open 8099
# open http://sbx.gizurcloud.com:8099/
# Login with admin/password

</pre>


h2. Security configuration

* http://wiki.pentaho.com/display/ServerDoc2x/Security+Configuration+Checklist

NOT NECESSARY

<pre>
cd 
sudo vi /opt/pentaho/biserver-ce/pentaho-solutions/system/pentaho.xml


</pre>

Setup trust between BI server and PAC
* http://wiki.pentaho.com/display/ServerDoc2x/Setting+up+trust+between+Administration+Console+and+BI+Server


Stop admin and pentaho servers

<pre>
sudo vi /opt/pentaho/biserver-ce/tomcat/webapps/pentaho/WEB-INF/web.xml

<param-name>TrustedIpAddrs</param-name>
                        <param-value>127.0.0.1</param-value>

</pre>


Publisher password
<pre>
sudo vi /opt/pentaho/biserver-ce/pentaho-solutions/system/publisher_config.xml

</pre>

h3. Admin console config

* http://wiki.pentaho.com/display/ServerDoc2x/.02+Installing+and+Configuring+the+Pentaho+Administration+Console

<pre>
sudo vi /opt/pentaho/administration-console/resource/config/console.xml

<solution-path>./../biserver-ce/pentaho-solutions</solution-path>

<war-path>./../biserver-ce/tomcat/webapps/pentaho</war-path>

<platform-username>admin</platform-username>

</pre>



h2. Automatic startup

HAS NOT BEEN ABLE TO GET THIS TO WORK IN THE SANDBOX, INVESTIGATE FURTHER...

Setup services for:
* start-pentaho.sh 
* start-pac.sh



* http://wiki.pentaho.com/display/ServerDoc2x/Starting+the+BI+Server+At+Boot+Time+On+Linux