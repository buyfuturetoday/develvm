#!/bin/bash
#supervisord
bitcoind --daemon -gen -conf=/bitcoin-testnet.conf
tail -f /.bitcoin/testnet/debug.log
