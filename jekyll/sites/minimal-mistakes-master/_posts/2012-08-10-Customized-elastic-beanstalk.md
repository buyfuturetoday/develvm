---
layout: post
description: Customized elastic beanstalk
title: Customized elastic beanstalk
date: 2012-08-10
author: Jonas Colmsjo
tags: ['post']
---

Need to make changes to Elastic Beanstalk servers?





You can't update the httpd.conf from AWS console. You must login and crate a new AMI and then configure Beanstalk to use this AMI though.

* http://serverfault.com/questions/373092/how-to-configure-apache-on-amazon-elastic-beanstalk

* http://docs.amazonwebservices.com/elasticbeanstalk/latest/dg/using-features.customami.html

