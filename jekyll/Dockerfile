#
# Dockerfile that builds container with ruby and Jekyll
# When not using vagrant, run it manually with: docker build - < Dockerfile.nodejs
#


# Image: NodeJS & Python
#
# VERSION               0.0.1

FROM     ubuntu
MAINTAINER Jonas Colmsjö "jonas@gizur.com"

# sudo will complain about unknown host otherwise
#RUN echo "127.0.0.1\t`hostname`" >> /etc/hosts

# make sure the package repository is up to date
RUN echo "deb http://archive.ubuntu.com/ubuntu precise main universe" > /etc/apt/sources.list
RUN apt-get update -y


#
# Install some nice tools
#

RUN apt-get install -y git wget


#
# Ruby
#

RUN apt-get update -y
RUN apt-get install ...

#
# Install Jekyll
#

gem install jekyll
