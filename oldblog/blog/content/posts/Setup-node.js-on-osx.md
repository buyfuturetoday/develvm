Get started with NodeJS on Mac OSX

[meta:author]: <> (Jonas Colmsjo)
[meta:title]: <> (Setup NodeJS on OSX)
[meta:date]: <> (2012-10-07)
[meta:nested:key]: <> (Metadata value)

##!!truncate


I had an old installation of node.js but got all kinds of erros. I tried to download a new version from http://nodejs.org/ but it did not solve the problem.

Then I tested with brew and that did seam to work. I did some cleaning up before I started.


```
# Remove global modules
sudo rm -rf /usr/local/lib/node_modules

# Remove local modules
rm -rf ~/node_modules

# Saw a tip that making /usr/local mine makes this easier (not having to sudo all the time)
sudo chown -R $USER /usr/local
```

Then I installed nodejs with brew
```
brew install nodejs

# There were som old files that needed cleaning
brew link node

# Delete what brew complains about and run again until it's done

# Run the npm (node package manager) installation
wget http://npmjs.org/install.sh
chmod +x install.sh 
./install.sh
```

npm has global and local modules. I decided to only use global (to avoid the confusion not remebering where things were installed)
```
npm config ls -l
npm config set global true
```
NOTE: I've learned that this isn't such a good idea when developing node applications of your own...

Try to do an update, make sure there are no erros
```
npm update
```

Set NODE_PATH so that require finds the installed modules:
```
cd && nano .bash_profile
export NODE_PATH=/usr/local/lib/node_modules:~/node_modules:.
```

