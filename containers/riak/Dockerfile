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


# Riak want's this
RUN ulimit -n 4096


# Install riak
RUN wget http://s3.amazonaws.com/downloads.basho.com/riak/1.4/1.4.6/ubuntu/precise/riak_1.4.6-1_amd64.deb
RUN dpkg -i riak_1.4.6-1_amd64.deb

ADD ./etc-riak-app.config /etc/riak/app.config
ADD ./server.crt /etc/riak/cert.pem
ADD ./server.key /etc/riak/key.pem


#RUN curl -H 'Content-Type: application/json' -X POST http://localhost:8098/riak-cs/user --data '{"email":"foobar@example.com", "name":"admin user"}'

EXPOSE 8087 8098 8069
CMD ["sh", "-c", "ulimit -n 4096; /etc/init.d/riak start; tail -f /var/log/riak/*"]
