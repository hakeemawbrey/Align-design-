# Star Talk, season 5: "Star-Crossed" (10 vertical episodes, 30–45 s)

The user asked: "Let's do season 5 let's add more drama and craziest plot lines and love stories. Let's start with 10 videos."

**Season 5 is a soap opera.** Ten linked episodes with big twists, an outsider who crashes the zodiac, an ex who got demoted, a secret twin, a black hole that eats unsent texts and a proposal. Every episode ends on a cliffhanger. Under all of the drama, the advice stays healthy and the astrology stays real.

Read first:
- STARTALK.md and STARTALK3.md: the look, the shared `startalk.js`, the dialogue box, the end card, the card cuts and the tone rules.
- STARTALK5.md: the season 4 canon this continues. The six couples:
  - Aries × Libra
  - Taurus × Scorpio
  - Gemini × Sagittarius
  - Cancer × Capricorn
  - Leo × Aquarius (made it official in EP 099)
  - Virgo × Pisces
- The recurring characters: Retro, Saturn, the Moon, Venus, the ghost and the Aunties.
- Shared modules (never edit them): startalk.js, cardfx.js, endcard.js, sky.js, lesson.js and stlore.js.

## The season's devices
- **Soap-opera framing:**
  - A title sting at the top: "★ STAR-CROSSED ★" in Space Mono gold, with "EPISODE N".
  - Dramatic zooms on gasping stars, with wide eyes.
  - A cliffhanger tag right before the end card: "NEXT TIME ON STAR-CROSSED…", followed by a one-line tease.
  - The season's music leans cinematic and dreamy, with a stinger on each twist.
- **Lesson:** each episode has one ★ LESSON UNLOCKED beat, using `buildLesson` / `lessonCues` from lesson.js.
- **Easter eggs:**
  - The ghost still hides in every episode, via `drawGhostCameo` from stlore.js, plus `lore.json`.
  - `cardFrame({ numeral: 'S5 E0N' })`.
  - The finished seed-of-life constellation (`drawSeedConstellation(ctx, t, 100)`) stays faintly in the top-left sky in every episode: season 4 completed it.
- **End-card line:** `cta: 'SIGN UP TO VOTE YOUR CITY'`.

## The new characters (draw them in the startalk.js pixel style)
- **Ophiuchus.** A glittery, flirty newcomer star with a pixel serpent coiled on a staff, who claims to be "the 13th sign."
  - The astrology is real and stays real: Ophiuchus is a constellation that the Sun's path crosses. It is not a sign in the tropical zodiac, which has 12 signs.
  - It is lonely, not evil.
- **Pluto.** A tiny, grumpy grey pixel planet with a little crown that's slipping off. Its line is "I'm still a planet to ME."
  - The facts: Pluto was reclassified as a dwarf planet in 2006. In modern astrology it rules Scorpio, which makes it Scorpio's dramatic ex.
- **The twin.** Gemini's mischievous twin, drawn identical but with a pixel mustache. The Gemini myth really is twins: Castor and Pollux.
- **The black hole.** A swirling pixel void that slurps up text bubbles.

## The ten
| EP | folder | len | music | the episode | lesson / last line |
|---|---|---|---|---|---|
| 01 | st5thirteenth | 40 | cinematic | **"There's a *13th sign*?!"** A sparkle storm, then Ophiuchus bursts into the zodiac's group photo. Eleven stars swoon; Saturn squints. OPHIUCHUS: "hi. i'm new. i'm *special*." THE STARS: "new and special are not the same as *true*." CLIFFHANGER: Ophiuchus winks at Aquarius… and Leo sees it. | LESSON: "Charm isn't *character*." · last: **"New isn't always *true*."** |
| 02 | st5taken | 35 | dreamy | **"Ophiuchus slides into *Aquarius's* DMs."** A phone floods with hearts. Leo paces. AQUARIUS replies, calm: "flattered. i'm taken." OPHIUCHUS: "…for now?" AQUARIUS: "for *real*." THE STARS: "a clear no is a kindness." CLIFFHANGER: far away, a tiny grey planet watches Scorpio's photos. | LESSON: "A clear no is *kind*." · last: **"Taken means *taken*."** |
| 03 | st5pluto | 40 | screwed | **"The ex who got *demoted*."** Pluto rolls in with its crown slipping: "I'M STILL A PLANET TO ME." It ruled Scorpio once and wants it back. Taurus stands steady beside Scorpio. SCORPIO: "you rule my *chart*, not my *choices*." THE STARS: "closure is something you give yourself." CLIFFHANGER: Pluto mutters "fine… but i know a black hole." | LESSON: "Closure is *yours* to give." · last: **"Your ex isn't your *ruler*."** |
| 04 | st5twins | 35 | pop | **"Gemini has a *twin*?!"** Sagittarius gets a text from "Gemini": "we should see other people." Sag's eyes shatter. Then a second Gemini pops up, the one with the mustache: the twin (Castor and Pollux are real). GEMINI: "that wasn't me!!" THE STARS: "if a text doesn't sound like them, ask them." CLIFFHANGER: the twin waves at Ophiuchus. They're working together. | LESSON: "Ask, don't *assume*." · last: **"Check before you *wreck*."** |
| 05 | st5eclipse | 40 | dreamy | **"The Sun and the Moon have a *secret*."** It's a total eclipse, and everything goes dark: the Sun and Moon only "meet" when the Moon passes in front of the Sun. The two of them blush in the corona. MOON: "we only see each other at eclipses." SUN: "what if we didn't *wait*?" THE STARS: "love doesn't run on rare events. put it on the calendar." CLIFFHANGER: in the dark, someone stole Leo's ring box. | LESSON: "Love needs a *schedule*." · last: **"Don't wait for an *eclipse*."** |
| 06 | st5amnesia | 35 | screwed | **"Retro has *amnesia*."** Mercury goes retrograde and Retro forgets everything it learned in season 4: it's drafting "u up?" to everyone's exes again. The stars hold an intervention with a scrapbook of its season 4 apology. RETRO: "…i said *that*?" THE STARS: "write down what you learned so you don't relearn it." CLIFFHANGER: the scrapbook's last page holds a photo of Leo's missing ring box, in Ophiuchus's hands. | LESSON: "Write down what you *learned*." · last: **"Remember the *lesson*."** |
| 07 | st5objection | 40 | cinematic | **"The *proposal*… interrupted."** Leo gets the ring back and kneels on a Houston rooftop. Ophiuchus bursts in: "I OBJECT!" Everyone points out it isn't a wedding. Saturn reads from a rulebook: "nobody gets a vote on a couple except the *couple*." Aquarius takes Leo's hand. CLIFFHANGER: before Aquarius can answer, the sky starts *swirling*. | LESSON: "Only two *votes* count." · last: **"Your love, your *call*."** |
| 08 | st5reveal | 45 | cinematic | **"Who *is* Ophiuchus?"** Saturn shows the real map: the Sun passes through Ophiuchus's constellation, but the zodiac has 12 signs. Ophiuchus deflates: "i just wanted to *belong* somewhere." The stars soften, and Aquarius (the friend sign) offers a seat at the table. THE STARS: "you don't need a title to be worth loving." CLIFFHANGER: the swirl overhead is a black hole, and it's growing. | LESSON: "You don't need a *title*." · last: **"Everyone deserves a *seat*."** |
| 09 | st5blackhole | 45 | cinematic | **"The *black hole*."** Pluto's black hole slurps up every star's UNSENT texts: "i miss you", "i'm sorry", "i'm proud of you", "i love you". The only way out is to say them out loud. One by one the stars do: Pisces to Virgo, Cancer to Capricorn, even Pluto to Scorpio ("…i'm happy for you"). The black hole shrinks to a dot. THE STARS: "say it while you can." CLIFFHANGER: Leo turns to Aquarius. "so… about that question." | LESSON: "Say it *before* it's gone." · last: **"Unsent is *unsaid*."** |
| 10 | st5finale | 45 | dreamy | **"*Star-crossed*."** It's the season finale on the rooftop, with the whole cast and the Aunties crying. Leo asks again. AQUARIUS: "yes. *slowly*." They get engaged with no rush. Ophiuchus gets its first blind date (card first, face last), Pluto and Scorpio part on good terms, and the ghost catches the bouquet. THE STARS: "the best love stories are *chosen*, every day." CLIFFHANGER: "NEXT SEASON: Venus goes retrograde… and *everyone's* exes come back." | LESSON: "Love is chosen *daily*." · last: **"To be *continued*…"** |

## Rules
- **Length:** 30–45 s including the 4.4 s end card.
- **Drama and dialogue:** the drama is big but never cruel. Nobody is humiliated, and the outsiders (Ophiuchus, Pluto) get redemption.
- **The lesson** is healthy every time.
- **Box lines:** 70 characters or fewer, each readable for at least 1.5 s after it finishes typing.
- **Pure f(t),** with no `document` at module top level. Never say "Align" in the frames just before the end card.
- **Polish loop and sound** as in STARTALK3.md:
  - contact sheets with `--sheet --rate=4`, looked at critically and fixed;
  - `teaser-sound.mjs` must run;
  - one commit per film.
