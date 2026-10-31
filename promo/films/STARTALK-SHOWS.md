# Star Talk Shows: 13 new series, 44 films (vertical, 20–60 s)

The user asked "What other ideas should we do for future seasons?", got a list of 13 series ideas, and answered **"Do them all."** Each series below is a new show starring the pixel stars. This batch makes the first episodes of all 13 shows: 44 films.

## Read first
- **promo/films/STARTALK4.md:** **every rule in it applies here** except the parts about its own 25 films. That covers:
  - the shared-machine tools: slot.sh, temp dirs under `/tmp/claude-0/s3/<f>/`, commit.sh and queueing the render;
  - the checks before you commit;
  - the truth rules;
  - "Make it FUNNY";
  - the LESSON UNLOCKED module `promo/films/lesson.js`, which already exists.
- **promo/films/STARTALK.md** for the look and tone, and **startalk.js** for `drawStarChar`, `dialogueBox`, `talkCues`, `talkHops`, `lineTimes`, `signStar`, `STAR`.
- **Reference films** (all built and rendered). Read at least one fully:
  - **short:** `starleo`, `staries`;
  - **story:** `stlive5th`, `stmetfirst`, `staunties`, `stpirates`, `stwestern`;
  - **CRT TV / broadcast look:** `stlive5th`, `st8gameshow`.
- **Usage cap:** do at most two full sheets per film (rate 2, then a final rate 4). Use stills for spot checks.

## Rules for this batch
- **Folders** are new: `promo/films/sx<name>/`. Never edit another film's folder or a shared module.
- **Commit message:** `/tmp/claude-0/commit.sh "Star Talk Shows: <show>: <title> (<len> s)" promo/films/<f>`. Then queue the render: `flock /tmp/claude-0/queue.lock sh -c 'echo "<f> v1" >> /tmp/claude-0/queue.txt'`.
- **Build order:** finish, check, commit and queue each film before starting your next one, so no work is lost.
- **Show identity:** every show gets a small **show bug** in the top corner for its whole runtime, e.g. "ORBIT · EP 3" or "STAR MAIL". Use pixel or Inter 800 small caps. It stays clear of the dialogue box and headline.
  - **Two agents make episodes of Orbit**, so its bug style is fixed: "ORBIT" in Inter 800 small caps, letter-spaced, pink #ff7eb6, then " · EP n" in white at 60% opacity. Top-left, 56 px from the edges.
- **Lengths include the 4.4 s end card** (endcard.js, default CTA "JOIN THE HOUSTON BETA"). Card cuts come from cardfx.js: one every 12–15 s, and a 20 s film may have none.
- **Format by length:**
  - **20 s:** hook headline + sight gag, 1–3 box lines, last line.
  - **30 s:** mini story, 3–5 box lines. The LESSON is optional.
  - **45–60 s:** a full arc with escalation and a LESSON UNLOCKED (lesson.js) with a funny, film-specific chip.
- **Recurring gag:** Pisces cries somewhere in the background of every film.
- **Truth:**
  - No invented statistics.
  - No real brands, apps, teams, businesses or people.
  - Standard astrology only.
  - No disaster or flood jokes, no weapons.
  - Advice is warm and healthy, never mean or manipulative.
- **App features:** "Card first. *Face* last." (never "chart first"). Only features that exist may be tied in: blind mystery cards, tonight's deck, talk cards, dealbreakers, Push / Pull / Align readings, the founding card. Don't invent new ones.
- **Don't repeat** topics other batches own; skim STARTALK3–13 and STARTALK-WILD if unsure. Already taken, among others: Montrose, the Heights, Katy, karaoke, the kiss cam, game shows, courtrooms, heists, opposites (Aries × Libra), the Saturn-return lecture, ghosting, "k.", retrograde ex-texts and solo dating.
- **Report back:** length, final sheet path, kept cut times, and anything you changed from the brief and why.

Each entry gives the folder, the title, the length, the music (style · key), the beats, the LESSON (for 45–60 s), the tie-in and the last line. The beats are a starting point: improve the jokes. Keep the lesson's meaning, the tie-in, the length and the last line.

---

## Show 1: ORBIT (a soap opera in six episodes)
A serialized star romance. It's melodramatic and glossy, with soap-opera zooms on gasps, but warm underneath.

**The cast:**
- **Ember:** an Aries star, `signStar('aries')` red. Bold and impulsive, with a big heart.
- **Tide:** a Cancer star, silvery-blue `signStar('cancer')`. Shy, and keeps a tiny pixel shell to hide in.
- **Streak:** a comet who is Ember's ex. Leaves a glittery tail and loves an entrance.

**Every episode:**
- opens with a 1 s "PREVIOUSLY ON ORBIT…" flash, except Ep 1;
- ends on a cliffhanger freeze-frame with a pink "NEXT TIME ON *ORBIT*…" card before the end card;
- is 45 s, with a LESSON before the cliffhanger.

**Who builds it:** Eps 1–3 and Eps 4–6 are made by two different agents. Keep the character designs exactly as above (sign colors from `signStar`, Tide's shell, Streak's tail) so they match.

1. **`sxorbit1`: "Dealt." · 45 s · cinematic · Dm**
   - **Beats:** Tonight's deck deals Ember and Tide each other's blind mystery card. Ember rushes to say yes; Tide hides in the shell, peeks out, and hides again. Dramatic zooms. Tide finally taps yes.
   - **LESSON:** "Nervous and *interested* | can live in the same star." Chip: +1 COURAGE.
   - **Cliffhanger:** the faces are about to flip… FREEZE.
   - **Tie-in:** blind mystery cards. **Last line:** "*Face* last, darling."
2. **`sxorbit2`: "Face Last." · 45 s · lofi · F**
   - **Beats:** The reveal. Tide expected a cool, mysterious star; Ember is a golden-retriever star waving with both arms. A first talk card asks "your perfect Sunday?" They answer: Ember says "a 10K run", Tide says "blanket fort". There's a gasp and a soap zoom… then both say "…I could try yours."
   - **LESSON:** "Different isn't a dealbreaker. | *Curious* is the move." Chip: +1 OPEN MIND.
   - **Cliffhanger:** a glittery tail streaks across the sky. Ember freezes: "…Streak?"
   - **Tie-in:** talk cards. **Last line:** "Who is *she*?!"
3. **`sxorbit3`: "The Comet Returns." · 45 s · synthwave · Em**
   - **Beats:** Streak makes a huge entrance with sparkle trails and wind. Ember is polite and clear: "we're friends now." Tide sees only the sparkle and retreats into the shell. Then the rule of three: Ember knocks on the shell three times. The third knock is a talk card slid under the door.
   - **LESSON:** "Ask before you *assume*. | The shell can't hear your feelings." Chip: +1 TALKED IT OUT.
   - **Cliffhanger:** Tide's reply is "…we need to talk."
   - **Tie-in:** talk cards. **Last line:** "Oh *no*."
4. **`sxorbit4`: "We Need to Talk." · 45 s · jazzy · Bb**
   - **Beats:** "We need to talk" turns out to be Tide wanting to say "I like you a lot, and that scares me." The soap music swells for heartbreak and record-scratches into relief. Ember faints from happiness and Pisces sobs in the back.
   - **LESSON:** "Say the *scary* true thing. | It's usually the kind one." Chip: +1 VULNERABLE.
   - **Cliffhanger:** Ember: "Then… meet my friends? The whole *constellation*?"
   - **Tie-in:** talk cards. **Last line:** "The whole *what*?"
5. **`sxorbit5`: "The Constellation." · 45 s · funk · G**
   - **Beats:** Meeting Ember's friend group, a whole constellation of loud fire signs. Tide is overwhelmed, then finds the one quiet star in the corner (a Virgo) and makes a friend. Ember notices and makes room.
   - **LESSON:** "A good partner | *makes room* for you." Chip: +1 FOUND MY PERSON'S PEOPLE.
   - **Cliffhanger:** a scroll arrives: Ember is invited to shine in a galaxy *very* far away.
   - **Tie-in:** Push / Pull / Align (the friends run a quick reading on the two and it lands on ALIGN). **Last line:** "How *far*?"
6. **`sxorbit6`: "Same Sky." (finale) · 60 s · dreamy · C**
   - **Beats:** The far galaxy. Ember wants to go but doesn't want to lose Tide. Tide comes out of the shell fully for the first time and says "go shine — we'll talk every night." Montage: nightly talk cards across the distance, the same moon in both skies. Ember comes back.
   - **LESSON:** "Love isn't keeping someone close. | It's *cheering* them on." Chip: +1 SEASON FINALE.
   - **Ending:** instead of a cliffhanger, a "THE END… *for now*" card, and Streak waves from a distance with a new comet date.
   - **Tie-in:** talk cards. **Last line:** "Same sky. *Always*."

## Show 2: STAR MAIL (an advice column, 4 × 30 s)
THE STARS narrator, with a gold quill, reads a made-up viewer letter. The letter unfolds on screen in handwritten pixels, signed "— a [sign] in [made-up place]" with generic places only. The stars give a quick, warm, funny answer and stamp the letter with a wax seal. The show bug reads "STAR MAIL".

7. **`sxmail1`: "My Gemini texts in paragraphs." · 30 s · chiptune · A**
   - **Beats:** The letter: "they send 9 texts in a row, I send one." The phone scrolls endlessly. Answer: different texting styles aren't interest levels, so just say your style out loud.
   - **Last line:** "Seal it with a *talk card*."
8. **`sxmail2`: "They said 'lol' to my heartfelt text." · 30 s · pop · Eb**
   - **Beats:** The heartfelt paragraph flies across, and "lol" comes back. A dramatic gasp from Pisces. Answer: some people don't know what to do with big feelings over text. Ask in person, kindly.
   - **Last line:** "Big feelings deserve *a voice*."
9. **`sxmail3`: "Is it too soon to say I like them?" · 30 s · lofi · Gm**
   - **Beats:** "it's been 3 dates." A stopwatch, a calendar and a rulebook all argue. Answer: there's no clock on honesty. "I like spending time with you" is never too soon.
   - **Last line:** "Too soon? *Never* heard of her."
10. **`sxmail4`: "I roasted Virgos for years. Now I'm dating one." · 30 s · funk · D**
    - **Beats:** The writer's group chat full of Virgo jokes. A Virgo star with a clipboard shows up and is lovely. Answer: signs are a starting point, not a sentence. Let people surprise you.
    - **Last line:** "Eat the roast. *Gracefully*."

## Show 3: DATE NIGHT RECAP (a sportscast, 3 × 45 s)
Two star commentators in a booth with headsets and a desk call a date like a big game. They have instant replay, slow-mo, a telestrator drawing circles, and a "STAT" box that only ever shows jokes, never numbers. The show bug reads "DATE NIGHT RECAP".

11. **`sxrecapbowl`: "The Bowling Date." · 45 s · funk · C**
    - **Beats:** Gutter ball after gutter ball. The commentators despair. Replay in slow-mo: the gutter ball made them both laugh, and that's the highlight of the night.
    - **LESSON:** "The stumble is the *story*." Chip: +1 PLAY OF THE NIGHT.
    - **Tie-in:** tonight's deck. **Last line:** "And that's a *strike* for the heart."
12. **`sxrecapcook`: "The Cooking Date." · 45 s · house · Am**
    - **Beats:** Pasta boils over, sauce on the ceiling (sight gag), noodles burned to a crisp. The commentators call it a fumble. Replay: they ordered in and danced in the kitchen.
    - **LESSON:** "Plans flop. | *Chemistry* doesn't need a recipe." Chip: +1 CHEF'S KISS.
    - **Tie-in:** talk cards. **Last line:** "Final score: *two* happy stars."
13. **`sxrecapgolf`: "The Mini-Golf Date." · 45 s · chiptune · E**
    - **Beats:** A pixel windmill hole. One star is super competitive (Aries), the other doesn't care (Libra). Tension rises at the windmill. The turn: Aries throws the last putt on purpose to hear Libra laugh.
    - **LESSON:** "Win the *date*, not the game." Chip: +1 GOOD SPORT.
    - **Tie-in:** Push / Pull / Align. **Last line:** "*Hole* in one."

## Show 4: TWO STARS DISAGREE (a debate, 3 × 30 s)
Two podiums, a gong and a split screen. Two signs argue a classic dating question in rapid-fire lines, three volleys each. Then THE STARS cut in: both are right if you *say it out loud* to the person. The film ends with "Which side are *you* on?" The show bug reads "TWO STARS DISAGREE".

14. **`sxdebatetext`: "Text first, or wait?" · 30 s · synthwave · Fm**
    - **Argument:** Aries ("text NOW") vs Capricorn ("strategy, timing, 48 hours").
    - **Last line:** "Just *text*. Respectfully."
15. **`sxdebatebill`: "Split it, or I've got this?" · 30 s · jazzy · G**
    - **Argument:** Leo ("I'm treating you!") vs Virgo (calculator, itemized receipt).
    - **Last line:** "Whoever's paying, *ask*."
16. **`sxdebatephone`: "Phone face-up, or face-down?" · 30 s · lofi · Cm**
    - **Argument:** Gemini (seventeen notifications) vs Taurus (phone in the bread basket).
    - **Last line:** "Face-down. *Face* last."

## Show 5: THE STARS EXPLAIN IT TO YOUR MOM (3 × 45 s)
Mom is a Cancer star with reading glasses, a cardigan and a cup of tea. She's sweet and skeptical, and asks great questions. The stars explain gently with props. It's affectionate: Mom is never the butt of the joke, and she's sharper than expected. The show bug reads "EXPLAIN IT TO MOM".

17. **`sxmomchart`: "What's a sun, moon and rising?" · 45 s · dreamy · Eb**
    - **Beats:** The stars draw three layers: sun (who you are), moon (what you feel), rising (how you come across). Mom: "So… like how I'm nice at church and honest at home." Exactly.
    - **LESSON:** "You're more than *one* sign." Chip: +1 MOM GETS IT.
    - **Tie-in:** Push / Pull / Align. **Last line:** "Now call your *mother*."
18. **`sxmomfaces`: "Why are there no photos?" · 45 s · cinematic · Ab**
    - **Beats:** Mom is horrified: "how do you know they're CUTE?" The stars show a blind mystery card, then a talk card, then the face, last. Mom remembers meeting Dad: "I heard his laugh across the room before I saw him."
    - **LESSON:** "Fall for the *person* first." Chip: +1 FAMILY APPROVED.
    - **Tie-in:** blind mystery cards. **Last line:** "Card first. *Face* last."
19. **`sxmomtalk`: "What's a talk card?" · 45 s · pop · Bb**
    - **Beats:** The stars explain that both of you answer and neither sees until you both do. Mom tries one with the star narrator, and her answer is so sweet that the stars cry. Pisces cries the hardest.
    - **LESSON:** "Good questions | beat good *lines*." Chip: +1 DEEP TALK.
    - **Tie-in:** talk cards. **Last line:** "Mom *wins* again."

## Show 6: SIGN × SIGN (a field guide, 3 × 45 s)
A nature-guide-meets-survival-manual look: a pixel notebook, sketched diagrams, and three numbered TIPS that slam in. A Push / Pull / Align meter wobbles throughout and settles at the end. Each episode is warm about both signs. The show bug reads "SIGN × SIGN".

20. **`sxsignscolib`: "Scorpio × Libra: A Survival Guide." · 45 s · screwed · Dm**
    - **Beats:** Scorpio wants intensity and Libra wants harmony. Tip 1: Libra, say what you actually think. Tip 2: Scorpio, not everything is a test. Tip 3 is twisted: let them pick the restaurant (it will take forty minutes).
    - **LESSON:** "Depth and balance | make a great *pair*." Chip: +1 FIELD-TESTED.
    - **Tie-in:** Push / Pull / Align. **Last line:** "*Survived*. Thrived, even."
21. **`sxsignaricap`: "Aries × Cancer: A Survival Guide." · 45 s · chiptune · Gm**
    - **Note:** this is a different pair from Orbit's Ember and Tide, so use generic sign stars, not those characters.
    - **Beats:** Speed meets softness. Tip 1: Aries, slow your roll. Tip 2: Cancer, say when you need a minute. Tip 3, twisted: cook together (only one of you is allowed near the stove).
    - **LESSON:** "Fast hearts and soft hearts | *can* sync up." Chip: +1 PACE YOURSELF.
    - **Tie-in:** talk cards. **Last line:** "Gentle *fire*."
22. **`sxsignvirsag`: "Virgo × Sagittarius: A Survival Guide." · 45 s · house · A**
    - **Beats:** Planner meets free spirit. Tip 1: Virgo, leave one blank square in the calendar. Tip 2: Sagittarius, text back when you land. Tip 3, twisted: plan a spontaneous trip (Virgo color-codes the spontaneity).
    - **LESSON:** "Structure and adventure | make a great *road trip*." Chip: +1 PACKED SNACKS.
    - **Tie-in:** Push / Pull / Align. **Last line:** "Bon *voyage*."

## Show 7: FIRST-DATE FIELD GUIDE (one per element, 4 × 30 s)
A pixel trail map with a backpack star guide. Each episode covers where to go, what to talk about and what to skip, for dating a sign of that element. It's practical and save-worthy. The show bug reads "FIELD GUIDE".

23. **`sxfieldfire`: "Dating a Fire Sign." · 30 s · funk · E**
    - **Content:** Go somewhere with energy, like a night market or a dance class. Talk dreams. Skip the slow, silent movie.
    - **Last line:** "Bring a *spark*."
24. **`sxfieldearth`: "Dating an Earth Sign." · 30 s · lofi · F**
    - **Content:** A cozy dinner or a farmers market. Talk plans and favorite comforts. Skip being late.
    - **Last line:** "Show *up*. On time."
25. **`sxfieldair`: "Dating an Air Sign." · 30 s · synthwave · G**
    - **Content:** A bookstore crawl or a trivia night. Talk ideas. Skip the small talk; ask a weird question.
    - **Last line:** "Ask the *weird* question."
26. **`sxfieldwater`: "Dating a Water Sign." · 30 s · dreamy · Db**
    - **Content:** A quiet café or a stargazing walk. Talk feelings. Skip rushing them.
    - **Last line:** "Go *deep*. Gently."

## Show 8: SEASONAL SKY (3 × 30 s)
A seasonal "forecast" for love, from a pixel desk with a big wheel. It's timely: we're in Scorpio season now. Use no exact dates; just say "Scorpio season". Use standard sign traits only. The show bug reads "SEASONAL SKY".

27. **`sxseasonscorpio`: "Scorpio Season." · 30 s · screwed · Cm**
    - **Content:** Intense, private, all-or-nothing vibes. Advice: let it get deep, not dark. The sight gag: everything turns moody purple, even the coffee.
    - **Last line:** "Go *deep*. Not dark."
28. **`sxseasonsag`: "Sagittarius Season." · 30 s · pop · A**
    - **Content:** Adventure, honesty, saying yes. Advice: try a new kind of date. The sight gag: the stars pack suitcases for a first date across town.
    - **Last line:** "Say *yes* to something new."
29. **`sxseasoncap`: "Capricorn Season." · 30 s · jazzy · Eb**
    - **Content:** Cozy, steady, serious about what matters. Advice: show up consistently. The sight gag: a calendar with every Friday circled.
    - **Last line:** "*Consistency* is cute."

## Show 9: FRIENDS & SELF-LOVE (not every story is romance, 3 × 45 s)
The show bug reads "FRIENDS & SELF-LOVE".

30. **`sxfriendhype`: "The Hype Friend." · 45 s · house · F**
    - **Beats:** A star goes on a date; the best friend (a Leo) runs a pre-date hype session with pom-poms, a mirror pep talk and a fake award ceremony. The date goes so-so, but the friend is still there after with snacks.
    - **LESSON:** "The friend who *hypes you* | is a love story too." Chip: +1 BESTIE.
    - **Tie-in:** tonight's deck. **Last line:** "Text your *bestie*."
31. **`sxfriendmirror`: "Your Own Biggest Fan." · 45 s · lofi · Am**
    - **Not the same as solo dating** (stsolodate covers that). This one is about the voice in your head.
    - **Beats:** A star's inner critic is a tiny grumpy cloud that heckles every outfit and text. The stars hand the star a mic, and it starts talking back to the cloud with kindness. The cloud shrinks into a little puff and gets a hug.
    - **LESSON:** "Talk to yourself | like you'd talk to a *friend*." Chip: +1 SELF-RESPECT.
    - **Tie-in:** dealbreakers ("know what you deserve"). **Last line:** "You're *the* catch."
32. **`sxfriendafter`: "After the Breakup." · 45 s · cinematic · Bb**
    - **Beats:** A gentle recovery montage: blanket burrito day 1, a walk with friends day 5, laughing again day 20, new haircut energy day 40. The friends constellation stays with the star throughout. It ends with the star opening tonight's deck again, smiling.
    - **LESSON:** "Healing isn't a straight line. | It's a *constellation*." Chip: +1 GLOWING UP.
    - **Tie-in:** tonight's deck. **Last line:** "The sky's still *dealing*."

## Show 10: MYTH-BUSTERS (3 × 30 s)
A pixel lab: the stars in goggles test a sign myth with silly experiments, and a big stamp slams "BUSTED". It's affectionate to every sign. The show bug reads "STAR MYTH-BUSTERS".

33. **`sxmythgemini`: "Geminis are two-faced." · 30 s · chiptune · Bb**
    - **Content:** The experiment shows a Gemini isn't two-faced, just has two hundred interests. BUSTED.
    - **Last line:** "Two *hundred* faces. All curious."
34. **`sxmythsun`: "Your sun sign is the whole story." · 30 s · synthwave · D**
    - **Content:** The stars pull a sun sign out of a chart, and the chart has a moon, a rising and a Venus too. BUSTED. Tie-in: Push / Pull / Align reads both whole charts.
    - **Last line:** "Read the *whole* sky."
35. **`sxmythscorpio`: "Scorpios are scary." · 30 s · funk · Gm**
    - **Content:** A spooky build-up (it is Halloween) reveals the Scorpio star knitting a sweater for you. Intense means loyal. BUSTED.
    - **Last line:** "Scary *loyal*."

## Show 11: NEIGHBORHOOD STARS (Houston, 3 × 30 s)
Each Houston neighborhood gets its own star personality, drawn over a pixel skyline of that part of town.
- Use real neighborhood names and generic local texture: streets, the weather, the vibe, food as a category ("tacos", "crawfish", never a business).
- **Taken:** Montrose and the Heights (st4 films).
- Use the default CTA.
- The show bug reads "NEIGHBORHOOD STARS".

36. **`sxhoodmidtown`: "Midtown." · 30 s · house · C**
    - **Vibe:** The social-butterfly star, out every night, with forty friends at brunch. Advice: Midtown star, put the phone down for one person.
    - **Last line:** "One person. *Full* attention."
37. **`sxhoodeado`: "EaDo." · 30 s · funk · Dm**
    - **Vibe:** East Downtown's creative star, with murals, lofts and a stadium-light glow. No real teams. Advice: let someone see your unfinished art.
    - **Last line:** "Show them the *sketch*."
38. **`sxhoodthirdward`: "Third Ward." · 30 s · jazzy · F**
    - **Vibe:** A warm, rooted, community star, with porches, history and music drifting from somewhere. It's respectful and affectionate. Advice: bring someone home to your people early.
    - **Last line:** "Meet the *porch*."

## Show 12: COUNTDOWN (3 × 20 s)
A big pixel number fills the frame and the stars get ready for… the deal.
- Don't state a real date or claim a launch date. It's a countdown "to your first deal".
- The show bug reads "COUNTDOWN".

39. **`sxcount3`: "3." · 20 s · chiptune · G**
    - **Gag:** The stars stretch and do warm-ups. "Three sleeps till your first deal."
    - **Last line:** "*Stretch* your heart."
40. **`sxcount2`: "2." · 20 s · pop · E**
    - **Gag:** The stars shuffle the deck nervously, and cards fly everywhere. "Two sleeps."
    - **Last line:** "Butterflies are *normal*."
41. **`sxcount1`: "1." · 20 s · cinematic · C**
    - **Gag:** All twelve stars line up and hold hands. "One sleep." The deck glows.
    - **Last line:** "See you at the *deal*."

## Show 13: BETA DIARIES (3 × 45 s)
A diary-cam: a fictional star, a Taurus with a little notebook, films daily confessionals in Align's beta. Use handheld wobble and a "DAY n" title. Show only real features. The show bug reads "BETA DIARIES".

42. **`sxdiary1`: "Day 1: What's my birth time?" · 45 s · lofi · D**
    - **Beats:** Onboarding asks for a birth time. Taurus doesn't know it, calls Mom (a phone with a silhouette), Mom digs out the baby book, and it's found. Typing in the birth details, the chart lights up.
    - **LESSON:** "Know where you *came from*. | Literally." Chip: +1 CALLED MOM.
    - **Tie-in:** blind mystery cards (the card charges with light). **Last line:** "Day one: *done*."
43. **`sxdiary2`: "Day 2: My first blind card." · 45 s · dreamy · Ab**
    - **Beats:** Tonight's deck deals a veiled card. Taurus overthinks it in confessional. Gag: three outfit changes for reading a card at home. It reads the card and loves the answer about Sunday mornings.
    - **LESSON:** "Let them in | before you *look*." Chip: +1 BRAVE BULL.
    - **Tie-in:** tonight's deck. **Last line:** "Card first. *Face* last."
44. **`sxdiary3`: "Day 3: We matched answers." · 45 s · synthwave · Bb**
    - **Beats:** A talk card: "what's a small thing that makes your day?" Taurus answers "fresh bread". Both answers reveal together, and the other person wrote "fresh bread" too. Confessional meltdown of joy, and Pisces cries happy tears.
    - **LESSON:** "Small things | are *big* things." Chip: +1 CARB-COMPATIBLE.
    - **Tie-in:** talk cards. **Last line:** "Day three: *butter* believe it."

---

## Agent groups (14 agents)
| Group | Films |
| --- | --- |
| A | sxorbit1, sxorbit2, sxorbit3 |
| B | sxorbit4, sxorbit5, sxorbit6 |
| C | sxmail1, sxmail2, sxmail3, sxmail4 |
| D | sxrecapbowl, sxrecapcook, sxrecapgolf |
| E | sxdebatetext, sxdebatebill, sxdebatephone |
| F | sxmomchart, sxmomfaces, sxmomtalk |
| G | sxsignscolib, sxsignaricap, sxsignvirsag |
| H | sxfieldfire, sxfieldearth, sxfieldair, sxfieldwater |
| I | sxseasonscorpio, sxseasonsag, sxseasoncap |
| J | sxfriendhype, sxfriendmirror, sxfriendafter |
| K | sxmythgemini, sxmythsun, sxmythscorpio |
| L | sxhoodmidtown, sxhoodeado, sxhoodthirdward |
| M | sxcount3, sxcount2, sxcount1 |
| N | sxdiary1, sxdiary2, sxdiary3 |

Group B: before drawing Ember, Tide or Streak, check whether `promo/films/sxorbit1/` is committed (`git log --oneline -- promo/films/sxorbit1`). If it is, read its scenes and match its character drawing; if not, follow the cast spec above and start with the beats.
