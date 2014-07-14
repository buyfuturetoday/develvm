<?php

echo "RUNNING HANA CONNECTION TEST";
 
$driver  	 = "HDBODBC64";               // 32 bit odbc drivers that come with the hana client installation.

$servername  = "54.75.228.30:30015";      // Enter your external access server name
$db_name 	 = "HDB";                     // This is the default name of your hana instance.
$username	 = $_SYSTEM["HANA_USER"];        // This is the default username, do provide your username
$password	 = $_SYSTEM["HANA_PWD"];         // This is the default password, do provide your own password.

$conn    	= odbc_connect("Driver=$driver;ServerNode=$servername;Database=$db_name;", $username, $password, SQL_CUR_USE_ODBC);

 

// example query string.

// $queryString = 'INSERT INTO "SCHEMA_NAME"."table_name" (SiteID,Date_Time,SensorValue,KVA,PF,ErrorLog) 
// VALUES('.$siteID.',\''.$time.'\','.$sensorValue.','.$kva.','.$pf.',\''.$errorLog.'\' )';

$queryString = 'select * from schemas';

//echo $queryString; to get clarification, you can copy and paste your query string in SAP HANA Studio and see the results.

 

// if condition's optional.

if ($conn) {

    odbc_exec($conn, $queryString); // odbc_exec prepares and executes the sql statement.

    while(odbc_fetch_row($result)){
        for($i=1; $i<=odbc_num_fields($result); $i++){
            echo "Result is " . odbc_result($result, $i);
        }
    }

} else {
    echo "Failed to connect!";
}

 

?>
