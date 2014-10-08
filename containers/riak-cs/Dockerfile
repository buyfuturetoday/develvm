# MySQL Server
#
# VERSION               0.0.1

FROM     ubuntu:latest
MAINTAINER Jonas Colmsjö "jonas@gizur.com"

RUN apt-get update
RUN apt-get install -y curl wget nano


#
# Riak
#

RUN wget http://s3.amazonaws.com/downloads.basho.com/riak/1.4/1.4.10/ubuntu/precise/riak_1.4.10-1_amd64.deb
RUN dpkg -i riak_1.4.10-1_amd64.deb


#
# Riak CS & Stanchion
#

RUN curl http://apt.basho.com/gpg/basho.apt.key | sudo apt-key add -
RUN bash -c "echo deb http://apt.basho.com precise main > /etc/apt/sources.list.d/basho.list"
RUN apt-get update
RUN apt-get install -y riak-cs
RUN apt-get install -y stanchion


EXPOSE 8080
CMD ["/src/test/start.sh"]