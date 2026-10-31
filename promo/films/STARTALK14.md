# Star Talk, season 12: "Hot Takes" (35 vertical episodes, 15–30 s)

The user asked: "a season of 35 controversial / hot takes, about relationships and zodiac and Houston/other cities."

**The premise.** The stars have opinions, and they're spicy. Every episode, one star drops a hot take, another star objects, and they argue fast. Then a verdict card lands with the honest, healthy nuance. The take is debatable and fun, but the verdict is always kind. It's built to start conversations and comments ("agree or disagree?") without being mean to anyone.

Read first:
- STARTALK9.md, "The hook rules": all seven apply. The hook is the whole point of this season.
- STARTALK.md and STARTALK2.md: the look, startalk.js and the season 2 cast (the Aunties, the Booth, Virgo with the clipboard, crying Pisces, Capricorn with the whistle).
- STARTALK4.md / STARTALK5.md: the season 4 Houston and city episodes (st4austin, st4dallas, st4newyork, st4la, st4miami, st4chicago, st4atlanta, st4loop, st4katy). Reuse their city stars' looks and props if they exist.
- Shared modules (never edit): startalk.js, lesson.js, cardfx.js, endcard.js and sky.js.

## The format (every episode)
1. **Frame 0, THE TAKE.** A flaming pixel stamp reads "🔥 HOT TAKE" (Space Mono, gold-to-red). Under it is the take, Inter 800, at most 8 words, with one Garamond accent word. The star who said it is mid-smirk. It must work as a thumbnail.
2. **HEAT METER.** A row of 1–5 pixel flames fills up in a corner; the row says how hot the take is.
3. **OBJECTION.** A second star bursts in ("OBJECTION!", a record scratch) with a counterpoint. They trade two or three quick lines, with the speaker always obvious.
4. **THE VERDICT.** A gavel or a judge's card slams down: "THE STARS RULE:" plus the nuanced, healthy truth in one or two lines. This is not a ★ LESSON UNLOCKED; it's its own "VERDICT" card style.
5. **AGREE / DISAGREE?** A pill pops up with two pixel buttons (🔥 AGREE · 🧊 DISAGREE) for half a second, then the last line.
6. **End card:** `cta: 'SIGN UP TO VOTE YOUR CITY'`.

**Shared kit `sthot.js`.** The E01 session owns it and pushes it first as "sthot: season 12 hot-take kit", with a copy-paste API header:
- `hotStamp(root, { take, at = 0, out, accentColor })`: the frame-0 stamp plus the take, on screen at t = 0;
- `heatMeter(ctx, t, { level, at, x, y })`;
- `objection(ctx, t, { at, x, y })`: the burst graphic;
- `hotCues(at, { key })` and `objectionCues(at, { key })`;
- `verdictCard(root, { text, at, out })`;
- `agreePill(ctx, t, { at, dur })`;
- `cityStar(ctx, x, y, size, t, { city, ...drawStarChar opts })`: city stars, each a plain star in a city colour with a small city badge (HOU, ATX, DAL, SA, NYC, LA, MIA, CHI, ATL) and one prop, kept affectionate.

## Rules
- **Playful, never mean.**
  - Takes may poke at *habits* and *trends*, never at groups of people.
  - No insults to a city's residents. City rivalry is friendly teasing about traffic, heat, food and size.
  - A sign is never a red flag. The verdict always lands on behavior, communication and kindness.
- **No real brands, businesses or people:**
  - no restaurant, store or chain names;
  - places only as public geography: the Loop, the Katy Freeway, Buffalo Bayou, Montrose, the Heights, Galveston, the Hill Country.
- **No compatibility verdicts** ("X and Y can't work") and no fortune-telling.
- **No invented statistics.** City facts only where the row gives them, hedged ("often called…").
- **Box lines** are 46 characters or fewer, each readable for at least 1.5 s after it finishes typing. The take is readable for at least 2.5 s.
- **Classic Star Talk:** cardFrame with `numeral: 'S12 E01'` … `'S12 E35'`. No ghost cameo or seed constellation, unless an episode row says otherwise.
- **Pure f(t),** with no `document` at module top level. Never say "Align" in the 2 s before the end card.
- **Process:**
  - two or more contact-sheet passes with `--sheet --rate=4`;
  - `teaser-sound.mjs` must run;
  - one commit per episode.

## The 35
Each row gives: episode, folder, length, music, the 🔥 take (frame 0), the heat (1–5), who argues, the verdict, and the **last line**.

### Part 1 · Relationships (E01–E14)
| EP | folder | len | music | 🔥 take | heat | who argues | verdict ("THE STARS RULE:") | last line |
|---|---|---|---|---|---|---|---|---|
| 01 | st12textback | 20 | pop | "Texting back fast isn't *desperate*." | 3 | Virgo (pro) vs Scorpio ("make them wait") | "games make tired people. reply when you can, mean it." | **"Fast is *fine*. Fake isn't."** |
| 02 | st12splitbill | 20 | funk | "Splitting the bill on date one is *fine*." | 4 | Libra (pro) vs Leo ("i'm paying, i insist!") | "talk about it. there's no rule, just respect." | **"Ask. Then *split* or treat."** |
| 03 | st12talkingstage | 15 | house | "Talking stage over a month? Just *ask*." | 3 | Aries (pro) vs Pisces ("but the mystery…") | "clarity is kind. 'what are we?' is a fair question." | **"Ask *what are we*. You're allowed."** |
| 04 | st12exfriends | 20 | screwed | "Being friends with your ex? Usually *no*." | 5 | Scorpio (pro) vs Aquarius ("we're totally fine!") | "it can work when it's truly over and your new partner is comfortable." | **"Closed doors. *Then* friendship."** |
| 05 | st12lovelangs | 20 | pop | "Love languages aren't a *personality*." | 3 | Virgo (pro) vs Leo ("words of affirmation IS me") | "they're a starting point. ask your person what lands." | **"Ask. Don't *assume*."** |
| 06 | st12phonecheck | 20 | screwed | "Checking their phone is *never* okay." | 4 | Taurus (pro) vs a nervous star ("but what if…") | "if you feel you need to snoop, talk about the trust instead." | **"Trust is *talked*, not tapped."** |
| 07 | st12softlaunch | 15 | synthwave | "Soft launches are *fine*. Hard launch when sure." | 2 | Gemini (pro) vs Leo ("POST THEM. NOW.") | "post when you're both ready. privacy isn't secrecy." | **"Your love, your *timeline*."** |
| 08 | st12doubletext | 15 | pop | "Double texting is *allowed*." | 3 | Gemini (pro) vs Capricorn ("one message. dignity.") | "two texts is fine. ten unanswered texts is a sign." | **"Text twice. *Read* the room."** |
| 09 | st12single30 | 20 | cinematic | "Single at 30 is a *flex*." | 4 | Saturn (pro, the Saturn return at about 27–30) vs the Aunties ("but WHEN?") | "single is a whole life, not a waiting room." | **"Single isn't *behind*."** |
| 10 | st12planning | 20 | cinematic | "Planning a date is the *most* romantic thing." | 3 | Capricorn (pro) vs Sagittarius ("spontaneity!!") | "effort is the romance. plans and surprises both count." | **"Effort is the *romance*."** |
| 11 | st12meetfriends | 20 | jazzy | "Meet their friends *before* month three." | 3 | Cancer (pro) vs Aquarius ("i'm a private person") | "you learn a lot from someone's people. go when it feels right." | **"Meet the *crew*. Learn a lot."** |
| 12 | st12surprise | 20 | funk | "Surprise parties are for the *planner*." | 4 | Virgo (pro) vs Leo ("I LOVE SURPRISES") | "know your person. some love a crowd, some love a quiet dinner." | **"Surprise them *their* way."** |
| 13 | st12matching | 15 | pop | "Matching outfits are *cute*, actually." | 2 | Libra (pro) vs Scorpio (all black, horrified) | "do what makes you both smile. cringe is a choice." | **"Be *cute*. Who's stopping you?"** |
| 14 | st12kind | 20 | dreamy | "Being kind on the apps is *rare*. Be rare." | 3 | The Stars (pro) vs a tired swiper ("why bother") | "one kind message beats ten ignored ones." | **"Kind is the *hottest* take."** |

### Part 2 · Zodiac (E15–E24)
| EP | folder | len | music | 🔥 take | heat | who argues | verdict | last line |
|---|---|---|---|---|---|---|---|---|
| 15 | st12notredflag | 20 | screwed | "Your sign isn't a red flag. Your *behavior* is." | 5 | Scorpio (pro, tired of the jokes) vs Gemini ("but the memes!") | "astrology describes, it doesn't excuse. own your actions." | **"Signs describe. *You* decide."** |
| 16 | st12sunsign | 20 | dreamy | "Your sun sign is the *least* interesting part of you." | 4 | the Moon (pro) vs the Sun ("EXCUSE ME?") | "in astrology your Moon and Rising matter too. you're a whole chart." | **"You're a whole *chart*."** |
| 17 | st12mercury | 20 | screwed | "Mercury retrograde didn't make you text your *ex*." | 5 | Saturn (pro) vs Retro ("it was me. sorry.") | "it's an optical illusion from Earth. the thumbs were yours." | **"Own the *text*."** |
| 18 | st12dealbreaker | 15 | lofi | "Astrology is a conversation starter, not a *dealbreaker*." | 3 | Virgo (pro) vs a star ("i only date earth signs") | "a sign tells you a vibe. a conversation tells you a person." | **"Ask, don't *rule out*."** |
| 19 | st12gemini | 15 | pop | "Geminis aren't two-faced. They're *two-hearted*." | 3 | Gemini (pro) vs Capricorn (skeptical eyebrow) | "people are complicated. that's not fake, that's human." | **"Complex isn't *fake*."** |
| 20 | st12cancer | 15 | dreamy | "Cancers aren't clingy. They're *loyal*." | 3 | Cancer (pro) vs Sagittarius ("they texted 9 times") | "needs are valid. say them out loud, kindly." | **"Say the *need*. It's okay."** |
| 21 | st12leoseason | 20 | funk | "Leo season is the *best* season." | 4 | Leo (pro) vs all eleven ("BOO") | "every season is someone's birthday. celebrate them all." | **"Every season is *someone's*."** |
| 22 | st12rising | 20 | synthwave | "Your rising sign is who shows up on the *first date*." | 3 | Libra (pro) vs Taurus ("i'm just me, always") | "in astrology the rising is the first impression. stay for the rest." | **"First *impression*. Not the whole book."** |
| 23 | st12virgo | 15 | jazzy | "Virgos aren't picky. They have *standards*." | 4 | Virgo (pro) vs Pisces ("you re-folded my towels") | "standards are good. so is letting small things go." | **"High standards. *Soft* hands."** |
| 24 | st12nobadsign | 25 | cinematic | "No sign is *bad* at love." | 3 | the whole zodiac argues, then agrees | "love is a skill. every sign can learn it." | **"Love is a *skill*. Practice."** |

### Part 3 · Houston and other cities (E25–E35)
City stars come from `cityStar`. The jokes tease traffic, heat, size and food in general, never people.

| EP | folder | len | music | 🔥 take | heat | who argues | verdict | last line |
|---|---|---|---|---|---|---|---|---|
| 25 | st12houstonbest | 20 | house | "Houston is the *best* dating city in Texas." | 5 | the Houston star (pro) vs the Austin and Dallas stars | "the best city is the one where you actually show up." | **"Best city? The one you *show up* in."** |
| 26 | st12twentymin | 15 | lofi | "In Houston, 20 minutes away is *long distance*." | 4 | the Houston star (pro, stuck on the Katy Freeway) vs Sagittarius ("it's a short drive!") | "Houston is huge. meet in the middle, take turns driving." | **"Meet in the *middle*. Literally."** |
| 27 | st12humidity | 15 | dreamy | "Houston humidity is a *test* of true love." | 3 | Cancer (pro, melting) vs the Houston star ("it's good for your skin") | "if they still hold your hand in August, keep them." | **"Sweaty hands. *Still* holding."** |
| 28 | st12diverse | 20 | cinematic | "In Houston, date *outside* your bubble." | 3 | the Houston star (pro) vs a shy star ("i like my usual") | "Houston is often called one of the most diverse cities in the country. say yes to new." | **"New *neighborhood*. New story."** |
| 29 | st12foodfight | 20 | funk | "Houston food beats *Austin* food." | 5 | the Houston star vs the Austin star, a pixel food fight | "the real winner is sharing a plate with someone you like." | **"Eat both. *Together*."** |
| 30 | st12austin | 15 | synthwave | "Austin is *overrated* for dating." | 5 | Leo vs the Austin star (with a guitar) | "no city is overrated. bad dates are." | **"No city's *overrated*. Effort isn't."** |
| 31 | st12dallas | 15 | pop | "Dallas dresses up for brunch. Houston dresses for the *heat*." | 3 | the Dallas star (pro, tiny blazer) vs the Houston star (shorts, fan) | "dress like you, not your city. confidence is the outfit." | **"Wear the *confidence*."** |
| 32 | st12nyc | 15 | jazzy | "NYC dates move fast. Houston moves at *traffic speed*." | 3 | the NYC star vs the Houston star | "find your pace together. fast or slow, just match." | **"Same *pace*. Any city."** |
| 33 | st12la | 15 | dreamy | "LA dates are about being seen. Houston's are about being *fed*." | 4 | the LA star (sunglasses) vs the Houston star (napkin tucked in) | "the best date is where you actually talk." | **"Be *seen*. Be fed. Be heard."** |
| 34 | st12summer | 20 | house | "Houston summer is *hotter* than Miami summer." | 4 | the Houston star vs the Miami star, both sweating | "it's a tie. bring water. and someone to share the AC." | **"Hot take. *Hotter* summer."** |
| 35 | st12finale | 30 | cinematic | "Your city doesn't decide your love life. *You* do." | 5 | The finale. All the city stars and the zodiac on a rooftop at sunset. Every city star argues for its town, then the Houston star says: "so… vote for yours." A map lights up city by city (the season 4 city vote callback). | "love happens wherever people are brave and kind. vote for the city you want next." | **"Your city. Your *vote*. Your story."** |
