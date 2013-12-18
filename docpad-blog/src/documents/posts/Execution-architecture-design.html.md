
---
layout: post
title: Execution
date: 2012-01-01
author: Jonas Colmsjo
tags: ['post']
---

Yet another post





[[wiki]] > [[Technical Architecture]] > [[Execution Architecture]]

h1. Execution Architecture Design

h2. PHP & MySQL Execution Architecture Design

h3. Background

Links:
* MySQL cluster: http://www.google.se/url?sa=t&rct=j&q=mysql%20proxies%20load%20balancinf%2Bpdf&source=web&cd=2&ved=0CDYQFjAB&url=http%3A%2F%2Fdownloads.mysql.com%2Fforge%2Fslides%2FMySQL-Proxy.pdf&ei=JkXjTvOJIqTR4QSjoZWUBQ&usg=AFQjCNEbFSNCWhdhdj70i3ZFbG60cD949A
* http://wiki.scalr.net/Tutorials/Setup_MySQL_proxy?highlight=mysql+proxy

A load balancing cluster with failover functionality will be used. Initial thoughts on desgin:
* one laod balancer (likely ngix), 
* two apache server - need HA client in order to mange failover between the two MySQL proxies
* two MySQL server, one master and one slave
* Two load balancing MySQL proxies will be used to manage that writes are written to the master and reads distributed to all servers

Scalr's pre-configured images are used. 

Ubuntu 10.04 will be used for both application servers and database servers. The main reason is that ubuntu has a newer PHP version than CentOS 5,5.

The MySQL database server will run on failover cluster using MySQL master-slave synchronization. 

The laod balancer will initially run a micro image while the database and application server runs on small images.

Application and database server should have minimum 2 instances in the scaling options. Maximum should also be set to two instances (and scaling disabled).

The server will consist of:
* Load balancer: lb-nginx-centos-ebs ubuntu 10.04l, x32
* Applications servers: app-apache-ubuntu-ebs Ubuntu 10.04, x32
* Database servers: percona-ubuntu1004 Ubuntu 10.04, x32


Platform: Amazon EC2
Location: AWS /EU West 1 (Ireland)


h3. Application server

The OS for the application server is Ubuntu 10.04. PHP version is 5.3.X.

In addition to the standard modules should the following modules should be installed:
* php-pecl-apc - PHP opcache
* Postfix (for sending mail)
* Subversion client
* ec2-api-tools

Consider the folowing for system Admin:
* webmin (not installed yet)
* phpMyAdmin (not installed yet)


h4. SSL

All communication with vTiger and the portal should be encrypted with SSL. It should not be possible to connect using standard http. Port 80 should be closed in the firewall and apache should not listen on port 80.

A SSL certificate from RapidSSL is available here. This is a wildcard certificate that can be used for all subdomains of gizurcloud.com
http://s2.gizur.com:81/attachments/download/64/gizurcloud.com_RapidSSL_Wildcard_Order.pdf

Preparations (needed for the vTifger portal to work):
<pre>
sudo apt-get install php5-curl
service apache2 restart
</pre>

SSL is configured in scalr when setting up the virtual host.

h3. Database server

Standard MySQL 5 is used. The scalr MySQL role which has a master/slave setup is used.


h3. Management Server

The scalr ASP service will be used for the production environment. 

Login here: https://my.scalr.net/#/dashboard


h4. Testing of scalr 

Scalr is open source and it is possible to install your own scalr server. This requires that you have your own nameservers for the managed domain though.
A separate scalr test environment is usefull when doing performance testing since scalr charges based on the number of servers being managed. 

Howto install a scalr server on ubuntu is described here: [[Installation of management server]]. Scalr supports centos but I've not been able to install all dependencies on Rackspace centos 5.6.
