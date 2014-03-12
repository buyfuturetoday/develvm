Time to do some performance analysis for PHP apps

[meta:author]: <> (Jonas Colmsjo)
[meta:title]: <> (Performance analysis in PHP)
[meta:date]: <> (2012-08-22)
[meta:nested:key]: <> (Metadata value)

##!!truncate


xdebug has profiler for performance analysis, I though I'd test this. Documentation:

 * http://xdebug.org/docs/profiler

## Install xdebug

I have a Elastic Beanstalk server running in AWS. Amazon Linux seams to be CentOS/Redhat based soo packages are installed using yum. 

NOTE: You need to assign a keypair to the server in order to be able to login (using the private key in the keypair).

```
[ec2-user@ip-10-234-213-53: ~] $ yum search xdebug
Loaded plugins: fastestmirror, priorities, security, update-motd
Loading mirror speeds from cached hostfile
 * amzn-main: packages.eu-west-1.amazonaws.com
 * amzn-updates: packages.eu-west-1.amazonaws.com
============================================= N/S Matched: xdebug =============================================
php-pecl-xdebug.x86_64 : PECL package for debugging PHP scripts

  Name and summary matches only, use "search all" for everything.

```

xdebug is available as a PECL package so itcan probably be installed with PECL as well:
```
[ec2-user@ip-10-234-213-53: ~] $ pecl search xdebug
WARNING: channel "pecl.php.net" has updated its protocols, use "pecl channel-update pecl.php.net" to update
Retrieving data...0%
Matched packages, channel pecl.php.net:
=======================================
Package Stable/(Latest) Local
xdebug  2.2.1 (stable)  2.1.2 Provides functions for function traces and profiling
```


I'll install with PECL:
```
sudo pecl install xdebug

...

  +----------------------------------------------------------------------+
  |                                                                      |
  |   INSTALLATION INSTRUCTIONS                                          |
  |   =========================                                          |
  |                                                                      |
  |   See http://xdebug.org/install.php#configure-php for instructions   |
  |   on how to enable Xdebug for PHP.                                   |
  |                                                                      |
  |   Documentation is available online as well:                         |
  |   - A list of all settings:  http://xdebug.org/docs-settings.php     |
  |   - A list of all functions: http://xdebug.org/docs-functions.php    |
  |   - Profiling instructions:  http://xdebug.org/docs-profiling2.php   |
  |   - Remote debugging:        http://xdebug.org/docs-debugger.php     |
  |                                                                      |
  |                                                                      |
  |   NOTE: Please disregard the message                                 |
  |       You should add "extension=xdebug.so" to php.ini                |
  |   that is emitted by the PECL installer. This does not work for      |
  |   Xdebug.                                                            |
  |                                                                      |
  +----------------------------------------------------------------------+


running: find "/var/tmp/pear-build-rootBt1Sib/install-xdebug-2.2.1" | xargs ls -dils
145600   4 drwxr-xr-x 3 root root   4096 22 aug 10.22 /var/tmp/pear-build-rootBt1Sib/install-xdebug-2.2.1
145656   4 drwxr-xr-x 3 root root   4096 22 aug 10.22 /var/tmp/pear-build-rootBt1Sib/install-xdebug-2.2.1/usr
145657   4 drwxr-xr-x 3 root root   4096 22 aug 10.22 /var/tmp/pear-build-rootBt1Sib/install-xdebug-2.2.1/usr/lib64
145658   4 drwxr-xr-x 3 root root   4096 22 aug 10.22 /var/tmp/pear-build-rootBt1Sib/install-xdebug-2.2.1/usr/lib64/php
145659   4 drwxr-xr-x 2 root root   4096 22 aug 10.22 /var/tmp/pear-build-rootBt1Sib/install-xdebug-2.2.1/usr/lib64/php/modules
145655 768 -rwxr-xr-x 1 root root 785022 22 aug 10.22 /var/tmp/pear-build-rootBt1Sib/install-xdebug-2.2.1/usr/lib64/php/modules/xdebug.so

Build process completed successfully
Installing '/usr/lib64/php/modules/xdebug.so'
install ok: channel://pecl.php.net/xdebug-2.2.1
configuration option "php_ini" is not set to php.ini location
You should add "extension=xdebug.so" to php.ini
```

## Configure the profiler

```
sudo nano /etc/php.d/xdebug.ini

xdebug.profiler_enable = 1
xdebug.profiler_output_dir = /var/log/httpd/

sudo service httpd restart
```

I had problems restarting apache (httpd) so I tried to do a reboot (sudo reboot).


## View profiler files

Run some scenarios you want to profile. Then, login to the EBT server and download the cachgrind files that are in the /var/log/httpd folder (as specified above).

The server has s3put installed, just run: 
```
s3put -a <ACCESS KEY> -s <SECRET LEY> -b <BUCKET NAME> /var/log/httpd/cachegrind.out.nnnnn
```

Install a tool that can view cachegrind files, I'm using qcachegrind on OSX (assuming you have brew installed):
```
brew install qcachegrind

qcachegrind &
```

Now you can open the cachegrind files.
