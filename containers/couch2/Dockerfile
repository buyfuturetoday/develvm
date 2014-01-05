# Couchdb
#
# VERSION               0.0.1

FROM     base
MAINTAINER Jonas Colmsjö "jonas@gizur.com"


RUN apt-get update
RUN apt-get install -y curl git

# Install NodeJS

#RUN curl https://raw.github.com/creationix/nvm/master/install.sh | sh
#RUN echo "[ -s $HOME/.nvm/nvm.sh ] && . $HOME/.nvm/nvm.sh" > /.profile
#RUN /bin/bash -c "source /.profile && nvm install v0.11.9"


RUN apt-get install -y couchdb


EXPOSE 8101
CMD ["/usr/local/bin/couchdb"]
