
---
layout: post
title: Ofbiz
date: 2012-01-01
author: Jonas Colmsjo
---

Yet another post





[[Main_Page]] > [[Open_Source_ERP]]

== Service Providers ==

* http://www.opentaps.org/docs/index.php/World_of_opentaps
* http://www.opentaps.org/partners
* Service providers - https://cwiki.apache.org/OFBIZ/apache-ofbiz-service-providers.html
* http://twitter.com/#!/ofbiz_help

I have mailed IntelliAnt and Venkat Mangudi Consulting.


== Documentation ==

* Getting started - https://cwiki.apache.org/confluence/display/OFBADMIN/Apache+OFBiz+Getting+Started
* Test setup guide - https://cwiki.apache.org/confluence/display/OFBADMIN/Demo+and+Test+Setup+Guide
* Business setup guide - https://cwiki.apache.org/OFBENDUSER/apache-ofbiz-business-setup-guide.html
* Demo site - https://demo-stable.ofbiz.apache.org/myportal/control/main?externalLoginKey=
* Mail list - http://mail-archives.apache.org/mod_mbox/ofbiz-user/201111.mbox/browser

* Open source ERP comparison - http://www.amicontech.com/open-source-erp-systems-comparison


=== User documentation ===

* https://docs.ofbiz.org
* http://www.opentaps.org/docs/index.php/Opentaps_Users_Manual
* https://cwiki.apache.org/confluence/display/OFBIZ/OFBiz+Applications+User+Manual
* http://www.myofbiz.com/


=== Development tutorials etc. ===

* https://www.packtpub.com/apache-ofbiz-development-beginners-tutorial/book
* http://bpel.xml.org/news/apache-ofbiz-development-the-beginners-tutorial
* http://www.opensourcestrategies.com/ofbiz/tutorials.php
* http://www.opensourcestrategies.com/ofbiz/


=== Links ===




== Skapa roller ==

# Party
# Party Manager > Security


== Skapa ny instans ==

# Skapa server på rackspace UK - utgår från ofbiz med svn start etc
# logga in och editera /etc/inid.d/ofbiz2
## ändra IP adress



== Configuration ==

* Should probably read this in detail - https://cwiki.apache.org/OFBENDUSER/apache-ofbiz-business-setup-guide.html
* http://www.opensourcestrategies.com/ofbiz/tutorials.php

Some setup:
# Check technical configuration - https://cwiki.apache.org/OFBTECH/apache-ofbiz-technical-production-setup-guide.html
# Create Entity - Either use initial setup or just create manually
# Add Product Store - Applications > Catalog > Store > Create New Product Store
# Add user - Applications > Party > Create Employee
# Load chart of accounts - see below
# Assign Chart Of Account to Entity



=== CoA ===

[[SIE]] - Syntax för SIE formatet.

Load Chart Of Accounts:
* http://www.hotwaxmedia.com/apache-ofbiz-blog/ofbiz-accounting-setup-chart-of-accounts/

Goto Applications > Webtools > Import/Export

Minimal example:
<pre>
<entity-engine-xml> 
<GlAccount glAccountId="1000" accountName="Cash in Bank and on Hand" accountCode="Cash in Bank and on Hand" glAccountClassId="CASH_EQUIVALENT" glAccountTypeId="CURRENT_ASSET" postedBalance="0.0"/> 
<GlAccount glAccountId="1200" accountName="Accounts Receivable" accountCode="Accounts Receivable" glAccountClassId="CURRENT_ASSET" glAccountTypeId="ACCOUNTS_RECEIVABLE" postedBalance="0.0"/> 
<GlAccount glAccountId="1210" accountName="AR Unapplied Payments" accountCode="AR Unapplied Payments" glAccountClassId="CURRENT_ASSET" glAccountTypeId="ACCREC_UNAPPLIED" postedBalance="0.0"/> 
<GlAccount glAccountId="1400" accountName="Inventory" accountCode="Inventory" glAccountClassId="INVENTORY_ASSET" glAccountTypeId="INVENTORY_ACCOUNT" postedBalance="0.0"/> <GlAccount glAccountId="1700" accountName="Accumulated Depreciation" accountCode="Accumulated Depreciation" glAccountClassId="ACCUM_DEPRECIATION" glAccountTypeId="FIXED_ASSET" postedBalance="0.0"/>
<GlAccount glAccountId="2000" accountName="Accounts Payable" accountCode="Accounts Payable" glAccountClassId="CURRENT_LIABILITY" glAccountTypeId="ACCOUNTS_PAYABLE" postedBalance="0.0"/> 
<GlAccount glAccountId="2001" accountName="AP Unapplied Payments" accountCode="AP Unapplied Payments" glAccountClassId="CURRENT_LIABILITY" glAccountTypeId="ACCPAYABLE_UNAPPLIED" postedBalance="0.0"/> <GlAccount glAccountId="2002" accountName="Uninvoiced Item Receipts" accountCode="Uninvoiced Item Receipts" glAccountClassId="CURRENT_LIABILITY" glAccountTypeId="CURRENT_LIABILITY" postedBalance="0.0"/> 
<GlAccount glAccountId="2010" accountName="Sales Tax Payable" accountCode="Sales Tax Payable" glAccountClassId="CURRENT_LIABILITY" glAccountTypeId="CURRENT_LIABILITY" postedBalance="0.0"/> 
<GlAccount glAccountId="3000" accountName="Owners Equity And Net Worth" accountCode="Owners Equity And Net Worth" glAccountClassId="EQUITY" glAccountTypeId="" postedBalance="0.0"/> <GlAccount glAccountId="4600" accountName="Merchandise Sales" accountCode="Merchandise Sales" glAccountClassId="REVENUE" glAccountTypeId="" postedBalance="0.0"/> 
<GlAccount glAccountId="4830" accountName="Sale Discounts" accountCode="Sale Discounts" glAccountClassId="CONTRA_REVENUE" glAccountTypeId="" postedBalance="0.0"/> 
<GlAccount glAccountId="4840" accountName="Sales returns and Allowances" accountCode="Sales returns and Allowances" glAccountClassId="CONTRA_REVENUE" glAccountTypeId="" postedBalance="0.0"/> 
<GlAccount glAccountId="5100" accountName="Merchandise Cost" accountCode="Merchandise Cost" glAccountClassId="COGS_EXPENSE" postedBalance="0.0"/> 
<GlAccount glAccountId="5150" accountName="Shipping Cost" accountCode="Shipping Cost" glAccountClassId="COGS_EXPENSE" postedBalance="0.0"/> 
<GlAccount glAccountId="5400" accountName="Depreciation Expense" accountCode="Depreciation Expense" glAccountClassId="DEPRECIATION" glAccountTypeId="" postedBalance="0.0"/> 
<GlAccount glAccountId="7300" accountName="Office Expense" accountCode="Office Expense" glAccountClassId="SGA_EXPENSE" glAccountTypeId="" postedBalance="0.0"/> 
<GlAccount glAccountId="7340" accountName="Mesc Expense" accountCode="Telephone Expense" glAccountClassId="SGA_EXPENSE" glAccountTypeId="" postedBalance="0.0"/> 
</entity-engine-xml>

</pre>


Assign to entity:
* http://www.hotwaxmedia.com/apache-ofbiz-blog/tag/ofbiz-accounting/

Accounting > Organization GL Settings


== Setup ==

* https://cwiki.apache.org/OFBENDUSER/apache-ofbiz-business-setup-guide.html
* http://www.antwebsystems.com/control/ViewBlogArticle?contentId=16907


=== Install on MySQL ===

* http://www.higherpass.com/apache/Tutorials/Configuring-Ofbiz-To-Use-A-Mysql-Database/

Install JDBC connector
<pre>
wget http://www.mysql.com/get/Downloads/Connector-J/mysql-connector-java-5.1.18.zip/from/http://ftp.sunet.se/pub/unix/databases/relational/mysql/
cp mysql-connector-java-5.1.18-bin.jar ../../ofbiz2/framework/entity/lib/
</pre>


<pre>
#Install mysql

rpm -Uvh  http://download.fedora.redhat.com/pub/epel/5/x86_64/epel-release-5-4.noarch.rpm

yum -y install mysql mysql-server php53 php53-mysql pcre php53-mcrypt

wget http://downloads.sourceforge.net/project/phpmyadmin/phpMyAdmin/3.4.7.1/phpMyAdmin-3.4.7.1-all-languages.tar.gz?r=http%3A%2F%2Fwww.phpmyadmin.net%2Fhome_page%2Fdownloads.php&ts=1321973197&use_mirror=ignum
gunzip
tar -xvf
mv phpMyAdmin-3.4.7.1-all-languages phpMyAdmin
mv phpMyAdmin /var/www/html/

chown -R apache.apache /var/www/html/phpMyAdmin/
</pre>

Skapa en databas och användare
* http://IP/phpMyAdmin

<pre>
cd ofbiz2
vi framework/entity/config/entityengine.xml

   <!--
        Jonas C. 111122
       
        Setup MySQL
    -->
    <delegator name="default" entity-model-reader="main" entity-group-reader="main" entity-eca-reader="main" distributed-cache-clear-enabled="false">
        <group-map group-name="org.ofbiz" datasource-name="localmysql"/>
        <group-map group-name="org.ofbiz.olap" datasource-name="localmysqlolap"/>
        <group-map group-name="org.ofbiz.tenant" datasource-name="localmysqltenant"/>
    </delegator>

</pre>



<pre>
./ant clean
./ant run-install

....

[java] 2011-11-22 15:48:27,204 (main) [EntityDataLoadContainer.java:408:INFO ] =-=-=-=-=-=-= Finished the data load with 15435 rows changed.
     [java] 2011-11-22 15:48:27,204 (main) [    ContainerLoader.java:113:INFO ] Shutting down containers

BUILD SUCCESSFUL
Total time: 2 minutes 24 seconds
[root@cikab1 ofbiz2]# 


</pre>

=== Installation on included Derby database ===

<pre>
# wget http://download.oracle.com/otn-pub/java/jdk/6u29-b11/jre-6u29-linux-x64-rpm.bin
wget http://download.oracle.com/otn-pub/java/jdk/6u29-b11/jdk-6u29-linux-x64-rpm.bin
mv
chmod
./jre...

wget http://apache.dataphone.se//ofbiz/apache-ofbiz-10.04.zip
unzip
mv
cd 
cat README

# Install with demo data
./ant run-install

./ant clean-all
./ant run-install-extseed
# enter a user login id that will be created for you (the initial temporary password is "ofbiz")
./ant create-admin-user-login
./startofbiz.sh

vi /etc/sysconfig/iptables
service iptables restart

./startofbiz.sh

</pre>


PATCH NEEDED: https://issues.apache.org/jira/browse/OFBIZ-4381
* https://cwiki.apache.org/OFBIZ/addressing-custom-requirements-in-ofbiz.html#AddressingCustomRequirementsInOFBiz-Applyingapatch
<pre>
wget https://issues.apache.org/jira/secure/attachment/12492225/OFBIZ-4381.patch
patch -p0 < OFBIZ-4381.patch 
</pre>

== The OFBiz Setup application Overview ==

* Copied from this site: https://demo-trunk.ofbiz.apache.org/marketing/control/showHelp?helpTopic=navigateHelp

The OFBiz Setup application is supporting for immediate setup your organization. For example, Product Store, WebSite , Facility , product catalog, category , product, and etc. and then be able to create orders from data that is created.

Why we have OFBiz Setup Application?
For manual setup instructions, please see the on the wiki.
If you are the company and also want to use OFBiz for running your business then you easily be able to setting your information for start running the system quickly via The OFBiz Setup Application.

How to get started:
# Open a new terminal.
# Go to your ofbiz directory.
# Clean out all built classes with : ./ant clean-all
# Load the seed data with : ant run-install-extseed
# Create the admin user with : ./ant create-admin-user-login , then enter a user login id that will be created for you (the initial temporary password is "ofbiz")
# Start ofbiz with : ./startofbiz.sh
# Connect to the OFBiz Setup application with your browser at https://localhost:8443/ofbizsetup.


=== Run as service ===

* http://vigeek.net/linux/bash/ofbizopentaps-service-wrapperstartup-script

<pre>
vi startofbiz.sh
# start ofbiz
$JAVA $VMARGS -jar ofbiz.jar $* >>$OFBIZ_LOG 2>>$OFBIZ_LOG&
#exec "$JAVA" $VMARGS -jar ofbiz.jar "$@"

yum -y install mailx
cd ~/dwnl
wget http://vigeek.net/files/otaps.sh
vi otaps.sh
mv otaps.sh ofbiz2.sh

cd /etc/init.d
cp ~/dwnl/ofbiz2.sh ofbiz2
chmod ug+x ofbiz2
ls -al

service ofbiz2 status
</pre>


== Translations ==

* http://www.opensourcestrategies.com/ofbiz/internationalizing_ofbiz.php


== Development ==

* https://cwiki.apache.org/OFBTECH/framework-introduction-videos-and-diagrams.html
* https://cwiki.apache.org/OFBIZ/ofbiz-tutorial-a-beginners-development-guide.html
