# Bitcon server
#
# VERSION               0.0.1

FROM     base
MAINTAINER Jonas Colmsjö "jonas@gizur.com"


RUN apt-get update
RUN apt-get install -y curl git


# Download the software
RUN git clone https://github.com/bitcoin/bitcoin.git


# Install dependencies
RUN apt-get install -y libdb4.8-dev libdb4.8++-dev libboost1.37-dev


# Build
RUN cd /bitcoin && ./autogen.sh
RUN cd /bitcoin && ./configure
RUN cd /bitcoin && make


EXPOSE 8333 18333
CMD ["bitcoind",""]
