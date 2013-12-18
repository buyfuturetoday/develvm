
---
layout: post
title: Vtiger
date: 2012-01-01
author: Jonas Colmsjo
---

Yet another post





[[VTigerCRM]]


== Documentation ==

* http://wiki.vtiger.com/index.php/vtiger520:How_to_create_a_language_pack
* http://wiki.vtiger.com/index.php/Creating_New_Module


== Svenska för 5.0.4 ==

* http://forge.vtiger.com/frs/?group_id=106&release_id=487

<pre>
wget http://forge.vtiger.com/frs/download.php/690/customer_portal_5.0.4.lang.zip
wget http://forge.vtiger.com/frs/download.php/691/5.0.4_LanguagePack_sv_se.zip

...

cd /root/svn/cikab1/vtiger/svenska/portal
cp sv_se.lang.php /var/www/html/vtigercrm/portal/language
chown apache.apache /var/www/html/vtigercrm/portal/language/sv_se.lang.php 

#
# EJ FÅTT ATT FUNGERA
#

cd /var/www/html/vtigercrm/
s3cmd get s3://gizur-tmp/5.0.4_LanguagePack_sv_se.zip
unzip 5.0.4_LanguagePack_sv_se.zip 

vi config.inc.php
$default_language = 'sv_se';

</pre>


== Howto ==


Modules:
* Accounts
* Activities - tom
* Administration
* Calendar
* Campaigns
* Contacts
* CustomView
* Dashboard
* Documents
* Emails
* Faq
* Help
* HelpDesk
* Home
* Import
* Invoice
* Leads
* Migration
* PickList
* Portal
* Potentials
* PriceBooks
* Products
* PurchaseOrder
* Quotes
* Reports
* Rss
* SalesOrder
* Settings
* System
* Users
* Utilities
* Vendors
* Vtiger
* Webmails
* Yahoo


Include:
* ckeditor
* install
* js/language file
* WebServices


<pre>


</pre>
