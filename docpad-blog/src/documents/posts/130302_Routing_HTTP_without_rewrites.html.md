
---
layout: post
title: Routing HTTP without apache rewrite rules
date: 2013-03-02
author: Jonas Colmsjo
tags: ['post']
---

Routing HTTP without apache rewrite rules - L7 proxy





Wouldn't it be nice to manage without re-write rules in apache. It would also be nice of the HTTP routing could be detached from a single Elastic Beanstalk/Heroku etc. application.

One alternative is to setup a proxy using HAProxy or ngix etc. Still, it would be better if this can be done
in a modern solution like NodeJS. And actually it can, using node-http-proxy.

 * https://github.com/nodejitsu/node-http-proxy


Let's take a example.

I want to use URL like these

1. App X at gizur.com/X
1. App Y at gizur.com/Y

The requests should transparently be routed to:

1. App X at x.paas.com
1. App Y at y.paas.com 

How is this achived with http-proxy?


```
npm install http-proxy

```


# Reverse proxy

Reverse proxies can only be used to route to URL:s on the same server

Router app:

```
var http = require('http'),
    httpProxy = require('http-proxy');

var proxy = new httpProxy.RoutingProxy();


var options = {
  router: {
    'localhost/X': '127.0.0.1:8001',
    'localhost/Y': '127.0.0.1:8002',
  }
};


var proxyServer = httpProxy.createServer(options);
proxyServer.listen(80);
```

Simple app to route the request to:

```
var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write('request successfully proxied: ' + req.url +'\n' + JSON.stringify(req.headers, true, 2));
  res.end();
}).listen(8001); // change to 8002 for app Y

```


# Forwarding proxy

A really simple router:

```
var httpProxy = require('http-proxy');

var options = {
  router: {
    'localhost/X': 'wip.herokuapp.com',
    'localhost/Y': 'wip.herokuapp.com',
  }
};

httpProxy.createServer(options).listen(80);
```

Pretty much the same thing but with some logging and a lot more flexibility:

```
var httpProxy = require('http-proxy');

httpProxy.createServer(function (req, res, proxy) {

    // console.log('url:'+req.url+' headers:'+JSON.stringify(req.headers));

    var pathMatched  = false,
        defaultRoute = {'host': 'gizur.com', 'port': 80 };

    // Tried to forward to heroku apps but that don't work

    /*var routes = [
        { 'regex': '^/X(/[a-zA-Z0-9])*$',
          'host': 'infinite-crag-4813.herokuapp.com', 
          'port': 80 },

        { 'regex': '^/Y$',  
          'host': 'infinite-crag-4813.herokuapp.com', 
          'port': 80 },
    ];*/

    var routes = [
        { 'regex': '^/X(/[a-zA-Z0-9])*$',
          'host': 'localhost', 
          'port': 8000 },

        { 'regex': '^/Y$',  
          'host': 'localhost', 
          'port': 8000 },

        // Match almost any URL
        { 'regex': '^/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(:[a-zA-Z0-9]*)?/?([a-zA-Z0-9\-\._\?\,\'/\\\+&amp;%\$#\=~])*$',  
          'host': 'localhost', 
          'port': 8000 },
    ];

    for (idx in routes) {
        var regex = new RegExp(routes[idx].regex);

        if (regex.test(req.url)) {
            console.log('Routing '+req.url+' to '+routes[idx].host+':'+routes[idx].port);

            var buffer = httpProxy.buffer(req);

            proxy.proxyRequest(req, res, {
                host: routes[idx].host,
                port: routes[idx].port,
                buffer: buffer
            });

            pathMatched = true;
            break;
        }
    }

    if (!pathMatched) {
        console.log('Unmatched URL:'+req.url+' routing to '+defaultRoute.host+':'+defaultRoute.port);

        var buffer = httpProxy.buffer(req);

        req.url = '/404';

        proxy.proxyRequest(req, res, {
            host: defaultRoute.host,
            port: defaultRoute.port,
            buffer: buffer
        });
    }


}).listen(process.env.PORT || 8080);

```


Proven regular expressions can be found at regexlib.com:

 * Any URL - `^(http|https|ftp)\://[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(:[a-zA-Z0-9]*)?/?([a-zA-Z0-9\-\._\?\,\'/\\\+&amp;%\$#\=~])*$`


# Re-writing headers - CORS

I ran into problems using the forward proxy. Heroku for instance don't like when a request if forwarded
using the solution above. The reason is the content of some HTTP headers. I think that lack of CORS support 
is the reason but I'm not sure (see http://enable-cors.org/).

I'll try to get around this. I received some input here: https://github.com/nodejitsu/node-http-proxy/issues/378#issuecomment-14687480


```
var options = {
  router: {
    'localhost/X': 'wip.herokuapp.com',
    'localhost/Y': 'wip.herokuapp.com',
  },
  changeOrigin: true
};

```

I haven't tested this yet...


Next, using a middleware is suggested if chaning the options isn't enough. Could check this one:

 * https://github.com/senchalabs/connect



# Links

* http://stackoverflow.com/questions/224664/difference-between-proxy-server-and-reverse-proxy-server
* http://cuppster.com/2012/04/10/cors-middleware-for-node-js-and-express/


# Links about proxies and load balancing the old way

* http://serverfault.com/questions/282919/looking-for-alternatives-to-f5-load-balancer
* http://serverfault.com/questions/208981/how-can-i-deploy-a-scalable-reliable-haproxy-cluster-on-amazon-ec2
* https://devcentral.f5.com/blogs/us/making-the-most-of-your-ip-address-space-with-layer-7-switching#.UTIf5n-9KK1
* http://blog.silverbucket.net/post/31927044856/3-ways-to-configure-haproxy-for-websockets
* http://www.conigliaro.org/2010/11/30/high-availability-load-balancing-with-haproxy-and-amazon-elastic-load-balancers-on-ec2/


## Architecture alternatives

1. Elb (L4)->haproxy (L7)->app
1. Dns rr->Elastic IP haproxy (L7)->app
 * need external monitoring of L7
 * DNS Round robin will route requests to a HAprocy even if it is dead -> no good




