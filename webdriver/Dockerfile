# NodeJS, PhantomJS and Selenium WebDriver
#
# VERSION               0.0.1

FROM     base
MAINTAINER Jonas Colmsjö "jonas@gizur.com"


# Prepare
RUN apt-get update
RUN apt-get install -y curl git wget


# Save source
ADD . /src


# Install NodeJS
RUN curl https://raw.github.com/creationix/nvm/master/install.sh | sh
RUN echo "[ -s $HOME/.nvm/nvm.sh ] && . $HOME/.nvm/nvm.sh" > /.profile
RUN /bin/bash -c "source /.profile && nvm install v0.11.2"

RUN /src/init-node.sh


# Install Selenium WebDriver
RUN wget http://selenium-release.storage.googleapis.com/2.41/selenium-server-standalone-2.41.0.jar

# Install PhantomJS
RUN wget https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-1.9.7-linux-x86_64.tar.bz2

# Install webdriver.io
RUN npm install -g webdriverjs

# Install NodeJS bindings for Selenium Webdriver
npm install -g selenium-webdriver

EXPOSE
CMD ["run.sh"]
