#!/bin/bash

# Start redis
/usr/bin/redis-server &> /dev/null &

# Start Postgres
/bin/su postgres -c "/usr/lib/postgresql/9.1/bin/postgres -D /var/lib/postgresql/9.1/main -c config_file=/etc/postgresql/9.1/main/postgresql.conf" &
sleep 5

# Create user and database root, perhaps not needed?
echo "CREATE ROLE root WITH SUPERUSER CREATEDB LOGIN PASSWORD '';create database root with owner=root encoding='UTF8' template=template0;\q"|/bin/su postgres -c "psql -U postgres"

echo "CREATE ROLE discourse WITH SUPERUSER CREATEDB LOGIN PASSWORD '';create database discourse_prod with owner=discourse encoding='UTF8' template=template0;\q"|/bin/su postgres -c "psql -U postgres"

echo "SELECT rolname FROM pg_roles;\q"|/bin/su postgres -c "psql -U postgres"

# Init discourse db
. /etc/profile.d/rvm.sh
rvm use 2.0.0 --default
cd /var/www/discourse
createdb discourse_prod
RUBY_GC_MALLOC_LIMIT=90000000 RAILS_ENV=production bundle exec rake db:migrate
RUBY_GC_MALLOC_LIMIT=90000000 RAILS_ENV=production bundle exec rake assets:precompile

# Stop Postgres
/bin/su postgres -c "/usr/sbin/service postgresql stop"
sleep 5




