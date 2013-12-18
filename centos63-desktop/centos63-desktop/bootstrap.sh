sudo yum install -y tightvnc-server xterm twm xsetroot
sudo service iptables stop
vncserver :1

# Now it should be possible to conntect to 192.168.1.103:1
# The IP is just on example, check with ifconfig

