# Star Talk: "Your Star Guide" (40 vertical films, 15–30 s)

The user asked: "make even more, like 40, stars giving you relationship advice, speaking to your zodiac sign as their personal star guide."

**The premise.** Every sign has a personal star guide: its own star, which knows it better than anyone. The guide speaks *directly to you* in the second person, for your sign. It's warm, honest, a little cheeky, and always on your side.
- **Per sign:** three notes for each of the twelve signs, so 36 films.
- **Per element:** four pep talks where a guide speaks to all three signs of one element.

Read first:
- STARTALK.md: the season 1 look, tone and the startalk.js module.
- STARTALK12.md: the "Ask the Stars" films, the closest siblings.
- STARTALK9.md, section "The hook rules": all seven apply.
- Model films: askaries, askpisces, starscorpio and starleo.
- Shared modules (never edit): startalk.js, lesson.js, cardfx.js, endcard.js and sky.js.

## The format
**The guide.** Your sign's star, big and centred (about 300–360 px), in its sign colour. It's distinguished from other films by a tiny gold **lantern** it carries: the guide lights your way. The name tag reads **"♈ YOUR STAR"** (with your sign's glyph).

**The note header.** A small Space Mono gold chip at the top: **"STAR GUIDE · ♈ ARIES · NOTE 1 / 3"**.

**The three notes per sign:**
1. **The blind spot:** what you do that gets in your way in love, said kindly.
2. **What you need:** what to look for in a partner, framed as needs, never as which signs to date.
3. **Try this week:** one small, concrete, healthy action.

**The structure:**
- **Frame 0:** the hook headline, Inter 800 with a Garamond accent, addressing the sign by name ("*Aries*, your star has a note."), with the guide already lit.
- **Then** two box lines, 46 characters or fewer, lowercase, in the guide's voice.
- **One visual gag** that fits the sign.
- **One real astrology chip**, as given.
- **Optional tie-in:**
  - Push / Pull / Align;
  - talk cards (answers stay hidden until both play);
  - dealbreakers;
  - tonight's deck;
  - "Card first. Face last.".
- **The last line.**
- **End card:** `buildEndcard` with `cta: 'SIGN UP TO VOTE YOUR CITY'`.

**The shared kit `stguide.js`** is owned by the session that builds Aries. It pushes the kit first, as "stguide: Your Star Guide kit", with a copy-paste API header:
- `drawLantern(ctx, x, y, size, t, { glow })`: the guide's lantern;
- `noteChip(root, { sign, glyph, n, of: 3, at, out })`: the header chip;
- `guideHook(root, { text, at = 0, out, accentColor })`: the frame-0 headline, on screen at t = 0;
- `factChip(ctx, t, { text, at, dur, x, y })`: a small "★ ASTROLOGY SAYS" chip;
- `guideCues(...)`: a soft lantern chime.

## Rules
- **Box lines:** 46 characters or fewer, each readable for at least 1.5 s after it finishes typing.
- **Frame 0** works as a thumbnail.
- **Something changes every 3–5 s.**
- **Never say "Align"** in the 2 s before the end card.
- **Traits** are "how astrology describes" the sign.
- **No compatibility verdicts:** never "date a Taurus".
- **No fortune-telling and no invented numbers.**
- **Classic Star Talk:** no ghost cameo, no seed constellation and no season numerals.
- **Pure f(t),** with no `document` at module top level.
- **Process:**
  - two or more contact-sheet passes with `--sheet --rate=4`;
  - `teaser-sound.mjs` must run;
  - one commit per film.

## The 36 sign notes
Folders are `guide<sign><n>`, with `<sign>` one of aries, taurus, gemini, cancer, leo, virgo, libra, scorpio, sag, capricorn, aquarius, pisces. Lengths: note 1 is 20 s, note 2 is 15 s, note 3 is 20 s. Music is per sign: Aries synthwave, Taurus lofi, Gemini pop, Cancer dreamy, Leo funk, Virgo jazzy, Libra dreamy, Scorpio screwed, Sag house, Capricorn cinematic, Aquarius synthwave, Pisces dreamy.

| folder | hook (frame 0) | box lines (the guide speaking) | gag | astrology chip | last line |
|---|---|---|---|---|---|
| guidearies1 | "*Aries*, your star has a note." | "you decide in a second. they need a week." → "that's not rejection. that's pace." | Aries revving at a starting line while the other star is still tying its shoes. | Aries: cardinal fire, ruled by Mars | **"Fast heart. *Patient* hands."** |
| guidearies2 | "What you *need*, Aries." | "someone who loves your fire…" → "and doesn't fan every spark into a fight." | A campfire, cozy, not a wildfire. | The fire signs: Aries, Leo, Sagittarius | **"Love the fire. Not the *fights*."** |
| guidearies3 | "Try this week, *Aries*." | "ask one question. then wait for all of it." → "no interrupting. we'll be counting." | The guide holds up a pixel stopwatch and counts on its points. | Aries is the natural ruler of the 1st house (self) | **"Listen like you *mean* it."** |
| guidetaurus1 | "*Taurus*, your star has a note." | "you dug in. we saw. it's cute. it's a wall." → "try 'you might be right' once." | A tiny wall of pixel bricks; Taurus removes one brick. | Taurus: fixed earth, ruled by Venus | **"Steady, not *stuck*."** |
| guidetaurus2 | "What you *need*, Taurus." | "someone who shows up the same way twice." → "steady is your love language." | A calendar with the same heart on every Friday. | In traditional astrology Taurus rules the throat | **"Pick *consistent* over exciting."** |
| guidetaurus3 | "Try this week, *Taurus*." | "you show love with snacks. we know." → "say it out loud too. just once." | Taurus hands over a pixel cookie, then a speech bubble heart. | Taurus is the natural ruler of the 2nd house (values) | **"Feed them. Then *tell* them."** |
| guidegemini1 | "*Gemini*, your star has a note." | "you're texting eight people. call one." → "depth over a full inbox." | Eight chat bubbles pop; Gemini closes seven. | Gemini: mutable air, ruled by Mercury | **"One *real* talk beats ten chats."** |
| guidegemini2 | "What you *need*, Gemini." | "someone who keeps up with your brain…" → "and still likes you when you're quiet." | Gemini talks fast in a blur of letters, then sits quietly and is still loved. | Gemini's two brightest stars are named Castor and Pollux | **"Fun *and* deep. You get both."** |
| guidegemini3 | "Try this week, *Gemini*." | "one date. phone face down. whole time." → "watch what happens. (it's good.)" | The phone flips face down and sparkles bloom around the table. | Gemini is the natural ruler of the 3rd house (communication) | **"Be *here*. They'll notice."** |
| guidecancer1 | "*Cancer*, your star has a note." | "you take care of everyone first." → "your feelings count too. say them." | Cancer carries a stack of soup bowls for everyone, and none for itself. | Cancer: cardinal water, ruled by the Moon | **"Care for *you*, too."** |
| guidecancer2 | "What you *need*, Cancer." | "someone who remembers the little things…" → "and lets you be soft." | A sticky note: "you said you like peaches 🍑". | Cancer is the natural ruler of the 4th house (home) | **"Soft is *safe* here."** |
| guidecancer3 | "Try this week, *Cancer*." | "don't wait for them to guess." → "ask for the hug. out loud." | Cancer's shell opens a crack; its arms come out. | The Moon cycles through its phases in about a month | **"Ask for what you *need*."** |
| guideleo1 | "*Leo*, your star has a note." | "the spotlight's great. share it." → "ask about their day. then ask again." | The spotlight widens to two circles. | Leo: fixed fire, ruled by the Sun | **"Shine *with* them."** |
| guideleo2 | "What you *need*, Leo." | "someone who cheers loud for you…" → "and you cheer even louder back." | Two stars holding foam fingers for each other. | Leo is the natural ruler of the 5th house (romance, play) | **"Be *celebrated*. Celebrate back."** |
| guideleo3 | "Try this week, *Leo*." | "plan a date around what *they* love." → "their favorite. not yours. we'll check." | Leo crosses out "my favorite restaurant" on a list. | In traditional astrology Leo rules the heart | **"Their *favorite*, not yours."** |
| guidevirgo1 | "*Virgo*, your star has a note." | "you're looking for flaws to fix." → "they're a person, not a project." | Virgo puts down a red pen. | Virgo: mutable earth, ruled by Mercury | **"Love them *as is*."** |
| guidevirgo2 | "What you *need*, Virgo." | "someone who notices how much you do…" → "and actually says thank you." | A tiny gold "THANK YOU" ribbon pinned on Virgo. | Virgo is the natural ruler of the 6th house (daily routines) | **"Your effort *deserves* thanks."** |
| guidevirgo3 | "Try this week, *Virgo*." | "leave one thing unplanned this weekend." → "one. we're not monsters." | A schedule with one blank block glowing gold. | Virgo is the largest zodiac constellation | **"Let it be *a little* messy."** |
| guidelibra1 | "*Libra*, your star has a note." | "you say 'whatever you want.' you mean it?" → "share your opinion. balance needs two." | The scale tips because one side is empty; Libra adds its own weight. | Libra: cardinal air, ruled by Venus | **"Your *opinion* is welcome."** |
| guidelibra2 | "What you *need*, Libra." | "someone who meets you halfway…" → "and doesn't keep score." | A scoreboard unplugs itself. | Libra is the natural ruler of the 7th house (partnership) | **"*Halfway* is a place you meet."** |
| guidelibra3 | "Try this week, *Libra*." | "say one honest 'no.' kindly." → "the sky won't fall. we checked." | Libra says "no" and the sky stays perfectly in place. | Libra season starts near the September equinox | **"No can be *lovely*."** |
| guidescorpio1 | "*Scorpio*, your star has a note." | "you test people to see if they'll stay." → "just tell them what you need." | A pop-quiz paper that Scorpio crumples up. | Scorpio: fixed water; ruled by Mars (traditional) and Pluto (modern) | **"Ask. Don't *test*."** |
| guidescorpio2 | "What you *need*, Scorpio." | "someone who goes deep and doesn't flinch." → "loyal. the real kind." | A diver's helmet; both stars dive together. | Scorpio is the natural ruler of the 8th house (intimacy, transformation) | **"Deep *and* safe."** |
| guidescorpio3 | "Try this week, *Scorpio*." | "share one small secret first." → "small. like 'i love bad movies.'" | A tiny vault opens and a pixel popcorn bucket pops out. | Antares, the red heart of the Scorpion | **"Let them *in*. A little."** |
| guidesag1 | "*Sagittarius*, your star has a note." | "you get restless when it gets serious." → "staying can be the adventure." | A packed backpack that Sag slowly unpacks. | Sagittarius: mutable fire, ruled by Jupiter | **"Stay for the *good part*."** |
| guidesag2 | "What you *need*, Sagittarius." | "someone who lets you roam…" → "and is still there when you're back." | A porch light left on at the end of a long road. | Sagittarius is the natural ruler of the 9th house (travel) | **"Freedom *and* home."** |
| guidesag3 | "Try this week, *Sagittarius*." | "plan a tiny trip. together." → "even a new coffee place counts." | A map with a short dotted line to a coffee cup. | The centre of our galaxy lies in the direction of Sagittarius | **"Explore *together*."** |
| guidecapricorn1 | "*Capricorn*, your star has a note." | "work comes first. every time. we see you." → "love doesn't wait in your inbox." | An inbox with a heart buried under 40 emails. | Capricorn: cardinal earth, ruled by Saturn | **"Love isn't a *task*."** |
| guidecapricorn2 | "What you *need*, Capricorn." | "someone with their own big goals…" → "who respects yours. a team." | Two little mountain flags planted side by side. | Capricorn is the natural ruler of the 10th house (career) | **"*Build* together."** |
| guidecapricorn3 | "Try this week, *Capricorn*." | "log off at 7. text them first." → "yes, before the email. we'll wait." | A laptop closes; a phone heart lights up. | In traditional astrology Capricorn rules the knees and bones | **"Clock out. *Show up*."** |
| guideaquarius1 | "*Aquarius*, your star has a note." | "you go quiet when it gets emotional." → "say 'i need a minute.' then come back." | Headphones go on, then come off. | Aquarius: fixed air; ruled by Saturn (traditional) and Uranus (modern) | **"Step back. *Come back*."** |
| guideaquarius2 | "What you *need*, Aquarius." | "someone who's also your best friend…" → "and loves your weird. all of it." | Two stars in matching weird hats. | Aquarius is the natural ruler of the 11th house (friendship) | **"Friend *first*."** |
| guideaquarius3 | "Try this week, *Aquarius*." | "share a feeling. not a theory." → "'i felt happy today' counts." | A whiteboard of theories gets wiped; one heart is drawn. | Aquarius is an air sign, despite the water-bearer | **"Feel it *out loud*."** |
| guidepisces1 | "*Pisces*, your star has a note." | "you fall for who they could be." → "date who they are today." | A dreamy thought bubble pops; the real star is still nice. | Pisces: mutable water; ruled by Jupiter (traditional) and Neptune (modern) | **"Love the *real* them."** |
| guidepisces2 | "What you *need*, Pisces." | "someone gentle with your heart…" → "who still keeps you grounded." | Pisces floats up; the partner holds a balloon string. | In traditional astrology Pisces rules the feet | **"Gentle *and* grounded."** |
| guidepisces3 | "Try this week, *Pisces*." | "say your boundary before you're tired." → "kind to them. kind to you. both." | A small pixel fence with a heart on the gate. | Pisces is the natural ruler of the 12th house (rest, the hidden) | **"Kind to them. *Kind to you*."** |

## The 4 element pep talks (30 s each)
The guide gathers its element's three signs on a little cloud. They get one shared truth, one healthy habit, and a last line.

| folder | music | hook | the talk | chip | last line |
|---|---|---|---|---|---|
| guidefire | synthwave | "*Fire* signs, gather round." | Aries, Leo and Sag around a campfire. "you love big and fast. we adore that." → "but fire needs air and time to breathe." → "let the other person catch up." The fire settles into a warm glow. | The fire signs: Aries, Leo, Sagittarius | **"Burn *warm*, not out."** |
| guideearth | lofi | "*Earth* signs, gather round." | Taurus, Virgo and Capricorn in a garden. "you build love like a garden. slowly." → "but don't plan every seed." → "let one surprise grow." A wildflower sprouts. | The earth signs: Taurus, Virgo, Capricorn | **"Plant it. Then *let it grow*."** |
| guideair | pop | "*Air* signs, gather round." | Gemini, Libra and Aquarius floating with paper planes. "you talk, think and connect. it's a gift." → "but feelings aren't always words." → "sometimes just sit close." The paper planes land. | The air signs: Gemini, Libra, Aquarius | **"Less *talk*. More close."** |
| guidewater | dreamy | "*Water* signs, gather round." | Cancer, Scorpio and Pisces by a moonlit pool. "you feel everything. that's your power." → "but you can't hold the whole ocean." → "share some. let them help." The pool ripples into hearts. | The water signs: Cancer, Scorpio, Pisces | **"Feel deep. *Share* the weight."** |
