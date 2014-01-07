<?php

/**
 * Test for scalrPanel
 *
 * @package    scalrPanel
 * @subpackage test
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
 * PHP Unit: http://www.phpunit.de/manual/current/en/
 *
 * PHP version 5
 *
 */

require_once('scalrPanel.php');
require_once('config.inc.php');


class testScalrPanel extends PHPUnit_Framework_TestCase {
	
    public function testRenderHTML() {
    	try {
    		$scalr_panel = new scalrPanel();

	    	$this->assertTrue( $scalr_panel->renderHTML('Admin') != "");

			echo "scalr_panel->renderHTML('Admin'):", $scalr_panel->renderHTML('Admin'), "\n";

    	}
    	catch (Exception $e) {
    		echo 'Caught exception: ',  $e->getMessage(), "\n";
    	}

    }
	
}


?>