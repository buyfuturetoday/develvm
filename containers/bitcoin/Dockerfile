# Bitcon server
#
# VERSION               0.0.1

FROM     base
MAINTAINER Jonas Colmsjö "jonas@gizur.com"

RUN apt-get update
RUN apt-get install -y curl git wget make build-essential g++ ccache autoconf libtool bsdmainutils pkg-config zlib1g-dev libbz2-dev heirloom-mailx

# Install boost
RUN apt-get install -y libboost-all-dev

# Berkelt DB 4.8
RUN wget http://ftp.se.debian.org/debian/pool/main/d/db4.8/libdb4.8-dev_4.8.30-2_amd64.deb
RUn wget http://ftp.se.debian.org/debian/pool/main/d/db4.8/libdb4.8_4.8.30-2_amd64.deb
RUN wget http://ftp.se.debian.org/debian/pool/main/d/db4.8/libdb4.8++_4.8.30-2_amd64.deb
RUN wget http://ftp.se.debian.org/debian/pool/main/d/db4.8/libdb4.8++-dev_4.8.30-2_amd64.deb
RUN dpkg  -i libdb4.8_4.8.30-2_amd64.deb
RUN dpkg  -i libdb4.8-dev_4.8.30-2_amd64.deb
RUN dpkg  -i libdb4.8++_4.8.30-2_amd64.deb
RUN dpkg  -i libdb4.8++-dev_4.8.30-2_amd64.deb

# Download the software
RUN git clone https://github.com/bitcoin/bitcoin.git

# Build
RUN cd /bitcoin && ./autogen.sh
RUN cd /bitcoin && ./configure
RUN cd /bitcoin && make && make install

RUN mkdir /.bitcoin
ADD bitcoin.conf /.bitcoin/bitcoin.conf

EXPOSE 8333 18333
CMD ["bitcoind",""]
