<?php

echo "RUNNING HANA CONNECTION TEST\n";
 
$conn = odbc_connect("HANADSN", $_SERVER["HANA_USER"], $_SERVER["HANA_PWD"], SQL_CUR_USE_ODBC);

// query string
$queryString = 'select * from schemas';

if ($conn) {

	// odbc_exec prepares and executes the sql statement.
    $result = odbc_exec($conn, $queryString);

    while(odbc_fetch_row($result)){

        for($i=1; $i<=odbc_num_fields($result); $i++){
            echo "Result is " . odbc_result($result, $i);
        }
    }

} else {
    echo "Failed to connect!\n";
}

 

?>
