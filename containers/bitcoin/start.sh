#!/bin/bash
bitcoind --daemon
tail -f /.bitcoin/debug.log
