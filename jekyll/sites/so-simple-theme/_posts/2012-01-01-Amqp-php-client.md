---
layout: post
description: Amqp
title: Amqp
date: 2012-01-01
author: Jonas Colmsjo
tags: ['post']
---

Yet another post





[[Wiki]]

h1. AMQP php client


<pre>
sudo apt-get install git-core php5-cli
cd dwnl
git clone http://github.com/videlalvaro/php-amqplib.git lib/php-amqplib

cd lib/php-amqplib
make

cd demo
nano config.php

# Send a message
php amqp_publisher.php "GizurCloud MQ server is working!!"

# Receive the message
php amqp_consumer.php

</pre>


* https://github.com/rabbitmq/rabbitmq-tutorials/tree/master/php

Some files tutorial to test with:
<pre>
cd ~
mkdir git && cd git
git clone https://github.com/rabbitmq/rabbitmq-tutorials/
</pre>
