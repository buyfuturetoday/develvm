Riak CS docker container
=======================

Links:

 http://docs.basho.com/riakcs/latest/




Test setup
----------


```
curl -XPUT 'http://localhost:8098/riak/food/favorite' -H 'Content-Type:text/plain' -d 'pizza'

curl -XGET 'http://localhost:8098/riak/food/favorite'

```




SSL setup
--------

Generate self signed SSL certificate:

 1. Generate a random password: `date | md5sum`
 1. `openssl genrsa -des3 -out server.key 1024`
 1. `openssl req -new -key server.key -out server.csr`
 1. `cp server.key server.key.org`
 1. `openssl rsa -in server.key.org -out server.key`
 1. `openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt`
