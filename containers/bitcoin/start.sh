#!/bin/bash
bitcoind --daemon -conf=/bitcoin.conf
tail -f /.bitcoin/debug.log
