<?php


/**
 * Configuration for thr Scalr control panel
 *
 * @package    scalrPanel
 * @subpackage scalrPanel
 * @author     Jonas Colmsjö <jonas.colmsjo@gizur.com>
 * @version    SVN: $Id$
 *
 * @license    MIT license
 * @copyright  Copyright (c) 2012, Gizur AB, <a href="http://gizur.com">Gizur Consulting</a>, All rights reserved.
 *
 * Coding standards:
 * http://pear.php.net/manual/en/standards.php
 * http://www.phpdoc.org/docs/latest/index.html
 *
 * PHP version 5
 *
 */


require_once('scalrWidgets.php');


/*******************************************************************************************
 *
 * THERE IS GENERALLY NO NEED TO CHANGE ANYTHING IN THIS SECTION
 * 
 ******************************************************************************************/

/**
 * API URL
 * @global string $scalr_api_url
 */
//$scalr_api_url = 'https://api.scalr.net/';
define("API_URL", 'https://api.scalr.net/');


/**
 * API Version
 * @global string $scalr_api_version
 */
//$scalr_api_version = '2.0.0';
define("API_VERSION", "2.0.0");

/**
 * Some constants used throuout the application
 *
 */
define("WIDGETS",  				'WIDGETS');
define("CREDENTIALS",  			'CREDENTIALS');
define("SCALR_API_KEY",  		'SCALR_API_KEY');
define("SCALR_SECRET_KEY",  	'SCALR_SECRET_KEY');

/*******************************************************************************************
 *
 * THE PAGES ARE CONFIGURED IN THIS SECTION
 * 
 ******************************************************************************************/


/**
 * Credentials for Scalr Environemnts to use.
 *
 * @global string $scalr_credentials['Name_of_environment'][SCALR_API_KEY]
 * @global string $scalr_credentials['Name_of_environment'][SCALR_SECRET_KEY]
 */
$scalr_credentials['cloud1'][SCALR_API_KEY] 	= 'XXXXXXXX';
$scalr_credentials['cloud1'][SCALR_SECRET_KEY] 	= 'YYYYYYYY';

$scalr_credentials['cloud2'][SCALR_API_KEY] 	= 'XXXXXXXX';
$scalr_credentials['cloud2'][SCALR_SECRET_KEY] 	= 'YYYYYYYY';


/**
 * The pages that should be available are defined below. Each array with defined within 
 * the $pages array defines one page.
 * 
 */

$pages['Admin'][WIDGETS] 		= array( new scalrFarmWidget() );
$pages['Admin'][CREDENTIALS] 	= $scalr_credentials['cloud1'];




?>