
---
layout: post
title: Private NodeJS cloud and What
date: 2013-03-02
author: Jonas Colmsjo
tags: ['post']
---

Private NodeJS cloud and what's wrong with cfengine




# Links

 * https://github.com/nodejitsu/haibu
 * http://blog.nodejitsu.com/keep-a-nodejs-server-up-with-forever


# Introduction

With hosted app on Heroku, Nodejitsu, Elastic Beanstalk etc. is the need for CM tools far smaller.
Still, I'd like to have a private NodeJS cloud in AWS since I'm using many other AWS services (and
Amazon don't support NodeJS).

Cfengine is a configuration management tool. I am using cfengie but the code becomes bloated and 
diffcult to debug. The declarative, with so called promises, approach of cfengine if good in theory but it does not really work that well in practice. The different cfengine sections (files, commands, classes etc.) are evalutated in a given order which makes a big difference.


# Alternative approach

Can we skip CM tools like cfengine, Pupper and Chef? Let's try...

The framework used by Nodejitsu, Haidu, is open sourced:

 * https://github.com/nodejitsu/haibu
 * https://github.com/nodejitsu/forever-monitor

This make is easy to deploy apps to a private NodeJS server.

There is a nice tool that keeps NodeJS applications up and running. forever monitors apps and restarts them
if they die for some reason. This is also part of haibu.

```
npm install -g haibu
haibu
```


Deployment of new apps to haibu us easy:

```
cd path/to/your/app
tar -cz . | curl -XPOST -sSNT- localhost:9002/deploy/username/appname

# Example output
Gizur-Laptop-5:tmp2 jonas$ tar -cz . | curl -XPOST -sSNT- localhost:9002/deploy/jonas/testapp
{"drone":{"ctime":1362342842765,"command":"node","file":"/usr/local/lib/node_modules/haibu/node_modules/haibu-carapace/bin/carapace","foreverPid":79920,"options":["--plugin","net","/usr/local/lib/node_modules/haibu/local/jonas/testapp/jonas-testapp-1362342837949/app.js"],"pid":79959,"silent":true,"uid":"RdRe","spawnWith":{"cwd":"/usr/local/lib/node_modules/haibu/local/jonas/testapp/jonas-testapp-1362342837949","env":{"TERM_PROGRAM":"Apple_Terminal","SHELL":"/bin/bash","TERM":"xterm-256color","TMPDIR":"/var/folders/vn/5vzjp5bs21j0d82r53qzcvj00000gn/T/","Apple_PubSub_Socket_Render":"/tmp/launch-U5yItD/Render","AWS_API_KEY":"AKIAJWRED4WYJS43ELWQ","TERM_PROGRAM_VERSION":"309","TERM_SESSION_ID":"1B3A56BF-EC48-4044-8B00-F01A8554BB14","NVM_DIR":"/Users/jonas/git/local/nvm","USER":"jonas","COMMAND_MODE":"unix2003","GIZUR_CRASHLOGIO_SECRET":"aKt1khPsLUbvYCjDmESqfPz8zNAFeHYRiGVupub5vPAr","AWS_CREDENTIAL_FILE":"/Users/jonas/local/AWS-ElasticBeanstalk-CLI-2.0/credentials","SSH_AUTH_SOCK":"/tmp/launch-YfnyEQ/Listeners","Apple_Ubiquity_Message":"/tmp/launch-LZai6f/Apple_Ubiquity_Message","__CF_USER_TEXT_ENCODING":"0x1F5:0:7\n","ROS_OS_OVERRIDE":"osx:homebrew","PATH":"/Users/jonas/local2/adt-bundle-mac/sdk/tools:/Users/jonas/local2/adt-bundle-mac/sdk/platform-tools:/usr/local/heroku/bin:/usr/local/sbin:/usr/local/bin:/Users/jonas/scripts:/Users/jonas/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin:/opt/X11/bin:/Users/jonas/pear/bin:/Users/jonas/local/AWS-ElasticBeanstalk-CLI-2.0/eb/macosx/python2.7:/Users/jonas/local/elastic-mapreduce-ruby","PWD":"/Users/jonas","JAVA_HOME":"/System/Library/Java/JavaVirtualMachines/1.6.0.jdk/Contents/Home","LANG":"sv_SE.UTF-8","AWS_API_SECRET":"XP2sGuZwJEVseJjajflz1r5kFyfJ5jxY9MchgVsd","NODE_PATH":"/usr/local/lib/node_modules:/Users/jonas/node_modules:.","AWS_REGION":"EU_Ireland","HOME":"/Users/jonas","SHLVL":"1","LOGNAME":"jonas","DISPLAY":"/tmp/launch-4bwerA/org.macosforge.xquartz:0","GIZUR_CRASHLOGIO_TOKEN":"caa9f960-5afc-46b0-a4f1-2076c02f82c0","SECURITYSESSIONID":"186a4","ELASTICBEANSTALK_URL":"https://elasticbeanstalk.eu-west-1.amazonaws.com","OLDPWD":"/Users/jonas/.npm/haibu/0.9.9/package","_":"/usr/local/bin/haibu"},"stdio":["ipc","pipe","pipe"]},"env":"development","cwd":"/usr/local/lib/node_modules/haibu/local/jonas/testapp/jonas-testapp-1362342837949","repository":null,"port":8000,"host":"dynamic","hash":"4995e7d77e00a28c5610f1a4b0fc6a78aa84f1db","name":"testapp","user":"jonas"}}
```


## Monitoring and load balancing

In addition, we can add monitoring that sends mails etc. if an app don't send it's hearbeat. This can be
managed in godot:

 * https://github.com/nodejitsu/godot


We also need a way to make sure that our servers don't die on us. We should probably have a cluster that
is load balanced. The easiest way to achive this is to use Elastic Load Balancers (ELB). These are fault
tolerant so we don't need to worry abput that (several LB:s are used behind the scenes).

The old school way of doing this would be to use HAProxy and keepalived. This would requre some CM tool
to automate the installation though.


## Create cloud server

Links:

 * http://blog.nodejitsu.com/nodejs-cloud-server-in-three-minutes

Nodejitsu also provides tools for managing clouds like Rackspace etc:

 * https://github.com/nodejitsu/pkgcloud

The article above has a script that creates a new server, logs into it and installs node.


## Summary

This is how the architecutre looks:

```
DNS->ELB-->Node JS server 1 running haibu
        |->Node JS server 2 running haibu
```

The NodeJS apps should have forever-monitor and if required godot.


# More things to consider

With this approach, we need to keep track of which port that each app should use. Configuration like ports etc. that always change from installation to should preferably be handled in environment variables.

 * http://www.12factor.net/

Other configuration can be handled using config files etc:

 * http://docs.nodejitsu.com/articles/file-system/how-to-store-local-config-data






