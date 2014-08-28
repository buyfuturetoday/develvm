MySQL, apache and phpMyAdmin container
====================================

1. Update `src-vtiger/config.inc.php` with MySQL credentials and web server configuration.
The defaults should be ok for development but should be changed for prodiuction.
There are three different database dumps for development. See `src-mysql/mysql-setup.sh`
for credentials.

2. Build the container: `docker build --rm .`

3. Start a container: `docker run -d -p 80:80 [IMAGE ID]`


MySQL
-----

MySQL credentials:

 * admin / mysql-server
 * gizur_com / 48796e76


Development environemnet
-----------------------

Login to phpMyAdmin at: `http://localhost:PORT/phpMyAdmin-4.0.8-all-languages`

Monitoring is enabled and accessable from the network 172.0.0.0/8 (change this is status.conf if your network 
settings differ).

Install lynx and start:

```
apt-get install -y lynx
lynx http://localhost/server-status
```

It is usefull to connect with a shell when debugging: `docker run -t -i --rm -p 80:80 -v /volume/volume [IMAGE ID] /bin/bash`

Then start things up with: `supervisord &> /tmp/out.txt &`







