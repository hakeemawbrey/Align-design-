# Align: series 2, ten hooks (7 × 15s, 3 × 30s; 16:9, 1920×1080, 30fps)

The user asked for 10 more Align videos, each **positioning a different problem or testing a different kind of hook**. Read promo/films/FILMS.md first: it covers the world, brand rules, helpers, contract and render commands. Everything there applies, plus the rules below.

## Shared rules for series 2
- **The hook lands in the first 1.5s.** Show a caption or a striking visual from frame 0–15. These are social ads.
- **One problem, one answer, one end line.** Plain warm voice, no hype. Make people *feel* the problem.
- **App truth only.** Show real Align features using the real assets in promo/assets/ (see MANIFEST.md) and real in-app lines. Align is an astrology blind-dating app:
  - The chart comes first and the face last.
  - "Tonight's deck" is dealt every night.
  - Talk cards replace small talk.
  - Dealbreakers are stated up front.
  - The alignment reading is called "Push / Pull / Align".
  - The sign card and the founding member card exist.
- **Statistics and other apps:**
  - No invented statistics. "8 billion people" is fine; numbers may otherwise only appear in a character's own phone UI.
  - Generic UI only. Never name or mimic a real dating app.
- **Each film has an assigned LOOK, so the series has range:**
  - **LOOK A, "Film 1".** The soft glowing gradient "space moods" (rose, teal, amber, aurora), light grain (about 0.22), and Inter 500 hook lines. Signature details: corner-tick boxes, `{ bracket }` lines, a moon-phase badge top-left and a moon-phase row at the end. See promo/deck-kit/ALIGN-DECK-STYLE.md, its ref-*.jpg frames, and promo/src/scenes/common.js `spaceBackdrop`/`SPACE_MOODS` and s2-intro.js (ticks). You may import spaceBackdrop from promo/src/scenes/common.js read-only.
  - **LOOK B, "Nebula".** The grainy deep-space S1 nebula of films 2–3: promo/films/sky.js drawSky, grain about 0.5, EB Garamond italic statements, a cold desaturated problem half that blooms into colour.
- **Ending (every film):** the end line, then the Align lockup.
  - Lockup: the mark draws, chakras light, the wordmark "Align", then "BLIND BY DESIGN" (LOOK B) or "PUT YOUR FAITH IN THE STARS" with a moon-phase row (LOOK A).
  - Fade to black; the last frame is black.
  - **15s:** end line typed by about 12.0, lockup complete by about 13.3, fade 14.5–15.0.
  - **30s:** end line typed by about 27.0, lockup by about 28.6, fade 29.6–30.0.
- **Folders, 15s films:** ONE agent owns the whole folder promo/films/<name>/, including cues.js (tune its chords, bpm and beat window to your edit).
- **Folders, 30s films:** two agents own scenes/a (0–15.2) and scenes/b (14.8–30). The lead owns cues.js. Handoff H is defined in the table below.
- **Render and check:** render with `--film=<name>` and always a FRESH --dir. Captions must be readable for at least 1.0s, with no pops, one moon and consistent grain.

## The ten
| # | folder | len | look | hook (problem) | answer (feature) | end line |
|---|---|---|---|---|---|---|
| 1 | swipes | 15 | B | A thumb-swipe blur of faces. A small counter in a generic phone UI reads "SWIPES TODAY 312". Line: **"312 swipes. 0 butterflies."** | **Tonight's deck:** one small deck a night, dealt from the stars (card-back → veiled cards; screen-deck / screen-dealing). Line: "Every night, a new deck." | **"Slow down. Look up."** |
| 2 | photos | 15 | A | Profile photos glitching through angles, filters, "2019", beauty sliders. Line: **"Photos lie."** | **Chart first:** the blind card with an aura veil, Sun/Moon/Rising (screen-onboarding-card-rule "You fall for the chart. The face comes after."). Line: "Charts don't." | **"Fall for the chart."** |
| 3 | bios | 15 | A | Generic bios typing over each other: "6'1 if that matters", "fluent in sarcasm", "just here for a good time", "love to travel"… and they all blur into one. Line: **"Everyone sounds the same."** | **Your chart reading:** "Taurus, the user manual" (screen-onboarding-manual), Big Three (screen-onboarding-big-three). Line: "Your sky doesn't." | **"Your sky says more."** |
| 4 | hey | 15 | B | Chat loop: "hey" / "hey" / "how's your week" / "good u" / "good"… repeating, faster and faster, stuck. Line: **"Stuck on 'hey'."** | **Talk cards:** The Fool "What's a hill you will die on?" dealt into the chat (card-talk-1, screen-chat-cards). Line: "Start with a real question." | **"Skip to the good part."** |
| 5 | dealbreakers | 15 | B | A sweet chat montage ("3 MONTHS" timestamp), then one message lands: "I don't want kids." The relationship card cracks. Line: **"Three months in."** → **"Then the dealbreaker."** | **Dealbreakers first:** chips picked at signup ("What ends it before it starts?", screen-onboarding-dealbreakers) stamped on the card. Line: "Said on day one." | **"What matters, first."** |
| 6 | birthtime | 15 | A | Only the birth data types out, huge: "May 12, 1998 · 5:00 PM · Tulsa". Line: **"The most honest thing about you."** | **Sign card:** the face-down sign card charges, then flips to "Sun in Taurus" with the YOUR CARD stamp (card-sign-back, card-sign-stamped, screen-onboarding-sign-charging/reveal). | **"The sky already wrote you down."** |
| 7 | unrationed | 15 | A | Generic paywall tiers flicker at you: "SEE WHO LIKED YOU $", "BOOST", "SUPER LIKE ×1 LEFT". Line: **"Paying to be seen?"** | **Founding member:** "Stop rationing the stars" (screen-founding); the gold card stamps down (card-founding, screen-founding-claimed "The stars, unrationed."). Line: "The stars, unrationed." | **"Become a founding member."** |
| 8 | pattern | 30 | B | Same face-type and same red flags, different names; the cards cycle and the same "it's not you, it's me" text repeats. Lines: **"You keep falling for the same person."** → **"Different name. Same ending."** | **Alignment reading:** Push / Pull / Align shows how two charts actually fit before you fall (screen-alignment "Venus rules you both", card details Push/Pull/Align, chakra lock). Lines: "See the pattern before you fall." → "Push. Pull. Align." | **"Break the pattern."** |
| 9 | butterflies | 30 | B | Nostalgia: a warm grainy memory of a first crush (a note passed, heart racing) cut against now (numb, fast swiping, cold). Lines: **"Remember butterflies?"** → **"When did dating get so numb?"** | **The blind reveal:** not knowing builds anticipation. The mystery card, talk, both align, then the veil lifts (aura-cam sweep, card-reveal, screen-match). Lines: "Not knowing is the best part." → "Then you both align." | **"Bring back the butterflies."** |
| 10 | eightbillion | 30 | B | Scale: pull back from one lit window to a city, then the Earth at night, then stars. Lines: **"8 billion people."** → **"So why does it feel like no one?"** | **The field / tonight's sky:** "You are not arriving alone" (screen-onboarding-field, fanned card backs, "333 charts nearby"); today's sky cards (screen-sky); a deck dealt to you. Lines: "Someone's sky lines up with yours." → "Tonight's deck is already dealt." | **"You are not arriving alone."** |

## 30s handoffs (H at 14.8–15.2: half A ends on exactly this, half B starts on it)
- **pattern:** drawSky(zoom 1, dx 0, dy 0, dim 1, moon (1716,122) r52 phase .12 alpha 1), grain 0.5. One veiled mystery card (A+'card-profile-3.png') at centre (960,540), body height 600, upright, still from 15.0.
- **butterflies:** the same sky, with nothing else on screen by 15.0.
- **eightbillion:** the same sky, with nothing else on screen by 15.0 (the pull-back ends in the stars).
