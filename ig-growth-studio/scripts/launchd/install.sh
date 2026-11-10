#!/bin/zsh
# Starts the web app and the publishing worker at login and restarts them if they stop.
#   scripts/launchd/install.sh     install or update (stops copies started by hand first)
#   scripts/launchd/uninstall.sh   remove
# Logs: ~/Library/Logs/ig-growth-studio/. The web app serves the last `npm run build`.
set -euo pipefail
APP_DIR="$(cd "$(dirname "$0")/../.." && pwd)"
NPM="$(command -v npm)"
NODE_DIR="$(dirname "$(command -v node)")"
LOG_DIR="$HOME/Library/Logs/ig-growth-studio"
AGENTS="$HOME/Library/LaunchAgents"
DOMAIN="gui/$(id -u)"
mkdir -p "$LOG_DIR" "$AGENTS"

plist() { # label, npm script
  cat > "$AGENTS/$1.plist" <<PLIST
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key><string>$1</string>
  <key>ProgramArguments</key><array><string>$NPM</string><string>run</string><string>$2</string></array>
  <key>WorkingDirectory</key><string>$APP_DIR</string>
  <key>EnvironmentVariables</key><dict><key>PATH</key><string>$NODE_DIR:/usr/bin:/bin:/usr/sbin:/sbin</string></dict>
  <key>RunAtLoad</key><true/>
  <key>KeepAlive</key><true/>
  <key>ThrottleInterval</key><integer>15</integer>
  <key>StandardOutPath</key><string>$LOG_DIR/$2.log</string>
  <key>StandardErrorPath</key><string>$LOG_DIR/$2.log</string>
</dict>
</plist>
PLIST
}

for job in worker start; do
  label="com.igstudio.$job"
  launchctl bootout "$DOMAIN/$label" 2>/dev/null || true
done
# Copies started by hand would publish alongside the new worker or hold the web port.
pkill -f "$APP_DIR/node_modules/.bin/tsx scripts/worker.ts" 2>/dev/null || true
pkill -f "tsx scripts/worker.ts" 2>/dev/null || true
pkill -f "next-server" 2>/dev/null || true
pkill -f "next start" 2>/dev/null || true
sleep 2

for job in worker start; do
  label="com.igstudio.$job"
  plist "$label" "$job"
  launchctl bootstrap "$DOMAIN" "$AGENTS/$label.plist"
done
echo "Installed. Logs in $LOG_DIR"
