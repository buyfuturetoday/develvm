# Dockerizing MongoDB: Dockerfile for building MongoDB images
# Based on ubuntu:latest, installs MongoDB following the instructions from:
# http://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/

# Format: FROM    repository[:version]
FROM       ubuntu:latest

# Format: MAINTAINER Name <email@addr.ess>
MAINTAINER Jonas Colmsjö <jonas@gizur.com>

RUN apt-get update
RUN apt-get install -y curl

RUN echo "export HOME=/" > /.profile

#
# Install supervidord (used to handle processes)
#

RUN apt-get install -y supervisor
ADD ./supervisord.conf /etc/supervisor/conf.d/supervisord.conf


#
# Install MongoDB
#


# Installation:
# Import MongoDB public GPG key AND create a MongoDB list file
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
RUN echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | tee /etc/apt/sources.list.d/10gen.list

# Update apt-get sources AND install MongoDB
RUN apt-get update
RUN apt-get install -y -q mongodb-org

# It is possible to install a specific version also
# RUN apt-get install -y -q mongodb-org=2.6.1 mongodb-org-server=2.6.1 mongodb-org-shell=2.6.1 mongodb-org-mongos=2.6.1 mongodb-org-tools=2.6.1

# Create the MongoDB data directory
RUN mkdir -p /data/db

ADD ./etc-mongod.conf /etc/mongod.conf


#
# Install NodeJS
#

ADD ./init-node.sh /src/
ADD ./package.json /src/
ADD ./server.js /src/

# Download and install using npm
# old RUN curl https://raw.github.com/creationix/nvm/master/install.sh | sh
RUN curl https://raw.githubusercontent.com/creationix/nvm/v0.11.1/install.sh | bash
RUN echo "[ -s /.nvm/nvm.sh ] && . /.nvm/nvm.sh" >> /.profile
RUN /bin/bash -c "source /.profile && nvm install v0.11.2"

# Install node for root user together node jaydata etc.
#RUN /src/init-node.sh

# Install dependecies one by one (works better with docker)
#RUN /bin/bash -c "source /.profile && nvm use v0.11.2 && npm install -g jaydata"
#RUN /bin/bash -c "source /.profile && nvm use v0.11.2 && npm install -g mongodb"
#RUN /bin/bash -c "source /.profile && nvm use v0.11.2 && npm install -g express"
#RUN /bin/bash -c "source /.profile && nvm use v0.11.2 && npm install -g http"
#RUN /bin/bash -c "source /.profile && nvm use v0.11.2 && npm install -g connect"
#RUN /bin/bash -c "source /.profile && nvm use v0.11.2 && npm install -g q"
#RUN /bin/bash -c "source /.profile && nvm use v0.11.2 && npm install -g bcrypt"
#RUN /bin/bash -c "source /.profile && nvm use v0.11.2 && npm install -g xmldom"
#RUN /bin/bash -c "source /.profile && nvm use v0.11.2 && npm install -g qs"
#RUN /bin/bash -c "source /.profile && nvm use v0.11.2 && npm install -g node-uuid"
 

#
# Start things up
#


EXPOSE  27017 80 443 8080
CMD ["supervisord","-n"]
