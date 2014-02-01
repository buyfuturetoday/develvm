#!/bin/bash

# Start postgres
# postgres -c /usr/lib/postgresql/9.1/bin/postgres -D /var/lib/postgresql/9.1/main -c config_file=/etc/postgresql/9.1/main/postgresql.conf
service postgresql start 

# Start postfix
service syslog-ng start ; service postfix start

# start redis
service redis-server start

# start nginx
service nginx start

# supervisord -n
