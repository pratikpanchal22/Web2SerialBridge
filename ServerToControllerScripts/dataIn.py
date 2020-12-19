#!/user/bin/env python
import serial

port = '/dev/ttyUSB0'

s1 = serial.Serial(port,500000)
s1.write("lm=200")
while 1 :
    line = s1.readline().decode('utf-8')[:-2]
    print(line)
