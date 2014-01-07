<?php
/** 
 * wget.php
 *
 * PHP Version 5 
 *
 * @category Gizur
 * @package  Utils
 * @author   Jonas Colmsjo <jonas@gizur.com>
 * @license  http://opensource.org/licenses/MIT MIT
 * @link     http://www.gizur.com
 *
 * @see PhpDoc is used for documentation: 
 * http://www.phpdoc.org/docs/latest/for-users/phpdoc-reference.html
 *
 * @see Coding standards:
 * http://framework.zend.com/manual/1.12/en/coding-standard.html
 *
 *------------------------------
 **/

namespace Gizur;


use Aws\Common\Enum\Region;


/**
 * MyConfig
 *
 * NOTE: Update configuration below
 */

class MyConfig
{

    /**
     * The AWS bucket to use
     */
    public $bucket = "gizur-tmp";
 
    /**
     * The AWS region to use
     */
    public $region = Region::IRELAND;

    /**
     * Sets of files to upload
     */
    public $paths = array ('/var/log/*.log', '/var/log/apache2/error_log'); 

}

