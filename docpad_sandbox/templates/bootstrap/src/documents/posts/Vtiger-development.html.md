
---
layout: post
title: Vtiger
date: 2012-01-01
author: Jonas Colmsjo
---

Yet another post





[[VTigerCRM]]



= Integrate with vTiger =

There is vtigerservice.php and webservice.php
* http://gom-dev.gizurcloud.com/vtigerservice.php

=== Web Service ===

The web services api supports the security model followed in the Vtiger web user interface.
* https://wiki.vtiger.com/index.php/510:Webservice_reference_manual

Use the $client->call method

* http://api.vtiger.com/classsoapclient2.html#a806d1d83f45454caf9c6c361c0a4b0ad

* http://api.vtiger.com/class_vtiger___net___client.html
** vtlib -> Vtiger_Net_Client in client.php


=== vtlib ===

* http://www.vtiger.com/products/crm/help/5.2.0/VtigerCRM_5.2.0_Vtlib.pdf

* http://api.vtiger.com
** http://api.vtiger.com/class_users.html
** http://api.vtiger.com/class_login_history.html


=== Portal ===

The portal seams to be using SOAP (nusoap):
* http://sourceforge.net/projects/nusoap

Login.php calls portal/CustomerAuthenticate.php on the server
* http://forums.vtiger.com/viewtopic.php?t=29791


<pre>
root@ec2-176-34-180-30:PHP:/var/www/html/vtigersbx/portal# grep -n "\$client \=" *
include.php:18:$client = new soapclient2($Server_Path."/vtigerservice.php?service=customerportal", false, $proxy_host, $proxy_port, $proxy_username, $proxy_password);
</pre>


vtigerservice.php:
<pre>
if(isset($_REQUEST['service']))
{
	if($_REQUEST['service'] == "outlook")
	{
		include("soap/vtigerolservice.php");
	}
	elseif($_REQUEST['service'] == "customerportal")
	{
		include("soap/customerportal.php");
	}
</pre>


soap/customerportal.php
<pre>
$NAMESPACE = 'http://www.vtiger.com/products/crm';
$server = new soap_server;

$server->configureWSDL('customerportal');

$server->wsdl->addComplexType(
	'common_array',
	'complexType',
	'array',
	'',
	array(
		'fieldname' => array('name'=>'fieldname','type'=>'xsd:string'),
	)
);
...
</pre>



soap_server:
* http://api.vtiger.com/classsoap__server.html
* There is a public attribute-  $operations = array()

soap_client2:
* http://api.vtiger.com/classsoapclient2.html


=== WebForms ===

* https://wiki.vtiger.com/index.php/Developers_How_To's#WebForms



= Smarty =

# Smarty template - http://chriscant.phdcc.com/2009/09/starting-to-program-vtiger-crm.html
## http://www.smarty.net/docs/en/
## Change list views - http://wiki.vtiger.com/index.php/Vtiger_CRM_5_Developer_Guide
## /var/www/html/vtigercrm/Smarty/templates
# Data model - http://forums.vtiger.com/viewtopic.php?p=56568#56568


= Notes on datamodel research for sales orders and quotes =

# check vtiger_fields
# check vtiger_crmentity
# check the file schema/DatabaseSchema.xml
# check modules/SalesOrder/DetailView.php
# check Smarty/Inventory
# found table vtiger_inventoryproduyctrel
