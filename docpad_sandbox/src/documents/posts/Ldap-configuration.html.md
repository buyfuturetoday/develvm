
---
layout: post
title: Ldap
date: 2012-01-01
author: Jonas Colmsjo
tags: ['post']
---

Yet another post





[[Wiki]]

h1. LDAP configuration


h2. Introduction

# Intall LDAP
# Install LAM
# Start webmin and setup ldap - NOT NEEDED?


h2. Ubuntu

* https://help.ubuntu.com/community/OpenLDAPServer
* https://help.ubuntu.com/11.04/serverguide/C/openldap-server.html

* http://www.zytrax.com/books/ldap/ape/cosine.html
* http://www.zytrax.com/books/ldap/ape/nis.html
* http://www.zytrax.com/books/ldap/ape/inetorgperson.html


<pre>
sudo apt-get install slapd ldap-utils

sudo ldapadd -Y EXTERNAL -H ldapi:/// -f /etc/ldap/schema/cosine.ldif && sudo ldapadd -Y EXTERNAL -H ldapi:/// -f /etc/ldap/schema/nis.ldif && sudo ldapadd -Y EXTERNAL -H ldapi:/// -f /etc/ldap/schema/inetorgperson.ldif


# Or one command at the time
sudo ldapadd -Y EXTERNAL -H ldapi:/// -f /etc/ldap/schema/cosine.ldif
SASL/EXTERNAL authentication started
SASL username: gidNumber=0+uidNumber=0,cn=peercred,cn=external,cn=auth
SASL SSF: 0
adding new entry "cn=cosine,cn=schema,cn=config"


sudo ldapadd -Y EXTERNAL -H ldapi:/// -f /etc/ldap/schema/nis.ldif
SASL/EXTERNAL authentication started
SASL username: gidNumber=0+uidNumber=0,cn=peercred,cn=external,cn=auth
SASL SSF: 0
adding new entry "cn=nis,cn=schema,cn=config"


sudo ldapadd -Y EXTERNAL -H ldapi:/// -f /etc/ldap/schema/inetorgperson.ldif
SASL/EXTERNAL authentication started
SASL username: gidNumber=0+uidNumber=0,cn=peercred,cn=external,cn=auth
SASL SSF: 0
adding new entry "cn=inetorgperson,cn=schema,cn=config"


nano backend.gizur.com.ldif

# Load dynamic backend modules
dn: cn=module,cn=config
objectClass: olcModuleList
cn: module
olcModulepath: /usr/lib/ldap
olcModuleload: back_hdb.la

# Database settings
dn: olcDatabase=hdb,cn=config
objectClass: olcDatabaseConfig
objectClass: olcHdbConfig
olcDatabase: {1}hdb
olcSuffix: dc=gizur,dc=com
olcDbDirectory: /var/lib/ldap
olcRootDN: cn=admin,dc=gizur,dc=com
olcRootPW: 2RExa3avuTUP
olcDbConfig: set_cachesize 0 2097152 0
olcDbConfig: set_lk_max_objects 1500
olcDbConfig: set_lk_max_locks 1500
olcDbConfig: set_lk_max_lockers 1500
olcDbIndex: objectClass eq
olcLastMod: TRUE
olcDbCheckpoint: 512 30
olcAccess: to attrs=userPassword by dn="cn=admin,dc=gizur,dc=com" write by anonymous auth by self write by * none
olcAccess: to attrs=shadowLastChange by self write by * read
olcAccess: to dn.base="" by * read
olcAccess: to * by dn="cn=admin,dc=gizur,dc=com" write by * read

sudo ldapadd -Y EXTERNAL -H ldapi:/// -f backend.gizur.com.ldif
SASL/EXTERNAL authentication started
SASL username: gidNumber=0+uidNumber=0,cn=peercred,cn=external,cn=auth
SASL SSF: 0
adding new entry "cn=module,cn=config"

adding new entry "olcDatabase=hdb,cn=config"


nano frontend.gizur.com.ldif

# Create top-level object in domain
dn: dc=gizur,dc=com
objectClass: top
objectClass: dcObject
objectclass: organization
o: Gizur Organization
dc: Gizur
description: LDAP Gizur 

# Admin user.
dn: cn=admin,dc=gizur,dc=com
objectClass: simpleSecurityObject
objectClass: organizationalRole
cn: admin
description: LDAP administrator
userPassword: 2RExa3avuTUP

dn: ou=people,dc=gizur,dc=com
objectClass: organizationalUnit
ou: people

dn: ou=groups,dc=gizur,dc=com
objectClass: organizationalUnit
ou: groups

dn: uid=john,ou=people,dc=gizur,dc=com
objectClass: inetOrgPerson
objectClass: posixAccount
objectClass: shadowAccount
uid: john
sn: Doe
givenName: John
cn: John Doe
displayName: John Doe
uidNumber: 1000
gidNumber: 10000
userPassword: password
gecos: John Doe
loginShell: /bin/bash
homeDirectory: /home/john
shadowExpire: -1
shadowFlag: 0
shadowWarning: 7
shadowMin: 8
shadowMax: 999999
shadowLastChange: 10877
mail: admin@gizur.com
postalCode: 31000
l: Toulouse
o: Gizur
mobile: +33 (0)6 xx xx xx xx
homePhone: +33 (0)5 xx xx xx xx
title: System Administrator
postalAddress: 
initials: JD

dn: cn=gizur,ou=groups,dc=gizur,dc=com
objectClass: posixGroup
cn: gizur
gidNumber: 10000


# Use password 'secret'
sudo ldapadd -x -D cn=admin,dc=gizur,dc=com -W -f frontend.gizur.com.ldif
adding new entry "dc=example,dc=com"

adding new entry "cn=admin,dc=example,dc=com"

adding new entry "ou=people,dc=example,dc=com"

adding new entry "ou=groups,dc=example,dc=com"

adding new entry "uid=john,ou=people,dc=example,dc=com"

adding new entry "cn=example,ou=groups,dc=example,dc=com"


ldapsearch -xLLL -b "dc=gizur,dc=com" uid=john sn givenName cn
dn: uid=john,ou=people,dc=example,dc=com
sn: Doe
givenName: John
cn: John Doe

</pre>

Some more testing:
<pre>
sudo ldapsearch -LLL -Y EXTERNAL -H ldapi:/// -b cn=config dn

# Backend
sudo ldapsearch -c -Y EXTERNAL -H ldapi:///  -LLL -b cn=config olcDatabase=config olcAccess

# Frontend tree
sudo ldapsearch -c -Y EXTERNAL -H ldapi:///  -LLL -b cn=config olcDatabase={1}hdb olcAccess
</pre>

h3. SSL


<pre>
sudo apt-get install gnutls-bin

sudo sh -c "certtool --generate-privkey > /etc/ssl/private/cakey.pem"

sudo nano /etc/ssl/ca.info 
cn = GizurCloud LDAP Server
ca
cert_signing_key


sudo certtool --generate-self-signed --load-privkey /etc/ssl/private/cakey.pem --template  /etc/ssl/ca.info --outfile /etc/ssl/certs/cacert.pem

sudo sh -c "certtool --generate-privkey > /etc/ssl/private/ldap01_slapd_key.pem"

sudo nano /etc/ssl/ldap01.info 
organization = GizurCloud LDAP Server
cn = ldap01.gizurcloud.com
tls_www_server
encryption_key
signing_key


sudo certtool --generate-certificate --load-privkey /etc/ssl/private/ldap01_slapd_key.pem --load-ca-certificate /etc/ssl/certs/cacert.pem --load-ca-privkey /etc/ssl/private/cakey.pem  --template /etc/ssl/ldap01.info --outfile /etc/ssl/certs/ldap01_slapd_cert.pem


sudo ldapmodify -Y EXTERNAL -H ldapi:///

# uncomment the SLAPD_SERVICES option:
sudo nano /etc/default/slapd
SLAPD_SERVICES="ldap:/// ldapi:/// ldaps:///"

sudo adduser openldap ssl-cert
sudo chgrp ssl-cert /etc/ssl/private/ldap01_slapd_key.pem
sudo chmod g+r /etc/ssl/private/ldap01_slapd_key.pem

sudo /etc/init.d/slapd restart
</pre>

h2. LAM - install from repository

<pre>
sudo apt-get install ldap-account-manager

# remove apache configuration (re-create in Scalr below)
mv /etc/apache2/conf.d/ldap-account-manager ~/

service apache2 restart

</pre>


Create DNS and virtual host:
Alias / /usr/share/ldap-account-manager

<pre>
<Directory {$document_root}>
  Options +FollowSymLinks
  AllowOverride All
  Order allow,deny
  Allow from all
  DirectoryIndex index.html
</Directory>

<Directory {$document_root}/tmp>
  Options -Indexes
</Directory>

<Directory {$document_root}/sess>
  Options -Indexes
  Order allow,deny
  Deny from all
</Directory>

<Directory {$document_root}/config>
  Options -Indexes
  Order allow,deny
  Deny from all
</Directory>

<Directory {$document_root}/lib>
  Options -Indexes
  Order allow,deny
  Deny from all
</Directory>

<Directory {$document_root}/help>
  Options -Indexes
  Order allow,deny
  Deny from all
</Directory>

<Directory {$document_root}/locale>
  Options -Indexes
  Order allow,deny
  Deny from all
</Directory>

</pre>

Config lam.gizurcloud.com:
# LAM Configuration -> Edit General Settings
# LAM Configuration -> Edit Server Profiles -> Enter profiles
# LAM Configuration -> Edit Server Profiles -> Change dc=gizur in General settings
# LAM Configuration -> Edit Server Profiles -> Change dc=gizur in Account settings


Login on with admin/password:
# The following suffix(es) are missing in LDAP. LAM can create them for you.
## Click on create
# Choose unix group -> create
## Ignore the Samba domain warning
# Choose 


Search for users that have been added:
<pre>
sudo ldapsearch -c -Y EXTERNAL -H ldapi:///  -LLL -bdc=gizur,dc=com
</pre>


h2. Webmin

# LDAP -> Browse Database
## Can't locate Net/LDAP.pm in @INC ...You can have the Net::LDAP Perl module automatically installed from CPAN.

# OpenLDAP Server Configuration
## Root DN for LDAP database: dc=gizur,dc=com
## Administration login DN: admin
## New administration password: XXX


h2. Redmine

* http://www.redmine.org/projects/redmine/wiki/RedmineLDAP

# Administration -> LDAP Authentacation
# Leave user and password blank - Anonymous read is allowed



h2. LAM configuration - source install - DID NOT MANAGE TO GET THIS TO WORK


* http://www.ldap-account-manager.org/


Configure: http://lam.sbx.gizurcloud.com/templates/config/mainlogin.php to use LDAP server on SVN server.

<pre>
sudo apt-get install php5-ldap 
service apache2 restart

wget http://downloads.sourceforge.net/project/lam/LAM/3.7/ldap-account-manager-3.7.tar.gz?r=http%3A%2F%2Fwww.ldap-account-manager.org%2Flamcms%2Freleases&ts=1333555419&use_mirror=freefr
mv ldap-account-manager-3.7.tar.gz?r=http:%2F%2Fwww.ldap-account-manager.org%2Flamcms%2Freleases ldap-account-manager-3.7.tar.gz
gunzip ldap-account-manager-3.7.tar.gz 
tar -xvf ldap-account-manager-3.7.tar 

mv ldap-account-manager-3.7   /var/www/lam

cd /var/www/lam/config
cp config.cfg_sample config.cfg

chmod ug+w /var/www/lam/sess
chmod ug+w /var/www/lam/tmp


chown -R www-data:www-data /var/www/lam/

</pre>

Config:
# LAM Configuration -> Edit General Settings
# LAM Configuration -> Edit Server Profiles -> Manage Server Profiles -> Add Profile
# LAM Configuration -> Edit Server Profiles -> Select profile just created and password
# Login with admin
## Create missing ou




h2. CentOS

<pre>
yum install openldap-clients

ldapsearch -LLL -h s2.gizur.com -W -v -x -D dc=gizur,dc=com

ldapsearch -LLL -h s2.gizur.com -W -v -D dc=gizur,dc=com
</pre>

Guides:
* http://www.centos.org/docs/5/html/Deployment_Guide-en-US/s1-ldap-quickstart.html

<pre>
slappasswd

nano /etc/openldap/slapd.conf 

/sbin/service ldap restart
</pre>
