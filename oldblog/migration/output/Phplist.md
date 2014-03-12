Yet another post

[meta:author]: <> (Jonas Colmsjo)
[meta:title]: <> (Phplist.md)
[meta:date]: <> (2012-01-01)
[meta:nested:key]: <> (Metadata value)

##!!truncate


[[IT resources]]


== phplist ==

* Installation - http://docs.phplist.com/PhplistInstallation
* Configuration - http://docs.phplist.com/PhpListConfiguration


=== Installation ===


<pre>
wget http://prdownloads.sourceforge.net/phplist/phplist-2.10.16.zip?download
unzip phplist-2.10.16.zip
cd phplist-2.10.16

mkdir /var/www/html/lists
cp -R public_html/lists/* /var/www/html/lists/
chown -R apache:apache /var/www/html/lists/

Create database in MySQL - s2.gizur.com/phpMyAdmin

cd /var/www/html/lists/config
vi config.php

s2.gizur.com/lists/admin


</pre>


=== ursprunglig konfiguration ===


* Charset for HTML messages: UTF-8
* Charset for Text messages: UTF-8

Header of public pages. The header should start with </head> . You can add header elements, but don't add the title or other basic header elements.
<pre>
<link href="styles/phplist.css" type="text/css" rel="stylesheet">

</head>
<body bgcolor="#ffffff" background="images/bg.png">
<a name="top"></a>
<div align=center>
<table cellspacing=0 cellpadding=0 width=710 border=0>
<tr>
<td bgcolor="#000000" rowspan=3><img height=1 alt="" src="images/transparent.png" width=1 border=0></td>
<td bgcolor="#000000"><img height=1 alt="" src="images/transparent.png" width=708 border=0></td>
<td bgcolor="#000000" rowspan=3><img height=1 alt="" src="images/transparent.png" width=1 border=0></td>
</tr>

<tr valign="top" align="left">
<td>
<!--TOP TABLE starts-->
<TABLE cellSpacing=0 cellPadding=0 width=708 bgColor=#ffffff border=0>
  <TR vAlign=top>
    <TD colSpan=2 rowspan="2" height="63" background="images/topstrip.png"><a href="http://www.phplist.com" target="_blank"><img src="images/masthead.png" border=0 width=577 height=75></a></TD>
    <TD align=left
      background="images/topstrip.png" bgcolor="#F0D1A3"><FONT
      size=-2>&nbsp;<I>powered by: </I><BR>&nbsp;<B>[<A class=powered
      href="http://www.php.net/" target=_new><I>PHP</I></A>]</B> + <B>[<A
      class=powered href="http://www.mysql.com/"
      target=_new>mySQL</A>]</B></FONT></TD></TR>
  <TR vAlign=bottom>
    <TD vAlign=bottom width=132
    background="images/topright.png" bgcolor="#F0D1A3"><SPAN
      class=webblermenu>PHPlist</SPAN></TD></TR>
  <TR>
    <TD bgColor=#000000><IMG height=1 alt=""
      src="images/transparent.png" width=20
      border=0></TD>
    <TD bgColor=#000000><IMG height=1 alt=""
      src="images/transparent.png" width=576
      border=0></TD>
    <TD bgColor=#000000><IMG height=1 alt=""
      src="images/transparent.png" width=132
      border=0></TD></TR>
  <TR vAlign=top>
    <TD>&nbsp;</TD>
<td><div align=left>
<br />

</pre>



Footer of public pages
<pre>
</div>
</td>
<td>
<div class="menutableright">

</div>
</td>
</tr>




<tr><td colspan="4">&nbsp;</td></tr>



<tr><td colspan="4">&nbsp;</td></tr>
</table>
<!--TOP TABLE ends-->

</td></tr>


<tr>
<td bgcolor="#000000" colspan=3><img height=1 alt="" src="images/transparent.png" width=1 border=0></td>
</tr>

<tr>
<td bgcolor="#000000"><img height=1 alt="" src="images/transparent.png" width=1 border=0></td>
<td bgcolor="#ff9900" class="bottom">&copy; <a href="http://tincan.co.uk" target="_tincan" class="urhere">tincan limited</a> | <a class="urhere" href="http://www.phplist.com" target="_blank">phplist</a></td>
<td bgcolor="#000000"><img height=1 alt="" src="images/transparent.png" width=1 border=0></td>
</tr>

<tr>
<td bgcolor="#000000" colspan=3><img height=1 alt="" src="images/transparent.png" width=1 border=0></td>
</tr>

<tr>
<td colspan=3><img height=3 alt="" src="images/transparent.png" width=1 border=0></td>
</tr>

<tr>
<td colspan=3>
&nbsp;
</td>
</tr>
</tbody>
</table>

</div>
</body></html>

</pre>




CSS for HTML messages without a template
<pre>
<style type="text/css">
body { font-size : 11px; font-family: Verdana, Arial, Helvetica, sans-serif; }
a { font-size: 11px; color: #ff6600; font-style: normal; font-family: verdana, sans-serif; text-decoration: none; }
a:visited { color: #666666; }
a:hover { text-decoration: underline; }
p { font-weight: normal; font-size: 11px; color: #666666; font-style: normal; font-family: verdana, sans-serif; text-decoration: none; }
h1 {font-weight: bold; font-size: 14px; color: #666666; font-style: normal; font-family: verdana, sans-serif; text-decoration: none;}
h2 {font-weight: bold; font-size: 13px; color: #666666; font-style: normal; font-family: verdana, sans-serif; text-decoration: none;}
h3 {font-weight: bold; font-size: 12px; color: #666666; font-style: normal; font-family: verdana, sans-serif; text-decoration: none; margin:0px; padding:0px;}
h4 {font-weight: bold; font-size: 11px; color: #666666; font-style: normal; font-family: verdana, sans-serif; text-decoration: none; margin:0px; padding:0px;}
hr {width : 100%; height : 1px; color: #ff9900; size:1px;}
.forwardform {margin: 0 0 0 0; padding: 0 0 0 0;}
.forwardinput {margin: 0 0 0 0; padding: 0 0 0 0;}
.forwardsubmit {margin: 0 0 0 0; padding: 0 0 0 0;}
div.emailfooter { font-size : 11px; font-family: Verdana, Arial, Helvetica, sans-serif; }
div.emailfooter a { font-size: 11px; color: #ff6600; font-style: normal; font-family: verdana, sans-serif; text-decoration: none; }
</style>
</pre>
