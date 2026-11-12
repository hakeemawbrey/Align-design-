#!/bin/bash
# Align Study: one click. Asks which Instagram page, downloads every post with
# your logged-in browser, works out what's in each one on this Mac (what's said,
# what's on screen, stills), and packs it up for Claude.
#   run.sh [handle]         study a page (asks which, remembers the last one)
#   run.sh facebook [link]  study a Facebook page's reels and videos
#   run.sh youtube [link]   study a YouTube channel's Shorts and videos
#   run.sh send [handle]    send the pack to your own private GitHub repo so Claude can read it
eval "$(/opt/homebrew/bin/brew shellenv 2>/dev/null || /usr/local/bin/brew shellenv 2>/dev/null)"
cd "$(dirname "$0")/.." || exit 1
STUDY="$PWD"
REPO_DIR="$(cd .. && pwd)"
PREFS="$HOME/.align-study"
DATA_REPO="${ALIGN_STUDY_REPO:-align-study}"     # your private repo for packs
DATA_DIR="$HOME/Align-study-data"
export GIT_TERMINAL_PROMPT=0   # never sit waiting on a GitHub password prompt
mkdir -p "$PREFS"

say()  { printf "\n\033[1;35m%s\033[0m\n" "$*"; }
note() { printf "\033[2m%s\033[0m\n" "$*"; }
pause_close() { printf "\nPress Enter to close this window."; read -r _; }

ask_handle() {
  local last given="$1"
  last="$(cat "$PREFS/handle" 2>/dev/null)"; last="${last:-tylerinthemaking}"
  if [ -z "$given" ]; then
    printf "\n\033[1mWhich page?\033[0m Paste an Instagram, Facebook or YouTube link, or type the handle (just press Enter for @%s): " "$last"
    read -r given
    given="${given:-$last}"
  fi
  # Facebook: the page's name comes from opening the link, so it's worked out in step 1.
  case "$given" in
    *facebook.com*|*fb.com*|*fb.me*|fb-*) FACEBOOK="$given"; HANDLE="$given"; return ;;
    *youtube.com*|yt-*) YOUTUBE="$given"; HANDLE="$given"; return ;;
  esac
  HANDLE="$(node --input-type=module -e "import { handleOf } from './src/paths.mjs'; console.log(handleOf(process.argv[1]) ?? '')" "$given")"
  if [ -z "$HANDLE" ]; then say "\"$given\" doesn't look like an Instagram page. Try the handle, like tylerinthemaking."; pause_close; exit 1; fi
  echo "$HANDLE" > "$PREFS/handle"
}

github_login() {
  if ! gh auth status >/dev/null 2>&1; then
    command -v gh >/dev/null || brew install gh
    say "One-time GitHub sign-in. Pick 'GitHub.com', 'HTTPS', 'Yes', then 'Login with a web browser'."
    gh auth login --hostname github.com --git-protocol https --web
  fi
  gh auth setup-git >/dev/null 2>&1   # so git can reach your private repo too
}

# ---------- Send the pack to your private repo ----------
if [ "$1" = "send" ]; then
  ask_handle "$2"
  PACK="$STUDY/pack/$HANDLE"
  if [ ! -f "$PACK/posts.json" ]; then say "Nothing packed for @$HANDLE yet. Double-click \"Study Instagram Page\" first."; pause_close; exit 1; fi
  github_login
  LOGIN="$(gh api user -q .login)" || { say "Couldn't reach GitHub. Check your internet and try again."; pause_close; exit 1; }
  if ! gh repo view "$LOGIN/$DATA_REPO" >/dev/null 2>&1; then
    say "Making a private GitHub repo for study packs: $LOGIN/$DATA_REPO (only you can see it)"
    gh repo create "$DATA_REPO" --private --description "Align study packs: private reference for analysis, never for reposting" >/dev/null || { say "Couldn't make the repo."; pause_close; exit 1; }
  fi
  # The pack is someone else's posts: it only ever goes to a private repo.
  if [ "$(gh repo view "$LOGIN/$DATA_REPO" --json visibility -q .visibility)" != "PRIVATE" ]; then
    say "github.com/$LOGIN/$DATA_REPO isn't private, so nothing was sent. Make it private (repo Settings > Danger Zone > Change visibility) and try again."
    pause_close; exit 1
  fi
  [ -d "$DATA_DIR/.git" ] || git clone -q "https://github.com/$LOGIN/$DATA_REPO.git" "$DATA_DIR" 2>/dev/null || { say "Couldn't download $LOGIN/$DATA_REPO."; pause_close; exit 1; }
  cd "$DATA_DIR" || exit 1
  if git ls-remote --exit-code origin main >/dev/null 2>&1 && ! git pull --rebase -q origin main; then
    git rebase --abort >/dev/null 2>&1
    say "Your private repo has changes this Mac doesn't, and they clash. Delete the folder $DATA_DIR and double-click \"Send Study to Claude\" again."
    pause_close; exit 1
  fi
  mkdir -p "$HANDLE" && rsync -a --delete "$PACK/" "$HANDLE/"
  git add -A "$HANDLE"
  if git diff --cached --quiet; then
    note "Nothing new for @$HANDLE since last time."
  else
    n=$(node -e "console.log(require('./$HANDLE/posts.json').count)")
    git -c user.name="${USER}" -c user.email="${USER}@users.noreply.github.com" commit -q -m "@$HANDLE: $n posts"
    git branch -M main
    if git push -q -u origin main; then
      say "Sent @$HANDLE ($n posts) to github.com/$LOGIN/$DATA_REPO (private)."
      say "Now tell Claude:  Study @$HANDLE from $LOGIN/$DATA_REPO"
    else
      say "Couldn't send. Check your internet and double-click \"Send Study to Claude\" again."
    fi
  fi
  pause_close; exit 0
fi

# ---------- Study a page ----------
if [ "$1" = "facebook" ]; then
  given="$2"
  if [ -z "$given" ]; then
    printf "\n\033[1mWhich Facebook page?\033[0m Paste its link (a share link is fine): "
    read -r given
  fi
  case "$given" in *facebook.com*|*fb.com*|*fb.me*|fb-*) ;; *) say "\"$given\" doesn't look like a Facebook link."; pause_close; exit 1 ;; esac
  ask_handle "$given"
elif [ "$1" = "youtube" ]; then
  given="$2"
  if [ -z "$given" ]; then
    printf "\n\033[1mWhich YouTube channel?\033[0m Paste its link, like youtube.com/@greenbrorants: "
    read -r given
  fi
  case "$given" in @*) given="https://www.youtube.com/$given" ;; esac
  case "$given" in *youtube.com*|yt-*) ;; *) say "\"$given\" doesn't look like a YouTube channel link."; pause_close; exit 1 ;; esac
  ask_handle "$given"
else
  ask_handle "$1"
fi
say "Align Study: @$HANDLE"
caffeinate -i -w $$ &   # keep the Mac awake until this window closes
git -C "$REPO_DIR" pull --ff-only --autostash -q 2>/dev/null && note "Up to date." || note "Couldn't check for updates; carrying on."
note "Updating the downloaders (Instagram changes often)..."
brew upgrade gallery-dl yt-dlp >/dev/null 2>&1 || true
for f in ffmpeg whisper-cpp; do brew list "$f" >/dev/null 2>&1 || brew install "$f"; done

# ---------- Facebook: its own Chrome window collects the links, yt-dlp downloads ----------
if [ -n "$FACEBOOK" ]; then
  note "Getting the piece that drives the Chrome window (first time only)..."
  npm install --no-audit --no-fund --silent >/dev/null 2>&1 || { say "Couldn't install it. Check your internet and try again."; pause_close; exit 1; }
  say "1/3  Collecting and downloading the page's reels and videos"
  note "A Chrome window opens and scrolls the page by itself. The first time, log into Facebook in it; it remembers you after that."
  note "Leave this window open and your Mac plugged in; it's safe to close and double-click again later."
  waits=0; logins=0; rm -f "$PREFS/fb-handle"
  while true; do
    node src/facebook.mjs "$FACEBOOK" --handle-file "$PREFS/fb-handle" $STUDY_EXTRA; code=$?
    # Once the page is known (fb-<page>), later rounds and next time skip reopening the share link.
    if [ -s "$PREFS/fb-handle" ]; then HANDLE="$(cat "$PREFS/fb-handle")"; FACEBOOK="$HANDLE"; echo "$HANDLE" > "$PREFS/handle"; fi
    case $code in
      0) break ;;
      75) [ $waits -ge 24 ] && break
          waits=$((waits + 1)); say "Facebook wants a break. Waiting 30 minutes, then carrying on by itself (round $waits). Progress is kept."; sleep 1800 ;;
      77) [ $logins -ge 3 ] && { say "Still not logged in. Double-click again when you're ready."; pause_close; exit 1; }
          logins=$((logins + 1)); say "Trying again: log into Facebook in the Chrome window when it opens." ;;
      *)  [ -d "$STUDY/media/$HANDLE" ] && ls "$STUDY/media/$HANDLE"/*.json >/dev/null 2>&1 && { note "Stopped early; carrying on with what downloaded."; break; }
          say "Couldn't study that page (see the message above)."; pause_close; exit 1 ;;
    esac
  done
  say "2/3  Working out what's in each video on this Mac: what's said, what's on screen, stills"
  node src/process.mjs "$HANDLE" || { say "Something went wrong working through the videos (see above)."; pause_close; exit 1; }
  say "3/3  Packing it up"
  node src/report.mjs "$HANDLE" || { pause_close; exit 1; }
  open "$STUDY/pack/$HANDLE"
  note "The numbers are in report.md in the folder that just opened."
  printf "\n\033[1mSend it to Claude now?\033[0m It goes to a private repo on your GitHub that only you can see. [Y/n] "
  read -r yn
  case "$yn" in n|N|no|No) say "Not sent. Double-click \"Send Study to Claude\" whenever you're ready."; pause_close ;; *) exec "$STUDY/mac/run.sh" send "$HANDLE" ;; esac
  exit 0
fi

# Which browser has your Instagram login (shared with Align Inspo if you've used it).
BROWSER="$(cat "$PREFS/browser" 2>/dev/null || cat "$HOME/.align-inspo/browser" 2>/dev/null)"
if [ -z "$BROWSER" ]; then
  for pair in "chrome:Google Chrome" "brave:Brave Browser" "edge:Microsoft Edge" "firefox:Firefox"; do
    if [ -d "/Applications/${pair#*:}.app" ]; then BROWSER="${pair%%:*}"; break; fi
  done
  [ -z "$BROWSER" ] && BROWSER="safari"
fi
app_for() { case "$1" in chrome) echo "Google Chrome";; brave) echo "Brave Browser";; edge) echo "Microsoft Edge";; firefox) echo "Firefox";; *) echo "Safari";; esac; }

# ---------- YouTube: yt-dlp lists the channel and downloads, signed in through your browser ----------
if [ -n "$YOUTUBE" ]; then
  say "1/3  Listing and downloading the channel's Shorts and videos, with YouTube's captions"
  note "It uses your YouTube login in $(app_for "$BROWSER"), so be signed into YouTube there."
  [ "$BROWSER" != safari ] && [ "$BROWSER" != firefox ] && note "If your Mac asks for your password to let Terminal use \"$(app_for "$BROWSER") Safe Storage\", type it and press Always Allow."
  note "Leave this window open and your Mac plugged in; it's safe to close and double-click again later."
  waits=0; logins=0; rm -f "$PREFS/yt-handle"
  while true; do
    node src/youtube.mjs "$YOUTUBE" --cookies-from-browser "$BROWSER" --handle-file "$PREFS/yt-handle" $STUDY_EXTRA; code=$?
    if [ -s "$PREFS/yt-handle" ]; then HANDLE="$(cat "$PREFS/yt-handle")"; YOUTUBE="$HANDLE"; echo "$HANDLE" > "$PREFS/handle"; fi
    case $code in
      0) break ;;
      75) [ $waits -ge 24 ] && break
          waits=$((waits + 1)); say "YouTube wants a break. Waiting 30 minutes, then carrying on by itself (round $waits). Progress is kept."; sleep 1800 ;;
      77) [ $logins -ge 3 ] && { say "Still not signed in. Double-click again when you're ready."; pause_close; exit 1; }
          logins=$((logins + 1))
          say "Sign into YouTube in $(app_for "$BROWSER"), then come back here and press Enter."
          open -a "$(app_for "$BROWSER")" "https://www.youtube.com/"
          read -r _ ;;
      *)  [ -d "$STUDY/media/$HANDLE" ] && ls "$STUDY/media/$HANDLE"/*.json >/dev/null 2>&1 && { note "Stopped early; carrying on with what downloaded."; break; }
          say "Couldn't study that channel (see the message above)."; pause_close; exit 1 ;;
    esac
  done
  say "2/3  Working out what's in each video on this Mac: what's said (YouTube's captions, or whisper), what's on screen, stills"
  node src/process.mjs "$HANDLE" || { say "Something went wrong working through the videos (see above)."; pause_close; exit 1; }
  say "3/3  Packing it up"
  node src/report.mjs "$HANDLE" || { pause_close; exit 1; }
  open "$STUDY/pack/$HANDLE"
  note "The numbers are in report.md in the folder that just opened."
  printf "\n\033[1mSend it to Claude now?\033[0m It goes to a private repo on your GitHub that only you can see. [Y/n] "
  read -r yn
  case "$yn" in n|N|no|No) say "Not sent. Double-click \"Send Study to Claude\" whenever you're ready."; pause_close ;; *) exec "$STUDY/mac/run.sh" send "$HANDLE" ;; esac
  exit 0
fi

login_until_ok() {
  say "Checking you're logged into Instagram in $(app_for "$BROWSER")"
  [ "$BROWSER" != safari ] && [ "$BROWSER" != firefox ] && note "If your Mac asks for your password to let Terminal use \"$(app_for "$BROWSER") Safe Storage\", type it and press Always Allow."
  local waits=0
  while true; do
    node src/download.mjs "$HANDLE" --check --cookies-from-browser "$BROWSER"
    case $? in
      0) break ;;
      75) [ $waits -ge 6 ] && { say "Instagram is still saying slow down. Try again in a few hours."; pause_close; exit 1; }
          waits=$((waits + 1)); say "Instagram wants a break. Waiting 30 minutes, then trying again."; sleep 1800 ;;
      77) say "Log into Instagram in $(app_for "$BROWSER"), then come back here and press Enter."
          [ "$BROWSER" = "safari" ] && note "Safari also needs: System Settings > Privacy & Security > Full Disk Access > turn on Terminal."
          open -a "$(app_for "$BROWSER")" "https://www.instagram.com/accounts/login/"
          read -r _ ;;
      *)  say "Couldn't read @$HANDLE (see the message above). Check the handle, or that the account isn't private."; pause_close; exit 1 ;;
    esac
  done
  echo "$BROWSER" > "$PREFS/browser"
  note "Logged in. (Using $(app_for "$BROWSER").)"
}
login_until_ok

# Run a step; when Instagram asks for a break (exit 75), wait 30 minutes and carry on.
patiently() {
  local waits=0 logins=0 code
  while true; do
    "$@"; code=$?
    if [ $code -eq 75 ] && [ $waits -lt 24 ]; then
      waits=$((waits + 1))
      say "Instagram wants a break. Waiting 30 minutes, then carrying on by itself (round $waits). Progress is kept."
      sleep 1800; continue
    fi
    if [ $code -eq 77 ] && [ $logins -lt 3 ]; then logins=$((logins + 1)); login_until_ok; continue; fi
    return $code
  done
}

say "1/4  Downloading every post. Leave this window open and your Mac plugged in; it's safe to close and double-click again later."
patiently node src/download.mjs "$HANDLE" --cookies-from-browser "$BROWSER" $STUDY_EXTRA || note "The download stopped early; carrying on with what's here."

if [ -z "$STUDY_SKIP_NUMBERS" ]; then
  say "2/4  Reading views and comments for each post (a few seconds apart, so Instagram stays happy)"
  patiently node src/numbers.mjs "$HANDLE" --cookies-from-browser "$BROWSER" || note "Some posts have no numbers; carrying on."
fi

say "3/4  Working out what's in each post on this Mac: what's said, what's on screen, stills"
node src/process.mjs "$HANDLE" || { say "Something went wrong working through the posts (see above)."; pause_close; exit 1; }

say "4/4  Packing it up"
node src/report.mjs "$HANDLE" || { pause_close; exit 1; }
open "$STUDY/pack/$HANDLE"
note "The numbers are in report.md in the folder that just opened."

printf "\n\033[1mSend it to Claude now?\033[0m It goes to a private repo on your GitHub that only you can see. [Y/n] "
read -r yn
case "$yn" in n|N|no|No) say "Not sent. Double-click \"Send Study to Claude\" whenever you're ready."; pause_close ;; *) exec "$STUDY/mac/run.sh" send "$HANDLE" ;; esac
