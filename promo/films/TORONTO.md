# Toronto: five vertical Align ads (15 / 15 / 15 / 30 / 30 s)

The user asked: "make one for toronto make 5 actually".

These are the same kind of ad as the city ads.
- **Read first:**
  - promo/films/CITIES.md and promo/films/HOUSTON.md: style, Align truth, city rules, the END CARD, the contract and commit rules.
  - promo/films/VOTE.md: copy rules.
  - promo/films/cardfx.js: the card-motif INTEGRATION RECIPE. Every film uses `cardFrame` plus `cardCuts` with the default selection.
- **Good examples:** promo/films/citynyc, cityseattle, htxtaste, htxrodeo and voteballot.
- **END CARD:** your scaffold passes your `CTA` (JOIN THE WAITLIST or VOTE FOR YOUR CITY) to buildEndcard. Keep it. Never say "Align" in the frames just before the end card.

**Copy rules:**
- Say **"Card first. Face last."** Never say "chart first".
- No invented numbers or statistics.
- No brand, team or transit-agency logos or names.
- Generic line-art skyline and landmarks only. A tall needle-tower silhouette in a generic skyline is fine; don't name it.
- Affectionate toward Toronto, never mean.
- Canadian flavour is welcome: patios, snow, a lake, condo towers, neighbourhood energy.

**Music** is pre-assigned in cues.js. Set `sections` to your big moments, and keep `outroAt: DURATION - 4.4`.

| folder | len | music | CTA | hook | turn (the real Align feature) | last line before the end card |
|---|---|---|---|---|---|---|
| **torpatio** | 15 | house | JOIN THE WAITLIST | **"Toronto has two seasons: winter and *patio*."** Snow piles on a generic skyline, then it flips to summer: string lights, a patio table, a lake glinting. | "Don't spend patio season on the *wrong person*." Dealbreakers stamp onto a card: "✕ FLAKY PLANS", "✕ ONE-WORD TEXTS". | "Make this patio season *count*." |
| **torsubway** | 15 | synthwave | VOTE FOR YOUR CITY | **"Stuck on the subway, swiping the *same faces*."** A generic subway car with a pictogram rider; the same few profile silhouettes loop on their phone. | "Tonight's deck: a *new* hand, every night." Card backs deal in over the tunnel lights, then a mystery card appears: "Card first. Face last." | "Get off the *same loop*." |
| **torworld** | 15 | pop | VOTE FOR YOUR CITY | **"In Toronto, everyone's from *somewhere*."** Pictogram people in many colours, with greeting bubbles in several languages (only scripts that render; check them). | "Your person could be from *anywhere*." The bubbles rise into stars, then two charts link across the crowd. | "Find them under *one sky*." |
| **torglass** | 30 | dreamy | JOIN THE WAITLIST | **"A city of *glass towers*…"** Generic condo towers rise; each lit window holds one pictogram alone with a phone. "…everyone in their own *box*." | Cards drift from window to window like notes; two far-apart windows light up gold and a gold line joins them. "Align reads both charts before you ever meet." Then "Card first. Face last." with a mystery card. | "Come out of your *box*." |
| **torsorry** | 30 | funk | VOTE FOR YOUR CITY | **"Toronto: so polite, nobody says what they *want*."** "sorry!" bubbles pile up between two pictograms on a date, plus "no worries", "all good!", "haha totally". | "On Align, dealbreakers come *first*." Chips stamp onto a card. Then the Push / Pull / Align reading draws on two charts: "See how you fit, *no guessing*." | "Say what you *mean*." |

**Contract:**
- Edit only your folder. Don't edit endcard.js or cardfx.js.
- Everything must be a pure function of t.
- Keep render checks lean, in fresh dirs, deleted afterwards. Don't render the mp4.
- The sound build must run, and the kept card cuts must fully cover the frame (`node /tmp/claude-0/cardfx/cover.mjs <film> t1,...`).
- Commit only your folder (`git pull --rebase --autostash` first; if it fails, commit first, then `git fetch && git rebase --autostash origin/claude/align-promo-video`). Push. Commit messages end with:
  ```
  Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
  Claude-Session: https://claude.ai/code/session_011q84hoGAFybJgojtyW8xw2
  ```
- Report back briefly with your timings.
