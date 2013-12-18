
---
layout: post
title: Ubuntu
date: 2012-01-01
author: Jonas Colmsjo
---

Yet another post





[[Main_Page]] > [[Gizur server admin]]


* Download: http://www.ubuntu.com/server/get-ubuntu/download
* Setup guide: https://help.ubuntu.com/community/UEC/CDInstall

== webmin ==

* http://www.webmin.com/deb.html
* https://help.ubuntu.com/community/AddUsersHowto

<pre>
wget http://downloads.sourceforge.net/project/webadmin/webmin/1.570/webmin_1.570_all.deb?r=http%3A%2F%2Fwebmin.com%2F&ts=1326657701&use_mirror=ignum
mv webmin_1.570_all.deb?r=http:%2F%2Fwebmin.com%2F webmin_1.570_all.deb
apt-get install perl libnet-ssleay-perl openssl libauthen-pam-perl libpam-runtime libio-pty-perl apt-show-versions python
dpkg --install webmin_1.570_all.deb
apt-get -f install

# Add webmin user
sudo adduser webmin
cat /etc/sudoers
vi /etc/sudoers.d/webmin 
# root and users in group wheel can run anything on any machine as any user
webmin		ALL = (ALL) ALL


chmod 0440 /etc/sudoers.d/webmin
</pre>


== git ==

* https://help.ubuntu.com/community/Git
* http://sitaramc.github.com/gitolite/index.html#qi


=== Second try ===
<pre>
sudo apt-get install git-core

# add git user in Webmin

cd .ssh
ssh-keygen -t rsa
cp Gizur.pub /home/git/
chown git:git /home/git/Gizur.pub 

su - git

git clone git://github.com/sitaramc/gitolite

vi .bashrc
# add to path
PATH=/home/git/bin:$PATH

gitolite/src/gl-system-install
gl-setup -q Gizur.pub
</pre>

* http://www.dotkam.com/2010/08/22/gitolite-does-not-appear-to-be-a-git-repository/

On laptop
<pre>
# Users are added using git
git clone git@s1.gizurcloud.com:gitolite-admin
</pre>

=== First try ===
<pre>
sudo apt-get install gitosis git-core
cd .ssh
sudo -H -u gitosis gitosis-init < id_rsa.pub
cd ..
mkdir git-repo && cd git-repo
git clone gitosis@s1.gizurcloud.com:gitosis-admin.git

# Add a repository
cd gitosis-admin
cd keydir
mv root\@b7d8ebb8-4806-4028-add3-4713d961d359.pub id_rsa_root.pub
cd ..
$EDITOR gitosis.conf
[gitosis]

[group gizur]
writable = testproject
members =id_rsa_root.pub 

[group gitosis-admin]
members = id_rsa_root.pub
# members = root@b7d8ebb8-4806-4028-add3-4713d961d359
writable = gitosis-admin


git commit -a -m "Added a new project"
[master e1faf73] Added a new project
 Committer: root <root@b7d8ebb8-4806-4028-add3-4713d961d359.(none)>
Your name and email address were configured automatically based
on your username and hostname. Please check that they are accurate.
You can suppress this message by setting them explicitly:

    git config --global user.name "Your Name"
    git config --global user.email you@example.com

After doing this, you may fix the identity used for this commit with:

    git commit --amend --reset-author

 2 files changed, 6 insertions(+), 2 deletions(-)
 delete mode 100644 keydir/root@b7d8ebb8-4806-4028-add3-4713d961d359.pub

</pre>

== POP and IMAP ==

* https://help.ubuntu.com/community/PostfixBasicSetupHowto


<pre>
sudo apt-get install courier-pop
sudo apt-get install courier-imap

# Change postfix confguration, I'm using webmin
home_mailbox = Maildir/
/etc/init.d/postfix restart

/etc/init.d/courier-pop restart

# Test POP3
netcat localhost 110

user fmaster
+OK Password required.
pass password
+OK logged in.
quit


# Test IMAP
netcat localhost 143

a login fmaster password
a OK LOGIN Ok.
a logout
</pre>

== fetchmail ==

* http://postfixmail.com/blog/index.php/postfixadmin-and-fetchmail/
* https://help.ubuntu.com/community/GmailPostfixFetchmail
* http://linuxgazette.net/115/chirico1.html

DID NOT GET THIS TO  WORK: Adress rewriting in Postfix did not work out. Was rither able to send or receive mails, but not both. Will run Postfix without fetchmail and send mail directly to the server instead (or perhaps forward from a @gizur.com mail account).

<pre>
sudo apt-get intall fetchmail
vi /etc/fetchmail.rc
set syslog

set daemon 240

poll pop.gmail.com
  with nodns,
  with protocol POP3
  user "info@gizur.com" there is info here,
  with password PASSWORD,
  with ssl, sslcertck;

chmod 600 /etc/fetchmail.rc

fetchmail -v -d0 -f /etc/fetchmail.rc
less /var/log/mail.log

/etc/init.d/fetchmail start
</pre>

== Postfix ==

* https://help.ubuntu.com/community/Postfix
* http://postfixmail.com/blog/index.php/using-webmin-to-set-up-postfix/

=== Standalone internet mail server ===

<pre>
sudo apt-get install postfix
sudo useradd -d /home/jonas -m jonas

# edit aliases file
vi /etc/aliases
root:  jonas

newaliases

vi /etc/postfix/main.cf

</pre>


=== Satellite mail server connected to gmail ===


<pre>



</pre>

== update packages ==

<pre>
sudo apt-get update
sudo apt-get upgrade
</pre>


== webmin ==

<pre>
wget http://prdownloads.sourceforge.net/webadmin/webmin_1.540_all.deb
apt-get install perl libnet-ssleay-perl openssl libauthen-pam-perl libpam-runtime libio-pty-perl apt-show-versions  libapt-pkg-perl
dpkg --install webmin_1.540_all.deb

# open port in firewall
vi /etc/iptables.rules
-A INPUT -p tcp --dport 10000 -j ACCEPT

iptables -F
</pre>

== iptables ==

* http://wiki.debian.org/iptables


<pre>
iptables -L

nano /etc/iptables.test.rules

*filter

# Allows all loopback (lo0) traffic and drop all traffic to 127/8 that doesn't use lo0
-A INPUT -i lo -j ACCEPT
-A INPUT -i ! lo -d 127.0.0.0/8 -j REJECT

# Accepts all established inbound connections
-A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

# Allows all outbound traffic
# You could modify this to only allow certain traffic
-A OUTPUT -j ACCEPT

# Allows HTTP and HTTPS connections from anywhere (the normal ports for websites)
-A INPUT -p tcp --dport 80 -j ACCEPT
 -A INPUT -p tcp --dport 443 -j ACCEPT

# Allows SSH connections for script kiddies
# THE -dport NUMBER IS THE SAME ONE YOU SET UP IN THE SSHD_CONFIG FILE
-A INPUT -p tcp -m state --state NEW --dport 30000 -j ACCEPT

# Now you should read up on iptables rules and consider whether ssh access 
# for everyone is really desired. Most likely you will only allow access from certain IPs.

# Allow ping
-A INPUT -p icmp -m icmp --icmp-type 8 -j ACCEPT

# log iptables denied calls (access via 'dmesg' command)
-A INPUT -m limit --limit 5/min -j LOG --log-prefix "iptables denied: " --log-level 7

# Reject all other inbound - default deny unless explicitly allowed policy:
-A INPUT -j REJECT
-A FORWARD -j REJECT

COMMIT

iptables-restore < /etc/iptables.test.rules

iptables -L


iptables-save > /etc/iptables.up.rules

vi /etc/network/if-pre-up.d/iptables

#!/bin/bash
/sbin/iptables-restore < /etc/iptables.up.rules

chmod +x /etc/network/if-pre-up.d/iptables
</pre>

== Xen installation ==

* Howto install xen server: https://help.ubuntu.com/community/Xen
* Howto install xen desktop: http://mediakey.dk/~cc/ubuntu-howto-install-xen/


== UEC and Eucalyptus installation ==

* https://help.ubuntu.com/community/Eucalyptus-Jaunty
* HybridFox (forks of ElastiFox for Eucalyptus): https://help.ubuntu.com/community/UEC/ElasticFox


Install with all options using UEC 10.04 CD

<pre>
sudo vi /etc/network/interfaces
iface br0 inet static
        address 192.168.1.3
        netmask 255.255.255.0
        network 192.168.1.0
        broadcast 192.168.1.0
        gateway 192.168.1.1
        bridge_ports eth0
        bridge_fd 9
        bridge_hello 2
        bridge_maxage 12
        bridge_stp off
</pre>

Create .euca directory and download credentials according to guide:
<pre>
mkdir .euca
cd .euca
sudo euca_conf --get-credentials mycreds.zip
unzip mycreds.zip
ln -s ~/.euca/eucarc ~/.eucarc

sudo apt-get install euca2ools
</pre>


Create key-pair (make sure that the environment variables .eucarc are set)
<pre>
euca-add-keypair hubert > hubert.pk
</pre>


Run an instance. Download in https:/hubert:8443
<pre>
euca-run-instances -k hubert.pk emi-DE6B1062
</pre>
