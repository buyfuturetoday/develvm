Yet another post

[meta:author]: <> (Jonas Colmsjo)
[meta:title]: <> (Lighttpd.md)
[meta:date]: <> (2012-01-01)
[meta:nested:key]: <> (Metadata value)

##!!truncate


[[IT resources]]


Light and fast web server
* http://www.lighttpd.net/


== Installation ==

=== osx ===

<pre>
sudo port
install lighttpd


###########################################################
# A startup item has been generated that will aid in
# starting lighttpd with launchd. It is disabled
# by default. Execute the following command to start it,
# and to cause it to launch at startup:
#
# sudo port load lighttpd
###########################################################
--->  Installing lighttpd @1.4.28_0+ssl
--->  Activating lighttpd @1.4.28_0+ssl

Before starting lighttpd it must be configured. Basic server configuration is in the file /opt/local/etc/lighttpd/lighttpd.conf.
Select which modules you want enabled in /opt/local/etc/lighttpd/modules.conf. Individual modules' settings are in
/opt/local/etc/lighttpd/conf.d.

Sample config files have the .conf.default extension. When updating lighttpd, you should investigate whether you need to update your
.conf files with changes from the corresponding .conf.default files.
</pre>
