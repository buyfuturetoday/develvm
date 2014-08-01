Usage
-----

Build the docker image and start a container:

```
# Build an image
docker build  .

# Start the container
docker run -d [IMAGE ID]

# Get IP of the started container
docker inspect [container ID]
```

Test that the odata service works: `curl --user admin:admin http://[IP]:52999/newsreader.svc$metadata`

If yo want to make sure that `mongod` is runing:

```
# Install mongo client
sudo apt-get install -y mongodb-clients

# Connect to mongo
mongo [IP]:27017
```


Notes
-----

The `odata-server` `package.json` file is broken. The `connect` module needs to be exactly version `2.0.0`. There is a fix for this in the `Dockerfile`.