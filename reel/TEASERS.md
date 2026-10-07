# Launch teasers — brief (read BRIEF.md first: same engine, same look)

The hero reel (`index.html`, 31 s) is the brand film. These three teasers are short, single-idea
videos built for the launch rollout. Same visual language: halftone galaxy on bg, crisp flat-print
geometry and type on fg, film grain, EB Garamond + Space Mono, Stardust palette, ALIGN many times.
New: **love** (the rub pink #e8628a, the heart chakra, union geometry) and **per-sign identity**.

Each teaser has its own page, timeline and scene folder:

| teaser | page | timeline | scenes | audio |
| --- | --- | --- | --- | --- |
| 1. Calling all <SIGN> (×12) | `sign.html?sign=leo` | `timelines/sign.js` (15 s, 120 bpm) | `scenes/sign/` | `out/audio/sign-<id>.wav` |
| 2. Two skies (love) | `love.html?a=taurus&b=scorpio` | `timelines/love.js` (20 s, 90 bpm) | `scenes/love/` | `out/audio/love.wav` |
| 3. Countdown + founders | `launch.html` (`?date=NOV%2011` optional) | `timelines/launch.js` (15 s, 120 bpm) | `scenes/launch/` | `out/audio/launch.wav` |

Scenes read their slot from `ALIGN.TL.<slot>` (start, duration) and parameters from `ALIGN.TL`
(`sign`, `a`, `b`, `date`). `ALIGN.param(key, default)` reads the URL.

Render: `node tools/export.mjs --page sign.html --query sign=leo --stills 1,4,9 --prefix leo-` (stills go to
`out/stills/leo-t1.00.png`), or `--out out/teasers/sign-leo.mp4` for a clip.

Sign data you can use: `ALIGN.zodiac.SIGNS[i]` (`id, name, element, symbol, dates, color`) and the app's
aura names (Aries Ember, Taurus Honey, Gemini Signal, Cancer Tide, Leo Goldleaf, Virgo Rose Quartz,
Libra Orchid, Scorpio Garnet, Sagittarius Amethyst, Capricorn Jade, Aquarius Ion, Pisces Dusk).
Chakra links: `ALIGN.chakra.INFO[i].signs`.

App language to echo (it's the product): you **align** (swipe right) or **release** a card; a match is
"**You both aligned.**"; the paywall is Align+; early users are **founding members** (gold foil card, №).

Rules: original copy only; never invent a launch date, prices or stats; keep critical content inside
the central ~900×1500 (Instagram UI covers the top and bottom ~200 px); hold the final card ≥1.5 s.
