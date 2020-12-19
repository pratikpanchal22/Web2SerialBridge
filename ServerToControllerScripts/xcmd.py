import sys
import os
import shutil
import datetime, time
# while 1 loop 

# script to pass in command: ./exec lm=200;rm=250;
   # get current unix time stamp
   # create a file named that
   # pass in arguments in that file
   # move file to cmdFiles dir
dirPath = '/var/www/controls/cmdFiles/'


def xcmd(cmd):
   #timeBasedFileName = time.time()
   cTime = datetime.datetime.now()

   timeBasedFileName = str();
   timeBasedFileName += str(int(time.mktime(cTime.timetuple())))
   timeBasedFileName += str('.')
   timeBasedFileName += str(cTime.microsecond)

   print("Creating file: " + timeBasedFileName)
   file = open(str(timeBasedFileName), "w")
   file.write(cmd)
   file.close()
   
   #file = open(str(timeBasedFileName), 'r')
   #print file
   #file.close
   
   try:
      shutil.move(os.path.join(".", str(timeBasedFileName)), dirPath)
   except OSError:
      pass
   
   # script for delay in ms: ./delay 2000;
   return

