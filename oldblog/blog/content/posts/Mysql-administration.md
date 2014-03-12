Yet another post

[meta:author]: <> (Jonas Colmsjo)
[meta:title]: <> (Mysql-administration.md)
[meta:date]: <> (2012-01-01)
[meta:nested:key]: <> (Metadata value)

##!!truncate


[[Wiki]]

h1. MySQL administration


phpmyadmin.gizurcloud.com


h2. Duplicate a database


<pre>
mysqldump -u DB_user --password=DB_pass DB_name | mysql -u DB_user --password=DB_pass -h DB_host DB_name

</pre>
