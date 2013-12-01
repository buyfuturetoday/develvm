Web service exmaples
===================

Links:

 * http://www.mono-project.com/Web_Services_%28Visual_Basic%29


Example
-------


```
wsdl http://dic.googlecode.com/files/GoogleSearch.wsdl -language:vb

vbnc /target:library GoogleSearchService.vb -r:System.Web.Services.dll,System.Xml.dll


```