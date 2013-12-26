# Bitcon server
#
# VERSION               0.0.1

FROM     base
MAINTAINER Jonas Colmsjö "jonas@gizur.com"

#echo "deb http://archive.ubuntu.com/ubuntu precise main universe" > /etc/apt/sources.list
#echo "deb http://cz.archive.ubuntu.com/ubuntu lucid main " >> /etc/apt/sources.list


RUN apt-get update
RUN apt-get install -y curl git wget make build-essential g++

# Download boost 1.37
RUN wget -O /boost_1_37_0.tar.gz http://downloads.sourceforge.net/project/boost/boost/1.37.0/boost_1_37_0.tar.gz?r=http%3A%2F%2Fwww.boost.org%2Fusers%2Fhistory%2Fversion_1_37_0.html&ts=1388099574&use_mirror=freefr
RUN tar -xzf /boost_1_37_0.tar.gz
RUN cd /boost_1_37_0 && ./configure
#RUN cd /boost_1_37_0 && ./bootstrap.sh
RUN make --without-python

RUN wget http://se.archive.ubuntu.com/ubuntu/pool/main/d/db/libdb4.8_4.8.24-1ubuntu1_amd64.deb
RUN dpkg -i libdb4.8_4.8.24-1ubuntu1_amd64.deb 
RUN wget http://se.archive.ubuntu.com/ubuntu/pool/main/d/db/libdb4.8-dev_4.8.24-1ubuntu1_amd64.deb
RUN dpkg -i libdb4.8-dev_4.8.24-1ubuntu1_amd64.deb 


# Download the software
RUN git clone https://github.com/bitcoin/bitcoin.git


# Install dependencies
#RUN apt-get install -y libdb4.8-dev libdb4.8++-dev libboost1.37-dev


# Build
#RUN cd /bitcoin && ./autogen.sh
#RUN cd /bitcoin && ./configure
#RUN cd /bitcoin && make


EXPOSE 8333 18333
CMD ["bitcoind",""]
