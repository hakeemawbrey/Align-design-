# The Star Race: series bible (Season 1)

A comedy series about the 12 Star Talk stars racing down a cosmic marble run. Every race is real, fixed physics
(`scenes/race.js`, deterministic: the same seed gives the same race in every render), so a race can be replayed from
any sign's point of view and every version matches frame for frame.

**What it's about:** not winning. Each sign races the way it loves, and each race teaches one relationship /
alignment lesson. Align nods stay thematic (pace, compatibility, who you show up for); the only Align mark is the
faint "come align · join the beta" line. No CTAs, no episode numbers on screen.

**Main character: Taurus.** Slow, loyal, stops for what matters. Comes last in Race 1 because Taurus spent it sharing a
snack with Cancer. Taurus never wins by speeding up; Taurus wins (finale) by finding the right pace *with someone*.

## Race 1: "Fastest isn't the point." (seed 1, done: `promo/films/marblerace`)

| Place | Sign | Their race in one line | Love lesson (POV ending) |
|---|---|---|---|
| 1 | Capricorn | 6th early, took the lead at 15 s, never looked back. "excuse me. business." | First across the line. Nobody waiting there. Winning isn't the same as being met. |
| 2 | Sagittarius | 9th early, then "WHEEEEE" through Plinko to 2nd. | Fun gets you far. Will someone ride along? |
| 3 | Aries | Bolted at the gate ("GO GO GO!!"), stayed top 4 all race. | Fast is a gift. Look back once in a while. |
| 4 | Virgo | Steady "optimal line", 4th–6th all race. | Perfect line, no one to share it with. Let someone mess up your route. |
| 5 | Leo | Led for 15 s ("is the camera on me?"), then faded to 5th. | The spotlight moves. Who's still clapping when it does? |
| 6 | Pisces | 2nd early, cried the whole way ("it's all so beautiful"). | Feeling everything is not a weakness. |
| 7 | Aquarius | 4th, fell to 10th, climbed back to 7th. | Your own route is fine. Tell people where you went. |
| 8 | Scorpio | Started 11th, quietly climbed. "I let them win." | Pretending you don't care is still caring. |
| 9 | Libra | Hovered 8th–10th, took the right lane at the fork. | You can't take both lanes. Choose, and choose someone. |
| 10 | Gemini | Up to 5th, then fell back to 10th. | Half in two races is all in none. |
| 11 | Cancer | Back of the pack, got half of Taurus's snack, waited up for Taurus. | Waiting for someone isn't losing. |
| 12 | Taurus | Last all race. "want half my snack?" … "saved you the last bite." | Fastest isn't the point. Who you finish with is. |

## Episode plan

1. **Race 1** (the main video, ~63 s, done).
2. **Race 1: 12 POVs** (~60 s each, full race). Same race, camera locked on one sign, its inner monologue as
   bubbles, one rival/crush moment, its lesson line at the end. Order: Taurus, Cancer, Capricorn, Leo, Aries, Pisces,
   Scorpio, Libra, Sagittarius, Virgo, Gemini, Aquarius.
3. **Between races, one per sign** (~30–45 s): how each prepares for Race 2.
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
4. **Race 2: pairs**: signs race tied in twos (compatibility pairs). The setups pay off: Capricorn asks someone to
   race with them, and Libra has to commit to a partner.
5. **More races and the finale**: Taurus's arc lands when Taurus and Cancer win the pairs race at their own pace.

**Later:** a prequel season (how the stars met, old rivalries). Races and episodes are timed to real sky events
(each sign's season, Mercury retrograde as a chaos race, eclipses). Look up and check the exact dates before
scheduling; never guess them.

## Production notes
- Film: `promo/films/marblerace` (race.js = course + physics, scenes/index.js = camera, reactions, podium).
- New race = new seed (and course tweaks). Search seeds in node for the story you want, then write the reactions
  against the real timeline. Only `+ - * / sqrt` in the physics, so node and the browser agree.
- POV episode = same `simulate()` call, a camera that follows one sign, and that sign's bubbles and lesson.
- House rules apply (Pisces cries, kind humour, no real brands, no emoji in captions).
