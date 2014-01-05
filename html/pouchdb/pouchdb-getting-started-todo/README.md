pouchdb-getting-started-todo
============================

The source repository for the getting started tutorial for PouchDB:

 * http://pouchdb.com/getting-started.html



```
export HOST=http://admin:mysecretpassword@app1.jacc.local:8080
curl -X PUT $HOST/_config/httpd/enable_cors -d '"true"'
curl -X PUT $HOST/_config/cors/origins -d '"*"'
curl -X PUT $HOST/_config/cors/credentials -d '"true"'
curl -X PUT $HOST/_config/cors/methods -d '"GET, PUT, POST, HEAD, DELETE"'
curl -X PUT $HOST/_config/cors/headers -d '"accept, authorization, content-type, origin"'
```


Start HTTP server: `python -m SimpleHTTPServer`


