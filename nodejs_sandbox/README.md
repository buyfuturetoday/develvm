Jacc - Just Another Cloud in the Cloud
======================================

Jacc is a private cloud built from standard components such as docker.io, hipache and redis-dns. Docker is a linux containers architecture and hipache a high perforamnce web proxy. redis-dns provides an internal DNS between containers. Docker and hipache are provided by the team behind the dotCloud service.

The goal is to provide an architecture suitable for hosting a variety of components on a limited amount of server. Examples of components could be web applications build in PHP/Java/NodeJS/Ruby/Python etc. It could also include databases, caching systems, queue management etc. The limit is really only Linux flavours that docker supports.


Installation
------------

Pre-requiresites:

 * docker
 * redis
 * NodeJS (preferabley managed with nvm)
 * make - for development only


Development
------------

First, setup a development server usinng the `Vagrantfile` by running `vagrant up ubuntu`. This requires that VirtutalBox is installed.

Jacc comes with a test suite. The first step when developing is to make sure that the test runs without any erros. Just run `make`.

The following environment vaiables needs to be set:

```
JACC_TEST_CONTAINERID
JACC_TEST_URL
JACC_TEST_PORT
JACC_TEST_DNS
```


Example configuration:

```
export JACC_TEST_CONTAINERID=$abcdefghijkl
export JACC_TEST_URL="app1.jacc.local"
export JACC_TEST_PORT="80"
export JACC_TEST_DNS="app1.local"
```

