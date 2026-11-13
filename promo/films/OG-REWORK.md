# Reworking an OG Star Talk film (keep its look, make it social)

The owner LOVES the original stories and the original Star Advice. Do NOT rebuild them in a new template. Keep each
film's own characters, sets, art and story. Change only what makes it work on Instagram/TikTok:

| Change | How |
|---|---|
| No end card / CTA, no card flips, no tarot border with episode numbers | automatic: render with `--social` (endcard.js / cardfx.js switch off; the film ends where its story ends) |
| Slower, padded, quieter | automatic: render with `--calm`, sound with `--calm --social` |
| **Hook**: static TikTok-style caption on screen from frame 1 | you: `export const HOOK`, `HOOK_STYLE`, `HOOK_UNTIL` (see below) |
| **Crazier personalities** | you: rewrite the signs' lines/captions/props to the most extreme, absurd-but-recognisable version of each trait |
| No in-film CTA, no episode/season labels | you: remove any "come Align", "join the beta", "EP 12", "Season 4", "S9 E52", "Part 2" text left in the scene code |

## Your film
Copy the original folder to `promo/films/og-<id>/` (cp -r; keep the same depth so `../../` imports still work) and edit
the copy. Never edit the original folder or the shared kits (`*.js` in promo/films, `*kit.js` of other shows): if a show
kit does something you must change, copy that kit into your folder and import the copy.

1. **Hook.** In `scenes/index.js` add
   ```js
   export const HOOK = 'Aries planned it in 5 minutes. | Libra brought *5 options.*'   // ' | ' line break, *accent*
   export const HOOK_STYLE = 'outline'   // 'outline' (white text, black outline) or 'box' (white text on black boxes)
   export const HOOK_UNTIL = 3.5         // film seconds it stays (it is on screen fully from frame 1, no animation)
   ```
   Write a hook that stops the scroll: ≤ 10 words, 2 short lines (each ≤ ~22 characters so it doesn't wrap), relatable or
   provocative, like the best TikTok text hooks. Then REMOVE or delay the film's own animated title/hook so nothing
   overlaps the hook while it is up, and make sure frame 0 already shows the scene (no fade-in from black under the hook).
2. **Crazier personalities.** Rewrite the dialogue, captions and labels so each sign is pushed to the extreme
   (Aries didn't "plan fast", Aries "booked the venue mid-sentence"). Keep the plot and payoff; one joke per moment.
3. **Clean up.** Remove in-scene CTAs, Align end lines, and any episode/season/part numbers. A subtle Align logo or
   watermark already in the art may stay. Keep the original's last story beat as the ending (no end card).
4. **Sound.** Keep the film's own cues.js; the calm/social switches thin and quiet it. Remove any word-pop/tick cue
   bursts you added.

## Check and render
```bash
node promo/scripts/render.mjs --film=og-<id> --vertical --social --stills=0,1.5,<times across the story>,<last 1s> --dir=<fresh dir>
node promo/scripts/teaser-sound.mjs --film=og-<id> --social --calm
```
Look at every still: hook readable and alone on frame 0 and 1.5, nothing overlapping it, no episode numbers, no CTA, the
ending is a story beat (not an empty sky). Full render (only when asked):
`node promo/scripts/render.mjs --film=og-<id> --vertical --social --calm --out=<file>.mp4`

House rules: Pisces cries whenever it appears; kind humour; no real brands/apps/platforms/people/songs; no invented
stats; no drinking; nothing sexual; no weapons/disasters; no hashtags/emoji in captions.
