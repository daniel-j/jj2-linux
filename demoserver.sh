#!/bin/bash

mkdir -p servers/demo

# this should only be done once, but it's here for demo purposes
cp game/Battle1.j2l game/Castle1.j2t game/Castle.j2b servers/demo

# first time the server is run, a new wine prefix will be created. Be patient
. ./startded servers/demo -servername=Demo -player 32 -battle Battle1

# you can join the demo server from another terminal using the main wine prefix:
# $ ./start game -connect 127.0.0.1
