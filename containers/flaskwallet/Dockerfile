# Bitcon wallet
#
# VERSION               0.0.1

FROM     base
MAINTAINER Jonas Colmsjö "jonas@gizur.com"

RUN apt-get update
RUN apt-get install -y python-virtualenv python-imaging python-docutils ntp

ADD . /src

RUN virtualenv --system-site-packages virtualenv
RUN . virtualenv/bin/activate && cd /src && pip install -r doc/requirements.txt

RUN openssl rand -base64 32 | head -c 32; echo

EXPOSE 8000
CMD ["python","/src/main.py"]

