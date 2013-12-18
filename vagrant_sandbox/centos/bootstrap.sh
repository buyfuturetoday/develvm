#!/usr/bin/env bash

#
# NOTE: This has not been ported from Ubuntu to CentOS!!!!
#

sudo apt-get update
sudo apt-get install -y git

#
# Install docker.io
#

# The linux-image-extra package is only needed on standard Ubuntu EC2 AMIs in order to install the aufs kernel module. 
#sudo apt-get install linux-image-extra-`uname -r`

sudo apt-get install -y linux-image-generic-lts-raring
#sudo reboot

sudo apt-get install -y python-software-properties software-properties-common
sudo add-apt-repository ppa:dotcloud/lxc-docker
sudo apt-get update
sudo apt-get install -y lxc-docker

#
# Build the docker images using Dockerfile
#

docker build - < /vagrant/Dockerfile
