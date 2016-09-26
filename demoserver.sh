#!/bin/bash

path="servers/demo"

# useful flags: -minimize
# first time the server is run, a new wine prefix will be created. Be patient
# uncomment next line to run in a virtual X server
./xvfb-run \
./startded "$path" -maxplayers 32 -counts 10 -battle battle1

# you can join the demo server from another terminal using the main wine prefix:
# $ ./start game -connect 127.0.0.1
