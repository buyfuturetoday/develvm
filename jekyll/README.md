Jekyll environment (with docker.io)
====================================

Setup docker with this repo: https://github.com/colmsjo/docker.git


Getting started with Jekyll
--------------------------

```
jekyll new my-awesome-site
cd my-awesome-site && jekyll serve
# => Now browse to http://localhost:4000 
```

Here is the Jekyll docs:

 * http://jekyllrb.com/docs/home/



Import wordpress site
---------------------

Assuming the site XML file is named wordpress.xml:

```
ruby -rubygems -e 'require "jekyll/jekyll-import/wordpressdotcom"; JekyllImport::WordpressDotCom.process({ :source => "wordpress.xml" })'
```


Troubleshoting
-------------

`error: incompatible encoding regexp match (UTF-8 regexp with ISO-8859-1 string).`

Try this and the re-generate:


```
export LC_ALL=en_US.UTF-8
export LANG=en_US.UTF-8
```



