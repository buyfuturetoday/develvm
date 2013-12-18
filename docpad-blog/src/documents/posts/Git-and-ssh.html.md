
---
layout: post
title: Git and ssh
date: 2012-09-19
author: Jonas Colmsjo
tags: ['post']
---

Time to understand a little of how git and SSH works?





I have repositories at github, bitbucket and assembla. SSH keys needs to be setup in order to avoid having to enter username and pasword all the time.

# Git, SSH and Identity files

First create a workspace with a git repository.

Make sure that the SSH keys are setup properly. I've create directories in ~/.ssh for the different git hosts. My ~/.ssh/config file looks like this
```
IdentityFile ~/.ssh/%h/id_rsa
IdentityFile ~/.ssh/%h/id_dsa
IdentityFile ~/.ssh/id_rsa
IdentityFile ~/.ssh/id_dsa
```

More about Identityfiles:
 * http://www.kelvinwong.ca/2011/03/30/multiple-ssh-private-keys-identityfile/

Then add Assembla as an origin for the repository that should be pushed (intern in this example):
```
git remote add assembla git@git.assembla.com:gizur-intern.git
```

Push the repository to the new server:
```
git push assembla master
```

More about git remotes:
 * http://gitref.org/remotes/
