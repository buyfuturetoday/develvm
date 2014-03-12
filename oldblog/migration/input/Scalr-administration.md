[[Wiki]]

h1. Scalr administration


h2. Received RebundleFailed event from server. Reason: EBS volume vol-XXXXXXXX wasn't attached in a reasonable time and you're useing _t1.micro_ server type

* http://wiki.scalr.net/Known_issues_with_solutions

<pre>
rm -f /etc/scalr/private.d/db.sqlite
/etc/init.d/scalarizr restart
</pre>
