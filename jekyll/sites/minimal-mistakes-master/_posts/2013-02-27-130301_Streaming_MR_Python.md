---
layout: post
description: Streaming Map
title: Streaming Map
date: 2013-02-27
author: Jonas Colmsjo
tags: ['post']
---

Streaming Map/Reduce in Python




Links:

 * http://www.michael-noll.com/tutorials/writing-an-hadoop-mapreduce-program-in-python/
 * http://wiki.apache.org/hadoop/ImportantConcepts


## Introduction

Python seams to a language supported by many Hadoop providers (like Amazon etc). I would prefer
NodeJS but Python will have to do for now.

I have installed hadoop on my Mac (see separate post).

First create the map and reduct python scripts in the article.

Then copy the data to the hadoop file system:

```
# Create a directories for the job
hadoop fs -mkdir /Users/jonas/hadoop-store/mapred/wordcount
hadoop fs -mkdir /Users/jonas/hadoop-store/mapred/wordcount-output

# Copy the data
hadoop fs -put /Users/jonas/git/colmsjo/wip/Python/MapReduce_example/zaratustra.txt /Users/jonas/hadoop-store/mapred/wordcount

# Check that it's there
hadoop fs -ls /Users/jonas/hadoop-store/mapred/wordcount
```

Now run the job:

```
hadoop jar /usr/local/Cellar/hadoop/1.1.1/libexec/contrib/streaming/hadoop-streaming-1.1.1.jar  \
  -file    /Users/jonas/git/colmsjo/wip/Python/MapReduce_example/mapper.py \
  -mapper  /Users/jonas/git/colmsjo/wip/Python/MapReduce_example/mapper.py \
  -file    /Users/jonas/git/colmsjo/wip/Python/MapReduce_example/reducer.py \
  -reducer /Users/jonas/git/colmsjo/wip/Python/MapReduce_example/reducer.py \
  -input   /Users/jonas/hadoop-store/mapred/wordcount/* \
  -output  /Users/jonas/hadoop-store/mapred/wordcount-output
```

Show the output:

```
hadoop fs -cat /Users/jonas/hadoop-store/mapred/wordcount-output/part-00000
```

Delete the output dir if you want to run the job again:

```
hadoop fs -rmr /Users/jonas/hadoop-store/mapred/wordcount-output
```

