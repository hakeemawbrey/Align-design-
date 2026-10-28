# Star Talk, season 7: "Sign to Sign" (12 vertical episodes, 20–90 s)

The user asked: "the next series after that is the zodiacs talking to each other, interacting with each other 1:1 or more… it isn't just lesson, it's getting personal and there's a lot of history and things to learn with astrology. Can be any length but make variety."

**The signs talk to each other.** These are one-to-one conversations and small groups, with no narrator lecture. They are built on real connections between signs: shared myths, sky geometry (opposites, equinoxes, solstices, the four royal stars) and their season 4/5 relationships. It's personal, funny and full of real astrology history.

Read first:
- STARTALK.md and STARTALK3.md: the look and tone.
- STARTALK5.md, STARTALK6.md and STARTALK7.md: the canon and how each sign was profiled in season 6.
- Shared modules (never edit): startalk.js, lesson.js, stlore.js, st5cast.js, cardfx.js, endcard.js, sky.js.

## Format
- **Mostly dialogue.** Two or more dialogue boxes trade lines, each with the speaker's sign-coloured name tag.
- **Settings** change per episode: a late-night phone call (split screen), a diner booth, a rooftop, a therapy couch, a group chat, a campfire, a road trip, a sleepover.
- **Facts** are woven into the talk, not lectured. A small "SKY NOTE" chip can pop up to footnote a real fact.
- **Last line:** Inter 800 with a Garamond accent, spoken by one of them.
- **Every episode also has:**
  - `cardFrame({ numeral: 'S7 E0N' })`
  - one ghost cameo, recorded in `lore.json`
  - the faint finished constellation
  - `cta: 'SIGN UP TO VOTE YOUR CITY'`

## Accuracy rules
Same as STARTALK7.md: myths attributed and hedged where versions differ, real astronomy, correct rulers, and no compatibility verdicts stated as fact.

## The twelve
| EP | folder | len | music | who · where | the conversation (real hooks) | last line |
|---|---|---|---|---|---|---|
| 01 | st7claws | 45 | dreamy | Libra × Scorpio · a diner booth | The Greeks saw Libra's stars as Scorpius's claws, and their star names still mean "claw". SCORPIO: "you were literally *part of me*." LIBRA: "and i chose to be my own thing." It's an awkward, sweet ex-friends-to-friends talk about growing into yourself. | **"We can be *close* without being one."** |
| 02 | st7heracles | 60 | funk | Cancer × Leo · a support group of two | Both were monsters Heracles fought: Hera's crab and the Nemean lion. They bond over being cast as villains in someone else's story. LEO: "he wore my *coat* for the rest of his life." CANCER: "he stepped on me. *mid-fight*." | **"We're not side characters. We're the *sky*."** |
| 03 | st7typhon | 30 | jazzy | Capricorn × Pisces · a late-night phone call | Both fled the monster Typhon by turning into fish: Pan the sea-goat and Aphrodite and Eros as two fish. CAPRICORN: "so you panicked into a fish too?" PISCES: "*two* fish. we're holding hands." | **"Same scare. *Different* fish."** |
| 04 | st7equinox | 45 | house | Aries × Libra · the couple, on a seesaw | The equinox signs: the March equinox (Aries) and the September one (Libra), when day and night are equal. The seesaw only balances when both move. The S4 couple, now in a real fight about pace. | **"Balance takes *both* of us moving."** |
| 05 | st7solstice | 60 | cinematic | Cancer × Capricorn · moving day, year one | The solstice signs, with the Tropic of Cancer and the Tropic of Capricorn as the two edges of the Sun's reach. The longest day and the longest night. They argue about whose holidays they spend where. CANCER: "you're the longest night." CAPRICORN: "and you still *stayed*." | **"Opposite seasons. *Same* house."** |
| 06 | st7royals | 90 | cinematic | Taurus · Leo · Scorpio · Aquarius · a royal summit | The four fixed signs and the old "royal stars" of Persian lore: Aldebaran (Taurus), Regulus (Leo), Antares (Scorpio) and Fomalhaut (near Aquarius). Four stubborn rulers try to agree on one thing: where to eat. The real topic is how to be stubborn and in love at the same time. | **"Fixed doesn't mean *stuck*."** |
| 07 | st7twins | 20 | pop | Gemini × the twin · bunk beds | A quick, funny, tender talk after the season 5 prank. Pollux shared immortality with Castor in the myth. TWIN: "sorry for the text." GEMINI: "you'd give me half your *forever*. i know." | **"Half of forever is still *forever*."** |
| 08 | st7archer | 45 | synthwave | Sagittarius × Scorpio · a standoff that becomes a heart-to-heart | In the sky, the Archer's arrow points toward Antares, the Scorpion's heart; one story says it's there to guard Orion. SAG: "i was told to aim at your heart." SCORPIO: "people usually do." They lower their guards. | **"Lower the bow. *Talk*."** |
| 09 | st7ruler | 30 | lofi | Gemini × Virgo · a group chat | Both are ruled by Mercury: Gemini (air) talks fast, Virgo (earth) edits everything. They co-write one text for a friend: ten drafts, then one perfect, kind sentence. (A callback to starmercury.) | **"Same ruler. *Your* voice."** |
| 10 | st7opposites | 75 | dreamy | Virgo × Pisces · a long walk | The opposite signs: the harvest and the sea, the list and the dream. Their first real fight, then a repair. A real fact surfaces: opposite signs sit across the sky from each other, so when the Sun is in Pisces, Virgo's stars are up all night. Healthy conflict, done right. | **"Different maps. *Same* walk home."** |
| 11 | st7cardinals | 60 | house | Aries · Cancer · Libra · Capricorn · a "season starters" meeting | The four cardinal signs each start a season (the equinoxes and solstices). They're natural starters who struggle to finish things, and they try to plan a group trip together. Personal confessions about burnout. | **"Starting is easy. *Stay* for the middle."** |
| 12 | st7campfire | 90 | dreamy | All twelve, plus Ophiuchus · a campfire | The season finale. Each sign says one true thing it has never told the others, each line short. Ophiuchus finally gets a seat in the circle. The Babylonians divided the zodiac into twelve equal parts about 2,500 years ago, which makes this a very old family. | **"Twelve signs. One *sky*. Pull up a log."** |

## Rules
Same as STARTALK7.md:
- Length includes the 4.4 s end card.
- Box lines are 70 characters or fewer, each readable for at least 1.5 s.
- Pure f(t), never "Align" just before the end card, the polish loop and sound, and one commit per episode.
- Dialogue episodes must make it obvious who's talking (name tag colour plus a speaking hop).
