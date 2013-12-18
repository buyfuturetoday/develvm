
---
layout: post
title: Cfengine language intro
date: 2012-08-30
author: Jonas Colmsjo
tags: ['post']
---

Getting started with cfengine promises (the language)





# Getting started with configurations

The learning curve for cfengine seams rather steep. I started with reading this crash course: https://cfengine.com/manuals/cf3-Reference#A-simple-crash-course

You should now be familiar with these concepts:

 1. promiser-type
 1. associations - are used by the promiser-type
 1. promiser - the abstract object making the promise
 1. promisee - the abstract object to whom the promise is made


Generalized syntax:

```
type:
     
        classes::
     
         "promiser" -> { "promisee1", "promisee2", ... }
     
            attribute_1 => value_1,
            attribute_2 => value_2,
            ...
            attribute_n => value_n;
```

You should also have learned the best practices when writing promises:
```
    comment => "Update the configuration from a master server",
    handle     => "update_policy",

    depends_on => {"serve_updates"},

```

Show availande classes:
```
sudo cf-promises -v
```

Types of hosts:

 * cf-agent - Keeps promisis in common and agent
 * execd - Runs agent and also keeps promisis in common
 * monitord - keeps promisis in common and monitor
 * serverd - Keeps promisis in common and server
 * cf-report - print reports from the cfengine database, keeps promisis in common

Now take a look at this: https://cfengine.com/manuals/cf3-solutions/
