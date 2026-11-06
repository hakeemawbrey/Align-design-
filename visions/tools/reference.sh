#!/bin/sh
# Contact sheets of the reference reel, for side-by-side review. Kept in cache/ (not committed).
# usage: tools/reference.sh path/to/reference.mp4
set -e
cd "$(dirname "$0")/.."
mkdir -p cache/reference
ffmpeg -v error -y -i "$1" -vf "select='not(mod(n\,6))',crop=iw:iw:0:(ih-iw)/2,scale=240:240,tile=7x3" -frames:v 1 cache/reference/sheet.jpg
ffmpeg -v error -y -ss 1 -i "$1" -frames:v 1 -vf scale=360:-1 cache/reference/frame.jpg
ffmpeg -v error -y -sseof -0.8 -i "$1" -frames:v 1 -vf scale=360:-1 cache/reference/end.jpg
echo cache/reference/
