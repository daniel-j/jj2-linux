#!/bin/bash

path="servers/demo"

if [ ! -d "$path" ]
then
	mkdir -p "$path"

	# initialize the skeleton
	./initskeleton "$path"
fi

# first time the server is run, a new wine prefix will be created. Be patient
# comment next line to not run in a virtual X
#./xvfb-run \
./startded "$path" -battle Battle1

# you can join the demo server from another terminal using the main wine prefix:
# $ ./start game -connect 127.0.0.1
