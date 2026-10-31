# Star Talk, season 13: "Star Talk Explains" (40 vertical episodes, 30–60 s)

The user asked: "make like 40 more astrology & relationship explained videos but from the star talk stars." Lengths should vary; up to a minute is fine.

**The premise.** Star Talk Explains is a pixel classroom under the night sky. Every episode, a curious student star asks one question. A teacher star explains it at a chalkboard with diagrams. Every claim carries a small tag saying what kind of claim it is. The student gets it, and THE SHORT VERSION recap card lands. It's warm and clear, and funny in the way a good teacher is funny. It's built to be saved and shared ("wait, so THAT's what a rising sign is").

Read first:
- STARTALK9.md, "The hook rules": all seven apply.
- STARTALK.md and STARTALK2.md: the look, startalk.js (drawStarChar, dialogueBox, talkHops, talkCues), and the season 2 cast (the Aunties in reading glasses, Virgo with the clipboard, crying Pisces, Capricorn with the whistle).
- Shared modules (never edit): startalk.js, lesson.js, cardfx.js, endcard.js, sky.js, wheel.js, st5cast.js (drawSaturn, drawPluto, drawTwin) and st8cast.js (drawVenus, drawMars, drawComet).
- Model film for structure: promo/films/st12doubletext (an engine in scenes/, a data-driven episode in scenes/index.js). Props you can copy into your own folder, unchanged: promo/films/stmeetfriends2/scenes/props.js (auntie glasses, whistle, clipboard, crown, confetti, hearts, tears).

## The format (every episode)
1. **Frame 0, THE QUESTION.** A question card reads "STAR TALK EXPLAINS" with a pixel "?" badge. Under it is the question, Inter 800, at most 9 words, with one EB Garamond accent word. The student star is on screen, mid-"huh?", with a raised hand or a tilted look. It must work as a thumbnail with no fade from black.
2. **THE BOARD.** The teacher star steps up to a pixel chalkboard. The explanation is built on the board in 2–4 beats: chalk lines, diagrams, little labels typed on in chalk. The teacher and student trade lines in the retro dialogue box, and the speaker is always obvious.
3. **THE TAGS.** Every claim gets one small tag the moment it appears:
   - ✓ REAL ASTRONOMY for a fact about the sky;
   - ✦ IN ASTROLOGY for what astrologers say a thing means;
   - ♥ RELATIONSHIP TIP for a relationship idea or skill.
   This is the season's accuracy device. Never put an astrology meaning under ✓.
4. **THE LIGHTBULB.** The student gets it: a pixel lightbulb pops over their head, they re-say it in their own words, and it's a little funny.
5. **THE SHORT VERSION.** A recap card with 2–3 short items ticking in, then the last line (kept exactly) and the end card.
6. **End card:** `cta: 'SIGN UP TO VOTE YOUR CITY'`.

Pacing is the same at every length; longer episodes just get more board beats.
- **30 s:** one board beat and two tags, plus the recap.
- **45 s:** two or three board beats.
- **60 s:** three or four board beats, plus a short mid-episode gag or a demonstration.

## Shared kit `stexplain.js`
The lead session (the one that wrote this brief) owns it and pushes it as "stexplain: season 13 classroom kit". Never edit it, and never write your own copy. Its API:
- `loadExplainFonts()`: call it in build() before any DOM type.
- `questionCard(root, { q, at = 0, out, accentColor, top = 176 })` → `{ root, update(t), end }`: the frame-0 card, fully on screen at t = 0.
- `drawClassroom(ctx, t, { dim = 0, floorY = 1290 })`: the set, a night-sky classroom wall with a star-chart poster and the floor.
- `chalkboard(ctx, t, { x = 540, y = 760, w = 820, h = 520, at, out, title })` → `{ x0, y0, x1, y1, k }`: the board pops in; draw on it inside x0…x1, y0…y1.
- `chalkText(ctx, t, { text, x, y, at, size = 40, color, cps = 22, align = 'left' })`: chalk lettering that writes on.
- `chalkLine(ctx, t, { pts, at, dur = 0.6, color, width = 6, dash })` and `chalkCircle(ctx, t, { x, y, r, at, dur, color, width, from = -π/2, sweep = 2π })`: lines and arcs that draw on.
- `factTag(ctx, t, { kind: 'sky' | 'astro' | 'tip', at, out, x, y, align })`: the ✓ / ✦ / ♥ tag pill.
- `lightbulb(ctx, t, { at, x, y, dur = 1.6 })`: the pixel lightbulb, popping with a sparkle burst.
- `drawPointer(ctx, x, y, ang, { tap })`: the teacher's pointer stick.
- `gotIt(root, { items, at, out, title = 'THE SHORT VERSION', top = 560 })` → `{ root, update(t), end }`: the recap card; `items` holds up to 3 strings, each ≤ 34 characters, with one `*accent*` each.
- Cues:
  - `questionCues(at, { key })`;
  - `chalkCues(at, text, { cps })`, the chalk scratches;
  - `tagCues(at)`;
  - `bulbCues(at)`;
  - `gotItCues(at, { items, key })`.

Until it lands, plan and write your episodes against this API. Check for it in the background: `until git fetch -q origin claude/align-promo-video && git cat-file -e origin/claude/align-promo-video:promo/films/stexplain.js; do sleep 60; done`. The file's header is the source of truth if it differs from this list.

## Rules
- **Accuracy is strict.**
  - Real astronomy is stated plainly and correctly.
  - Astrology is always attributed ("in astrology…", "astrologers read…").
  - Relationship ideas are general, healthy and hedged, and never framed as a diagnosis.
  - No invented numbers. Use only the numbers in your row; if you're unsure of a fact, leave it out.
- **No compatibility verdicts or fortune-telling.**
  - No sign is a red flag; behavior is.
  - A chart describes; it never decides.
- **No real brands, businesses or people.**
- **Box lines** are 46 characters or fewer, each readable for at least 1.5 s after it finishes typing. The question is readable for at least 2.5 s. Recap items are readable for at least 2 s.
- **Classic Star Talk:** cardFrame with `numeral: 'S13 E01'` … `'S13 E40'`. No ghost cameo or seed constellation.
- **Pure f(t),** with no `document` at module top level. Never say "Align" in the 2 s before the end card.
- **Process:**
  - two or more contact-sheet passes with `--sheet --rate=4` (`--rate=2` at 45 s or more);
  - `teaser-sound.mjs` must run;
  - one commit per episode;
  - follow STARTALK-BUILD.md for setup, commits, final renders and gallery.

## The 40
Each row gives: episode, folder, length, music, the ❓ question (frame 0), the teacher and the student, the board beats with their tags, and the **last line** (kept exactly).

### Part 1 · The sky, explained (E01–E16)
| EP | folder | len | music | ❓ question | teacher / student | board beats (tag) | last line |
|---|---|---|---|---|---|---|---|
| 01 | st13zodiac | 45 | cinematic | "Why are there *12* signs?" | Saturn (pointer) / Pisces | ✓ The Sun seems to travel a yearly path against the stars, called the ecliptic. ✦ Astrology splits that path into 12 equal slices of 30° each (12 × 30 = 360), named after constellations along it. ✓ The real constellations are different sizes, and a 13th, Ophiuchus, also crosses the path. | **"Twelve *slices*. One sky."** |
| 02 | st13tropical | 45 | dreamy | "Is my sign *wrong* now?" | Saturn / a worried Aries | ✓ Earth's axis wobbles slowly (precession, about 26,000 years per circle), so the stars behind the Sun on your birthday have shifted since ancient times. ✦ Western (tropical) astrology ties signs to the seasons: Aries starts at the March equinox. ✦ Sidereal astrology, used in Vedic astrology, ties signs to the stars instead. | **"Your sign *stayed*. The sky moved."** |
| 03 | st13sunsign | 30 | pop | "What *is* a sun sign, actually?" | the Sun / Gemini | ✓ Where the Sun appeared along the zodiac when you were born; it moves into a new sign about once a month. ✦ In astrology the Sun is your core self. | **"Your birthday's *address* in the sky."** |
| 04 | st13moonsign | 30 | dreamy | "Why does my *Moon* sign matter?" | the Moon / Cancer | ✓ The Moon moves fast: it crosses a whole sign in about two and a half days. ✦ In astrology the Moon is feelings and what comforts you. | **"Feelings have a *sign* too."** |
| 05 | st13risingexp | 45 | synthwave | "What does *rising* sign mean?" | Libra / Taurus | ✓ The sign coming up over the eastern horizon at the moment you were born; it changes about every two hours on average, so birth time matters. ✦ In astrology it's your first impression, the front door. A horizon line sweeps the board. | **"Your sky's *first hello*."** |
| 06 | st13venus | 45 | pop | "What does your *Venus* sign say?" | Venus (drawVenus) / Virgo | ✓ Venus never strays more than about 47° from the Sun, so your Venus is in your sun sign or within two signs of it. ✦ In astrology Venus is what you love and how you show affection. ♥ Ask your person how they like to be loved. | **"Love has a *style*."** |
| 07 | st13mars | 30 | funk | "What's your *Mars* sign about?" | Mars (drawMars) / Pisces | ✓ Mars takes about 687 days to go around the Sun. ✦ In astrology Mars is drive: how you go after things and handle conflict. | **"Know your *fire*."** |
| 08 | st13mercury | 30 | lofi | "Why does *Mercury* run your texts?" | Mercury (a small grey-silver star with wing pixels) / Leo | ✓ Mercury is the closest planet to the Sun and the fastest, one orbit every 88 days. ✦ In astrology Mercury is how you think and talk. | **"Mind your *messages*."** |
| 09 | st13retroreal | 45 | screwed | "Do planets *really* go backwards?" | Saturn / Retro-panicking Gemini | ✓ No. Retrograde is apparent motion: Earth passes a slower outer planet, like passing a car on the highway, so it seems to slide backwards. ✓ Mercury looks retrograde about three times a year. ✦ Astrologers read it as a time to review, not a reason to panic. | **"It only *looks* backwards."** |
| 10 | st13houses | 60 | cinematic | "What are the *12 houses*?" | Virgo (clipboard) / Sagittarius | ✦ The houses split your chart into 12 areas of life, starting from the rising sign. ✦ The planet is the *what*, the sign is the *how*, the house is the *where*. Gag: the board becomes a 12-room pixel apartment building. | **"Every planet needs a *room*."** |
| 11 | st13aspects | 45 | jazzy | "What's an *aspect* in astrology?" | Libra / Aquarius | ✦ Aspects are the angles between planets in a chart: conjunction 0°, sextile 60°, square 90°, trine 120°, opposition 180°. ✦ Astrologers read them as conversations: easy, tense, or a mix. | **"Planets *talk* in angles."** |
| 12 | st13elementsx | 30 | house | "Fire, earth, air, water: *which* are you?" | the Stars / Leo | ✦ Each element holds three signs: fire Aries, Leo, Sagittarius; earth Taurus, Virgo, Capricorn; air Gemini, Libra, Aquarius; water Cancer, Scorpio, Pisces. ✦ Most charts mix several elements. | **"All four make a *meal*."** |
| 13 | st13modes | 30 | pop | "Cardinal, fixed, mutable: *what*?" | Capricorn (whistle) / Gemini | ✦ Cardinal signs start, fixed signs hold, mutable signs adapt. ✓ Each season begins as the Sun enters a cardinal sign: Aries, Cancer, Libra, Capricorn (Northern Hemisphere seasons). | **"Start. Hold. *Flow*."** |
| 14 | st13saturnreturn | 45 | cinematic | "What's a *Saturn return*?" | Saturn / the Aunties | ✓ Saturn takes about 29.5 years to go around the Sun, so it comes back to where it was at your birth around ages 27 to 30. ✦ Astrologers read it as a growing-up chapter. ♥ It's not a deadline for love. | **"Saturn *checks in*. You level up."** |
| 15 | st13eclipse | 45 | synthwave | "Why do astrologers *love* eclipses?" | the Moon / Aries | ✓ An eclipse happens when the Sun, Moon and Earth line up. ✓ Eclipse seasons come roughly every six months. ✓ Never look at the Sun without proper eclipse glasses. ✦ Astrologers read eclipses as turning points. | **"Line up. *Light* up."** |
| 16 | st13birthchart | 30 | dreamy | "What *is* a birth chart?" | the Stars / Pisces | ✓ A map of where the Sun, Moon and planets were, seen from where you were born, at the minute you were born. ✦ Astrologers read it like a story, not a sentence. | **"Your *first* sky."** |

### Part 2 · Love, explained by the stars (E17–E32)
Here the board holds relationship ideas, not astrology. Tags are mostly ♥. When a sign star teaches, its sign is flavour only; never claim a sign "is" a style.

| EP | folder | len | music | ❓ question | teacher / student | board beats (tag) | last line |
|---|---|---|---|---|---|---|---|
| 17 | st13attachment | 60 | cinematic | "What's an *attachment style*?" | Cancer / Aquarius | ♥ A psychology idea about how people seek closeness and safety: secure, anxious, avoidant, and a mix of anxious and avoidant. ♥ It's a pattern, not a diagnosis or a label for a person. ♥ Styles can shift with safe, steady relationships. | **"Styles can *grow*."** |
| 18 | st13repair | 45 | dreamy | "How do you *fix* a fight?" | Libra (scales) / Aries | ♥ Start soft: "I" statements, not "you always". ♥ If it's getting hot, take a real break and agree when you'll come back. ♥ Repair is small: a joke, a touch, "I hear you". | **"Pause. *Then* repair."** |
| 19 | st13boundaries | 45 | lofi | "What's a *boundary*, really?" | Capricorn / Libra | ♥ A boundary is what *you* will do, not a rule for someone else: "If you yell, I'll step out and we can talk later." ♥ Saying it kindly and clearly is a gift to both of you. | **"Boundaries are *doors*, not walls."** |
| 20 | st13flags | 45 | pop | "Red flag or *green* flag?" | Virgo (clipboard) / Pisces | ♥ Green: consistency, respecting a no, curiosity about you. ♥ Red: pressure, contempt, secrecy. ♥ No sign is a red flag; behavior is. | **"Flags are *actions*."** |
| 21 | st13lovebomb | 45 | screwed | "What's *love bombing*?" | Scorpio / Leo | ♥ Big intensity very fast (non-stop gifts, "soulmate" on day two) that later turns into pressure or control. ♥ Real interest is happy to go at your pace. | **"Real love can *wait*."** |
| 22 | st13consent | 30 | dreamy | "What does *enthusiastic* consent mean?" | the Stars / Taurus | ♥ A clear, freely given yes; a yes can change to a no at any time; check in, and keep checking in. Keep it gentle and non-explicit (a hug, holding hands). | **"Only *yes* means yes."** |
| 23 | st13jealousy | 45 | jazzy | "Where does *jealousy* come from?" | Scorpio / Gemini | ♥ Jealousy is a normal feeling that often points to a fear or a need. ♥ Talk about the need; don't police the person. | **"Name it. Don't *aim* it."** |
| 24 | st13feelings | 30 | funk | "How do you *say* how you feel?" | Gemini / Taurus | ♥ A simple frame: "I feel ___ when ___. I need ___." The board fills it in with a real example. | **"Feel. When. *Need*."** |
| 25 | st13listen | 30 | lofi | "How do you *actually* listen?" | Pisces / Aries | ♥ Reflect back what you heard, ask one question, and wait before fixing. | **"Hear it *before* you fix it."** |
| 26 | st13pace | 45 | synthwave | "How fast is *too fast*?" | Taurus / Sagittarius | ♥ There's no right speed, only a matched one. ♥ Check in out loud: "Is this pace good for you?" ♥ Feeling rushed is information. | **"Match the *pace*."** |
| 27 | st13goodbye | 30 | screwed | "How do you *end* things kindly?" | the Moon / Cancer | ♥ Be clear, be brief, be kind, and don't leave the door half open. The board shows a short, kind message. ♥ Kind isn't the same as vague. | **"Close the door *kindly*."** |
| 28 | st13trust | 45 | cinematic | "How is *trust* actually built?" | Saturn / Gemini | ♥ Trust grows from small moments: showing up when you said, keeping little promises, being the same person in private. The board stacks pixel bricks, one per promise kept. | **"Trust is *tiny* promises."** |
| 29 | st13needs | 30 | dreamy | "Is it *needy* to have needs?" | Cancer / Capricorn | ♥ Everyone has needs; saying them clearly is healthy. ♥ A need is a request, not a demand. | **"Needs aren't *needy*."** |
| 30 | st13selfworth | 45 | house | "Why does *self-worth* come first?" | Leo (crown) / Virgo | ♥ When you know your worth, you choose people who match it and you leave what doesn't. ♥ Your worth isn't a reply time. | **"Date from *full*, not empty."** |
| 31 | st13sameteam | 45 | funk | "How do you fight *fair*?" | Libra / Aries | ♥ It's you two against the problem, not against each other. ♥ One topic at a time, no name-calling, take breaks. The board turns a versus screen into a co-op screen. | **"You're on the *same* team."** |
| 32 | st13lasting | 60 | cinematic | "What keeps love *lasting*?" | the Aunties / a young Leo | ♥ Small daily attention, staying curious about each other, saying thank you, and repairing after fights. Gag: the Aunties' long marriage stories ("he still brings me tea"). | **"Love is a *daily* thing."** |

### Part 3 · Astrology meets dating (E33–E40)
| EP | folder | len | music | ❓ question | teacher / student | board beats (tag) | last line |
|---|---|---|---|---|---|---|---|
| 33 | st13synastry | 60 | jazzy | "What's *synastry*?" | Venus / Libra | ✦ Synastry is how astrologers compare two people's birth charts, laying one over the other. ✦ They read it for dynamics and talking points, not for verdicts. ♥ The best "compatibility test" is a real conversation. | **"Two skies. *One* conversation."** |
| 34 | st13composite | 45 | dreamy | "What's a *composite* chart?" | Venus / Gemini | ✦ Astrologers find the midpoint between each pair of matching planets in two charts and make one new chart for the relationship itself. ♥ A relationship is its own thing that you both tend. | **"The *us* has a chart."** |
| 35 | st13seventh | 45 | cinematic | "What's your *7th house*?" | Virgo / Sagittarius | ✦ The 7th house starts at the descendant, the point exactly opposite your rising sign. ✦ Astrologers call it the house of partnership. ♥ It describes; it doesn't pick your person. | **"Your sky has a *partner* room."** |
| 36 | st13juno | 30 | pop | "Who is *Juno* in astrology?" | Saturn / Taurus | ✓ Juno is an asteroid in the main belt between Mars and Jupiter, discovered in 1804. ✦ Some astrologers read Juno as commitment and partnership. | **"Even *asteroids* commit."** |
| 37 | st13nodes | 45 | synthwave | "What are the *lunar nodes*?" | the Moon / Scorpio | ✓ They are the two points where the Moon's path crosses the Sun's path, and eclipses happen near them. ✓ The nodes slide backwards around the zodiac in about 18.6 years. ✦ Astrologers read the north node as growth and the south node as comfort. | **"Grow *toward* your north."** |
| 38 | st13opposites | 45 | pop | "Do *opposite* signs attract?" | Libra / Aries | ✦ Opposite signs sit 180° apart on the wheel, like Aries and Libra. ✦ They share a modality, and their elements pair up: fire with air, earth with water. ✦ Astrologers read them as mirrors. ♥ Attraction is about people, not signs. | **"Opposites *mirror*."** |
| 39 | st13lens | 45 | lofi | "Is astrology a *science*?" | the Stars / a skeptical Capricorn | ✓ Astronomy is the science of the sky. ✦ Astrology is a symbolic tradition; many people use it for reflection and conversation. ♥ Use it to ask better questions, never to decide for you. Warm and honest, never mocking either side. | **"Use the sky to *ask* better."** |
| 40 | st13finale | 60 | cinematic | "What did the stars *teach* us?" | every teacher from the season / the whole class | The finale: graduation in the classroom, caps flying. Each teacher gives one line recapping their lesson (sky, love, charts). The recap is "You're a whole chart. And a whole person." | **"Class *dismissed*. Go love well."** |

## Sessions
Six cloud sessions build these, about seven episodes each:
- **A:** E01–07
- **B:** E08–14
- **C:** E15–21
- **D:** E22–28
- **E:** E29–34
- **F:** E35–40

Each session publishes its own gallery, "Star Talk S13 · E##–##", and reports back to the lead session.
