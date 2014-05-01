Yet another post

[meta:author]: <> (Jonas Colmsjo)
[meta:title]: <> (Development-architecture.md)
[meta:date]: <> (2012-01-01)
[meta:nested:key]: <> (Metadata value)

##!!truncate


[[wiki]] > [[Technical Architecture]]

h1. Development Architecture


h2. Overview

The development architecture consists of the following tools:
* This Redmine portal
** Issues
** Wiki
** Functional and Technical Design Documents
* DokuWiki - for system documentation
* Testlink - for documentation of tests
* Source Code Management system (SCM) based on Subversion and shell scripts
* PHP/MySQL environments for vTiger etc.
** Sandbox
** Development
** Test
** QA
** Production environments


h2. Coding standards

phpdoc is used to create documentation:
* http://www.phpdoc.org/docs/latest/for-users/anatomy-of-a-docblock.html
* http://phpmaster.com/introduction-to-phpdoc/

These coding standards should be followed:
* http://pear.php.net/manual/en/standards.php


h3. phpdoc

phpdoc is automatically executed on the vtigertest repository. The documentation can be found here:
* http://phpdoc.gizurcloud.com/


h3. About PHPUnit

Unit testing is “is a method of testing that verifies the individual units of source code are working properly”
Unit Testing in short is a 
1.	unit: the smallest testable code of an app
-	procedural: function or procedure
-	OOP: a method
2.	Test: code that checks code on
-	functional behavior
-	expected results
-	unexpected failures

PHPUnit is a set of tools to test PHP pages for errors.. The difference is between testing, that is, checking that program behaves as expected, and performing a battery of tests, runnable code-fragments that automatically test the correctness of parts (units) of the software. These runnable code-fragments are called unit tests

See PHPUnit.docx below for more details.


h2. SCM

Subversion is used for configuration management. Code that is commited to subversion is automatically deployed on the application servers. There are separate subversion repositories for development, test and producttion. Access to the reposirotiers are controlled via the subversion configuration file (s2.gizur.com:/etc/svn-access-control)

If you're new to subversion, check-out some introduction like this (or just Google):
* Short - http://www.froihofer.net/en/students/svn-intro.html
* In depth - http://svnbook.red-bean.com/

Subversion can be used from the prompt and there are also GUI:s
* For windows Tortoise is commonly used - http://tortoisesvn.tigris.org/
* For Linux there is not single given GUI, Google or give this a try http://rabbitvcs.org/

Repositories:
* Development - https://s2.gizur.com/svn/gom-dev
* Test - https://s2.gizur.com/svn/gom-test
* Production - https://s2.gizur.com/svn/gom-prod

The structure of the root-dir directory in the repositories is the same as the dicrectory structure of the linux application servers. 

Directory structure of the gom-dev repository:
* root-dir
** etc
** root
*** scripts
** var
*** www
**** html
***** vtigersbx
****** The vTigerCRM structure
***** vtigerdev
****** The vTigerCRM structure
* setup
* tests
* developers
** jonas
** essindia
** ...

Directory structure of the gom-test repository:
* root-dir
** etc
** root
*** scripts
** var
*** www
**** html
***** vtigertest
****** The vTigerCRM structure
* setup

Directory structure of the gom-prod repository:
* root-dir
** etc
** root
*** scripts
** var
*** www
**** html
***** vitger<client>
****** The vTigerCRM structure
***** vtigerbase
****** The vTigerCRM structure
* setup


h2. Deployment of code

h3. Development and Sandbox environments

The directory /root-dir/var/www/html/vtigerdev is used for deploying in the development environment. This environment is used during development and unit testing.
The directory /root-dir/var/www/html/vtigersbx is used for "playing around". This environment is "reset" periodically by copying the contents of vtigerdev. 


h3. Test environment

Deployment from the development environment to test is performed using a shell script. This script simply copies file by file from vtigerdev to vtigertest.
Each Change Request must contain a list of the files that have been modified. The deployment script is developed by the Configuration Manager (currently at Gizur).

Deployment to test:
# Copy the file gom-test/setup/issues/template-deployment-descriptor to gom-test/setup/issues/deployment-descriptor-issue<NUMBER>
# Edit the new file
## Enter the files to de be deployed in the template (make sure the spelling is correct, file names are case sensitive)
## Also enter the directories that need to be created in the template
# Test the deployment descriptor running: deploy-issues-to-test.sh deployment-descriptor-issue<NUMBER>
# NOW, check that the files have been copied from the gom-dev repository ti gom-test as expected
# This deployment descriptor should be attached to the issue


h3. Production environment

Deployment to the production environment is performed in the same way as to the test environment. The same deployment script is used.
