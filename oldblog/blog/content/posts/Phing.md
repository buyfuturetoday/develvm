PHP could also use a build tool

[meta:author]: <> (Jonas Colmsjo)
[meta:title]: <> (Phing)
[meta:date]: <> (2012-10-14)
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
