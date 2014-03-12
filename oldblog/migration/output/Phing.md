Yet another post

[meta:author]: <> (Jonas Colmsjo)
[meta:title]: <> (Phing.md)
[meta:date]: <> (2012-01-01)
[meta:nested:key]: <> (Metadata value)

##!!truncate


Link:
 * http://www.phing.info/

```
# Autoconf is needed
brew install autoconf

# Avoid having to use sudo for pear (for ever)
sudo chown -R $USER /usr/lib/php

pear channel-discover pear.phing.info

pear uninstall phing/phing
pear install --alldeps phing/phing



```
