# Star Talk, batch 5 (season 4): "Houston, we have a match" (100 vertical films)

The user asked: "how can i make 100 more videos and add in long term plot lines and Easter eggs, so some for voting on ur city by signing up for the beta. Houston then all of Texas first." Then: "Texas region is locked in as first region starting with Houston."

Same series as STARTALK.md and STARTALK3.md (read both first: the look, the shared `startalk.js`, the dialogue box, the end card, the card cuts, the tone rules). Every film is vertical 1080×1920.

**Don't repeat batch 4.** STARTALK4.md (batch 4, season 3, a separate session's 25 longer story films) owns these topics:
- red flag / green flag
- the first fight
- meeting the friends
- "The Ex Files"
- solo dating
- swipe fatigue
- oversharing
- love languages
- long distance

This plan avoids them. Its "Our Stars Met First" episodes pair signs as an anthology; in this season the six couples below are the canon.

## Before building: open questions for the user
1. **End-card lines.** Phase 1 uses the real default, JOIN THE HOUSTON BETA. Proposed for phase 2: JOIN THE TEXAS BETA. Proposed for phase 3: SIGN UP TO VOTE YOUR CITY. The vote line promises that signing up records your city, so the signup form has to ask for one. (The end card fits a line of up to about 30 characters.)
2. **The older vote films.** votenext, voteballot and votemap say launch city #2 is chosen by vote. With Texas locked in, they should either be retired or reworded to "the region after Texas".
3. **Posting cadence.** For example, daily (about 100 days) or five a week (about 20 weeks). Films marked *flex* should post during the real sky event; check an ephemeris and never invent dates.

## The rollout, locked
- **Phase 1, Houston (EP 001–040).** The stars come down from the sky and land in Space City.
- **Phase 2, all of Texas (EP 041–070).** The stars take a road trip across the state. Texas is locked in as the first region, so these films never ask Texans to vote.
- **Phase 3, the vote (EP 071–100).** After Texas, everyone else signs up to vote their city into the next region. Candidate cities: New York, LA, Chicago, Miami, Atlanta, Nashville, Seattle, New Orleans. Follow VOTE.md: no vote counts, no leaderboards, and no city shown winning. The finale stays open until there's a real result.

## Cast bible (keep everyone consistent across all 100)
- **THE STARS.** The bone/gold narrator, with the name tag "THE STARS".
- **The twelve sign stars.** Each is drawn with `signStar(id)` and its glyph badge, and carries the prop it got in earlier films:
  - Aries: boxing gloves (staries)
  - Taurus: blanket cape and snacks (startaurus)
  - Gemini: the one chat it kept, "tell me more?" (stargemini)
  - Cancer: the crab shell (starcancer)
  - Leo: crown, mirror and spotlight (starleo)
  - Virgo: the checklist clipboard (starvirgo)
  - Libra: the scale on its head (starlibra)
  - Scorpio: the suspicious squint (starscorpio), and from EP 013 a detective coat
  - Sagittarius: backpack and passport (starsag)
  - Capricorn: tie, laptop and a calendar "booked till 2031" (starcap)
  - Aquarius: headphones (staraqua)
  - Pisces: the daydream bubble with a wedding, two cats and a cottage (starpisces)
- **The six couples are the six real opposite pairs.** Most started in batch 3:
  - Aries and Libra (stopposites)
  - Gemini and Sagittarius (starsag)
  - Cancer and Capricorn (starcancer)
  - Leo and Aquarius (staraqua)
  - Virgo and Pisces (starpisces)
  - Taurus and Scorpio, new this season
- **Recurring characters:**
  - the Moon ☽ (stmoon)
  - Venus ♀ (starvenus)
  - **Retro**, the backwards-spinning Mercury ☿ orb (stretro)
  - Saturn ♄, the teacher with glasses and a pointer (stsaturn)
  - **the ghost** (stghost)
  - the Auntie Council (staunties)
  - the 5th-house sports booth (stlive5th)
  - "them", the bone-coloured date stars
- **Recurring places:**
  - Mission Control (generic consoles, never NASA marks)
  - the Houston skyline
  - the 610 Loop, Buffalo Bayou and the Montrose mural wall
  - the road-trip van

## The threads (long-term plot lines)
| thread | episodes | arc |
|---|---|---|
| **A. The landing → Texas → the vote** | throughout | The stars land in Houston (001), learn Houston (to 040), road-trip Texas (041–070), then open the vote (070–100). |
| **B. Leo × Aquarius** | 006, 018, 029, 038, 049, 061, 084, 099 | Two fixed opposites: they notice each other, Leo has a crush, they match, first date, a clash in Dallas, they make up, Leo plans a surprise Aquarius's way, then they make it official. |
| **C. The ghost's redemption** | 008, 024, 039, 045, 062, 082, 088, 098 | The ghost moves to Houston, gets ghosted itself, dates honestly, stows away on the road trip, makes a friend, takes the sheet off and confesses (see Easter eggs). |
| **D. Saturn's class** | 012, 027, 044, 058, 067, 076, 093 | Saturn Return 101: say what you want, real apologies, patterns, boundaries, your own standards, the final exam, graduation. Each ends on a ★ LESSON UNLOCKED banner from the shared promo/films/lesson.js (`buildLesson` + `lessonCues`); never build your own. |
| **E. Retro the gremlin** | 015, 034, 057, 080, 092 | Mercury retrograde as recurring mischief (it really happens about three times a year). Retro tempts ex-texts, scrambles chats, hijacks the GPS, rigs a ballot, then apologizes. |
| **F. The six couples** | 002–005, 010, 013, 014, 019, 022, 025, 026, 028, 046–048, 051, 055, 059, 063, 085, 090, 094–097 | Each pair grows up: Gemini and Sagittarius stop circling the Loop, Virgo stops fixing everything, Taurus and Scorpio finally reveal faces, Cancer and Capricorn move in. |
| **G. Sky lessons** | 023, 033, 035, 036, 064, 086, 091 | The Moon, Venus, the 5th and 7th houses, full and new moons, Venus retrograde. |

## Easter eggs (season-wide)
1. **Find the ghost.** The little ghost hides in every film from 001 to 097. It peeks out for about 1–1.5 s, each time in a new spot, and never behind text. EP 098 confesses with a montage of every spot.
2. **The 100-star constellation.** EP n shows stars 1…n of a constellation in the same corner of the sky. At EP 100 it completes into the seed-of-life logo and flows into the end card's logo.
3. **Episode stamp.** A tiny "№ 042" in Space Mono in the same corner of every film.
4. **HELLO TEXAS.** The first letters of the ten last lines in drop 5 (EP 041–050) spell HELLO TEXAS. EP 098 reveals it.
5. **Callbacks to batch 3:**
   - Libra finally picks (tacos, 019).
   - Virgo's "date #2 ✓" becomes date #3 (010).
   - Capricorn gets a free Friday (026, 063).
   - Gemini's kept chat was Sagittarius all along (025).
   - "k." gets explained: they were driving (034).
   - Pisces' daydream cats become real (097).
   - Leo shares the spotlight, and Aquarius takes the headphones off (099).
6. **"Houston, we have a match."** It opens EP 001 and closes EP 100.

### Shared module: promo/films/stlore.js (the lead builds and locks it before any film agent starts)
- `drawSeedConstellation(ctx, t, ep, opts)` lays 100 points along the seed of life's seven circles in a fixed order. It draws points 1…ep as small pixel stars, with today's star twinkling. At ep 100 it also draws the circles.
- `drawGhostCameo(ctx, t, { x, y, at, dur, from, size })` draws the stghost sprite peeking out from behind an edge or object, blinking once, and ducking back.
- `drawEpisodeStamp(ctx, ep, opts)` draws the "№ 042" stamp.
- Every frame is a pure function of t, with no `document` at module top level. Film agents call these and never edit them.
- **Other shared modules:** ★ LESSON UNLOCKED banners come from promo/films/lesson.js (`buildLesson`, `lessonCues`, `popText`). Don't edit it.
- **Each film folder also gets `lore.json`:** `{ "ep": 42, "ghost": { "at": 6.2, "x": 812, "y": 1180, "where": "behind the smoker" } }`. EP 098's montage is built from these.

## Rules for all 100 (in addition to STARTALK3.md)
- **Length:** 15–25 s including the 4.4 s end card. The one exception is EP 100 at 30 s.
- **Structure:** three beats as in STARTALK3.md, one prop that reads at a glance, and box lines of about 70 characters or fewer, each readable for at least 1.5 s.
- **Place rules:** Houston and city films also follow HOUSTON.md and CITIES.md:
  - real local things only;
  - generic skylines, with no team, brand, NASA or event logos and no trademarked event names;
  - no invented statistics;
  - no hurricane, flood or disaster jokes;
  - affectionate, never mean about a place or its people.
- **Astrology** must be real: rulers, elements, modalities, opposites and houses as written here. Advice must be healthy. Never say "Align" in the frames just before the end card.
- **End-card line by phase:** EP 001–040 JOIN THE HOUSTON BETA; EP 041–069 the Texas line; EP 070–100 the vote line (see the open questions).
- **Talk cards** use the real prompts in promo/assets/MANIFEST.md (card-talk-1…6, daily).

## How it gets made
- **Build order:** the lead builds stlore.js and renders a test, then fans out.
- **Parallel setup:** 5 cloud sessions, each running 4 agents × 5 films. That's 20 films per session, two drops each, using the same polish loop and sound build as STARTALK3.md. One commit per film.
- **Cost and time:** about 55k agent tokens per film (measured on batch 3), so about 5.5–6M tokens for all 100. About 2–3 hours of wall time.
- **Delivery:** finals rendered per session; share copies sent to the user; a new shelf per drop on the gallery page.

## The 100

### Drop 1: "Houston, we have a match" (EP 001–010)
| EP | folder | len | music | thread | the film | last line |
|---|---|---|---|---|---|---|
| 001 | st4landing | 20 | cinematic | A | **"*Houston*, we have a…"** Mission Control counts down. A capsule carrying all twelve sign stars drops through the clouds onto the Houston skyline at night. The hatch opens, the humidity hits, and twelve pairs of eyes fog up. THE STARS: "we've talked to you from up there for years." → "now we're coming *down*. Houston first." (Ghost: in the capsule porthole.) | **"Houston, we have a *match*."** |
| 002 | st4loop | 15 | screwed | F | **"Dear Houston: the *Loop*."** Gemini and Sagittarius drive round and round the 610 Loop while a lap counter ticks up. GEMINI: "we've been 'talking' for 9 laps." → THE STARS: "pick an exit. ask what you *are*." (They take the exit.) Screwed is Houston's own slowed-down sound. | **"Take the *exit*."** |
| 003 | st4jacket | 15 | lofi | F | **"Houston rule: bring a jacket *indoors*."** The restaurant AC is freezing (pixel icicles on the vent). Capricorn shivers through the date, and Cancer notices. THE STARS: "notice when they're cold." → "offer the *jacket*." (Capricorn goes heart-eyed.) | **"Small care is *big* care."** |
| 004 | st4kolache | 15 | funk | F | **"Kolaches or breakfast *tacos*?"** Taurus, in its blanket cape, guards the last kolache on a blind date. The date's card is veiled; its ♏ badge shows it's the Scorpio from EP 013. TAURUS: "the last one is mine. obviously." → THE STARS: "the one who shares the last bite is a *keeper*." (It splits it.) | **"Share the *last* one."** |
| 005 | st4bayou | 20 | dreamy | F | **"Buffalo Bayou at *night*."** Pisces and Virgo walk the bayou past skyline reflections. Pisces' bubble starts the wedding again, two cats included, and Virgo gently pops it. VIRGO: "you're doing the wedding thing again." → PISCES: "sorry. i'm *here*." → THE STARS: "slow walks beat loud bars." | **"Walk. Talk. *Repeat.*"** |
| 006 | st4montrose | 20 | synthwave | B1 | **"Meanwhile, in *Montrose*…"** Aquarius, headphones round its neck, paints a generic mural. Across the street, Leo poses in its own spotlight. They lock eyes, and both look away fast. AQUARIUS: "i don't do crushes." → THE STARS: "fixed signs on opposite sides. you'll *meet*." | **"Opposites *notice*."** |
| 007 | st4deck | 15 | house | tonight's deck | **"Houston is full of *people*."** Card backs deal over the skyline, and each star gets one hand. THE STARS: "no endless scroll." → "a new hand every night. *tonight's* deck." | **"Tonight, *deal* me in."** |
| 008 | st4ghostmoves | 15 | lofi | C1 | **"The ghost moved to *Houston*."** The ghost, still in its sheet, unpacks a moving box. Its phone shows a reply it owes someone. GHOST: "new city. i'm being *better*." It sends "had fun, but we're not a match. good luck!" → THE STARS: "proud of you." | **"New city. *Kind* goodbyes."** |
| 009 | st4mission | 20 | cinematic | card first | **"Mission Control, we have a *profile*."** The big screen shows a blind mystery card (card-profile-*.png) with an aura veil and no photo. THE STARS: "in Space City we launch the *card* first." → "the face comes last. the person comes first." | **"Card first. *Face* last."** |
| 010 | st4heights | 15 | jazzy | F | **"Dear Virgo: date number *three*."** Virgo's clipboard has moved on from "date #2 ✓" to "date #3". It repaints a Heights bungalow porch before Pisces arrives. THE STARS: "you don't have to fix the porch." → "let them *help*." (Pisces grabs a brush; there's paint everywhere and they're both laughing.) | **"Let someone *help*."** |

### Drop 2: "Houston life" (EP 011–020)
| EP | folder | len | music | thread | the film | last line |
|---|---|---|---|---|---|---|
| 011 | st4katy | 15 | pop | A | **"The Katy Freeway has a *lot* of lanes."** Aries switches lanes again and again on the way to Libra. ARIES: "this lane's faster. no, THIS one." → THE STARS: "switching lanes won't get you there faster." → "neither does *rushing* love." | **"Pick a lane. *Enjoy* the drive."** |
| 012 | st4saturn1 | 20 | cinematic | D1 | **"Saturn is teaching in *Houston*."** Saturn stands at a chalkboard reading "SATURN RETURN 101", with four sign stars at tiny desks. SATURN: "lesson one: say what you *want*." → "don't know yet? that's your homework." ★ LESSON UNLOCKED: "Say what you want." | **"Class is in *session*."** |
| 013 | st4scorpio | 15 | funk | F | **"Dear Scorpio: the *detective*."** Scorpio, in a pixel trench coat, studies a corkboard of facts about its kolache date. THE STARS: "you know everything about them." → "they know nothing about you. go *first*." (It flips the board to its own blank card.) | **"Be *known*, too."** |
| 014 | st4beltway | 15 | house | F | **"Houston is *big*."** The map zooms out past Beltway 8 to the Grand Parkway: Aries and Libra live on opposite sides. ARIES: "they're 45 minutes away!" → THE STARS: "distance is a *plan*, not a dealbreaker." (A pin drops halfway.) | **"Meet in the *middle*."** |
| 015 | st4retro1 | 20 | screwed | E1 | **"Mercury went *retrograde* again."** At 2 a.m. Retro rolls into an apartment and nudges a phone with "u up?" to an ex. Leo hovers over SEND. RETRO: "go on. for old times' sake." → THE STARS: "retrograde is for *reflecting*, not re-texting." (Phone goes face down; Retro sulks.) *flex* | **"Reflect. Don't *resend*."** |
| 016 | st4talkcard | 15 | pop | talk cards | **"First-date small talk in *Houston*."** "so… the weather." "humid." Silence. A talk card flips in: card-talk-1, "What's a hill you will die on?" THE STARS: "skip the weather." → "ask what they'd *argue* for." (Both light up, debating.) | **"Talk *deeper* than the weather."** |
| 017 | st4hotcold | 20 | cinematic | dealbreakers | **"Houston weather: hot, then *cold*."** A pixel thermometer swings, and so do a date's texts: "miss u!!", then three days of nothing, then "hey." THE STARS: "the weather can run hot and cold." → "your person *shouldn't*." The chip "✕ HOT AND COLD" stamps onto a card. | **"Steady is *sexy*."** |
| 018 | st4leomirror | 20 | funk | B2 | **"Leo has a *crush*."** Leo rehearses in its mirror (starleo), and every line is about itself. Across town, Aquarius pretends not to look at Leo's veiled card. LEO: "should i lead with my best angle?" → THE STARS: "lead with a *question*." | **"Ask about *them*."** |
| 019 | st4tacos | 15 | dreamy | F | **"Dear Libra: Thai or sushi, *part two*."** Libra, scale on its head, stands with Aries at a crossroads. A taco truck rolls up and the scale snaps level. LIBRA: "…tacos?" → ARIES: "FINALLY." → THE STARS: "see? you *can* pick." | **"Picked. *Finally.*"** |
| 020 | st4report1 | 25 | jazzy | A | **"The stars' Houston *report card*."** THE STARS read stamps off a clipboard: "✓ bring a jacket", "✓ share the last kolache", "✓ take the exit". "we came to give Houston advice." → "Houston's been teaching *us*." | **"Show *up*, Houston."** |

### Drop 3: "Houston, deeper" (EP 021–030)
| EP | folder | len | music | thread | the film | last line |
|---|---|---|---|---|---|---|
| 021 | st4dealbreakers | 20 | house | dealbreakers | **"Houston dealbreakers, *ranked*."** No numbers. Chips stamp onto a card: "✕ NO PLANS, ONLY VIBES", "✕ 'WE'LL SEE'", "✕ ONLY DATES INSIDE THE LOOP". THE STARS: "knowing your dealbreakers isn't picky." → "it's *honest*." | **"Know your *no*."** |
| 022 | st4aries | 15 | synthwave | F | **"Dear Aries: Houston *traffic*."** Aries is stuck in a pixel jam on the way to Libra, its gloves hanging from the mirror. ARIES: "we're going to be LATE." → THE STARS: "text them you're running late." → "patience is a love *language*." | **"Patience is *hot*, too."** |
| 023 | st4moon1 | 20 | dreamy | G | **"The Moon has *notes* for Houston."** The sleepy Moon star floats over the bayou. MOON: "you plan the first date for their Sun." → "plan the next one for their *Moon*." A talk card flips in: card-talk-3, "What does a perfect lazy Sunday look like for you?" | **"Date the *whole* chart."** |
| 024 | st4ghosted | 15 | lofi | C2 | **"The ghost got *ghosted*."** The ghost waits in a coffee shop. Three texts go unanswered, and nobody shows. GHOST: "oh. THIS is how it feels." → THE STARS: "now you know why a kind goodbye *matters*." | **"Be the *kind* you wanted."** |
| 025 | st4gemini | 15 | pop | F | **"Dear Gemini: you kept *one* chat."** The bubble Gemini kept ("tell me more?") was Sagittarius all along. Now they're at a Houston food hall, both on their phones. THE STARS: "you've texted every day for weeks." → "now put the phones *down*." | **"Same chat. *Real* table."** |
| 026 | st4capfriday | 15 | cinematic | F | **"Dear Capricorn: you have a free *Friday*."** Capricorn's calendar, booked till 2031, has one empty square. It panics and tries to book a meeting. THE STARS: "leave it empty." → "*rest* is a date, too. invite Cancer." | **"Keep Friday *free*."** |
| 027 | st4saturn2 | 20 | cinematic | D2 | **"Saturn's class: how to *apologize*."** Saturn grades apologies on the chalkboard. "sorry you feel that way" gets a big red ✕, and "sorry, but…" has the "but" circled. SATURN: "a real sorry has no *but*." → "say what you did. say what you'll change." ★ LESSON UNLOCKED: "Sorry has no 'but'." | **"Drop the *but*."** |
| 028 | st4unpack | 15 | house | F | **"Dear Sagittarius: you're *staying*?"** Sagittarius unpacks its backpack in a Houston apartment while Gemini hangs a picture. SAG: "i don't usually unpack." → THE STARS: "adventure can be *local*. explore together." (A map of Houston fills with pins.) | **"Stay *curious*, together."** |
| 029 | st4matched | 20 | synthwave | B3 | **"Tonight's deck dealt them *each other*."** Leo's hand and Aquarius's hand each flip to one veiled card: each other. Leo goes heart-eyed; Aquarius squints, then smiles. AQUARIUS: "card first, face last. okay. i'm in." → THE STARS: "fixed fire, fixed air. this'll be *interesting*." | **"Opposites, *matched*."** |
| 030 | st4checkin | 25 | funk | A | **"Houston, a *check-in*."** A montage: fogged-up eyes, the jacket, the kolache, the bayou walk. THE STARS: "we came down to give advice." → "Houston gave us some. *y'all* are good at this." | **"Houston, you're a *natural*."** |

### Drop 4: "Space City, you did it" (EP 031–040)
| EP | folder | len | music | thread | the film | last line |
|---|---|---|---|---|---|---|
| 031 | st4fromwhere | 15 | house | A | **"In Houston, your date could be from *anywhere*."** Two bone stars on a date; postcards of mountains, ocean and city float up as one talks about home. SAGITTARIUS (Jupiter, the traveller) leans in: "ask where they're from." → "then *listen* to the whole story." | **"Ask where they're *from*."** |
| 032 | st4kisscam | 20 | pop | A | **"The stars go to a *ballgame*."** A generic stadium with no team marks. The kiss cam lands on two stars who just met, and both freeze. THE STARS: "nobody should be pushed into a moment." → "ask first. *always*." (They high-five instead, laughing.) | **"Consent is *cute*."** |
| 033 | st4venus1 | 20 | dreamy | G | **"Venus moved to Houston, *too*."** The pink Venus star runs an advice booth at a farmers market. VENUS: "Venus rules Taurus and Libra." → "but everyone has a Venus sign. it's *how* you love." A talk card flips in: card-talk-6, "Planned date or spontaneous date?" | **"Know your *Venus*."** |
| 034 | st4retro2 | 20 | screwed | E2 | **"Retrograde, *again*."** Retro scrambles the water signs' chat so messages arrive backwards ("?rennid"). CANCER: "remember 'k.'? they were *driving*." → THE STARS: "when it's confusing, don't decode. *call*." *flex* | **"When in doubt, *call*."** |
| 035 | st4seventh | 15 | jazzy | G | **"Your *7th house* is open."** The chart wheel is drawn as a Houston high-rise with twelve floors, and the 7th-floor door glows. THE STARS: "the 7th house is partnership." → "the sign on its door shows what you're *drawn* to." | **"Who's on your *7th* floor?"** |
| 036 | st4fifth | 15 | pop | G | **"The *5th house* is the fun floor."** The 5th-floor apartment is a party, disco ball and all. THE STARS: "5th house: romance and play." → "dating should feel a little like *play*." | **"Keep it *fun*."** |
| 037 | st4spacecity | 20 | cinematic | A | **"Space City, you *did* it."** Mission Control watches a map: Houston glows, and a dotted line pulses out to the edges of Texas. THE STARS: "Houston, you were first." → "next: the *whole* state." | **"Texas, you're *next*."** |
| 038 | st4firstdate | 20 | funk | B4 | **"Leo and Aquarius: the *first* date."** At a Montrose taco spot (Libra waves in the background), the cards stay veiled and they talk. Leo starts a story about itself, catches itself, and asks a question instead. AQUARIUS: "you asked about my day." → LEO: "i'm *learning*." | **"Learning looks *good* on you."** |
| 039 | st4ghostdate | 15 | lofi | C3 | **"The ghost's *first* date."** The ghost, sheet still on, is on a date. The date asks, "can i see you?" GHOST: "not yet. but i'll *tell* you how i feel." → THE STARS: "honesty first. the sheet comes off when you're *ready*." | **"Ready when you're *ready*."** |
| 040 | st4aunties1 | 25 | jazzy | A | **"The Auntie Council reviews *Houston*."** The Aunties, in fogged-up reading glasses (staunties), flip through Houston's report card. AUNTIE: "Houston passed." → "now go show the rest of *Texas*." ★ LESSON UNLOCKED: "Love is mostly showing up." | **"Pass it *on*, Houston."** |

### Drop 5: "Road trip" (EP 041–050). The last lines spell HELLO TEXAS.
| EP | folder | len | music | thread | the film | last line |
|---|---|---|---|---|---|---|
| 041 | st4roadtrip | 20 | house | A | **"The stars are going on a *road trip*."** A pixel van loads up in Houston: Sagittarius drives, Virgo navigates with a paper map, Gemini is on aux, Taurus brings snacks, and the ghost hides in the trunk. THE STARS: "Houston was first." → "now the rest of *Texas*." | **"Hit the road, *Texas*."** |
| 042 | st4sunset | 15 | dreamy | A | **"Texas *sunsets* are unfair."** The van stops on a Hill Country road as the sky turns orange and pink. Pisces cries, Leo takes selfies, Aquarius just watches. THE STARS: "put the phone down." → "watch the sky *with* someone." | **"Eyes up. *Sky's* out."** |
| 043 | st4austin | 20 | synthwave | A | **"Dear *Austin*."** A live-music stage under string lights; Aquarius listens with its eyes closed. AQUARIUS: "this city listens to music like it *matters*." → THE STARS: "listen to your date like that, too." | **"Listen like it's *live*."** |
| 044 | st4saturn3 | 20 | cinematic | D3 | **"Saturn's class: *road trip* edition."** Saturn rides shotgun with its pointer. SATURN: "pop quiz: they're late and didn't text." → "once is life. every time is a *pattern*." ★ LESSON UNLOCKED: "Look for patterns." | **"Look for *patterns*."** |
| 045 | st4stowaway | 15 | lofi | C4 | **"There's a *stowaway*."** The stars open the trunk; the ghost waves, embarrassed. GHOST: "i didn't want to ask. i thought you'd say no." → THE STARS: "just ask. worst case is a *kind* no." | **"Out loud is *brave*."** |
| 046 | st4sanantonio | 20 | dreamy | F | **"Dear *San Antonio*."** Pisces and Virgo drift down the River Walk in a boat under string lights. PISCES: "this is SO romantic." → VIRGO: "you're doing the wedding thing." → PISCES: "no. i'm just *happy* right now." | **"This moment *is* the plan."** |
| 047 | st4swimhole | 15 | jazzy | F | **"A Hill Country *swimming hole*."** Gemini and Sagittarius jump into a cold spring-fed pool, and both scream. GEMINI: "it's FREEZING." → SAG: "we said we'd try new things." → THE STARS: "the cold part passes. the *memory* stays." | **"Every first is a little *cold*."** |
| 048 | st4fortworth | 20 | funk | F | **"Dear *Fort Worth*."** A pixel cattle drive ambles down a brick street. Taurus, the bull, gasps: "MY PEOPLE." Its veiled Scorpio date laughs. THE STARS: "slow and steady. you're *built* for loyalty." → "just don't be stubborn about the small stuff." | **"Xs and Os, *y'all*."** |
| 049 | st4dallas | 20 | pop | B5 | **"Dear *Dallas*."** Under a glittering generic skyline, Leo wants the big night out and Aquarius wants a quiet one. LEO: "you never want to go out!" → AQUARIUS: "i need space. it's not about *you*." → THE STARS: "two fixed signs. nobody's wrong." | **"Ask what they *need*."** |
| 050 | st4elpaso | 25 | cinematic | A | **"Dear *El Paso*."** The road trip reaches the desert at night. A giant star outline is lit on the mountain (the real Star on the Mountain, drawn generic). The stars gasp: "a cousin!" It doesn't blink or move; it just stays lit. THE STARS: "it doesn't do anything fancy." → "it just *shows up*. every night." | **"Show up like the *mountain* star."** |

### Drop 6: "Coast to panhandle" (EP 051–060)
| EP | folder | len | music | thread | the film | last line |
|---|---|---|---|---|---|---|
| 051 | st4galveston | 20 | dreamy | F | **"Dear *Galveston*."** By the seawall, Cancer builds a shell house out of its old shell, and Capricorn arrives with a towel. CANCER: "home is wherever i bring my shell." → THE STARS: "home is also who you *share* the beach with." | **"Share your *shell*."** |
| 052 | st4corpus | 15 | pop | A | **"Dear *Corpus Christi*: it's windy."** The air signs fly pixel kites, and their speech bubbles blow away mid-sentence. GEMINI: "my whole message blew away!" → THE STARS: "say the important part *first*." | **"Lead with the *point*."** |
| 053 | st4lubbock | 20 | cinematic | A | **"Dear *Lubbock*: look up."** Flat fields under a huge pixel sky crowded with stars; our stars wave at their relatives. THE STARS: "out here, you can see all of us." → "be someone your date can see *clearly*, too." | **"No games. Just *stars*."** |
| 054 | st4marfa | 20 | synthwave | A | **"Near *Marfa*, there are mystery lights."** Lights bob on the dark horizon (the real, unexplained Marfa lights), and the stars squint. ARIES: "who ARE they?" → THE STARS: "some mysteries are fun." → "your date shouldn't be one. *say* what you mean." (One of the lights is the ghost.) | **"Be clear, not *mysterious*."** |
| 055 | st4bbq | 15 | funk | F | **"Texas BBQ takes *hours*."** Aries taps its foot by a pixel smoker. ARIES: "is it ready YET?" → THE STARS: "brisket can't be rushed." → "neither can *trust*." | **"Low and *slow*."** |
| 056 | st4fridaylights | 20 | pop | A | **"Texas Friday *nights*."** Generic high-school stadium lights, no team marks. In the stands, a shy star holds a sign: "CAN I SIT WITH YOU?" THE STARS: "cheer for them." → "even the *small* wins." | **"Be their *biggest* fan."** |
| 057 | st4retro3 | 20 | screwed | E3 | **"Retrograde on the *road*."** Retro hijacks the van's GPS: "turn around. go back. to your ex's town." Sagittarius almost does it. VIRGO: "that's not on the map." → THE STARS: "going back isn't the same as going *forward*." *flex* | **"Eyes on the road *ahead*."** |
| 058 | st4saturn4 | 20 | cinematic | D4 | **"Saturn's class: *boundaries*."** Saturn draws a pixel gate around a star's tiny garden. SATURN: "a boundary isn't a wall." → "it's a gate with *rules*. say them kindly." ★ LESSON UNLOCKED: "Kind boundaries keep love close." | **"Boundaries are *love*, too."** |
| 059 | st4queso | 15 | jazzy | F | **"Tex-Mex is a love *language*."** Pisces double-dips in the queso; Virgo is horrified, then laughs. THE STARS: "you'll disagree on small stuff." → "laugh about it *together*." | **"Pick your battles. *Not* the queso."** |
| 060 | st4lonestar | 25 | cinematic | A | **"The Lone Star *State*."** A single pixel star sits on a generic Texas outline, then more stars light up over every road-trip stop. THE STARS: "they call it the Lone Star State." → "let's fix the *lone* part." | **"No more *lone* stars."** |

### Drop 7: "Texas, then where?" (EP 061–070)
| EP | folder | len | music | thread | the film | last line |
|---|---|---|---|---|---|---|
| 061 | st4repair | 20 | funk | B6 | **"Leo and Aquarius make *up*."** After Dallas, they sit at opposite ends of a pixel couch, arms crossed and both waiting for the other to speak. THE STARS: "somebody has to go first." → "say sorry. say what you need. then *listen*." (Leo goes first; they scoot together.) | **"Repair is *romantic*."** |
| 062 | st4ghostfriend | 15 | lofi | C5 | **"The ghost made a *friend*."** In a roadside diner, a shy star asks the ghost to hang out. The ghost almost vanishes (old habit), then stays. GHOST: "i usually disappear here." → THE STARS: "stay. *awkward* beats gone." | **"Awkward beats *absent*."** |
| 063 | st4dancehall | 15 | jazzy | F | **"Texas dance hall: *two-step* night."** Capricorn spends its free Friday two-stepping with Cancer, and they keep stepping on each other's boots. THE STARS: "nobody's good at this the first time." → "be *new* at something together." | **"Two left boots. One great *night*."** |
| 064 | st4fullmoon | 20 | dreamy | G | **"Full moon over *Texas*."** The Moon glows full over the desert, and every star gets emotional. MOON: "full moons bring things up." → "if something's bugging you, say it *gently*." *flex* | **"Gentle is *brave*."** |
| 065 | st4texasdeck | 15 | house | tonight's deck | **"Tonight's deck, now in *Texas*."** Card backs deal across a generic Texas map with city labels. THE STARS: "same deal, bigger table." → "a new hand every night, all over *Texas*." Post only once the Texas beta is real. | **"Texas, *deal* me in."** |
| 066 | st4rivals | 15 | pop | Push / Pull / Align | **"A Houston star and an Austin star *match*."** A friendly rivalry: two bone stars with pixel city pins, and their Push / Pull / Align reading draws between them. HOUSTON: "Austin? really?" → THE STARS: "Push: you're different. Pull: you're curious. that's a *start*." | **"Different cities. *Same* sky."** |
| 067 | st4saturn5 | 20 | cinematic | D5 | **"Saturn's class: your *own* standards."** Each student lists what it wants in a partner on a long scroll. Saturn turns the scroll around. SATURN: "now: do *you* do all this?" → "be the partner you're asking for." ★ LESSON UNLOCKED: "Be who you're looking for." | **"Be your own *standard*."** |
| 068 | st4roadhome | 20 | dreamy | A | **"The road trip *ends*."** The van heads back to Houston at sunset. Everyone's asleep except Sagittarius, driving, and Virgo, navigating: two mutable signs. VIRGO: "you drove the whole way." → SAG: "you planned the whole way." → THE STARS: "different strengths. same *direction*." | **"Same *direction*."** |
| 069 | st4aunties2 | 25 | jazzy | A | **"The Auntie Council reviews *Texas*."** The report card reads: "Fort Worth: patient. Austin: listens. El Paso: shows up." AUNTIE: "Texas passed." → "now the rest of the country wants a *turn*." ★ LESSON UNLOCKED: "Love travels." | **"So… who's *next*?"** |
| 070 | st4wherenext | 20 | cinematic | A | **"Texas first. Then *where*?"** A stylised US map in line art: Texas glows, with dim stars over the candidate cities (no numbers, no leader). THE STARS: "Houston started it. Texas is next." → "after that, *you* pick. sign up to vote your city." The vote line starts here. | **"Light up your *city*."** |

### Drop 8: "The campaign" (EP 071–080)
| EP | folder | len | music | thread | the film | last line |
|---|---|---|---|---|---|---|
| 071 | st4campaign | 20 | house | A | **"The stars are *campaigning*."** Sign stars wave pixel signs: Leo "LA!", Gemini "NEW YORK!", Pisces "NEW ORLEANS!", Capricorn "CHICAGO!". THE STARS: "after Texas, you pick where we land." → "every sign-up is a *vote*." | **"Every sign-up is a *star*."** |
| 072 | st4debate | 20 | cinematic | A | **"The great city *debate*."** Libra moderates with its scale balanced on its head while stars argue at podiums. LIBRA: "for once, i'm *supposed* to stay neutral." → THE STARS: "the voters decide. that's *you*." | **"Your city. Your *call*."** |
| 073 | st4tally | 15 | jazzy | A | **"Virgo is counting the *votes*."** Virgo stands with a clipboard beside piles of envelopes; no numbers anywhere. VIRGO: "i'll count every single one. twice." → THE STARS: "relax. no winner *yet*." | **"Every vote *counts*."** |
| 074 | st4newyork | 15 | synthwave | A | **"Dear *New York*."** A dense generic skyline. Gemini is on a pixel subway car, texting five friends at once. THE STARS: "you're busy. we know." → "make *one* plan and keep it." | **"Busy isn't an *excuse*."** |
| 075 | st4la | 15 | pop | A | **"Dear *LA*."** A ring light and filters; Leo poses. THE STARS: "you look great in this light." → "let them see the *card* before the photo." | **"Fall for the *card*."** |
| 076 | st4exam | 20 | cinematic | D6 | **"Saturn's class: the *final exam*."** One question on the board: "WHAT DO YOU WANT?" Every star writes an honest, specific answer. SATURN: "there are no wrong answers." → "only *vague* ones." ★ LESSON UNLOCKED: "Specific is attractive." | **"Know what you *want*."** |
| 077 | st4chicago | 15 | jazzy | A | **"Dear *Chicago*."** Snow and wind; Capricorn is bundled up and still working. THE STARS: "cuffing season isn't a deadline." → "find someone you'd want in *July*, too." | **"Not just for *winter*."** |
| 078 | st4miami | 15 | house | A | **"Dear *Miami*."** Neon palms; Sagittarius rolls a suitcase past: "just visiting!" THE STARS: "everyone's passing through." → "be the one who *says* what they're looking for." | **"Say what you're *here* for."** |
| 079 | st4atlanta | 15 | lofi | A | **"Dear *Atlanta*."** A canopy of pixel trees; Cancer peeks out from behind a trunk. THE STARS: "come out of the woods." → "the right one is looking for you, *too*." | **"Be *findable*."** |
| 080 | st4retro4 | 20 | screwed | E4 | **"Retrograde hit the *ballot box*."** Retro spins the ballots backwards; one now reads "VOTE FOR YOUR EX." Every star screams. THE STARS: "nice try, Retro." → "the only thing on this ballot is *forward*." *flex* | **"Vote *forward*."** |

### Drop 9: "Anyone's game" (EP 081–090)
| EP | folder | len | music | thread | the film | last line |
|---|---|---|---|---|---|---|
| 081 | st4nashville | 15 | pop | A | **"Dear *Nashville*."** Pisces strums a pixel guitar, writing another sad song. THE STARS: "you write great sad songs." → "let someone give you a *happy* one." | **"Write a *new* song."** |
| 082 | st4seattle | 15 | lofi | C | **"Dear *Seattle*."** Rain on a coffee-shop window; the ghost sits alone with a book. THE STARS: "cozy is good. *hiding* forever isn't." → "say hi to the one who's *also* reading." | **"Say *hi*."** |
| 083 | st4neworleans | 15 | jazzy | A | **"Dear *New Orleans*."** A pixel brass band plays under a wrought-iron balcony while Libra dances. THE STARS: "you know how to celebrate." → "celebrate the *small* dates, too." | **"Celebrate the *small* stuff."** |
| 084 | st4surprise | 20 | funk | B7 | **"Leo plans a *surprise*."** Leo builds a huge public surprise: a spotlight, a banner, a crowd. Aquarius, the private one, freezes. Leo scraps it for a quiet rooftop with two cups and two pairs of headphones. LEO: "too much?" → THE STARS: "the best surprise is about *them*, not the show." | **"Surprise them *their* way."** |
| 085 | st4tauscorp | 20 | dreamy | F | **"Taurus and Scorpio, *finally*."** The kolache date from EP 004: the veil lifts, and it's Scorpio. Two fixed signs argue about where to sit, then both laugh. THE STARS: "opposites: same intensity, different *style*." → "loyalty looks good on you two." | **"Stubborn, but *together*."** |
| 086 | st4venusretro | 20 | dreamy | G | **"When Venus goes *retrograde*."** Venus dims while old flames glow on the horizon. It really happens about every 18 months, for about 40 days. VENUS: "when Venus goes retrograde, exes look brighter." → "that's nostalgia, not a *sign*. stay present." *flex* | **"Let old flames stay *old*."** |
| 087 | st4map | 20 | cinematic | A | **"The map is *lighting up*."** A stylised US map: Texas glows, and the candidate cities pulse (no numbers, no leader). THE STARS: "every sign-up is a star." → "which city lights up *next*?" | **"Light it *up*."** |
| 088 | st4sheetoff | 15 | lofi | C6 | **"The ghost takes the *sheet* off."** On a date, it's time for the face reveal. The ghost slides the sheet off: a regular little star, blushing. DATE: "you're cute!" → GHOST: "i'm also *here*. i'm staying." | **"Nobody hides *forever*."** |
| 089 | st4live5th | 20 | funk | A | **"LIVE from the *campaign trail*."** The sports booth from stlive5th (and batch 4's stmeetfriends) calls the vote like a game, with no numbers: "AND SEATTLE PULSES! NEW YORK ANSWERS!" THE STARS: "no winner yet." → "it's still anyone's *game*." | **"Anyone's *game*."** |
| 090 | st4sixcouples | 25 | cinematic | F | **"Six couples, one *sky*."** The six opposite pairs line up across the sky, and each pair's Push / Pull / Align reading pops between them. THE STARS: "every sign has an opposite." → "opposites don't complete you. they *stretch* you." | **"Stretch, don't *settle*."** |

### Drop 10: "The finale" (EP 091–100)
| EP | folder | len | music | thread | the film | last line |
|---|---|---|---|---|---|---|
| 091 | st4newmoon | 20 | dreamy | G | **"New moon, new *intentions*."** The Moon goes dark and whispers. MOON: "new moons are for starting things." → "write what you want in love. *one* line." (A card fills in: "someone who shows up".) *flex* | **"Start with *one* line."** |
| 092 | st4retrosorry | 20 | screwed | E5 | **"Retro *apologizes*."** The Mercury orb stops spinning backwards and reads a draft apology. RETRO: "i made everyone text their exes. sorry." → THE STARS: "looking back is fine. *learn* something." → "then look forward." | **"Look back. Then *forward*."** |
| 093 | st4graduation | 25 | cinematic | D7 | **"Saturn's class *graduates*."** Pixel caps and gowns. Saturn hands out diplomas: "KNOWS WHAT THEY WANT", "KIND GOODBYES", "PATTERNS: SPOTTED". SATURN: "i was strict because i *believe* in you." → "class dismissed. go love *well*." ★ LESSON UNLOCKED: "Grown-up love is a choice." | **"Class *dismissed*."** |
| 094 | st4movingin | 20 | dreamy | F | **"Cancer and Capricorn move *in*."** Moving boxes: Cancer packs the shell, Capricorn packs the calendar. CANCER: "where does your calendar go?" → CAPRICORN: "next to your shell. we'll make *room*." → THE STARS: "home is a schedule *and* a feeling." | **"Make *room*."** |
| 095 | st4anniversary | 20 | funk | F | **"Aries and Libra's *anniversary*."** Aries planned it in five minutes; Libra planned five options. ARIES: "let's go NOW." → LIBRA: "let's go… *together*." (They pick the first option and run.) | **"Fast *and* fair."** |
| 096 | st4exit | 20 | pop | F | **"Back on the *Loop*."** A callback to EP 002: Gemini and Sagittarius circle the 610 Loop again, but this time they take the exit marked "OUR PLACE". THE STARS: "remember going in circles?" → "look at you two. *going* somewhere." | **"Going *somewhere*."** |
| 097 | st4cats | 20 | dreamy | F | **"Virgo and Pisces, *date #20*."** No checklist. Pisces' bubble shows just the two of them on a couch, and the two daydream cats are real now. PISCES: "this is the dream." → VIRGO: "it's not perfect." → PISCES: "it's *ours*." | **"Not perfect. *Ours*."** |
| 098 | st4confession | 25 | lofi | C7 | **"The ghost has a *confession*."** The ghost turns to camera: "i've been in every episode." A fast montage of its hiding spots from EP 001–097 plays (from each lore.json). Then drop 5's last lines stack up and their first letters glow: HELLO TEXAS. GHOST: "i was too shy to say hi." → THE STARS: "hi. we *saw* you." | **"We *see* you."** |
| 099 | st4official | 25 | funk | B8 | **"Leo and Aquarius make it *official*."** On a Houston rooftop under every star, Leo shares its spotlight and Aquarius takes its headphones off. LEO: "you're my favorite *person*." → AQUARIUS: "you're my favorite *spotlight*." → THE STARS: "fixed fire, fixed air. fixed means *committed*." | **"Fixed means *committed*."** |
| 100 | st4finale | 30 | cinematic | A | **"Houston, we have a *match*."** Everyone gathers over Houston: the twelve stars and six couples, Saturn, the Moon, Venus, Retro, the ghost and the Aunties. The camera pulls up into the sky as the 100-star constellation completes into the seed-of-life logo and flows straight into the end card. THE STARS: "we came down to give advice." → "Houston first. Texas next." → "then wherever *you* vote us." | **"Where should we land *next*?"** |
