
---
layout: post
title: Docco
date: 2012-08-12
author: Jonas Colmsjo
---

JavaDoc, PHPDoc etc. to heavy for your project? Use a simple and lightweight alternative





Links:

 * http://jashkenas.github.com/docco/
 * https://github.com/mojombo/jekyll/wiki/Install

## For OSX

```
# Install pygments

brew install python
export PATH="/usr/local/share/python:${PATH}"
easy_install pip
pip install --upgrade distribute
pip install pygments

# Node needs to be installed
sudo npm install docco -g
```


## Alternative

Having upgraded nodejs (and npm), I did this instead:
```
# Python needs to be installed
sudo easy_install Pygments

# Make sure that coffee is installed
npm install coffee-script

# install docco
npm install docco
```
