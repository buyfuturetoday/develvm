
---
layout: post
title: Microsoft BigData
date: 2013-03-22
author: Jonas Colmsjo
---

Microsoft BigData/HDInsight Datawarehouse





## Introduction

Micorosft are developing a BigData Solution based on Hadoop. Currently is Hortonworkd HDP 1.1 used but
this might change. What's good is that HDP has good support for ODBC which makes it possible to 
connect to the data warehouse from a vareity of reporting solutions (foir instance Excel).


## Installation

Steps:

1. Launch a AWS EC2 instance, I'm using m1.xlarge for now
1. Connect and install HDInsight using this http://www.microsoft.com/en-gb/download/details.aspx?id=35397
1. Install Hortonworks ODBC driver (I'm using 64 bit) - http://hortonworks.com/thankyou-hdp12/#addon-table
1. Check that hive is up and running. Open a PowerShell session
 * `cd C:\Hadoop\hive-0.9.0\bin`
 * `./hive -h localhost -p 10000`
 * `show tables`- empty result but there should not be any errors
1. Open the task manager, check that CPU and Memory is ok
1. Open the ODBC manager
1. Navigate to System DSN->select Sample Hortonworks...->Configure
1. Now enter Host: localhost, Hive Server Type: Hive Server 1
1. Hit test
1. Go to the Task Manager and click on the CPU column


Java consumes 30% CPU and ODBC 15% and ODBC manager does not respond.


## Test with MapR ODBC Connector

Download the MapR ODBC driver from here: http://www.mapr.com/doc/display/MapR/Hive+ODBC+Connector

Do the same test as above. Same result...

