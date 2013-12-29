#!/bin/bash
#supervisord
bitcoind --daemon
tail -f /.bitcoin/testnet/debug.log
