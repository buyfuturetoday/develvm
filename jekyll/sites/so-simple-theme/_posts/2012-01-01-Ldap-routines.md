---
layout: post
description: Ldap
title: Ldap
date: 2012-01-01
author: Jonas Colmsjo
tags: ['post']
---

Yet another post





[[Wiki]]

h1. LDAP routines

h2. Backup and Restore

* http://supportex.net/2011/02/backup-restore-ldap-database/

Export:
<pre>
slapcat -v -b "dc=gizur,dc=com" -l ldap-users.ldif
s3cmd put ldap-users.ldif s3://gizur-tmp
</pre>



Import:
<pre>
/etc/init.d/slapd stop
cd /var/lib/ldap
rm -rf *

s3cmd get s3://gizur-tmp/ldap-users.ldif

/usr/sbin/slapadd -l ldap-users.ldif
chown -R openldap:openldap *
/etc/init.d/slapd start
tail /var/log/syslog
service slapd status

</pre>
