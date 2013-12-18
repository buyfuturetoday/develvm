
---
layout: post
title: Hardening
date: 2012-01-01
author: Jonas Colmsjo
---

Yet another post





[[Wiki]]

h1. Intro

* https://help.ubuntu.com/community/Security


h2. Firewall

* https://help.ubuntu.com/community/UFW

<pre>
sudo apt-get install ufw

sudo ufw default deny
chmod g-w /etc

sudo ufw allow ssh

# Scalr
sudo ufw allow 8013/tcp
sudo ufw allow 8014/udp

sudo ufw allow 8008/tcp

# Webmin
sudo ufw allow 10000/tcp


# Zabbix
sudo ufw allow 10050/tcp

sudo ufw enable


sudo ufw status

sudo ufw logging on
</pre>


h2. Lock-up cron

<pre>
sudo nano /etc/cron.allow
root
</pre>

h1. Hardening ubuntu

h2. Unattended upgrades

* https://help.ubuntu.com/10.04/serverguide/automatic-updates.html

<pre>
sudo apt-get install mailutils
sudo apt-get install unattended-upgrades
sudo nano /etc/apt/apt.conf.d/50unattended-upgrades 
Unattended-Upgrade::Allowed-Origins {
        "Ubuntu lucid-security";
//      "Ubuntu lucid-updates";
};
...
Unattended-Upgrade::Mail "admin@gizur.com";
...
Unattended-Upgrade::MailOnlyOnError "true";
...
Unattended-Upgrade::Automatic-Reboot "true";

sudo nano /etc/apt/apt.conf.d/10periodic
APT::Periodic::Update-Package-Lists "1";
APT::Periodic::Download-Upgradeable-Packages "1";
APT::Periodic::AutocleanInterval "7";
APT::Periodic::Unattended-Upgrade "1";


</pre>

h2. Shared Memory

<pre>
# show current mount
root@ec2-46-137-61-247:DEVELOPER_C2:~/scripts# mount
/dev/sda1 on / type ext3 (rw)
proc on /proc type proc (rw,noexec,nosuid,nodev)
none on /sys type sysfs (rw,noexec,nosuid,nodev)
none on /sys/kernel/debug type debugfs (rw)
none on /sys/kernel/security type securityfs (rw)
devtmpfs on /dev type devtmpfs (rw,mode=0755)
none on /dev/pts type devpts (rw,noexec,nosuid,gid=5,mode=0620)
none on /dev/shm type tmpfs (rw,nosuid,nodev)
none on /var/run type tmpfs (rw,nosuid,mode=0755)
none on /var/lock type tmpfs (rw,noexec,nosuid,nodev)
none on /lib/init/rw type tmpfs (rw,nosuid,mode=0755)

sudo nano /etc/fstab
tmpfs                                           /dev/shm     tmpfs     defaults,ro     0     0

reboot
</pre>


h2. SSH Daemon


<pre>
sudoedit /etc/ssh/sshd_config

...
LoginGraceTime 20
...
Banner /etc/issue.net

sudo nano /etc/issue.net


***************************************************************************
                            NOTICE TO USERS


This computer system is the private property of its owner, whether
individual, corporate or government.  It is for authorized use only.
Users (authorized or unauthorized) have no explicit or implicit
expectation of privacy.

Any or all uses of this system and all files on this system may be
intercepted, monitored, recorded, copied, audited, inspected, and
disclosed to your employer, to authorized site, government, and law
enforcement personnel, as well as authorized officials of government
agencies, both domestic and foreign.

By using this system, the user consents to such interception, monitoring,
recording, copying, auditing, inspection, and disclosure at the
discretion of such personnel or officials.  Unauthorized or improper use
of this system may result in civil and criminal penalties and
administrative or disciplinary action, as appropriate. By continuing to
use this system you indicate your awareness of and consent to these terms
and conditions of use. LOG OFF IMMEDIATELY if you do not agree to the
conditions stated in this warning.

****************************************************************************
</pre>


h2. Disable su


<pre>
sudo dpkg-statoverride --update --add root admin 4750 /bin/su
</pre>




h2. AppArmor

<pre>
sudo apt-get install apparmor-profiles apparmor-utils
</pre>



h2. Disable IPv6


<pre>
sudo nano /etc/modprobe.d/aliases
change alias net-pf-10 ipv6 to alias net-pf-10 off in 

reboot
</pre>
