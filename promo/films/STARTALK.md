# Star Talk: the stars give you relationship advice (vertical Align ads, 15/15/15/30/30 s)

The user asked: "a new concept but in this style about the stars giving you advice — stars that [are] pixelated with eyes, talking in [a] text box. Relationship zodiac advice. Astrology is us understanding and talking to the stars. Do 5 first."

**Premise:** astrology is us understanding and talking to the stars. In this series the stars talk back. Little pixel-art stars with expressive eyes give cheeky, warm relationship advice in a retro game-style text box.

## Look (same Align style plus the new characters)
- **The usual Align look:** the nebula sky (`drawSky` with SKY_H, grain), Inter 800 headlines with one EB Garamond italic accent, springy pop-ins, the card motif (promo/films/cardfx.js: `cardFrame` plus `cardCuts`, default selection), and the shared END CARD (promo/films/endcard.js: "come", then the seed-of-life logo, then "Align", with the default CTA "JOIN THE HOUSTON BETA").
- **The new characters are star sprites.** Pixel-art stars in the style of `drawPixelStar` from promo/films/sky.js, but big (about 160–360 px) and chunky, with a soft glow:
  - They have big expressive pixel eyes and nothing else: no mouth.
  - They blink, glance, squint, go wide-eyed, roll their eyes and make heart-eyes.
  - They bob, squash and stretch, and hop when they talk.
  - Each sign's star is tinted in its sign colour (`SIGNS` from wheel.js) and carries its glyph as a small badge. A plain bone/gold star is "the sky" narrator.
  - Shared module: **promo/films/startalk.js** (see below).
- **The text box is a retro RPG dialogue box.** It sits in the lower third: a dark glass panel with a pixel border in bone/gold and a name tag on top-left (e.g. "♏ SCORPIO STAR" or "THE STARS").
  - Text types on character by character, Space Mono or Inter at about 52–60 px.
  - A blinking ▼ "next" arrow shows when a line is done, and soft chiptune blips play per character.
  - Lines stay readable for at least 1.5 s after they finish typing.
  - Big Inter 800 headlines still frame each beat at the top.

## Tone and truth
- Playful, warm, a little sassy, never mean, never toxic, never manipulative.
- The advice must be healthy (talk, be honest, give space, don't snoop) and grounded in real astrology: rulerships, elements and Mercury/Venus retrograde basics. No invented statistics.
- Close the loop to Align with a real feature:
  - "Card first. Face last." (never "chart first")
  - Push / Pull / Align
  - talk cards
  - dealbreakers
  - tonight's deck
- Never say "Align" in the frames just before the end card.

## Shared module: promo/films/startalk.js (built first, by the starhello agent; the other films import it)
The exports:
- `drawStarChar(ctx, x, y, size, t, { color, glyph, mood, look, blink, bob, squash })` draws a pixel star character. `mood` is one of 'neutral', 'happy', 'wink', 'squint', 'wide', 'heart', 'eyeroll' or 'sleepy'. `look` is an [x, y] pupil offset. It also handles the blink schedule.
- `dialogueBox(stage, { lines: [{ t, speaker, text, color }], y, width })` returns a scene-ish helper with `update(t)` for typing, the name tag, the arrow and the open/close pop. It is DOM- or canvas-based, as you prefer.
- `talkCues(lines)` returns chiptune text blips, one soft 'tick'/'pop' per 2–3 characters, pitched a little per speaker.
- Everything must be a pure function of t, with no `document` access at module top level.

## The five
| folder | len | music | beats (copy is a starting point; keep it short, punchy and readable) | last line before the end card |
|---|---|---|---|---|
| **starhello** | 15 | chiptune | Headline: **"Astrology is just *talking* to the stars."** One sleepy star in the sky wakes up, blinks and looks straight at you. Box ("THE STARS"): "psst. up here." → "we've been trying to reach you about your love life." Then the turn: lots of little stars blink awake across the sky, all looking at you. | **"Time to *listen*."** |
| **starscorpio** | 15 | lofi | Headline: **"Dear *Scorpio*…"** The ♏ star squints suspiciously at a glowing phone. Box: "you don't have to read their texts like evidence." → (it softens, wide eyes) "just ask. out loud." Then a talk card flips in (card-talk-*.png): "Ask something real." | **"The stars said *ask*."** |
| **starleo** | 15 | funk | Headline: **"Dear *Leo*…"** The ♌ star wears a tiny pixel crown, under a spotlight, with heart-eyes at itself. Box: "you're amazing. we know. we made you." → "now let them talk about *their* day." The spotlight widens to fit a second star, and the two stars both glow. | **"Share the *spotlight*."** |
| **starmercury** | 30 | pop | Headline: **"Two stars walk into a *group chat*."** The ♊ Gemini star (fast, chatty, bouncing) and the ♍ Virgo star (neat, squinting) trade lines in the text box: Gemini: "omg 14 ideas for date night" · Virgo: "pick one. with a reservation." · eye-roll · Then a gold Mercury ☿ orb drops between them. Box ("THE STARS"): "Mercury rules you both. you just talk different." The Push / Pull / Align reading draws between their two charts. Box: "Align shows you how, before the first date." | **"Speak each other's *language*."** |
| **starvenus** | 30 | dreamy | Headline: **"Your ex just *texted*."** A phone buzzes. A chorus of sign stars pops up with wide eyes. The ♀ Venus star, gently glowing pink, speaks in the box: "Venus is retrograde." → "we say this with love: do not reply." Every star nods. Then: "you're looking for someone new. not someone *again*." Tonight's deck deals in (card-back), then a mystery card: "Card first. Face last." | **"The stars said *move on*."** |

## Contract
Same as promo/films/HOUSTON.md:
- Edit only your folder; the starhello agent also owns startalk.js.
- Don't edit endcard.js or cardfx.js.
- Keep renders lean, in fresh dirs, deleted after. Don't render the mp4.
- The sound build must run, and the kept card cuts must fully cover the frame (`node /tmp/claude-0/cardfx/cover.mjs <film> t1,...`).
- Commit only your files (`git pull --rebase --autostash` first; if it fails, commit first, then `git fetch && git rebase --autostash origin/claude/align-promo-video`). Push.
- Commit messages end with:
  ```
  Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
  Claude-Session: https://claude.ai/code/session_011q84hoGAFybJgojtyW8xw2
  ```
