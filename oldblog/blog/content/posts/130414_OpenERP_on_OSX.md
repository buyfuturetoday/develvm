OpenERP on OSX

[meta:author]: <> (Jonas Colmsjo)
[meta:title]: <> (OpenERP on OSX)
[meta:date]: <> (2013-04-14)
[meta:nested:key]: <> (Metadata value)

##!!truncate


## Introduction

I tried to build OpenBravo without success. Let's see if I have more success with OpenERP.

 * https://doc.openerp.com/install/#installation-link
 * http://www.slideshare.net/openobject
 * https://launchpad.net/openobject
 * http://doc.openerp.com/v6.1/contribute/index.html#how-to-contribute-link


 ## Installation


### Pre-requisites


On ubuntu:

```
apt-get install python-dateutil python-feedparser python-gdata python-ldap \
    python-libxslt1 python-lxml python-mako python-openid python-psycopg2 \
    python-pybabel python-pychart python-pydot python-pyparsing python-reportlab \
    python-simplejson python-tz python-vatnumber python-vobject python-webdav \
    python-werkzeug python-xlwt python-yaml python-zsi

```


Postgres:

```
# see details below
brew install postgres
initdb /usr/local/var/postgres -E utf8
pg_ctl -D /usr/local/var/postgres -l /usr/local/var/postgres/server.log start
export PGDATA=/usr/local/var/postgres/
pg_ctl status
```

Create a postgres user

```
createuser openerp
psql -l
psql template1
alter role openerp with password 'postgres';
```




First create a Python virtual environment using virtualenv:

```
sudo pip install virtualenv
# python-env is a suggested name, any name can be used
virtualenv openerp-env
```


```
cp requirements.txt openerp-env && cd openerp-env
./bin/pip install -r requirements.txt
cd ..
```


```
wget http://nightly.openerp.com/7.0/nightly/src/openerp-7.0-latest.tar.gz
tar -xvzf openerp-7.0-latest.tar.gz
cd openerp
../bin/python setup.py install
```


### Download source


 ```
bzr branch lp:openobject-server
```

Build and install:

```
python setup.py help
python setup.py build
sudo python setup.py install
```


Try to start the server:


```
./openerp-server --addons-path=~/home/workspace/stable/addons
...
ImportError: No module named PIL
```

I have created an issue about this: http://help.openerp.com/question/14169/howto-install-openobject-server-on-osx/


### Troubleshooting

Try to install PIL:

```
pip install PIL
```




Build a zip (not sure what it's good for):

```
python setup.py sdist --format=zip
...
ls dist
```




# Postgres installation



```
brew install postgres

...

# Build Notes

If builds of PostgreSQL 9 are failing and you have version 8.x installed,
you may need to remove the previous version first. See:
  https://github.com/mxcl/homebrew/issues/issue/2510

To build plpython against a specific Python, set PYTHON prior to brewing:
  PYTHON=/usr/local/bin/python  brew install postgresql
See:
  http://www.postgresql.org/docs/9.2/static/install-procedure.html

# Create/Upgrade a Database

If this is your first install, create a database with:
  initdb /usr/local/var/postgres -E utf8

To migrate existing data from a previous major version (pre-9.2) of PostgreSQL, see:
  http://www.postgresql.org/docs/9.2/static/upgrading.html

# Loading Extensions

By default, Homebrew builds all available Contrib extensions.  To see a list of all
available extensions, from the psql command line, run:
  SELECT * FROM pg_available_extensions;

To load any of the extension names, navigate to the desired database and run:
  CREATE EXTENSION [extension name];

For instance, to load the tablefunc extension in the current database, run:
  CREATE EXTENSION tablefunc;

For more information on the CREATE EXTENSION command, see:
  http://www.postgresql.org/docs/9.2/static/sql-createextension.html
For more information on extensions, see:
  http://www.postgresql.org/docs/9.2/static/contrib.html

# Other

Some machines may require provisioning of shared memory:
  http://www.postgresql.org/docs/9.2/static/kernel-resources.html#SYSVIPC
When installing the postgres gem, including ARCHFLAGS is recommended:
  ARCHFLAGS="-arch x86_64" gem install pg

To install gems without sudo, see the Homebrew wiki.

To have launchd start postgresql at login:
    ln -sfv /usr/local/opt/postgresql/*.plist ~/Library/LaunchAgents
Then to load postgresql now:
    launchctl load ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist
Or, if you don't want/need launchctl, you can just run:
    pg_ctl -D /usr/local/var/postgres -l /usr/local/var/postgres/server.log start
==> Summary
🍺  /usr/local/Cellar/postgresql/9.2.4: 2831 files, 39M, built in 2.6 minutes

```


Install pgadmin: http://www.postgresql.org/ftp/pgadmin3/release/v1.16.1/osx/




