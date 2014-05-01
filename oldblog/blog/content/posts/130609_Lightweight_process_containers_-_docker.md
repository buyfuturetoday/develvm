Lightweight process containers - docker

[meta:author]: <> (Jonas Colmsjo)
[meta:title]: <> (Lightweight process containers - docker)
[meta:date]: <> (2013-06-09)
[meta:nested:key]: <> (Metadata value)

##!!truncate


## Overview

Heroku provides an extremely easy to use technology for hosting web apps based on dynos (linux containers). Amazon Web Services (AWS) provdies full virtuals servers with fir more advanced security mechanisms and even the possibility to have VPN connections. AWS also provides a wide array of hosted servises, like RDS, SES, SQS etc. etc. Elastic Beanstalk provides similar solutions to Heroku with the advantage of AWS security and isolation.

The drawback og AWS and Elastic Beanstalk is that it becomes fairly expensive when using several development languages (like PHP, Node and Python) since a EB instance only can run one language.

I'm looking for a solution where I can run several web apps in one and same ec2 virtual machine.

lxc provides containers for processes running under linux. These are much more lightweight that full VMs. lxc is for instance used by Heroku in their cloud solution. Docker is a, open source, solution built on top of lxc that is used by docCloud. docCloud makes it possible to combine different technologies (php, node, python, perl etc.) in one environment.


## First test on OSX

I'm simply following this:

 * http://docs.docker.io/en/latest/installation/vagrant/

First install VirtualBox and Vagrantup.


This will take a while:

```
git clone https://github.com/dotcloud/docker.git
cd docker
vagrant up
vagrant reload
```

```
vagrant ssh
docker
```


```
docker pull base
docker run -i -t base /bin/bash
root@8088365a71c3:/# ls
bin  boot  dev  etc  home  lib  lib64  media  mnt  opt  proc  root  run  sbin  selinux  srv  sys  tmp  usr  var
root@8088365a71c3:/# ps -ef
UID        PID  PPID  C STIME TTY          TIME CMD
root         1     0  0 22:28 ?        00:00:00 /bin/bash
root         9     1  0 22:28 ?        00:00:00 ps -ef
root@8088365a71c3:/# exit
exit
```


```
# Start a very useful long-running process
JOB=$(docker run -d base /bin/sh -c "while true; do echo Hello world; sleep 1; done")

# Collect the output of the job so far
docker logs $JOB

# show containers
docker ps

docker stop ...

docker export ... > mycontainer.tar

cat mycontainer.tar | docker import - node010

docker images

# Kill the job
docker kill $JOB
```

## More on lxc

Links:

 * https://help.ubuntu.com/12.04/serverguide/lxc.html



