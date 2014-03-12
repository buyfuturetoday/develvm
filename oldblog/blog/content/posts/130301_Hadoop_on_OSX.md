Hadoop on OSX

[meta:author]: <> (Jonas Colmsjo)
[meta:title]: <> (Hadoop on OSX)
[meta:date]: <> (2013-03-01)
[meta:nested:key]: <> (Metadata value)

##!!truncate


Links:

* http://dennyglee.com/2012/05/08/installing-hadoop-on-osx-lion-10-7/


# Installation

Summary:

 * Java is needed
 * XCode is needed
 * brew is needed (and needs to be healty)  
 * remote login needs to be enabled



Check that java is installed:

```
Gizur-Laptop-5:cfengine jonas$ java -version
java version "1.6.0_41"
Java(TM) SE Runtime Environment (build 1.6.0_41-b02-445-11M4107)
Java HotSpot(TM) 64-Bit Server VM (build 20.14-b01-445, mixed mode)
```

Make sure that brew is ok


```
brew doctor
```

I always seams to have a lot of errors that I have to clean up. I won't show this.


Install Hadoop:

```
brew install hadoop
==> Downloading http://www.apache.org/dyn/closer.cgi?path=hadoop/core/hadoop-1.1.1/hadoop-1.1.1.tar.gz
==> Best Mirror http://apache.mirrors.spacedump.net/hadoop/core/hadoop-1.1.1/hadoop-1.1.1.tar.gz
######################################################################## 100,0%
==> Caveats
In Hadoop's config file:
  /usr/local/Cellar/hadoop/1.1.1/libexec/conf/hadoop-env.sh
$JAVA_HOME has been set to be the output of:
  /usr/libexec/java_home
==> Summary
🍺  /usr/local/Cellar/hadoop/1.1.1: 270 files, 75M, built in 113 seconds
```

/usr/local/Cellar/hadoop/1.1.1/libexec/conf/hadoop-env.sh:

```
export HADOOP_OPTS="-Djava.security.krb5.realm=OX.AC.UK -Djava.security.krb5.kdc=kdc0.ox.ac.uk:kdc1.ox.ac.uk"
```


/usr/local/Cellar/hadoop/1.1.1/libexec/conf/core-site.xml:

```
<?xml version="1.0"?>
<?xml-stylesheet type="text/xsl" href="configuration.xsl"?>

<!-- Put site-specific property overrides in this file. -->

<configuration>
    <property>
        <name>hadoop.tmp.dir</name>
        <value>/Users/${user.name}/hadoop-store</value>
        <description>A base for other temporary directories.</description>
    </property>
    <property>
        <name>fs.default.name</name>
        <value>hdfs://localhost:8020</value>
    </property>
</configuration>
```


/usr/local/Cellar/hadoop/1.1.1/libexec/conf/mapred-site.xml:

```
<?xml version="1.0"?>
<?xml-stylesheet type="text/xsl" href="configuration.xsl"?>

<!-- Put site-specific property overrides in this file. -->

<configuration>
    <property>
      <name>mapred.job.tracker</name>
      <value>localhost:9001</value>
    </property>

    <property>
        <name>mapred.tasktracker.map.tasks.maximum</name>
        <value>2</value>
    </property>

    <property>
        <name>mapred.tasktracker.reduce.tasks.maximum</name>
        <value>2</value>
    </property>
</configuration>
```


/usr/local/Cellar/hadoop/1.1.1/libexec/conf/hdfs-site.xml:

```
<?xml version="1.0"?>
<?xml-stylesheet type="text/xsl" href="configuration.xsl"?>

<!-- Put site-specific property overrides in this file. -->

<configuration>
    <property>
      <name>dfs.replication</name>
      <value>1</value>
    </property>
</configuration>
```


Start hadoop:

```
# Format and then exit
hadoop namenode -format
13/03/01 17:31:31 INFO namenode.NameNode: STARTUP_MSG: 
/************************************************************
STARTUP_MSG: Starting NameNode
STARTUP_MSG:   host = Gizur-Laptop-5.local/10.0.1.117
STARTUP_MSG:   args = [-format]
STARTUP_MSG:   version = 1.1.1
STARTUP_MSG:   build = https://svn.apache.org/repos/asf/hadoop/common/branches/branch-1.1 -r 1411108; compiled by 'hortonfo' on Mon Nov 19 10:48:11 UTC 2012
************************************************************/
Re-format filesystem in /Users/jonas/hadoop-store/dfs/name ? (Y or N) Y
13/03/01 17:31:37 INFO util.GSet: VM type       = 64-bit
13/03/01 17:31:37 INFO util.GSet: 2% max memory = 19.83375 MB
13/03/01 17:31:37 INFO util.GSet: capacity      = 2^21 = 2097152 entries
13/03/01 17:31:37 INFO util.GSet: recommended=2097152, actual=2097152
13/03/01 17:31:37 INFO namenode.FSNamesystem: fsOwner=jonas
13/03/01 17:31:37 INFO namenode.FSNamesystem: supergroup=supergroup
13/03/01 17:31:37 INFO namenode.FSNamesystem: isPermissionEnabled=true
13/03/01 17:31:37 INFO namenode.FSNamesystem: dfs.block.invalidate.limit=100
13/03/01 17:31:37 INFO namenode.FSNamesystem: isAccessTokenEnabled=false accessKeyUpdateInterval=0 min(s), accessTokenLifetime=0 min(s)
13/03/01 17:31:37 INFO namenode.NameNode: Caching file names occuring more than 10 times 
13/03/01 17:31:37 INFO common.Storage: Image file of size 111 saved in 0 seconds.
13/03/01 17:31:37 INFO namenode.FSEditLog: closing edit log: position=4, editlog=/Users/jonas/hadoop-store/dfs/name/current/edits
13/03/01 17:31:37 INFO namenode.FSEditLog: close success: truncate to 4, editlog=/Users/jonas/hadoop-store/dfs/name/current/edits
13/03/01 17:31:37 INFO common.Storage: Storage directory /Users/jonas/hadoop-store/dfs/name has been successfully formatted.
13/03/01 17:31:37 INFO namenode.NameNode: SHUTDOWN_MSG: 
/************************************************************
SHUTDOWN_MSG: Shutting down NameNode at Gizur-Laptop-5.local/10.0.1.117
************************************************************/

# Start some
/usr/local/Cellar/hadoop/1.1.1/bin/start-all.sh
Gizur-Laptop-5:dfs jonas$ /usr/local/Cellar/hadoop/1.1.1/bin/start-all.sh
starting namenode, logging to /usr/local/Cellar/hadoop/1.1.1/libexec/bin/../logs/hadoop-jonas-namenode-Gizur-Laptop-5.local.out
Password:
localhost: starting datanode, logging to /usr/local/Cellar/hadoop/1.1.1/libexec/bin/../logs/hadoop-jonas-datanode-Gizur-Laptop-5.local.out
Password:
localhost: starting secondarynamenode, logging to /usr/local/Cellar/hadoop/1.1.1/libexec/bin/../logs/hadoop-jonas-secondarynamenode-Gizur-Laptop-5.local.out
starting jobtracker, logging to /usr/local/Cellar/hadoop/1.1.1/libexec/bin/../logs/hadoop-jonas-jobtracker-Gizur-Laptop-5.local.out
Password:
localhost: starting tasktracker, logging to /usr/local/Cellar/hadoop/1.1.1/libexec/bin/../logs/hadoop-jonas-tasktracker-Gizur-Laptop-5.local.out


# Run example
hadoop jar /usr/local/Cellar/hadoop/1.1.1/libexec/hadoop-examples-1.1.1.jar pi 10 100
Number of Maps  = 10
Samples per Map = 100
Wrote input for Map #0
Wrote input for Map #1
Wrote input for Map #2
Wrote input for Map #3
Wrote input for Map #4
Wrote input for Map #5
Wrote input for Map #6
Wrote input for Map #7
Wrote input for Map #8
Wrote input for Map #9
Starting Job
13/03/01 17:34:38 INFO mapred.FileInputFormat: Total input paths to process : 10
13/03/01 17:34:39 INFO mapred.JobClient: Running job: job_201303011732_0001
13/03/01 17:34:40 INFO mapred.JobClient:  map 0% reduce 0%
13/03/01 17:34:45 INFO mapred.JobClient:  map 10% reduce 0%
13/03/01 17:34:46 INFO mapred.JobClient:  map 20% reduce 0%
13/03/01 17:34:49 INFO mapred.JobClient:  map 40% reduce 0%
13/03/01 17:34:52 INFO mapred.JobClient:  map 60% reduce 0%
13/03/01 17:34:54 INFO mapred.JobClient:  map 60% reduce 10%
13/03/01 17:34:55 INFO mapred.JobClient:  map 80% reduce 10%
13/03/01 17:34:57 INFO mapred.JobClient:  map 100% reduce 20%
13/03/01 17:35:00 INFO mapred.JobClient:  map 100% reduce 33%
13/03/01 17:35:02 INFO mapred.JobClient:  map 100% reduce 100%
13/03/01 17:35:03 INFO mapred.JobClient: Job complete: job_201303011732_0001
13/03/01 17:35:03 INFO mapred.JobClient: Counters: 27
13/03/01 17:35:03 INFO mapred.JobClient:   Job Counters 
13/03/01 17:35:03 INFO mapred.JobClient:     Launched reduce tasks=1
13/03/01 17:35:03 INFO mapred.JobClient:     SLOTS_MILLIS_MAPS=29317
13/03/01 17:35:03 INFO mapred.JobClient:     Total time spent by all reduces waiting after reserving slots (ms)=0
13/03/01 17:35:03 INFO mapred.JobClient:     Total time spent by all maps waiting after reserving slots (ms)=0
13/03/01 17:35:03 INFO mapred.JobClient:     Launched map tasks=10
13/03/01 17:35:03 INFO mapred.JobClient:     Data-local map tasks=10
13/03/01 17:35:03 INFO mapred.JobClient:     SLOTS_MILLIS_REDUCES=16443
13/03/01 17:35:03 INFO mapred.JobClient:   File Input Format Counters 
13/03/01 17:35:03 INFO mapred.JobClient:     Bytes Read=1180
13/03/01 17:35:03 INFO mapred.JobClient:   File Output Format Counters 
13/03/01 17:35:03 INFO mapred.JobClient:     Bytes Written=97
13/03/01 17:35:03 INFO mapred.JobClient:   FileSystemCounters
13/03/01 17:35:03 INFO mapred.JobClient:     FILE_BYTES_READ=226
13/03/01 17:35:03 INFO mapred.JobClient:     HDFS_BYTES_READ=2400
13/03/01 17:35:03 INFO mapred.JobClient:     FILE_BYTES_WRITTEN=264981
13/03/01 17:35:03 INFO mapred.JobClient:     HDFS_BYTES_WRITTEN=215
13/03/01 17:35:03 INFO mapred.JobClient:   Map-Reduce Framework
13/03/01 17:35:03 INFO mapred.JobClient:     Map output materialized bytes=280
13/03/01 17:35:03 INFO mapred.JobClient:     Map input records=10
13/03/01 17:35:03 INFO mapred.JobClient:     Reduce shuffle bytes=280
13/03/01 17:35:03 INFO mapred.JobClient:     Spilled Records=40
13/03/01 17:35:03 INFO mapred.JobClient:     Map output bytes=180
13/03/01 17:35:03 INFO mapred.JobClient:     Total committed heap usage (bytes)=1931190272
13/03/01 17:35:03 INFO mapred.JobClient:     Map input bytes=240
13/03/01 17:35:03 INFO mapred.JobClient:     Combine input records=0
13/03/01 17:35:03 INFO mapred.JobClient:     SPLIT_RAW_BYTES=1220
13/03/01 17:35:03 INFO mapred.JobClient:     Reduce input records=20
13/03/01 17:35:03 INFO mapred.JobClient:     Reduce input groups=20
13/03/01 17:35:03 INFO mapred.JobClient:     Combine output records=0
13/03/01 17:35:03 INFO mapred.JobClient:     Reduce output records=0
13/03/01 17:35:03 INFO mapred.JobClient:     Map output records=20
Job Finished in 24.631 seconds
Estimated value of Pi is 3.14800000000000000000


ps ax | grep hadoop | wc -l
# expected output is 6

```



