#!/bin/bash
# Render every Align affirmation reel in reels/affirm/batch on a Mac.
# Paste this into Terminal:
#   bash -c "$(curl -fsSL https://raw.githubusercontent.com/hakeemawbrey/align-design-/HEAD/reels/affirm/mac/render-batch.sh)"
# It installs what's needed, then renders into ~/Desktop/Align Reels.
# Safe to stop and run again: finished reels are skipped.
set -e
REPO="https://github.com/hakeemawbrey/align-design-.git"
DIR="$HOME/Align-design-"
OUT="$HOME/Desktop/Align Reels"

say() { printf "\n\033[1;35m%s\033[0m\n" "$*"; }

if ! command -v brew >/dev/null 2>&1 && [ ! -x /opt/homebrew/bin/brew ] && [ ! -x /usr/local/bin/brew ]; then
  say "Installing Homebrew (Mac's installer). It will ask for your Mac password; nothing shows as you type, that's normal."
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
fi
eval "$(/opt/homebrew/bin/brew shellenv 2>/dev/null || /usr/local/bin/brew shellenv)"

say "Installing Node, ffmpeg and Python (a few minutes the first time)"
for f in git node ffmpeg python@3.12; do brew list "$f" >/dev/null 2>&1 || brew install "$f"; done
export PATH="$(brew --prefix python@3.12)/libexec/bin:$PATH"

if [ -d "$DIR/.git" ]; then
  say "Updating the Align project"
  git -C "$DIR" pull --ff-only --autostash -q || true
else
  say "Downloading the Align project to $DIR"
  git clone -q "$REPO" "$DIR"
fi

say "Installing the renderer and its browser"
cd "$DIR/carousel" && npm install --no-audit --no-fund --silent && npx playwright install chromium

say "Fetching the voice model (about 120 MB, once)"
"$DIR/reels/affirm/setup.sh"

CORES=$(sysctl -n hw.ncpu)
JOBS=$(( CORES / 2 )); [ "$JOBS" -lt 1 ] && JOBS=1
TOTAL=$(ls "$DIR/reels/affirm/batch/"*.json | wc -l | tr -d ' ')
mkdir -p "$OUT"
cp "$DIR/reels/affirm/batch/manifest.csv" "$OUT/manifest.csv"
say "Rendering $TOTAL reels into $OUT, $JOBS at a time. Leave it running (overnight is fine)."
cd "$DIR"
caffeinate -i node reels/affirm/render.mjs --dir reels/affirm/batch --out "$OUT" --jobs "$JOBS" --lean --skip-existing
say "Done: $(ls "$OUT"/*.mp4 2>/dev/null | wc -l | tr -d ' ') reels in $OUT"
open "$OUT"
