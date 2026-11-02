#!/bin/bash
# Align Inspo: one click. Updates everything, opens the review page, and
# downloads every post in the background (picking up where it left off).
#   run.sh         download + review
#   run.sh send    send your picks to GitHub so Claude can use them
eval "$(/opt/homebrew/bin/brew shellenv 2>/dev/null || /usr/local/bin/brew shellenv 2>/dev/null)"
cd "$(dirname "$0")/.." || exit 1
INSPO="$PWD"
REPO_DIR="$(cd .. && pwd)"
PREFS="$HOME/.align-inspo"
PORT=4545
export GIT_TERMINAL_PROMPT=0   # never sit waiting on a GitHub password prompt

say()  { printf "\n\033[1;35m%s\033[0m\n" "$*"; }
note() { printf "\033[2m%s\033[0m\n" "$*"; }
pause_close() { printf "\nPress Enter to close this window."; read -r _; }

# ---------- Send picks ----------
if [ "$1" = "send" ]; then
  say "Sending your picks to GitHub"
  cd "$REPO_DIR" || exit 1
  (cd inspo && node src/brief.mjs >/dev/null)   # refresh the brief and GENERATOR.md
  if git diff --quiet -- inspo/data/decisions.json inspo/out; then
    note "No new picks since last time."
  else
    if ! gh auth status >/dev/null 2>&1; then
      command -v gh >/dev/null || brew install gh
      say "One-time GitHub sign-in. Pick 'GitHub.com', 'HTTPS', 'Yes', then 'Login with a web browser'."
      gh auth login --hostname github.com --git-protocol https --web && gh auth setup-git
    fi
    n=$(node -e "const d=require('./inspo/data/decisions.json');const v=Object.values(d);console.log(v.filter(x=>x.status==='accepted').length+' use it, '+v.filter(x=>x.status==='maybe').length+' maybe, '+v.filter(x=>x.status==='rejected').length+' skipped')")
    git add inspo/data/decisions.json inspo/out founder/data/imports 2>/dev/null
    git -c user.name="${USER}" -c user.email="${USER}@users.noreply.github.com" commit -q -m "Inspo picks: $n"
    if git pull --rebase -q && git push -q; then
      say "Sent ($n). Tell Claude: build the generator from my inspo."
    else
      say "Couldn't send. Check your internet and double-click Send Picks again."
    fi
  fi
  pause_close; exit 0
fi

say "Align Inspo"
git -C "$REPO_DIR" pull --ff-only --autostash -q 2>/dev/null && note "Up to date." || note "Couldn't check for updates; carrying on."
note "Updating the downloaders (Instagram changes often)..."
brew upgrade yt-dlp gallery-dl >/dev/null 2>&1 || true

# ---------- Which browser has your Instagram login ----------
BROWSER="$(cat "$PREFS/browser" 2>/dev/null)"
if [ -z "$BROWSER" ]; then
  for pair in "chrome:Google Chrome" "brave:Brave Browser" "edge:Microsoft Edge" "firefox:Firefox"; do
    if [ -d "/Applications/${pair#*:}.app" ]; then BROWSER="${pair%%:*}"; break; fi
  done
  [ -z "$BROWSER" ] && BROWSER="safari"
fi
app_for() { case "$1" in chrome) echo "Google Chrome";; brave) echo "Brave Browser";; edge) echo "Microsoft Edge";; firefox) echo "Firefox";; *) echo "Safari";; esac; }

TEST_URL="$(node -e "console.log(require('./data/inspo.json').items.find(i=>i.type==='Reel').url)")"
check_login() { yt-dlp --cookies-from-browser "$BROWSER" --simulate --quiet --no-warnings "$TEST_URL" >/dev/null 2>&1; }
if [ ! -f "$PREFS/browser" ]; then
  say "Checking you're logged into Instagram in $(app_for "$BROWSER")"
  [ "$BROWSER" != safari ] && [ "$BROWSER" != firefox ] && note "If your Mac asks for your password to let Terminal use \"$(app_for "$BROWSER") Safe Storage\", type it and press Always Allow."
  until check_login; do
    say "Log into Instagram in $(app_for "$BROWSER"), then come back here and press Enter."
    [ "$BROWSER" = "safari" ] && note "Safari also needs: System Settings > Privacy & Security > Full Disk Access > turn on Terminal."
    open -a "$(app_for "$BROWSER")" "https://www.instagram.com/accounts/login/"
    read -r _
  done
  mkdir -p "$PREFS" && echo "$BROWSER" > "$PREFS/browser"
  note "Logged in. (Using $(app_for "$BROWSER") from now on.)"
fi

# ---------- Review page ----------
if curl --noproxy "*" -s -m 2 -o /dev/null "http://localhost:$PORT/api/state"; then
  note "The review page is already running."
else
  node src/review-server.mjs > "$PREFS/review.log" 2>&1 &
  SERVER=$!
  trap 'kill $SERVER 2>/dev/null' EXIT
  sleep 1
fi
open "http://localhost:$PORT"
say "Review page: http://localhost:$PORT  (start reviewing now; new downloads appear as they land)"

# ---------- Download everything ----------
say "Downloading. Leave this window open and your Mac plugged in. It's safe to close it and double-click again later."
waits=0
retried=0
while true; do
  args=(--via ytdlp --cookies-from-browser "$BROWSER" --sleep 3)
  [ $retried -eq 1 ] && args+=(--retry-failed)
  [ -n "$INSPO_EXTRA" ] && args+=($INSPO_EXTRA)   # for testing
  caffeinate -i node src/download.mjs "${args[@]}"
  code=$?
  if [ $code -eq 75 ] && [ $waits -lt 24 ]; then
    waits=$((waits + 1))
    say "Instagram wants a break. Waiting 30 minutes, then carrying on automatically (round $waits)."
    caffeinate -i sleep 1800
    continue
  fi
  if [ $code -eq 0 ] && [ $retried -eq 0 ] && [ "$(node --input-type=module -e "import { MEDIA } from './src/items.mjs'; import fs from 'node:fs'; try { console.log(Object.keys(JSON.parse(fs.readFileSync(MEDIA + '/_failed.json'))).length) } catch { console.log(0) }")" != "0" ]; then
    retried=1
    say "Trying the ones that failed once more."
    continue
  fi
  break
done

read -r have failed total < <(node --input-type=module -e "import { mediaIndex, MEDIA, loadItems } from './src/items.mjs'; import fs from 'node:fs'; let f = 0; try { f = Object.keys(JSON.parse(fs.readFileSync(MEDIA + '/_failed.json'))).length } catch {}; console.log(Object.keys(mediaIndex()).length, f, loadItems().length)")
say "Downloads finished: $have of $total on your Mac. $failed couldn't be downloaded (deleted or private posts); they play from Instagram in the review page."
note "Videos are in ${INSPO_MEDIA_DIR:-$INSPO/media}"
if [ -n "$SERVER" ]; then
  say "The review page stays on while this window is open. When you're done for the day, double-click \"Send Picks to Claude\", then close this window."
  wait $SERVER
else
  pause_close
fi
