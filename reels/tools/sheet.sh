#!/bin/sh
# contact sheet of a reel: 2 frames/sec, 8 across. usage: sheet.sh in.mp4 out.png
ffmpeg -v error -i "$1" -vf "fps=2,scale=180:-1,tile=8x5" -frames:v 1 -y "$2"
