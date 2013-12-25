---
layout: post
description: Nodejs on heroku
title: Nodejs on heroku
date: 2012-10-18
author: Jonas Colmsjo
tags: ['post']
---

Get started with NodeJS on Heroku





1. Register for an account on heroku.com
1. Install heroku toolbelt - https://toolbelt.heroku.com/
1. Login running `heroku login` - your SSH key will be uploaded
1. Develop a first app

Save this as web.js:
```
var express = require('express');

var app = express.createServer(express.logger());

app.get('/', function(request, response) {
  response.send('Hello World!');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
```


Save this as package.json:
```
{
  "name": "heroku-node-example",
  "version": "0.0.1",
  "dependencies": {
    "express": "2.5.x"
  },
  "engines": {
    "node": "0.8.x",
    "npm": "1.1.x"
  }
}
```

Install the application locally (I always install globally)
```
# Run in same folder as web.js and package.json are in
npm install -g
```

Check that the install is ok:
```
npm ls 

# for more details
npm ll
```

Install using foreman:
```
# I need to cd to the installation path (since it is installed globally)
cd /usr/local/lib/node_modules/heroku-node-example/

foreman start
```

Test that it is working in a separate terminal:
```
curl -j localhost:5000
```

# Upload to heroku

Create Procfile containing this:
```
web: node web.js
```

Create a git repo:
```
# cd back to the source
cd ~/.../heroku-test1/
git init
git add *
git commit -a -m "Initial commit"
```

Create the app:
```
# create app
heroku create
Creating agile-oasis-4317... done, stack is cedar
http://agile-oasis-4317.herokuapp.com/ | git@heroku.com:agile-oasis-4317.git
Git remote heroku added

# push to heroku
git push heroku master
...
http://agile-oasis-4317.herokuapp.com deployed to Heroku
```

Start a dyno
```
heroku ps:scale web=1

# Check that everything is ok:
heroku ps
```

# Test

Test the app, I got this URL, see above:

 * http://agile-oasis-4317.herokuapp.com/

The app can also be run like this:
```
heroku open
```

# Logs and finetuning

```
heroku logs
```

Set envionment vairables:
```
heroku config:add NODE_ENV=production
```

Connect to remote heroku node from terminal (in order to experiment):
```
heroku run node
```

# Add ons

There is a large number of addons

One example:

 * https://addons.heroku.com/scheduler




