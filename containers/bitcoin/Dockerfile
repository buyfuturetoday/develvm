# Bitcon server
#
# VERSION               0.0.1

FROM     base
MAINTAINER Jonas Colmsjö "jonas@gizur.com"


RUN apt-get update
RUN apt-get install -y curl git


# Download the software
git clone https://github.com/bitcoin/bitcoin.git


# Install dependencies
apt-get install -y libdb4.8-dev libdb4.8++-dev libboost1.37-dev


# Build
RUN ./autogen.sh
RUN ./configure
RUN make


EXPOSE 8333 18333
CMD ["bitcoind",""]
