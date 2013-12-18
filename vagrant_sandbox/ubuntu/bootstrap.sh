#!/usr/bin/env bash

#
# This script installs the necessary stuff for the docker host.
# Images for the containers are built with Dockerfiles (see at the bottom)
#

sudo apt-get update
sudo apt-get install -y git unzip s3cmd

#
# Install docker.io
#

# The linux-image-extra package is only needed on standard Ubuntu EC2 AMIs in order to install the aufs kernel module. 
#sudo apt-get install linux-image-extra-`uname -r`

sudo apt-get install -y linux-image-generic-lts-raring
#sudo reboot

sudo apt-get install -y python-software-properties software-properties-common python-pip python-dev libevent-dev
sudo add-apt-repository ppa:dotcloud/lxc-docker
sudo apt-get update
sudo apt-get install -y lxc-docker

#
# Install docker registry
#

echo DOCKER_INDEX_URL="http://0.0.0.0:5000/" >> ~/.profile

git clone https://github.com/dotcloud/docker-registry.git
cd docker-registry && cp config_sample.yml config.yml
pip install -r requirements.txt
./wsgi.py &

#
# Get OpenERP source
#

wget https://github.com/colmsjo/openerp-env/archive/master.zip
unzip master.zip 

#
# Build the docker images using Dockerfile
#

docker build - < /vagrant/Dockerfile
