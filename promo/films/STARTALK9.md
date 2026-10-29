# Star Talk, season 8: "Ex Retrograde" (25 vertical episodes, 25–60 s)

The user asked: "a new season of 25 better hooks and push the concept as far as you can to be entertaining."

**The pitch.** Season 5 ended on a tease: "NEXT SEASON: Venus goes retrograde… and *everyone's* exes come back." This is that season.
- **The plot.** Venus (the planet of love) stations retrograde. For about six weeks the exes come back: a Comet, a Satellite, a Meteor and Mars himself, Venus's own ex.
- **The genres.** Every episode is a different TV genre: breaking news, horror trailer, nature documentary, game show, courtroom, heist, sitcom, noir, sports, karaoke, video game and more.
- **The spine.** One plot runs through all 25, ending at Leo × Aquarius's wedding, which they hold *after* Venus goes direct ("yes. slowly.", season 5).
- **What must not change.** The advice stays healthy and the sky stays real.

Read first:
- STARTALK.md and STARTALK3.md: the look and the contract.
- STARTALK5.md and STARTALK6.md: the canon.
- st4venusretro and st4venus1: Venus's look and her season 4 retrograde lesson.
- Shared modules (never edit): startalk.js, lesson.js, stlore.js, st5cast.js, cardfx.js, endcard.js, sky.js.

## The hook rules (this season's whole point; STARTALK10.md uses them too)
1. **Frame 0 is already interesting.** No fade from black and no empty sky. The first frame shows a character mid-action plus the hook caption, already on screen and readable as a still. The caption is Inter 800, at most 7 words, with one Garamond accent word.
2. **Open a loop in the first 2 s and close it in the last 3 s before the end card.** The hook asks a question, and the payoff answers it.
3. **A pattern interrupt every 3–5 s:** a cut, a camera punch-in, a genre graphic, a sound sting, a reaction zoom or a new character. Nothing sits still longer than 5 s.
4. **Commit to the genre's grammar.** Copy the format's real tells, in pixel form: a news chyron and ticker, a game-show money ladder, a trailer's "THIS SUMMER…" title cards, a sitcom laugh track and "LIVE STUDIO AUDIENCE" bug, a nature-doc lower third with Latin names ("Satellitus orbiticus"), a noir voice-over in a slanted typewriter box, and so on. The more exact the parody, the funnier.
5. **One rewatch bait per episode.** A background gag that you only catch on a second watch, plus the hidden Comet (see Easter eggs).
6. **The end rhymes with the start.** The last shot echoes frame 0 (the same pose or framing, changed), so the loop replays cleanly.
7. **The last line** is Inter 800 with a Garamond accent, spoken or slammed in, and it is healthy.

## The cast (new, in st8cast.js)
The EP 01 session owns `promo/films/st8cast.js` and pushes it before anything else. It uses the startalk.js pixel style; reuse `drawBits`/`drawSaturn` etc. from st5cast.js. Every function is pure f(t).

**Characters.** Each returns `{ x, y, size, top }` and takes `opts` like drawStarChar (mood, look, blink, bob, hops, seed, glow, alpha, pop):
- `drawVenus(ctx, x, y, size, t, opts)`: Venus, matching season 4 (pink ♀ star, sparkle). Extra opts:
  - `retro` 0…1: a dashed backwards-orbit arrow loops round her and she dims and desaturates at 1;
  - `morning` 0…1: a dawn-gold rim, for after she returns as the Morning Star;
  - `mirror`: the rear-view-mirror prop.
  - Tag `VENUS.tag '♀ VENUS'`.
- `drawMars(ctx, x, y, size, t, opts)`: Mars, Venus's ex. A rust-red pixel planet with a little Greek crested helmet, two tiny moons (Phobos and Deimos, real) orbiting like a hype crew, and big-guy energy that's soft underneath.
  - opts: `helmet` (default true) and `mood` ('neutral' 'smug' 'wide' 'sad' 'happy' 'heart').
  - Tag `'♂ MARS'`.
- **The exes.** Each has a red dashed outline pulse and a tiny "EX" pin (`exPin` true by default):
  - `drawComet(ctx, x, y, size, t, opts)`: the ex who keeps coming back. An icy nucleus with a face and a long tail that always points away from the Sun (opts `sunDir`, real). Tag `'☄ THE COMET'`.
  - `drawSatellite(ctx, x, y, size, t, opts)`: the orbiter who watches every story and never texts. A boxy probe with solar-panel arms, a dish and a blinking red "viewed" light. opts `orbit` = { cx, cy, r, speed } makes it circle a point. Tag `'🛰 THE ORBITER'`; use the text `'THE ORBITER'` if the emoji won't render.
  - `drawMeteor(ctx, x, y, size, t, opts)`: the love-bomber. Fast, bright, a flame trail, burns out. opts `burn` 0…1 shrinks it to a pebble with a puff. Tag `'✦ THE METEOR'`.
- `exPin(ctx, x, y, t, { label = 'EX' })`: the little red "EX" pin, on its own.

**Season devices:**
- `drawDayChip(ctx, t, { day, x = 930, y = 120, phase })`: a pink pixel chip in the top right (keep it clear of the cardFrame corner) reading "♀ Rx · DAY 07". `phase` is 'retro' | 'gone' | 'morning' | 'direct' and changes the chip colour and icon.
- `hookCard(root, { text, at = 0, out, size = 110, accentSize = 160, top = 170, accentColor })`: the frame-0 caption, already fully on screen at `at` (no type-on). It does a tiny 2-frame shake at `at + 0.1` and pops out at `out`.
- `hookCues(at, { key })`: the matching sound, a record-scratch-style blip plus a hit.
- `genreBug(ctx, t, { text, x, y, color })`: the small corner logo ("LIVE", "BREAKING", "REC", "SEASON FINALE").
- `drawTicker(ctx, t, { text, y = 1780, speed = 160 })`: the scrolling news ticker band.
- `stingerCues(at, { key, kind })`: genre stings (`kind` 'news' 'horror' 'gameshow' 'sitcom' 'noir' 'sports' 'trailer' 'wedding').

Publish the full API in the file header (copy-paste block, like st5cast.js). Then push it as its own commit: "st8cast: season 8 cast and hook devices".

## Easter eggs
Every episode has:
- `cardFrame({ numeral: 'S8 E01' … 'S8 E25' })`;
- the faint finished seed constellation (`drawSeedConstellation(ctx, t, 100)`, top left);
- one `drawGhostCameo` in a new spot, recorded in `lore.json`;
- **the hidden Comet.** A tiny comet (about 30 px) crosses the background once in every episode, before it shows up for real in E02. In E24 it leaves "for about 76 years". Record its time in `lore.json` as `"comet"`.

**End card:** `cta: 'SIGN UP TO VOTE YOUR CITY'`.

## Accuracy (strict)
These are the real facts this season may use. Keep the hedges as written.
- **Venus retrograde:**
  - it happens about every year and a half and lasts about six weeks;
  - it is an *apparent* backward drift, an illusion of the view from Earth as Venus passes between us and the Sun.
- **Inferior conjunction (the middle of the retrograde):**
  - Venus passes between Earth and the Sun and is lost in the Sun's glare for a few days;
  - it leaves the evening sky and comes back in the morning sky as the "Morning Star".
- **The pentagram:** Venus's inferior conjunctions repeat in a pattern of five that traces a five-petal "rose" over about eight years.
- **Venus's spin:** Venus spins backwards compared with most planets, so on Venus the Sun rises in the west. Its day (one spin) is longer than its year.
- **Venus's heat:** Venus is the hottest planet (a runaway greenhouse), hotter than Mercury.
- **Rulers:** Venus rules Taurus and Libra. Mars rules Aries, and Scorpio traditionally (Pluto in modern astrology).
- **Inanna:** the Sumerian goddess Inanna was linked with the planet Venus. In the myth "Inanna's Descent" she passes seven gates into the underworld, giving up an item at each. Some scholars link the story to Venus vanishing from the sky; say "some scholars link…".
- **Aphrodite and Ares:** in Greek myth (the Odyssey) they were caught together in a golden net forged by Hephaestus. Keep it PG: "caught in a net", nothing more.
- **The Babylonians** recorded Venus's risings and settings (the "Venus tablet of Ammisaduqa").
- **The exes' science:**
  - Halley's Comet comes back about every 76 years, next around 2061;
  - a comet's tail points away from the Sun;
  - most meteors are bits of dust or pebbles burning up in the air;
  - Mars has two small moons, Phobos and Deimos.
- **Astrology framing:** "astrology says Venus retrograde is a time people re-think love and exes". There is no fortune-telling, no "your ex WILL text" and no compatibility verdicts.

## The twenty-five
Each row gives: episode, folder, length, music, the genre, the frame-0 **hook**, the story beats (with real facts) and the **last line**.

| EP | folder | len | music | genre | hook (frame 0) | beats | last line |
|---|---|---|---|---|---|---|---|
| 01 | st8breaking | 30 | cinematic | breaking news | "BREAKING: Venus is going *backwards*." | Venus behind an anchor desk in a "LIVE" bug, with the ticker reading "EXES REPORTED IN 12 SIGNS". Saturn as the field reporter explains it's an illusion as the two planets pass. Every star's phone lights up at once ("u up?"). Libra hears a knock. CLIFF: a tail of light under the door. | **"Backwards isn't *broken*."** |
| 02 | st8knock | 30 | screwed | horror trailer | "Libra's ex is at the *door*." | Trailer cards ("THIS FALL…", "HE CAME BACK", "AGAIN"). The Comet: "i'm back ☺". A real fact chip: comets return on a schedule. Libra (ruled by Venus) wobbles, then sets a boundary through the peephole. Aries holds the door chain. | **"Back isn't *better*."** |
| 03 | st8orbiter | 25 | lofi | nature documentary | "The orbiter, in its natural *habitat*." | Lower third: "THE ORBITER · *Satellitus lurkus*". It circles Scorpio's phone, the "viewed" light blinking, and never says a word. A whispery narrator box from THE STARS. Scorpio mutes it, and the satellite drifts off into the dark. | **"Watching isn't *wanting*."** |
| 04 | st8meteor | 30 | house | infomercial | "Tired of *slow*, steady love?" | "CALL NOW!" graphics. The Meteor sells "instant romance": flowers, fireworks, "soulmate" on day 1, aimed at Ophiuchus. A real fact pops up: most meteors are dust burning up. The meteor burns down to a pebble. The fine print scrolls: "results may fade". | **"Fast and bright still *burns out*."** |
| 05 | st8gameshow | 35 | funk | game show | "Who wants to text an *ex*?" | Gemini is in the hot seat, on a money-ladder of drafts. The lifelines: phone a friend (Sag answers: "don't"), 50:50 (the twin), ask the audience (the Aunties boo). Gemini locks in… | **"Final answer: *don't*."** |
| 06 | st8forecast | 25 | dreamy | weather report | "Today: 90% chance of *nostalgia*." | A weather map of the zodiac with "rose-tint fronts" rolling in over Taurus and Libra (Venus's signs, real). Taurus in a raincoat, flipping old photos. The forecaster zooms the radar into a rose-filtered cloud. | **"Nostalgia is a *filter*."** |
| 07 | st8museum | 35 | jazzy | museum audio tour | "Welcome to the Museum of *Exes*." | Cancer is the curator, with velvet ropes and plaques: "HOODIE, 2019, NEVER RETURNED", "PLAYLIST, STILL GOOD". At the gift shop exit, Cancer posts the hoodie back. | **"Keep the memory. Return the *hoodie*."** |
| 08 | st8court | 40 | cinematic | courtroom drama | "Venus vs. *Mars*. All rise." | Judge Saturn. The real history of the planets' namesakes as "evidence": in Greek myth Aphrodite and Ares were caught in Hephaestus's net (the Odyssey). Libra (Venus's sign) and Aries (Mars's sign) sit in the gallery, awkward: their rulers are exes. The verdict: no case. | **"Old love isn't *evidence*."** |
| 09 | st8karaoke | 30 | pop | karaoke night | "Pisces is singing *the* song." | Pixel lyrics with a bouncing ball. Pisces belts a breakup ballad about "u." Virgo, in the booth, live-edits the lyrics to be healthier ("~~come back~~ → be well"). The crowd's lighters are phone torches. | **"Sing it out. Don't *send* it."** |
| 10 | st8missing | 40 | screwed | true-crime podcast | "Venus has gone *missing*." | Podcast UI: waveform, "EP 10: THE DISAPPEARANCE". Scorpio and the Moon host. The real fact: mid-retrograde Venus passes between Earth and Sun and vanishes into the glare. A note is found: "taking space. back soon. ♀". | **"Space is okay when you *say* so."** |
| 11 | st8descent | 45 | cinematic | epic myth trailer | "Seven gates. One *goddess*." | Archive look (sepia, like season 6). The Sumerian Inanna, linked with Venus, passes seven gates into the underworld and leaves something at each (crown, necklace, robe…). "Some scholars link this to Venus vanishing." Venus, intercut, lets go of seven keepsakes from her exes. | **"You come back *lighter*."** |
| 12 | st8heist | 35 | synthwave | heist movie | "The *unfollow* heist." | Sag assembles a crew (Gemini on tech, Scorpio on recon, Aries as the muscle, the ghost as "the inside man") to unfollow an ex *without them noticing*. Blueprints, lasers, a countdown. Twist: Virgo walks in and just taps "unfollow". Silence. | **"Unfollowing is *allowed*."** |
| 13 | st8sitcom | 35 | funk | 90s sitcom | "Mars is *crashing* on our couch." | "LIVE STUDIO AUDIENCE", a laugh track and the "ooooh". Aries and Libra's apartment, with Mars as their surprise roommate (he rules Aries; Venus rules Libra). He keeps asking about Venus. A freeze-frame "♪ THEY'RE IN LOVE ♪" title card. | **"Our rulers' drama isn't *ours*."** |
| 14 | st8morning | 45 | dreamy | dawn reveal | "She's back. And she's *different*." | The real fact: Venus reappears in the *morning* sky as the Morning Star. The Moon finds her at dawn with a gold rim, and Venus goes to therapy with the Moon (couch, tissues). "I kept looking back. Now I'm up *early*." | **"Same star. *New* morning."** |
| 15 | st8comeback | 30 | house | sports commentary | "And he's going for the *I've changed*!" | Two commentator boxes (Leo and Sag), a play-by-play of Capricorn's ex's comeback attempt: the slow-mo replay, the telestrator circling "SAID" vs "SHOWN". The ref (Saturn) throws a flag. | **"Changed is *shown*, not said."** |
| 16 | st8noir | 35 | jazzy | film noir | "Someone liked a photo from *2021*." | Black and white with a rain overlay. Detective Scorpio in a typewriter voice-over box. Clues (a "deep like" at 2:14 AM) lead to… the Orbiter, again. Scorpio closes the case file and hits *block*: the case is closed and so is the door. | **"Case *closed*."** |
| 17 | st8auction | 25 | lofi | charity auction | "Going once… your ex's *hoodie*." | The Aunties run an auction of leftover keepsakes for charity, paddles up. A plaid shirt, a mixtape, a single sock. The gavel goes "SOLD to the ghost". | **"Let it *go*. Once."** |
| 18 | st8rebound | 30 | pop | rom-com montage | "Ophiuchus is in love. It's been *two days*." | A montage set to a pop song: Ophiuchus speed-dates the Meteor's cousin. The record scratches and the freeze-frame says "yep, that's me." The Moon offers tea. | **"Heal, *then* date."** |
| 19 | st8bossfight | 35 | synthwave | video game | "FINAL BOSS: *comparison*." | A pixel HUD (HP bars, combo meter). Virgo fights a boss shaped like the Comet's silhouette that shouts "your ex did it better!" Pisces is player 2. The power-up "SAY WHAT YOU NEED" wins; the boss dissolves. "LEVEL CLEAR". | **"Don't replay last season's *level*."** |
| 20 | st8confessional | 30 | pop | reality TV confessionals | "Who almost texted their ex? *Everyone*." | Rapid-fire confessional booths, each with a sign, a name lower third and one line: what they almost sent. Taurus: "a picture of soup." The final booth is Venus herself: "…i almost texted Mars." | **"Almost doesn't *count*. Phew."** |
| 21 | st8rewind | 40 | synthwave | sci-fi | "The twin built a *time machine*." | The twin tries to rewind to an ex. Retro (Mercury, season 4) warns: "i've been backwards. it's a rerun." The DeLorean-style pixel car hits 88 and lands… in the same argument. The twin drives forward instead. | **"The past is a *rerun*."** |
| 22 | st8rose | 45 | dreamy | space documentary | "Venus has been drawing a *rose*." | The real fact: over about eight years Venus's returns trace a five-petal pattern. A pixel-perfect animation of the rose drawing itself. Venus realises her loops made something beautiful because she *learned* each time. The Babylonians watched too (the Venus tablet). | **"Even your loops can make a *rose*."** |
| 23 | st8airport | 45 | cinematic | rom-com airport sprint | "Mars is running through the *airport*." | A classic sprint, in reverse: Mars races to win Venus back at the gate. Venus, glowing gold (the Morning Star), hears him out and chooses herself, kindly. They hug as friends. Phobos and Deimos cry. | **"I loved you. I *choose* me."** |
| 24 | st8direct | 35 | house | breaking news (bookend) | "BREAKING: Venus is going *forward*." | The same anchor desk as E01, now sunny. Venus stations direct. The exes leave: the Comet waves ("see you in about 76 years", the real Halley return), the Orbiter powers down and the Meteor is a pebble in a museum (E07's!). The ticker: "WEDDING INVITATIONS SPOTTED". | **"Forward looks *good* on you."** |
| 25 | st8wedding | 60 | cinematic | season finale (wedding) | "They *waited*. Today's the day." | Leo × Aquarius marry on the Houston rooftop, after Venus went direct, on purpose. Saturn officiates, the ghost is ring bearer, and Ophiuchus does the flowers. Pluto sends a card, Mars sends a respectful card and Venus gives the toast as the Morning Star. Vows callback lines from seasons 4 and 5. The bouquet flies, and the Moon catches it. | **"Choose *forward*. Together."** |

## Rules
- **Length:** each episode's length includes the 4.4 s end card.
- **Box lines:** 70 characters or fewer, each readable for at least 1.5 s after it finishes typing.
- **Hook card:** frame 0 must work as a thumbnail.
- **Hook gate:** each session renders frame 0 alone and checks it before anything else (`--sheet` at frame 0 or a still).
- **Pure f(t),** with no `document` at module top level. Never say "Align" in the frames just before the end card.
- **Tone:** big comedy, never cruel. Exes are funny, not villains; everyone gets a kind exit.
- **Process** as in STARTALK3.md:
  - contact sheets with `--sheet --rate=4` (`--rate=2` at 45 s or more), looked at critically and fixed, at least two passes;
  - `teaser-sound.mjs` must run;
  - one commit per episode.
