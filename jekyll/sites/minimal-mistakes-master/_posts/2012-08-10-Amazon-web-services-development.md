---
layout: post
description: Amazon web services development
title: Amazon web services development
date: 2012-08-10
author: Jonas Colmsjo
tags: ['post']
---

Get started with AWS





## Elastic Beanstalk

* http://docs.amazonwebservices.com/elasticbeanstalk/latest/dg/Welcome.html

### Setup

<pre>
wget https://s3.amazonaws.com/elasticbeanstalk/cli/AWS-ElasticBeanstalk-CLI-2.0.zip
unzip -d ~/local/ AWS-ElasticBeanstalk-CLI-2.0.zip 
cd ~/local/AWS-ElasticBeanstalk-CLI-2.0

nano credentials
AWSAccessKeyId=Write your AWS access ID
AWSSecretKey=Write your AWS secret key

chmod 600 credentials

nano ~/.bash_profile
...
export AWS_CREDENTIAL_FILE=~/local/AWS-ElasticBeanstalk-CLI-2.0/credentials
export ELASTICBEANSTALK_URL=https://elasticbeanstalk.eu-west-1.amazonaws.com
export PATH=$PATH:~/local/AWS-ElasticBeanstalk-CLI-2.0/eb/macosx/python2.7

</pre>

Start a Elastic Beaanstalk server:

```
eb init
eb status
eb start
```


Initialize a git repository for Elastic Beanstalk and deploy a first version:
```
cd ~/git/<whatever>
sh ~/local/AWS-ElasticBeanstalk-CLI-2.0/AWSDevTools/Linux/AWSDevTools-RepositorySetup.sh 
git aws.config
git aws.push
```


