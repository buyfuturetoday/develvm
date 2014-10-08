---
layout: post
description: Setup apex urls like gizur
title: Setup apex urls like gizur
date: 2012-08-15
author: Jonas Colmsjo
tags: ['post']
---

DNS configuration for apex url is not as simple as one might expect...





A CNAME can't be setup in the DNS for an apex url like gizur.com, only A record can be used.

CloudFront and Route 53 do not support apex urls at the moment. There is some support for Route 53 and ELB though.
 * http://docs.amazonwebservices.com/ElasticLoadBalancing/latest/DeveloperGuide/using-domain-names-with-elb.html

http://wwwizer.com/ can be used though, just setup an A record pointing to 174.129.25.170. Not sure how well this scales but it should work small scale.
