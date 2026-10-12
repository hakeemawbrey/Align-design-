# Align teaser series — brief for teaser agents

Ten short VERTICAL teasers (1080×1920, 30fps, ~8–14s each incl. a ~2.4s shared end tag) for TikTok / Reels / Shorts / Stories.
Goal: build Align's brand look, feel and above all VIBE — mystical, cinematic, a little romantic, confident, never cheesy.
Each teaser = ONE feature or ONE message, landing in the first 1s (muted autoplay), readable at phone size, ending on the shared end tag.

## Brand (must match the main film — watch promo/out/align-promo-vertical-share.mp4)
- World: deep space. Indigo surfaces (#0b0620 void, #140a2e canvas), never flat black; nebula gradients (kit `spaceBackdrop(root, mood)` moods: rose, teal, amber, aurora), heavy-ish film grain, twinkling pixel-art stars (`starField`, `pixelStar`), the moon (`drawMoon`, `drawMoonGlyph`), the Align chakra column (`CHAKRAS`).
- Type: EB Garamond italic for statements (bone #efe6d6, 80–110px), Space Mono uppercase eyebrows (26–32px, wide tracking), Inter only for UI. Plain, short, warm voice. No hype, no exclamation marks. Gold only as card finish/accent glints.
- Story pillars: blind by design (mystery cards: faces hidden behind your sign's aura until both align) · the stars giving you a chance / put your faith in the stars · astrology that's actually personal (sun/moon/rising/venus) · cards you collect and play (deck every night, talk cards, packs) · Houston local, founding members.
- Real app assets: promo/assets/ (see MANIFEST.md) — screens (1170×2532), cards (card-profile-1..6 veiled, card-reveal Juniper, card-back, card-event, card-talk-1..6 + daily, card-sign / -stamped / -back Taurus, card-founding № 0112), align-mark. People aura portraits: app/public/img/people/p1..p12.jpg, juniper.jpg, hakeem.jpg; aura veils app/public/img/aura/<sign>.jpg; figures app/public/img/figure/<sign>.jpg. Names/signs: app/src/data/profiles.ts. Readings copy ideas: app/src/data/*, app/src/components/onboarding/readings.ts.
- Reusable effects you may borrow from the main film code (promo/src/scenes/*.js): aura-cam print sweep + veil lift (s3-veil.js), chakra stars aligning + lock (s3), pixel-star wipe (s1 fxStairWipe), constellation of portraits (s7), moon renderer (fx-moon.js). Copy what you need into your teaser file (don't edit the main film files).

## Contract (see teasers/kit.js, teasers/t10-faith.js template, teasers/index.js)
- File: promo/teasers/t<id>.js, default export `{ id, title, duration, endTagAt, music, cues, build(stage) → { update(t), fx?(ctx,t) } }`.
- Every frame a pure function of t (rng/noise from kit; Math.round(t*30) for frame indices).
- End tag: `endTag(stage, { start: endTagAt, end: duration, line })` — use the default line ("PUT YOUR FAITH / IN THE STARS") unless your teaser has a better sign-off (keep ≤ 2 short lines, uppercase mono).
- Safe area (`SAFE`): text/UI inside x 60–1020, y 220–1640; keep the bottom third's right edge (x > 940) clear.
- Sound: `music.chords` [[t0,t1,[hz…]]] pad (+ optional bpm pulse), `cues` [[kind, t, …]] with kinds tick/whoosh/bell/boom/glitter/riser (see scripts/synth.mjs). Sync cues to your motion. Build: `node promo/scripts/teaser-sound.mjs --teaser=<id>`.
- Render: `node promo/scripts/render.mjs --teaser=<id>` → promo/out/teasers/<id>.mp4 (+ -share.mp4). Stills/sheets: `--teaser=<id> --stills=1,2 --dir=/tmp/claude-0/tz-<id>/a` or `--sheet --rate=6 --dir=…` (FRESH dir each time). Preview in a browser: promo/teaser.html?t=<id>.
- Quality bar: render a 6–10 fps contact sheet + key stills + a 400px-wide downscale, look at them, iterate until it's genuinely beautiful and on-brand. Then render the final mp4 with sound.
- Only edit your own teaser files. Don't commit.
