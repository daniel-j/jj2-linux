
WinWaitActive, ahk_class #32770

ControlClick, Button1, ahk_class #32770

Sleep, 500

Loop {
	Sleep, 200

	ControlGet, isenabled, Enabled,, Button1, ahk_class #32770
	ControlGetText, label, Button1, ahk_class #32770

	If (isenabled and label = "OK") {
		ControlClick, Button1, ahk_class #32770
		Break
	}
}
