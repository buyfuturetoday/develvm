
---
layout: post
title: Redmine
date: 2012-01-01
author: Jonas Colmsjo
tags: ['post']
---

Yet another post





[[Main_Page]] > [[IT resources]]

#= Installation =

* http://www.redmine.org/projects/redmine/wiki/HowTos

<pre>
yum -y install zlib-devel curl-devel openssl-devel httpd-devel apr-devel apr-util-devel mysql-devel ftp

# Get a newer version of ruby than available via yum
cd dwnl
ftp ftp.ruby-lang.org
cd /pub/ruby
get ruby-1.8.7-p352.tar.gz
quit

tar zxvf ruby-1.8.7-p352.tar.gz ruby-1.8.7-p352
cd ruby-1.8.7.p352
./configure
make
make install
ruby -v
which ruby
cd ..

# Get gems
wget http://production.cf.rubygems.org/rubygems/rubygems-1.8.11.tgz
tar zxvf rubygems-1.8.11.tgz rubygems-1.8.11
cd rubygems-1.8.11
ruby setup.rb
gem -v
which gem
cd ..

# Install passenger, aka. modrails
gem install passenger
passenger-install-apache2-module

# Restart apache
service httpd restart

# Downlaod redmin
# wget http://rubyforge.org/frs/download.php/75097/redmine-1.2.1.tar.gz  # GET LATEST VERSION ON RUBYFORGE
wget http://rubyforge.org/frs/download.php/75097/redmine-1.2.1.tar.gz
tar zxvf redmine-1.2.1.tar.gz

# Copy redmine to www-folder
mkdir /var/www/redmine
cp -av redmine-1.2.1/* /var/www/redmine

# Install bundler
gem install bundler

# Create gem-file
cd /var/www/redmine
touch Gemfile
vi Gemfile

source "http://rubygems.org"
gem "rake", "0.8.3"
gem "rack", "1.1.0"
gem "i18n", "0.4.2"
gem "rubytree", "0.5.2", :require => "tree"
gem "RedCloth", "~>4.2.3", :require => "redcloth" # for CodeRay
gem "mysql"
gem "coderay", "~>0.9.7"


bundle install

# Create MySQL database
# Just use phpMyAdmin - its easier
create database redmine character set utf8;
create user 'redmine'@'localhost' identified by 'my_password';
grant all privileges on redmine.* to 'redmine'@'localhost'; 

# rename database.yml.example
# NOT SURE HOW
cd /var/www/redmine/config
mv database.yml.example database.yml

# Uncomment the following line in file redmine/config/environment.rb
ENV['RAILS_ENV'] ||= 'production'

# Generate the session store
RAILS_ENV=production bundle exec rake generate_session_store

# Migrate the database models
RAILS_ENV=production bundle exec rake db:migrate

# Load default data (optional)
RAILS_ENV=production bundle exec rake redmine:load_default_data

# Rename dispatch CGI files
cd /var/www/redmine/public
mv dispatch.cgi.example dispatch.cgi
mv dispatch.fcgi.example dispatch.fcgi
mv dispatch.rb.example dispatch.rb

# Edit .htaccess file for CGI dispatch configuration
mv htaccess.fcgi.example .htaccess

# Chown and Chmod files for read/write access for the Apache user
cd ../..
chown -R apache:apache redmine
chmod -R 755 redmine

</pre>


The apache configuration needs to setup as well. A new virtual host can for instance be setup:
<pre>
vi /etc/httpd/conf.d/remone.conf   # this will automatically be loaded via an Include in httpd.conf

#
# Jonas C. 111108
#
# Ruby installed for Redmin
#

LoadModule passenger_module /usr/local/lib/ruby/gems/1.8/gems/passenger-3.0.9/ext/apache2/mod_passenger.so
PassengerRoot /usr/local/lib/ruby/gems/1.8/gems/passenger-3.0.9
PassengerRuby /usr/local/bin/ruby

Listen 81

<VirtualHost *:81>
    ServerName gizur2.dyndns.org 
    DocumentRoot /var/www/redmine/public
    <Directory />
        Allow from all
        Options -MultiViews
    </Directory>
</VirtualHost>




# Also make sure that the port is open in the firewall
vi /etc/sysconfig/iptables

# restart the services
service httpd restart
service iptables restart

</pre>
