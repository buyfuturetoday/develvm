# Wiki


# ToDo



# Routines

* [[Webmin administration]]
* [[vTiger Technical routines]] - reset passwords etc.
* [[MySQL administration]]
* [[Subversion administration]]
* [[Redmine administration]]
* [[Scalr administration]]
* [[Gluster administration]]
* [[LDAP routines]]


# Installation routines

Development arch:
* [[Subversion installation]]
* [[Developer server]]

Execution arch:
* [[Hardening ubuntu]]
* [[LDAP configuration]]
* [[Ubuntu LDAP client]]
* [[AMQP php client]]
* [[ftp server]]
* UltraESB - http://redmine.gizurcloud.com/projects/gom/wiki/UltraESB_installation_routine
* [[cfengine]]

Operations arch:
* [[Zabbix installation]]

Applications
* [[Mediawiki installation]]
* [[LimeSurvey installation]]
* [[Eatoreh setup]]
* [[OpenKM installation routine]]
* [[DocuWiki installation]]


# Testing

* [[Sonar installation]]
* [[KnowledgeTree installation routine]]
* [[Alfresco installation routine]]
* [[OpenDocman installation routine]]
* [[ProcessMaker]]
* [[iptables]]
* [[apparmor]]
* [[Scalr API]]
* [[phpunit]]
* [[nginx config]]
* [[Gizur Scalr installation]]
* [[Memcached]]


# Scalr farms

Scalr is used to manage the server park: https://my.scalr.net/

h2. Production servers

Webmin
* MQ and NFS server - https://nfs.gizurcloud.com:10000/
* Java application server for Pentaho - https://java.gizurcloud.com:10000/
* MySQL slave server - https://46.137.133.117:10000/ (NEED TO INSTALL ON MASTER IF THIS WORKS OK)
* PHP application server - https://176.34.180.30:10000/
** Scales automatically, check in Scalr how many servers that are running


phpMyAdmin: phpmyadmin.mysql.com


h2. Sandbox farm

One farm with two servers:
* LAMP - 46.137.54.126
** http://mysql1.gizurcloud.com/
** mdm1.gizurcloud.com
** lam.sbx.gizurcloud.com
** web2project.sbx.gizurcloud.com
** nfs.sbx.gizurcloud.com
** orangehrm.sbx.gizurcloud.com
** qdpm.sbx.gizurcloud.com
** collabtive.sbx.gizurcloud.com
** sbx.gizurcloud.com
** fengoffice.sbx.gizurcloud.com
** processmaker.sbx.gizurcloud.com
** activiti.sbx.gizurcloud.com

* Rabbit MQ - 46.137.54.126
** mq.sbx.gizurcloud.com


h2. Asterisk farm

Terminated

* asterisk1.gizurcloud.com
* asterisk2.gizurcloud.com


h2. Test NFS

Terminated

