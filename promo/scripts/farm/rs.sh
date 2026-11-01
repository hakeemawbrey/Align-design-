#!/bin/bash
# rs.sh film version — vertical render with sound + send copy + sheets, serialized
f=$1; v=$2; cd /home/user/Align-design-
VFLAG=--vertical TILE=10x6 flock /tmp/claude-0/render.lock.${SLOT:-1} /tmp/claude-0/rq.sh $f $v 2>&1 | tail -2
d=promo/out/films/$f
ffmpeg -loglevel error -y -i $d/align-$f-$v.mp4 -c:v libx264 -b:v 3400k -maxrate 3800k -bufsize 7000k -preset slow -pix_fmt yuv420p -c:a aac -b:a 160k -movflags +faststart $d/align-$f-$v-send.mp4
dur=$(ffprobe -v error -show_entries format=duration -of csv=p=0 $d/align-$f-$v-send.mp4 | cut -d. -f1)
mkdir -p /tmp/claude-0/sh-$f-$v
[ "$dur" -gt 31 ] && ffmpeg -loglevel error -y -ss 30 -i $d/align-$f-$v-send.mp4 -vf "fps=2,scale=320:-1,tile=10x6" -frames:v 1 /tmp/claude-0/sh-$f-$v/sheet2.jpg
rm -f $d/align-$f-$v.mp4 $d/align-$f-$v-share.mp4
# web copy + poster for the screening-room page
[ -f $d/align-$f-$v-send.mp4 ] && /tmp/claude-0/webenc.sh $f $v >> /tmp/claude-0/web.log 2>&1
ls -la $d/align-$f-$v-send.mp4
