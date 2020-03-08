import os
import serial
import sys
import time

port = '/dev/ttyUSB0'
dirPath = '/var/www/CommandBucket/'

serialPort = serial.Serial(port,500000)

print ("Watching for command files in location:")
print dirPath

while True:
    files = sorted(os.listdir(dirPath))
    
    for file in files:
        print("\nReading cmdfile: " + file)
    
        absFilePath = (os.path.join(dirPath, file))
        #print("abs path: " + absFilePath)
        currentTime = time.time()
        print ("ct: " + str(currentTime))
        age = currentTime - float(file)
        print("Age: " + str(age))

        if(age < 5):
           with open(absFilePath) as f:
               lines = f.readlines()
    
           for line in lines:
               line.strip('\n')
               print line
               serialPort.write(line)

           f.close()
        else:
		     print("Skipping because this is an old file")


        os.remove(absFilePath)

        

