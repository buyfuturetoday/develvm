#
# Dockerfile that builds container with ruby and Jekyll
#


# Image: Jekyll
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

RUN apt-get install -y git wget make


#
# Ruby
#

RUN apt-get update -y
RUN apt-get install -y ruby1.9.3


#
# Install Jekyll
#

# RUN gem install jekyll

RUN gem install bundler

ADD . /

RUN bundle install


#
# Start web server
#

EXPOSE 4000
CMD ["bundle exec jekyll serve"]
