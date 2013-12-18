
---
layout: post
title: Create mirror using wget
date: 2012-08-15
author: Jonas Colmsjo
---

Create static html files appropriate for CDN:s





Site (or parts of sites) that are to be distributed using a CDN (Content Distribution Networks) needs to be downloaded into plain html files. This can be done with wget.

Links:

 * http://www.kdaweb.com/resources/using-wget-to-mirror-websites

The following seams to work on OSX:

```
wget -r -k -E http://www.example.com/
```
