# The Star Race: series bible (Season 1)

A comedy series about the 12 Star Talk stars racing down a cosmic marble run. Every race is real, fixed physics
(`scenes/race.js`, deterministic: the same seed gives the same race in every render), so a race can be replayed from
any sign's point of view and every version matches frame for frame.

**What it's about:** not winning. Each sign races the way it loves, and each race teaches one relationship /
alignment lesson. Align nods stay thematic (pace, compatibility, who you show up for); the only Align mark is the
faint "come align · join the beta" line. No CTAs, no episode numbers on screen.

**Main character: Taurus.** Slow, loyal, stops for what matters. Finishes at the back in Race 1 because Taurus spent it
sharing a snack with Cancer. Taurus never wins by speeding up; Taurus wins (finale) by finding the right pace *with someone*.

## Race 1: "Fastest isn't the point." (seed 38, space course, done: `promo/films/marblerace`, ~83 s)

The course, top to bottom: asteroid belt (drifting rocks), binary stars (two orbiting suns), zodiac wheel (12 spinning
spokes), black hole (it pulls you in; cross the horizon and you're spat out of a wormhole near the finish), stardust
plinko, Mercury retrograde (gravity flips upward on a timer), Saturn, comet, final plinko.

| Place | Sign | Their race | Love lesson (POV ending) |
|---|---|---|---|
| 1 | Gemini | "ooh, shiny." Fell into the black hole first and came out of the wormhole leading. "BOTH of us won." | Luck got you here. Who are you sharing it with? |
| 2 | Capricorn | Led early, bounced off a binary star ("excuse me. business."), swallowed second, lost by 0.3 s. "requesting a recount." | You planned everything except being happy. |
| 3 | Scorpio | Went into the black hole "on purpose." | Pretending you meant it is still pretending. |
| 4 | Sagittarius | "WHEEEEE." First to finish the honest way. "wait, you guys skipped?" | The long way was the fun part. |
| 5 | Leo | "I AM the star." (bounced off an actual star) | The spotlight moves. Who's still clapping? |
| 6 | Aquarius | "new route. trust me." Hit by the comet. "I meant to do that." | Your own route is fine. Tell people where you went. |
| 7 | Aries | "GO GO GO!!" | Fast is a gift. Look back once in a while. |
| 8 | Pisces | Cried the whole way. "it's all so beautiful" | Feeling everything is not a weakness. |
| 9 | Libra | Mid-pack all race. | You can't take both lanes. Choose. |
| 10 | Cancer | "...for me?" Got half of Taurus's snack. "why is gravity going UP??" "I'll wait for you." | Waiting for someone isn't losing. |
| 11 | Taurus | "want half my snack?" … "saved you the last bite." Finished right beside Cancer. | Fastest isn't the point. Who you finish with is. |
| 12 | Virgo | "this was NOT in the plan." Stuck in Mercury retrograde. "still in retrograde." "optimal line." | Even the best plan meets retrograde. Let someone help. |

## Episode plan

1. **Race 1** (the main video, ~83 s, done).
2. **Race 1: 12 POVs** (~65 s each, full race, done: `promo/films/marblerace-<sign>`). Same race, camera locked
   on one sign, its inner monologue as bubbles, one rival/crush moment; once it finishes it comments from the corner
   while the camera follows whoever is still racing; end card with its place and lesson. Posting order: Taurus,
   Cancer, Capricorn, Leo, Aries, Pisces, Scorpio, Libra, Sagittarius, Virgo, Gemini, Aquarius.
3. **Between races, one per sign** (~43 s, done: `promo/films/starrace-<sign>`, scripts in `promo/films/starrace/
   episodes.js`, engine in `starrace/ep.js`): how each prepares for Race 2, and each sets up its Race 2 partner.
   Six pairs: **Taurus & Cancer · Leo & Aries · Capricorn & Aquarius · Pisces & Scorpio · Libra & Gemini ·
   Sagittarius & Virgo**. Paired episodes show the same moment from both sides (Taurus's PARTNERS? cookie and
   Cancer's scarves meet at the same door; both ask at the same time). Posting order: Taurus, Cancer, Capricorn,
   Aquarius, Leo, Aries, Pisces, Scorpio, Libra, Gemini, Sagittarius, Virgo. Original idea list:
   - Capricorn hires a coach and is lonely at the top.
   - Taurus and Cancer bake for the next race.
   - Leo designs a victory pose.
   - Aries trains alone at 5 a.m.
   - Libra makes a pros/cons list about which lane to take.
   - Scorpio studies everyone's footage.
   - Pisces writes a pep song.
   - Gemini signs up twice.
   - Virgo builds a spreadsheet.
   - Sagittarius gets lost on the way to practice.
   - Aquarius invents a new marble.
4. **The night before Race 2** (one per pair, ~40 s, done: `promo/films/starrace-night-<pair>`, scripts in
   `starrace/episodes.js` NIGHT). Each plants a Race 2 beat: the scarf rope, "I lead, you shine" and the left/left
   tangle, the straight route vs. the shortcut, Scorpio's jump plan, the lane Libra can't pick, the paper-plane map.
5. **Race 2: pairs** (done: `promo/films/marblerace2`, ~90 s). Same course, pairs tied with 150 px ropes, and the wormhole
   now spits you out back at the start. Baked in `marblerace/scenes/race2.js` (seed 98, `bake2.mjs`). Result:
   1 Taurus & Cancer · 2 Capricorn & Aquarius · 3 Leo & Aries · 4 Pisces & Scorpio · 5 Sagittarius & Virgo ·
   6 Libra & Gemini (caught between the binary suns, swallowed, back to the start; everyone waits at the line).
   Lesson: "Fastest isn't the point. Your pace, together, is."
6. **Next**: Taurus's arc landed in Race 2 (the pairs race). Open threads for Race 3: Capricorn second twice, Libra & Gemini's comeback, Leo & Aries taking turns.

**Later:** a prequel season (how the stars met, old rivalries). Races and episodes are timed to real sky events
(each sign's season, Mercury retrograde as a chaos race, eclipses). Look up and check the exact dates before
scheduling; never guess them.

## Production notes
- Film: `promo/films/marblerace` (race.js = course + physics, scenes/index.js = camera, reactions, podium).
- New race = new seed (and course tweaks). Search seeds in node for the story you want, then write the reactions
  against the real timeline. Only `+ - * / sqrt` in the physics, so node and the browser agree.
- The race is **baked** (`scenes/race1.js`, made by `node scenes/bake.mjs`): the physics is chaotic and node and
  Chromium differ by a hair in Math.sin/cos, so the race is simulated once in node and both the picture and the cue
  sheet replay the same frames. A new race = new seed → bake a new file.
- POV episode = `makePOV(sign)` in `scenes/pov.js` (camera, the sign's extra lines in `LINES`, hook and lesson in
  `CARD`). Render POVs at `--calm=1` (~65 s); the main film at `--calm` (0.8).
- House rules apply (Pisces cries, kind humour, no real brands, no emoji in captions).
