---
layout: post
description: Rabbitmq
title: Rabbitmq
date: 2012-01-01
author: Jonas Colmsjo
tags: ['post']
---

Yet another post





[[wiki]] > [[Technical Architecture]] > [[Execution Architecture]]


h1. RabbitMQ configuration routine

* http://www.rabbitmq.com/configure.html

<pre>
rabbitmq-plugins list

service rabbitmq-server status

rabbitmq-plugins enable rabbitmq_management

service rabbitmq-server restart

rabbitmq-plugins list
</pre>


h2. Users

* http://www.rabbitmq.com/man/rabbitmqctl.1.man.html

<pre>
root@rabbit-1:~# rabbitmqctl list_users
Listing users ...
scalr	[administrator]
...done.


rabbitmqctl add_user admin XXXXX
rabbitmqctl set_user_tags admin administrator

</pre>


h2. Management Console

* http://www.rabbitmq.com/management.html


Open http://mq.gizurcloud.com:55672/mgmt/

