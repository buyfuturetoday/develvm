Module Hello

  Public Sub SendClientData()
    Dim request As HttpWebRequest
    Dim response As HttpWebResponse = Nothing
    Dim reader As StreamReader
    Dim address As Uri
    Dim data As StringBuilder
    Dim byteData() As Byte
    Dim postStream As Stream = Nothing
    
    ' Set the REST API URL
    address = New Uri("https://app.example.com/api/clientdata")
    ' Create the web request
    request = DirectCast(WebRequest.Create(address), HttpWebRequest)

    ' Set type to POST  
    request.Method = "POST"
    request.ContentType = "application/x-www-form-urlencoded"

    ' Create the data we want to send (each data.Append is for specific paramater data) 
    data = New StringBuilder()
    data.Append("serial=" + HttpUtility.UrlEncode(serial))
    data.Append("&version=" + HttpUtility.UrlEncode(version))
    data.Append("&last_update=" + HttpUtility.UrlEncode(lastUpdatedDate))
    ' Create a byte array of the data we want to send  
    byteData = UTF8Encoding.UTF8.GetBytes(data.ToString())

    ' Set the content length in the request headers  
    request.ContentLength = byteData.Length

    ' Write data  
    Try
      postStream = request.GetRequestStream()
      postStream.Write(byteData, 0, byteData.Length)
    Finally
      If Not postStream Is Nothing Then postStream.Close()
    End Try

    Try
      ' Get response  
      response = DirectCast(request.GetResponse(), HttpWebResponse)
      ' Get the response stream into a reader  
      reader = New StreamReader(response.GetResponseStream())
      ' Console application output  
      Console.WriteLine(reader.ReadToEnd())
    Catch
      ' Update form textbox in threadsafe manner that posting to API failed
      SetTextBoxText_ThreadSafe(Me.logTxtBox, "Error contacting server to update client data." + vbCrLf)
    Finally
      If Not response Is Nothing Then response.Close()
    End Try
  End Sub

End Module
