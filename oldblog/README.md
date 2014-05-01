Blog build on node using blacksmith and http-server
==================================================

blacksmith is a CMS that generates html from markup. The html is servered using the node package http-server

More in blacksmith: http://blog.nodejitsu.com/introducing-blacksmith


Install
------

Just do a install and all required modules will be downloaded
```
npm install
```

In order to install on Heroku:
```
heroku create
```


Generate html
-------------

Just do:
```
./bin/render.sh
```

View changes on local machine:
```
./bin/server.sh
```


Publish
------

A http-server is hosted in Heroku

Push to Heroku:
```
git push heroku master 
```


View blog (in case you've forgotten the URL):
```
heroku open
```


Todo
---

It would be nice if the markdown (or all) source files could be fetched directly from github etc.
