# Reworking an OG Star Talk film (keep its look, make it social)

The owner LOVES the original stories and the original Star Advice. Do NOT rebuild them in a new template. Keep each
film's own characters, sets, art and story. Change only what makes it work on Instagram/TikTok:

| Change | How |
|---|---|
| No end card / CTA, no card flips, no tarot border with episode numbers | automatic: render with `--social` (endcard.js / cardfx.js switch off; the film ends where its story ends) |
| Slower, quieter, seamless | automatic: render with `--social --calm` (0.8× speed; the film stays FULL FRAME on its own background, no shrink, no shared sky; the hook sits full-size just under the app's top bar), sound with `--calm --social` |
| **Hook**: static TikTok-style caption on screen from frame 1 | you: `export const HOOK`, `HOOK_STYLE`, `HOOK_UNTIL` (see below) |
| **Crazier personalities** | you: rewrite the signs' lines/captions/props to the most extreme, absurd-but-recognisable version of each trait |
| No header text: series bugs/labels ("Zodiac Courtroom", "STAR GUIDE · AIR SIGNS · PEP TALK"), corner logos, top chips naming the show | you: remove them from the scene so the top of the frame only ever shows the HOOK (and later the story's own captions) |
| Subtle invite | automatic in --social: a faint "✦ come align · join the beta ✦" under the picture |
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
   The hook is static (no animation at all) from frame 1 until HOOK_UNTIL. Write a hook that stops the scroll: ≤ 10 words, 2 short lines (each ≤ 20 characters so it doesn't wrap at 84 px), relatable or
   provocative, like the best TikTok text hooks. Then REMOVE or delay the film's own animated title/hook so nothing
   overlaps the hook while it is up, and make sure frame 0 already shows the scene (no fade-in from black under the hook).
2. **Crazier personalities.** Rewrite the dialogue, captions and labels so each sign is pushed to the extreme
   (Aries didn't "plan fast", Aries "booked the venue mid-sentence"). Keep the plot and payoff; one joke per moment.
3. **Clean up.** Remove in-scene CTAs, Align end lines, any episode/season/part numbers, series header labels and
   corner logos (the automatic watermark is the only Align mark). Keep the original's last story beat as the ending (no end card).
4. **Sound.** Keep the film's own cues.js; the calm/social switches thin and quiet it. Remove any word-pop/tick cue
   bursts you added.

**Safe zones (full frame, so you move things instead of shrinking):** keep important text and characters inside
x 60–960 and between y 470 and 1560. The hook covers y ~232–460 while it is up; the faint watermark sits at y ~1730–1770 (bottom 150 px);
the app's buttons cover the right edge (x 960–1080, y 1000–1600) and its caption covers the bottom ~300 px. Backgrounds
and sets stay full frame; nudge labels, tags and captions that land in those zones (in your kit copy).

**Lessons from the first reworks:**
- Many old kits pop/fade everything OUT in the last second because the end card used to follow. In social mode that leaves an empty sky as the last frame: push that `out` time past the end (in your kit copy) so the film ends ON its last story beat.
- Remove fade-ins from black, white flashes, screen shakes, slam titles and word-pop sound bursts; soften whip zooms.
- Emoji inside scene text: replace with words (house rule: no emoji).
- If the opening beat is too quick to read under the hook, stretch it a little (the hook needs ~3 s).

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
