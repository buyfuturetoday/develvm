#!/bin/bash
supervisord
sleep 5
tail -f /var/log/haproxy.log
