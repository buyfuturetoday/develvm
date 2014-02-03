#!/bin/bash

# Start postgres
# postgres -c /usr/lib/postgresql/9.1/bin/postgres -D /var/lib/postgresql/9.1/main -c config_file=/etc/postgresql/9.1/main/postgresql.conf
service postgresql start 

# Start postfix
service syslog-ng start ; service postfix start

# start redis
# service redis-server start
/usr/bin/redis-server &> /dev/null

# start nginx
service nginx start

# supervisord -n

echo 'alias bluepill="NOEXEC_DISABLE=1 bluepill --no-privileged -c ~/.bluepill"' >> ~/.bash_aliases

. /etc/profile.d/rvm.sh
rvm use 2.0.0 --default
rvm wrapper $(rvm current) bootup bluepill
rvm wrapper $(rvm current) bootup bundle

RUBY_GC_MALLOC_LIMIT=90000000 RAILS_ROOT=/var/www/discourse RAILS_ENV=production NUM_WEBS=2 bluepill --no-privileged -c ~/.bluepill load /var/www/discourse/config/discourse.pill
