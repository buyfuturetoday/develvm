Yet another post

[meta:author]: <> (Jonas Colmsjo)
[meta:title]: <> (Blacksmith-cms.md)
[meta:date]: <> (2012-01-01)
[meta:nested:key]: <> (Metadata value)

##!!truncate


Looking into CMS on NodeJS, see [[CMS on NodeJS]], led me to play around with blacksmith.

Articles:
 * http://blog.flatironjs.org/01-a-whole-new-blacksmith

Get started, verify that the tests can be rendered:

```
git clone https://github.com/flatiron/blacksmith.git
cd blacksmith
npm install
ls test/fixtures/docsite/public
./bin/blacksmith test/fixtures/docsite
ls test/fixtures/docsite/public
```

Then render the blog also:

```
./bin/blacksmith test/fixtures/blog
ls test/fixtures/blog/public
```

ISSUE: The links in index.html are all broken when opening locally. I've created an issue for this.

It works running in a web server though:

```
npm install http-server -g
cd test/fixture/blog
http-server -e html
```

Frameworks used by blacksmith:

* http://flatironjs.org/
* https://github.com/flatiron/plates
* https://github.com/chjj/marked
