

WinWaitActive, ahk_class #32770
; Start install popup, hit Yes
ControlClick, Button1, ahk_class #32770
WinWaitClose, ahk_class #32770

WinWaitActive, ahk_class #32770

; Next
Sleep, 100
ControlClick, Button2, ahk_class #32770

; Next
Sleep, 100
ControlClick, Button4, ahk_class #32770

; Do not add to start menu (checkbox)
Sleep, 100
ControlClick, Button2, ahk_class #32770

; Next
Sleep, 100
ControlClick, Button6, ahk_class #32770

; Finish
Sleep, 100
ControlClick, Button7, ahk_class #32770

WinWaitClose, ahk_class #32770

Sleep, 1000

WinWaitActive, ahk_class #32770
WinWaitClose, ahk_class #32770

Sleep, 200

WinWaitActive, ahk_class #32770
; Close the popup
ControlClick, Button1, ahk_class #32770
WinWaitClose, ahk_class #32770
