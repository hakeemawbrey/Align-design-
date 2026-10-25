# Vote for the 2nd launch city: three vertical Align ads (15 / 15 / 30 s)

The user asked: "make a couple videos about voting for the 2nd launch city. and dont say chart first say card first."

**Story:** Align launches in Houston first. The second launch city is chosen by a public vote, and these ads ask people to vote for their city.
- **CTA:** the shared end card (promo/films/endcard.js) with `cta: 'VOTE FOR YOUR CITY'`, already wired in your scaffold. It shows "come", then the seed-of-life logo, then "Align", with the CTA under it.
- **Never say "Align"** in the frames just before the end card.

**Read first:**
- promo/films/HOUSTON.md (style, Align truth, contract, commit rules) and promo/films/CITIES.md (city rules).
- The card motif in promo/films/cardfx.js: read its INTEGRATION RECIPE. Every film uses `cardFrame` plus `cardCuts`, with the default selection (about 1 card transition per 12–15 s), exactly like the other films.
- Good examples: promo/films/htxtaste, htxrodeo and citynyc.

**Copy rules:**
- Say **"Card first. Face last."** Never say "chart first".
- **No invented numbers:** no vote counts, percentages, leaderboards with real figures, or deadlines. Vote bars can animate, but without numbers.
- **No real city logos, team marks or brands.** Use generic skylines and line art only.
- **Candidate cities** to use across the films: New York, LA, Chicago, Austin, Miami, Atlanta, Nashville, Seattle, Dallas, New Orleans. Don't imply any city is winning.

**Music** is pre-assigned in cues.js. Set `sections` to your big moments, and keep `outroAt: DURATION - 4.4`.

| folder | len | music | hook | middle | last line before the end card |
|---|---|---|---|---|---|
| **votenext** | 15 | pop | **"Houston got the stars *first*."** A generic Houston skyline lights up and a big gold star settles over it. | "Where do they go *next*?" Ten card backs (the card-back art, with Align on the back, from cardfx) deal into a fan. They flip one by one to show city names in bold type with tiny generic skyline icons, and one card stays face-down with a "?". | "Your city could be *next*." |
| **voteballot** | 15 | house | **"Launch city #2 is up to *you*."** A ballot card drops in, styled like an Align card with a gold rim and the seed-of-life watermark. | City chips pop onto the ballot. A pictogram finger taps one, it fills with a check, and the chip flies up and becomes a star. More stars rise from all over: "Every vote is a star." Then a quick feature tease: "Card first. Face last." with a mystery card (card-profile-*.png). | "Pick the next *sky*." |
| **votemap** | 30 | cinematic | **"Align starts in *Houston*."** A stylised US map in line art (a simple outline, not exact geography). Houston lights up as a bright star with a "LAUNCH CITY #1" tag. | "Then the stars *pick a second city*." Constellation lines reach out from Houston towards the candidate cities, each a dim star with a label. Stars pulse brighter as votes come in, with no numbers and no winner. Quick Align truth beats: tonight's deck dealt, "Card first. Face last.", talk cards. "Which city lights up *next*?" | "Vote your city *into the sky*." |

**Contract:**
- Edit only your folder. Don't edit endcard.js or cardfx.js.
- Everything must be a pure function of t, with no `document` access at module top level.
- Keep render checks lean, in fresh dirs, deleted afterwards. Don't render the mp4.
- `node promo/scripts/teaser-sound.mjs --film=<name>` must run.
- Check the kept cuts fully cover the frame with `node /tmp/claude-0/cardfx/cover.mjs <film> t1,...`.
- Commit only your folder (`git pull --rebase --autostash` first; if that fails, commit first, then `git fetch && git rebase --autostash origin/claude/align-promo-video`). Push.
- Commit messages end with:
  ```
  Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
  Claude-Session: https://claude.ai/code/session_011q84hoGAFybJgojtyW8xw2
  ```
