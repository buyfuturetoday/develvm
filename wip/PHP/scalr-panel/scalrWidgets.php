<?php

/**
 * ScalrPanel
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

/**
 * Abstract class - only used as common subclass of all Widgets
 *
 */

class scalrWidget {
   function __construct() {
   }

   function __destruct() {
   }
}

/**
 * Render all Farms within one environment
 */
class scalrFarmWidget extends scalrWidget {

	//private $farmid;

	/**
	 * make_api_call
	 *
	 * @param string $action
	 * @param string $parameters
	 * @param string $api_key
	 * @param string $secret_key
	 *
	 * @returns The XML string containg the result of the Scalr call
	 * 
	 */
	private function make_api_call($action, $parameters, $secret_key)	{
	
	
	    // Sort arguments
	    ksort($parameters);
	    
	    // Generate string for sign
	    $string_to_sign = "";
	    foreach ($parameters as $k => $v)
	        $string_to_sign .= "{$k}{$v}";
	
	    // Generate signature
	    $parameters['Signature'] = base64_encode(hash_hmac('SHA256', $string_to_sign, $secret_key, 1));
	
	    // Build query
	    $query = http_build_query($parameters);
	
	
	    // Execute query
	    $res = file_get_contents(API_URL."?{$query}");
	    
	    return $res;
	}
	
	/**
	 * params_call
	 *
	 * @param string $action
	 * @param string $api_key
	 * @param string $secret_key
	 * @param array  $params
	 *
	 * @returns The XML string containg the result of the Scalr call
	 * 
	 */
	
	private function params_call($action, $api_key, $secret_key, $params)	{
	
	    // Build query arguments list
	    $params['Action'] 		= $action;
	    $params['Version'] 		= API_VERSION;
	    $params['Timestamp'] 	= date("c");
	    $params['KeyID'] 		= $api_key;
	
		return $this->make_api_call($action, $params, $secret_key);
	}
	
	
	/**
	 * simple_call
	 *
	 * @param string $action
	 * @param string $api_key
	 * @param string $secret_key
	 *
	 * @returns The XML string containg the result of the Scalr call
	 * 
	 */
	
	private function simple_call($action, $api_key, $secret_key)	{
	
	    // Build query arguments list
	    $parameters = array(
	        'Action'       => $action,
	        'Version'      => API_VERSION,
	        'Timestamp'    => date("c"),
	        'KeyID'        => $api_key
	    );
	
	
		return $this->make_api_call($action, $parameters, $secret_key);
	}
	
	
	/**
	 * parse_XML
	 *
	 * Check that the XML is valid and that it can be parsed
	 *
	 * @param string $xml The XML to parse
	 *
	 * @returns result from calling SimpleXMLElement
	 * 
	 */
	
	private function parse_XML($xml)	{
	
	    libxml_use_internal_errors(true);
	    $sxe = simplexml_load_string($xml);
	    if (!$sxe) {
	    	$res = "<p>Failed loading XML\n";
	        foreach(libxml_get_errors() as $error) {
	            $res .= ", " . $error->message;
	        }
	
	        $res .= "</p>";
	
	        echo $res;
	        return;
	        throw new Exception($res);
	    }
	
	
	    $res = new SimpleXMLElement($xml);
	
	    if(!$res ) {
	      echo "ERRROR calling SimpleXMLElement!<br>";
	      throw new Exception('ERRROR calling SimpleXMLElement!');
	      return;
	    }
	
		if(isset($res->Message)) {
	      $msg = "Scalr returned error:".$res->Message;
	      echo $msg;
	      throw new Exception($msg);
	      return;		
		}
	
		return $res;
	}
	
	
	/**
	 * scalr_get_farm_details_html
	 *
	 * @param string $api_key
	 * @param string $secret_key
	 * @param string $farmid The ID of the farm to fetch detils for
	 *
	 * @returns A HTML table with the details for the farms
	 * 
	 */
	
	private function scalr_get_farm_details_html($api_key, $secret_key, $farmid) {
		
		return scalr_get_farm_details_format($api_key, $secret_key, $farmid,
														"<table>", "</table>",
														"<tr>", "</tr>",
														"<th>", "</th>",
														"<tc>", "</tc>");
	
	}
	
	private function scalr_get_farm_details_text($api_key, $secret_key, $farmid) {
		
		return scalr_get_farm_details_format($api_key, $secret_key, $farmid,
														"==========\n", "**********\n",
														"", "|\n",
														"|", "",
														"|", "");
	
	}
	
	private function scalr_get_farm_details_format($api_key, $secret_key, $farmid,
													$start_table,  $stop_table, 
													$start_row,    $stop_row, 
													$start_header, $stop_header, 
													$start_col,    $stop_col) {
	
	
		$params = array(
	        'FarmID'       => $farmid
	    );
		
		$farms_xml = $this->params_call('FarmGetDetails', $api_key, $secret_key, $params);	
		$farms     = $this->parse_XML($farms_xml);
		
		$res = $start_table;
		$res .= $start_row.$start_header."ID".$stop_header.$start_header."RoleID".$stop_header.$start_header.
				"Platform".$stop_header.$start_header."Name".$stop_header.$start_header.
				"CloudLocation".$stop_header.$stop_row;
	
	    foreach($farms->FarmRoleSet->Item as $item) {
	
			$res .= $start_row.$start_col.$item->ID.$stop_col.$start_col.$item->RoleID.$stop_col.$start_col.$item->Name.
					$stop_col.$start_col.$item->CloudLocation.$stop_col.$stop_row;
	
			$res .= $start_table;
			$res .= $start_row.$start_header."ServerID".$stop_header.
						$start_header."ExternalIP".$stop_header.
						$start_header."InternalIP".$stop_header.$stop_row;
			foreach($item->ServerSet->Item as $server) {
	
				$res .= $start_row.$start_col.$server->ServerID.$stop_col.
						$start_col.$server->ExternalIP.$stop_col.
						$start_col.$server->InternalIP.$stop_col.$stop_row;
		 	}	 	 
			$res .= $stop_table;
	
	    }
	
		$res .= $stop_table;
	
		return $res;
	}
	
	
	/**
	 * scalr_get_farms_for_environment_html
	 *
	 * @param string $api_key
	 * @param string $secret_key
	 * @param boolean $include_details Include a table with farms details
	 *
	 * @returns A HTML table with information for the farms
	 * 
	 */
	
	private function scalr_get_farms_for_environment_html($api_key, $secret_key, $include_details) {
		
		return $this->scalr_get_farms_for_environment_format($api_key, $secret_key, $include_details,
														"<table>", "</table>",
														"<tr>", "</tr>",
														"<th>", "</th>",
														"<tc>", "</tc>");
														
	}
	
	private function scalr_get_farms_for_environment_text($api_key, $secret_key, $include_details) {
		
		return $this->scalr_get_farms_for_environment_format($api_key, $secret_key, $include_details,
														"==========\n", "**********\n",
														"", "|\n",
														"|", "",
														"|", "");
														
	}
	
	
	private function scalr_get_farms_for_environment_format($api_key, $secret_key, $include_details, 
													$start_table,  $stop_table, 
													$start_row,    $stop_row, 
													$start_header, $stop_header, 
													$start_col,    $stop_col) {


	
		$farms_xml = $this->simple_call('FarmsList', $api_key, $secret_key);
		$farms     = $this->parse_XML($farms_xml);
	
		$res = $start_table;
		$res .= $start_row.$start_header."ID".$stop_header.$start_header."Name".
						$stop_header.$start_header."Status".$stop_header;
						
		if($include_details) {
			$res .= $start_header."Details".$stop_header;
		}
		$res .= $stop_row;
	
	    foreach($farms->FarmSet->Item as $item) {
	
			$res .= $start_row.$start_col.$item->ID.$stop_col.$start_col.$item->Name.$stop_col.$start_col.$item->Status;
	
			if($include_details) {
				$farmid = (string)$item->ID;
				$res .= $this->scalr_get_farm_details_format($api_key, $secret_key, $farmid,
													$start_table,  $stop_table, 
													$start_row,    $stop_row, 
													$start_header, $stop_header, 
													$start_col,    $stop_col);
			}
	
			$res .= $stop_col.$stop_row;
	    }
	
		$res .= $stop_table;
	
		return $res;
	}
	
	/**
	 * scalr_get_farms_html
	 *
	 * @param boolean $include_details Include a table with farms details
	 *
	 * @returns One HTML table per environment with details for the farms
	 * 
	 */
	
	private function scalr_get_farms_html($include_details) {
	
		global $scalr_credentials;
	
		$res = "";
	
		foreach($scalr_credentials as $credentials) {
	
			$res .= $this->scalr_get_farms_for_environment_html($credentials['SCALR_API_KEY'], 
														$credentials['SCALR_SECRET_KEY'], 
														$include_details);
	
	    }
	
		return $res;
	}
	
	private function scalr_get_farms_text($include_details) {
	
		global $scalr_credentials;
	
		$res = "";
	
		foreach($scalr_credentials as $credentials) {
	
			$res .= $this->scalr_get_farms_for_environment_text($credentials['SCALR_API_KEY'], 
														$credentials['SCALR_SECRET_KEY'], 
														$include_details);
	
	    }
	
		return $res;
	}



	public function __construct() {
		parent::__construct();
		//$this->farmid = $farmid;
	}

	public function __destruct() {
		parent::__destruct();
	}	
	
	public function renderText($credentials) {
		return $this->scalr_get_farms_for_environment_text($credentials['SCALR_API_KEY'], 
													$credentials['SCALR_SECRET_KEY'], 
													1);
	}


	public function renderHTML($credentials) {
		return $this->scalr_get_farms_for_environment_html($credentials['SCALR_API_KEY'], 
													$credentials['SCALR_SECRET_KEY'], 
													1);

	}


}


?>