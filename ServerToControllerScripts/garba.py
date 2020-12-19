import sys
import os
from time import sleep
from xcmd import xcmd

xcmd("lm=150;rm=150;")
sleep(0.5)

xcmd("lm=150;rm=255;")
sleep(0.5)

xcmd("lm=150;rm=150;")
sleep(0.5)

xcmd("lm=150;rm=255;")
sleep(0.5)

xcmd("lm=-255;")
sleep(1.001)

xcmd("lm=255;")
sleep(3.301)

xcmd("lm=0;rm=0;")
sleep(3.001)
