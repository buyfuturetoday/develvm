#!/usr/bin/env bash

sudo apt-get update

# install general stuff
sudo apt-get -y install git wget curl make g++ build-essential libssl-dev git-core

# set the timezone
sudo echo "Europe/Stockholm" > /etc/timezone    
sudo dpkg-reconfigure -f noninteractive tzdata

# install heroku tools
su - vagrant -c "wget -qO- https://toolbelt.heroku.com/install-ubuntu.sh | sh"

# install ruby
sudo apt-get -y install ruby

# install java 
sudo apt-get -y install default-jre

# install mysql client 
sudo apt-get -y install mysql-client-core-5.5 mysql-client-5.5 

# install PHP
sudo apt-get -y install php5-cli php-mdb2 php-mdb2-driver-mysql phpunit php5-curl 


#
# install and configure nodejs
#

sudo apt-get -y install nodejs npm

# install nvm for root
sudo sh -c "wget -qO- https://raw.github.com/creationix/nvm/master/install.sh | sh"

# update nodejs for root
sudo sh -c "source ~/.nvm/nvm.sh && nvm install v0.11.2"
sudo sh -c "source ~/.nvm/nvm.sh && nvm use v0.11.2"


# Install nvm - Node version manager for the vagrant user
su - vagrant -c "wget -qO- https://raw.github.com/creationix/nvm/master/install.sh | sh"

# Install nodejs versions for vagrant user
su - vagrant -c "source ~/.nvm/nvm.sh && nvm install v0.8.0"
su - vagrant -c "source ~/.nvm/nvm.sh && nvm install v0.11.2"
su - vagrant -c "source ~/.nvm/nvm.sh && nvm use v0.11.2"


# install nodejitsu deployment tools
su - vagrant -c "npm install jitsu"

# cleanup things not needed
sudo apt-get -y autoremove
