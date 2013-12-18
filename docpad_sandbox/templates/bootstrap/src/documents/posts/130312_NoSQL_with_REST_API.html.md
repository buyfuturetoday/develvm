
---
layout: post
title: NoSQL DB with REST API
date: 2013-03-12
author: Jonas Colmsjo
---

NoSQL DB with REST API




I played around with Cassandra which was really easy to install and to get started with.
BUT it don't have a REST API and is likely difficult to access directly from JavaScript
in a browser (something I'd like to do).

This article has a nice summary of NoSQL DBs:

 * http://kkovacs.eu/cassandra-vs-mongodb-vs-couchdb-vs-redis

 Riak, CouchDB, HBase and Neo4j have REST API:s. I'd also like to have Haddop support so I'll
 test HBase.


 ## Install HBase from source

```
wget http://apache.mirror3.ip-only.net/hbase/stable/hbase-0.94.5.tar.gz
tar -xzf hbase-0.94.5.tar.gz 
cd hbase-0.94.5

cat README.txt 
```


```
nano conf/hbase-site.xml


  <property>
    <name>hbase.rootdir</name>
    <value>file:///tmp/hbase</value>
  </property>
  <property>
    <name>hbase.zookeeper.property.dataDir</name>
    <value>/tmp/zookeeper</value>
  </property>
```

Let's try to start:

```
./bin/start-hbase.sh
```

Check the log file:

```
cat  /Users/jonas/local/hbase-0.94.5/bin/../logs/hbase-jonas-master-Gizur-Laptop-5.local.out
2013-03-12 13:59:26.806 java[5294:217] Unable to load realm info from SCDynamicStore
```


## Install HBase using brew


* http://jamil.fluidsoul.net/2011/06/28/getting-hbase-and-thrift-running-on-a-mac


```
brew install hbase
```

```
ls /usr/local/Cellar/hbase/0.94.4
ls /usr/local/bin/hbase*
```

```
nano /usr/local/Cellar/hbase/0.94.4/libexec/conf/hbase-site.xml 

  <property>
    <name>hbase.rootdir</name>
    <value>file:///tmp/hbase</value>
  </property>
  <property>
    <name>hbase.zookeeper.property.dataDir</name>
    <value>/tmp/zookeeper</value>
  </property>

```

Now start hbase:

```
export HADOOP_OPTS="-Djava.security.krb5.realm= -Djava.security.krb5.kdc="
/usr/local/Cellar/hbase/0.94.4/bin/start-hbase.sh 

/usr/local/Cellar/hbase/0.94.4/bin/stop-hbase.sh 
```

I'm getting the same error as above. This seams to be a Java/Kerberos related problem. 
OSX has JRE 1.6 and this is fixed in JRE 1.7. 


This don't work either


## HBase on Elastic Map Reduce (EMR)


AWS has a Hadoop and HBase service. This makes it easy to start a EC2-cluster with HBase.

See separate post from 130227 regarding howto get started with EMR. All that is needed in
addition is --hbase flag.


```
# Start new job
elastic-mapreduce --create --hbase --instance-type m1.large --alive

# Login using ssh
elastic-mapreduce --ssh --jobflow <JOBFLOWID>

# Start hbase shell
./bin/hbase shell
```


## Example using hbase


Start the hbase shell and run:


```
create 'table', 'column'

put 'table', 'key', 'column', 'value'

scan 'table'

get 'table', 'key'

``

