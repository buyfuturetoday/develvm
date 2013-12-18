
---
layout: post
title: Intalio
date: 2012-01-01
author: Jonas Colmsjo
tags: ['post']
---

Yet another post





[[Main_Page]]


* http://www.intalio.com/downloads
* http://community.intalio.com/getting-started/10-first-steps-with-intalio-bpms.html
* http://community.intalio.com/forums/installation/showcat.html
* http://community.intalio.com/getting-started/installing-intalio-bpms.html

<pre>
wget http://europa.intalio.com/downloads/intalio-bpms-6.2.4.zip

unzip

mv inalio /opt
export JAVA_HOME=/usr/lib/jvm/java-6-sun
cd /opt/intaio/bin

./startup.sh

</pre>

http://sbx.gizurcloud.com:8080/bpms-console
* Username: admin / Password: changeit



First test of demo scenario:
*  http://sbx.gizurcloud.com:8080/ui-fw/login.htm
* 'examples\msmith' and password 'password'



=== Change password ===

* http://community.intalio.com/faq/display-2.html#FAQ16

<pre>
cat /opt/intalio-bpms-6.2.4/var/config/security.xml 
</pre>

<pre>
root@ec2-46-137-54-126:/opt/intalio-bpms-6.2.4# grep -R changeit *
conf/server.xml:           with a password value of "changeit" for both the certificate and
var/config/security.xml:            <password>changeit</password>
var/config/security.xml:            <password>changeit</password>
webapps/tomcat-docs/printer/ssl-howto.html:    and specify a password value of "changeit".</li><br><br>
webapps/tomcat-docs/printer/ssl-howto.html:password.  The default password used by Tomcat is "<code>changeit</code>"
webapps/tomcat-docs/printer/ssl-howto.html:           keystoreFile="${user.home}/.keystore" keystorePass="changeit"
webapps/tomcat-docs/ssl-howto.html:    and specify a password value of "changeit".</li><br><br>
webapps/tomcat-docs/ssl-howto.html:password.  The default password used by Tomcat is "<code>changeit</code>"
webapps/tomcat-docs/ssl-howto.html:           keystoreFile="${user.home}/.keystore" keystorePass="changeit"
webapps/tomcat-docs/config/printer/http.html:      specified keystore file.  The default value is "<code>changeit</code>".
webapps/tomcat-docs/config/http.html:      specified keystore file.  The default value is "<code>changeit</code>".
webapps/bpms-console/WEB-INF/classes/security.xml:            <password>changeit</password>
webapps/bpms-console/WEB-INF/classes/security.xml:                <password>changeit</password>
webapps/bpms-console/WEB-INF/classes/security.xml:                <password>changeit</password>

</pre>
