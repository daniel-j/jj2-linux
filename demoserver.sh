#!/bin/bash

path="servers/demo"

if [ ! -d "$path" ]; then
	mkdir -p "$path"

	# initialize the skeleton
	./initskeleton "$path"

	# here for demo purposes
	echo "Adding some game files..."
	cp -vn game/Battle1.j2l game/Castle1.j2t game/Castle.j2b "$path"
fi

# first time the server is run, a new wine prefix will be created. Be patient
./xvfb-run ./startded "$path" -battle Battle1

# you can join the demo server from another terminal using the main wine prefix:
# $ ./start game -connect 127.0.0.1
