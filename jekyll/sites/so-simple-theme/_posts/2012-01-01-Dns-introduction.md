---
layout: post
description: Dns
title: Dns
date: 2012-01-01
author: Jonas Colmsjo
tags: ['post']
---

Yet another post





[[Main_Page]]


#= Links =

* http://rscott.org/dns/
* http://www.aboutdebian.com/dns.htm
* http://trulymanaged.com/blog/dedicated-server-hosting/what-is-dns-exactly/
* http://www.faqs.org/rfcs/rfc1713.html
* http://www.ripe.net/ripe/docs/ripe-114


#= bind config =

<pre>
root@mgmt-server1:/etc/bind# cat db.gizurcloud 
;
; BIND data file for local loopback interface
;
$TTL	604800
@	IN	SOA	gizurcloud.com. root.gizurcloud. (
			      2		; Serial
			 604800		; Refresh
			  86400		; Retry
			2419200		; Expire
			 604800 )	; Negative Cache TTL
;
;@	IN	NS	localhost.
;@	IN	A	127.0.0.1
;@	IN	AAAA	::1

;
; Setup nameserver for gizurcloud.com
;
gizurcloud.com.          IN NS   ns1.gizurcloud.com.
gizurcloud.com.          IN NS   ns2.gizurcloud.com.

ns1.gizurcloud.com.      IN A    31.222.171.12
ns2.gizurcloud.com.      IN A    31.222.171.12



root@mgmt-server1:/etc/bind# cat named.conf.default-zones 
// prime the server with knowledge of the root servers
zone "." {
	type hint;
	file "/etc/bind/db.root";
};

// be authoritative for the localhost forward and reverse zones, and for
// broadcast zones as per RFC 1912

zone "localhost" {
	type master;
	file "/etc/bind/db.local";
};

zone "127.in-addr.arpa" {
	type master;
	file "/etc/bind/db.127";
};

zone "0.in-addr.arpa" {
	type master;
	file "/etc/bind/db.0";
};

zone "255.in-addr.arpa" {
	type master;
	file "/etc/bind/db.255";
};

zone "gizurcloud.com" {
        type master;
        file "/etc/bind/db.gizurcloud";
};

</pre>

#= Receive delegation =

* http://cr.yp.to/djbdns/run-server.html
* http://cr.yp.to/djbdns/dot-com.html


#= DNSSEC and Delegation Signers (DS Data) =

* http://www.dnssec.net/


#= Check that a domain is configured correctly (no lame deletgation) =

Whois lists the name server for the domain:
<pre>
Gizur-Laptop-5:~ jonas$ whois gizur.com

Whois Server Version 2.0

Domain names in the .com and .net domains can now be registered
with many different competing registrars. Go to http://www.internic.net
for detailed information.

   Domain Name: GIZUR.COM
   Registrar: AB NAMEISP
   Whois Server: whois.nameisp.com
   Referral URL: http://www.nameisp.com
   Name Server: NS1.NAMEISP.INFO
   Name Server: NS2.NAMEISP.INFO
   Status: ok
   Updated Date: 05-nov-2009
   Creation Date: 08-aug-2007
   Expiration Date: 08-aug-2017

>>> Last update of whois database: Sun, 01 Jan 2012 10:48:17 UTC <<<

NOTICE: The expiration date displayed in this record is the date the
registrar's sponsorship of the domain name registration in the registry is
currently set to expire. This date does not necessarily reflect the expiration
date of the domain name registrant's agreement with the sponsoring
registrar.  Users may consult the sponsoring registrar's Whois database to
view the registrar's reported date of expiration for this registration.

TERMS OF USE: You are not authorized to access or query our Whois
database through the use of electronic processes that are high-volume and
automated except as reasonably necessary to register domain names or
modify existing registrations; the Data in VeriSign Global Registry
Services' ("VeriSign") Whois database is provided by VeriSign for
information purposes only, and to assist persons in obtaining information
about or related to a domain name registration record. VeriSign does not
guarantee its accuracy. By submitting a Whois query, you agree to abide
by the following terms of use: You agree that you may use this Data only
for lawful purposes and that under no circumstances will you use this Data
to: (1) allow, enable, or otherwise support the transmission of mass
unsolicited, commercial advertising or solicitations via e-mail, telephone,
or facsimile; or (2) enable high volume, automated, electronic processes
that apply to VeriSign (or its computer systems). The compilation,
repackaging, dissemination or other use of this Data is expressly
prohibited without the prior written consent of VeriSign. You agree not to
use electronic processes that are automated and high-volume to access or
query the Whois database except as reasonably necessary to register
domain names or modify existing registrations. VeriSign reserves the right
to restrict your access to the Whois database in its sole discretion to ensure
operational stability.  VeriSign may restrict or terminate your access to the
Whois database for failure to abide by these terms of use. VeriSign
reserves the right to modify these terms at any time.

The Registry database contains ONLY .COM, .NET, .EDU domains and
Registrars.

Whois server 2.0

The data in the www.NameISP.com whois database is provided to you for
information purposes only, that is, to assist you in obtaining information
about or related to a domain name registration record. We make this
information available "as is," and do not guarantee its accuracy.

By submitting a whois query, you agree that you will use this data only for
lawful purposes and that, under no circumstances will you use this data to:

(1) enable high volume, automated, electronic processes that stress or load
this whois database system providing you this information; or
(2) allow, enable, or otherwise support the transmission of mass
unsolicited,
commercial advertising or solicitations via direct mail, electronic
mail, or by telephone. The compilation, repackaging, dissemination or
other use of this data is expressly prohibited without prior written
consent from us.

NOTE! ALL WHOIS QUERIES AND IP ADDRESSES ARE LOGGED!

Domain Name: gizur.com
Created On: 2007-08-08
Expiration Date: 2017-08-08
Registered via: AB NameISP http://www.nameisp.com
Registrant Name: Protected Protected
Registrant Organization: Shield Whois
Registrant Street: Radiov?gen 2
Registrant City: V?stra Fr?lunda
Registrant Postal Code: 42147
Registrant Country: SE
Registrant Phone: +46.313011220
Registrant FAX:
Registrant Email: gizur.com@shieldwhois.com
Admin Name: Protected Protected
Admin Organization: Shield Whois
Admin Street: Radiov?gen 2
Admin City: V?stra Fr?lunda
Admin Postal Code: 42147
Admin Country: SE
Admin Phone: +46.313011220
Admin FAX:
Admin Email: gizur.com@shieldwhois.com
Tech Name: Protected Protected
Tech Organization: Shield Whois
Tech Street: Radiov?gen 2
Tech City: V?stra Fr?lunda
Tech Postal Code: 42147
Tech Country: SE
Tech Phone: +46.313011220
Tech FAX:
Tech Email: gizur.com@shieldwhois.com
Name Server: ns1.nameisp.info
Name Server: ns2.nameisp.info
</pre>

Check which nameservers that manages the com. domain:
<pre>
Gizur-Laptop-5:~ jonas$ dig com NS

; <<>> DiG 9.7.3-P3 <<>> com NS
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 57760
;; flags: qr rd ra; QUERY: 1, ANSWER: 13, AUTHORITY: 0, ADDITIONAL: 0

;; QUESTION SECTION:
;com.				IN	NS

;; ANSWER SECTION:
com.			172800	IN	NS	a.gtld-servers.net.
com.			172800	IN	NS	j.gtld-servers.net.
com.			172800	IN	NS	b.gtld-servers.net.
com.			172800	IN	NS	c.gtld-servers.net.
com.			172800	IN	NS	k.gtld-servers.net.
com.			172800	IN	NS	l.gtld-servers.net.
com.			172800	IN	NS	d.gtld-servers.net.
com.			172800	IN	NS	h.gtld-servers.net.
com.			172800	IN	NS	e.gtld-servers.net.
com.			172800	IN	NS	m.gtld-servers.net.
com.			172800	IN	NS	i.gtld-servers.net.
com.			172800	IN	NS	g.gtld-servers.net.
com.			172800	IN	NS	f.gtld-servers.net.

;; Query time: 59 msec
;; SERVER: 192.168.1.1#53(192.168.1.1)
;; WHEN: Sun Jan  1 15:09:23 2012
;; MSG SIZE  rcvd: 245
</pre>

Get the same information from the authoriative nameserver (just for fun):
<pre>
Gizur-Laptop-5:~ jonas$ dig @a.gtld-servers.net. com NS

; <<>> DiG 9.7.3-P3 <<>> @a.gtld-servers.net. com NS
; (1 server found)
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 36802
;; flags: qr aa rd; QUERY: 1, ANSWER: 13, AUTHORITY: 0, ADDITIONAL: 15
;; WARNING: recursion requested but not available

;; QUESTION SECTION:
;com.				IN	NS

;; ANSWER SECTION:
com.			172800	IN	NS	e.gtld-servers.net.
com.			172800	IN	NS	f.gtld-servers.net.
com.			172800	IN	NS	g.gtld-servers.net.
com.			172800	IN	NS	j.gtld-servers.net.
com.			172800	IN	NS	d.gtld-servers.net.
com.			172800	IN	NS	h.gtld-servers.net.
com.			172800	IN	NS	l.gtld-servers.net.
com.			172800	IN	NS	a.gtld-servers.net.
com.			172800	IN	NS	c.gtld-servers.net.
com.			172800	IN	NS	b.gtld-servers.net.
com.			172800	IN	NS	m.gtld-servers.net.
com.			172800	IN	NS	i.gtld-servers.net.
com.			172800	IN	NS	k.gtld-servers.net.

;; ADDITIONAL SECTION:
e.gtld-servers.net.	172800	IN	A	192.12.94.30
f.gtld-servers.net.	172800	IN	A	192.35.51.30
g.gtld-servers.net.	172800	IN	A	192.42.93.30
j.gtld-servers.net.	172800	IN	A	192.48.79.30
d.gtld-servers.net.	172800	IN	A	192.31.80.30
h.gtld-servers.net.	172800	IN	A	192.54.112.30
l.gtld-servers.net.	172800	IN	A	192.41.162.30
a.gtld-servers.net.	172800	IN	A	192.5.6.30
a.gtld-servers.net.	172800	IN	AAAA	2001:503:a83e::2:30
c.gtld-servers.net.	172800	IN	A	192.26.92.30
b.gtld-servers.net.	172800	IN	A	192.33.14.30
b.gtld-servers.net.	172800	IN	AAAA	2001:503:231d::2:30
m.gtld-servers.net.	172800	IN	A	192.55.83.30
i.gtld-servers.net.	172800	IN	A	192.43.172.30
k.gtld-servers.net.	172800	IN	A	192.52.178.30

;; Query time: 171 msec
;; SERVER: 192.5.6.30#53(192.5.6.30)
;; WHEN: Sun Jan  1 15:10:39 2012
;; MSG SIZE  rcvd: 509
</pre>

These nameservers shoudl also be listed using dig or nslookup.
Authorative nameserver for gizur.com listed below:
<pre>
Gizur-Laptop-5:~ jonas$ dig @a.gtld-servers.net. gizur.com NS

; <<>> DiG 9.7.3-P3 <<>> @a.gtld-servers.net. gizur.com NS
; (1 server found)
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 32379
;; flags: qr rd; QUERY: 1, ANSWER: 0, AUTHORITY: 2, ADDITIONAL: 0
;; WARNING: recursion requested but not available

;; QUESTION SECTION:
;gizur.com.			IN	NS

;; AUTHORITY SECTION:
gizur.com.		172800	IN	NS	ns1.nameisp.info.
gizur.com.		172800	IN	NS	ns2.nameisp.info.

;; Query time: 174 msec
;; SERVER: 192.5.6.30#53(192.5.6.30)
;; WHEN: Sun Jan  1 14:27:06 2012
;; MSG SIZE  rcvd: 75
</pre>


ns1.nameisp.info is Authorative nameserver for gizur.com, flag aa is set:
<pre>
Gizur-Laptop-5:~ jonas$ dig @ns1.nameisp.info gizur.com ANY

; <<>> DiG 9.7.3-P3 <<>> @ns1.nameisp.info gizur.com ANY
; (1 server found)
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 34446
;; flags: qr aa rd; QUERY: 1, ANSWER: 11, AUTHORITY: 0, ADDITIONAL: 2
;; WARNING: recursion requested but not available

;; QUESTION SECTION:
;gizur.com.			IN	ANY

;; ANSWER SECTION:
gizur.com.		120	IN	MX	10 ASPMX3.GOOGLEMAIL.COM.
gizur.com.		86400	IN	NS	ns1.nameisp.info.
gizur.com.		120	IN	MX	10 ASPMX4.GOOGLEMAIL.COM.
gizur.com.		120	IN	MX	1 ASPMX.L.GOOGLE.COM.
gizur.com.		86400	IN	NS	ns2.nameisp.info.
gizur.com.		120	IN	MX	10 ASPMX2.GOOGLEMAIL.COM.
gizur.com.		120	IN	MX	10 ASPMX5.GOOGLEMAIL.COM.
gizur.com.		120	IN	MX	5 ALT1.ASPMX.L.GOOGLE.COM.
gizur.com.		86400	IN	SOA	ns1.nameisp.info. registry.nameisp.com. 2007112950 10800 3600 604800 3600
gizur.com.		120	IN	MX	5 ALT2.ASPMX.L.GOOGLE.COM.
gizur.com.		120	IN	A	213.115.221.13

;; ADDITIONAL SECTION:
ns1.nameisp.info.	86400	IN	A	213.115.221.10
ns2.nameisp.info.	86400	IN	A	213.115.151.140

;; Query time: 58 msec
;; SERVER: 213.115.221.10#53(213.115.221.10)
;; WHEN: Sun Jan  1 14:30:51 2012
;; MSG SIZE  rcvd: 371
</pre>

My local nameserver is not authoriative nameserver, flag aa is not set:
<pre>
Gizur-Laptop-5:~ jonas$ dig @192.168.1.1 gizur.com ANY 

; <<>> DiG 9.7.3-P3 <<>> @192.168.1.1 gizur.com ANY
; (1 server found)
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 36071
;; flags: qr rd ra; QUERY: 1, ANSWER: 10, AUTHORITY: 0, ADDITIONAL: 0

;; QUESTION SECTION:
;gizur.com.			IN	ANY

;; ANSWER SECTION:
gizur.com.		10	IN	A	213.115.221.13
gizur.com.		98	IN	MX	10 ASPMX4.GOOGLEMAIL.com.
gizur.com.		98	IN	MX	10 ASPMX2.GOOGLEMAIL.com.
gizur.com.		98	IN	MX	1 ASPMX.L.GOOGLE.com.
gizur.com.		98	IN	MX	10 ASPMX3.GOOGLEMAIL.com.
gizur.com.		98	IN	MX	5 ALT1.ASPMX.L.GOOGLE.com.
gizur.com.		98	IN	MX	5 ALT2.ASPMX.L.GOOGLE.com.
gizur.com.		98	IN	MX	10 ASPMX5.GOOGLEMAIL.com.
gizur.com.		171494	IN	NS	ns1.nameisp.info.
gizur.com.		171494	IN	NS	ns2.nameisp.info.

;; Query time: 58 msec
;; SERVER: 192.168.1.1#53(192.168.1.1)
;; WHEN: Sun Jan  1 14:56:37 2012
;; MSG SIZE  rcvd: 267
</pre>

Gizur.com's SOA record (from the authoriative nameserver):
<pre>
Gizur-Laptop-5:~ jonas$ dig @ns1.nameisp.com gizur.com SOA

; <<>> DiG 9.7.3-P3 <<>> @ns1.nameisp.com gizur.com SOA
; (1 server found)
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 33606
;; flags: qr aa rd; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 0
;; WARNING: recursion requested but not available

;; QUESTION SECTION:
;gizur.com.			IN	SOA

;; ANSWER SECTION:
gizur.com.		86400	IN	SOA	ns1.nameisp.info. registry.nameisp.com. 2007112950 10800 3600 604800 3600

;; Query time: 29 msec
;; SERVER: 213.115.221.10#53(213.115.221.10)
;; WHEN: Sun Jan  1 15:05:27 2012
;; MSG SIZE  rcvd: 96
</pre>
