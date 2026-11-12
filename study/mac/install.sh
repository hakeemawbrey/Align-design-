#!/bin/bash
# One-time setup for Align Study on a Mac. Paste this into Terminal:
#   bash -c "$(curl -fsSL https://raw.githubusercontent.com/hakeemawbrey/align-design-/HEAD/study/mac/install.sh)"
# It installs what's needed, puts the buttons on your Desktop, and starts.
# Add `_ facebook "<link>"` or `_ youtube "<link>"` to start on a Facebook page or YouTube channel.
set -e
REPO="https://github.com/hakeemawbrey/align-design-.git"
DIR="$HOME/Align-design-"

say() { printf "\n\033[1;35m%s\033[0m\n" "$*"; }

say "Setting up Align Study"

if ! command -v brew >/dev/null 2>&1 && [ ! -x /opt/homebrew/bin/brew ] && [ ! -x /usr/local/bin/brew ]; then
  say "Installing Homebrew (Mac's installer). It will ask for your Mac password; nothing shows as you type, that's normal."
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
fi
eval "$(/opt/homebrew/bin/brew shellenv 2>/dev/null || /usr/local/bin/brew shellenv)"

say "Installing Node, gallery-dl, yt-dlp, ffmpeg, whisper.cpp and GitHub's tool (a few minutes the first time)"
for f in git node gallery-dl yt-dlp ffmpeg whisper-cpp gh; do brew list "$f" >/dev/null 2>&1 || brew install "$f"; done

if [ -d "$DIR/.git" ]; then
  say "Updating the Align project in $DIR"
  git -C "$DIR" pull --ff-only --autostash -q || true
else
  say "Downloading the Align project to $DIR"
  git clone -q "$REPO" "$DIR"
fi
chmod +x "$DIR/study/mac/"*.sh

make_button() {  # name, command
  local f="$HOME/Desktop/$1.command"
  printf '#!/bin/bash\nexec "%s" %s\n' "$DIR/study/mac/run.sh" "$2" > "$f"
  chmod +x "$f"
}
make_button "Study Instagram Page" ""
make_button "Study Facebook Page" "facebook"
make_button "Study YouTube Channel" "youtube"
make_button "Send Study to Claude" "send"
say "Added four buttons to your Desktop: \"Study Instagram Page\", \"Study Facebook Page\", \"Study YouTube Channel\" and \"Send Study to Claude\". Double-click them from now on."

exec "$DIR/study/mac/run.sh" "$@"
