
---
layout: post
title: Manage cloud clusters with Whirr
date: 2013-03-19
author: Jonas Colmsjo
---

Manage cloud clusters with Whirr





Links:

 * http://whirr.apache.org/docs/0.8.1/whirr-in-5-minutes.html


# Install from source

```
cd ~/local
wget http://apache.mirrors.spacedump.net/whirr/whirr-0.8.1/whirr-0.8.1.tar.gz
tar -xzf whirr-0.8.1.tar.gz
cd whirr-0.8.1

ssh-keygen -t rsa -P '' -f ~/.ssh/id_rsa_whirr 

mkdir ~/.whirr
cp conf/credentials.sample ~/.whirr/credentials

nano ~/.whirr/credentials


#
# Change IDENTITY and CREDENTIAL to the API Key and Secret
#

PROVIDER=aws-ec2
IDENTITY=<AWS_API_KEY>
CREDENTIAL=<AWS_API_SECRET>

# This is the config file
cat recipes/zookeeper.properties

# Now start a cluster
bin/whirr launch-cluster --config recipes/zookeeper.properties --private-key-file ~/.ssh/id_rsa_whirr

# Show what is running
bin/whirr list-cluster --config recipes/zookeeper.properties

# Shut down cluster
bin/whirr destroy-cluster --config recipes/zookeeper.properties
```


# Install using brew

```
brew info whirr

brew install whirr
```





