# Star Talk, season 9: "A Day in the Life" (60 vertical episodes, 5 per sign, 20–35 s)

The user asked: "more about getting to know each sign and what they do day in life, like 5 per zodiac."

**The format.** A pixel parody of the vertical day-in-the-life vlog. Each sign gets five episodes, which follow one day:

| slot | suffix | what | length |
|---|---|---|---|
| 1 | `am` | **MORNING**: the alarm, the routine, getting ready | 20–25 s |
| 2 | `work` | **9 TO 5**: at work or school | 25 s |
| 3 | `love` | **DATE NIGHT**: how this sign flirts, dates and loves | 30 s |
| 4 | `crew` | **THE CREW**: friends, the group chat, the weekend | 25 s |
| 5 | `3am` | **3 AM**: alone, the soft part they don't post | 30–35 s |

Folders: `st9<sign><suffix>`, where `<sign>` is aries, taurus, gemini, cancer, leo, virgo, libra, scorpio, sag, cap, aqua or pisces. For example `st9ariesam`, `st9taurus3am` and `st9capwork`.

**Release order:** one sign a day, all five of its episodes, Aries → Pisces. The episode number runs 01–60 in that order: Aries is E01–05, Taurus E06–10, and so on.

Read first:
- STARTALK9.md: **the hook rules** (all seven apply here too). Every episode opens on a "POV:" style hook in frame 0.
- STARTALK.md and STARTALK3.md: the look and the contract.
- STARTALK7.md: each sign's season-6 profile. Stay consistent with its fears and love languages.
- STARTALK5.md and STARTALK6.md: the canon couples and the cast.
- Shared modules (never edit): startalk.js, lesson.js, stlore.js, st5cast.js, cardfx.js, endcard.js, sky.js.

## The vlog chrome (st9day.js)
The Aries session owns `promo/films/st9day.js` and pushes it first, as its own commit: "st9day: season 9 vlog chrome". Every function is pure f(t), with the API in a copy-paste header.

- **Recording frame.** `drawRecFrame(ctx, t, { rec = true, battery = 0.8, x0, y0 })` draws thin white viewfinder corner brackets, a blinking red "● REC" dot and a pixel battery icon. Keep it clear of the cardFrame corners and the type.
- **Clock.** `drawClock(ctx, t, { from: '7:02', to: '7:40', at, dur, ampm: 'AM', x = 540, y = 150 })` shows a big Space Mono in-world clock that fast-forwards between two times over `dur` (the minutes roll). It also has a small "DAY IN THE LIFE OF A ♈ ARIES" eyebrow beneath.
- **Timestamp captions.** `stampCaption(root, { at, out, time: '7:05 AM', text, top })` is the vlog's timestamped lower caption, for example "7:05 AM — already did a workout". It uses Inter 600 on a translucent ink pill.
- **Hook.** `hookPOV(root, { text, at = 0, out, top = 260 })` is the frame-0 hook ("POV: …" or "a day in the life of…"). It is on screen at frame 0 with no type-on (same rule as season 8's hookCard). `hookPOVCues(at, { key })` adds the sound.
- **Sky.** `daySky(ctx, t, { hour })` tints the sky by the in-world hour:
  - dawn is peach;
  - noon is pale blue with dimmer stars;
  - dusk is violet-pink;
  - 3 AM is deep indigo with every star out.

  Draw it over sky.js's drawSky with alpha.
- **Fact chip.** `factChip(ctx, t, { text, at, dur = 2.4, x, y, color })` is a small "★ REAL SKY" or "★ ASTROLOGY SAYS" chip: the facts footnote.
- **Phone screen.** `phoneScreen(ctx, t, { x, y, w, h, lines: [{ from, text, at }], app = 'chat' })` is a pixel phone UI for texts, notifications and the group chat ('chat' | 'notes' | 'alarm' | 'map' | 'playlist').

## The sign's home (set continuity)
Each sign has **one home**, drawn once in `promo/films/st9<sign>home.js` and reused by its five episodes. Its rooms are a bedroom, a kitchen, a desk and a window view. Each home has:
- its colour palette;
- three recurring props, for example Taurus's houseplants, Virgo's label maker and Sag's packed backpack;
- one tiny change per episode that rewards bingeing. A plant grows, a calendar page turns, and in the 3 AM episode the same room is dark.

The sign's season 4/5 partner can visit in `love`, and its element-mates in `crew`.

## Framing rules (strict)
- **Traits are "how astrology describes" the sign, never facts about real people.** The tone is affectionate roasting: every joke lands on a lovable trait, never a mean one.
- **Every episode carries one real fact**, as a factChip or a line. Use the rows below. If unsure, leave it out.
- **Body rulerships** are "in traditional astrology, X rules the …".
- **Houses** are "X is the natural ruler of the Nth house (…)".
- **Rulers are correct:** traditional, plus modern where given (Uranus found 1781, Neptune 1846, Pluto 1930).
- **No compatibility verdicts and no fortune-telling.**
- **Every last line is warm and healthy.** The 3 AM episode is gentle and ends with care, never despair.

## The sixty
Each sign row gives its basics, then each episode's hook (frame 0), its beats with the real fact, and the **last line**. The music is the sign's for all five episodes; vary key and seed per episode.

### ♈ Aries · fire · cardinal · Mars · the ram · Mar 21 – Apr 19 · music synthwave (E01–05)
| suffix | hook | beats + fact | last line |
|---|---|---|---|
| am | "POV: an Aries' alarm goes *off*." | Already up and already did a workout. It speed-runs the morning with a stopwatch HUD and eats breakfast standing up, then sits down. **Fact:** in traditional astrology Aries rules the head, hence "headfirst". | **"Start fast. *Eat* first."** |
| work | "An Aries in a meeting that could've been an *email*." | It volunteers first, starts three projects and finishes one, with a progress-bar gag. **Fact:** Aries is cardinal, a "starter" sign, and the natural ruler of the 1st house (self, first impressions). | **"First in. *Finish* one."** |
| love | "How an Aries flirts: a *speedrun*." | It asks Libra out in four seconds flat (a timer), then waits patiently while Libra decides (season 6 canon). **Fact:** Aries is ruled by Mars, named for the Roman god of war. | **"Bold is *sweet*, actually."** |
| crew | "Never challenge an Aries to *anything*." | Mini-golf with Leo and Sag (the fire trio). A trash-talk HUD, then Aries loses and laughs. **Fact:** the fire signs are Aries, Leo and Sagittarius. | **"Win the game. *Keep* the friends."** |
| 3am | "What an Aries thinks about at *3 AM*." | The same room, dark. It replays an argument and worries it was "too much". It drafts an apology and sends it in the *morning*. **Fact:** in Greek myth, the golden ram's fleece became the Golden Fleece. | **"Even rams need *rest*."** |

### ♉ Taurus · earth · fixed · Venus · the bull · Apr 20 – May 20 · music lofi (E06–10)
| suffix | hook | beats + fact | last line |
|---|---|---|---|
| am | "POV: a Taurus' *14-step* morning." | Snooze ×3, robe, a coffee ritual, watering the plants and a record on, with a step counter. **Fact:** in traditional astrology Taurus rules the throat and neck, which is why the voice and singing come up so often. | **"Slow mornings are *self-respect*."** |
| work | "A Taurus when the plan *changes*." | A calm, steady worker; a surprise meeting ruins the sacred lunch; it adapts, slowly. **Fact:** Taurus is the natural ruler of the 2nd house (money, possessions, values). | **"Steady *pays*."** |
| love | "How a Taurus says *I love you*." | It cooks for Scorpio, lights candles and holds hands. "It took me months to decide. Now I'm sure." **Fact:** Taurus is ruled by Venus. | **"Love you *slowly*. On purpose."** |
| crew | "Never ask a Taurus out after *8 PM*." | It hosts dinner instead, with Virgo and Capricorn (the earth trio) at the table. **Fact:** the Pleiades star cluster rides on the Bull's back. | **"Come over. I'll *cook*."** |
| 3am | "A Taurus at 3 AM, *wide* awake." | Fear of a change it didn't choose. It holds a houseplant and talks to it. **Fact:** Aldebaran, the Bull's red eye. | **"Change can be *cozy*, too."** |

### ♊ Gemini · air · mutable · Mercury · the twins · May 21 – Jun 20 · music pop (E11–15)
| suffix | hook | beats + fact | last line |
|---|---|---|---|
| am | "POV: a Gemini's brain at 7 AM: *47* tabs." | Browser tabs fill the sky; it brushes its teeth while texting three people. **Fact:** Gemini is ruled by Mercury, the messenger. | **"One tab at a *time*."** |
| work | "A Gemini explaining their *six* side hustles." | A pitch-deck gag. **Fact:** Gemini is the natural ruler of the 3rd house (communication, siblings, short trips). | **"Curious is a *superpower*."** |
| love | "Dating a Gemini: you'll *never* be bored." | Voice notes, debates and trivia with Sagittarius; it finally listens for a full minute (a timer). **Fact:** the bright stars Castor and Pollux are the twins' heads. | **"Talk to me. *Then* listen."** |
| crew | "A Gemini at a party knows *everyone*." | Butterfly-pinball across the room, then a real talk with one friend in the kitchen. **Fact:** in traditional astrology Gemini rules the arms and hands, so yes, it talks with its hands. | **"Know everyone. *Close* to a few."** |
| 3am | "Which twin is up at *3 AM*?" | Both, on bunk beds (the twin cameo). Fear of being boring. **Fact:** in Greek myth Pollux shared his immortality with Castor. | **"Both of me are *real*."** |

### ♋ Cancer · water · cardinal · the Moon · the crab · Jun 21 – Jul 22 · music dreamy (E16–20)
| suffix | hook | beats + fact | last line |
|---|---|---|---|
| am | "POV: a Cancer checks on everyone before *8 AM*." | Good-morning texts ×12 and soup for a sick friend, and it forgets its own breakfast. **Fact:** Cancer is ruled by the Moon. | **"Check on *you*, too."** |
| work | "A Cancer is the office *mom*." | The snack drawer, birthday cards for everyone, and a little cry in the supply closet that's fine. **Fact:** Cancer is cardinal; the June solstice Sun once stood in Cancer, hence the Tropic of Cancer. | **"Care is work. *Count* it."** |
| love | "A Cancer remembers what you said in *2019*." | A shoebox of keepsakes; it surprises Capricorn with his childhood snack. **Fact:** Cancer is the natural ruler of the 4th house (home, family, roots). | **"Remembered means *loved*."** |
| crew | "A Cancer's home is *everyone's* home." | Blanket-fort movie night with Scorpio and Pisces (the water trio). **Fact:** the Beehive Cluster (Praesepe) sits in Cancer. | **"Home is *who*, not where."** |
| 3am | "What a Cancer feels at 3 AM: *everything*." | Moon phases cycle in the window as its mood changes. **Fact:** the Moon runs through its phases in about a month. | **"Moods have *phases*. So do you."** |

### ♌ Leo · fire · fixed · the Sun · the lion · Jul 23 – Aug 22 · music funk (E21–25)
| suffix | hook | beats + fact | last line |
|---|---|---|---|
| am | "POV: a Leo's morning *lighting* check." | A ring light, a hair flip and a mirror pep talk with applause SFX. **Fact:** Leo is ruled by the Sun. | **"Shine *for* yourself first."** |
| work | "A Leo presents the report like it's the *Oscars*." | Spotlight, then a "thank you to my team" speech that actually names everyone. **Fact:** Leo is the natural ruler of the 5th house (creativity, play, romance). | **"Lead *warm*."** |
| love | "A Leo in love is a whole *parade*." | Wedding planning with Aquarius, a confetti budget and Aquarius's "smaller?". **Fact:** in traditional astrology Leo rules the heart. | **"Big love. *Loyal* love."** |
| crew | "A Leo hypes every friend like a *headliner*." | Front row at Sag's open mic with a giant sign. **Fact:** Regulus, the "little king", is the lion's heart star. | **"Your friends are *stars*, too."** |
| 3am | "A Leo at 3 AM: *did* they like me?" | The ring light is off. The fear: being loved for the show. **Fact:** in Greek myth, the Nemean lion. | **"You're loved *offstage*."** |

### ♍ Virgo · earth · mutable · Mercury · the maiden · Aug 23 – Sep 22 · music jazzy (E26–30)
| suffix | hook | beats + fact | last line |
|---|---|---|---|
| am | "POV: a Virgo's to-do list has a *to-do* list." | A label maker, colour-coded everything and nested checklists. **Fact:** Virgo is ruled by Mercury too (like Gemini). | **"Done is *enough*."** |
| work | "A Virgo found the typo in your email from *2021*." | A red pen and zoom-in, then it fixes it kindly and quietly. **Fact:** Virgo is the natural ruler of the 6th house (daily work, health, routines). | **"Help. Don't *audit*."** |
| love | "A Virgo's love language: fixing your *calendar*." | It organises Pisces' life; Pisces makes Virgo's day *un*-scheduled. **Fact:** Spica, the ear of wheat in the maiden's hand. | **"Let them *help* you back."** |
| crew | "A Virgo planned the group trip *to the minute*." | A laminated itinerary, then Sag reroutes; Virgo laughs. **Fact:** Virgo is the largest zodiac constellation. | **"Leave room for *fun*."** |
| 3am | "A Virgo at 3 AM, replaying *one* sentence." | A text-bubble loop. **Fact:** one Greek story says Virgo is Astraea, justice, the last immortal to leave Earth. | **"You're allowed to be *unfinished*."** |

### ♎ Libra · air · cardinal · Venus · the scales · Sep 23 – Oct 22 · music dreamy (E31–35)
| suffix | hook | beats + fact | last line |
|---|---|---|---|
| am | "POV: a Libra picks an outfit. Day *three*." | A runway of outfits on two sides of a scale. **Fact:** Libra is ruled by Venus. | **"Pick the one that feels like *you*."** |
| work | "A Libra mediating the office *fight*." | A tiny UN summit at the coffee machine. **Fact:** Libra is the natural ruler of the 7th house (partnerships). | **"Fair includes *you*."** |
| love | "Libra on a date: matching outfits, *by accident*." | With Aries, who's already ordered for both; they laugh. **Fact:** the September equinox, when day and night are about equal. | **"Balance is a *team* sport."** |
| crew | "'Where should we eat?' A Libra, for *45 minutes*." | Menus spin. Taurus just orders. **Fact:** Libra is the only zodiac sign that's an object, not a creature. | **"Just *pick*. We'll love it."** |
| 3am | "A Libra at 3 AM: did I say yes to *too* much?" | A calendar overflows. **Fact:** the Greeks saw Libra's stars as the Scorpion's claws. | **"*No* is balanced, too."** |

### ♏ Scorpio · water · fixed · Mars (trad.) / Pluto (modern) · the scorpion · Oct 23 – Nov 21 · music screwed (E36–40)
| suffix | hook | beats + fact | last line |
|---|---|---|---|
| am | "POV: a Scorpio's morning. *All* black." | A wardrobe of identical black, then one secret pink sock. **Fact:** Scorpio is ruled by Mars traditionally and by Pluto in modern astrology. | **"Dress dark. *Love* loud."** |
| work | "A Scorpio already knows who ate your *yogurt*." | A detective-board gag. It keeps the secret and buys you a new one. **Fact:** Scorpio is the natural ruler of the 8th house (transformation, shared resources). | **"Use your powers for *good*."** |
| love | "Dating a Scorpio: the background check is *free*." | With Taurus; it practises *asking* instead of investigating (season 1 callback). **Fact:** Antares, the red supergiant "rival of Mars". | **"Trust, then verify… *less*."** |
| crew | "A Scorpio's friendship is a *lifetime* contract." | Literally: a scroll with a wax seal. **Fact:** in the sky Scorpius rises as Orion sets; one Greek story says they're kept apart. | **"Loyal for *life*."** |
| 3am | "A Scorpio at 3 AM: feeling *100%* of everything." | It lets one person in with a text: "you up? i'm okay. just wanted to say it." **Fact:** Scorpio is a fixed water sign. | **"Let someone *in*."** |

### ♐ Sagittarius · fire · mutable · Jupiter · the archer · Nov 22 – Dec 21 · music house (E41–45)
| suffix | hook | beats + fact | last line |
|---|---|---|---|
| am | "POV: a Sag wakes up in a *different* city." | Where am I? It's home, actually; the backpack is still packed. **Fact:** Sagittarius is ruled by Jupiter, the biggest planet. | **"Adventure starts at *home*, too."** |
| work | "A Sag at work: 'what if the office was in *Lisbon*?'" | Big-idea whiteboard chaos. **Fact:** Sagittarius is the natural ruler of the 9th house (travel, learning, big ideas). | **"Big ideas. *Small* steps."** |
| love | "Dating a Sag: *passport* required." | With Gemini: a map, then a staycation. **Fact:** the centre of our galaxy lies in the direction of Sagittarius. | **"Staying is an *adventure*, too."** |
| crew | "A Sag tells the truth. *Too much* truth." | Blunt-o-meter gag, then a kinder rephrase. **Fact:** the "Teapot" shape in Sagittarius's stars. | **"Honest *and* kind."** |
| 3am | "A Sag at 3 AM, booking a flight to avoid a *feeling*." | It closes the tab and calls a friend. **Fact:** one story links the archer to Chiron, the wise healer. | **"Feel it *here*."** |

### ♑ Capricorn · earth · cardinal · Saturn · the sea-goat · Dec 22 – Jan 19 · music cinematic (E46–50)
| suffix | hook | beats + fact | last line |
|---|---|---|---|
| am | "POV: a Capricorn's morning started *yesterday*." | A 5 AM alarm and a spreadsheet with coffee. **Fact:** Capricorn is ruled by Saturn. | **"Rest is part of the *plan*."** |
| work | "A Capricorn's 5-year plan has a *10-year* plan." | A mountain-climb chart, and it brings the team up with it. **Fact:** Capricorn is the natural ruler of the 10th house (career, reputation). | **"Climb *with* people."** |
| love | "A Capricorn schedules a date… in a *spreadsheet*." | With Cancer: the cell "FUN" is highlighted. **Fact:** the December solstice; the Tropic of Capricorn is named for the Sun once standing there then. | **"Schedule the *fun*, too."** |
| crew | "Capricorn: the friend who's *basically* a parent." | Dry jokes and a carried umbrella; then friends carry its bags for once. **Fact:** in traditional astrology Capricorn rules the knees and bones. | **"Let them carry *you* for once."** |
| 3am | "A Capricorn at 3 AM: am I enough if I *stop*?" | The free Friday (season 4 callback). **Fact:** the sea-goat goes back to Babylon's god Ea; it's one of the oldest constellations. | **"You're enough *off* the clock."** |

### ♒ Aquarius · air · fixed · Saturn (trad.) / Uranus (modern) · the water-bearer · Jan 20 – Feb 18 · music synthwave (E51–55)
| suffix | hook | beats + fact | last line |
|---|---|---|---|
| am | "POV: an Aquarius has a new theory *before* coffee." | A whiteboard of theories and headphones on. **Fact:** Uranus, Aquarius's modern ruler, was discovered in 1781. | **"Weird is *wonderful*."** |
| work | "An Aquarius just *reinvented* your workflow." | A Rube Goldberg machine, then it asks the team first. **Fact:** Aquarius is the natural ruler of the 11th house (friends, groups, hopes). | **"Change it *together*."** |
| love | "How an Aquarius flirts: 40 minutes about *space*." | With Leo, who's genuinely into it. Wedding season-8 tie-in optional. **Fact:** Aquarius is an *air* sign, despite the water-bearer. | **"Let them in the *lab*."** |
| crew | "An Aquarius is in *every* group chat." | Twelve chats ping, then one close friend. **Fact:** in Greek myth, Ganymede, cupbearer of the gods. | **"Belong *somewhere*, too."** |
| 3am | "An Aquarius at 3 AM, *headphones* on." | It's overwhelm, not distance (season 6). It takes them off for a call. **Fact:** Uranus spins tipped on its side. | **"Different, *and* held."** |

### ♓ Pisces · water · mutable · Jupiter (trad.) / Neptune (modern) · the fish · Feb 19 – Mar 20 · music dreamy (E56–60)
| suffix | hook | beats + fact | last line |
|---|---|---|---|
| am | "POV: a Pisces wakes up *still* in the dream." | Dream bubbles drift through the kitchen; the cats (season 4). **Fact:** Neptune, Pisces's modern ruler, was found in 1846. | **"Dream, then drink *water*."** |
| work | "A Pisces' playlist made the whole office *cry*." | Headphones shared around; even Capricorn sniffles. **Fact:** Pisces is the natural ruler of the 12th house (dreams, the hidden, rest). | **"Soft is a *skill*."** |
| love | "Dating a Pisces: they wrote you a song on date *one*." | Virgo gets a song and edits one lyric, lovingly. **Fact:** in Greek myth, Aphrodite and Eros became two fish tied by a cord. | **"Feel it *with* them."** |
| crew | "A Pisces is everyone's *2 AM* phone call." | Phones ring all night, then friends call Pisces back. **Fact:** precession has moved the March equinox point into Pisces. | **"Save some *you* for you."** |
| 3am | "A Pisces at 3 AM, crying at a *dog* commercial." | A big ugly cry, then sleep. It closes the whole season: all twelve homes light up at 3 AM, one window each. **Fact:** in traditional astrology Pisces rules the feet. | **"Feet on the ground. Heart in the *sky*."** |

## Every episode also has
- `cardFrame({ numeral: 'S9 E01' … 'S9 E60' })`;
- the faint seed constellation (top left);
- one `drawGhostCameo` hidden somewhere in the sign's home, recorded in `lore.json`;
- the sign's glyph on the clock eyebrow;
- end-card line `cta: 'SIGN UP TO VOTE YOUR CITY'`.

## Rules
- **Length:** each episode's length includes the 4.4 s end card.
- **Box lines:** 70 characters or fewer, each readable for at least 1.5 s after it finishes typing.
- **Hook card:** frame 0 must work as a thumbnail.
- **Pure f(t),** with no `document` at module top level. Never say "Align" just before the end card.
- **Process:**
  - the polish loop, with at least two passes on contact sheets;
  - `teaser-sound.mjs` must run;
  - one commit per episode.
