Howo to use:

```
# Build an image
docker build  mongodb .

# Start the container
docker run -d mongodb

# Install mongo client
sudo apt-get install -y mongodb-clients

# Get IP of the started container
docker inspect [container ID]

# Connect to mongo
mongo [IP]:27017
```
