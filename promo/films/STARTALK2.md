# Star Talk, season 2: longer, funnier stories, each with a lesson (vertical, 45 to 60 s)

The user asked for this season with: "Longer one more fun stories and lessons".

The season keeps the Star Talk look: the chubby five-pointed pixel stars, the RPG text box, the nebula, the card motif and the shared end card. It is built on promo/films/startalk.js. Read **promo/films/STARTALK.md** for the look, tone and contract, and use promo/films/starmercury and promo/films/starvenus as working references.

What is new this season:

- **Stories, not advice.** Every film has a setup, an escalation, a turn and a payoff. The stars are characters with feelings, history and opinions about *you*, and the jokes come from the situation.
- **Recurring cast.**
  - **YOUR STAR:** the viewer's sun-sign star. It is earnest and a little needy.
  - **AUNTIE ♋ CANCER and AUNTIE ♉ TAURUS:** they wear tiny pixel reading glasses.
  - **THE BOOTH:** ♊ Gemini and ♐ Sagittarius, opposite signs who share one mic and wear headsets.
  - **♍ VIRGO:** the director and planner, with a clipboard.
  - **♓ PISCES:** always in the background, always crying happy tears. This is the running gag.
  - **THE STARS:** the gold narrator, using `STAR.sky`.
  - Props are small pixel drawings on canvas: a crown, glasses, headsets, a clipboard, a beret, a whistle, a tumbleweed, a doily, folding chairs. Make the props shared helpers *inside your own film folder*. Don't edit startalk.js except to fix a real bug, and say so if you do.
- **The LESSON beat is the signature.** Near the end of each film, after the payoff, a retro game banner pops in, styled like an achievement or level-up:
  - It reads **"★ LESSON UNLOCKED"**, in Space Mono, gold, with a pixel border, a chiptune "level-up" arpeggio in the film's key, and a sparkle burst.
  - Below it is the lesson itself in Inter 800, with one EB Garamond italic accent, held for at least 2.5 s.
  - The lesson must be genuinely good relationship advice (healthy, warm, not preachy) and must follow from the story.
  - The lesson comes before the Align tie-in. The tie-in then shows how the app helps you live the lesson, using real features only: "Card first. Face last.", talk cards (answers stay hidden until both of you play), Push / Pull / Align (Push is where you'll rub, Pull is what draws you in, Align is where it holds), dealbreakers (picked at signup and stamped on your card), and tonight's deck (dealt every night).
- **More fun.**
  - Use more characters on screen, more physical comedy (squash, hops, double-takes, faints, eye-rolls) and visual gags.
  - Use comic timing: a pause before the punchline, and silence used as a joke.
  - Use more SFX hits from the cues: a whoosh, a pop, a record scratch, a womp, crickets (a chiptune chirp), a drumroll (a snare roll), cheers (a noise swell). Only use SFX the sound engine supports or can synthesize. Check promo/scripts/teaser-sound.mjs for the available cue types and pitched SFX.
- **Pacing.**
  - Dialogue lines are at most about 46 characters, with 1.5 s or more of readable hold after typing finishes.
  - A Inter 800 headline sits at the top of each beat.
  - Every 2 to 4 s something changes: a new line, a reaction, a prop or a camera push.
  - There is a card cut roughly every 12 to 15 s, using the default `cardCuts` selection.
- **End card:** the shared endcard.js with the default CTA. Never say "Align" in the 2 s before the end card.
- **Truth:** no invented statistics, and only standard astrology (rulers, elements, the 5th house, the Saturn return at about 27 to 30, Mercury retrograde). No real app, brand or person names.

## The five

### 1. `stmetfirst`: "Our Stars Met First" (45 s, music: jazzy)
- **0–3 s:** two stars face each other awkwardly, like parents meeting at a wedding. The headline reads **"Before you meet, your *stars* do."** ♐ SAG STAR: "So. Your human and my human, huh?"
- **3–9 s:** excruciating silence, with a cricket chirp. The ♌ LEO STAR (crooked crown) straightens its crown, and both look away at the same moment. LEO: "…nice weather. In space." SAG: "Very. Spacious."
- **9–15 s:** small talk gets worse. LEO: "So what does your human do?" SAG: "Something with spreadsheets." They both droop. Pisces sobs in the back because it's so awkward.
- **15–21 s:** Sag squints at Leo's glyph badge, then gasps, with a record scratch. SAG: "Wait. You're FIRE?" LEO: "YOU'RE FIRE??"
- **21–28 s:** instant best friends. They hop in sync, do a pixel secret handshake with their points, and a gold trine line snaps between them. Both stars are fire signs, so they form a trine. SAG: "Our humans are gonna get along SO well."
- **28–34 s:** two phones below show veiled mystery cards, with the sign badge glowing and the face hidden. The headline reads **"Card first. Face last."** LEO: "They haven't seen each other yet." SAG: "Don't. Spoil. The face."
- **34–39 s:** LESSON UNLOCKED: **"The spark isn't the face. It's what you *share*."**
- **39–40.6 s:** a padlock pops between them as both stars turn innocent. Last line: **"Our lips are sealed. (We don't have lips.)"**
- **40.6 s:** end card.

### 2. `stlive5th`: "Live from Your 5th House" (60 s, music: funk)
- **0–4 s:** a red pixel "● LIVE" bug and a little CRT TV float in the nebula. ♊ GEMINI and ♐ SAG wear headsets and share one mic. The headline reads **"The stars are watching your *date*."** GEMINI: "AND WE'RE LIVE from your 5th house!" (In astrology the 5th house is romance and fun.)
- **4–10 s:** on the CRT, two pixel people sit at a café table. GEMINI: "First date, folks! Window table!" SAG: "She's been stirring that tea a while."
- **10–16 s:** a speech bubble on screen says "so… what do you do?" Both booth stars freeze mid-bob. SAG: "Oh no. Small talk." GEMINI: "We're losing them, folks."
- **16–21 s:** dead air. A tumbleweed rolls across the café table and crickets chirp. The booth slowly turns to look at each other. Pisces starts crying early, just in case.
- **21–27 s:** an instant replay ("REPLAY" with VHS lines) of the person checking their phone under the table. SAG, deadpan: "Phone check. Under the table. Brutal."
- **27–34 s:** a talk card slides onto the table: **"What's a hill you'll die on?"** Both people play it, and the answers land face-down. GEMINI: "A TALK CARD!" Then: "Answers stay hidden till you both play!"
- **34–40 s:** the booth presses its faces to the CRT glass, with a drumroll. Both answers flip to **"Pineapple belongs on pizza."** ✓ ✓. SAG: "…they said the same thing."
- **40–46 s:** the booth erupts: confetti, the headsets fly off, and on screen the two people are laughing. GEMINI: "THEY'RE LAUGHING. ACTUALLY LAUGHING." Pisces wails happily.
- **46–51 s:** LESSON UNLOCKED: **"Skip the résumé. Ask what they'd *defend*."**
- **51–55.6 s:** Gemini dabs its eyes and Pisces blows its nose loudly. Last line: **"We'll be right back. We need a minute."**
- **55.6 s:** end card.

### 3. `staunties`: "The Auntie Council" (60 s, music: cinematic or lofi, your call; make it warm)
- **0–4 s:** an extreme close-up of two stars in tiny pixel reading glasses, leaning in so close the glasses fog. The headline reads **"The stars have *questions*."** AUNTIE CANCER: "Still single? At your SATURN RETURN??" The Saturn return lands at about 27 to 30.
- **4–10 s:** they pull back onto a floating lace doily. CANCER: "We only ask because we love you." TAURUS: "And because we have a list."
- **10–17 s:** a scroll unrolls past the bottom of the frame. TAURUS: "Earth sign. Good family." Then: "Owns a crockpot."
- **17–23 s:** a chat bubble from "you" says: "I'm kind of talking to someone?" Both aunties snap their glasses down, wide-eyed. CANCER: "WHAT SIGN." TAURUS: "Birth time. Now."
- **23–28 s:** they pull up the reading, with two charts, and read it like a report card. CANCER: "Push: you both like being right." The aunties gasp, Pisces faints, and there's a womp.
- **28–34 s:** TAURUS fans itself with heart-eyes: "Pull: …that's a LOT of pull."
- **34–40 s:** CANCER squints, then softens: "Align: you laugh at the same things." There's a long pause, then one slow nod from both, and pixel tears.
- **40–46 s:** TAURUS: "Push isn't a dealbreaker, baby." CANCER: "Your uncle and I? All push. 40 years." (This is a story detail, not a statistic.)
- **46–51 s:** LESSON UNLOCKED: **"Nobody's perfect for you. Find who's *worth* the work."**
- **51–55.6 s:** Taurus is already planning dinner and pulls out a pixel crockpot. Last line: **"Bring them to dinner. We'll behave."**
- **55.6 s:** end card.

### 4. `stintervention`: "The Intervention" (60 s, music: house or pop)
- **0–4 s:** a circle of stars sits on tiny folding chairs under a hand-painted banner, **"WE LOVE YOU ♥"**. The centre chair is empty, because it's yours, and the camera pushes into it. ♑ CAPRICORN, with a whistle: "Sit down. This is about your 'type.'" The headline reads **"The sky staged an *intervention*."**
- **4–10 s:** ♍ VIRGO reads from a clipboard: "You said 'he's different.'" Then: "He was not different."
- **10–16 s:** ♏ SCORPIO slides over a pixel photo strip showing the same silhouette with four different haircuts. "Same person. Four haircuts."
- **16–22 s:** ♒ AQUARIUS has flat eyes, with a guitar case beside it: "The guy with the band. Again." Then a tiny guitar riff and a womp.
- **22–28 s:** ♌ LEO bursts into tears and hugs the empty chair: "WE JUST WANT YOU TO BE LOVED RIGHT."
- **28–34 s:** the turn. Capricorn hands "you" a glowing card. CAPRICORN: "Write down what you won't do again."
- **34–42 s:** dealbreaker chips stamp onto your card one at a time, with a stamp SFX on each: **"✕ NOT READY FOR A LABEL"**, **"✕ ONLY TEXTS AFTER 11PM"**, **"✕ 'I DON'T DO FEELINGS'"**. The circle nods at every stamp. The headline reads **"What ends it before it *starts*?"** CAPRICORN: "Now it's on your card. Day one."
- **42–47 s:** a group hug: five stars squash into one glowing pile. Pisces walks in late with snacks and immediately cries.
- **47–52 s:** LESSON UNLOCKED: **"If it keeps hurting, it's not your type. It's a *pattern*."**
- **52–55.6 s:** last line: **"New type: someone who's good to you."**
- **55.6 s:** end card.

### 5. `stwereup`: "We're up." (45 s, music: synthwave)
- **0–4 s:** the sky is dark and every star is asleep with zzz's. A phone glows: **2:07 AM, "u up?"** The headline reads **"2:07 AM."**
- **4–9 s:** the whole sky snaps awake at once, with wide eyes and a big chord hit. THE STARS: "we're up." Then: "we're stars. we're always up."
- **9–15 s:** "you" type "yeah" with three dots blinking. Every star leans in, then ♑ CAPRICORN blows a whistle and plays a record scratch: "Hold on. When did he text you last?"
- **15–22 s:** the phone scrolls back through his texts: "u up?" Tue 1:48 AM, "u up?" Sat 2:31 AM, "u up?" last month at 3:02 AM. The stars squint harder at each one. ♏ SCORPIO: "Ever heard from him at noon?"
- **22–28 s:** a pixel sun pops up and the phone goes silent, with crickets. Pisces cries. THE STARS: "someone who only shows up at night?" Pause. "babe. that's OUR job. not his."
- **28–34 s:** "you" delete "yeah" one letter at a time, and the stars cheer at each deleted letter. Tonight's deck deals in, the headline reads **"Tonight's deck."** and THE STARS say: "a new deck. every night. at a decent hour."
- **34–39 s:** LESSON UNLOCKED: **"Date someone who shows up in *daylight*."**
- **39–40.6 s:** the stars yawn and go back to sleep, and one opens an eye. Last line: **"Now go to bed. We've got this shift."**
- **40.6 s:** end card.

## Contract (per film agent)
- **Edit only your own folder** (promo/films/<name>/). The starhello owner wrote startalk.js; fix a real bug there only if you must, and report it.
- **Start from the starvenus or starmercury structure.** The music goes in cues.js with sections (drop, breakdown, lift, `outroAt: DURATION - 4.4`, hits). Use the end card from endcard.js and the cuts from cardfx.js. Everything must be a pure function of t, and there must be no `document` access at module top level.
- **Loop:** build, then render contact sheets (`node promo/scripts/render.mjs --film=<name> --vertical --sheet --rate=4 --dir=<fresh tmp dir>`), then look at them critically, then fix. Repeat until it's genuinely funny, readable and polished.
  - Check that no text overflows its box or the frame edges.
  - Check that no line is cut off before it has been readable.
  - Check that props read clearly at a glance.
  - Check that the LESSON banner looks great.
- **Required checks before committing:**
  - The sound build runs: `node promo/scripts/teaser-sound.mjs --film=<name>`.
  - Card coverage passes: `node /tmp/claude-0/cardfx/cover.mjs <name> <kept cut times>`.
- **Keep renders lean.** Do not render the final mp4; I'll do that. Delete your tmp dirs when done.
- **Commit only your files.** Run `git pull --rebase --autostash` first. If that fails, commit first, then run `git fetch && git rebase --autostash origin/claude/align-promo-video`. Then push to claude/align-promo-video. Commit messages end with:
  ```
  Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
  Claude-Session: https://claude.ai/code/session_011q84hoGAFybJgojtyW8xw2
  ```
- **Report back:** the film length, the final sheet path(s), and anything you changed from this brief and why.
