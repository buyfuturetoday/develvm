Yet another post

[meta:author]: <> (Jonas Colmsjo)
[meta:title]: <> (Docco.md)
[meta:date]: <> (2012-01-01)
[meta:nested:key]: <> (Metadata value)

##!!truncate


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