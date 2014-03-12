Hive on OSX

[meta:author]: <> (Jonas Colmsjo)
[meta:title]: <> (Hive on OSX)
[meta:date]: <> (2013-03-19)
[meta:nested:key]: <> (Metadata value)

##!!truncate


Pre-requistes:

 * Hadoop needs to be installed


Links:

 * http://blog.zhengdong.me/2012/02/22/hive-external-table-with-partitions/
 * https://cwiki.apache.org/Hive/hiveodbc.html



## Introduction


Make sure that hadoop is upa and runnig

```
# Check if hadoop is running
hadoop fs -ls ~/hadoop-store/

# If not, start hadoop
/usr/local/Cellar/hadoop/1.1.1/bin/start-all.sh
```


## Install Hive

Just do this:

```
brew install hive

# check where hive is located
which hive
/usr/local/bin/hive

# Simple check that things are up
ps ax | grep hadoop | wc -l
# expected output is 7
```

Start a hive Thrift server:

```
hive --service hiveserver
```


## Simple Hive table


```
# Create a Hadoop folder
hadoop fs -mkdir ~/hadoop-store/mapred/hive-example

# Create a data file
echo -e "jim=89347\ndave=313925\nnoddy=21516\ndon=6771" > data.txt

# Copy the input file to Hadoop
hadoop fs -copyFromLocal data.txt ~/hadoop-store/mapred/hive-example

# check that is there
hadoop fs -ls ~/hadoop-store/mapred/hive-example

# show the contents using the same URI as Hive
hadoop fs -cat hdfs://localhost/Users/jonas/hadoop-store/mapred/hive-example/data.txt
```

Start a hive session. Test the thrift network connection using `hive -h localhost`

```
hive

hive> show tables;
OK
Time taken: 4.734 seconds
hive> show functions;
OK
!
!=
%
...
```

Create an external table:

```
 CREATE EXTERNAL TABLE mydata1 (key STRING, value INT)
    ROW FORMAT DELIMITED FIELDS TERMINATED BY '='
    LOCATION 'hdfs://localhost/Users/jonas/hadoop-store/mapred/hive-example/';

hive> select * from mydata1;
OK
jim 89347
dave    313925
noddy   21516
don 6771
Time taken: 0.279 seconds
```


## Check ODBC setup


I have unixodbc installed (do `brew install unixodbc` if you don't):

```
Gizur-Laptop-5:node jonas$ brew info unixodbc
unixodbc: stable 2.3.1
http://www.unixodbc.org/
/usr/local/Cellar/unixodbc/2.3.1 (26 files, 920K) *
https://github.com/mxcl/homebrew/commits/master/Library/Formula/unixodbc.rb
```


```
Gizur-Laptop-5:node jonas$ odbcinst

**********************************************
* unixODBC - odbcinst                        *
**********************************************
*                                            *
* Purpose:                                   *
*                                            *
*      An ODBC Installer and Uninstaller.    *
*      Updates system files, and             *
*      increases/decreases usage counts but  *
*      does not actually copy or remove any  *
*      files.                                *
*                                            *
* Syntax:                                    *
*                                            *
*      odbcinst Action Object Options        *
*                                            *
* Action:                                    *
*                                            *
*      -i         install                    *
*      -u         uninstall                  *
*      -q         query                      *
*      -j         print config info          *
*      -c         call SQLCreateDataSource   *
*      -m         call SQLManageDataSources  *
*      --version  version                    *
*                                            *
* Object:                                    *
*                                            *
*      -d driver                             *
*      -s data source                        *
*                                            *
* Options:                                   *
*                                            *
*      -f file name of template.ini follows  *
*         this (valid for -i)                *
*      -r get template.ini from stdin, not   *
*         a template file                    *
*      -n Driver or Data Source Name follows *
*      -v turn verbose off (no info, warning *
*         or error msgs)                     *
*      -l system dsn                         *
*      -h user dsn                           *
*                                            *
* Returns:                                   *
*                                            *
*      0   Success                           *
*     !0   Failed                            *
*                                            *
* Please visit;                              *
*                                            *
*      http://www.unixodbc.org               *
*      pharvey@codebydesign.com              *
**********************************************
```

```
Gizur-Laptop-5:node jonas$ odbcinst -j
unixODBC 2.3.1
DRIVERS............: /usr/local/Cellar/unixodbc/2.3.1/etc/odbcinst.ini
SYSTEM DATA SOURCES: /usr/local/Cellar/unixodbc/2.3.1/etc/odbc.ini
FILE DATA SOURCES..: /usr/local/Cellar/unixodbc/2.3.1/etc/ODBCDataSources
USER DATA SOURCES..: /Users/jonas/.odbc.ini
SQLULEN Size.......: 8
SQLLEN Size........: 8
SQLSETPOSIROW Size.: 8
```

NOTE: I can't find libodbchive.so anywhere. I think I have to build hive and ODBC myself...



## Build hive


Check version of hadoop:

```
Gizur-Laptop-5:2.3.1 jonas$ brew info hadoop
hadoop: stable 1.1.1
http://hadoop.apache.org/
/usr/local/Cellar/hadoop/1.1.1 (416 files, 81M) *
https://github.com/mxcl/homebrew/commits/master/Library/Formula/hadoop.rb
==> Caveats
In Hadoop's config file:
  /usr/local/Cellar/hadoop/1.1.1/libexec/conf/hadoop-env.sh
$JAVA_HOME has been set to be the output of:
  /usr/libexec/java_home
```

From Hive 0.10 Release notes:

 * This release is the latest release of Hive and it works with Hadoop 0.20.x, 0.23.x.y, 1.x.y, 2.x.y



Tried to download binaries but could not find libodbchive.so:

```
wget http://apache.mirrors.spacedump.net/hive/hive-0.10.0/hive-0.10.0-bin.tar.gz

tar -xzf hive-0.10.0-bin.tar.gz 

export HIVE_HOME=`pwd`
export PATH=$HIVE_HOME/bin:$PATH
```


Let's try to build from source:

```
svn co http://svn.apache.org/repos/asf/hive/trunk hive
cd hive
ant clean package
cd build/dist
ls
```


Set HIVE_HOME and PATH to this new installation:

```
cd ../..
export HIVE_HOME=`pwd`
export PATH=$HIVE_HOME/bin:$PATH
```

Also tmp and the hive warehouse folders needs to be created:

```
hadoop fs -mkdir       /tmp
hadoop fs -mkdir       /user/hive/warehouse
hadoop fs -chmod g+w   /tmp
hadoop fs -chmod g+w   /user/hive/warehouse
```

Thrift is needed in order to build the hive client.


## Install thrift


The ODBC wrapper is built on top of the thrift client.

I'm installing with brew. Information on building from source is found here:

 * http://thrift.apache.org/
 * http://wiki.apache.org/thrift/ThriftInstallation


```
brew info thrift

brew install thrift --with-java
```


An alternative is to install from source (need to install boost and libevent first). I'll skip this...

```
wget https://dist.apache.org/repos/dist/release/thrift/0.9.0/thrift-0.9.0.tar.gz

```


## Build Hive client

Check thrift home:

```
Gizur-Laptop-5:thrift-0.9.0 jonas$ brew info thrift
thrift: stable 0.9.0, HEAD
http://thrift.apache.org
Depends on: boost
/usr/local/Cellar/thrift/0.9.0 (244 files, 9,2M) *
  Installed with: --with-java
```


```
cd hive

ant compile-cpp -Dthrift.home=/usr/local/Cellar/thrift/0.9.0
```

Build failed. I'm giving up for now...


## Hortonworks ODBC driver

The Hortonworks Hadoop distribution contains a number of ODBC drivers (also OSX).

An ODBC driver manager is needed, for instance:

 * http://www.iodbc.org/


Run the installation and the Hortonworks ODBC driver is installed here:

 * /usr/lib/hive/lib/native/hiveodbc


Documentation:

 * https://www.google.se/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&ved=0CC8QFjAA&url=http%3A%2F%2Fhortonworks.com%2Fwp-content%2Fuploads%2F2012%2F10%2FHortonworks-Hive-ODBC-Driver-User-Guide.pdf&ei=P7hJUbO_OcqJtAa1kYCYCA&usg=AFQjCNFpZCPYkfkNPkcq1COXrs9yGTp4bQ&bvm=bv.44011176,d.Yms


Put this in your .bash_profile etc.

```
# check where your ODBC driver manager is installed and correct accordingly, I'm using iODBC
export DYLD_LIBRARY_PATH=$DYLD_LIBRARY_PATH:/usr/lib/hive/lib/native/universal:/usr/local/iODBC/lib
```

### Setup odbc.ini

```
cat ~/.odbc.ini

cat Setup/odbc.ini

nano ~/.odbc.ini


[ODBC]
InstallDir=/usr/local/iODBC

[ODBC Data Sources]
Sample Hortonworks Hive DSN=Hortonworks Hive ODBC Driver 32-bit

[Sample Hortonworks Hive DSN]
Driver=/usr/lib/hive/lib/native/universal/llibhortonworkshiveodbc.dylib
HOST=localhost
PORT=10000
```


### Setup hortonworks.hiveodbc.ini


```
cat Setup/hortonworks.hiveodbc.ini

cp Setup/hortonworks.hiveodbc.ini ~/.hortonworks.hiveodbc.ini

nano ~/.hortonworks.hiveodbc.ini 
```


#### Setup .odbcinst.ini

```
cp Setup/odbcinst.ini ~/.odbcinst.ini 
```




