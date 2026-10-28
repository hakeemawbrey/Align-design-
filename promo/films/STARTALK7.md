# Star Talk, season 6: "Behind the Sign" (12 vertical episodes, 30–90 s)

The user asked: "a series learning the background history and what's going on with each of the zodiacs, we spend [time] with just 1 sign… now it isn't just lesson, it's getting personal and there's a lot of history and things to learn with astrology. Can be any length but make variety."

**One sign per episode.** It's a documentary-style profile, a gentle parody of a music-biopic special. The sign's star sits for an interview and tells its own story: where its myth comes from, what is really up there in the sky, and what it's actually like to be this sign in love, including the insecure part it doesn't post about. It's warm, funny, a little vulnerable and true.

Read first:
- STARTALK.md and STARTALK3.md: the look, the dialogue box, the end card, the card cuts and the tone.
- STARTALK5.md and STARTALK6.md: the canon (the six couples, Saturn, the ghost and the rest).
- Shared modules (never edit): startalk.js, lesson.js, stlore.js, st5cast.js, cardfx.js, endcard.js, sky.js.

## The format (every episode)
1. **Cold open.** A one-line hook spoken by the sign.
2. **Title card:** "BEHIND THE SIGN" in Space Mono gold, then the glyph and name huge in Inter 800 with a Garamond italic accent. Below it, a fact strip: element · modality · ruler · symbol · dates.
3. **The myth.** An "archive footage" look: the sky in sepia/duotone, pixel figures acting out the Greek myth, with a narrator box ("THE STARS").
4. **The sky.** A real star map of the constellation, its stars drawn as pixel stars with lines between them. Name the brightest star and one real thing in it (see the facts per sign).
5. **The personal part.** The sign's star talks to camera in a soft spotlight: its love language, its fear, what people get wrong about it, and what it wishes someone would ask it. Its season 4/5 partner can appear in a cutaway.
6. **The takeaway.** One line in the sign's own voice (Inter 800 with a Garamond accent). It can be tender, not a lesson banner. Use ★ LESSON UNLOCKED only if it fits.
7. **End card:** `cta: 'SIGN UP TO VOTE YOUR CITY'`.

Also in every episode:
- `cardFrame({ numeral: 'S6 E0N' })`
- one `drawGhostCameo`, recorded in `lore.json`
- the faint finished constellation from stlore.js

## Accuracy rules (strict)
- Mythology as commonly told, attributed: "in Greek myth…", "the Babylonians called it…". Where versions differ, say "one story says".
- Astronomy that is real:
  - star names and the brightest stars;
  - clusters;
  - precession: the March equinox point is now in Pisces, not Aries;
  - the constellations are not the same as the signs, which are 30° slices of the tropical zodiac.
- Rulers: traditional, with modern where relevant (Uranus 1781, Neptune 1846, Pluto 1930).
- No invented statistics, no "most/least compatible" claims as fact, and no fortune-telling. Personal traits are framed as how the sign is described in astrology.

## The twelve (variety of lengths)
| EP | folder | len | music | myth / sky / personal (all factual items are real) | takeaway |
|---|---|---|---|---|---|
| 01 | st6aries | 45 | synthwave | **Myth:** the golden ram that flew Phrixus and Helle to safety, whose fleece became the Golden Fleece Jason sailed for. **Sky:** Hamal is its brightest star. Aries starts the zodiac at the March equinox, though precession has moved that point into Pisces ("i'm still first. emotionally."). **Personal:** "people think i'm angry. i'm just *early*." Its fear: being too much. | **"I go first so you don't have to be *scared*."** |
| 02 | st6taurus | 60 | lofi | **Myth:** Zeus became a white bull and carried Europa across the sea to Crete. **Sky:** Aldebaran, the bull's red eye; the Pleiades and the Hyades clusters ride on its back. **Personal:** "i'm slow because i'm *sure*." It loves through food and touch, and it's scared of change it didn't choose. | **"I don't rush. I *stay*."** |
| 03 | st6gemini | 30 | pop | **Myth:** Castor and Pollux. When mortal Castor died, Pollux shared his immortality so they could stay together. **Sky:** the two bright stars named after them. **Personal:** "everyone thinks i'm two-faced. i'm two-*hearted*." Its fear: being boring. | **"Talk to *both* of me."** |
| 04 | st6cancer | 45 | dreamy | **Myth:** Hera sent a crab to pinch Heracles while he fought the Hydra; he crushed it, and Hera put it in the sky. **Sky:** the Beehive Cluster (Praesepe). The Tropic of Cancer was named when the June-solstice Sun stood in Cancer, about 2,000 years ago. **Personal:** "the shell isn't to keep you out. it's because i feel *everything*." Ruled by the Moon. | **"Be gentle. I *remember*."** |
| 05 | st6leo | 60 | funk | **Myth:** the Nemean lion, Heracles' first labour, whose hide no weapon could pierce. **Sky:** Regulus, the "little king", at the lion's heart. Ruled by the Sun. **Personal:** "the spotlight's warm, but it's *lonely* up here." It wants to be seen for its heart, not its hair. Aquarius cutaway: "it cried at my exhibit." | **"Clap for me. Then *stay* after the show."** |
| 06 | st6virgo | 90 | jazzy | **Myth:** often told as Astraea, the goddess of justice and the last immortal to leave Earth; also linked to Demeter and the harvest. **Sky:** Spica, the ear of wheat in her hand. Virgo is the largest zodiac constellation. **Personal:** "i fix things because if it's perfect, nobody *leaves*." The checklist from season 3 comes back with one new item: "let them see me tired." Pisces cutaway. This is the long, tender one. | **"I'm not a project either. *Love* me unfinished."** |
| 07 | st6libra | 30 | dreamy | **Myth / sky:** the only zodiac sign that's an object, not a creature. The Greeks saw its stars as the Scorpion's claws; their names still mean "southern claw" and "northern claw". Linked to Astraea's scales and the September equinox, when day and night balance. **Personal:** "i'm not indecisive. i'm *afraid* of choosing wrong." | **"Pick me *back*."** |
| 08 | st6scorpio | 60 | screwed | **Myth:** the scorpion sent to stop Orion, placed across the sky from him, so Orion sets as Scorpius rises. **Sky:** Antares, the red supergiant whose name means "rival of Mars". Ruled by Mars traditionally and Pluto in modern astrology (Pluto cameo, now on good terms). **Personal:** "i read everything because i've been *lied* to." Taurus cutaway. | **"Earn it once. Then I'm *yours*."** |
| 09 | st6sag | 45 | house | **Myth:** a centaur archer, often linked to Chiron, the wise healer-teacher. **Sky:** the "Teapot" asterism; the centre of our galaxy, the Milky Way, lies in the direction of Sagittarius. Ruled by Jupiter. **Personal:** "i leave first so i'm never *left*." Gemini cutaway: "it unpacked for me." | **"I'm learning to *land*."** |
| 10 | st6capricorn | 60 | cinematic | **Myth:** the sea-goat. One story says Pan jumped into a river fleeing the monster Typhon and turned half-fish; the goat-fish goes back to Babylon's god Ea. One of the oldest constellations. **Sky:** the Tropic of Capricorn (named for the December solstice Sun). Ruled by Saturn (cameo with glasses). **Personal:** "i work because rest feels like *waiting* to be judged." The free Friday comes back. | **"Rest is *earned* already."** |
| 11 | st6aquarius | 45 | synthwave | **Myth:** Ganymede, the cupbearer of the gods. The Babylonians saw "the Great One" pouring water. **Sky:** a faint constellation; Uranus, its modern ruler, was discovered in 1781, and Saturn is its traditional ruler. **Personal:** "i'm not cold. i'm *buffering*." The headphones are about overwhelm, not distance. Leo cutaway (engaged in season 5). | **"Weird and *wanted*. Still both."** (a callback to season 4) |
| 12 | st6pisces | 75 | dreamy | **Myth:** Aphrodite and Eros became two fish tied by a cord to escape Typhon, so they wouldn't lose each other. **Sky:** precession has moved the March equinox point into Pisces, hence the "Age of Aquarius" talk to come. Neptune (found in 1846) is its modern ruler and Jupiter its traditional one. **Personal:** "i daydream because real life was *loud*." The two cats from season 4 come back. Virgo cutaway. The season closes on all twelve stars in the sky. | **"Tie a cord. *Don't* let go."** |

## Rules
- **Length:** each episode's length includes the 4.4 s end card.
- **Box lines:** 70 characters or fewer, each readable for at least 1.5 s after it finishes typing.
- **Myth beats:** they must read clearly in pixel art. Keep them to two or three simple tableaux, not full scenes.
- **Constellation maps:** star positions should look like the real constellation's shape (use a simplified real pattern), with the brightest star labelled.
- **Tone:** personal, never mean; the vulnerable bits are kind.
- **Pure f(t),** with no `document` at module top level. Never say "Align" in the frames just before the end card.
- **Process** as in STARTALK3.md:
  - contact-sheet passes with `--sheet --rate=4`, looked at critically and fixed;
  - `teaser-sound.mjs` must run;
  - one commit per episode.
