# Star Talk, more seasons 1 and 2: advice from the stars (20 vertical films)

The user asked: "more for season 1 & 2 star talk giving advice content, we don't have as much there as other seasons."

Seasons 1 and 2 have only five films each. This adds **12 season 1 films** (short, direct advice) and **8 season 2 films** (longer advice stories with ★ LESSON UNLOCKED). The look, cast and rules stay exactly the same.

Read first:
- **STARTALK.md:** the season 1 look, tone and the startalk.js module.
- **STARTALK2.md:** the season 2 format, the recurring cast and the LESSON beat.
- **Model films:**
  - starscorpio, starleo, starmercury and starvenus (season 1);
  - stlive5th, staunties, stintervention and stwereup (season 2).
- **Shared modules (never edit):** startalk.js, lesson.js, cardfx.js, endcard.js and sky.js.
- **Not in these films:**
  - no Houston or Texas storyline;
  - no season 4–11 lore (no ghost cameo, no seed constellation, no season numerals);
  - these are classic Star Talk.
- **End card:** `buildEndcard` with `cta: 'SIGN UP TO VOTE YOUR CITY'`.
- **The Align tie-in uses real features only:**
  - "Card first. Face last.";
  - talk cards (answers stay hidden until both of you play);
  - Push / Pull / Align;
  - dealbreakers (picked at signup and stamped on your card);
  - tonight's deck (dealt every night).
- **Never say "Align"** in the 2 s before the end card.
- **The hook rules from STARTALK9.md apply:**
  - frame 0 is the thumbnail;
  - something changes every 3–5 s;
  - the last line lands.

## Season 1 extra: "Ask the Stars" (12 films, 15–30 s)
**The format.** A viewer's question pops in as a DM bubble (a pixel phone notification, "asked anonymously"). Then one sign's star answers it in the RPG text box, from that sign's strength. The sign is the *expert*, not the patient. The structure:
- **Headline:** the question, in Inter 800 with a Garamond accent.
- **The answer:** two or three box lines.
- **One visual gag.**
- **One real astrology note:** a small chip with the sign's ruler, element or modality, and only those.
- **The tie-in.**
- **The last line.**

Folders are `ask<sign>`.

| folder | len | music | the question (headline) | who answers, and the gag | the advice (box lines, ≤ 46 chars each) | real note | last line |
|---|---|---|---|---|---|---|---|
| askaries | 15 | synthwave | "Should I make the *first* move?" | ♈ ARIES, already in running shoes. It does a starting-blocks pose and a starter-pistol "POP". | "yes. a simple 'want to get coffee?' counts." → "then let *them* answer. no pressure." | Aries: cardinal fire, ruled by Mars | **"Go *first*. Then go easy."** |
| asktaurus | 20 | lofi | "What's a good *first* date?" | ♉ TAURUS in an apron, holding a pixel picnic basket. A blanket unrolls and a tiny candle lights. | "somewhere you can actually hear each other." → "food helps. so does sitting down." → "loud bars are for third dates." | Taurus: fixed earth, ruled by Venus | **"Cozy beats *fancy*."** |
| askgemini | 20 | pop | "I never know what to *say*." | ♊ GEMINI with a deck of question cards fanned like a magician's. It shuffles and flicks one at you. | "ask what made them laugh this week." → "then actually listen to the answer." → "follow-up questions are the whole trick." | Gemini: mutable air, ruled by Mercury | **"Curious is *charming*."** |
| askcancer | 30 | dreamy | "They want me to meet their *family*." | ♋ CANCER with a homemade pie and a tiny name-tag sticker. Nervous practice handshakes in a pixel mirror. | "bring something small. flowers. a dessert." → "ask the parents one question about them." → "and let your date rescue you if needed." → "family isn't a test. it's a welcome." | Cancer: cardinal water, ruled by the Moon; the sign of home in astrology | **"Show up *warm*. That's enough."** |
| askleo | 15 | funk | "How do I give a *real* compliment?" | ♌ LEO in a crown, mirror in hand, who turns the mirror around to face *you*. | "skip 'you look nice.' be specific." → "'you explain things so well' hits harder." | Leo: fixed fire, ruled by the Sun | **"Notice the *details*."** |
| askvirgo | 20 | jazzy | "How long should I wait to *text* back?" | ♍ VIRGO with a stopwatch, which then throws the stopwatch away. | "there is no secret timer. we checked." → "reply when you can. mean what you say." → "games make tired people." | Virgo: mutable earth, ruled by Mercury | **"Clear is *kind*."** |
| asklibra | 20 | dreamy | "We can never pick *where* to eat." | ♎ LIBRA balancing two menus on its scale until it tips. Then a coin flip with a sparkle. | "take turns choosing. write it down." → "you pick tuesday. they pick friday." → "fair is a schedule, not a feeling." | Libra: cardinal air, ruled by Venus | **"*Take turns.* Love grows there."** |
| askscorpio | 20 | screwed | "How do I know if I can *trust* them?" | ♏ SCORPIO with a magnifying glass, which it slowly lowers. | "watch if their words and actions match." → "over weeks. not one big moment." → "and ask. trust is built, not found." | Scorpio: fixed water; ruled by Mars (traditional) and Pluto (modern) | **"Trust is *built*. Brick by brick."** |
| asksag | 15 | house | "Is it okay to want *space*?" | ♐ SAGITTARIUS with a backpack, on a tiny pixel bench under a tree. | "yes. and say it out loud." → "'i need a night to myself' isn't a breakup." | Sagittarius: mutable fire, ruled by Jupiter | **"Space, *said kindly*, is healthy."** |
| askcapricorn | 30 | cinematic | "I'm too *busy* to date." | ♑ CAPRICORN behind a planner stacked to the sky. Then one calendar block lights up gold: "DATE · 7PM". | "you schedule the gym. schedule this." → "one evening a week. phone in a drawer." → "busy people still deserve love." → "you just have to make room." | Capricorn: cardinal earth, ruled by Saturn | **"Make *room*. Then show up."** |
| askaquarius | 20 | synthwave | "Am I too *weird* to date?" | ♒ AQUARIUS with a whiteboard of odd hobbies. Then another star appears holding the *same* weird hobby. | "the right person likes your weird." → "lead with it. it filters fast." | Aquarius: fixed air; ruled by Saturn (traditional) and Uranus (modern) | **"Weird is a *filter*. Use it."** |
| askpisces | 30 | dreamy | "How do I get over *someone*?" | ♓ PISCES with a box of tissues, a sad song and then a sunrise. It hands you the last tissue and opens a window. | "feel it. cry if you need to. really." → "then unfollow. it's not mean. it's mercy." → "tell a friend. go outside. drink water." → "one day you'll notice you didn't think of them." | Pisces: mutable water; ruled by Jupiter (traditional) and Neptune (modern) | **"Feel it. Then *let it go*."** |

**Season 1 extra rules:**
- **One answering star per film.** A cameo is fine, but there's no big cast; that's the season 1 feel.
- **Card cuts:** one or two, by default.
- **Box lines:** 46 characters or fewer, each readable for at least 1.5 s after it finishes typing.
- **The DM question** stays on screen at least 2 s.

## Season 2 extra: longer advice stories (8 films, 45–60 s)
The season 2 format exactly:
- **Story shape:** setup, escalation, turn, payoff.
- **The recurring cast:**
  - THE BOOTH: Gemini and Sag with headsets;
  - THE AUNTIES: Cancer and Taurus in reading glasses;
  - VIRGO with the clipboard;
  - PISCES crying happy tears in the background;
  - CAPRICORN with the whistle;
  - THE STARS narrating.
- **Comedy:** physical comedy and SFX.
- **Ending:** ★ LESSON UNLOCKED (the stlive5th / staunties style), then the tie-in, then the last line.

| folder | len | music | title / hook headline | the story | LESSON UNLOCKED | last line |
|---|---|---|---|---|---|---|
| stgroupchat | 45 | pop | "The group chat has *opinions*." | Your text from a date ("had fun!") gets forwarded to a pixel group chat of stars. Twelve stars type at once: "too many exclamation points", "he used a period. red flag", "send a meme", "send NOTHING". The message thread scrolls into chaos. Virgo blows a whistle: "what do *you* want to say?" "you" type "I had fun too. Again soon?" Silence, then everyone hearts it. | "Your friends love you. Your *gut* knows you." | **"Send it. We'll be screaming quietly."** |
| stbreakup | 60 | cinematic | "The Aunties heard about the *breakup*." | The Aunties rush in with a crockpot of soup and tissues. They start drafting an angry text to the ex ("we'll tell him about himself"). Pisces sobs, the Booth commentates ("and the Aunties are WINDING UP"). Then Auntie Cancer stops, deletes it and holds you instead. Taurus makes a list called "things you get back": your Friday nights, your playlist, *you*. | "You don't need closure from them. Give it to *yourself*." | **"Soup's ready. Take your time."** |
| stghostprotocol | 45 | screwed | "How to end things *without* ghosting." | Capricorn runs a training seminar with a whiteboard: "THE PROTOCOL". Exhibit A: a star ghosting and turning translucent (a womp). Exhibit B: a star sending one kind sentence: "I enjoyed meeting you, but I don't feel a match. Wishing you the best." The audience of stars gasps at how *easy* that was. Pisces cries at its beauty. | "One kind sentence beats *silence*. Every time." | **"Protocol complete. Be nice out there."** |
| stlovelang | 60 | funk | "The Love Language *Olympics*." | The Booth commentates a couple of stars, Leo and Virgo. Leo throws a surprise party, a huge parade of gifts, and Virgo looks overwhelmed. Virgo quietly reorganises Leo's closet; Leo doesn't notice. The Booth: "they're speaking different languages, folks!" The replay shows each trying to love the way *they* like being loved. A talk card: "How do you like to be shown love?" Both answers flip, and they finally *get* each other. | "Love them the way *they* hear it." | **"And the gold goes to… both of them."** |
| stfightfair | 60 | house | "The stars' rules for *fighting fair*." | A boxing ring with two stars (Aries and Libra) in tiny gloves. Referee Capricorn blows the whistle: "Rule one: no 'you always'." DING. Aries says "you ALWAYS—" and gets a flag. "Rule two: one topic at a time." Libra brings up something from last year: flag. "Rule three: take a break if it's too hot." They sit in their corners, drink water, come back calmer, and the gloves come off. A hug. Pisces cries ringside. | "Fight the *problem*, not each other." | **"Ding ding. Round two: dinner."** |
| stjealous | 45 | screwed | "Meet the *jealousy* monster." | A little green pixel monster grows on your shoulder each time your partner's phone buzzes. The Aunties name it ("that's Gerald"). It grows huge while you scroll their likes. Scorpio, who knows this monster *personally*, says: "say it out loud. 'I felt jealous.' watch." You say it, your partner reassures you, and Gerald shrinks to a tiny pet. | "Say the feeling. It *shrinks*." | **"Gerald's fine. Gerald's a pet now."** |
| stdistance | 60 | dreamy | "Long distance, but make it *stars*." | Two stars on opposite sides of a giant split screen in different time zones: one is eating breakfast, the other in pajamas. Missed calls, a sad "goodnight" at the wrong hour. The Booth: "rough night for the long-distance league." Then they make a plan: a shared calendar, a countdown to the next visit, and a show they watch at the same time. The countdown ticks down, and they meet in the middle of the screen. | "Distance is easier with a *date* on the calendar." | **"Countdown's on. See you soon."** |
| stmeetfriends | 45 | jazzy | "Your date is meeting your *friends*." | Your friends (Gemini, Leo and Sag) sit behind a panel table like a talent show, with scorecards. The date (a nervous Cancer star) walks in. They grill it: "favorite movie?", "pineapple on pizza?". It answers honestly; the scores go up and down. Then the date asks *them* about themselves. The panel melts, and every scorecard flips to "♥". | "Your friends just want to see you're *treated well*." | **"The panel has spoken: keep them."** |

**Season 2 extra rules:**
- **Dialogue lines:** 46 characters or fewer, each readable for at least 1.5 s.
- **Card cuts:** one about every 12–15 s.
- **The LESSON banner** holds at least 2.5 s.
- **Truth:**
  - no invented statistics;
  - any astrology is standard (rulers, elements, modalities);
  - "love languages" is a pop-psychology idea, so show it, don't cite it as science.

## Process (all 20)
- **Polish loop:** contact sheets with `--sheet --rate=4`, looked at critically and fixed, at least two passes.
- **Sound:** `teaser-sound.mjs` must run.
- **Pure f(t),** with no `document` at module top level.
- **Commits:** one commit per film.
