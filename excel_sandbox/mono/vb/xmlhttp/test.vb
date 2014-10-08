Module Hello

	Sub xp()

	    Dim XMLHttp As New MSXML2.XMLHttp

	    XMLHttp.Open("POST", "http://www.your.url/page.xxx", False)
	    XMLHttp.send("your post data")
	    MsgBox(XMLHttp.responseXML)

	End Sub

End Module