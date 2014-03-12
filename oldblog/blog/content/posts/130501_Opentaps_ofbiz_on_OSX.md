Opentaps and ofbiz on OSX

[meta:author]: <> (Jonas Colmsjo)
[meta:title]: <> (Opentaps and ofbiz on)
[meta:date]: <> (2013-05-01)
[meta:nested:key]: <> (Metadata value)

##!!truncate


## Ofbiz

Ofbiz was wasy to start:

```
ant load-demo
ant start
```

Open:

 * http://localhost:8080/ecommerce
 * https://localhost:8443/webtools


```
ant stop
```


## Opentaps


http://www.opentaps.org/docs/index.php/Opentaps_Installation_Manual


Show available commands:

```
ant -p

ant
```

```
ant run-install

# without demo data
ant run-install-seed

# reset admin password
# skip this: ant create-admin-user-login

chmod u+x startofbiz.sh
chmod u+x stopofbiz.sh
./startofbiz.sh 
tail -f runtime/logs/console.log
```

http://localhost:8080/opentaps


```
For the back end web applications, use the username "admin" and the password "opentaps".

For the ecommerce online store application, use username "DemoCustomer" and password "ofbiz".

For the Point Of Sales application, use username "1" and password "1" for a manager and username "2" and password "2" for a cashier. 
```




