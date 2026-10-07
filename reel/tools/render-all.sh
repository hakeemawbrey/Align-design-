#!/usr/bin/env bash
# Render every launch video, share-ready (H.264, ~10–14 Mbps, AAC). Output: out/final/
# usage: tools/render-all.sh [jobs]   (default 3 renders in parallel)
set -euo pipefail
cd "$(dirname "$0")/.."
JOBS=${1:-3}
mkdir -p out/final
node tools/teaser-audio.mjs >/dev/null
node tools/soundtrack.mjs >/dev/null
{
  echo "index.html||align-hero-reel"
  for s in aries taurus gemini cancer leo virgo libra scorpio sagittarius capricorn aquarius pisces; do echo "sign.html|sign=$s|sign-$s"; done
  echo "love.html|a=taurus&b=scorpio|love-taurus-scorpio"
  echo "love.html|a=leo&b=aquarius|love-leo-aquarius"
  echo "launch.html||countdown-soon"
  if [ -z "${SKIP_VORTEX:-}" ]; then echo "vortex.html||into-the-vortex"; fi
} | xargs -P "$JOBS" -I{} bash -c '
  IFS="|" read -r page query name <<< "{}"
  node tools/export.mjs --page "$page" --query "$query" --crf 23 --out "out/final/$name.mp4" > "out/final/$name.log" 2>&1 && echo "done  $name" || echo "FAIL  $name (see out/final/$name.log)"
'
