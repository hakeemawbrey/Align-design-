# Moonlight Lane: 10 two-minute Star Talk episodes (story + relationship advice)

The user asked for "2 minute episodes … 10 with plot lines, stories, relation advice for the zodiac audience
watching". This is a serialized show. Each episode tells a full dating story about one or two signs, stops for a
"THE STARS ADVISE" segment with real, warm relationship advice, then resolves the story using that advice. A slow-burn
romance (Libra × Scorpio) runs underneath all ten and pays off in Ep 10.

## Read first
- **promo/films/STARTALK-TRENDS.md**: its "Read first" list and everything under "What's different in this batch"
  applies (no season numbers, the one card cut wiring from `sxmail1`, no real platforms or brands, relatable first,
  Pisces cries in every film, the truth rules, app tie-ins, build order, report), **except** the folder, commit,
  queue and length rules below.
- **promo/films/STARTALK-SHOWS.md, "Show 1: ORBIT"**: the closest thing to this (a serialized show with a bug,
  "PREVIOUSLY ON…" and "NEXT TIME ON…"). Read `sxorbit1` and `sxorbit2` fully before you start.
- **startalk.js** (`drawStarChar`, `dialogueBox`, `talkCues`, `talkHops`, `lineTimes`, `signStar`, `STAR`),
  **lesson.js**, **cardfx.js**, **endcard.js**. Never edit a shared module.

## Rules for this batch
- **Folders:** `promo/films/ml<name>/` exactly as listed. Never edit another folder.
- **Commit:** `/tmp/claude-0/commit.sh "Moonlight Lane: Ep <n>: <title> (120 s)" promo/films/<f>`.
- **Do NOT queue the full render on this machine.** A 2-minute 1080p render needs ~3.5 GB of frames and this disk
  can't hold it next to the running queue. When an episode is committed, append one line `<f> v1` to
  `promo/library/farm/eps.txt` (create it if missing), commit that file too, and the main session sends the
  episodes to a render helper. Your own check renders (sheets) are fine: use `slot.sh` as before, at a low rate.
- **Usage cap:** at most three full sheets per episode (rate 1 or 2, then a final check). Use stills for spot checks.
- **Length: exactly 120 s**, including the 4.4 s end card (endcard.js, default CTA). Pass three `CUTS` candidates;
  cardfx plays only the middle one.
- **Episode numbers are fine** (this is a series); season numbers are not.

## The shared kit (Agent 1 builds it first; everyone else copies it)
Agent 1 writes `promo/films/mlpilot/scenes/mlkit.js` **before** finishing Ep 1, commits it (with the pilot folder as
it stands) as soon as the pieces below render correctly, and says so in its report. Agents 2–5 copy
`mlkit.js` into their own `scenes/` folder unchanged (bug fixes: copy, fix in your copy only, mention it in the
report). The kit provides:
- **Show bug:** "MOONLIGHT LANE" in Inter 800 small caps, letter-spaced, warm gold #ffcf6e, then " · EP n" in white
  at 60%. Top-left, 56 px from the edges, the whole runtime except the title card and end card.
- **The lane:** a cosy pixel street at night (the show's home set): a row of little shopfronts and windows under a big
  moon, lamp posts that flicker on, a corner café with an awning (no name on it), a flower stall, a rooftop with
  string lights, a bench under the middle lamp post. Draw it once as a function with options (time of day: dusk /
  night / late; which windows are lit; camera pan x) so every episode reuses it, plus two interiors: the café and a
  generic cosy apartment (couch, window, plant, lamp).
- **Cold-open caption** and **title card:** a 3 s card, deep night-blue with the moon, "MOONLIGHT LANE" in gold, and
  "Ep n · <Title>" under it, a slow lamp-flicker in.
- **PREVIOUSLY ON MOONLIGHT LANE…** a 2 s flash of 2–3 tiny captioned stills (Eps 2–10 only).
- **THE STARS ADVISE:** the segment's look: the lane fades to deep blue, THE STARS' box (dialogueBox, speaker
  "THE STARS") at the bottom, and three **advice cards** that deal in one at a time from the top (talk-card style:
  cream card, gold border, a small icon, a bold 2–5 word headline and one plain sentence). Card three is the one the
  episode's ending uses. Sign shout-outs ("Aries, this one's yours.") go in the box. These advice cards are drawn
  UI, not cardfx transitions.
- **NEXT TIME ON *MOONLIGHT LANE*…** a 3.5 s gold-on-night card with one teaser line (Eps 1–9).
- **LESSON chip:** use lesson.js ("LESSON UNLOCKED") once, after Act 3, with a funny episode-specific chip.

## The cast (fixed designs, all ten episodes)
All are `drawStarChar` stars in their `signStar` colors. The twelve signs are neighbours on Moonlight Lane.
- **Libra:** runs the flower stall. Can't decide anything, except that the night baker is interesting.
- **Scorpio:** the night-shift baker at the café. Quiet, notices everything, leaves an extra pastry in Libra's bag.
- **Taurus:** owns the café. Feeds everyone. Gives advice through food.
- **Pisces:** lives above the café, cries at everything (happy tears included), is in every episode somewhere.
- The other signs lead their own episodes (below) and cameo in others. THE STARS narrate.

## Every episode, 120 s (115.6 s of story + 4.4 s end card)
| Time | Beat |
| --- | --- |
| 0–2 s | PREVIOUSLY ON… (Eps 2–10; Ep 1 starts its cold open at 0) |
| 2–7 s | **Cold open:** a funny hook line in the box or a big caption that drops us mid-problem |
| 7–10 s | Title card |
| 10–40 s | **Act 1:** who, what they want, the situation (3–5 box lines, real scenes on the lane) |
| 40–70 s | **Act 2:** it goes sideways: the sign's habit makes it worse, a friend gives bad advice, a funny low point |
| 70–90 s | **THE STARS ADVISE:** three advice cards (~6 s each), with a sign shout-out |
| 90–104 s | **Act 3:** the lead tries card three; it works (not perfectly, but kindly) |
| 104–108 s | LESSON UNLOCKED chip |
| 108–111.6 s | **The lane tag:** one small Libra × Scorpio beat that moves their story an inch |
| 111.6–115.6 s | NEXT TIME ON *MOONLIGHT LANE*… (Ep 10: a warm "THE END… for now" card instead) |
| 115.6–120 s | End card |

The story should be funny AND true. The advice is the heart: specific, healthy, kind, something a viewer could do
tonight. Never mean, never manipulative, never "play games". No invented statistics, no therapy claims, no
diagnosing. If the advice says "talk to them", show *how* (the actual sentence).

Music: one 2-minute track per episode, with a softer bed under THE STARS ADVISE and a lift into Act 3. Each episode
picks a different style/key from its line below.

## The 10 episodes

### Agent 1: Eps 1–2 (and the kit)
1. **`mlpilot`: Ep 1: The Blind Card** · lofi · C
   Capricorn is "too busy to date" (calendar packed to the minute). Gemini, their roommate, deals them a blind mystery
   card from tonight's deck as a dare. Act 2: Capricorn schedules the date like a meeting (agenda, 30-minute slot,
   a "hard stop"). The date is nice; Capricorn checks the time. Low point: they leave at the hard stop and regret it on
   the bench under the lamp post.
   Advice: (1) *Make room first*: a full calendar can be a hiding place. (2) *Curious beats impressive*: ask one real
   question. (3) *Stay past the hard stop*: if it's going well, let it run.
   Act 3: Capricorn texts "is the café still open? I cancelled my 9 PM." They talk until Taurus stacks the chairs.
   Tie-in: "Card first. *Face* last." Lane tag: Libra and Scorpio reach for the last pastry; Scorpio lets Libra have
   it. Next time: "Aries has a plan. A *big* one."
   Last line: "*Make room*."
2. **`mlpace`: Ep 2: Too Much, Too Soon** · pop · D
   Aries has one great date and by morning has planned the vacation, the matching jackets and a name for the future
   dog. Act 2: their date, Virgo, goes quiet. Aries doubles down (a playlist, a "big gesture" balloon arch on the
   lane). Low point: Virgo says "this is a lot" and Aries deflates (literally, the balloon arch sags).
   Advice: (1) *Match the pace*: notice their speed and meet it. (2) *Excited is allowed*: say it, don't stage it.
   (3) *Ask, don't plan*: "what would feel good for our next one?"
   Act 3: Aries asks the question; Virgo's answer is small and specific (a walk, 7 PM, one coffee). Aries is on time
   and only brings one balloon. Lane tag: Scorpio overhears Libra say "I like people who take their time." Scorpio
   slows down, comically. Next time: "Cancer brings a date to *family dinner*."
   Last line: "*Slow* is still a yes."

### Agent 2: Eps 3–4 (starts once `mlkit.js` is committed)
3. **`mlfriends`: Ep 3: Meet the Friends** · funk · E
   Cancer brings their new date, Sagittarius, to the lane's Sunday dinner at the café. Cancer over-prepares everyone
   ("don't mention the scrapbook"). Act 2: the friends are too much (Leo performs, Virgo interviews, Pisces cries
   immediately); Sagittarius goes quiet; Cancer panics that it's ruined.
   Advice: (1) *Let them be them*: don't perform your friends. (2) *Check in, privately*: "you okay? we can leave
   whenever." (3) *Include, don't spotlight*: give them one easy way in.
   Act 3: Cancer checks in by the kitchen door; Sagittarius is fine, just overwhelmed; Cancer hands them the job of
   dealing dessert, and they're a hit. Lane tag: Libra seats themself next to Scorpio "by accident". Scorpio knows.
   Next time: "Taurus and Gemini have their *first fight*."
   Last line: "*Your people*, our table."
4. **`mlfight`: Ep 4: The First Fight** · cinematic · F
   Taurus wants a cosy night in; Gemini already said yes to three parties. Act 2: it escalates over something tiny
   (who ate the last of the good bread), both "winning", both sad. Low point: they sit on opposite ends of the couch.
   Advice: (1) *Fight the problem, not the person*: it's "us vs the plan", not "me vs you". (2) *Say the need under
   it*: "I miss quiet time with you" / "I want you to meet my people". (3) *Find the both*: one party, then home.
   Act 3: they draw it as a plan on a napkin: party #1 for an hour, then soup on the couch. A Push / Pull / Align
   reading together lands on "Align". Lane tag: Scorpio leaves a tiny bread loaf with a note at the flower stall;
   Libra can't tell who it's from. Next time: "Libra gets a *mystery* note."
   Last line: "*Us* vs the problem."

### Agent 3: Eps 5–6 (starts once `mlkit.js` is committed)
5. **`mlmixed`: Ep 5: Mixed Signals** · synthwave · Am
   The midpoint: Libra is getting notes and pastries and can't tell if Scorpio likes them or is just a good baker.
   Scorpio thinks they're being obvious. Act 2: friends decode (Gemini makes a chart, Aquarius builds a theory board
   with string, Leo says "just be a 10"); Libra tries to "play it cool" back and it gets worse, a comic standoff of
   two people pretending not to care.
   Advice: (1) *Clear is kind*: mystery is fun, guessing isn't. (2) *Say one true sentence*: "I like talking to you."
   (3) *You can ask*: "are these pastries… for me?"
   Act 3: Libra almost asks… and a delivery truck honks; the moment is lost, but Scorpio writes "for you" on the next
   bag. Progress! Lane tag (this one IS the lane tag). Next time: "Leo feels something *green*."
   Last line: "*Say* the thing."
6. **`mljealous`: Ep 6: Jealous Moon** · jazzy · Bb
   Leo's partner, Aquarius, laughs at a friend's joke at the café and Leo goes quiet, then too loud, then quiet.
   Act 2: Leo spirals (re-reads old messages, hypes themself in the mirror, tries to be "funnier"), and snaps a little.
   Low point: an awkward silence on the walk home.
   Advice: (1) *Jealousy is information*: it points at a need, not a crime. (2) *Name the need*: "I think I wanted to
   feel chosen tonight." (3) *Ask for it kindly*: "can we plan a night that's just us?" Never control who they talk to.
   Act 3: Leo says it; Aquarius softens and says what makes them feel chosen too. They plan the rooftop. Lane tag:
   Scorpio sees Libra laughing with a customer and feels it too, then buys a flower instead of sulking. Next time:
   "Sagittarius is *moving away*."
   Last line: "*Chosen*, out loud."

### Agent 4: Eps 7–8 (starts once `mlkit.js` is committed)
7. **`mldistance`: Ep 7: Long Distance** · dreamy · Db
   Sagittarius gets a year-long job across the world; their partner Cancer is proud and terrified. Act 2: the first
   weeks are messy (time zones, a frozen video call face, a missed goodnight). Low point: both pretend they're fine.
   Advice: (1) *Make rituals*: the same small thing, every week (a Sunday story, a song swap). (2) *Something to look
   forward to*: a date on the calendar. (3) *Say the hard part*: "I miss you and I'm scared" is allowed.
   Act 3: they make a Sunday ritual (each answers one talk card); a countdown starts on Cancer's fridge. Lane tag:
   Libra helps Scorpio carry flour at 5 AM; they watch the sunrise without talking, and it's nice. Next time:
   "Pisces and Aquarius need *different* things."
   Last line: "*Far*, not apart."
8. **`mlneeds`: Ep 8: Different Speeds** · lofi · Eb
   Pisces feels everything right now; their date, Aquarius, needs a quiet day to process. Pisces reads the quiet as
   rejection. Act 2: Pisces sends a long message, then another; Aquarius goes even quieter; both feel wrong for who
   they are. (Pisces cries, obviously, with a tissue-box gag.)
   Advice: (1) *Needs aren't flaws*: space and closeness are both normal. (2) *Ask for what you need, plainly*:
   "I need a check-in when you go quiet." / "I need a day to think." (3) *Agree on a signal*: a small thing that means
   "I'm still here".
   Act 3: they choose a signal (a moon emoji-style pixel moon; no real emoji set). Aquarius sends one mid-quiet;
   Pisces cries happily. Lane tag: Scorpio finally asks Libra's name for the cake order… they already knew it. Next
   time: "Virgo wants to say it *first*."
   Last line: "*Still here*."

### Agent 5: Eps 9–10 (starts once `mlkit.js` is committed)
9. **`mlfirst`: Ep 9: Saying It First** · house · G
   Virgo wants to say "I love you" to Aries (from Ep 2) and drafts it like a thesis (three versions, footnotes).
   Act 2: every moment is "not perfect" (a sneeze, a bus, Pisces crying nearby); the pressure builds; Virgo blurts
   something else entirely ("I love… yogurt").
   Advice: (1) *A feeling isn't a contract*: say it with no strings. (2) *There's no perfect moment*: there's a real
   one. (3) *Let them answer in their time*: their pace is not a verdict.
   Act 3: Virgo says it on the bench under the lamp post, plainly. Aries' face does a fireworks thing (pixel sparkles,
   not explosions) and says it back. Lane tag: Libra decides to ask Scorpio out tomorrow… and Scorpio decides the same.
   Next time: "The *Moonlight Lane block party*."
   Last line: "*No* perfect moment. Just this one."
10. **`mlparty`: Ep 10: The Block Party** · pop · A
   The finale. The whole lane throws a block party with string lights. Every couple from Eps 1–9 gets a tiny callback
   (Capricorn stays past the hard stop, Aries brings one balloon, Taurus & Gemini split the night, Leo and Aquarius on
   the rooftop, Cancer on a video call with Sagittarius, Pisces & Aquarius trade pixel moons). Libra and Scorpio each
   try to ask the other out and keep missing (comic near-misses through the crowd).
   Advice: (1) *Love is small things, daily*. (2) *Be brave once*: one clear sentence. (3) *Show up as you*.
   Act 3: under the middle lamp post they finally both say "would you—" at the same time, laugh, and say yes. The lane
   cheers; Pisces sobs happily. Tie-in: Scorpio's pastry box has the founding card in it (no new feature: it's just
   the card). The LESSON chip, then a warm "THE END… *for now*" card instead of NEXT TIME.
   Last line: "*Would you?* Yes."

## When you're done
For each episode: committed folder, the `eps.txt` line, the final sheet path(s), the kept cut time, and anything you
changed from the brief and why.
