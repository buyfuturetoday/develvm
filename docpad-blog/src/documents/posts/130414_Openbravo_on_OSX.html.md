
---
layout: post
title: OpenBravo on OSX
date: 2013-04-14
author: Jonas Colmsjo
tags: ['post']
---

OpenBravo on OSX





# Introduction

OpenBravo is a open source ERP. The first major ERP that was open sourced is Compiere from US. Adempiere is
a european fork of Compiere. To my knowledge is OpenBravo and OpenERP currently the the open source ERP:s
i Europe that are getting most traction. Apache OfBiz (which also goes under the name OpenTAPS) is another 
alternative. xTuple and ERP5 are yet to more alternatives.

OpenBravo has Retail support so I'm going to try this out. 


# Installation

Links:

 * http://wiki.openbravo.com/wiki/System_Administration_Guide

Summary:

```
# Install postgres, see below
pg_ctl -D /usr/local/var/postgres9 -l /usr/local/var/postgres9/server.log start

# Make sure it started
pg_ctl -D /usr/local/var/postgres9 -l /usr/local/var/postgres9/server.log status

createdb openbravo
createuser openbravo
# Connect to db jonas as user jonas
psql -U openbravo
\password

# Try to connect to localhost on port 5432
psql -h localhost -p 5432 -U openbravo

# Create config/Openbravo.properties, use the Openbravo.properties.template or the content below (from ubuntu)
ant install.source
```

Increase shared memory:

```
sysctl kern.sysv.shmmax
kern.sysv.shmmax: 4194304

sudo sysctl -w kern.sysv.shmmax=1073741824
```

Increase Java Heap size

```
export JAVA_OPTS="-Xms128m -Xmx1024m"

export ANT_OPTS="-Xms128m -Xmx1024m"
```

Install pgAdmin:

 * http://www.pgadmin.org/download/macosx.php


## Dump database

```
pg_dump -U openbravo -C -f openbravo.pg_dump openbravo

```


## Install Tomcat

Links:

 * http://www.malisphoto.com/tips/tomcatonosx.html
 * http://tomcat.apache.org/tomcat-6.0-doc/introduction.html

Installation using brew:


```
brew install tomcat6
brew link tomcat6 --force
```

```
ls -al /usr/local/bin/startup.sh 
ls -al /usr/local/Cellar/tomcat6/6.0.36/

nano /usr/local/Cellar/tomcat6/6.0.36/libexec/conf/tomcat-users.xml

...
  <role rolename="manager"/>
  <role rolename="admin"/>
  <user username="admin" password="admin" roles="admin,manager"/>


shutdown.sh
startup.sh
```

## Configure Apache

Links:

 * http://wiki.openbravo.com/wiki/Installation/Custom/Apache
 * http://www.bartbusschots.ie/blog/?p=1347
 * http://httpd.apache.org/docs/2.2/programs/apxs.html

mod_jk needs to be installed

 * http://wiki.apache.org/tomcat/FAQ/Connectors

```
# Available modules
ls -al /usr/libexec/apache2/

# Download mod_jk
wget http://apache.mirror3.ip-only.net//tomcat/tomcat-connectors/jk/tomcat-connectors-1.2.37-src.tar.gz
tar -xzf tomcat-connectors-1.2.37-src.tar.gz

cd native
./configure CFLAGS='-arch x86_64' APXSLDFLAGS='-arch x86_64' --with-apxs=/usr/sbin/apxs
make
sudo make install
```

## Use of mod_jk in Elastic Beanstalk

 * http://stackoverflow.com/questions/10933608/tomcat-mod-cluster-and-amazon-ec2


## Install phpPgAdmin


```
wget http://downloads.sourceforge.net/project/phppgadmin/phpPgAdmin%20%5Bstable%5D/phpPgAdmin-5.1/phpPgAdmin-5.1.tar.bz2?r=http%3A%2F%2Fsourceforge.net%2Fprojects%2Fphppgadmin%2F%3Fsource%3Ddlp&ts=1367783807&use_mirror=freefr


```



## Install database

Postgres:

```
Gizur-Laptop-5:config jonas$ brew install postgresql9
==> Installing postgresql9 dependency: ossp-uuid
dyld: DYLD_ environment variables being ignored because main executable (/usr/bin/sudo) is setuid or setgid
==> Downloading ftp://ftp.ossp.org/pkg/lib/uuid/uuid-1.6.2.tar.gz
######################################################################## 100,0%
######################################################################## 100,0%==> ./configure --prefix=/usr/local/Cellar/ossp-uuid/1.6.2 --without-perl --without-php --without-pgsql
==> make
==> make install
==> Caveats
This formula is keg-only: so it was not symlinked into /usr/local.

OS X provides a uuid.h which conflicts with ossp-uuid's header.

Generally there are no consequences of this for you. If you build your
own software and it requires this formula, you'll need to add to your
build variables:

    LDFLAGS:  -L/usr/local/opt/ossp-uuid/lib
    CPPFLAGS: -I/usr/local/opt/ossp-uuid/include

==> Summary
🍺  /usr/local/Cellar/ossp-uuid/1.6.2: 15 files, 232K, built in 15 seconds
==> Installing postgresql9
dyld: DYLD_ environment variables being ignored because main executable (/usr/bin/sudo) is setuid or setgid
==> Downloading http://ftp.postgresql.org/pub/source/v9.0.13/postgresql-9.0.13.tar.bz2
######################################################################## 100,0%
==> Patching
patching file contrib/uuid-ossp/uuid-ossp.c
==> ./configure --prefix=/usr/local/Cellar/postgresql9/9.0.13 --enable-thread-safety --with-bonjour --with-gssapi --with-krb5 --with-openssl --with-libxml --with-libxslt --with-ossp
==> make install
==> make install-docs
==> cd contrib/adminpack; make install
==> cd contrib/auto_explain; make install
==> cd contrib/btree_gin; make install
==> cd contrib/btree_gist; make install
==> cd contrib/chkpass; make install
==> cd contrib/citext; make install
==> cd contrib/cube; make install
==> cd contrib/dblink; make install
==> cd contrib/dict_int; make install
==> cd contrib/dict_xsyn; make install
==> cd contrib/earthdistance; make install
==> cd contrib/fuzzystrmatch; make install
==> cd contrib/hstore; make install
==> cd contrib/intagg; make install
==> cd contrib/intarray; make install
==> cd contrib/isn; make install
==> cd contrib/lo; make install
==> cd contrib/ltree; make install
==> cd contrib/oid2name; make install
==> cd contrib/pageinspect; make install
==> cd contrib/passwordcheck; make install
==> cd contrib/pg_archivecleanup; make install
==> cd contrib/pg_buffercache; make install
==> cd contrib/pg_freespacemap; make install
==> cd contrib/pg_standby; make install
==> cd contrib/pg_stat_statements; make install
==> cd contrib/pg_trgm; make install
==> cd contrib/pg_upgrade; make install
==> cd contrib/pg_upgrade_support; make install
==> cd contrib/pgbench; make install
==> cd contrib/pgcrypto; make install
==> cd contrib/pgrowlocks; make install
==> cd contrib/pgstattuple; make install
==> cd contrib/seg; make install
==> cd contrib/spi; make install
==> cd contrib/sslinfo; make install
==> cd contrib/tablefunc; make install
==> cd contrib/test_parser; make install
==> cd contrib/tsearch2; make install
==> cd contrib/unaccent; make install
==> cd contrib/uuid-ossp; make install
==> cd contrib/vacuumlo; make install
==> cd contrib/xml2; make install
==> Caveats
If builds of PostgreSQL 9 are failing and you have version 8.x installed,
you may need to remove the previous version first. See:
  https://github.com/mxcl/homebrew/issues/issue/2510

To build plpython against a specific Python, set PYTHON prior to brewing:
  PYTHON=/usr/local/bin/python  brew install postgresql
See:
  http://www.postgresql.org/docs/9.0/static/install-procedure.html


If this is your first install, create a database with:
  initdb /usr/local/var/postgres9

If this is your first install, automatically load on login with:
  mkdir -p ~/Library/LaunchAgents
  cp /usr/local/Cellar/postgresql9/9.0.13/org.postgresql.postgres.plist ~/Library/LaunchAgents/
  launchctl load -w ~/Library/LaunchAgents/org.postgresql.postgres.plist

If this is an upgrade and you already have the org.postgresql.postgres.plist loaded:
  launchctl unload -w ~/Library/LaunchAgents/org.postgresql.postgres.plist
  cp /usr/local/Cellar/postgresql9/9.0.13/org.postgresql.postgres.plist ~/Library/LaunchAgents/
  launchctl load -w ~/Library/LaunchAgents/org.postgresql.postgres.plist

Or start manually with:
  pg_ctl -D /usr/local/var/postgres9 -l /usr/local/var/postgres9/server.log start

And stop with:
  pg_ctl -D /usr/local/var/postgres9 stop -s -m fast


Some machines may require provisioning of shared memory:
  http://www.postgresql.org/docs/current/static/kernel-resources.html#SYSVIPC

If you want to install the postgres gem, including ARCHFLAGS is recommended:
    env ARCHFLAGS="-arch x86_64" gem install pg

To install gems without sudo, see the Homebrew wiki.

To have launchd start postgresql9 at login:
    ln -sfv /usr/local/opt/postgresql9/*.plist ~/Library/LaunchAgents
Then to load postgresql9 now:
    launchctl load ~/Library/LaunchAgents/homebrew.mxcl.postgresql9.plist
==> Summary
🍺  /usr/local/Cellar/postgresql9/9.0.13: 2615 files, 35M, built in 3.4 minutes

```


INITDB

```
Gizur-Laptop-5:config jonas$ initdb /usr/local/var/postgres9
The files belonging to this database system will be owned by user "jonas".
This user must also own the server process.

The database cluster will be initialized with locale sv_SE.UTF-8.
The default database encoding has accordingly been set to UTF8.
The default text search configuration will be set to "swedish".

creating directory /usr/local/var/postgres9 ... ok
creating subdirectories ... ok
selecting default max_connections ... 20
selecting default shared_buffers ... 2400kB
creating configuration files ... ok
creating template1 database in /usr/local/var/postgres9/base/1 ... ok
initializing pg_authid ... ok
initializing dependencies ... ok
creating system views ... ok
loading system objects' descriptions ... ok
creating conversions ... ok
creating dictionaries ... ok
setting privileges on built-in objects ... ok
creating information schema ... ok
loading PL/pgSQL server-side language ... ok
vacuuming database template1 ... ok
copying template1 to template0 ... ok
copying template1 to postgres ... ok

WARNING: enabling "trust" authentication for local connections
You can change this by editing pg_hba.conf or using the -A option the
next time you run initdb.

Success. You can now start the database server using:

    postgres -D /usr/local/var/postgres9
or
    pg_ctl -D /usr/local/var/postgres9 -l logfile start
```


START DB

```
Gizur-Laptop-5:config jonas$ pg_ctl -D /usr/local/var/postgres9 -l /usr/local/var/postgres9/server.log start
server starting
```


## Troubleshooting Postgres

```
cat /usr/local/var/postgres9/server.log 
...
FATAL:  could not create shared memory segment: Cannot allocate memory
DETAIL:  Failed system call was shmget(key=5432001, size=4063232, 03600).
HINT:  This error usually means that PostgreSQL's request for a shared memory segment exceeded available memory or swap space, or exceeded your kernel's SHMALL parameter.  You can either reduce the request size or reconfigure the kernel with larger SHMALL.  To reduce the request size (currently 4063232 bytes), reduce PostgreSQL's shared_buffers parameter (currently 300) and/or its max_connections parameter (currently 24).
  The PostgreSQL documentation contains more information about shared memory configuration.
g

cat /usr/local/var/postgres9/postgresql.conf

nano /usr/local/var/postgres9/postgresql.conf
...
listen_addresses = 'localhost'
port = 5432

pg_ctl -D /usr/local/var/postgres9 -l /usr/local/var/postgres9/server.log restart
```


# Install source


* http://code.openbravo.com/


Create a local clone

```
hg clone https://code.openbravo.com/erp/devel/pi
```


```
ant setup

ls config
```

Run `setup-properties-osx.app` from the finder.


I got the error `No origin file found that matched / Openbravo.properties.template`


I've registered an issue about this: https://issues.openbravo.com/view.php?id=23703


# Ubuntu

Testing the same thing on ubuntu



Install Postgres

```
sudo apt-get install postgresql
sudo -u postgres psql postgres
\password postgres
sudo -u postgres createdb openbravo
```

```
hg clone https://code.openbravo.com/erp/devel/pi
cd pi
ant setup
sudo ./setup-properties-linux-x64.bin 
ant install.source
```


This Openbravo.properties file was created using setup-properties-linux-x64.bin 

```
# *************************************************************************
# * The contents of this file are subject to the Openbravo  Public  License
# * Version  1.1  (the  "License"),  being   the  Mozilla   Public  License
# * Version 1.1  with a permitted attribution clause; you may not  use this
# * file except in compliance with the License. You  may  obtain  a copy of
# * the License at http://www.openbravo.com/legal/license.html 
# * Software distributed under the License  is  distributed  on  an "AS IS"
# * basis, WITHOUT WARRANTY OF ANY KIND, either express or implied. See the
# * License for the specific  language  governing  rights  and  limitations
# * under the License. 
# * The Original Code is Openbravo ERP. 
# * The Initial Developer of the Original Code is Openbravo SLU 
# * All portions are Copyright (C) 2007-2012 Openbravo SLU 
# * All Rights Reserved. 
# * Contributor(s):  ______________________________________.
# ************************************************************************
#
# Documentation at http://wiki.openbravo.com/wiki/Openbravo.properties

####################
# Date/time format #
####################

dateFormat.js=%Y-%m-%d
dateFormat.sql=YYYY-MM-DD
dateFormat.java=yyyy-MM-dd
dateTimeFormat.java=yyyy-MM-dd HH:mm:ss
dateTimeFormat.sql=DD-MM-YYYY HH24:MI:SS

###########
# General #
###########

# Static content URL. Use the default value to make it dynamic.
# Don't change this unless you know what you are doing
web.url=@actual_url_context@/web

# Full URL of the context, *only* used by the Web Services installation 
# and diagnostic task
context.url=http://localhost:8080/openbravo

# Absolute path to the attachments directory
attach.path=/opt/openbravo/attachments

# Context name, used in the final war file
context.name=openbravo

# Root sources directory, used by modularity
source.path=/home/ubuntu/pi

#Deploy mode: valid values [class, war, none]
deploy.mode=class

############
# Database #
############

# Oracle example:
#
# bbdd.rdbms=ORACLE
# bbdd.driver=oracle.jdbc.driver.OracleDriver
# bbdd.url=jdbc:oracle:thin:@localhost:1521:xe
# bbdd.sid=xe
# bbdd.systemUser=SYSTEM
# bbdd.systemPassword=SYSTEM
# bbdd.user=TAD
# bbdd.password=TAD
# bbdd.sessionConfig=ALTER SESSION SET NLS_DATE_FORMAT='DD-MM-YYYY' NLS_NUMERIC_CHARACTERS='.,'

# Oracle instances in linux, can delay on getting DB connection (issue #12683). 
# In these cases this property can be set to solve the problem
# java.security.egd=file:///dev/urandom

bbdd.rdbms=POSTGRE
bbdd.driver=org.postgresql.Driver
bbdd.url=jdbc:postgresql://localhost:5432
bbdd.sid=openbravo
bbdd.systemUser=postgres
bbdd.systemPassword=syspass
bbdd.user=tad
bbdd.password=tad
bbdd.sessionConfig=select update_dateFormat('YYYY-MM-DD')

##################
# Tomcat manager #
##################

# From Tomcat 7 manager url is host/manager/text. In previous versions it is
# host/manager
tomcat.manager.url=http://localhost:8080/manager

# From Tomcat 7 this user must have manager-script role access. In previous
# versions. In previous versions it must have manager role access.
tomcat.manager.username=admin
tomcat.manager.password=admin

##########################
# Development parameters #
##########################

bbdd.outputscript=databasescript.sql
bbdd.verbosity=INFO

# use js/css minimization (in local-context and war-file)
minimizeJSandCSS=yes

# How sqlc should execute the queries embedded in xsql file at compilation time
# traditional: only uses the base query ignoring all optional parameters
# optimized: includes most optional parameter to achieve better performance
# If optimized fails for some xsql files, downgrade level to traditional
sqlc.queryExecutionStrategy=optimized

##################
# Authentication #
##################

# Leave this empty to use the default login handler.
# Examples:
# - org.openbravo.authentication.basic.AutologonAuthenticationManager (included)
# - org.openbravo.authentication.lam.LamAuthenticationManager (in external 'LAM Authentication Manager' module)
authentication.class=

###########
# Add-ons #
###########

# External Pentaho Services
pentahoServer=

##############
# Validation #
##############

validate.model=true
isMinorVersion=false

##############
# Safe mode  #
##############

# This property is used to activate/deactivate the safe mode of Openbravo ERP
# When this property is activated, if the last build wasn't succesful, or Tomcat
# wasn't restarted, users will only be able to login in the application 
# with role System Administrator

safe.mode=true

################################
# Strict Template Application  #
################################

# This property is used to set the configuration script application mode.
# If the template application mode is strict, then inconsistencies in the template
# (such as the value to be changed being different from the value in a column
# data change of a configuration script) will make the process fail.
# If it's not strict the process will show a warning, but otherwise continue

# For production environments, this property should be false.
# For development environments, specially those working with
# Industry templates and configuration scripts, it is advisable to set this property to true

strict.template.application=false

##############
# Hibernate #
##############

# if this property is set then the mapping will be written to the file
# defined by this property, note the value should be the complete path 
# including the file name and extension.
# hibernate.hbm.file=/tmp/hibernate.hbm.xml


###################
# Log in security #
###################

# If these properties are set, after a failed login the response time 
# will be delayed, and the user account can be blocked.
login.trial.delay.increment=0
login.trial.delay.max=0
login.trial.user.lock=0

# Prevents concurrent sessions for same user.
login.limit.user.session=false

##########
# Others #
##########

# You are not allowed to run ant commands with the root user.
# Set allow.root to true to override this.
allow.root=false

# Specifies if the current instance is used for automated tests.
# Setting this to true will enable extra (hidden) functionality used 
# automated test scripts.
test.environment=false

# allows to compile classic 2.50 windows for all available tab
# By default those all not generated anymore for tabs for which they are not needed
#wad.generateAllClassic250Windows=true

# background.policy property defines whether background processes should be
# executed in this context or not. To prevent process execution this property must
# be set to no-execute
background.policy=default
```




