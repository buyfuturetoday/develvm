
---
layout: post
title: Debugging nodejs
date: 2012-10-10
author: Jonas Colmsjo
tags: ['post']
---

There are tools for debugging NodeJS





Some alternativs:

 * http://docs.nodejitsu.com/articles/getting-started/how-to-debug-nodejs-applications
 * http://nodejs.org/api/debugger.html
 * https://github.com/joyent/node/wiki/using-eclipse-as-node-applications-debugger

# node-inspector



```
# Start the program in debug mode
node --debug-brk export-issues 
debugger listening on port 5858

# Start the debugger
node-inspector
   info  - socket.io started
visit http://0.0.0.0:8080/debug?port=5858 to start debugging

```
