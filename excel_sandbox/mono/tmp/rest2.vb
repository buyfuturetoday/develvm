Module Hello

Function GetDataFromURL(strURL, strMethod, strPostData)
  Dim lngTimeout
  Dim strUserAgentString
  Dim intSslErrorIgnoreFlags
  Dim blnEnableRedirects
  Dim blnEnableHttpsToHttpRedirects
  Dim strHostOverride
  Dim strLogin
  Dim strPassword
  Dim strResponseText
  Dim objWinHttp
  lngTimeout = 59000
  strUserAgentString = "http_requester/0.1"
  intSslErrorIgnoreFlags = 13056 ' 13056: ignore all err, 0: accept no err
  blnEnableRedirects = True
  blnEnableHttpsToHttpRedirects = True
  strHostOverride = ""
  strLogin = ""
  strPassword = ""
  Set objWinHttp = CreateObject("WinHttp.WinHttpRequest.5.1")
  objWinHttp.SetTimeouts lngTimeout, lngTimeout, lngTimeout, lngTimeout
  objWinHttp.Open strMethod, strURL
  If strMethod = "POST" Then
    objWinHttp.setRequestHeader "Content-type", _
      "application/x-www-form-urlencoded"
  End If
  If strHostOverride <> "" Then
    objWinHttp.SetRequestHeader "Host", strHostOverride
  End If
  objWinHttp.Option(0) = strUserAgentString
  objWinHttp.Option(4) = intSslErrorIgnoreFlags
  objWinHttp.Option(6) = blnEnableRedirects
  objWinHttp.Option(12) = blnEnableHttpsToHttpRedirects
  If (strLogin <> "") And (strPassword <> "") Then
    objWinHttp.SetCredentials strLogin, strPassword, 0
  End If    
  On Error Resume Next
  objWinHttp.Send(strPostData)
  If Err.Number = 0 Then
    If objWinHttp.Status = "200" Then
      GetDataFromURL = objWinHttp.ResponseText
    Else
      GetDataFromURL = "HTTP " & objWinHttp.Status & " " & _
        objWinHttp.StatusText
    End If
  Else
    GetDataFromURL = "Error " & Err.Number & " " & Err.Source & " " & _
      Err.Description
  End If
  On Error GoTo 0
  Set objWinHttp = Nothing
End Function 

End Module