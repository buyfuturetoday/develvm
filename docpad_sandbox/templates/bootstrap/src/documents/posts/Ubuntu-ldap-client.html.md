
---
layout: post
title: Ubuntu
date: 2012-01-01
author: Jonas Colmsjo
---

Yet another post





[[Wiki]]


h1. Ubuntu LDAP client

h2. Background

* http://www.openldap.org/doc/admin23/sasl.html
* http://www.openldap.org/lists/openldap-software/200010/msg00097.html
* http://blogs.splunk.com/2009/07/30/ldapsearch-is-your-friend/





h2. Setup

* https://help.ubuntu.com/community/LDAPClientAuthentication

Test that the LDAP server can be reached.
<pre>
sudo apt-get install ldap-utils

# Bind as admin
ldapsearch -x -D 'cn=admin,dc=gizur,dc=com' -H ldap://int-app-svn.ldap01.gizurcloud.com:389/ -W -b ou=People,dc=gizur,dc=com objectclass=posixAccount
ldapwhoami -x -D 'cn=admin,dc=gizur,dc=com' -H ldap://int-app-svn.ldap01.gizurcloud.com:389/ -W

# You can change password
ldappasswd

# Anonymous bind
ldapsearch -x -H ldap://int-app-svn.ldap01.gizurcloud.com:389/  -b ou=People,dc=gizur,dc=com objectclass=posixAccount

</pre>


<pre>
sudo apt-get install ldap-auth-client nscd
sudo auth-client-config -t nss -p lac_ldap

cat /etc/nsswitch.conf
cat /etc/auth-client-config/profile.d/ldap-auth-config
cat/etc/ldap.conf

# Create script for automatically creating home dirs
sudo nano /usr/share/pam-configs/my_mkhomedir

Name: activate mkhomedir
Default: yes
Priority: 900
Session-Type: Additional
Session:
        required                        pam_mkhomedir.so umask=0022 skel=/etc/skel

# Activate
sudo pam-auth-update


sudo nano /etc/security/group.conf
#
# 2012-04-27, Jonas Colmsjö
#
*;*;*;Al0000-2400;audio,cdrom,dialout,floppy


nano /usr/share/pam-configs/my_groups
Name: activate /etc/security/group.conf
Default: yes
Priority: 900
Auth-Type: Primary
Auth:
        required                        pam_group.so use_first_pass

sudo pam-auth-update



/etc/init.d/nscd restart
</pre>

Add groups used by LDAP
<pre>
groupadd employees
groupadd partners
</pre>


Enable plain password authentication
<pre>
 sudo nano /etc/ssh/sshd_config 
# 2012-04-20, Jonas Colmsjö, PasswordAuthentication no
PasswordAuthentication yes

# Set password or you can't login!!!
passwd

sudo /etc/init.d/ssh restart
</pre>


h2. Troubleshooting


On LDAP server:
<pre>
tail /var/log/auth.log
</pre>
