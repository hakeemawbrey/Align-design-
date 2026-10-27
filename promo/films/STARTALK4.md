# Star Talk, batch 4 (season 3): 25 more stories with a lesson (vertical, 45 or 60 s)

The user's words: "Make 25 more run as many agents as you can". This season follows season 2 (promo/films/STARTALK2.md, "Longer one more fun stories and lessons"). Every film is a funny mini-story with a lesson.

**Don't repeat batch 3.** A forked session made batch 3 (promo/films/STARTALK3.md): twenty short "Dear <sign>" films and element group chats, plus stopposites, stretro, stmoon, strising, stsaturn and stghost. Its topics are taken: the "k." overanalysis, re-texting the ex in retrograde, advice to the ghoster, the Saturn-return lecture, rising-sign masks, the element group chats, and Aries × Libra opposites. The 25 below were chosen to avoid them; keep it that way.

## Read first
- **promo/films/STARTALK2.md** for the season 2 format: recurring cast, the LESSON UNLOCKED beat, "more fun" rules, pacing, truth rules. **Everything in it applies here** unless this file says otherwise.
- **promo/films/STARTALK.md** for the look and tone.
- **Original pitches** (more gags to mine): promo/films/startalk-concepts/A-relatable.md, B-memes.md and C-story.md. The section to read is named in each entry below.
- **Reference films** (all built, all rendered; read at least one fully before you start):
  - **promo/films/stlive5th/:** a CRT TV inside the scene, a low-res pixel canvas, several dialogue boxes, the DOM lesson banner.
  - **stintervention/:** a big cast on chairs, props in `scenes/props.js`, stamps.
  - **staunties/:** a camera push and pull, a two-chart Push / Pull / Align reading.
  - **stmetfirst/:** two-star comedy, a phone pair with veiled mystery cards.
  - **stwereup/:** a phone UI, day and night swaps.
- **Shared modules:**
  - **promo/films/startalk.js:** `drawStarChar`, `dialogueBox`, `talkCues`, `talkHops`, `lineTimes`, `signStar`, `STAR`.
  - **endcard.js:** use the default CTA.
  - **cardfx.js:** `cardCuts` default selection; aim for a cut every 12–15 s.
  - **promo/films/lesson.js (new; see below):** use it for the LESSON UNLOCKED beat.

## New this season: one shared LESSON UNLOCKED module (promo/films/lesson.js)
A foundation agent is building this module right now, moving season 2's banner out of stlive5th. When it's committed, it touches `/tmp/claude-0/s3/LESSON-READY`.

Write against this API. **Do not build your own banner.**
```js
import { buildLesson, lessonCues, popText } from '../../lesson.js'
// build(): call AFTER your scene layers (so it sits on top) and BEFORE grain and the card-cut layers
const lesson = buildLesson(root, {
  at: 46.2,                 // the banner drops in (snap to the beat grid: 0.6 + n·0.5556)
  out: [50.8, 51.0],        // fade-out window
  text: 'Skip the résumé. | Ask what they’d | *defend.*',   // ' | ' = line break, *…* = the EB Garamond italic accent
  chip: '+1 SELF-RESPECT',  // optional reward chip; make it funny and specific to your film
  accentColor: GOLD,        // optional
  dim: 0.55,                // optional: darkens the scene behind (0 = none)
})
// update(t): lesson.update(t)      lesson.end = when the text is fully in; hold ≥ 2.5 s after it
// CUES: ...lessonCues(46.2)        // level-up arpeggio, glitter and bell, timed to the banner
// popText(parent, text, opts) is the season's headline helper (Inter 800 + *italic accent*), moved from stlive5th
```

**If lesson.js isn't there yet:** build everything else first. Put a placeholder comment where the lesson goes. Wire it in when `/tmp/claude-0/s3/LESSON-READY` exists. To wait, run `until [ -f /tmp/claude-0/s3/LESSON-READY ]; do sleep 15; done` with `run_in_background` and keep working; don't poll in a loop. It should land within about 20 minutes.

## The machine is shared by 26 agents: use these tools
- **Anything that launches the browser goes through `/tmp/claude-0/slot.sh`.** That means render.mjs sheets and stills, and cover.mjs. Slot.sh waits for one of 3 shared slots. Examples:
  - `/tmp/claude-0/slot.sh node promo/scripts/render.mjs --film=<f> --vertical --sheet --rate=2 --workers=2 --dir=/tmp/claude-0/s3/<f>/sheetA`
  - **Spot checks are cheapest as stills:** `/tmp/claude-0/slot.sh node promo/scripts/render.mjs --film=<f> --vertical --stills=3,7.5,12 --workers=2 --dir=/tmp/claude-0/s3/<f>/st1`
  - **Do one full `--rate=4` sheet as the final check**, not more.
  - Give every render call `timeout: 600000`. If it might wait longer for a slot, run it with `run_in_background` and keep working.
- **Work only inside `/tmp/claude-0/s3/<your film>/`** for temp files. Never `rm` anything outside it: other agents' renders and files live next to yours. Delete your own temp dir at the end.
- **Commit only through the helper**, which serializes git across all agents:
  ```
  /tmp/claude-0/commit.sh "Star Talk S3: <title> (<len> s)" promo/films/<f>
  ```
  - Don't run `git add`, `git commit`, `git pull`, `git stash` or `git checkout` yourself.
  - Never touch other folders, and never edit startalk.js, endcard.js, cardfx.js, lesson.js or the sound engine. If you find a real bug in a shared file, report it.
- **When your film is final and committed, queue its render** (my render workers pick it up):
  ```
  flock /tmp/claude-0/queue.lock sh -c 'echo "<f> v1" >> /tmp/claude-0/queue.txt'
  ```
  Don't render the mp4 yourself.

## Checks before you commit
- **The sound builds:** `node promo/scripts/teaser-sound.mjs --film=<f>` succeeds. Use the style and key given for your film below. Every film in this season sounds different.
- **Card coverage:** `/tmp/claude-0/slot.sh node /tmp/claude-0/cardfx/cover.mjs <f> <kept cut times>` reports 0.000% uncovered.
- **On the sheets:**
  - Nothing overflows its box or the frame.
  - Every dialogue line is at most ~46 characters and holds ≥ 1.5 s after it finishes typing.
  - Every headline is readable.
  - The lesson holds ≥ 2.5 s.
  - Props read clearly at a glance.
  - No "Align" in the last 2 s before the end card.
- **Truth:**
  - No invented statistics.
  - No real app, brand or person names: no payment apps, sports drinks, etc. Make them generic.
  - Standard astrology only.
  - No disaster or flood jokes, no weapons.
  - Advice must be healthy: warm, never mean, never manipulative.
- **Report back:** the length, your final sheet path, the kept cut times, and anything you changed from this brief and why.

## Make it FUNNY (the bar is higher than season 2)
- **Each film has a clear arc:** a hook in the first second, an escalation of 2–3 rising gags, a turn, a payoff, the LESSON, the tie-in, and the last line.
- **Comic craft:**
  - The rule of three, with the third one twisted.
  - Silence before a punchline.
  - Callbacks.
  - Background gags; Pisces crying in the back is the running gag, so use it.
  - Physical comedy with squash, hops, double-takes, faints and synced eye-rolls.
- **Keep it moving:** something changes every 2–4 s, and every beat has an Inter 800 headline with one italic accent.
- **The lesson** comes from the story, says something true, and is short enough to screenshot.

## The 25
Each entry lists: the folder, the title, the length, the music (style · key), the original pitch (if any), the story beats, the LESSON, the tie-in, and the last line before the end card.

The beats are a strong starting point, not a cage. Keep the jokes that work and improve the ones that don't. Keep the lesson's meaning, the tie-in feature, the length and the last line.

---

### 1. `starchaeology`: "That's archaeology." · 45 s · lofi · Gm
- **Pitch:** A-relatable.md §4.
- **Hook:** "❤ liked your photo from 2019" slams in. Headline: "He *liked* a photo." THE STARS: "no text. no 'hey'. a like. from 2019."
- **♑ Capricorn the archaeologist:** Capricorn pulls on an explorer hat and brushes the phone. A museum placard reads "2019 BEACH PIC · UNEARTHED 2:14 AM". Capricorn: "that's not interest. that's archaeology."
- **The dig site:** more artifacts come out of the sky. "viewed your story" is a pottery shard, "🔥" is a fossil, "we should hang sometime" is a cave painting. The stars hop along a breadcrumb trail like pigeons. THE STARS: "a view. one 🔥. a 'we should hang'." Then: "babe. those are crumbs."
- **Background gag:** ♓ Pisces tries to save one crumb in a jar "for the memories". Capricorn confiscates it.
- **Turn:** Capricorn asks: "has he ever made a plan?" A calendar flips: empty, empty, empty. Crickets.
- **LESSON:** "Attention isn't *intention*. | Wait for a plan." Chip: +1 STANDARDS.
- **Tie-in:** tonight's deck deals in as a full fanned hand. "you deserve a full deck. every night."
- **Last line:** **"Stop living on *crumbs*."**

### 2. `stcomet`: "The Comet." · 60 s · cinematic · Em (a telenovela)
- **New.**
- **Hook:** three snap-zooms onto your star's wide eyes on a big dramatic chord. Headline: "Your partner's star got a *visitor*."
- **Cast:** your star is ♋ Cancer. Your partner's star is ♐ Sag, who is friendly with everyone. A flashy ☄ COMET wears sunglasses and has a sparkly tail. Its name tag reads "COMET (just passing through)".
- **Setup:** COMET: "hey! I'm only around every 76 years!" Sag laughs and they high-five.
- **Escalation, rule of three:** each one gets a telenovela zoom on your star.
  - The comet tells Sag "you're *glowing*".
  - The two share a meteor shower.
  - The comet leaves a sparkle on Sag's cheek.
  
  Your star's eyes go green, its orbit starts to wobble, and it drafts passive-aggressive texts: "no it's fine 🙂", "have fun with your COMET".
- **Background gag:** Pisces watches it all like a soap opera, with popcorn, sobbing.
- **Turn:** THE STARS: "or… you could just say it." Your star deletes the drafts and types: "that made me a bit jealous. can we talk?" Sag: "omg of course. that's my cousin 🥺". The comet waves: "hi, cousin-in-law!"
- **Payoff:** the green fades, the orbit steadies, and a telenovela "FIN" card swings in, then gets shooed away.
- **LESSON:** "Jealous? Say it *kindly*. | Don't let it orbit." Chip: +1 SECURE.
- **Tie-in:** talk cards. A card reads "What helps you feel secure?" Line: "talk it out before it orbits."
- **Last line:** **"Say it out loud. Comets *pass*."**

### 3. `stswipe`: "Swipe Fatigue." · 45 s · synthwave · Cm
- **New.**
- **Hook:** ♊ Gemini's point is a blur, swiping on a phone, and the profile faces smear past. A pixel speedometer labelled "SWIPES / MIN" climbs. Headline: "Swipe. Swipe. Swipe. *Swipe*." Gemini: "left left left right left left left"
- **Escalation:**
  1. A puff of smoke rises off Gemini's point. ♉ Taurus hands it a tiny ice pack.
  2. "IT'S A MATCH!" Gemini: "wait. who's this."
  3. Gemini scrolls its matches: rows of conversations that never started, a graveyard of unanswered "hey"s with pixel cobwebs.
- **The question:** ♑ Capricorn: "how many have you actually talked to?" Gemini: "...talked to?"
- **Turn:** THE STARS: "infinite isn't abundance. it's noise." The music drops to half-time, the phone slows, and Gemini's eyes come into focus.
- **LESSON:** "Fewer people. | *Deeper* conversations." Chip: +1 FOCUS.
- **Tie-in:** tonight's deck. A few cards deal in slowly, one at a time. Line: "a deck a night. not an endless scroll." Gemini reads one card properly and goes heart-eyed.
- **Last line:** **"Stop swiping. Start *meeting*."**

### 4. `stsupernova`: "Supernova." · 60 s · house · G
- **Pitch:** A-relatable.md §5.
- **Hook:** headline "Day 3: “I think you're my *soulmate*.”" ♈ Aries bounces so hard it squashes, with heart-eyes.
- **The love-bomb montage:** pop-ups arrive one after another: "good morning beautiful 🥺", "told my mom about you", "matching outfits friday??", "I booked us a trip". Matching hoodies drop onto Aries, then (day 4) a ring box appears, and the sky gasps. Aries: "THIS IS SO FAST. I LOVE FAST."
- **THE STARS:** "sweetie. we're stars. we know burning." Then: "the ones that burn this bright, this fast..."
- **The supernova:** a big star behind them swells, flashes white and pops into a supernova, with drifting pixel debris (cosmic, not a disaster). "...don't stick around."
- **Callback:** Aries peeks out of the hoodie: "...but the matching hoodies tho". Synced eye-roll and a bwomp.
- **Turn:** the golden Sun rolls in and gives a slow, proud wink. "ask the Sun. 4.6 billion years. slow burn." Then: "if it's real, it'll still be there on date 2."
- **LESSON:** "Intensity isn't *intimacy*. | Let it grow." Chip: +1 PATIENCE.
- **Tie-in:** the Push / Pull / Align reading draws between two charts: "see the real pull before the fireworks."
- **Payoff:** Aries folds one hoodie neatly.
- **Last line:** **"Slow burns *last*."**

### 5. `stname`: "Even stars get a name." · 45 s · dreamy · Eb
- **Pitch:** A-relatable.md §6.
- **Hook:** headline "“so… what are *we*?”" Every star leans in over a heartbeat, and one tiny star covers its eyes. THEM (name tag only): "idk. I don't really do labels." Every star's eyes go flat.
- **♒ Aquarius:** "labels are kind of a construct tbh". Everyone turns slowly, and Aquarius shrinks a few pixels.
- **The constellation:** the stars snap into a constellation with gold lines and a name plate. THE STARS: "we are balls of gas. and WE have a name." Then: "we've had it for thousands of years."
- **Gag:** Aquarius: "can't we just vibe?" THE STARS: "you can vibe AND have a name." Aquarius tries to join, and the plate prints "+ AQUARIUS (pending)".
- **LESSON:** "Wanting clarity | isn't *too much*." Chip: +1 CLARITY.
- **Tie-in:** dealbreakers. A card slides in and a chip lights up: "Looking for: something real". "say what you want before the first date."
- **Payoff:** Aquarius sighs and slots in, and "(pending)" disappears.
- **Last line:** **"Even stars get a *name*."**

### 6. `stfog`: "Neptune is literally fog." · 60 s · screwed · Am
- **Pitch:** A-relatable.md §7.
- **Hook:** headline "Every group chat has *this* friend." ♓ Pisces zooms in with heart-eyes. Pisces: "GUYS. I met someone. he's different."
- **The interrogation:** ♍ Virgo, ♏ Scorpio and ♑ Capricorn sit half-lidded.
  - Virgo: "is he a DJ." Pisces: "he's a sound *artist*."
  - Scorpio: "does he 'not believe in labels'?" Pisces: "he's healing."
  - Capricorn: "has he asked to borrow money." Pisces: "...only a little."
  - Synced eye-roll and a bwomp.
- **The fog:** THE STARS, gently: "babe. Neptune rules you." Then: "it is literally the planet of fog." Pixel fog rolls in, and Pisces' heart-eyes turn into rose-tinted heart glasses. Behind the fog, red flags pop up one by one: on a little boat, on a kite, on a cake. Pisces can't see any of them.
- **Turn:** a friend nudges the glasses off. A tiny red flag waves far behind. Pisces: "...is that a red flag?" THE STARS: "it's been waving since june."
- **LESSON:** "If all your friends | see the flag, | it's a *flag*." Chip: +1 VISIBILITY.
- **Tie-in:** dealbreakers. Pisces taps chips: "✕ borrows money", "✕ allergic to plans". "pick your dealbreakers BEFORE the heart-eyes."
- **Last line:** **"Love is blind. Your friends *aren't*."**

### 7. `stick`: "Is it, though?" · 45 s · pop · A
- **Pitch:** A-relatable.md §8, plus an ick courtroom.
- **Hook:** headline "He clapped when the plane *landed*." ♎ Libra's heart-eyes go flat and its little scales tip hard. Libra: "it's over. I have the ick."
- **Ick court:** ♑ Capricorn is the judge, with a gavel. Libra presents three pieces of evidence, and the gallery gasps at each:
  - he says "expresso"
  - he runs to catch the bus (a tiny running figure)
  - he said "yummy"
- **Cross-examination:** THE STARS, deadpan: "babe. you clap at the end of movies." Then the evidence about Libra:
  - clapping in a cinema
  - baby-talking a dog
  - singing to itself in the car
  
  Libra freezes with a sweat drop: "...that's different." THE STARS, with a slow blink: "is it, though?"
- **Verdict:** the gavel comes down: "ICK: DISMISSED."
- **LESSON:** "Everyone's a little cringe. | Look for *kind*." Chip: +1 GRACE.
- **Tie-in:** "Card first. Face last." A mystery card flips in with the face hidden. "get to know them before the little things."
- **Payoff:** Libra's scales level out and its eyes go soft.
- **Last line:** **"Give the ick a *minute*."**

### 8. `sthey`: "hey" · 45 s · chiptune · E
- **Pitch:** B-memes.md §1.
- **Hook:** a huge "hey" notification slams in. Headline: "The signs when their match sends *“hey”*." Twelve stars pop up from the bottom, wide-eyed.
- **Rapid fire:** about 2 s each, with hard cuts, and all 12 signs appear:
  - ♈ "HEY. coffee? now? I'm outside."
  - ♉ "is this 'hey' buying me dinner or"
  - ♊ "hey hey hey hey hey" (five replies at once)
  - ♋ "it's 'hey' not 'hi'. are they mad at me"
  - ♌ "hey? that's it? I'm a whole show."
  - ♍ "no punctuation. noted." (red pen)
  - ♎ "drafted six replies. sent none."
  - ♏ "screenshotted. sent to three chats."
  - ♐ "hey!! replying from Lisbon btw"
  - ♑ "pencilled in a reply for Q3."
  - ♒ "replied with a meme from 2014."
  - ♓ "we're getting married."
- **Turn:** everyone freezes. THE STARS: "nobody deserves a 'hey'." Then: "ask them something worth answering."
- **Payoff:** a talk card flips in: "What's a hill you'd die on?" Twelve typing bubbles go at once, all heart-eyes.
- **LESSON:** "Effort is attractive. | Send something | worth *answering*." Chip: +1 RIZZ.
- **Tie-in:** talk cards.
- **Last line:** **"Skip the *hey*."**

### 9. `stfishpic`: "The stars rated your profile." · 60 s · funk · Bb
- **Pitch:** B-memes.md §2.
- **Hook:** a profile photo slaps on: someone proudly holding a huge pixel fish. Headline: "The stars rated your *profile*." The judges sit in a row with score paddles.
- **The judges:**
  - ♓ Pisces: "that's my cousin. 0/10." (clutches its pearls)
  - ♉ Taurus: "is the fish dinner? 10/10."
  - ♍ Virgo: "'your/you're' typo in line one. 4."
  - ♌ Leo: "where's the selfie? we want YOU. 6." (holds up a mirror)
  - ♎ Libra: "lighting? 10. fish? 2. so... 6?"
  - ♈ Aries: "too much bio. I swiped already."
  - ♒ Aquarius, floating sideways: "fish rights though?" Everyone turns slowly.
  - ♐ Sag: "where was this taken. I'm going."
- **Escalation:** swipe through the rest of the profile: a bigger fish, a group photo ("which one are you??"), a car selfie, a sunset… with a fish. The paddles start drooping.
- **Turn:** THE STARS: "honestly? the fish isn't the problem." Then: "we just want to know who's holding it." The photo blurs out.
- **Payoff:** the blind mystery card deals in face-down and flips to words only, for example "makes soup for sick friends" and "knows every bridge in town". Every paddle flips to 10, and everyone has heart-eyes.
- **LESSON:** "Lead with who you are, | not what you *caught*." Chip: +1 PERSONALITY.
- **Tie-in:** "Card first. Face last."
- **Last line:** **"Lead with the *person*, not the fish."**

### 10. `stbaggage`: "Baggage Claim." · 45 s · lofi · F
- **New.**
- **Hook:** a baggage carousel in space under a pixel ARRIVALS board ("DATE #3 · ON TIME"). Headline: "Everyone brings *baggage*." Stars wait at the belt.
- **The bags:** each one has a tag, and its owner reacts.
  - ♏ Scorpio's huge black trunk, tagged "TRUST ISSUES". It takes two stars to lift.
  - ♋ Cancer's tote, tagged "MY EX'S HOODIE (still)". Cancer hugs it.
  - ♈ Aries' tiny duffel, tagged "CAN'T SIT STILL". It zooms laps around the carousel.
  - ♍ Virgo's colour-coded set, tagged "CONTROL", with a laminated packing list.
- **Escalation:**
  1. The belt jams on a giant crate tagged "FAMILY STUFF", and everyone gasps.
  2. ♓ Pisces cries onto its own dripping suitcase, tagged "FEELINGS (liquids)".
- **Turn:** THE STARS: "everyone has baggage." Then: "the question is who helps you carry it." Your star and its date each grab one handle of Scorpio's trunk together.
- **LESSON:** "Everyone has baggage. | Find someone who | helps you *carry it*." Chip: +1 CARRY-ON.
- **Tie-in:** the Push / Pull / Align reading appears on the departures board. Line: "push shows the bumps before you fly."
- **Last line:** **"Pack light. *Travel* together."**

### 11. `sthold`: "Cosmic Customer Service." · 60 s · chiptune · Gm (hold music that gets sadder each time it returns)
- **Pitch:** B-memes.md §4 for the format. The caller's problem is new.
- **Hook:** a pixel phone rings in the sky. Headline: "You've reached the *stars*. Please hold." ♑ Capricorn sits at a desk in a headset: "thank you for calling the stars." Then: "how can we help?"
- **The caller:** text-message-style bubbles: "first time dating since the breakup." Then: "what if I'm not ready?"
- **Hold:** Capricorn: "please hold." The hold music plays, sadder each time. Cutaways:
  - ♈ Aries juggles three phones: "your call is important to us!!"
  - ♓ Pisces: "hi, you've been transferred to feelings." It drifts off its desk, crying.
- **The spiral:** the caller's bubbles stack up: "what if I cry at dinner", "what if they ask about my ex", "what if I'm rusty". Capricorn: "do NOT search 'how to date'."
- **Turn:** Capricorn takes off the headset and looks at the caller with gentle eyes.
  - "press 1 to wait until you're 'perfect'." Then: "press 2 to start small and honest." A pixel finger presses 2.
  - Capricorn: "you don't need to be healed. just honest."
- **LESSON:** "You don't need to be | fully healed. | Just *honest*." Chip: +1 COURAGE.
- **Tie-in:** tonight's deck. A small deck deals in, one card at a time. Line: "one card at a time. at your pace." The hold music turns happy.
- **Last line:** **"Thanks for calling. You're *ready* enough."**

### 12. `stoversharing`: "Too Much, Too Soon." · 45 s · pop · C
- **New.**
- **Hook:** first date, two stars at a tiny table. ♋ Cancer pulls down a projector screen. Headline: "Date one. She brought *slides*."
- **The slideshow:** a laser pointer and a slide counter reading "1/87".
  - "my childhood"
  - "every ex, ranked"
  - "my attachment style" (a diagram with arrows)
  - "what my therapist thinks of you" (blank)
  
  Her date, ♒ Aquarius, nods slowly while its eyes get wider and wider.
- **Escalation:**
  1. The counter jumps to "12/87".
  2. The waiter, ♉ Taurus, brings a second dessert out of pity.
  3. ♓ Pisces in the next booth cries at slide 9.
- **Turn:** THE STARS: "babe. this is a great story." Then: "tell it in chapters." The projector clicks off and Cancer blushes. Aquarius: "...I'd like chapter two."
- **LESSON:** "Share your story | in chapters, | not all at *once*." Chip: +1 PACING.
- **Tie-in:** talk cards. A card reads "What made you smile this week?" Line: "let the cards set the depth."
- **Last line:** **"Chapter one. *See you* at two."**

### 13. `stflags`: "Red Flag, Green Flag." · 60 s · house · Eb
- **Pitch:** B-memes.md §6.
- **Hook:** a giant red buzzer is slammed. Headline: "Welcome to *Red Flag, Green Flag*." ♌ Leo hosts in a sparkly suit under a spotlight: "contestants! buzzers ready!" The stars stand behind podiums.
- **Rounds:** each round is about 6 s: the card, two buzzers, banter.
  - "They text back four hours later." Sag: "GREEN. they have a life!" Cancer: "RED. I was dying."
  - "They want to meet your mum on date two." Cancer: "GREEN. obviously." Aquarius: "RED. I need a year."
  - "They planned the date in a spreadsheet." Virgo: "GREEN. I'm crying." Sag: "RED. I'm boarding."
  - "Still friends with all their exes." Libra: "GREEN. so mature!" Scorpio: "RED. explain. now."
- **Escalation:** the scoreboard glitches, and Leo sweats: "the judges can't agree!!"
- **Final round:** "They told you their dealbreakers first." Every star buzzes GREEN, confetti falls, and even Scorpio does a tiny happy hop.
- **LESSON:** "Not every flag is universal. | Know *yours*." Chip: +1 SELF-AWARENESS.
- **Tie-in:** dealbreakers. "pick yours at signup. they're on your card."
- **Last line:** **"Green flags go *first*."**

### 14. `stgroupchat`: "✨her date tonight✨" · 45 s · pop · D
- **Pitch:** B-memes.md §7.
- **Hook:** a group-chat header pops up: "✨ her date tonight ✨ · 12 stars". Headline: "The stars have a group chat. It's about *you*."
- **The messages:** each one pings on the beat.
  - ♋ "did she eat before? she has to eat."
  - ♎ "what's she wearing. send fit pic."
  - ♏ "found his ex's cousin's dog's account."
  - ♍ "made a pros/cons doc. it's shared." (40 rows)
  - ♈ "if he's rude I'm fighting him." (boxing gloves)
  - ♐ "if it's boring just leave lol"
- **Turn:** ♓ Pisces: "wait. what does he look like?" Long silence, and every typing dot stops. THE STARS: "...nobody knows. it's a blind date." Gasps.
- **Payoff:** the mystery card deals in, showing only words: "funny. loves maps. hates cilantro." Cancer: "...honestly? I like him already." Then ♉ Taurus: "hates cilantro?? marry him." The chat renames itself "✨ her WEDDING ✨".
- **LESSON:** "Chemistry starts in conversation, | not the *camera roll*." Chip: +1 MYSTERY.
- **Tie-in:** "Card first. Face last."
- **Last line:** **"Fall for the *words* first."**

### 15. `stfirstfight`: "The First Fight." · 60 s · chiptune · Bm (a tennis match)
- **New.**
- **Hook:** a tennis court in the nebula. ♎ Libra is the umpire, high on a tall chair. ♌ Leo announces: "first fight… PLAY!" Headline: "Your first *fight*. Live." The crowd of stars turns their heads left and right in sync with every shot. This is the running visual gag.
- **The players:** ♈ Aries plays hard and fast. ♉ Taurus is unbothered and holding a snack.
- **The rallies:** each argument is a shot that comes back faster, and the scoreboard keeps count.
  - **"THE DISHES":** Aries: "you left ONE fork." Taurus: "it's soaking."
  - **"YOU'RE LATE":** Taurus: "you said 7. it's 7:40." Aries: "7-ISH!!"
  - **"THE TONE":** Aries: "it's not what you said. it's HOW." The ball goes so fast it's a streak, and the crowd's heads spin. Libra gets dizzy trying to call it fair.
- **Turn:** Libra climbs down: "who's the opponent here?" A ball machine labelled "THE PROBLEM" rolls onto the far side of the net and starts firing. The two players look at each other, then step to the same side of the net. Doubles! Together they return every ball.
- **Payoff:** the crowd cheers and Pisces cries. The scoreboard reads "LOVE – LOVE". Taurus shares the snack.
- **LESSON:** "It's you two | vs the problem. | Not each *other*." Chip: +1 TEAMWORK.
- **Tie-in:** the Push / Pull / Align reading. Line: "push shows where you'll rub. before the first serve."
- **Last line:** **"Fight fair. Score: *love–love*."**

### 16. `stwontgiveup`: "The Star Who Won't Give Up." · 60 s · dreamy · E
- **Pitch:** C-story.md §1, which has full beats.
- **Extension to 60 s:** add a third, funnier failed attempt. The star makes the streetlights blink in sequence, then puts the stranger's dog right in your path. The dog sits on your foot; you pet it… still scrolling.
- **LESSON:** "Look up. | Life is trying | to *find you*." Chip: +1 PRESENCE.
- **Tie-in:** tonight's deck.
- **Last line:** **"Pick up. It's the stars."**

### 17. `stpreviously`: "Previously On… Your Love Life." · 60 s · cinematic · Cm
- **Pitch:** C-story.md §2.
- **LESSON:** "Your past is a season, | not the whole *series*." Chip: +1 CHARACTER ARC.
- **Tie-in:** "Card first. Face last." This is the veiled mystery card.
- **Last line:** **"Every main character gets a new season."**

### 18. `sttake47`: "Take 47." · 60 s · jazzy · F
- **Pitch:** C-story.md §7.
- **LESSON:** "Don't perform. | Be *curious*." Chip: +1 NATURAL.
- **Tie-in:** talk cards.
- **Last line:** **"That's a wrap. Go be yourself."**

### 19. `stpregame`: "Pre-Game." · 45 s · synthwave · Am
- **Pitch:** C-story.md §8. The bucket is just "a bucket of glitter", with no brand.
- **LESSON:** "A no isn't a verdict. | It's just not your *match*." Chip: +1 HEART.
- **Tie-in:** tonight's deck.
- **Last line:** **"Whatever happens: we're proud of you."**

### 20. `stmeetfriends`: "Live from Your 5th House, Ep. 2: Meeting the Friends." · 60 s · funk · Dm
- **New:** a sequel to stlive5th, with the same booth, CRT, ● LIVE bug and crying Pisces. Reuse that film's look.
- **Cold open:** "PREVIOUSLY ON…" in 2 s, recapping the pineapple ✓✓ flip. Then ● LIVE. ♊ Gemini: "WE'RE BACK. tonight: meeting the friends!"
- **The bar:** the CRT shows a pixel bar booth, your three friends and the date arriving. The chyron reads "EP. 2 · THE FRIENDS".
- **Booth calls:** each one gets a green ✓ stamp on screen.
  - ♐ Sag: "phone's… in the pocket."
  - ♊ Gemini: "he's asking the quiet friend a question!"
  - ♐ Sag: "he remembered her name. first try." (Pisces sobs)
- **Danger:** the loud friend starts "the karaoke story". Slo-mo, and the booth holds its breath. Then the date laughs *with* you and tells his own worse story. The booth erupts.
- **Instant replay:** a telestrator circles him refilling everyone's water. Sag, deadpan: "unreal. refilled. the waters."
- **LESSON:** "Watch how they treat | your *people*." Chip: +1 SQUAD APPROVAL.
- **Tie-in:** the booth pulls up the Push / Pull / Align reading on the CRT: "Pull: you both love your people."
- **Last line:** **"Next week: the *second* date. Stay tuned."**

### 21. `stmetfirst2`: "Our Stars Met First, Ep. 2: Capricorn × Pisces." · 45 s · jazzy · Ab
- **New:** a sequel to stmetfirst with the same awkward-parents setup and the same lips button. Reuse that film's look. (The fork already did Aries × Libra opposites in `stopposites`, so this one is about how earth and water complement each other, not opposition.)
- **Hook:** headline "Before you meet, your *stars* do." ♑ Capricorn wears a tiny tie and holds a planner. ♓ Pisces is glittery and already teary. Capricorn: "So. Your human and my human."
- **The awkwardness, rule of three:**
  1. Capricorn: "mine has a five-year plan." Pisces: "mine has a dream journal." Crickets.
  2. Capricorn: "mine is never late." Pisces: "mine is never on time. but always sorry."
  3. Capricorn: "...mine has never bought anyone flowers." Pisces: "...mine has never had a plan." Both: "...oh."
- **Turn:** one of Pisces' tears drips onto Capricorn's little patch of earth, and a pixel sprout pops up and blooms. A gold sextile line snaps between them. THE STARS: "earth and water grow things."
- **LESSON:** "The right person | doesn't fix you. | They help you *grow*." Chip: +1 BLOOM.
- **Tie-in:** "Card first. Face last." Two phones show veiled mystery cards, as in stmetfirst.
- **Button:** the padlock pops in.
- **Last line:** **"Our lips are *sealed*. (Still no lips.)"**

### 22. `stlovelang`: "Love, Translated." · 60 s · jazzy · G
- **New.**
- **Hook:** two stars on a date at a tiny table, both frowning. Headline: "Two stars. Two love *languages*."
- **The first misfire:** ♉ Taurus slides over a pixel pie: "I baked this for you." ♌ Leo, wearing its crown: "...ok but do you think I'm amazing?"
- **The translator:** ♊ Gemini sits in a summit-style translator booth with headphones. "TRANSLATION: 'I baked you a pie' means 'I love you.'"
- **The second misfire:** Leo unveils a banner: "YOU'RE GREAT". Taurus: "...is it edible?" Gemini: "TRANSLATION: the banner means 'I love you.'"
- **Escalation:** a crossed-wires montage while the translator sweats, swapping headsets.
  - ♋ Cancer folds someone's laundry; ♎ Libra just wants to sit together.
  - ♈ Aries goes in for a hug; ♍ Virgo is reorganising their spice rack.
  - The screen reads "TRANSLATING… TRANSLATING…".
- **Turn:** Gemini rips off the headphones: "you could just ASK each other." A talk card: "How do you like to be loved?"
- **Payoff:** Taurus, stiffly: "you're… amazing." Leo tries the pie and goes heart-eyes. The translator booth light clicks off.
- **LESSON:** "Ask how they feel loved. | Then *speak* it." Chip: +1 FLUENT.
- **Tie-in:** talk cards.
- **Last line:** **"Love, *translated*."**

### 23. `stlightyears`: "Light-Years." · 45 s · cinematic · Db
- **New.**
- **Hook:** two stars sit at opposite edges of the frame with a dotted line between them, labelled "4 LIGHT-YEARS". Headline: "Long *distance*. Like, really long."
- **The delay:**
  - Your star sends "goodnight 🌙". A pixel photon crawls across, and a status chip reads "DELIVERED IN: 4 YEARS".
  - The reply "you too!" comes back with "ARRIVES: 4 YEARS".
  - A birthday wish lands on the wrong birthday, and a party hat appears four years late.
- **Escalation:** they try faster ways, and each is too slow:
  1. a paper plane
  2. a pigeon in a tiny space helmet
  3. yelling, shown as a tiny "HIIII" crawling across the sky
  
  Pisces cries in the middle.
- **Turn:** THE STARS: "you can't fix the distance." Then: "you can fix the effort." The two set a ritual: every night at the same time, they both shine together on the beat, and a gold constellation line connects them.
- **LESSON:** "Distance is just space. | *Effort* closes it." Chip: +1 DEVOTION.
- **Tie-in:** talk cards. Both stars answer the same card, and the answers flip at the same moment ("answers stay hidden till you both play").
- **Last line:** **"Same sky. Same *time*. Tonight."**

### 24. `stexfiles`: "The Ex Files." · 45 s · screwed · Ebm (noir)
- **New.**
- **Hook:** 1:12 AM under a desk lamp. ♏ Scorpio is a detective in a trench coat and fedora. Headline: "1:12 AM. The case of *the ex*." Scorpio narrates: "the ex posted a sunset. I've been staring for 3 hours."
- **The corkboard:** red string links a silhouette labelled "SUBJECT: THE NEW ONE" to "LIKES: pilates", "OWNS: a ring light" and "MUTUAL: some guy named Dave".
- **The assistant:** ♍ Virgo brings coffee and a fat file: "boss. we've got 400 screenshots."
- **Escalation, rule of three:** "ENHANCE." Still a blob. "ENHANCE." Still a blob. "ENHANCE." It's a pigeon.
- **Turn:** Virgo flips the file over. The label reads "CASE: YOU", with three photos:
  - "skipped dinner"
  - "missed a friend's birthday"
  - "up at 1 AM. again."
  
  Scorpio slowly lowers the magnifying glass.
- **THE STARS:** they open the blinds and soft morning light floods in. "stop studying them. start living you."
- **LESSON:** "Closure isn't on their profile. | It's in *you*." Chip: +1 MOVING ON.
- **Tie-in:** tonight's deck. Scorpio drawers the case file, and tonight's deck deals in. "new cases every night. better ones."
- **Last line:** **"Case *closed*."**

### 25. `stsolodate`: "Table for One." · 45 s · dreamy · Bb
- **New.**
- **Hook:** ♎ Libra sits alone at a candlelit table for two. Headline: "A date with *myself*." The other stars peek out from behind a cloud. ♋ Cancer: "oh no. she's been stood up."
- **The date:** Libra gives itself flowers, toasts itself, laughs at its own joke and orders dessert first.
- **The gossip, rising:**
  - Cancer: "should we send someone?"
  - ♏ Scorpio: "she's… having fun?"
  - Then a montage: Libra at a museum alone, at karaoke alone (crushes it), at the movies alone with a giant popcorn.
  - The gossip stars get jealous, and Cancer quietly orders dessert first too.
- **Turn:** Libra writes in a journal, "things I love:", and the list fills up. THE STARS: "you know what you like now."
- **LESSON:** "You're not half | of anything. | You're *whole*." Chip: +1 SELF-LOVE.
- **Tie-in:** tonight's deck. "when you're ready, the deck's ready." It deals in on Libra's phone. Libra smiles and finishes dessert first.
- **Last line:** **"Table for one. *Then* two."**
