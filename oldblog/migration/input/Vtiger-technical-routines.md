[[Wiki]]

h1. VTiger Technical routines


h2. Reset password in customer portal

Open phpmyadmin.gizurcloud.com

Select the vTiger database 

<pre>
SELECT * FROM  vtiger_portalinfo

update vtiger_portalinfo
set user_password='New PASSWORD'
where id=ID OF CONTACT
</pre>

Show contacts and logins:
<pre>
SELECT vtigercikab.vtiger_account.accountname, 
	vtigercikab.vtiger_contactdetails.contact_no, 
	vtigercikab.vtiger_portalinfo.user_name, 
	vtigercikab.vtiger_portalinfo.user_password, 
	vtigercikab.vtiger_crmentity.deleted
FROM vtigercikab.vtiger_portalinfo INNER JOIN vtigercikab.vtiger_crmentity ON vtigercikab.vtiger_portalinfo.id = vtigercikab.vtiger_crmentity.crmid
	 INNER JOIN vtigercikab.vtiger_contactdetails ON vtigercikab.vtiger_contactdetails.contactid = vtigercikab.vtiger_crmentity.crmid
	 INNER JOIN vtigercikab.vtiger_account ON vtigercikab.vtiger_account.accountid = vtigercikab.vtiger_contactdetails.accountid
ORDER BY vtigercikab.vtiger_account.accountname ASC, vtigercikab.vtiger_contactdetails.contact_no ASC

</pre>



h2. orders per account and week

<pre>
select accountid,  week(duedate) as weekno, count(salesorder_no) from vtigercikab.vtiger_salesorder group by accountid, weekno;
</pre>


h2. orders per week

<pre>
select week(duedate) as weekno, count(salesorder_no) from vtigercikab.vtiger_salesorder group by weekno;
</pre>


h2. sales_order_for_product_and_account

<pre>
SELECT vtigercikab.vtiger_products.product_no, 
	vtigercikab.vtiger_products.productname AS product, 
	vtigercikab.vtiger_account.account_no, 
	vtigercikab.vtiger_account.accountname AS account, 
	vtigercikab.vtiger_salesorder.salesorder_no, 
	vtigercikab.vtiger_salesorder.`subject`, 
	vtigercikab.vtiger_inventoryproductrel.quantity
FROM vtigercikab.vtiger_inventoryproductrel INNER JOIN vtigercikab.vtiger_salesorder ON vtigercikab.vtiger_inventoryproductrel.id = vtigercikab.vtiger_salesorder.salesorderid
	 INNER JOIN vtigercikab.vtiger_account ON vtigercikab.vtiger_account.accountid = vtigercikab.vtiger_salesorder.accountid
	 INNER JOIN vtigercikab.vtiger_products ON vtigercikab.vtiger_products.productid = vtigercikab.vtiger_inventoryproductrel.productid
WHERE vtigercikab.vtiger_account.accountname='254900' AND vtigercikab.vtiger_products.productname='233901'
</pre>


h2. trouble_ticket_for_account_and_product

<pre>
SELECT vtigercikab.vtiger_troubletickets.ticket_no, 
	vtigercikab.vtiger_crmentity.description, 
	vtigercikab.vtiger_crmentity.createdtime
FROM vtigercikab.vtiger_crmentity INNER JOIN vtigercikab.vtiger_troubletickets ON vtigercikab.vtiger_crmentity.crmid = vtigercikab.vtiger_troubletickets.ticketid
WHERE vtigercikab.vtiger_crmentity.description LIKE '%BUT53%' AND vtigercikab.vtiger_crmentity.description LIKE '%264300%'
</pre>


h2. Sales Orders

<pre>
SELECT *
FROM vtigerqa.vtiger_salesorder INNER JOIN vtigerqa.vtiger_crmentity ON vtigerqa.vtiger_salesorder.salesorderid = vtigerqa.vtiger_crmentity.crmid
WHERE vtigerqa.vtiger_crmentity.setype='SalesOrder'
</pre>