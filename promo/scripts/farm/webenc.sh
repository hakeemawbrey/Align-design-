#!/bin/bash
# webenc.sh film version — 720×1280 web copy (≤ ~1.6 Mbps, faststart) + a 360×640 poster for the screening-room page
f=$1; v=$2; cd /home/user/Align-design- || exit 1
src=promo/out/films/$f/align-$f-$v-send.mp4; out=promo/out/web; [ -f "$src" ] || { echo "missing $src"; exit 1; }
nice -n 10 ffmpeg -loglevel error -y -i "$src" -vf "scale=720:1280:flags=lanczos" -c:v libx264 -preset slow -crf 22 -maxrate 1600k -bufsize 3200k \
  -profile:v high -pix_fmt yuv420p -c:a aac -b:a 112k -movflags +faststart "$out/$f.mp4" || exit 1
nice -n 10 ffmpeg -loglevel error -y -ss ${POSTER_T:-3.2} -i "$src" -frames:v 1 -vf "scale=360:640:flags=lanczos" -q:v 4 "$out/posters/$f.jpg" || exit 1
echo "$f $(du -k "$out/$f.mp4" | cut -f1)KB $(ffprobe -v error -show_entries format=duration -of csv=p=0 "$out/$f.mp4")s"
