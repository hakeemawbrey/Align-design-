#!/bin/bash
# usage: rq.sh name version  — renders one film with sound, sheet, then clears its frames dir
cd /home/user/Align-design-; f=$1; v=$2
flock /tmp/claude-0/git.lock git pull -q --autostash
node promo/scripts/teaser-sound.mjs --film=$f >/dev/null && node promo/scripts/render.mjs --film=$f $VFLAG --out=promo/out/films/$f/align-$f-$v.mp4 2>&1 | tail -1
mkdir -p /tmp/claude-0/sh-$f-$v; ffmpeg -loglevel error -y -i promo/out/films/$f/align-$f-$v-share.mp4 -vf "fps=$( [ "$(ffprobe -v error -show_entries format=duration -of csv=p=0 promo/out/films/$f/align-$f-$v.mp4 | cut -d. -f1)" -lt 20 ] && echo 4 || echo 2 ),scale=320:-1,tile=${TILE:-6x10}" -frames:v 1 /tmp/claude-0/sh-$f-$v/sheet.jpg
rm -rf promo/out/frames/align-$f-$v
