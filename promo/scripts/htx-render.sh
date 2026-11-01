#!/bin/bash
# Throttled renderer for the Houston batch: at most 2 renders run at once on this 4-CPU box.
# usage: promo/scripts/htx-render.sh <render.mjs args...>     (or: htx-render.sh --sound <film>)
cd "$(dirname "$0")/../.."
L=/tmp/htx-render-locks; mkdir -p $L
while true; do
  for s in 1 2; do
    exec 9>$L/slot$s
    if flock -n 9; then
      if [ "$1" = "--sound" ]; then node promo/scripts/teaser-sound.mjs --film="$2"; else node promo/scripts/render.mjs --workers=2 "$@"; fi
      exit $?
    fi
  done
  sleep 3
done
