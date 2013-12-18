---
layout: post
title: An OS for containers
date: 2013-08-13
author: Jonas Colmsjo
tags: ['post']
---


Links:
 * coreos.com


CoreOS is extremely slim OS where package management is handled through linux containers. Docker, which is a container management system running on top of LXC, is the only way new packages can be installed. In addition are there two technologies, etcd and systemd, and nothing more.

## systemd

Links:

 * http://0pointer.de/blog/projects/systemd-for-admins-2.html
 * http://fedoraproject.org/wiki/Systemd

systemd is a new replacement for linux init with some nice feature. One exaple is that systemd can spawn cotainers when a request reaches it's socket. This is a good way of saving system resources.

Running `systemctl` will the staus of all services. `systemctl -h` shows the available options.

Show which service that a process belongs to: `alias psc='ps xawf -eo pid,user,cgroup,args'`


 ## etcd

 etcd is a 'highly-available key value store for shared configuration and service discovery'. The key values are automatically replicated among the servers in a cluster.

 Some examples from coreos's web site:


 ```
#Setting a key on /foo/bar:

etcdctl set /foo/bar "Hello world"
Hello world

#Getting a key:
etcdctl get /foo/bar
Hello world

#Deleting a key:
etcdctl delete /foo/bar
Hello world
 ```


