# Rules for implementer agents (parallel round)

- Read promo/BRIEF.md first. Assets: promo/assets/MANIFEST.md (use `A + 'file.png'` from common.js; paths are relative to promo/index.html).
- You OWN only the scene files named in your task. Do NOT edit main.js, lib.js, common.js, cues.js, other scenes, or anything outside promo/src/scenes/<yours>. If you need a shared change, implement it locally inside your file and mention it in your report.
- Several agents work at once: ALWAYS render with your own `--dir` (e.g. `node promo/scripts/render.mjs --sheet --rate=6 --from=X --to=Y --dir=/tmp/claude-0/impl-<name>/a` from the repo root, or `--stills=...`). Never render the full video.
- Verify visually: render contact sheets of your time range at 6–10 fps and full-res stills of key frames, look at them (Read tool), and iterate until it's genuinely good — not just "changed". Check the frames at your scene's start/end boundaries for pops.
- Keep each frame a pure function of t (no Date/Math.random; use rng/noise from lib.js).
- Isolated card PNGs include their own glow/drop shadow (semi-transparent). On the light paper background that haze can look dirty — consider a soft dark backing shadow or keep them on darker grounds; judge by eye.
- Brand: docs/BRAND-QA.md. Bone #efe6d6 not white for text on dark; indigo not black; gold only for card finishes/accents; EB Garamond italic display, Inter body, Space Mono uppercase eyebrows.
- Don't commit. Final message: what you changed, any timing changes that affect sound cues (typing start/perChar, transition times, pops, card deals, impacts), and anything you couldn't do.
