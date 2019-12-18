#!/bin/bash
outputName="output.mp4"
dimensions="6480x3840"
fps=30
frameName="png/%07d.png"
b="24600k" # constent bitrate in Kb/s
C:\ffmpeg\bin\ffmpeg -r $fps -f image2 -s $dimensions -i $frameName \
-c:v hevc_videotoolbox -b:v $b -tag:v hvc1 -allow_sw 1 \
-pix_fmt yuv420p -colorspace bt709 -color_primaries bt709 -color_trc bt709 \
$outputName

