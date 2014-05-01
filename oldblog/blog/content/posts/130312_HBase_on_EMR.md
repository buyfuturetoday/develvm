HBase on Elastic Map Reduce

[meta:author]: <> (Jonas Colmsjo)
[meta:title]: <> (HBase on Elastic Map Reduce)
[meta:date]: <> (2013-03-12)
[meta:nested:key]: <> (Metadata value)

##!!truncate


## REST Connector


 * http://wiki.apache.org/hadoop/Hbase/Stargate


```
# Login using SSH
 elastic-mapreduce --ssh --jobflow <JOBFLOW>

# Start REST connector
./bin/hbase rest start -p 8080

```

Login to the AWS Console, goto EC2->Security Groups and open up port 8080 for everyone (Source 0.0.0.0)


```
# Simple test to see if we can connect
curl http://ec2-54-228-98-98.eu-west-1.compute.amazonaws.com:8080/version
```

```
curl -H "Accept: text/xml" http://ec2-54-228-98-98.eu-west-1.compute.amazonaws.com:8080/version
curl -H "Accept: application/json" http://ec2-54-228-98-98.eu-west-1.compute.amazonaws.com:8080/version
curl -H "Accept: application/x-protobuf" http://ec2-54-228-98-98.eu-west-1.compute.amazonaws.com:8080/version
```


```
# Get tables
curl -H "Accept: application/json" http://ec2-54-228-98-98.eu-west-1.compute.amazonaws.com:8080/

# Get schema for the table named table
curl -H "Accept: application/json" http://ec2-54-228-98-98.eu-west-1.compute.amazonaws.com:8080/table/schema
```


## View status on jobs


Configure FoxyProxy according to this article:

* http://docs.aws.amazon.com/ElasticMapReduce/latest/DeveloperGuide/emr-connect-master-node-foxy-proxy.html


```
ssh –i ~/keys/gc4-keypair1.pem  -ND 8157 hadoop@ec2-54-228-98-98.eu-west-1.compute.amazonaws.com

ssh -o ServerAliveInterval=10 -o StrictHostKeyChecking=no -ND 8157 -i ~/keys/gc4-keypair1.pem hadoop@ec2-54-228-98-98.eu-west-1.compute.amazonaws.com

```


Connect to the Hadoop URL: http://ec2-54-228-98-98.eu-west-1.compute.amazonaws.com:9100