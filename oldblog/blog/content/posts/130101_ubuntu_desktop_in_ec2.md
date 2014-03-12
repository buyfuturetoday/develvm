Install ubuntu desktop in EC2 server

[meta:author]: <> (Jonas Colmsjo)
[meta:title]: <> (Install ubuntu desktop in EC2 server)
[meta:date]: <> (2013-01-01)
[meta:nested:key]: <> (Metadata value)

##!!truncate


Links:

 * http://www.ubuntugeek.com/install-gui-in-ubuntu-server.html
 * https://help.ubuntu.com/community/VNC/Servers
 
 
I have created a repo with cfengine scripts: https://github.com/colmsjo/ubuntu_desktop 
 
This installs the desktop (X server etc.):

```
sudo apt-get update
sudo apt-get install ubuntu-desktop

# Alternative
sudo aptitude install --without-recommends ubuntu-desktop  
```


I'm using cfengine instead. Follow the instructions in the README file: https://github.com/colmsjo/ubuntu_desktop


 