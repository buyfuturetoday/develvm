[[vTiger]]


* http://wiki.vtiger.com/index.php/vtiger520:Webservice_reference_manual#Field_Types
* http://wiki.vtiger.com/index.php/vtiger510:WebServices_tutorials


<pre>
# on my mac
cd node_modules/http2/bin
./http-console s2.gizur.com --ssl

GET /vtigercrm/index.php

GET /vtigercrm/webservice.php?operation=getchallenge&username=jonas
HTTP/1.1 200 OK
Date: Mon, 09 Jan 2012 13:15:24 GMT
Server: Apache/2.2.3 (CentOS)
X-Powered-By: PHP/5.3.3
Expires: Thu, 19 Nov 1981 08:52:00 GMT
Cache-Control: no-store, no-cache, must-revalidate, post-check=0, pre-check=0
Pragma: no-cache
Content-Length: 99
Connection: close
Content-Type: application/json

{
    success: true,
    result: {
        expireTime: 1326115224,
        token: '4f0ae86c96ff0',
        serverTime: 1326114924
    }
}


# for accessKey create a md5 string after concatenating user accesskey from my preference page and the challenge token obtained from get challenge result
# My access key: dNwHXO8VT7C6fR3h

md5 -s 4f0ae86c96ff0dNwHXO8VT7C6fR3h
MD5 ("4f0ae86c96ff0dNwHXO8VT7C6fR3h") = 436c6ad8d4842120c8b5d3dbcba8b405

POST /vtigercrm/webservice.php?operation=login&username=jonas&accessKey=436c6ad8d4842120c8b5d3dbcba8b405



</pre>
