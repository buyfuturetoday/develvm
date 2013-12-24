# MySQL Server with Apache and phpmyadmin
#
# VERSION               0.0.1

FROM     base
MAINTAINER Jonas Colmsjö "jonas@gizur.com"


RUN apt-get update
RUN apt-get install -y curl git

# Install NodeJS

RUN curl https://raw.github.com/creationix/nvm/master/install.sh | sh
RUN echo "[ -s $HOME/.nvm/nvm.sh ] && . $HOME/.nvm/nvm.sh" > /.profile
RUN /bin/bash -c "source /.profile && nvm install v0.10.24"


# Bundle app source
ADD . /src

# Install app dependencies
RUN /bin/bash -c "source /.profile && cd /src && nvm use v0.10.24 && npm install"

EXPOSE  9778
CMD ["/bin/bash -c 'source /.profile && nvm use v0.10.24 && /src/bin/docpad-server'", ""]
