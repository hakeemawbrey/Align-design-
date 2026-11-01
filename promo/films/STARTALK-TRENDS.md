# Star Talk Trends: 100 meme and vertical-video trend films (20 formats × 5)

The user asked for "100 more that are meme formats, vertical video trend formats like POV, day in the life etc, and more
relatable zodiac and love stuff." Each format below is a familiar short-video trend, played by the pixel stars. Every
film should feel like something you'd send to the group chat: instantly readable, relatable, and kind.

## Read first
- **promo/films/STARTALK-SHOWS.md, section "Rules for this batch",** and **promo/films/STARTALK4.md**, sections
  "The machine is shared", "Checks before you commit" and "Make it FUNNY". Every rule there applies, with the changes
  below.
- **promo/films/STARTALK.md** for the look and tone, and **startalk.js** for `drawStarChar`, `dialogueBox`, `talkCues`,
  `talkHops`, `lineTimes`, `signStar`, `STAR`.
- **Reference films (built and rendered); read one fully before you start:** `sxmail1` (30 s, show bug, cardfx +
  endcard wiring), `sxdebatetext` (split screen), `st12meetfriends` (20 s headline format), `st9aquawork` (POV hook).
- **Usage cap:** at most two full sheets per film (rate 2, then a final rate 4). Use stills for spot checks.

## What's different in this batch
- **Folders:** `promo/films/tr<name>/` exactly as listed. Never edit another folder or a shared module.
- **Commit:** `/tmp/claude-0/commit.sh "Star Talk Trends: <format>: <title> (<len> s)" promo/films/<f>`.
- **Queue the render at the FRONT of the queue** (the user wants these sooner than the re-renders already waiting):
  `flock /tmp/claude-0/queue.lock sh -c 'q=/tmp/claude-0/queue.txt; { echo "<f> v1"; cat $q 2>/dev/null; } > $q.new && mv $q.new $q'`
  (works when the queue is empty too; `sed -i '1i'` does not)
- **No season numbers anywhere** (not on cards, bugs or captions). The format name is the bug, e.g. "POV" or
  "NOBODY:", in Inter 800 small caps, letter-spaced, top-left, 56 px from the edges, clear of captions and boxes.
- **Card cuts:** cardfx.js now plays exactly one card transition per video (the middle candidate of your `CUTS`), and
  the end card no longer flips. Wire `cardFrame`/`cardCuts`/`cardCutCues` exactly as `sxmail1` does. A 15–20 s film can
  pass a single candidate. Don't number cards with seasons.
- **Trend UI:** caption stickers, a bold top caption, a fake progress bar, stitched/split screens, a timestamp overlay
  ("7:02 AM") and on-screen checklists are all welcome. **No real platform names, logos, sounds, usernames or UI
  marks** — keep it generic (no like/share icons copied from a real app).
- **Lengths include the 4.4 s end card** (endcard.js, default CTA). 15 s = one gag; 20 s = hook + 2–3 beats + payoff;
  30 s = mini story; 45 s = a full arc with a LESSON UNLOCKED (lesson.js) and a funny film-specific chip.
- **Relatable first:** each film names a feeling people actually have about dating, texting, crushes or their sign.
  The joke is on the situation, never on a sign or a person. Signs are lovingly teased, never insulted.
- **Recurring gag:** Pisces cries somewhere in the background of every film (happy tears count).
- **Truth:** no invented statistics (joke ratings like "10/10" are fine, survey-style numbers are not); no real brands,
  apps, songs, shows, teams, businesses, places that need a name, or people; standard astrology only; no disaster or
  flood jokes; no weapons; nothing sexual; advice is warm and healthy, never mean or manipulative.
- **App tie-ins:** "Card first. *Face* last." Only real features: blind mystery cards, tonight's deck, talk cards,
  dealbreakers, Push / Pull / Align readings, the founding card. Not every film needs a tie-in; when it has one, it's
  light, in the last beat.
- **Don't repeat** topics other batches own: the season-9 morning/work/crew POVs, the season-12 hot takes, the
  season-13 explainers, ghosting, "k.", soft launches, love bombing, retrograde ex-texts, solo dating, profile ratings,
  red-flag/green-flag rounds, game shows, courtrooms, karaoke, the kiss cam, and the Star Talk Shows topics. Skim the
  STARTALK*.md list of titles if unsure.
- **Build order:** finish, check, commit and queue each film before starting the next.
- **Report back:** for each film, the length, final sheet path, kept cut time, and anything you changed and why.

Each format gives the mechanic, the bug text, the music style (pick a different key per episode from the list), and
five episodes with a premise and last line. The premises are starting points: make them funnier, keep the meaning.

---

## 1. TELL ME WITHOUT TELLING ME · bug "TELL ME WITHOUT TELLING ME" · 20 s · pop · keys C, D, Eb, F, G
Top caption "Tell me you're a [sign] without telling me." Three quick visual tells (rule of three, third twisted), then
THE STARS stamp "…a [SIGN]." Pisces is impressed.
1. `trtellleo`: Leo. Ring light for a phone call; claps for their own parallel parking; third: hypes their date harder than themselves. Last: "Main character, *generous* edition."
2. `trtellvirgo`: Virgo. Labels the snacks; edits a text 9 times; third: has already noted your allergies. Last: "Organized *affection*."
3. `trtellscorpio`: Scorpio. Sunglasses indoors; remembers a detail from week one; third: the "intense stare" is just them listening. Last: "*Deep* end only."
4. `trtellsag`: Sagittarius. Packed bag by the door; says "spontaneous road trip?"; third: the trip is to the corner for snacks with you. Last: "Adventure, *party of two*."
5. `trtelltaurus`: Taurus. Five blankets; orders the same thing every time; third: shares the last fry, which is huge. Last: "Comfort is a *love language*."

## 2. NOBODY: · bug "NOBODY:" · 15 s · chiptune · keys A, B, C#, E, F#
The classic meme: a blank card reading "Nobody:" holds for a beat of silence, then "[Sign]:" and the sign doing the
most. One escalation, then the payoff.
1. `trnobodygemini`: Gemini at 2 AM starting three new hobbies "for us". Last: "Which one are we *doing*?"
2. `trnobodycancer`: Cancer saving every voice note in a little labeled shell box. Last: "Sentimental? *Archival*."
3. `trnobodycap`: Capricorn making a color-coded calendar of date ideas, including "spontaneous fun (scheduled)". Last: "Spontaneity: *booked*."
4. `trnobodyaqua`: Aquarius explaining a theory about the moon to the date… who is into it. Last: "Weird is *the vibe*."
5. `trnobodypisces`: Pisces crying at a pixel commercial about socks. Their date passes a tissue without looking. Last: "*Soft* hours."

## 3. EXPECTATION vs REALITY · bug "EXPECTATION / REALITY" · 20 s · lofi · keys Am, Bm, Cm, Dm, Em
Split screen, glossy left vs scrappy right. The turn: reality is better.
1. `trexpectpicnic`: Expectation: a perfect picnic. Reality: ants, wind, one sandwich… they laugh until they cry. Last: "Reality *wins*."
2. `trexpectcook`: Expectation: candlelit homemade dinner. Reality: cereal at midnight, sharing the good spoon. Last: "Five stars. *Cereal*."
3. `trexpectstars`: Expectation: shooting stars. Reality: clouds; they talk all night instead. Last: "Who needs *a sky*?"
4. `trexpectdance`: Expectation: a smooth slow dance. Reality: stepping on toes, then a goofy jig. Last: "Two left *stars*."
5. `trexpectoutfit`: Expectation: a sleek date outfit. Reality: they both wore the same comfy sweater. Last: "*Matching*, technically."

## 4. GET READY WITH ME · bug "GRWM: FIRST DATE" · 30 s · pop · keys Bb, C, D, E, F
A star talks to the camera while getting ready, the inner monologue spiralling; timestamps tick toward date time. The
turn: the date texts something sweet and the spiral stops.
1. `trgrwmlibra`: Libra can't pick an outfit; holds up two identical shirts. Last: "Balanced. *Finally*."
2. `trgrwmaries`: Aries is ready in four seconds, then waits two hours, re-ready every ten minutes. Last: "Ready. *Still*."
3. `trgrwmcancer`: Cancer rehearses talk card answers to the mirror and cries at their own answer. Last: "Practice makes *Pisces*."
4. `trgrwmscorpio`: Scorpio perfects a mysterious look, then grins the second the date texts. Last: "Mystery: *cancelled*."
5. `trgrwmvirgo`: Virgo builds a checklist (mints, charger, three conversation topics); the date's text says "just be you". Last: "Checklist: *done*."

## 5. STARTER PACK · bug "STARTER PACK" · 20 s · funk · keys E, F, G, A, Bb
Items pop into a 2×2 (or 3×2) grid with labels, sticker-style; the last item is the twist, the heart of it.
1. `trpacknerves`: "First date nerves" pack: 3 outfit changes, a practice laugh, a pep talk from Aries… and the date, also nervous. Last: "Nervous *together*."
2. `trpackastro`: "Just got into astrology" pack: chart wheel, sudden opinions, "that's so Gemini"… and asking everyone their moon. Last: "*Moon* sign, please."
3. `trpackromantic`: "Hopeless romantic" pack: window gazing, love-letter drafts, a playlist titled "us?"… and a talk card. Last: "*Hopeful*, actually."
4. `trpackmatchmaker`: "The friend who's always matchmaking" pack: clipboard, two friends' names in a heart, a fake "bump into"… and their own crush. Last: "Matchmaker, *match thyself*."
5. `trpackhomebody`: "Homebody in love" pack: blanket, tea, a cancelled-plans celebration… and a date at home, together. Last: "In is *the new out*."

## 6. HOW IT STARTED vs HOW IT'S GOING · bug "HOW IT STARTED" · 20 s · dreamy · keys Db, Eb, F, Gb, Ab
Two frames: a slightly awkward first moment, then a warm present that calls back to it.
1. `trstartedhi`: Started: an awkward "hi… hi… hi" collision. Going: a secret handshake built on it. Last: "Hi. *Hi*."
2. `trstartedcard`: Started: a blind mystery card both almost skipped. Going: it's framed on the wall. Last: "Card first. *Face* last."
3. `trstartedpancake`: Started: burnt pancakes on date two. Going: pancake Sundays, still burnt. Last: "*Tradition*."
4. `trstartedpun`: Started: a terrible pun, total silence. Going: the pun is their whole love language. Last: "Pun *intended*."
5. `trstartedplaylist`: Started: one shared song. Going: a playlist so long it needs a scroll bar. Last: "Track *one*, forever."

## 7. MY ROMAN EMPIRE · bug "MY ROMAN EMPIRE" · 20 s · cinematic · keys Cm, Dm, Ebm, Fm, Gm
"What's your Roman Empire?" (the thing you think about every day). Epic marble-and-column parody framing a tiny moment.
1. `trromecompliment`: Libra thinks about one compliment on their shoes, daily. Last: "*Immortal* words."
2. `trromesandwich`: Taurus thinks about the sandwich their date shared on date one. Last: "An *empire* of crumbs."
3. `trromehome`: Cancer thinks about "text me when you get home". Last: "*Home*, apparently."
4. `trrometypo`: Virgo thinks about the typo in their first message. The date thought it was cute. Last: "Let it *go*. (Never.)"
5. `trromeeyes`: Scorpio thinks about eye contact across the room. So does the other star. Last: "*Mutual* empire."

## 8. PUT A FINGER DOWN · bug "PUT A FINGER DOWN" · 30 s · house · keys G, A, B, C, D
A star holds up ten pixel fingers; prompts slide in; fingers drop with a tick. The final count lands on a kind truth.
1. `trfingeroverthink`: Overthinker edition (re-reading texts, drafting replies). Ends with zero fingers and a hug from THE STARS. Last: "*Breathe*, star."
2. `trfingerromantic`: Hopeless romantic edition. Last: "*Guilty*. Happily."
3. `trfingertexter`: Texter edition (typing bubbles, voice notes, triple texts). Last: "Just *call* them."
4. `trfingerfirst`: First-date edition (arrived early, practised the laugh). Last: "Everybody's *nervous*."
5. `trfingerplanner`: Planner edition (backup plan for the backup plan). Last: "Plan: *have fun*."

## 9. POV · bug "POV" · 20 s · synthwave · keys F#m, G#m, Am, Bm, C#m
Second-person camera: the star looks into the lens; top caption "POV: …".
1. `trpovthirdwheel`: POV: you're the third wheel and the couple keeps including you, a lot. Last: "Best *wheel*."
2. `trpovguess`: POV: your crush says "my sign? guess." Twelve guesses in a flurry. Last: "*Wrong*. All twelve."
3. `trpovmoon`: POV: your date asks your moon sign and you don't know it. THE STARS whisper it. Last: "*Moon* who?"
4. `trpovshoulder`: POV: you're the friend reading their texts over their shoulder, gasping. Last: "Send it. *SEND IT*."
5. `trpovtalkcard`: POV: you're a talk card about to be answered. Suspense, then a sweet answer. Last: "I was *born* for this."

## 10. A DAY IN THE LIFE OF… · bug "A DAY IN THE LIFE" · 30 s · lofi · keys Ab, Bb, C, Db, Eb
Vlog-style with timestamps, starring an object or a small helper, not a sign's workday.
1. `trdaycard`: A blind mystery card's day: shuffled, dealt, flipped, finally loved. Last: "*Face* last. Always."
2. `trdaymoon`: The moon on date night: hanging around, setting the mood, eavesdropping. Last: "I *glow* for this."
3. `trdaytissues`: Pisces' tissue box: busy from 7 AM. Last: "*Overtime*, again."
4. `trdayporch`: The porch light at the end of a date: waiting, flickering, giving them a moment. Last: "*Lights* stay on."
5. `trdayphone`: A phone waiting for a text back: checking, buzzing for the wrong thing, then the right one. Last: "*Worth* the wait."

## 11. CUTE, NOT AN ICK · bug "NOT AN ICK" · 20 s · jazzy · keys Bb, C, D, Eb, F
"Things that should be an ick but aren't when it's them." Three moments, each with a buzzer that turns into a heart.
1. `trickclap`: They clap when the plane lands (pixel plane). Last: "*Applause*, deserved."
2. `trickmenu`: They read the menu out loud, with voices. Last: "*Encore*."
3. `trickdogs`: They wave at every dog. The dogs wave back. Last: "*Friend* of dogs."
4. `trickyummy`: They say "yummy" at every bite. Last: "Yummy. *Officially*."
5. `trickrun`: They run to catch up for a hug. Last: "*Sprint* to me."

## 12. WAIT FOR IT · bug "WAIT FOR IT…" · 20 s · screwed · keys Ebm, Fm, Gbm, Abm, Bbm
A slow, suspicious build ("this is going badly…"), then a twist reveal that's sweet.
1. `trwaittaurus`: Taurus slowly making a sandwich… gives away the bigger half. Last: "*Bigger* half."
2. `trwaitcap`: Capricorn's packed calendar… one block reads "free time with you". Last: "*Blocked* off."
3. `trwaitscorpio`: Scorpio staring across the café… memorizing the date's coffee order. Last: "*Noticed*."
4. `trwaitaqua`: Aquarius building a weird machine… it pours a cup of tea for the date. Last: "*Invented* for you."
5. `trwaitleo`: Leo clearing their throat for a big speech… it's all about the date. Last: "*Spotlight*: you."

## 13. THE SIGNS AS… · bug "THE SIGNS AS…" · 45 s · pop · keys C, D, E, F, G
A quick-fire roll call: all twelve signs in ~2.5 s cameos, each with a one-line caption, then a LESSON.
1. `trsignswedding`: The signs as wedding guests. LESSON about showing up for people. Last: "*Plus-one* energy."
2. `trsignsroomies`: The signs as roommates. LESSON about small kindnesses. Last: "Dishes are *romance*."
3. `trsignswaiting`: The signs waiting for a text back. LESSON: the wait says nothing about you. Last: "*Phone down*."
4. `trsignsdinner`: The signs ordering at a dinner date. LESSON: share the bread. Last: "*Split* the fries."
5. `trsignsmovie`: The signs at a movie date (a made-up film). LESSON about being present. Last: "*Watch* them, not it."

## 14. RATING MY DATE, HONESTLY · bug "HONEST RATINGS" · 30 s · funk · keys Am, Bm, C#m, Dm, Em
Scorecards held up by THE STARS after each moment; joke ratings only ("11/10, illegal"); the last score breaks the scale.
1. `trratefirst`: Rating the first date: the hello, the laugh, the goodbye. Last: "Scale: *broken*."
2. `trratecooked`: Rating the first meal they cooked: burnt, but the effort is off the chart. Last: "Effort: *infinite*."
3. `trratefriends`: Rating how they met my friends: survived the group, learned everyone's name. Last: "Group *approved*."
4. `trrategoodbye`: Rating the goodbye at the door: three tries, one wave too many. Last: "Again. *Tomorrow*."
5. `trratemix`: Rating the playlist they made me: song titles are made up and sweet. Last: "On *repeat*."

## 15. HEAR ME OUT · bug "HEAR ME OUT" · 20 s · cinematic · keys Eb, F, G, Ab, Bb
A star defends an unexpected crush quality at a little podium; the other stars go from skeptical to swooning.
1. `trhearlabel`: Hear me out: Virgo's label maker. Last: "*Labeled*: mine."
2. `trhearwalk`: Hear me out: someone who says "I'll walk you to your car". Last: "Walked there. *Swooned* back."
3. `trhearcoffee`: Hear me out: someone who remembers your order. Last: "*Oat* of this world."
4. `trhearhate`: Hear me out: someone who hates the same song you do. Last: "*United*."
5. `trhearearly`: Hear me out: someone who shows up five minutes early. Last: "*On time* is a love language."

## 16. SILENT REVIEW · bug "SILENT REVIEW" · 20 s · jazzy · keys Db, Eb, F, Gb, Ab
A star reviews a gift or gesture with faces only (no lines): eyebrow raises, slow nods, a tear. Score card at the end.
1. `trsilentletter`: A handwritten love note. Last: "*Speechless*. Literally."
2. `trsilentplaylist`: A playlist made for them. Last: "*Track three* got me."
3. `trsilentdinner`: A homemade dinner. Last: "*Chef's kiss*."
4. `trsilentvoice`: A voice note good-morning. Last: "*Play it again*."
5. `trsilentpicnic`: A surprise picnic for two. Last: "No *notes*."

## 17. WRONG ANSWERS ONLY · bug "WRONG ANSWERS ONLY" · 20 s · chiptune · keys G, A, B, C, D
A question card; three signs give absurd answers; THE STARS (or Pisces, sniffling) give the true one.
1. `trwrongdate`: "Describe the perfect first date." Last: "Right answer: *you*."
2. `trwronglove`: "How do you know it's love?" Last: "When it's *easy*."
3. `trwrongsay`: "What do you say on a first date?" Last: "*Ask* them things."
4. `trwronglang`: "What's your love language?" Last: "*All five*, please."
5. `trwrongdeal`: "Name a dealbreaker." Last: "*Unkindness*. That's it."

## 18. LITTLE THINGS · bug "LITTLE THINGS" · 20 s · dreamy · keys C, D, E, F, G
"Little things that mean I love you." Each film is one small, specific gesture between two stars, shown in a tiny
mini-scene, then the caption.
1. `trlittlehome`: "Text me when you get home." Last: "*Home* safe."
2. `trlittlebite`: Saving the last bite. Last: "*Yours*."
3. `trlittleplate`: "I made you a plate." Last: "*Fed* and loved."
4. `trlittlehoodie`: "You can keep the hoodie." Last: "*Ours* now."
5. `trlittlecharge`: Charging their phone without asking. Last: "*Full* battery, full heart."

## 19. STORYTIME · bug "STORYTIME: HOW WE MET" · 45 s · cinematic · keys Dm, Em, F#m, Gm, Am
A star tells the story to camera with sticky captions and quick cutaway flashbacks; ends with a LESSON.
1. `trstoryskip`: "We matched on the blind card I almost skipped." LESSON: give it one more look. Last: "Never *skip*."
2. `trstorydare`: "My friend dared me to answer the talk card honestly." LESSON: honesty is attractive. Last: "*Dare* accepted."
3. `trstorypizza`: "We argued about pizza toppings for an hour." LESSON: playful disagreement is chemistry. Last: "*Half* and half."
4. `trstoryearly`: "We were both twenty minutes early." LESSON: eager is nothing to hide. Last: "*Early*, together."
5. `trstorypun`: "They laughed at my worst joke." LESSON: find the one who laughs. Last: "*Still* laughing."

## 20. ME AT 2 PM vs ME AT 2 AM · bug "2 PM / 2 AM" · 20 s · synthwave · keys Bbm, Cm, Dbm, Ebm, Fm
Split screen, bright afternoon vs midnight-blue room; the 2 AM self spirals, then a soft resolution.
1. `tr2amcalm`: My plan to play it cool. Last: "Cool is *overrated*."
2. `tr2amconfidence`: My confidence (2 PM: "I'm a catch." 2 AM: "am I a catch?"). THE STARS: yes. Last: "*Catch*. Confirmed."
3. `tr2amlove`: My belief in love (2 AM: writing a poem). Last: "*Poet* hours."
4. `tr2ambedtime`: My bedtime, ruined by one good conversation. Last: "*Worth* it."
5. `tr2amtext`: The text I drafted (2 PM: "hey"; 2 AM: three paragraphs). Send the kind short one in the morning. Last: "*Morning* me knows."
