#!/bin/bash
#supervisord
bitcoind --daemon
tail -f /.bitcoin/debug.log
