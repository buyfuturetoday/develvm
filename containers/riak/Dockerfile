# MySQL Server with Apache and phpmyadmin
#
# VERSION               0.0.1

FROM     base
MAINTAINER Jonas Colmsjö "jonas@gizur.com"


RUN apt-get update
RUN apt-get install -y curl git wget


# Install NodeJS
RUN curl https://raw.github.com/creationix/nvm/master/install.sh | sh
RUN echo "[ -s $HOME/.nvm/nvm.sh ] && . $HOME/.nvm/nvm.sh" > /.profile
RUN /bin/bash -c "source /.profile && nvm install v0.11.9"


# Install riak
RUN wget http://s3.amazonaws.com/downloads.basho.com/riak/1.4/1.4.6/ubuntu/precise/riak_1.4.6-1_amd64.deb
RUN dpkg -i riak_1.4.6-1_amd64.deb


EXPOSE 3306 80 443
CMD ["supervisord","-n"]
