Discourse discussion platform
==============================


https://github.com/discourse/discourse




Postgres
--------

Simple postgres setup. Perhaps not commonly used in production.


/etc/postgresql/9.1/main/postgresql.conf:

```
listen_addresses = '*'

```


/etc/postgresql/9.1/main/pg_hba.conf:

```
# Database administrative login by Unix domain socket
local all postgres peer
host all postgres 0.0.0.0/0 trust

# TYPE DATABASE USER ADDRESS METHOD

# "local" is for Unix domain socket connections only
local all all trust

# IPv4 local connections:
host all all 127.0.0.1/32 trust
host all all 0.0.0.0/0 trust

# IPv6 local connections:
host all all ::1/128 trust
```
