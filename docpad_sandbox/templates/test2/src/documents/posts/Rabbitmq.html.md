
---
layout: post
title: Rabbitmq
date: 2012-01-01
author: Jonas Colmsjo
tags: ['post']
---

Yet another post





[[Main_Page]]


== Enable web interface ==

* http://www.rabbitmq.com/plugins.html

<pre>
root@rabbit-1:~# rabbitmq-plugins list
[ ] amqp_client                       2.7.1
[ ] eldap                             2.7.1-git
[ ] erlando                           2.7.1
[ ] mochiweb                          1.3-rmq2.7.1-git
[ ] rabbitmq_auth_backend_ldap        2.7.1
[ ] rabbitmq_auth_mechanism_ssl       2.7.1
[ ] rabbitmq_consistent_hash_exchange 2.7.1
[ ] rabbitmq_federation               2.7.1
[ ] rabbitmq_jsonrpc                  2.7.1
[ ] rabbitmq_jsonrpc_channel          2.7.1
[ ] rabbitmq_jsonrpc_channel_examples 2.7.1
[ ] rabbitmq_management               2.7.1
[E] rabbitmq_management_agent         2.7.1
[ ] rabbitmq_management_visualiser    2.7.1
[ ] rabbitmq_mochiweb                 2.7.1
[ ] rabbitmq_shovel                   2.7.1
[ ] rabbitmq_shovel_management        2.7.1
[ ] rabbitmq_stomp                    2.7.1
[ ] rabbitmq_tracing                  2.7.1
[ ] rfc4627_jsonrpc                   2.7.1-git
[ ] webmachine                        1.7.0-rmq2.7.1-hg

root@rabbit-1:~# service rabbitmq-server status
Status of node 'rabbit@rabbit-1' ...
[{pid,1462},
 {running_applications,
     [{rabbitmq_management_agent,"RabbitMQ Management Agent","2.7.1"},
      {rabbit,"RabbitMQ","2.7.1"},
      {mnesia,"MNESIA  CXC 138 12","4.4.12"},
      {os_mon,"CPO  CXC 138 46","2.2.4"},
      {sasl,"SASL  CXC 138 11","2.1.8"},
      {stdlib,"ERTS  CXC 138 10","1.16.4"},
      {kernel,"ERTS  CXC 138 10","2.13.4"}]},
 {os,{unix,linux}},
 {erlang_version,
     "Erlang R13B03 (erts-5.7.4) [source] [rq:1] [async-threads:30] [hipe] [kernel-poll:true]\n"},
 {memory,
     [{total,12984120},
      {processes,4982728},
      {processes_used,4973592},
      {system,8001392},
      {atom,736561},
      {atom_used,727757},
      {binary,63096},
      {code,6077475},
      {ets,377604}]},
 {vm_memory_high_watermark,0.3999999997777084},
 {vm_memory_limit,719775334}]
...done.

rabbitmq-plugins enable rabbitmq_management
service rabbitmq-server restart
</pre>

== Users ==

* http://www.rabbitmq.com/man/rabbitmqctl.1.man.html

<pre>
root@rabbit-1:~# rabbitmqctl list_users
Listing users ...
scalr	[administrator]
...done.


rabbitmqctl add_user admin XXXXX
rabbitmqctl set_user_tags admin administrator

</pre>
