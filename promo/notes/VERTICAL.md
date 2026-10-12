# Vertical (9:16) cut — rules for layout agents

- The same composition renders vertically with `?v` (1080×1920). `common.js` exports `VERT` (boolean), and `W`/`H` follow the format.
- Render vertical stills/sheets with `--vertical`, e.g. `node promo/scripts/render.mjs --vertical --sheet --rate=6 --from=X --to=Y --dir=/tmp/claude-0/v-<name>/a` (FRESH dir every time). Timeline: real 0–31.5 (S4–S8 authored times + 1.5 after 9.5, see src/timing.js).
- **Never change the 16:9 output.** Branch on `VERT` (e.g. `const L = VERT ? {...tall layout...} : {...existing...}`), keep every horizontal number as-is. Before reporting, render a few 16:9 stills of your scenes and confirm they are pixel-identical to before your change (compare md5 of stills rendered from `git stash`-free baseline: render baseline stills FIRST before editing, then again after).
- Vertical design rules: phone-first. Safe area: keep text and key UI inside x 60–1020, y 220–1640 (TikTok/Reels overlays cover the top ~200px and bottom ~280px plus right ~140px — keep important content left of x ≈ 940 in the bottom third). Headlines can be bigger relative to width (≈ 76–96px for one-liners, wrap to 2 lines if needed rather than shrinking below ~64px). Cards/phones should be large (phone ≈ 1200–1350px tall). Backgrounds must fill the full 1080×1920 (no letterboxing, no visible edges). Re-compose rather than just shrink: stack elements vertically (e.g. word above / card / word below).
- Keep all timings identical to the 16:9 cut so sound stays in sync.
- Only edit the files you own.
