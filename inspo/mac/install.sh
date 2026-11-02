#!/bin/bash
# One-time setup for Align Inspo on a Mac. Paste this into Terminal:
#   bash -c "$(curl -fsSL https://raw.githubusercontent.com/hakeemawbrey/align-design-/HEAD/inspo/mac/install.sh)"
# It installs what's needed, puts two buttons on your Desktop, and starts.
set -e
REPO="https://github.com/hakeemawbrey/align-design-.git"
DIR="$HOME/Align-design-"

say() { printf "\n\033[1;35m%s\033[0m\n" "$*"; }

say "Setting up Align Inspo"

if ! command -v brew >/dev/null 2>&1 && [ ! -x /opt/homebrew/bin/brew ] && [ ! -x /usr/local/bin/brew ]; then
  say "Installing Homebrew (Mac's installer). It will ask for your Mac password; nothing shows as you type, that's normal."
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
fi
eval "$(/opt/homebrew/bin/brew shellenv 2>/dev/null || /usr/local/bin/brew shellenv)"

say "Installing Node, yt-dlp and gallery-dl (a few minutes the first time)"
for f in git node yt-dlp gallery-dl; do brew list "$f" >/dev/null 2>&1 || brew install "$f"; done

if [ -d "$DIR/.git" ]; then
  say "Updating the Align project in $DIR"
  git -C "$DIR" pull --ff-only --autostash -q || true
else
  say "Downloading the Align project to $DIR"
  git clone -q "$REPO" "$DIR"
fi
chmod +x "$DIR/inspo/mac/"*.sh

make_button() {  # name, command
  local f="$HOME/Desktop/$1.command"
  printf '#!/bin/bash\nexec "%s" %s\n' "$DIR/inspo/mac/run.sh" "$2" > "$f"
  chmod +x "$f"
}
make_button "Align Inspo" ""
make_button "Send Picks to Claude" "send"
say "Added two buttons to your Desktop: \"Align Inspo\" and \"Send Picks to Claude\". Double-click them from now on."

exec "$DIR/inspo/mac/run.sh"
