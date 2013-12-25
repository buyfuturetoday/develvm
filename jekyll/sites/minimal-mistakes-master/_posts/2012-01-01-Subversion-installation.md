---
layout: post
description: Subversion
title: Subversion
date: 2012-01-01
author: Jonas Colmsjo
tags: ['post']
---

Yet another post





[[wiki]]

h1. Subversion installation

* https://help.ubuntu.com/community/Subversion

<pre>
service apache2 stop
sudo apt-get install libapache2-svn

sudo vi /etc/apache2/mods-available/dav_svn.conf

service apache2 start

Remove  comments for Location...and change /repos to /svn and change path for passwd file to /etc/svn-auth-conf 

mkdir /var/svn
cd /var/svn

svnadmin create Inox
svnadmin load Inox < ~/dwnl/Inox.dmp
chown -R www-data.www-data /var/svn

# Setup webmin to create users instead, not sure how I did this though
htpasswd -cm /etc/subversion/passwd jonas

service apache2 restart
</pre>



h2. LDAP Authentication

* http://directory.fedoraproject.org/wiki/Howto:Apache

* https://www.google.se/url?sa=t&rct=j&q=&esrc=s&source=web&cd=2&ved=0CCkQFjAB&url=https%3A%2F%2Fcollab.pexus.net%2FKnowledge%2520Hub%2Fuseful-links%2Ftools%2Fopenldap-svn-and-apache-http%2Fat_download%2Ffile&ei=aeaPT_jkOcHl4QTYz6WDBA&usg=AFQjCNFgMShtrPtEbx-EUPHLn3QieZCHFQ
* http://svn.haxx.se/users/archive-2007-08/0240.shtml


* http://httpd.apache.org/docs/2.2/mod/mod_authnz_ldap.html
* http://httpd.apache.org/docs/2.0/mod/mod_auth_ldap.html


<pre>
a2enmod authnz_ldap
/etc/init.d/apache2 restart
</pre>
Give access to everyone in the LDAP directoty

<pre>
sudo vi /etc/apache2/mods-available/dav_svn.conf

  AuthType Basic
  AuthName "Gizur"
  AuthBasicProvider ldap

  AuthzLDAPAuthoritative   Off
  AuthLDAPURL              "ldap://int-app-svn.lam.gizurcloud.com:389/ou=People,dc=gizur,dc=com"

  Require valid-user
</pre>

<pre>
