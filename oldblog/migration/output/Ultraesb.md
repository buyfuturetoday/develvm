Yet another post

[meta:author]: <> (Jonas Colmsjo)
[meta:title]: <> (Ultraesb.md)
[meta:date]: <> (2012-01-01)
[meta:nested:key]: <> (Metadata value)

##!!truncate


[[Main_Page]]



== Development ==


Using node.js http-console2 since I was unable to compile UltraESB and the toolbox it contains.


<pre>
cd /Users/jonas/node_modules/http-console2
./http-console www.gizur.com
GET /
/wp-admin
.q
</pre>


Testing the echo-back service:
<pre>
cd /Users/jonas/node_modules/http-console2
./http-console java.gizurcloud.com:8280
 GET /service/echo-back
</pre>


== Configuration ==

Default confuiguration
* http://docs.adroitlogic.org/display/esb/The+Default+Configuration


Spring background
* http://static.springsource.org/spring/docs/2.5.x/reference/xsd-config.html



== Installation ==

* http://adroitlogic.org/
* http://backup.adroitlogic.org/resources/samples-articles-and-tutorials/all-articles/90-three-node-ultraesb-cluster-deployment.html

Open port 8043 in the firewall

<pre>
wget http://downloads.adroitlogic.com/adroitlogic-ultraesb-1.7.0.zip
unzip
mv ... /opt

vi /opt/ultraesb-1.7.0/conf/ultra-root.xml
# Enable remote JMX connections


cd /opt/ultraesb
cd bin
./ultraesb.sh

# start new ssh session

vi /opt/ultraesb-1.7.0/uconsole/conf/jetty.xml 

#change localhost to gizurcloud.com etc. Do not change the password

 cd /opt/ultraesb/bin
./uconsole.sh 

</pre>


<pre>
<!-- Remember to edit bin/ultraesb.sh or conf/wrapper.conf to specify the -Djava.rmi.server.hostname=<your-ip-address> property for JMX -->

</pre>


* http://backup.adroitlogic.org/resources/samples-articles-and-tutorials/all-articles/84-configuring-jmx-and-console-access.html

<pre>
By default, the uconsole can be accessed only on the system where its installed, as a security precaution. To enable users from other systems to connect to the uconsole, edit the uconsole/conf/jetty.xml file and change the "Host" attribute of the "SslSocketConnector" from "localhost" to the preferred network interface. You may also wish to change the port used if required. Note that the uconsole is designed to be used over SSL.

</pre>



== Run uconsole locally ==

<pre>
service:jmx:rmi:///jndi/rmi://hostName:portNum/jmxrmi

service:jmx:rmi:///jndi/rmi://sbx.gizurcloud.com:1099/jmxrmi


service:jmx:rmi://ec2-46-137-54-126:9994/jndi/rmi://ec2-46-137-54-126:1099/ultra


</pre>
