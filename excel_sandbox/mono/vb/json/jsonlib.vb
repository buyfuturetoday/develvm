' Compile in mono: vbnc jsonlib.vb /d:Mono=True

Module CJson

    #If Mono Then 

    #Else 
        Option Explicit On
    #End If

    Const INVALID_JSON      As Long = 1
    Const INVALID_OBJECT    As Long = 2
    Const INVALID_ARRAY     As Long = 3
    Const INVALID_BOOLEAN   As Long = 4
    Const INVALID_NULL      As Long = 5
    Const INVALID_KEY       As Long = 6


    Private Sub Class_Initialize()

    End Sub


 


    Public Shared Sub Main()
        MsgBox("Hello, World!") ' Display message on computer screen.
    End Sub


End
