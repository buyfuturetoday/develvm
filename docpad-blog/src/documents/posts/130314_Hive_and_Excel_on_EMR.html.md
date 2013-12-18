
---
layout: post
title: Hive and Excel on Elastic Map Reduce
date: 2013-03-14
author: Jonas Colmsjo
tags: ['post']
---

Hive and Excel on Elastic Map Reduce





I'VE NOT MANAGED TO GET THIS TO WORK...

Links:

 * https://cwiki.apache.org/Hive/hiveawsemr.html
 * http://docs.aws.amazon.com/ElasticMapReduce/latest/DeveloperGuide/emr-cli-commands.html
 * https://cwiki.apache.org/confluence/display/Hive/GettingStarted
 * http://blog.mustardgrain.com/2010/09/30/using-hive-with-existing-files-on-s3/
 * https://cwiki.apache.org/confluence/display/Hive/HiveAws
 * https://cwiki.apache.org/confluence/display/Hive/HiveAws+HivingS3nRemotely


ODBC:

 * http://www.mapr.com/doc/display/MapR/Hive+ODBC+Connector
 * http://social.technet.microsoft.com/wiki/contents/articles/6226.how-to-connect-excel-to-hadoop-on-azure-via-hiveodbc.aspx
 * http://oakleafblog.blogspot.se/2012/04/using-excel-2010-and-hive-odbc-driver.html


## Introduction

Excel can fetch data from external data sources using ODBC connections. There are ODBC drivers for Hive.

These have ODBC drivers for Hive:

 * MapR 
 * Hadooponazure
 * Hortonworks
 * Simba
 * DataDirect


The MapR Hadoop distribution (which contains Hive) can be used from Elastic Map Reduce soo I'll go for 
this one. 


## Step 1 - start an EMR Hive cluster

I'm using some helper scripts that are available here https://github.com/colmsjo/emr-scripts

You need to follow the instruction in the README to do the setup of AWS credentials etc.
I'll assume that the fab alias has been setup, see the README file.


```
fab create_hive_job

# or, do this
elastic-mapreduce --create --instance-type m1.large --alive num-instances 1 --with-supported-products mapr-m3
```

View progress of startup

```
fab list_jobs

# or, do this
elastic-mapreduce --list --active
```

Login to the server with ssh. Make sure that 


```
fab ssh

# or, do this
elastic-mapreduce --ssh --jobflow <JOBFLOWID>

# Start an interactive session
bin/hive

# List all Hive properties
hive>set -v
datanucleus.autoCreateSchema=true
datanucleus.autoStartMechanismMode=checked
datanucleus.cache.level2=false
...

# List the tables, empty of course
hive> show tables;
OK
Time taken: 3.141 seconds

# Show all available functions
hive> show functions;
OK
!
!=
%
&
*
...

```


## Step 2 - Load some data into Hive

I've stolen this example from Kirk True's Mustard Grain Blog, see link at the top.

You need a S3 bucket to place the data in. All data in a bucket should be formated the 
same way. Folders should not be used.

```
# List available buckets, s3cmd mb <name> will create a new bucket 
./python-env/bin/s3cmd ls
```

Create a file on S3 containing this content:

```
echo -e "jim=89347\ndave=313925\nnoddy=21516\ndon=6771" > data.txt

./python-env/bin/s3cmd put data.txt s3://<bucket>

# Check that the file is there
./python-env/bin/s3cmd ls s3://<bucket>
```


Login to the cluster and start hive cli again. 

```
fab ssh
bin/hive

hive> CREATE EXTERNAL TABLE mydata1 (key STRING, value INT)
    ROW FORMAT DELIMITED FIELDS TERMINATED BY '='
    LOCATION 's3n://emr-sbx/';
OK
Time taken: 4.264 seconds


hive>select * from mydata;
```

You can create several tables of the same raw data. This exmaple shows howto create tabels 
with more and less options:

```
hive> CREATE EXTERNAL TABLE mydata2 (key STRING, value INT) LOCATION 's3n://emr-sbx/';
OK
Time taken: 4.264 seconds

hive>CREATE EXTERNAL TABLE mydata3 (key STRING, value INT)
            ROW FORMAT DELIMITED FIELDS TERMINATED BY '='
            LINES TERMINATED BY '\n' 
            STORED AS TEXTFILE
            LOCATION 's3n://emr-sbx/';

```

Drop a table like this. The data is still there since it is external to the table:

```
hive>drop table mydata3;s
```


## Connect from Excel

The ODBC connector is only available for windows. There is both a 32-bit and a 64-bit version.
I'm running windows in a Virtual Box machine on my Mac.

Download the driver: 

 * 32-bit: http://package.mapr.com/tools/MapR-ODBC/MapR_odbc_2.0.0_x86.exe
 * 64-bit: http://package.mapr.com/tools/MapR-ODBC/MapR_odbc_2.0.0_x64.exe


You also need Windows C++ 2010 Runtimes:

 * http://www.microsoft.com/en-us/download/details.aspx?id=5555


You need the name of the hive server (master node) below:

```
fab list_jobs
Gizur-Laptop-5:emr-scripts jonas$ fab list_jobs
[localhost] local: elastic-mapreduce --list --active
j-JP4N7YPN4DW1      WAITING        ec2-54-246-35-239.eu-west-1.compute.amazonaws.com Development Job Flow (requires manual termination)
```

You also need to open up port 10000 in the security groups that EMR uses (ElasticMapReduce-master by default). Login with the AWS Console and open 10000 for 0.0.0.0 (everyone).


Steps:

  1. Install both C++ runtimes and MapR-ODBC drivers
  1. Create a Data Source Name (Start->MapR..->ODBC Driver Manager)
  1. Create a new User DSN
   * Select: Hive Server 2
   * Authentication: User name with User name set to mapr
  1. Hit the test button


## Troubleshooting


Open SSH tunnel to master node:

```
ssh -o ServerAliveInterval=10 -o StrictHostKeyChecking=no -i ~/keys/gc4-keypair1.pem hadoop@ec2-46-137-34-113.eu-west-1.compute.amazonaws.com -N -L 1234:localhost:10000
```


### Check ODBC setup


 * https://cwiki.apache.org/confluence/display/Hive/HiveODBC


```
odbcinst -j
```

Add to odbc.ini

```
[Hive]
 Driver = <path_to_libodbchive.so>
 Description = Hive Driver v1
 DATABASE = default
 HOST = <Hive_server_address>
 PORT = <Hive_server_port>
 FRAMED = 0
```


Test and see if it works:

```
isql -v Hive
```


## Misc

Good to know...

The hive configuration file is located here: .versions/hive-0.8.1/conf/hive-default.xml in the master node

maprcli:

```
maprcli

maprcli service list

maprcli dashboard info

maprcli entity list
```

jps:

```
hadoop@ip-10-36-129-22:~/conf$ jps
2132 instance-controller.jar
25922 Jps
2757 RolesController
```







