#!/usr/bin/env python
import serial
import sys

data=sys.argv[1]

port = '/dev/ttyUSB0'

s1 = serial.Serial(port,500000)
s1.write(data)
