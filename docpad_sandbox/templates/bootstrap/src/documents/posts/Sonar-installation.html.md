
---
layout: post
title: Sonar
date: 2012-01-01
author: Jonas Colmsjo
---

Yet another post





[[Wiki]]

h1. Sonar installation


<pre>
sudo apt-get install maven2
wget http://dist.sonar.codehaus.org/sonar-2.14.zip

mv sonar-2.14 /opt

cd /opt/sonar-2.14/bin/linux-x86-32
./sonar.sh start

mvn clean install 
mvn sonar:sonar

</pre>

Browse to http://localhost:9000

For administration features, default login/password is admin/admin.

PHP plugin
* http://docs.codehaus.org/display/SONAR/Install+PHP+Plugin+for+Sonar
* http://docs.codehaus.org/display/SONAR/Analyse+a+PHP+project

<pre>
pear version
pear upgrade pear

# Not needed php go-pear.phar

pear channel-discover pear.phpunit.de
pear channel-discover pear.symfony-project.com
pear install phpunit/PHPUnit-3.5.5

apt-get install make
 
apt-get install php5-dev
pecl install xdebug

# And then edit your $PHP_HOME/cli_php.ini file to add the following line:
# zend_extension="FULL_PATH_TO/xdebug.so"

pear channel-discover pear.pdepend.org
pear install pdepend/PHP_Depend-0.10.7

pear channel-discover pear.phpmd.org
pear install --alldeps phpmd/PHP_PMD-1.2.0

pear install PHP_CodeSniffer-1.3.2

cd /opt/sonar-2.14/extensions/plugins

wget http://repository.codehaus.org/org/codehaus/sonar-plugins/php/sonar-php-plugin/1.0/sonar-php-plugin-1.0.jar
/opt/sonar-2.14/bin/linux-x86-32/sonar.sh restart

cd ~/dwnl
wget http://repository.codehaus.org/org/codehaus/sonar-plugins/sonar-runner/1.2/sonar-runner-1.2.zip
unzip sonar-runner-1.2.zip
mv sonar-runner-1.2 /opt

sudo vi /etc/environment
# 2012-03-28, Jonas Colmsjö, Sonar installation
PATH="$PATH:/opt/sonar-runner-1.2/bin"
</pre>



<pre>
sudo vi /root/svn/gom-prod/root-dir/var/www/html/vtigercikab/sonar-project.properties

# required metadata
sonar.projectKey=gizur:gom
sonar.projectName=GOM
sonar.projectVersion=1.0
 
# path to source directories (required)
sources=. CHANGE NOT SUPPORTED!
 
# path to test source directories (optional)
# tests=testDir1,testDir2
 
# path to project binaries (optional), for example directory of Java bytecode
# binaries=binDir
 
# optional comma-separated list of paths to libraries. Only path to JAR file and path to directory of classes are supported.
# libraries=path/to/library.jar,path/to/classes/dir
 
 
# Uncomment those lines if some features of java 5 or java 6 like annotations, enum, ... 
# are used in the source code to be analysed
#sonar.java.source=1.5
#sonar.java.target=1.5
 
 
# Uncomment this line to analyse a project which is not a java project. 
# The value of the property must be the key of the language.
sonar.language=php
 
# Advanced parameters
# my.property=value


sonar-runner -Dproject.settings=/root/svn/gom-test/root-dir/var/www/html/vtigertest/sonar-project.properties

</pre>


h3. PHP Unit setup for sonar

Hi, you have to specify the property "sonar.phpUnit.analyze.test.directory" and set it to the relative path of the root folder of your tests.

However, please note that from PHP Plugin 1.0, the preferred way of executing PHPUnit tests is to specify the property "sonar.phpUnit.configuration" that must point to your PHPUnit configuration file (property documented here: http://docs.codehaus.org/display/SONAR/PHP+plugin+configuration+options)




h2. Maven


Sonar seams to need builds on maven:
* http://www.php-maven.org/

<pre>
<settings>
	<profiles>
		<profile>
			<id>profile-php-maven</id>
			<pluginRepositories>
				<pluginRepository>
					<id>release-repo1.php-maven.org</id>
					<name>PHP-Maven 2 Release Repository</name>
					<url>http://repos.php-maven.org/releases</url>
					<releases>
						<enabled>true</enabled>
					</releases>
				</pluginRepository>
				<pluginRepository>
					<id>snapshot-repo1.php-maven.org</id>
					<name>PHP-Maven 2 Snapshot Repository</name>
					<url>http://repos.php-maven.org/snapshots</url>
					<releases>
						<enabled>false</enabled>
					</releases>
					<snapshots>
						<enabled>true</enabled>
					</snapshots>
				</pluginRepository>
			</pluginRepositories>
			<repositories>
				<repository>
					<id>release-repo1.php-maven.org</id>
					<name>PHP-Maven 2 Release Repository</name>
					<url>http://repos.php-maven.org/releases</url>
					<releases>
						<enabled>true</enabled>
					</releases>
				</repository>
				<repository>
					<id>snapshot-repo1.php-maven.org</id>
					<name>PHP-Maven 2 Snapshot Repository</name>
					<url>http://repos.php-maven.org/snapshots</url>
					<releases>
						<enabled>false</enabled>
					</releases>
					<snapshots>
						<enabled>true</enabled>
					</snapshots>
				</repository>
			</repositories>
		</profile>
	</profiles>

	<activeProfiles>
		<activeProfile>profile-php-maven</activeProfile>
	</activeProfiles>
</settings>


</pre>



h2. phpdoc


* http://www.phpdoc.org/

<pre>
sudo apt-get install php-pear php5-xsl libgv-php5 graphviz
sudo pear channel-discover pear.phpdoc.org
sudo pear install pear install phpdoc/phpDocumentor-2.0.0a1

</pre>


Run in the project:
<pre>
phpdoc -d . -t docs
</pre>
