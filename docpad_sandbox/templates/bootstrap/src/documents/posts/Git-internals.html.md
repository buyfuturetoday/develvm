
---
layout: post
title: Git internals
date: 2012-10-16
author: Jonas Colmsjo
---

Time to learn a bit more than the bare basics of git?





Some notes taken when reading: http://git-scm.com/book/en/Git-Internals

Git is a simple key-value data store.

Create empty git repo:
```
mkdir git-test
cd git-test
git init
Initialized empty Git repository in /tmp/test/.git/

# List all files and folders etc.
find .git/objects
.git/objects
.git/objects/info
.git/objects/pack

# Search for regular files
find .git/objects -type f
```

Store some content:
```
echo 'test content' | git hash-object -w --stdin
d670460b4b4aece5915caf5c68d12f560a9fe3e4
```
Git returns the key for the object created, the so called checksum hash.

The object has been stored in a file:
```
find .git/objects -type f 
.git/objects/d6/70460b4b4aece5915caf5c68d12f560a9fe3e4
```

Cat the contents of the file:
```
git cat-file -p d670460b4b4aece5915caf5c68d12f560a9fe3e4
test content
```

Store content i a ordinary file:
```
echo 'version 1' > test.txt
git hash-object -w test.txt 
83baae61804e65cc73a7201a7252750c76066a30
```

Update with new version:
```
echo 'version 2' > test.txt
git hash-object -w test.txt 
1f7a7a472abf3dd9643fd615f6da379c4acb3e3a
```

List the files:
```
find .git/objects -type f 
.git/objects/1f/7a7a472abf3dd9643fd615f6da379c4acb3e3a
.git/objects/83/baae61804e65cc73a7201a7252750c76066a30
.git/objects/d6/70460b4b4aece5915caf5c68d12f560a9fe3e4
```

Revert to old version:
```
git cat-file -p 83baae61804e65cc73a7201a7252750c76066a30 > test.txt 
cat test.txt 
version 1
```

Go back to new version:
```
git cat-file -p 1f7a7a472abf3dd9643fd615f6da379c4acb3e3a > test.txt 
cat test.txt 
version 2
```

Show the object type using the hash:
```
git cat-file -t 1f7a7a472abf3dd9643fd615f6da379c4acb3e3a
blob
```

Add a file and show the tree
```
git add *
git commit -a -m "initial commit"

git cat-file -p master^{tree}
100644 blob 1f7a7a472abf3dd9643fd615f6da379c4acb3e3a	test.txt
```


