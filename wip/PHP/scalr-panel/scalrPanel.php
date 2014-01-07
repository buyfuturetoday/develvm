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
 * The configuration file defines what pages to render and also the credentials for the Scalr environments
 */
require_once('config.inc.php');


/**
 * scalrPanel
 *
 * Renders the pages defined in the global variable $pages
 *
 */
class scalrPanel {


	public function renderHTML($pagename) {
		global $pages;
		
		if(!isset($pages[$pagename])) {
			throw new Exception("The page $pagename has not been defined!");
		}
		return $pages[$pagename][WIDGETS][0]->renderHTML($pages[$pagename][CREDENTIALS]);
	}

	public function renderText($pagename) {
		
		if(!isset($item[$pagename])) {
			throw new Exception("The page $pagename has not been defined!");
		}
		return $pages[$pagename][0][WIDGETS]->renderText($pages[$pagename][CREDENTIALS]);
	}

}

?>
