Yet another post

[meta:author]: <> (Jonas Colmsjo)
[meta:title]: <> (Qr-codes.md)
[meta:date]: <> (2012-01-01)
[meta:nested:key]: <> (Metadata value)

##!!truncate


[[Main_Page]]


* https://developers.google.com/chart/?hl=sv-SE
** With unicode data

* http://goqr.me/

* http://www.qrstuff.com/
** Fungerar inte med min QR reader

* http://www.moongate.ro/en/products/qr_code-vcard/
** Fungerar men åäö verkar inte fungera

* http://qrcode.kaywa.com/
** Klarar åäö men gör inte hela vCards


= vCard =

* http://en.wikipedia.org/wiki/VCard


<pre>
BEGIN:VCARD
VERSION:4.0
N:Colmsjö;Jonas;;;
FN: Jonas Colmsjö
ORG:Gizur AB
TITLE:CEO
TEL;TYPE="work,voice";VALUE=uri:tel:+46-303-719130
ADR;TYPE=work;LABEL="P/O Box 84\n44421 Stenungsund\nSWEDEN"
 :;;P/O Box 84.;Stenungsund;;44421;SWEDEN
EMAIL:jonas.colmsjo@gizur.com
REV:20120423T000000Z
END:VCARD
</pre>

Same as above without newlines
<pre>
BEGIN:VCARD\nVERSION:4.0\nN:Colmsjö;Jonas;;;\nFN: Jonas Colmsjö\nORG:Gizur AB\nTITLE:CEO\nTEL;TYPE="work,voice";VALUE=uri:tel:+46-303-719130\nADR;TYPE=work;LABEL="P/O Box 84\n44421 Stenungsund\nSWEDEN"\n :;;P/O Box 84.;Stenungsund;;44421;SWEDEN\nEMAIL:jonas.colmsjo@gizur.com\nREV:20120423T000000Z\nEND:VCARD
</pre>




<pre>
BEGIN:VCARD
VERSION:4.0
N:Colmsjö;Jonas;;;
FN: Jonas Colmsjö
ORG:Gizur AB
TITLE:CEO
PHOTO:http://www.example.com/dir_photos/my_photo.gif
TEL;TYPE="work,voice";VALUE=uri:tel:+1-111-555-1212
TEL;TYPE="home,voice";VALUE=uri:tel:+1-404-555-1212
ADR;TYPE=work;LABEL="42 Plantation St.\nBaytown, LA 30314\nUnited States of America"
 :;;42 Plantation St.;Baytown;LA;30314;United States of America
EMAIL:forrestgump@example.com
REV:20080424T195243Z
END:VCARD
</pre>


<pre>
BEGIN:VCARD
N:Colmsjö;Jonas
ORG:Gizur AB
TITLE:CEO
TEL:+46 303 719130
EMAIL:jonas.colmsjo@gizur.com
URL:www.gizur.com
ADR:;;P/O Box 84;Stenungsund;;44421;SWEDEN
END:VCARD
</pre>


= Misc =

* http://www.web-source.net/symbols.htm
