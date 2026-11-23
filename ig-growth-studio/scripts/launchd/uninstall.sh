#!/bin/zsh
# Stops the web app and worker and removes their login items.
set -u
for job in worker start; do
  label="com.igstudio.$job"
  launchctl bootout "gui/$(id -u)/$label" 2>/dev/null || true
  rm -f "$HOME/Library/LaunchAgents/$label.plist"
done
echo "Removed. Start them by hand with npm start and npm run worker."
