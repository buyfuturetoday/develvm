
---
layout: post
title: Shrinking CodeIgniter Details
date: 2012-08-10
author: Jonas Colmsjo
tags: ['post']
---

Time to understand what's going on in the PHP frameworks





STATUS: This is still work in progress

The code for this article can be found here: https://github.com/colmsjo/wip/tree/master/Shrinking_CodeIgniter

I like to understand the detais in what's going on when developing new stuff. PHP is excellent in itself but some framework is handy in most cases. All frameworks have a learning curve though and I havent't found any good alternative where you just do a simple include (like in the old good C coding days). When for instance using Yii and CodeIgniter you are assumed to put your code in in some directory inheriting some class and you don't have control of how this code actualluy get's executed.

Here I'll try to only pull the files actually used out of the CodeIgniter framework. The purpose is to make sure I have a good understanding of what's going on.

This is the license of CodeIgniter: http://codeigniter.com/user_guide/license.html

Steps for example 1 (See the result in the directory example1):
* Create a directory for the new PHP application, I'll call it example1 here
* Start with downloading the latest version of CodeIgniter - http://codeigniter.com/downloads/ (or clone from github https://github.com/EllisLab/CodeIgniter)
* Copy index.php from the root CodeIgniter directory to exmaple1
* Open the index.php file and have a look. Spend a little time and make sure you understand what's going on (it's fairly straightforward). At the end there's a include of CodeIgniter.php
* Create the folder structure system/code and copy CodeIgniter.php into it
* Open the file CodeIgniter.php and have a look. This one is more complicated. My plan is to clean it up and only use the parts I really need.
* Line 51 (in version 2.1.2) of CodeIgniter.php has the following include, require(BASEPATH.'core/Common.php'). We'll take Common.php since has functions for error management and logging. 
* Copy core/Common.php and also core/Exceptions.php
* Open core/Common.php and have a look. On line 349 is the function log_message defined. CI_Log in libraries/Log.php is loaded using the function load_class. Let's take this file as well, it will probably come in hande sooner or later.
* Create the directory libraries in system, e.g. example1/system/libraries. Copy Log.php into this new directory.
* There is the file Unit_test.php in libraries. We need a good unit testing tool so let's take this file also.

Try to run index.php from command line:
```
php index.php
```

You'll get an error complaining about the paths.

Next steps. You can try to run index.php after each step to see what's going on:

 * Change $application_folder to '.' in index.php 
 * create the folder config and copy the file application/config/constants.php into it
 * copy the file application/config/config.php into the folder config
 * Copy the folder application/errors with contents to ./errors
 * Copy application/config/routes.php to config

CodeIgniter loads a bunch of classes using the function load_class defined in system/core/Common.php

```
$ grep -nr load_class *
system/core/CodeIgniter.php:115:	$BM =& load_class('Benchmark', 'core');
system/core/CodeIgniter.php:124:	$EXT =& load_class('Hooks', 'core');
system/core/CodeIgniter.php:138:	$CFG =& load_class('Config', 'core');
system/core/CodeIgniter.php:158:	$UNI =& load_class('Utf8', 'core');
system/core/CodeIgniter.php:165:	$URI =& load_class('URI', 'core');
system/core/CodeIgniter.php:172:	$RTR =& load_class('Router', 'core');
system/core/CodeIgniter.php:186:	$OUT =& load_class('Output', 'core');
system/core/CodeIgniter.php:206:	$SEC =& load_class('Security', 'core');
system/core/CodeIgniter.php:213:	$IN	=& load_class('Input', 'core');
system/core/CodeIgniter.php:220:	$LANG =& load_class('Lang', 'core');
system/core/Common.php:121:if ( ! function_exists('load_class'))
system/core/Common.php:123:	function &load_class($class, $directory = 'libraries', $prefix = 'CI_')
system/core/Common.php:183:* called by the load_class() function above
system/core/Common.php:308:		$_error =& load_class('Exceptions', 'core');
system/core/Common.php:330:		$_error =& load_class('Exceptions', 'core');
system/core/Common.php:358:		$_log =& load_class('Log');
system/core/Common.php:481:		$_error =& load_class('Exceptions', 'core');
```

Remove some classes:

 * Let's keep Benchmark on row 115. Copy the file system/core/Benchmark.php into your system/core folder
 * Comment out Hooks on row 124
 * Comment out row 131
 * Keep Config on row 138. Copy the file system/core/Config.php into your system/core folder
 * Comment out Utf8 on row 158
 * Keep URI on row 165. Copy the file system/core/Uri.php into your system/core folder
 * Keep Router on row 182. Copy the file system/core/Router.php into your system/core folder
 * Keep Output on row 186. Copy the file system/core/Output.oho into your system/core folder
 * Comment out Security on row 206
 * Comment out Input on row 213
 * Comment out Lang on row 220


Try to run index.php again. You should now get some valid HTML output with a error saying the default route haven't been configured.
```
php index.php
		<p>Unable to determine what should be displayed. A default route has not been specified in the routing file.</p>	</div>
...
```

Now we have a basic framework that can be used as the starting point for new applications. Additional components of CodeIgniter can be added when needed.



