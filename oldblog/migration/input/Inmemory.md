[[Main_Page]]


Det verkar finns en uppsjö olika InMemory / NopSQL databaser. För mina syften är det nog key/value stores som är mest aktuella. Här verkar Redis vara en någorlunda bra och enkel lösing.

Solutions:
* http://redis.io/ - Key/Value store
** C API är en parser för textsträngar som skickas och tas emot- Finns http://code.google.com/p/credis/
** Körs på en nod, Finns master-slave funktionalitet
* BSD license

* http://cassandra.apache.org/ - Key/Value store
** Utvecklat i Java
** Thrift API - http://thrift.apache.org/
** Går att distribuera på många noder
** Apache license, också tillåtande som BSD är

* http://www.couchbase.org/ - Document database, JSON objects
** http://docs.couchbase.org/couchbase-manual-2.0/index.html
** Key/Value store
** Innehåller även memcached
** Verkar vara "fetare" än Redis
** C API genom http://libmemcached.org/libMemcached.html



Tutorials:
* http://www.slideshare.net/tim.lossen.de/cassandra-vs-redis
* http://www.scribd.com/doc/33531219/Redis-Presentation
* http://simonwillison.net/static/2010/redis-tutorial/


Articles:
* http://spyced.blogspot.com/2008/12/couchdb-not-drinking-kool-aid.html
* http://natishalom.typepad.com/nati_shaloms_blog/2010/03/memory-is-the-new-disk-for-the-enterprise.html
* http://www.stanford.edu/~ouster/cgi-bin/papers/ramcloud.pdf
* http://nosql-database.org/
* LevelDB is not a database server like other other key-value stores like Redis or Membase.
* http://www.readwriteweb.com/hack/2011/07/google-open-sources-nosql-data.php
* http://www.basho.com/products_open_source.php
* http://research.yahoo.com/Web_Information_Management/YCSB


NoSQL databases with Python support:
*Most of the nosql databases have python clients which are actively supported. Pick your database based on your usage needs. Using it from python shouldn't be a problem.
*To name a few:
** Cassandra: https://github.com/pycassa/pycassa
** Riak: https://github.com/basho/riak-python-client
** MongoDB: http://api.mongodb.org/python/current/
** CouchDB: http://wiki.apache.org/couchdb/Getting_started_with_Python
** Redis: https://github.com/andymccurdy/redis-py
