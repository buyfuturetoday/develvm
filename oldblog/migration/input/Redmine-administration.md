[[Wiki]]


h1. Redmine installation

* http://www.redmine.org/projects/redmine/wiki/HowTos

<pre>
sudo add-apt-repository ppa:ondrej/redmine
sudo apt-get update
sudo apt-get install redmine redmine-mysql

sudo ln -s /usr/share/redmine/public /var/www/redmine

sudo apt-get install libapache2-mod-passenger
sudo a2enmod passenger

sudo cp /usr/share/redmine/templates/database.yml.template /etc/redmine/default/database.yml
sudo vi /etc/redmine/default/database.yml

production:
  adapter: mysql
  database: redmine
  host: localhost
  username: redmine 
  password: A2QFnFSAjGxqPb2P
  encoding: utf8


cd /usr/share/redmine/
sudo rake db:migrate RAILS_ENV="production"

sudo rake redmine:load_default_data RAILS_ENV="production"

chown www-data:www-data /var/log/redmine/default/production.log

</pre>


Edit Apache configuration in Scalr:
<pre>
<Directory {$document_root}>
    RailsBaseURI /
    PassengerResolveSymlinksInDocumentRoot on
</Directory>
</pre>


Open http://redmine.sbx.gizurcloud.com/
<pre>
cat /var/log/redmine/default/production.log 

</pre>