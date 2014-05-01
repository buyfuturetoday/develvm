Yet another post

[meta:author]: <> (Jonas Colmsjo)
[meta:title]: <> (User-directories.md)
[meta:date]: <> (2012-01-01)
[meta:nested:key]: <> (Metadata value)

##!!truncate


[[Main_Page]]


= Private OpenID server =

* http://wiki.openid.net/w/page/12995226/Run%20your%20own%20identity%20server


= Single Sign On (SSO) =

Finns två standarder som är på vag fram:
* OpenID - http://openid.net/
* SAML - ska vara osynligt för användaren, ett abstrakt ramverk
* Äldre SSO standard - * http://www.openauthentication.org/
Google apps verkar ha support för både.

Dokumentation:
* http://identitymeme.org/doc/draft-hodges-saml-openid-compare.html#scnt-exec-summary-enduser

= CAS =

* http://www.jasig.org/cas


= LDAP =

It ispossible to sync a LDAP or AD directory with Google Apps:
* http://code.google.com/p/google-apps-for-your-domain-ldap-sync/

* LDAP necessary - OpenLDAP seams to be available in the CentOS repository
* Free OpenID and LDAP server - http://www.openid-ldap.org/
* Simple OpenID server - http://siege.org/phpmyid.php


Web GUI:
* http://gosa-project.org/
* http://en.wikipedia.org/wiki/List_of_LDAP_software
* LAM


== User self service portals ==

* http://ltb-project.org/wiki/documentation/self-service-password


== Installation ==

* http://www.centos.org/docs/5/html/Deployment_Guide-en-US/s1-ldap-quickstart.html

* http://www.openldap.org/doc/admin21/guide.html#A Quick-Start Guide
* http://docs.redhat.com/docs/en-US/Red_Hat_Directory_Server/8.2/html/Administration_Guide/schema-ldapmodify.html
* http://docs.redhat.com/docs/en-US/Red_Hat_Directory_Server/8.2/html/Administration_Guide/configuring-special-binds.html

<pre>
yum install openldap-servers mozldap-tools
</pre>


second try:
# Webmin > LDAP > Configuration, change user and password etc.
# Access Control ... install CPAN...
# Start ser
# error: no root DN -> create
# Apply configuration
# 

# error: Your LDAP server's database does not contain the root DN dc=gizur,dc=com yet, which means that no data can be added until you create it. However, Webmin can do this for you by clicking the button below.
# Press create DN

First try, failed:
<pre>
# Logga in i webmin och gör refresh modules
# Gå in i Browse, välj att uppdatera Perl från CPAN
# Vänta, installationen tar en stund
# Välj start server

vi /etc/openldap/ldap.conf 
vi /etc/openldap/sldap.conf 
cp DB_CONFIG.example /var/lib/ldap/DB_CONFIG

# change password in webmin

service ldap restart


cd /usr/lib64/mozldap
./ldapsearch -x -b '' -s base '(objectclass=*)' namingContexts
# No result

vi test.ldif
# Insert this
dn: dc=gizur,dc=com 
objectclass: dcObject 
objectclass: organization 
o: Gizur 
dc: gizur 

dn: cn=Manager,dc=gizur,dc=com 
objectclass: organizationalRole 
cn: Manager

./ldapadd -x -D "cn=Manager,dc=gizur,dc=com" -W -f test.ldif
</pre>


== phpLDAPAdmin ==

<pre>
wget http://sourceforge.net/projects/phpldapadmin/files/latest/download?source=files
gunzip phpldapadmin-1.2.2.tgz
tar -xvf phpldapadmin-1.2.2.tar

mv phpldapadmin-1.2.2 /var/www/html/phpldapadmin
chown -R apache.apache /var/www/html/phpldapadmin

yum -y install pcre php53-php-gettext php53-ldap php53-xml

cd /var/www/html/phpldapadmin/config
cp config.php.example config.php
vi config.php
</pre>

Login with: cn=root,dc=gizur,dc=com


== LAM ==

<pre>
wget http://downloads.sourceforge.net/project/lam/LAM/3.6/ldap-account-manager-3.6-0.fedora.1.noarch.rpm?r=http%3A%2F%2Fwww.ldap-account-manager.org%2Flamcms%2Freleases&ts=1322852177&use_mirror=freefr

rpm --nodeps -i ldap-account-manager-3.6-0.fedora.1.noarch.rpm 

cd /usr/share/ldap-account-manager/config

</pre>

*https://50.57.131.169/lam

== Applications ==


=== vTiger ===

<pre>
wget http://trac.vtiger.com/cgi-bin/trac.cgi/attachment/ticket/5372/vtiger-ldap-integration-v1.0.zip?format=raw
mv vtiger-ldap-integration-v1.0.zip\?format\=raw vtiger-ldap-integration-v1.0.zip
unzip  vtiger-ldap-integration-v1.0.zip
mv vtiger-ldap-integration-v1.0.zip /var/www/html/vtigercrm/
cd /var/www/html/vtigercrm/
service httpd restart
</pre>



=== Redmine ===

# Set Access control options to 'Allow anonymous login with DN' in webin > LDAP
# Do not enter account and password in Remin LDAP configuration
