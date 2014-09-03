#!/bin/bash
supervisord
tail -f /var/log/haproxy.log