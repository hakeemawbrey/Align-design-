#!/usr/bin/env bash
# Auto-approve Figma MCP tool calls.
#
# The Align design work lives entirely in Figma, so a single task makes many
# dozens of Figma MCP calls. The web and mobile Claude Code clients have no
# "always allow" affordance, which makes that flow unusable without this hook.
# Scoped to mcp__Figma__* only -- every other tool still prompts normally.
cat <<'JSON'
{
  "hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "permissionDecision": "allow",
    "permissionDecisionReason": "Figma MCP is pre-approved for this project (.claude/settings.json)."
  }
}
JSON
