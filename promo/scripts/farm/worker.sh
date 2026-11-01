#!/bin/bash
# worker.sh [slot] — pops "film version" lines from queue.txt (under queue.lock, so several workers can share one queue)
# and renders each with rs.sh in its own render slot. LINGER=<s>: wait that long for new work before exiting (default 0).
# DEADLINE=<epoch s>: start no new job after this (keeps a worker inside the 2 h background limit).
SLOT=${1:-1}; Q=/tmp/claude-0/queue.txt; idle=0
while true; do
  [ -n "$DEADLINE" ] && [ "$(date +%s)" -ge "$DEADLINE" ] && exit 0
  # a 60 s film needs ~1.7 GB of frames plus masters — wait (up to ~10 min) for disk if parallel renders have it all
  for i in $(seq 180); do [ "$(df --output=avail -BG /home/user | tail -1 | tr -dc 0-9)" -ge 3 ] && break; sleep 20; done
  line=$(flock /tmp/claude-0/queue.lock sh -c "l=\$(head -1 $Q 2>/dev/null); [ -n \"\$l\" ] && sed -i 1d $Q; echo \"\$l\"")
  if [ -z "$line" ]; then
    [ "$idle" -ge "${LINGER:-0}" ] && exit 0
    sleep 15; idle=$((idle + 15)); continue
  fi
  idle=0
  echo "$(date +%T) slot $SLOT start $line" >> /tmp/claude-0/workers.log
  SLOT=$SLOT /tmp/claude-0/rs.sh $line 2>&1 | tail -1 >> /tmp/claude-0/done.txt
  set -- $line; [ -f /home/user/Align-design-/promo/out/films/$1/align-$1-$2-send.mp4 ] || { echo "$(date +%T) slot $SLOT FAIL  $line" >> /tmp/claude-0/workers.log; grep -qx "$line" /tmp/claude-0/failed.txt 2>/dev/null || { echo "$line" >> /tmp/claude-0/failed.txt; flock /tmp/claude-0/queue.lock sh -c "echo '$line' >> $Q"; }; }
  echo "$(date +%T) slot $SLOT done  $line" >> /tmp/claude-0/workers.log
done
