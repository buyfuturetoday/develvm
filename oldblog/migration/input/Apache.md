[[Main_Page]]

== SSL ==

* https://knowledge.rapidssl.com/support/ssl-certificate-support/index?page=home

Create Request
* https://knowledge.rapidssl.com/support/ssl-certificate-support/index?page=content&actp=CROSSLINK&id=so13985

Install certificate
* https://knowledge.rapidssl.com/support/ssl-certificate-support/index?page=content&actp=CROSSLINK&id=SO6252

Test Certificate
* https://knowledge.rapidssl.com/support/ssl-certificate-support/index?page=content&id=SO9556&actp=LIST&viewlocale=en_US

* IMPORTANT: Use wildcard cerificate in order to keep cost down if several servers need certificates
** http://www.sslshopper.com/best-ssl-wildcard-certificate.html
** https://knowledge.rapidssl.com/support/ssl-certificate-support/index?page=content&id=SO6512&actp=search&viewlocale=en_US&searchid=1316522598578

<pre>
# Check for openssl
openssl<tab><tab>

# Install if it isn't installed
yum install openssl

# Install mod_ssl
yum install mod_ssl

# restart the server
service httpd restart

# Open the SSL port in the firewall
vi /etc/sysconfig/iptables


# Check that mod_ssl is installed
ls /etc/httpd/modules/

# View the SLL configuration
cat /etc/httpd/conf.d/ssl.conf 

# goto to the apache configuration directory
cd /etc/pki/tls/private

# Create private key
openssl genrsa -out gizur.key 2048

# Create Certificate Signing Request
openssl req -new -key gizur.key -out gizur.csr

# Verify the request
openssl req -noout -text -in gizur.csr

# Edit the configuration 
vi /etc/httpd/conf.d/ssl.conf 


# ---------------

# Save the certificate and intermediate CA on the server in  /etc/pki/tls/certs

# Update configuration
vi /etc/httpd/conf.d/ssl.conf

# Set ServerName
vi /etc/httpd/conf/httpd.conf

service httpd restart

SSLCertificateFile – This will need to point to the your SSL certificate itself that we issued to you
SSLCertificateKeyFile – This will need to point to the private key file associated with your certificate.
SSLCertificateChainFile – This will need to point to the the intermediate file

</pre>


=== Should also add VirtualHost to httpd.conf ===

I've not done this on s2.gizur.com

<pre>
<VirtualHost [IP ADDRESS]:443>
                ServerAdmin admin@domain.com
                DocumentRoot /www/home
                ServerName www.domain.com
                ErrorLog /www/home/logs/error_log
                SSLEngine on
                SSLProtocol all
                SSLCertificateFile /etc/httpd/conf/ssl.crt/www.domain.com.crt
                SSLCertificateKeyFile /etc/httpd/conf/ssl.key/www.domain.com.key
                SSLCACertificateFile /usr/local/ssl/crt/intermediate.crt
                ServerPath /home
                <Directory "/www/home">
                </Directory>
</VirtualHost>
 
</pre>


== Authorizations ==

* http://httpd.apache.org/docs/1.3/howto/htaccess.html

Make sure that
<pre>
<Directory />
    Options FollowSymLinks

    #
    # Jonas C.
    #
    #  AllowOverride None
    AllowOverride AuthConfig

</pre>

Enable authorization using webmin: servers-> Apache Webserver->Default server->Per directory options
* Authitication type: Basic
* Only these users
* User Text file
* Access checking order: Deny then allow

Also need to create the password file:
<pre>
htpasswd -cm /etc/svn-auth-conf jonas
</pre>

Then restart apache!


== Subversion ==


* http://davidwinter.me/articles/2006/03/03/access-control-for-subversion-with-apache2-and-authz/
