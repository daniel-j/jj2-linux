Run, plusifier.exe

WinWaitActive, ahk_class #32770
Sleep, 100
Send, Jazz2.exe{enter}
WinWaitClose, ahk_class #32770

WinWaitActive, ahk_class #32770
Sleep, 100
Send, Jazz2{+}.exe{enter}
WinWaitClose, ahk_class #32770
