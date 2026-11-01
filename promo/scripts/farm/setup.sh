#!/bin/bash
# setup.sh <list> — installs the render pipeline into /tmp/claude-0 for this checkout and loads <list> ("film version"
# lines) as the render queue. Then: nohup /tmp/claude-0/workers.sh 1 3 &  (3 render slots on a 4-core machine)
set -e
REPO=$(cd "$(dirname "$0")/../../.." && pwd); mkdir -p /tmp/claude-0 "$REPO/promo/out/web/posters"
for s in rq.sh rs.sh webenc.sh worker.sh workers.sh; do
  sed "s#/home/user/Align-design-#$REPO#g" "$REPO/promo/scripts/farm/$s" > /tmp/claude-0/$s; chmod +x /tmp/claude-0/$s
done
cp "$1" /tmp/claude-0/queue.txt; touch /tmp/claude-0/queue.lock /tmp/claude-0/workers.log
echo "repo $REPO · $(wc -l < /tmp/claude-0/queue.txt) films queued"
