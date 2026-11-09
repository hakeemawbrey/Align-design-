#!/usr/bin/env bash
# Master the mix (gain + limiter → -14 LUFS, -2.2 dBTP) and encode the video:
# out/stars-align.mp4 (CRF 16 master) and out/stars-align.web.mp4 (CRF 20 delivery).
# usage: encode.sh [story-id]   (no id: the original stars-align build)
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p out
ID="${1:-}"
B=build${ID:+/$ID}
NAME=${ID:-stars-align}
lufs() { ffmpeg -hide_banner -nostats -i "$1" -af ebur128=peak=true -f null - 2>&1 | awk '/Integrated/{getline; print $2} /True peak:/{getline; print $2}' | tr '\n' ' '; }
read I TP <<<"$(lufs $B/mix.wav)"
gain=$(python3 -c "print(-14 - $I)")
# the limiter needs a few passes of make-up gain to settle at -14 under a -2.2 dB ceiling
for pass in 1 2 3; do
  ffmpeg -y -loglevel error -i $B/mix.wav -af "volume=${gain}dB,aresample=192000,alimiter=limit=$(python3 -c 'print(10**(-2.7/20))'):attack=1:release=60:level=false,aresample=48000" -c:a pcm_s24le $B/master.wav
  read I TP <<<"$(lufs $B/master.wav)"
  gain=$(python3 -c "print($gain + (-14 - $I))")
done
echo "master: $I LUFS, true peak $TP dBTP"
for q in 16:out/$NAME.mp4:320k 20:out/$NAME.web.mp4:192k; do
  IFS=: read crf file ab <<<"$q"
  ffmpeg -y -loglevel error -framerate 30 -i $B/frames/f%05d.jpg -i $B/master.wav \
    -c:v libx264 -preset slow -crf "$crf" -pix_fmt yuv420p -profile:v high -movflags +faststart \
    -c:a aac -b:a "$ab" -shortest "$file"
  echo "$file: $(du -h "$file" | cut -f1)"
done
