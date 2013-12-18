
---
layout: post
title: NodeJS Hosting
date: 2013-02-25
author: Jonas Colmsjo
tags: ['post']
---

NodeJS Hosting




Links:

 * https://github.com/joyent/node/wiki/Node-Hosting
 * http://dreamand.me/cloud/paas-comparison-appfog-vs-heroku/
 * http://blog.appfog.com/how-to-use-appfogs-multi-infrastructure-architecture-in-the-command-line/


## Quick review of hosting alternatives for NodeJS

The two prime candidates seams to be Heroku and Nodejitsu. I've been using Heroku for some time
and it works fine but there are some drawbacks that made me look aroung:

  * It is only possible to bind to *one* port
  * It is not possible to create a private cloud, preferable instance within AWS Ireland region with
    and within my Security Group

Other alternaives:

  * Joyent - same as nodejitsu?
  * appfog.com
   * nodester.com - deployment tools for Node that runs on appfog
   * Cloud Foundry compatible
   * Runs in AWS Ireland
   * git integration not as good as heroku
  * Windows Azure
  



