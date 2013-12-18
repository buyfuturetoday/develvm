
---
layout: post
title: OpenERP on OSX
date: 2013-04-14
author: Jonas Colmsjo
---

OpenERP on OSX





## Introduction

I tried to build OpenBravo without success. Let's see if I have more success with OpenERP.


 * https://launchpad.net/openobject
 * http://doc.openerp.com/v6.1/contribute/index.html#how-to-contribute-link


 ## Installation


 ```
bzr branch lp:openobject-server
```

Build and install:

```
python setup.py help
python setup.py build
sudo python setup.py install
```


Try to start the server:


```
./openerp-server --addons-path=~/home/workspace/stable/addons
...
ImportError: No module named PIL
```

I have created an issue about this: http://help.openerp.com/question/14169/howto-install-openobject-server-on-osx/


### Troubleshooting

Try to install PIL:

```
pip install PIL
```




Build a zip (not sure what it's good for):

```
python setup.py sdist --format=zip
...
ls dist
```

