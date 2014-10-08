
---
layout: post
title: Scalr
date: 2012-01-01
author: Jonas Colmsjo
tags: ['post']
---

Yet another post





[[Wiki]]

h1. Scalr API

* http://wiki.scalr.net/display/docs/API


h2. PHP

* PHP Example - http://wiki.scalr.net/download/attachments/327715/ScalrAPI.example.php?version=2&modificationDate=1335371895000

<pre>

<? php

	// Define constants
	define("SCALR_API_KEY", "xxxxxxxxxxxxxxxx");
	define("SCALR_SECRET_KEY", "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
	define("API_URL", "https://api.scalr.net/");	
	define("API_VERSION", "2009-05-07");
	
	// Build query arguments list
	$params = array(
        'Action'	=> 'ListFarms',
        'Version'	=> API_VERSION,
        'Timestamp'	=> date("c"),
        'KeyID'		=> SCALR_API_KEY
    );
	
    // Sorg arguments
    ksort($params);
        	
    // Generate string for sign
	$string_to_sign = "";
	foreach ($params as $k => $v)
        $string_to_sign .= "{$k}{$v}";
                
    // Generate signature
	$params['Signature'] = base64_encode(hash_hmac('SHA256', $string_to_sign, SCALR_SECRET_KEY, 1));
        
	// Build query
	$query = http_build_query($params);
        
	// Execute query
	$c = file_get_contents(API_URL."?{$query}");
	
	// Print result
	print " pre ";
	print htmlspecialchars($c);
 
?>


</pre>



h2. Joomla and PHP

* http://extensions.joomla.org/extensions/core-enhancements/coding-a-scripts-integration/custom-code-in-content/4470
