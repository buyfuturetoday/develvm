
---
layout: post
title: Setup AWS Elastic Beanstalk
date: 2012-08-10
author: Jonas Colmsjo
tags: ['post']
---

Get started with AWS EB





STATUS: This is still work in progress


AWS Elastic Beanstalk let's you deploy PHP applications in a kick. No need for installing servers with web servers etc. 
This is a short summary of how I got started deploying from Git into Beanstalk. I'm running Mac OSX but it will be pretty much the same
on any Linux flavour.

You need to sign up for a Amazon account if you don't already have one. 

See the AWS documentation for more details: 
  * http://docs.amazonwebservices.com/elasticbeanstalk/latest/dg/GettingStarted.html
  * http://aws.amazon.com/sdkforphp/

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


Initialize a git repository for Elastic Beanstalk and deploy a first version:
<pre>
cd ~/git/<whatever>

# Copy AWSDevTools-RepositorySetup.sh into the git repository (Part of AWS-ElasticBeanstalk-CLI-2.0.zip downloaded above)
sudo ./AWSDevTools-RepositorySetup.sh

sudo git aws.config
sudo git aws.push
</pre>


Probably not needed:
<pre>
sudo eb init
sudo eb status
sudo eb start
</pre>



Notes
----

*  It seams as though the credentials file not is used. Maybe this can be skipped?
