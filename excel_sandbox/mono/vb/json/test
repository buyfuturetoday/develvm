Option Explicit

'
'   jsonlib.toString tests
'
Sub toString_test1()

    Dim a As String
    Dim b As Date
    Dim lib As New JSONLib
    
    b = Now()
    
    Debug.Print lib.toString(Array("a", "b", Array(1, b, "3")))

    Debug.Assert Err.Number = 0

    Set lib = Nothing

End Sub
Sub toString_test2()

    Dim a As Object
    Dim b As Object
    Dim c As New Collection
    Dim lib As New JSONLib
    
    Set a = CreateObject("Scripting.Dictionary")
    Set b = CreateObject("Scripting.Dictionary")
    
    a("aaa") = "abc"
    a("bbb") = Array(0, 1, b)
    b("ccc") = "def"
    Set b("ddd") = c
    c.Add "ghi"
    c.Add 999
    
    Debug.Print lib.toString(a)
    Debug.Assert Err.Number = 0
    
    Set lib = Nothing
    Set c = Nothing
    Set b = Nothing
    Set a = Nothing
    
End Sub

'
'   jsonlib.parse tests
'
Sub parse_test1()

    Dim lib As New JSONLib
    Dim json As Object

    Set json = lib.parse(" " & vbCrLf & vbTab & " {}")
    Debug.Assert TypeName(json) = "Dictionary"
    Debug.Assert Err.Number = 0
    
    'Debug.Print "Value:" & json.Count & TypeName(json)
    Debug.Print 'Value:'
    
    Set json = Nothing
    
    Set json = lib.parse(" " & vbCrLf & vbTab & " []")
    Debug.Assert TypeName(json) = "Collection"
    Debug.Assert Err.Number = 0
    
    Debug.Print TypeName(json), json.Count

    Set json = Nothing
    Set lib = Nothing
    
End Sub
Sub parse_test2()

    Dim lib As New JSONLib
    Dim json As Object

    Set json = lib.parse(" " & vbCrLf & vbTab & " {}")
    
    Debug.Print lib.toString(json)
    Debug.Assert Err.Number = 0
    
    Set json = Nothing
    Set lib = Nothing
    
End Sub
Sub parse_test3()

    Dim lib As New JSONLib
    Dim json As Object

    Set json = lib.parse(" " & vbCrLf & vbTab & " [[], {""test1"":'v1', 'test2':'v222', test3:""v33333""}, null , ""test"", 123, 567.8910, 4.7e+10, true,  false]")
    Debug.Assert Err.Number = 0
    
    Debug.Print lib.toString(json)
    
    Set json = Nothing
    Set lib = Nothing
    
End Sub
Sub parse_test4()
    
    Dim lib As New JSONLib
    Dim json As Object

    Set json = lib.parse("[{""type"":""t1"",""title"":""___1"",""attr"":[""1-1"",""1-2""]},{""type"":""t2"",""title"":""___2"",""attr"":[""2-1"",""2-2""]}]")"]}]")
    Debug.Assert Err.Number = 0
    
    Debug.Print lib.toString(json)
    
    Set json = Nothing
    Set lib = Nothing

End Sub
Sub parse_test5()
    
    Dim lib As New JSONLib
    Dim json As Object
    Dim text As String
    Dim res1 As String
    Dim res2 As String

    With CreateObject("ADODB.Stream")
        .Open
        .Charset = "UTF-8"
        .LoadFromFile ActiveWorkbook.Path & "\\test.json"
        text = .ReadText(-1)
        .Close
    End With
    
    Debug.Print text
    
    Set json = lib.parse(text)
    Debug.Assert Err.Number = 0
    res1 = lib.toString(json)
    
    Set json = lib.parse(lib.toString(json))
    Debug.Assert Err.Number = 0
    res2 = lib.toString(json)
    
    Debug.Print res1
    Debug.Print res2
    
    Debug.Assert (res1 = res2)
    
    Set json = Nothing
    Set lib = Nothing

End Sub

'
'   internal function tests
'
'       before executing this test, modify jsonlib.skipChar to 'Friend' or 'Public'
'
Sub skip_test()

    Dim lib As New JSONLib
    Dim str As String
    Dim index As Long
    
    str = vbCrLf & vbCr & vbLf & " " & "abc"
    index = 1
    
    lib.skipChar str, index
    Debug.Assert index = 6
    
    Debug.Print index, Mid(str, index, 1)
    
    Set lib = Nothing

End Sub
