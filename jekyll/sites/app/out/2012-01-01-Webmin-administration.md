---
layout: post
description: Webmin
title: Webmin
date: 2012-01-01
author: Jonas Colmsjo
tags: ['post']
---

Yet another post





[[Wiki]]


h1. Webmin administration

The Subversion server is used as the controller for Webmin. Webmin is installaed in all servers:
https://svn.gizurcloud.com:10000/ 


h2. Register servers

All servers must be registered from the webim controller:
# Webmin -> Webmin Configuration -> Regsiter a new server




h2. Setup monitoring

h3. Setup
# Others -> System and Server status -> Scheduled monitoring
## Setup every 5 minutes
## Send mails to admin@gizur.com


h3. Things to monitor

Disk space:
# Add monitor of type : Disk space
## Select all servers
## Percentage of total: 30%

Alive system:
# Add monitor of type : Alive system
## Select all servers





