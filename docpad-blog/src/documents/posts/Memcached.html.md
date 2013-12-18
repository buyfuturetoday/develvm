
---
layout: post
title: Memcached
date: 2012-01-01
author: Jonas Colmsjo
tags: ['post']
---

Yet another post





h1. Memcached

* http://memcached.org/
* http://code.google.com/p/memcached/wiki/NewInstallFromPackage


<pre>
apt-get install memcached
</pre>


Check that its running:
<pre>
service memcached status

memcached -h
</pre>

Check settings:
<pre>
echo "stats settings" | nc localhost 11211
STAT maxbytes 67108864
STAT maxconns 1024
STAT tcpport 11211
STAT udpport 11211
STAT inter 127.0.0.1
STAT verbosity 0
STAT oldest 0
STAT evictions on
STAT domain_socket NULL
STAT umask 700
STAT growth_factor 1.25
STAT chunk_size 48
STAT num_threads 4
STAT stat_key_prefix :
STAT detail_enabled no
STAT reqs_per_event 20
STAT cas_enabled yes
STAT tcp_backlog 1024
STAT binding_protocol auto-negotiate
STAT item_size_max 1048576
END
</pre>


h2. PHP client

* http://php.net/manual/en/intro.memcache.php
* IMPORTANT - http://stackoverflow.com/questions/1825256/memcache-vs-memcached

<pre>
apt-get install php5-memcached

# alternative
apt-get install php5-memcache
</pre>

Example:
* http://www.php.net/manual/en/memcache.examples-overview.php

<pre>
nano memcache-example.php

<?php

$memcache = new Memcache;
$memcache->connect('localhost', 11211) or die ("Could not connect");

$version = $memcache->getVersion();
echo "Server's version: ".$version."<br/>\n";

$tmp_object = new stdClass;
$tmp_object->str_attr = 'test';
$tmp_object->int_attr = 123;

$memcache->set('key', $tmp_object, false, 10) or die ("Failed to save data at the server");
echo "Store data in the cache (data will expire in 10 seconds)<br/>\n";

$get_result = $memcache->get('key');
echo "Data from the cache:<br/>\n";

var_dump($get_result);

?>

php memcache-example.php
PHP Deprecated:  Comments starting with '#' are deprecated in /etc/php5/cli/conf.d/imap.ini on line 1 in Unknown on line 0
PHP Deprecated:  Comments starting with '#' are deprecated in /etc/php5/cli/conf.d/mcrypt.ini on line 1 in Unknown on line 0
Server's version: 1.4.2<br/>
Store data in the cache (data will expire in 10 seconds)<br/>
Data from the cache:<br/>
class stdClass#3 (2) {
  public $str_attr =>
  string(4) "test"
  public $int_attr =>
  int(123)
}
</pre>
