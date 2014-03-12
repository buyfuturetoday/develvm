[[wiki]]

h1. Apparmor


* https://wiki.ubuntu.com/AppArmor
* http://doc.opensuse.org/products/draft/SLES/SLES-security_sd_draft/pre.apparm.html
* http://forums.opensuse.org/english/get-technical-help-here/applications/455941-apparmor-email-alerting.html


<pre>
sudo apt-get install apparmor-profiles apparmor-utils

sudo apparmor_status
service apparmor status

sudo aa-complain /etc/cron*

</pre>



h2. Immunizing executables


* http://doc.opensuse.org/documentation/html/openSUSE/opensuse-security/cha.apparmor.concept.html#sec.apparmor.concept.cron

