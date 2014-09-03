#!/bin/bash
supervisord &
sleep 5
tail -f /var/log/haproxy.log -f /var/log/haproxy0.log
