# Align launch: video rollout

Four videos, one visual world: the halftone galaxy, flat-print sacred geometry and ALIGN everywhere.
Each video has one job.

| video | file | length | job |
| --- | --- | --- | --- |
| Hero film | `out/align-reel.mp4` | 31 s | Brand world: what Align feels like |
| Calling all <SIGN> ×12 | `out/teasers/sign-<id>.mp4` | 15 s | Reach: people share and tag their own sign |
| Two skies (love) | `out/teasers/love-<a>-<b>.mp4` | 20 s | Product: it's a dating app, and matching is the magic |
| Countdown + founders | `out/teasers/launch.mp4` | 15 s | Conversion: join the waitlist, become a founding member |

## Sequence

Run it over about four weeks, ending on launch day.

**Week 1: set the world.**
- Post the hero film and pin it to the profile.
- Caption: *Seven centers. Twelve signs. One alignment. Align is coming.*

**Week 2: the sign series.**
- Post one "Calling all <SIGN>" a day.
- Option A: post in zodiac order starting from the sign in season. On Oct 6 that's Libra, then Scorpio from Oct 23.
- Option B: post all twelve on day one as a grid drop. The profile then becomes a zodiac wheel.
- Caption formula: *Calling all Leos. Your matches are already aligning. Tag the Leo who needs this.*
- Each post is self-selecting (people stop on their sign) and invites a tag ("send this to your Scorpio").
- Reshare people's Stories to fill the gaps between posts.

**Week 3: love.**
- Post "Two skies" for opposite-sign pairs (Taurus × Scorpio, Leo × Aquarius, Aries × Libra…). Rendering a new pair is one command.
- Caption: *Two skies. Same stars. Which sign do you align with?*
- Use comment prompts ("drop your sign + your crush's sign") to source the next pairs to render. That turns the audience into the content queue.

**Week 4: countdown.**
- Post the countdown with the real date once it's set: `launch.html?date=NOV%2011`. Until then it reads SOON.
- Repost a Story version each day of the final week.
- Caption: *The sky opens soon. The first to align are founding members. Link in bio.*
- This is the only video with a hard call to action. It cashes in the attention the first three weeks built.

## Format notes

- **Safe zones.** All videos are 1080×1920 at 30 fps, and the critical content sits in the central 900×1500. Instagram and TikTok UI won't cover it.
- **Hooks.** Every video hooks in the first 0.5 s: a flash plus a glyph or numeral slam. Every one ends on a clean end card held at least 1.5 s, which works as the loop point and the cover frame.
- **Music.** The music is original and synthesized, so there are no licensing problems. Platform-trending audio can still be layered on for reach.
- **Cover frames.**
  - Hero film: the 29.5 s end card.
  - Sign series: the 1 s glyph slam.
  - Love: the 15 s "You both aligned."
  - Countdown: the 8.5 s "THE SKY OPENS".

## Render commands

See `README.md`. In short:

```bash
node tools/teaser-audio.mjs                         # all teaser soundtracks
node tools/export.mjs --page sign.html --query sign=leo --out out/teasers/sign-leo.mp4
node tools/export.mjs --page love.html --query "a=leo&b=aquarius" --out out/teasers/love-leo-aquarius.mp4
node tools/export.mjs --page launch.html --query "date=NOV%2011" --out out/teasers/launch.mp4
```
