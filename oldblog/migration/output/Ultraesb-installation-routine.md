Yet another post

[meta:author]: <> (Jonas Colmsjo)
[meta:title]: <> (Ultraesb-installation-routine.md)
[meta:date]: <> (2012-01-01)
[meta:nested:key]: <> (Metadata value)

##!!truncate


[[wiki]] > [[Technical Architecture]] > [[Execution Architecture]]

h1. UltraESB installation routine


Need Java
* https://github.com/flexiondotorg/oab-java6

<pre>
wget https://github.com/flexiondotorg/oab-java6/raw/0.2.3/oab-java.sh -O oab-java.sh
chmod +x oab-java.sh
sudo ./oab-java.sh

sudo apt-cache search sun
sudo apt-get install sun-java6-jdk

sudo update-alternatives --config java

# Alternaitve
wget http://download.oracle.com/otn-pub/java/jdk/6u25-b06/jdk-6u25-linux-x64.bin
chmod
./jdk-6u25-linux-x64.bin

# UltraESB use themself, http://www.oracle.com/technetwork/java/javaee/downloads/java-ee-sdk-6u3-jdk-6u29-downloads-523388.html
wget http://download.oracle.com/otn-pub/java/java_ee_sdk/6u4/java_ee_sdk-6u4-jdk-linux-x64.sh

# Update bashrc
sudo vi /etc/profile

#
# Jonas Colmsjö
#

export JAVA_HOME=/usr/lib/jvm/java-6-sun


</pre>


* http://adroitlogic.org/download.html

<pre>
cd ~/dwnl
mkdir esb && cd esb
wget http://downloads.adroitlogic.com/adroitlogic-ultraesb-1.7.0.zip

#Latest
wget http://downloads.adroitlogic.com/adroitlogic-ultraesb-1.7.1.zip

unzip adroitlogic-ultraesb-1.7.0.zip
mv ultraesb-1.7.0 /opt/

adduser --system --group --shell /bin/bash ultraesb
chown -R ultraesb:ultraesb /opt/ultraesb-1.7.0

vi /opt/ultraesb-1.7.0/uconsole/conf/jetty.xml 

# change localhost to ec2-79-125-35-104 .eu-west-1.compute.amazonaws.com etc. Do not change the password
# Scaling will not work for uconsole!!

# Add as startup scripts
sudo vi /etc/rc.local
su ultraesb -c "/opt/ultraesb-1.7.0/bin/ultraesb-daemon.sh start > /dev/null 2>&1"
su ultraesb -c "/opt/ultraesb-1.7.0/bin/uconsole-daemon.sh start > /dev/null 2>&1"

reboot
</pre>


Open in a web browser - login with admin/admin:
* https://ec2-79-125-35-104.eu-west-1.compute.amazonaws.com:8043/uconsole


h2. RabbitMQ files

<pre>
cd /opt/ultraesb-1.7.0/lib/optional/

cp ~/svn/gom-prod/setup/spring-* .
cp ~/svn/gom-prod/setup/amqp-client-2.5.0.jar .

chown ultraesb:ultraesb *
</pre>


h2. Ubuntu 12.04 fix

Get this error about popularity contest:

<pre>
/etc/cron.daily/popularity-contest:
/etc/cron.daily/popularity-contest: 18: .: Can't open /etc/popularity-contest.conf
run-parts: /etc/cron.daily/popularity-contest exited with return code 2
</pre>

Just remove:
<pre>
apt-get remove popularity-contest
</pre>
