
---
layout: post
title: Git related stuff
date: 2012-08-10
author: Jonas Colmsjo
---

Git basics





Some links:
* http://learn.github.com/p/intro.html
* https://git.wiki.kernel.org/index.php/Aliases
* http://gitref.org/index.html

# Basics

## Create local copy of repository - clone

``` 
sudo git clone https://github.com/colmsjo/wip.git
```

## Update remote repository - push

```
sudo git commit -a
sudo git push
```

## Update local repository - pull

```
sudo git pull
```

## Note on new repositories

Might need to create a branch (master):
```
git push origin master
```

Also setup default origin and branch for merge:
```
git config branch.master.remote origin && git config branch.master.merge refs/heads/master
```

# Level two

## Create a new repository on the command line

```
touch README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin https://github.com/colmsjo/test.git
git push -u origin master
```

Push an existing repository from the command line
```
git remote add origin https://github.com/colmsjo/test.git
git push -u origin master
```

Convert a svn repositiry to git

* https://github.com/nirvdrum/svn2git

```
 svn2git http://svn.example.com/path/to/repo --rootistrunk
```

## Avoid entering username and password (on OSX)

* See https://help.github.com/articles/set-up-git

```
curl -s -O http://github-media-downloads.s3.amazonaws.com/osx/git-credential-osxkeychain
chmod u+x git-credential-osxkeychain
sudo mv git-credential-osxkeychain /usr/local/git/bin
git credential-osxkeychain
git config --global credential.helper osxkeychain
```


# Wiki

The open source Gollum wiki manager is used. Markdown (and other markups) are supported.

## Images
* https://github.com/mojombo/gollum-demo/blob/master/Mordor/Eye-Of-Sauron.md


# Advanced stuff

## Merge two repositories into one

* http://jasonkarns.com/blog/merge-two-git-repositories-into-one/

Crate new repository to merge into
```
mkdir gom && cd gom
git init
touch .gitignore
nano test
git add test 
git commit -a
```

Merge first repository into new repository
```
git remote add -f gom-qa ../gom-qa
git merge -s ours --no-commit gom-qa/master
git read-tree --prefix=gom-qa -u gom-qa/master
git commit -a
```

Merge second repository into new repository
```
git remote add -f gom-test ../gom-test
git merge -s ours --no-commit gom-test/master
git read-tree --prefix=gom-test -u gom-test/master
git commit -a
```

## Create repository from sub-directory

* https://help.github.com/articles/splitting-a-subpath-out-into-a-new-repo

## Submodules

* http://git-scm.com/book/en/Git-Tools-Submodules


# Setup a server

It is relatively simple to setup a server (with advanced user management):

 * http://tumblr.intranation.com/post/766290565/how-set-up-your-own-private-git-server-linux

