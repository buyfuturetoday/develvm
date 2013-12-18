This repo contains my blog. It is developed with docpad.


Introduction
-----------

Just do an install and all required modules will be downloaded: `npm install`

To run locally: `docpad run`

In order to install on Heroku: `heroku create`

Push to Heroku: `git push heroku master`

View the logs: `heroku logs`

View blog (in case you've forgotten the URL): `heroku open`



Troubleshooting
---------------

This error is fairly common:

```
error: An error occured: 
Error: EMFILE, open '/Users/jonas/git/colmsjo/myblog2/docpad-site/out/posts/130721_Streams_in_NodeJS.html'
```

This is caused by node opening more files that the OS allows. Change the number of files that can be opened
runing this in the terminal: `ulimit -n 8192`


Links:

 * http://docpad.org/docs/troubleshoot#i-m-getting-emfile-too-many-open-files



Conversion from blacksmith to docpad
------------------------------------

I've converted the blacksmith headers of my blog that is written in markdown to docpad headers.

Run the conversion like this:

```
# Run the conversion script for all files in the posts folder
# There is a backup of the files in the posts.bak folder (this is for OSX where xargs seams to differ
# from othe *nixes)
find docpad-site/src/documents/posts -print | xargs -I {} -t ./to-docpad.pl {}
```


Running in docker.io
--------------------

The Dockerfile defines a docker container (lighweight linux containers, like heroku).

Start a container like this

```
# First build an image
>docker build .
...
Step 7 : CMD ["node", "/src/node_modules/docpad/bin/docpad-server"]
 ---> Running in 3b394bee2000
 ---> 9a5834b0daee
Successfully built 9a5834b0daee

# Start a container using the new image
>docker run 9a5834b0daee
4835d9681c02

# Show stdout of the container
>docker logs 4835d9681c02
info: Welcome to DocPad v6.45.0
info: Plugins: 
info: Environment: development
info: DocPad listening to http://localhost:9778/ on directory /out
info: Generating...
notice: DocPad is currently running without any plugins installed. You probably want to install some: http://docpad.org/plugins
info: Generated all 0 files in 0.068 seconds
OK

# Show info on running containers
>docker ps
ID                  IMAGE               COMMAND                CREATED              STATUS              PORTS
66c896e7fb03        0c2bde3dd6e8        node /src/node_modul   About a minute ago   Up About a minute   49155->9778         

# Get the contents of the start page of the blog
>curl http://localhost:49155

# get the NATed network adress for the container
>docker inspect 3b394bee2000
...
    "NetworkSettings": {
        "IPAddress": "172.16.42.17",
        "IPPrefixLen": 24,
        "Gateway": "172.16.42.1",
...

```


## Troubleshooting docpad

It is useful to attach to the terminal of a container when trying to resolve problems with docpad:

```
# Start the docpad container and run a shell
docker run -t -i [IMAGE ID] /bin/bash

# Run docpad with debug output
./node_modules/docpad/bin/docpad run -d

```
