#!/bin/sh

#
# MySQL needs to be started since docker runs each step isolated
#

/usr/sbin/mysqld &
sleep 5

#
# create user
#

DBNAME="myself"
DBUSER="myself"
DBPASSWORD="and I"

echo "create database $DBNAME; create user $DBUSER;" | mysql
echo "grant usage on *.* to '$DBUSER'@'%' identified by '$DBPASSWORD'; FLUSH PRIVILEGES" | mysql
echo "grant usage on *.* to '$DBUSER'@'localhost' identified by '$DBPASSWORD'; FLUSH PRIVILEGES" | mysql
echo "grant all privileges on $DBNAME.* to '$DBUSER'@'%'; FLUSH PRIVILEGES" | mysql


#
# Load Wordpress database
#

echo "create database gizur_com; create user gizur_com;" | mysql
echo "grant usage on *.* to 'gizur_com'@'%' identified by '48796e76'; FLUSH PRIVILEGES" | mysql
echo "grant usage on *.* to 'gizur_com'@'localhost' identified by '48796e76'; FLUSH PRIVILEGES" | mysql
echo "grant all privileges on gizur_com.* to 'gizur_com'@'%'; FLUSH PRIVILEGES" | mysql
mysql -ugizur_com -p48796e76 gizur_com < /sql-script/latest.sql


#
# Load vTiger Cikab database
#

echo "create database cikab; create user cikab;" | mysql
echo "grant usage on *.* to 'cikab'@'%' identified by '48796e76'; FLUSH PRIVILEGES" | mysql
echo "grant usage on *.* to 'cikab'@'localhost' identified by '48796e76'; FLUSH PRIVILEGES" | mysql
echo "grant all privileges on cikab.* to 'cikab'@'%'; FLUSH PRIVILEGES" | mysql
mysql -ucikab -p48796e76 cikab < /sql-script/cikab.sql


#
# Load vTiger clab database
#

DBNAME="clab"
DBUSER="clab"
DBPASSWORD="48796e76"
SQLFILE="clab.sql"

echo "create database $DBNAME; create user $DBUSER;" | mysql
echo "grant usage on *.* to '$DBUSER'@'%' identified by '$DBPASSWORD'; FLUSH PRIVILEGES" | mysql
echo "grant usage on *.* to '$DBUSER'@'localhost' identified by '$DBPASSWORD'; FLUSH PRIVILEGES" | mysql
echo "grant all privileges on $DBNAME.* to '$DBUSER'@'%'; FLUSH PRIVILEGES" | mysql
mysql -u$DBUSER -p$DBPASSWORD $DBNAME < /sql-script/$SQLFILE

