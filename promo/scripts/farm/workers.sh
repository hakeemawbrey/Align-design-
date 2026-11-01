#!/bin/bash
# workers.sh [first_slot] [count] — runs count workers (default 3) in parallel on the shared queue and waits for all
first=${1:-1}; n=${2:-3}
for s in $(seq $first $((first + n - 1))); do /tmp/claude-0/worker.sh $s & done; wait
