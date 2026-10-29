# Star Talk, seasons 10 and 11: one-minute stories (24 vertical episodes, 60 s each)

The user asked: "longer 1 min ones for each zodiac too. More in depth stories and adventure. Do some in space, do some as zodiac as babies and youth."

There are two seasons with one episode per sign each. Every episode is **60 s, including the 4.4 s end card**.
- **Season 10, "Little Stars":** each sign as a baby and a kid. This is the origin story of the adult we know from seasons 4–9.
- **Season 11, "Far Out":** each sign on a real space adventure, to a real place in or near its constellation.

Read first:
- STARTALK9.md: **the hook rules**. All seven apply.
- STARTALK.md and STARTALK3.md: the look and the contract.
- STARTALK7.md and STARTALK10.md: each sign's season-6 profile and season-9 day. The kid has to grow into that adult: the same fears, the same love language and the same props.
- STARTALK5.md and STARTALK6.md: the canon (couples, Saturn, the Moon, the ghost).
- Shared modules (never edit): startalk.js, lesson.js, stlore.js, st5cast.js, st8cast.js, st9day.js, cardfx.js, endcard.js and sky.js.

## A one-minute story (both seasons)
A minute is a real short film, so give it a real shape:

| part | time | what happens |
|---|---|---|
| **HOOK** | 0–3 s | Frame 0 is the thumbnail: the hook caption plus a character mid-action. |
| **WANT** | 3–12 s | What the sign wants, said plainly. |
| **TRY** | 12–30 s | The first attempt goes wrong in a way that's funny and true to the sign. |
| **TURN** | 30–42 s | A real fact, or a myth, changes how it sees the problem. This is the "huh!" moment. |
| **WIN** | 42–52 s | It solves the problem *with someone*, using the healthy version of its trait. |
| **LAST LINE** | 52–55.6 s | Inter 800 with a Garamond accent. |
| **END CARD** | 55.6–60 s | `cta: 'SIGN UP TO VOTE YOUR CITY'` |

- **Three or more locations or set-ups per episode.** It's an adventure, so it moves.
- **One emotional beat that lands:** a hug, a held hand, a "you came back".
- **A callback** to the sign's adult self in seasons 4–9, hidden as a rewatch gag. For example, Baby Cancer's blanket is the same pattern as adult Cancer's blanket fort in st9cancercrew.

## Season 10: "Little Stars" (S10 E01–E12)
**The world.** Stars are born in stellar nurseries, which is real: clouds of gas and dust such as the Orion Nebula. The baby signs start in the Star Nursery, a pastel nebula with cribs made of cloud, and grow up to the Zodiac Academy. The Moon is the nursery's night nurse, and Saturn is the strict but kind principal.

**The look:** `st10kids.js`, owned by the E01 session and pushed first as "st10kids: season 10 baby + kid stars".
- `drawBabyStar(ctx, x, y, size, t, { sign, age: 'baby' | 'kid', mood, ...drawStarChar opts })`:
  - a rounder, chubbier star with bigger eyes and a soft pastel version of the sign's colour;
  - 'baby' adds a tiny tuft and a pacifier option;
  - 'kid' adds a backpack option.
- `drawNursery(ctx, t, { glow })`: the pastel nebula with the cloud cribs.
- `drawAcademy(ctx, t, { room: 'hall' | 'class' | 'yard' | 'stage' })`: the school set.
- `drawCrayonFrame(ctx, t)`: the season's crayon-drawn border (a scrapbook / home-video feel), which keeps clear of the cardFrame corners.
- `growUp(ctx, t, { sign, at, x, y, size })`: a 1.5 s match-cut morph from the kid to today's adult star. Every episode ends on it, just before the last line.

**Every episode has:**
- a crayon "home video" caption with the age, for example "AGE 3 ½";
- one real fact (a "★ REAL SKY" or "★ IN THE MYTH" chip);
- the `growUp` morph;
- the ghost as a baby ghost (`drawGhostCameo`, cell 2), recorded in lore.json.

| EP | folder | music | hook (frame 0) | the story | real fact / myth | last line |
|---|---|---|---|---|---|---|
| 01 | st10aries | synthwave | "Baby Aries skipped *crawling*." | It goes straight to running, headbutts every door in the nursery and sprints to the slide first. At the Academy it wins every race but has no one to celebrate with. It learns to wait at the finish line for a friend (Libra, tiny, picking shoes). | **In the myth:** the golden ram rescued two *children*, Phrixus and Helle, and carried them through the sky. Aries was a kid-saver first. | **"First is fun. *Together* is better."** |
| 02 | st10taurus | lofi | "Baby Taurus has *one* food." | Mashed peas only. A new food arrives every day and is refused, slowly and firmly. Then Cancer (a kid) shares a homemade cookie and Taurus tries it. Now it's the friend who brings snacks to everyone. | **Real sky:** the Pleiades, the "Seven Sisters", ride on the Bull. It's a young star cluster, babies by star standards, and the stars in it formed together. | **"Try one *new* thing. Then share it."** |
| 03 | st10gemini | pop | "Gemini's first word was *two* words." | Twin babies in one crib babble at the same time, then finish each other's sentences at school. A teacher seats them apart and they're lost, so each learns a word to say *alone* and they reunite. | **In the myth:** one version says Castor and Pollux hatched from an egg (their mother was Leda). | **"Two voices. *One* heart."** |
| 04 | st10cancer | dreamy | "Baby Cancer won't let go of the *blanket*." | The blanket is a shell. First day at the Academy, too scared to go in. The Moon (night nurse) gives it a tiny Moon nightlight to carry. It ends by handing its blanket to a crying new kid. | **Real sky:** the Moon goes through its phases in about a month, the same face changing shape, and it's still the Moon. Cancer is ruled by the Moon. | **"Brave can be *soft*."** |
| 05 | st10leo | funk | "Leo's first *show-and-tell*." | Baby Leo already roars at the crib mobile. At kindergarten show-and-tell it freezes in the spotlight, stage fright. Aquarius (a kid, headphones) shines a flashlight from the back row like a spotlight, and Leo performs *for* one friend. | **Real sky:** the Sun is a star too, Leo's ruler. Our Sun is a middle-aged, ordinary star, and it's still everyone's favourite. | **"Shine *for* someone."** |
| 06 | st10virgo | jazzy | "Baby Virgo lined up the *crayons*." | By colour, aged one. Art class: a paint spill wrecks its perfect picture, so it cries, then Pisces (a kid) turns the spill into a galaxy and Virgo adds tiny stars. It's their first collab. | **Real sky:** Virgo is the biggest zodiac constellation. A big space has room for messes. | **"Messy can be *magic*."** |
| 07 | st10libra | dreamy | "Libra can't pick a *lunch* table." | The cafeteria as a giant scale, tipping between two tables of friends. It stands in the middle with its tray, lunch going cold. Then it pushes the two tables *together*. | **Real sky:** at the equinoxes day and night are about equal everywhere on Earth. Libra season starts near the September one. | **"Make *room* for everyone."** |
| 08 | st10scorpio | screwed | "Baby Scorpio *hides* in the nursery." | It hides in the dark dust of the nebula and won't play peekaboo. A patient kid (Taurus) plays every day anyway. On day 100 Scorpio pops out: "boo." It's a lifelong best friend. | **Real sky:** stars are born hidden inside dark clouds of dust, and many can only be seen in infrared until they shine through. | **"Hidden isn't *alone*."** |
| 09 | st10sag | house | "Baby Sag escaped the *playpen*." | The great playground expedition: a map, a stick-horse centaur and the sandbox "desert". It gets lost behind the slide, gets scared, and the Moon finds it. It learns to bring a buddy (Gemini). | **In the myth:** the wise centaur Chiron was a *teacher* who raised young heroes; one story links him to the Archer. | **"Explore. Then come *home*."** |
| 10 | st10capricorn | cinematic | "Capricorn was born *forty*." | A tiny briefcase and a sandcastle "project plan" with deadlines. The other kids are just playing. Saturn the principal (glasses) tells it: "recess is the assignment." It builds the castle *with* everyone, badly and happily. | **In the myth:** some stories link the sea-goat to Amalthea, the goat who nursed baby Zeus. Capricorn has cared for people since day one. | **"Play is *practice*, too."** |
| 11 | st10aquarius | synthwave | "Aquarius invented a *weird* thing." | At the science fair the invention (a machine that waters every plant at once) makes kids laugh. Then it rains on the fair, the machine saves the class garden, and the kids line up to help build version 2. | **Real sky:** the Helix Nebula in Aquarius is what's left when a star like our Sun gets old. It looks like a giant eye, and it's still beautiful. | **"Weird *works*. Ask Aquarius."** |
| 12 | st10pisces | dreamy | "Pisces has an imaginary *friend*." | An imaginary friend: a fish named Fish. It daydreams through class, then Virgo (a kid) asks to *see* Fish, and Pisces draws it. The whole class's imaginary friends parade. Season close: all twelve kids at the Academy graduation, then `growUp`, all at once. | **In the myth:** Aphrodite and Eros became two fish tied by a cord so they wouldn't lose each other. | **"Share your *dreams*. They grow."** |

## Season 11: "Far Out" (S11 E01–E12)
**The world.** Each sign, grown up, takes one mission in a pixel rocket to a real place in or near its constellation. Mission Control is in Houston: the Space Center Houston callback, season 4's "Houston, we have a match". Saturn is the flight director, and the ghost is a stowaway in every rocket.

**The look:** `st11space.js`, owned by the E01 session and pushed first as "st11space: season 11 rockets and mission kit".
- `drawRocket(ctx, x, y, size, t, { color, flame, shake })`: a pixel rocket in the sign's colour.
- `drawSpaceSuit(ctx, x, y, size, t, { sign, helmet: true, ...drawStarChar opts })`: the sign star in a bubble helmet, with a visor glare.
- `drawMissionControl(ctx, t, { screens })`: Houston Mission Control, with rows of consoles, a big screen and a "MISSION 01" title.
- `missionHUD(ctx, t, { mission, target, distance, status })`: a corner HUD with mission number, target name, a distance readout (light-years, real numbers only) and status.
- `starfield(ctx, t, { speed, warp })`: a parallax starfield, plus a warp-speed streak for travel.
- `drawPlanet(ctx, x, y, r, t, { kind, rings, bands, tilt })`: real-looking pixel planets.

**Every episode has:**
- the countdown "3… 2… 1…" in the first 5 s;
- a real target with its real distance;
- one big set-piece;
- the trip home;
- Houston Mission Control cheering;
- the ghost stowaway, recorded in lore.json.

**Distances.** Use these where given. Others are "about"; leave them out if you're unsure.

| EP | folder | music | hook (frame 0) | the mission | real astronomy | last line |
|---|---|---|---|---|---|---|
| 01 | st11aries | synthwave | "Aries is racing to the *equinox*." | A race to the spot in the sky where the year "starts", the March equinox point. Aries floors it to Aries… and the point isn't there. It has drifted into Pisces over the centuries. Aries laughs, turns around and finishes the race *with* Pisces. | Precession: Earth's axis wobbles slowly (one cycle takes about 26,000 years), so the equinox point has moved from Aries into Pisces. | **"The start moves. *Keep* going."** |
| 02 | st11taurus | lofi | "Mission: rescue the *Seven Sisters*." | The Pleiades call for help (a lost sister). Taurus flies to the cluster, about 440 light-years away, and counts: most people see only six or seven with the naked eye, but there are hundreds of stars. Nobody's lost. The family is just *bigger* than it looked. | The Pleiades: a young open cluster with hundreds of stars, about 440 light-years away. The blue haze around them is a dust cloud they're passing through. | **"Family is *bigger* than it looks."** |
| 03 | st11gemini | pop | "Gemini found out Castor is *six* stars." | Gemini flies to "its" twin star to say hi and finds Castor is really six stars in one system, three pairs dancing. A cosmic family reunion and the most Gemini thing ever. | Castor is a six-star system (three pairs of stars). Pollux is a single orange giant, and it has a planet. | **"Everyone's got *more* sides."** |
| 04 | st11cancer | dreamy | "Cancer is lost in the *Beehive*." | A homing mission into the Beehive Cluster (Praesepe). Hundreds of stars, and every one looks like home. Cancer follows the Moon's light back to Earth, Mission Control waves, and Capricorn has kept the porch light on. | The Beehive Cluster (M44) is about 600 light-years away, an open cluster with hundreds of stars, visible as a fuzzy patch without a telescope. | **"Home is a *light* someone leaves on."** |
| 05 | st11leo | funk | "Leo's star spins so fast it's *squished*." | Leo visits Regulus, its heart star, which spins so fast it bulges at the middle. A cosmic dance-off with a spinning star: Leo gets dizzy, slows down and finds its rhythm. | Regulus is about 79 light-years away and spins so fast it's flattened, wider at its equator than pole to pole. | **"Spin *your* speed."** |
| 06 | st11virgo | jazzy | "Virgo tried to organise a *galaxy cluster*." | The Virgo Cluster: more than a thousand galaxies. Virgo arrives with a label maker and gives up at galaxy 47. Then it flies to M87 and sees the black hole photo, the first ever. Some things are beautiful *because* they're too big to sort. | The Virgo Cluster has over a thousand galaxies. The black hole in galaxy M87 was the first ever photographed (released 2019). | **"Some things are too big to *fix*. Just look."** |
| 07 | st11libra | dreamy | "Libra is shopping for a *planet*." | A "real estate tour" of a star system in Libra (Gliese 581, with planets). Too hot, too cold… Libra learns the "Goldilocks zone", the just-right distance for liquid water, and that balance is a *place you find*. | Gliese 581 is a red dwarf in Libra about 20 light-years away, with known planets. The habitable or "Goldilocks" zone is where liquid water could exist. | **"*Balance* is a place you find."** |
| 08 | st11scorpio | screwed | "Scorpio's heart is a *supergiant*." | A trip to Antares, the red supergiant. It's huge: if it sat where our Sun is, it would swallow the orbit of Mars. Antares tells Scorpio that someday it will change (it will end as a supernova). Scorpio, who fears change, learns that change is how stars make new stars. | Antares is a red supergiant about 550 light-years away, so big it would reach past Mars's orbit. Stars that big end as supernovas and scatter the stuff of new stars. | **"Change is how *new* things are made."** |
| 09 | st11sag | house | "Sag is going to the *centre* of the galaxy." | The longest trip: toward Sagittarius A*, the black hole at the heart of the Milky Way. It aims its arrow-rocket at the centre and sees the glowing ring (the 2022 image). It turns back with the best story ever and tells Gemini at home. | The Milky Way's central black hole, Sagittarius A*, is about 26,000 light-years away. Its first image was released in 2022. | **"The best trips end with *someone* to tell."** |
| 10 | st11capricorn | cinematic | "Capricorn is visiting its *boss*." | A mission to Saturn, Capricorn's ruler. Ring-surfing: the rings are mostly chunks of ice. Saturn, at home at last, *relaxes*: no rulebook, just the rings. Capricorn learns even the strictest planet takes a day off. | Saturn's rings are mostly water ice. Saturn is so light for its size that it would float in a big enough bathtub (it's less dense than water). | **"Even Saturn takes a *day off*."** |
| 11 | st11aquarius | synthwave | "Aquarius visited the planet that *rolls*." | A mission to Uranus, its modern ruler, which spins tipped on its side. Aquarius loves it: "finally, someone who gets it." Then a detour to the Helix Nebula in its constellation, the "eye" in the sky. | Uranus is tilted about 98°, so it rolls around the Sun on its side. It was the first planet found with a telescope (1781). | **"Tilted is still *orbiting*."** |
| 12 | st11pisces | dreamy | "Pisces sailed to the *windiest* planet." | A dreamy voyage to Neptune, its modern ruler, deep blue with the fastest winds in the solar system. Pisces gets swept up, then finds calm in the still blue heart of a storm. Season close: all twelve rockets return to Houston, and Mission Control and the whole cast cheer. | Neptune has the fastest winds measured in the solar system. It was found in 1846 by maths before anyone saw it. | **"Find the *calm* in the storm."** |

## Accuracy (strict)
- **Only the facts in these rows**, worded with their hedges ("about", "one story says", "some stories link").
- **No other numbers.** If a distance or count isn't in the row, leave it out.
- **Myths are attributed.**
- **Traits are framed** as how astrology describes the sign.
- **No compatibility verdicts.**

## Every episode also has
- `cardFrame({ numeral: 'S10 E01' … 'S10 E12' })` or `cardFrame({ numeral: 'S11 E01' … 'S11 E12' })`;
- the faint seed constellation, top left;
- the ghost cameo, recorded in lore.json;
- end card with `cta: 'SIGN UP TO VOTE YOUR CITY'`.

## Rules
- **Length:** 60 s each, including the 4.4 s end card.
- **Box lines:** 70 characters or fewer, each readable for at least 1.5 s after it finishes typing.
- **Hook card:** frame 0 must work as a thumbnail.
- **Pure f(t),** with no `document` at module top level. Never say "Align" just before the end card.
- **Kids and babies:** cute, safe and warm. No peril beyond "lost for a moment"; a grown-up (the Moon, Saturn) is always nearby.
- **Process:**
  - contact sheets with `--sheet --rate=2`, looked at critically, at least two passes;
  - `teaser-sound.mjs` must run;
  - one commit per episode.
