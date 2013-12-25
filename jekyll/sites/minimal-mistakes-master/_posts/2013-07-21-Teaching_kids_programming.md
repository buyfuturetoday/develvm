---
layout: post
description: Teaching kids programming
title: Teaching kids programming
date: 2013-07-21
author: Jonas Colmsjo
tags: ['post']
---


I wrote this short article after showing my 11 years old boy howto develop a simple web app.

We using a mac but it works just as well with windows or some linux flavour (or any other OS).

## Preparations

Three applications needs to be installed and you need to register for a free Heroku account:

 * NodeJS and npm - http://nodejs.org/download/
 * Heroku account and toolbelt
  * Register for an account at https://id.heroku.com/signup
  * Download toolbelt - https://toolbelt.heroku.com/
 * git - download at http://git-scm.com/downloads
 

 A text editor is also needed. we're using nano which is included in OSX, this way we only need a terminal window and the browser.
 

Open a terminal window and do this:

```
>heroku login
```

Enter the mail adress and login you registered with heroku.


## Article 1

Create a folder to put the app in:

```
>mkdir web-appar
>cd web-appar
>mkdir hello
>cd hello
```

Create a git repository (just google git for an introduction) and create a new heroku app:

```
>git init
>heroku create
```

Create these three files.

app.js:

```
>nano app.js
```

```
var express = require('express');
var PORT = process.env.PORT || 8080;
var app = express();
app.get('/', function (req, res){
  res.send('hello everyone i am Algolt and i am eleven years old.');
});
app.get('/bajs', function (req, res){
  res.send('Harry loves poop.');
});
app.listen(PORT);
console.log('running on http://localhost:' + PORT);
```

package.json:

```
nano package.json
```
```
{
  "name":"algot-app",
  "dependencies": {
   "express": "*"
  }
}
```

Procfile:

```
>nano Procfile
```

```
web: node app.js
```

Try to run the app on the local computer:

```
>npm install
>node app.js
```

Open http://localhost:8080 in your favorite browser.

Then hit `ctrl+c` in the terminal to stop the web server.

Publish the app to heroku:

```
>git add .
>git commit -am "my first app"
>git push heroku master
```

This will open the heroku app in a browser:

```
>heroku open
```






