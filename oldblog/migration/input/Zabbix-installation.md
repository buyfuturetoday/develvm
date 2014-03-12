[[Wiki]]

h1. Zabbix installation

h2. Server

<pre>
sudo apt-get install mysql-server

sudo apt-get install zabbix-server-mysql

sudo apt-get install zabbix-agent

sudo apt-get install zabbix-frontend-php

service apache2 restart
</pre>



Create a DNS and virtual host
# Point virtual host to: /usr/share/zabbix/

h2. Agent


<pre>


</pre>


* Log file: cat /var/log/zabbix-agent/zabbix_agentd.log 


h2. Configuration


h3. Monitor log files

* http://www.zabbix.com/documentation/1.8/manual/log_file_monitoring

Configuration -> Hosts -> Items
* Type: Zabbix Agent (active): 
* key: log["/var/log/apache2/error.log","*","UTF-8",100]
* Type of information: Log





