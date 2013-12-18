
---
layout: post
title: Update your python skills
date: 2013-02-27
author: Jonas Colmsjo
---

Update your Python skills




Links:

* http://www.clemesha.org/blog/modern-python-hacker-tools-virtualenv-fabric-pip/


## Package management in Python

Python don't have a package manager like `npm` for Node. It does have `pip` and 
`virtualenv` though.

```
pip install virtualenv
```

Create a new environment

```
virtualenv venv --distribute
source venv/bin/activate
```

Now python, pip etc will refer t the virtual environment.

Alternative:

```
virtualenv ENV
```

Now use ENV/bin/python, ENV/bin/pip etc. to run python programs and install packages
