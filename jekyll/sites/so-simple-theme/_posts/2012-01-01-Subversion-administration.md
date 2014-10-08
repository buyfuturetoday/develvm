---
layout: post
description: Subversion
title: Subversion
date: 2012-01-01
author: Jonas Colmsjo
tags: ['post']
---

Yet another post





[[Wiki]]

h1. Subversion administration


h2. Create new repository

ssh into s2.gizur.com

<pre>
svnadmin create /var/www/svn/<NAME_OF_REPO>
chown -R apache.apache /var/www/svn/<NAME_OF_REPO>
ls /var/www/svn/<NAME_OF_REPO>

# Add a new group for the repository and assign priviledges for the new group
vi /etc/svn-access-control 

</pre>


Verify the new repository on another server or the locally

<pre>
sudo svn co https://s2.gizur.com/svn/<NAME_OF_REPO>
</pre>


h2. Add new user

The LDAP directory is used for authentication so the same username and passwords are used.

Access also needs to be setup in subversion:
<pre>
vi /etc/svn-access-control 
</pre>


