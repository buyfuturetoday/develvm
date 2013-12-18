
---
layout: post
title: Hosted vs
date: 2013-03-12
author: Jonas Colmsjo
---

Hosted vs. private Cassandra NoSQL DB 





Alternatives:

 * http://cassandra.io/ - smallest setup `Mira 4` costs $1810 /month


Links:

 * http://www.slideshare.net/davegardnerisme/running-cassandra-on-amazon-ec2
 * http://www.cloudcomputingetc.com/2012/10/cassandraio-hosted-cassandra-up-to-10tb.html



## Setup on private server


* http://wiki.apache.org/cassandra/GettingStarted

```
cd ~/local
wget http://apache.mirrors.spacedump.net/cassandra/1.2.2/apache-cassandra-1.2.2-bin.tar.gz
gunzip apache-cassandra-1.2.2-bin.tar.gz 
tar -xf apache-cassandra-1.2.2-bin.tar
cd apache-cassandra-1.2.2/


cat README.txt 

# We should do these steps according to the README
sudo mkdir -p /var/log/cassandra
sudo chown -R `whoami` /var/log/cassandra
sudo mkdir -p /var/lib/cassandra
sudo chown -R `whoami` /var/lib/cassandra


# Let's try to start
./bin/cassandra -f
```


An example of usage coped from the README file:

```
# Open a new shell and run some queries
./bin/cqlsh

  cqlsh> CREATE SCHEMA schema1 
         WITH replication = { 'class' : 'SimpleStrategy', 'replication_factor' : 1 };
  cqlsh> USE schema1;
  cqlsh:Schema1> CREATE TABLE users (
                   user_id varchar PRIMARY KEY,
                   first varchar,
                   last varchar,
                   age int
                 );
  cqlsh:Schema1> INSERT INTO users (user_id, first, last, age) 
                 VALUES ('jsmith', 'John', 'Smith', 42);
  cqlsh:Schema1> SELECT * FROM users;
   user_id | age | first | last
  ---------+-----+-------+-------
    jsmith |  42 |  john | smith

  cqlsh:Schema1> 
```







