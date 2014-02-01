#!/bin/bash

# postgres -c /usr/lib/postgresql/9.1/bin/postgres -D /var/lib/postgresql/9.1/main -c config_file=/etc/postgresql/9.1/main/postgresql.conf

# These don't work with supervisor
service syslog-ng start ; service postfix start

supervisord -n
