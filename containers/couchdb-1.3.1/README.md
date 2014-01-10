Couchdb image
============

Generate admin password and update local.ini: `date | md5sum`

Allow CORS:

```
export HOST=http://admin:mysecretpassword@app1.jacc.local:8080
curl -X PUT $HOST/_config/httpd/enable_cors -d '"true"'
curl -X PUT $HOST/_config/cors/origins -d '"*"'
curl -X PUT $HOST/_config/cors/credentials -d '"true"'
curl -X PUT $HOST/_config/cors/methods -d '"GET, PUT, POST, HEAD, DELETE"'
curl -X PUT $HOST/_config/cors/headers -d '"accept, authorization, content-type, origin"'
```

Use kanso etc. to deploy couchapps: `sudo npm install -g kanso`
