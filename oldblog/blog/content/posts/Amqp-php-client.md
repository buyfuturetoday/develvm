Yet another post

[meta:author]: <> (Jonas Colmsjo)
[meta:title]: <> (Amqp-php-client.md)
[meta:date]: <> (2012-01-01)
[meta:nested:key]: <> (Metadata value)

##!!truncate


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