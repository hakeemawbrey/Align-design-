# Align feature films: series brief (30s, 16:9 1920×1080, 30fps)

User's ask: several 30s feature videos, each testing a different HOOK and FEATURE. Every one must make people FEEL
it: **people are lonelier than ever.** The first half shows the problem in a way that lands emotionally. The second half
shows how Align helps, through a real app feature, and why. These are emotional films, not ads that shout. Warm, plain, human voice.

| film | hook (problem) | feature (answer) | end line |
|---|---|---|---|
| promo/films/lonely | "We've never been more connected. Or more alone." 2am phone glow, matches with no conversations, "hey" left on read | **The Talk Deck**: talk in cards, real questions instead of small talk | "You deserve to be known." |
| promo/films/samesky | "Two people. Same city. Same moon. Never met." Houston at night, two lit windows, each alone | **Your chart + the sky**: Align reads your charts and finds who you're aligned with nearby ("You are not arriving alone", alignment reading) | "Look up. They might be, too." |
| promo/films/ghosted | "Seen. 3 days ago." Ghosting, people treated as disposable, endless swipe stacks | **Tonight's deck + dealbreakers first + mutual alignment**: a deck dealt with care, what matters said up front, both choose before faces | "Be chosen." |

## Same film world (all three)
Watch the finished films: promo/out/film2/align-flip-it-v4-share.mp4 (30s) and promo/out/film3/align-rigged-v2-share.mp4 (15s).
The film-1 latest is promo/out/align-promo-v11-share.mp4. The look:
- **Space:** grainy deep-space nebula, never flat black. Pixel-art stars and ONE moon, never two.
- **Type:** bone #efe6d6 type above the grain. EB Garamond italic for statements (≥ 96px hook lines, ≥ 72px others). Space Mono uppercase eyebrows (≥ 26px).
- **Colour:** chakra colours only for the column and aura. Gold only for glints.
- **Problem halves:** these can be colder or desaturated and more intimate, e.g. a dark room, phone light, a city at night. They're still grainy and cinematic, and they should turn into the Align sky at the turn.
- **Generic UI:** never mock a real dating app's name, logo or UI. Use generic UI.
- **Statistics:** no invented "studies" or "%" claims. Numbers may only appear as a character's own phone UI ("214 matches · 0 conversations").

Code you may COPY from (do not edit promo/src/**, promo/film2/**, promo/film3/**):
- **promo/film2/scenes/***
  - f1-old: cold face feed
  - f2-flip: flip, colour flood, star burst
  - f3-chart: mystery card, lock chip
  - f4-chance: dealt cards
  - f5-stars: chakra lock, moon renderer, rim glow, grain helper
  - f6-reveal: aura sweep, reveal, phone
  - f7-talk: phone, chat-cards screen, card fan, aurora
  - f8-end: typed end line, lockup, fade
- **promo/film3/scenes/***
  - g1: rigged UI, stamps
  - g2: glitch, shatter
  - g3: blind card, lock, reveal
  - g4: end line and dealt stars, lockup

Helpers you may import:
- **promo/films/sky.js:** drawSky(ctx, t, {zoom, dx, dy, dim, moon:{x,y,r,phase,alpha}}), drawGrain, grainOpacity, drawPixelStar, drawMoon, layerCanvas.
- **promo/src/lib.js**
- **promo/src/scenes/common.js:** W, H, SERIF/SANS/MONO, A = assets path, IMG = app/public/img/ path, PEOPLE.
- **Assets:** promo/assets/ (see MANIFEST.md for screens and cards), people photos IMG+'people/p1..p12.jpg', IMG+'juniper.jpg', IMG+'hakeem.jpg'.

## Structure & contract
- **Halves:** each film has two halves owned by two agents.
  - `scenes/a/` covers 0–15.2. Its `index.js` exports `SCENES` (array of async build(stage) fns) and `CUES`.
  - `scenes/b/` covers 14.8–30.0.
  - Each half may split into several files inside its own folder. Only edit your own folder.
- **Scene build:** `build(stage)` → `{ start, end, root, update(t), fx?(ctx,t), fadeIn?, fxStart?, fxEnd? }` (see promo/films/main.js). Later scenes stack above earlier ones; half b sits above half a.
- **Determinism:** pure function of t. Use rng from lib.js; frame index = Math.round(t*30).
- **Readability:** captions fully readable for ≥ 1.0s. No doubled text in dissolves. Grain consistent. No single-frame pops at handoffs.
- **Cues:** `[kind, t, ...]`, where kind is one of:
  - tick(t, gain)
  - whoosh(t, len, gain)
  - bell(t, hz, gain, decay, pan)
  - boom(t, gain)
  - glitter(t0, t1)
  - riser(t0, t1, gain)

  Score chords are in the film's cues.js (lead-owned).
- **Render:** always use a FRESH --dir, never a shared one.
  - `node promo/scripts/render.mjs --film=<name> --sheet --rate=6 --from=X --to=Y --dir=/tmp/claude-0/<name>-<half>/a`
  - `--stills=1.2,3`
  - Full film: `node promo/scripts/teaser-sound.mjs --film=<name> && node promo/scripts/render.mjs --film=<name>`. The lead does the full render.
- **Ending:** the end line types in by about 27.0, then the Align lockup (mark draws, chakras, wordmark "Align", "BLIND BY DESIGN") is complete by about 28.6, holds, and fades to black 29.6–30.0. The last frame is black.

| promo/films/disposable30 | "We made people disposable." over film 2's fast face feed → the last face FLIPS: "What if we flipped it?" | Film 2's edit: "Fall for the card. Face last." → push-in on her card, Push / Pull / Align rows light ("Push. Pull. Align.", p1-rows) → Marcus's card meets Juniper's, the stars align (f5 at 1.25×) → BOTH blind cards flip, "It's mutual." → the talk deck SHOWN as a thread (s-talk: The Fool / The Sun played and answered). 92 bpm under the hook, 132 bpm from the flip | "No one is disposable." |
