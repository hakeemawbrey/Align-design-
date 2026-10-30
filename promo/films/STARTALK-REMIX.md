# Star Talk Remix: the 92 pre–Star Talk concepts, retold by the stars (vertical, 20–60 s)

The user's words: "ok now all these 93 concepts lets make star talk versions from with the cute stars guiding you through this all."

The 93 videos in the film archive (https://claude.ai/artifact/DukMG6Gz1rf8dbPFuENYDb) are every promo, teaser and ad made before Star Talk. This batch remakes each one as a **Star Talk film**: the same idea, hook and Align feature, but now the pixel stars with eyes are on screen and *guide you through it*, talking to you in the RPG dialogue box. The launch promo's landscape and vertical cuts are one concept, so there are **92 films**.

## Read first
- **promo/films/STARTALK.md:** the look, the tone, the cast, `startalk.js`.
- **promo/films/STARTALK4.md:** **every rule in it applies here** (shared-machine tools, slot.sh, commit.sh, the queue, the checks, the truth rules, "make it funny"), except the parts about its own 25 films. Read its sections "The machine is shared", "Checks before you commit" and "Make it FUNNY" carefully.
- **The original you are remaking:** its folder (listed per film below) and its entry in the archive catalogue (title + blurb below). Read its cues.js / scenes to learn the hook, the joke, the feature it sells and its last line. Look at 3–4 stills of the original if it helps: `ffmpeg -ss <t> -i promo/out/<source> -frames:v 1 /tmp/claude-0/s3/<f>/orig-<t>.jpg` (sources are in /tmp/claude-0/pick.txt).
- **Reference Star Talk films** (built and rendered): short ones `starleo`, `starmercury`, `staries`; story ones `stlive5th`, `stmetfirst`, `staunties`, `stelevator`.

## What a remix is
- **Keep from the original:** the core idea, the hook line (adapted so a star can say it), the Align feature it sells (Card first. Face last., blind mystery cards, tonight's deck, talk cards, dealbreakers, Push / Pull / Align, the founding card, the vote) and the spirit of its last line. Local films keep their city and its real local jokes (neighbourhoods, roads, weather, food); no real brands, teams or businesses.
- **Add:** the stars. One or more sign-tinted stars (`signStar`) or THE STARS narrator act as **your guide**, talking to you ("babe, put the phone down."). They react, roast a little, hop, blush, cry (Pisces in the back), and walk you through the idea. Explainers become a star teaching you, with props and diagrams drawn in pixel cells. Loops become a tiny 20 s star moment built around the loop's image (the moon, the deck, the orbit…) with one line of advice.
- **Format by length:**
  - **20 s:** season 1 format (hook headline + sight gag, 1–3 box lines, the last line), then the end card.
  - **30 s:** a mini story with 3–5 box lines; a ★ LESSON UNLOCKED (`lesson.js`) is optional.
  - **45–60 s:** a full story with escalation and a ★ LESSON UNLOCKED (`lesson.js`), as in STARTALK4.md.
- **Lengths include the 4.4 s end card** (endcard.js default CTA). Card cuts from cardfx.js as usual (a cut every 12–15 s; a 20 s film may have one or none).
- Music: the style and key given below, so the batch sounds varied.

## Folders and temp dirs
- Your films are new folders `promo/films/<folder>/` (cues.js, scenes/index.js, scenes/props.js as needed). Never edit the originals.
- Temp files only in `/tmp/claude-0/s3/<folder>/`; delete them at the end.
- Commit each film when it's final: `/tmp/claude-0/commit.sh "Star Talk Remix: <title> (<len> s)" promo/films/<folder>`, then queue its render: `flock /tmp/claude-0/queue.lock sh -c 'echo "<folder> v1" >> /tmp/claude-0/queue.txt'`.
- **You build 3 films (sometimes 2 or 4).** Finish, check, commit and queue each one before starting the next, so work is never lost.
- **Disk is tight.** Use `--rate=4` for sheets and stills for spot checks; delete each film's sheet dir as soon as you've looked at it.

## The 92

### Group 1: The original films
- **`srlaunch`** · 30 s · synthwave · C — remix of **"What if the stars chose?"** (The original films; original 32 s, from promo/src/ + promo/film.html (the original launch film; see promo/README.md, promo/BRIEF.md)). Original: The launch reel: a birth date is typed, the sky is read, a deck is dealt. Dating, dealt by the stars.
- **`srflipit`** · 30 s · lofi · A — remix of **"Flip it"** (The original films; original 30 s, from promo/film2/ (scenes) + promo/film2.html). Original: We swipe on faces in half a second; the card flips to a blind one. Take a chance on the stars.
- **`srrigged`** · 20 s · funk · Fm — remix of **"Rigged"** (The original films; original 15 s, from promo/film3/ (scenes) + promo/film3.html). Original: Hidden scores rank the faces, the machine shatters into stars, and everyone is dealt blind.

### Group 2: Teasers
- **`sr10faith`** · 20 s · cinematic · F — remix of **"Put your faith in the stars"** (Teasers; original 14 s, from promo/teasers/ (t01-blind.js style files, README.md); rendered teasers/10-faith-share.mp4). Original: The manifesto: we hide the faces, we read the sky, you bring the courage.
- **`sr01blind`** · 20 s · dreamy · D — remix of **"Blind by design"** (Teasers; original 11 s, from promo/teasers/ (t01-blind.js style files, README.md); rendered teasers/01-blind-share.mp4). Original: No faces. Just faith. Veiled mystery cards fly out of the dark.
- **`sr07aura`** · 20 s · pop · Dm — remix of **"What color is your aura?"** (Teasers; original 12 s, from promo/teasers/ (t01-blind.js style files, README.md); rendered teasers/07-aura-share.mp4). Original: Aura-camera portraits drop like Polaroids and sweep the spectrum: your aura says what your bio won't.

### Group 3: Teasers
- **`sr04charcard`** · 20 s · chiptune · Bb — remix of **"You were born a card"** (Teasers; original 12 s, from promo/teasers/ (t01-blind.js style files, README.md); rendered teasers/04-chart-card-share.mp4). Original: Birth details type in, a sign card charges with light and flips to Taurus.
- **`sr03moon`** · 20 s · house · G — remix of **"Tonight's moon"** (Teasers; original 12 s, from promo/teasers/ (t01-blind.js style files, README.md); rendered teasers/03-moon-share.mp4). Original: A huge moon waxes through the frame: tonight's moon has notes for you.
- **`sr06newdeck`** · 20 s · jazzy · Gm — remix of **"A new deck every night"** (Teasers; original 12 s, from promo/teasers/ (t01-blind.js style files, README.md); rendered teasers/06-new-deck-share.mp4). Original: Night falls and the deck is cut, riffled and dealt: every night, the stars deal again.

### Group 4: Teasers
- **`sr05talkcards`** · 20 s · screwed · E — remix of **"Talk in cards"** (Teasers; original 13 s, from promo/teasers/ (t01-blind.js style files, README.md); rendered teasers/05-talk-cards-share.mp4). Original: A tarot hand fans open; both answer, and neither sees until you both do.
- **`sr09sparkrubalign`** · 20 s · synthwave · Eb — remix of **"Spark · Rub · Align"** (Teasers; original 13 s, from promo/teasers/ (t01-blind.js style files, README.md); rendered teasers/09-spark-rub-align-share.mp4). Original: Two sign auras orbit each other: some spark, some rub, some align.
- **`sr02aligned`** · 20 s · lofi · Cm — remix of **"The stars aligned"** (Teasers; original 13 s, from promo/teasers/ (t01-blind.js style files, README.md); rendered teasers/02-aligned-share.mp4). Original: Seven chakra stars glide into one line and lock; when it's right, the stars line up.
- **`sr08houston`** · 20 s · funk · C — remix of **"Houston, the stars are dealing"** (Teasers; original 13 s, from promo/teasers/ (t01-blind.js style files, README.md); rendered teasers/08-houston-share.mp4). Original: Stars light up over a drawn Houston skyline, then a numbered gold founding card stamps in.

### Group 5: Loops
- **`srl01chakra`** · 20 s · cinematic · A — remix of **"Chakra"** (Loops; original 8 s, from promo/teasers/ (t01-blind.js style files, README.md); rendered teasers/L01-chakra-share.mp4). Original: A radial spectrum ring pulses around the seed-of-life mark as the chakra column flares each bar.
- **`srl02moon`** · 20 s · dreamy · Fm — remix of **"Moon"** (Loops; original 8 s, from promo/teasers/ (t01-blind.js style files, README.md); rendered teasers/L02-moon-share.mp4). Original: The moon runs full to new to full once per loop, with phase glyphs orbiting it.
- **`srl03aura`** · 20 s · pop · F — remix of **"Aura"** (Loops; original 8 s, from promo/teasers/ (t01-blind.js style files, README.md); rendered teasers/L03-aura-share.mp4). Original: A breathing aura portrait sweeps the whole colour spectrum, one sign's veil per second.

### Group 6: Loops
- **`srl04deck`** · 20 s · chiptune · D — remix of **"Deck"** (Loops; original 8 s, from promo/teasers/ (t01-blind.js style files, README.md); rendered teasers/L04-deck-share.mp4). Original: An endless 3D carousel of veiled mystery cards, stepping one card every two beats.
- **`srl05zodiac`** · 20 s · house · Dm — remix of **"Zodiac"** (Loops; original 8 s, from promo/teasers/ (t01-blind.js style files, README.md); rendered teasers/L05-zodiac-share.mp4). Original: The 12-sign wheel glides a quarter turn into each bar, spectrum bars pulsing between glyphs.
- **`srl06constellation`** · 20 s · jazzy · Bb — remix of **"Constellation"** (Loops; original 8 s, from promo/teasers/ (t01-blind.js style files, README.md); rendered teasers/L06-constellation-share.mp4). Original: A turning network of aura-portrait stars, with lines drawing between them on the beat.

### Group 7: Loops
- **`srl07orbit`** · 20 s · screwed · G — remix of **"Orbit"** (Loops; original 8 s, from promo/teasers/ (t01-blind.js style files, README.md); rendered teasers/L07-orbit-share.mp4). Original: Taurus and Libra orbs dance a binary orbit and line up once per loop.
- **`srl08hyperspace`** · 20 s · synthwave · Gm — remix of **"Hyperspace"** (Loops; original 8 s, from promo/teasers/ (t01-blind.js style files, README.md); rendered teasers/L08-hyperspace-share.mp4). Original: A pixel-star tunnel surges on the kick while cards and moons fly past.
- **`srl09talk`** · 20 s · lofi · E — remix of **"Talk"** (Loops; original 8 s, from promo/teasers/ (t01-blind.js style files, README.md); rendered teasers/L09-talk-share.mp4). Original: Tarot talk cards drift on a slow 3D spiral, one question per bar.

### Group 8: Loops
- **`srl10faith`** · 20 s · funk · Eb — remix of **"Faith"** (Loops; original 8 s, from promo/teasers/ (t01-blind.js style files, README.md); rendered teasers/L10-faith-share.mp4). Original: "Put your faith in the stars." breathes with the music under a waxing moon.
- **`srp1mystery`** · 20 s · cinematic · Cm — remix of **"The stars give you a chance"** (Loops; original 10 s, from promo/teasers/ (t01-blind.js style files, README.md); rendered teasers/P1-mystery-share.mp4). Original: Juniper's mystery card floats in the nebula as the chakra stars glide into the column.
- **`srp2constellation`** · 20 s · dreamy · C — remix of **"Dating, dealt by the stars"** (Loops; original 10 s, from promo/teasers/ (t01-blind.js style files, README.md); rendered teasers/P2-constellation-share.mp4). Original: An aurora sky with a slow wave of lines linking a ring of aura portraits.
- **`srp3faith`** · 20 s · pop · A — remix of **"Put your faith in the stars"** (Loops; original 10 s, from promo/teasers/ (t01-blind.js style files, README.md); rendered teasers/P3-faith-share.mp4). Original: The opening nebula of the first film on a slow camera circle, with one shooting star.

### Group 9: Feature films
- **`srlonely`** · 30 s · chiptune · Fm — remix of **"Never more connected"** (Feature films; original 30 s, from promo/films/lonely/ (cues.js + scenes/)). Original: 2 a.m. phone glow, matches with no conversations; the answer is talking in cards. You deserve to be known.
- **`srsamesky`** · 30 s · house · F — remix of **"Same moon. Never met."** (Feature films; original 30 s, from promo/films/samesky/ (cues.js + scenes/)). Original: Two people, two lit windows in the same city, each alone, until Align reads both charts. Look up.
- **`srghosted`** · 30 s · jazzy · D — remix of **"Seen. 3 days ago."** (Feature films; original 30 s, from promo/films/ghosted/ (cues.js + scenes/)). Original: Ghosting and endless swipe stacks, answered by a deck dealt with care and dealbreakers first. Be chosen.
- **`srdisposable`** · 60 s · screwed · Dm — remix of **"We've made people disposable"** (Feature films; original 60 s, from promo/films/disposable/ (cues.js + scenes/)). Original: A slower 60-second cut of Ghosted: seen, ghosted, then a deck that takes its time. Be chosen.

### Group 10: Series 2: hooks
- **`srswipes`** · 20 s · synthwave · Bb — remix of **"312 swipes. 0 butterflies."** (Series 2: hooks; original 15 s, from promo/films/swipes/ (cues.js + scenes/)). Original: A thumb-blur of faces, then one small deck a night, dealt from the stars. Slow down. Look up.
- **`srphotos`** · 20 s · lofi · G — remix of **"Photos lie."** (Series 2: hooks; original 15 s, from promo/films/photos/ (cues.js + scenes/)). Original: Profile photos glitch through filters and angles; charts don't. Fall for the chart.
- **`srbios`** · 20 s · funk · Gm — remix of **"Everyone sounds the same."** (Series 2: hooks; original 15 s, from promo/films/bios/ (cues.js + scenes/)). Original: Generic bios pile up and blur into one; your sky doesn't. Your sky says more.

### Group 11: Series 2: hooks
- **`srhey`** · 20 s · cinematic · E — remix of **"Stuck on 'hey'."** (Series 2: hooks; original 15 s, from promo/films/hey/ (cues.js + scenes/)). Original: A chat loops "hey" faster and faster until a talk card asks a real question. Skip to the good part.
- **`srdealbreakers`** · 20 s · dreamy · Eb — remix of **"Three months in."** (Series 2: hooks; original 15 s, from promo/films/dealbreakers/ (cues.js + scenes/)). Original: A sweet chat, then the dealbreaker lands; on Align it's said on day one. What matters, first.
- **`srbirthtime`** · 20 s · pop · Cm — remix of **"The most honest thing about you"** (Series 2: hooks; original 15 s, from promo/films/birthtime/ (cues.js + scenes/)). Original: Only your birth data types out, then the sign card charges and flips. The sky already wrote you down.

### Group 12: Series 2: hooks
- **`srunrationed`** · 20 s · chiptune · C — remix of **"Paying to be seen?"** (Series 2: hooks; original 15 s, from promo/films/unrationed/ (cues.js + scenes/)). Original: Paywall tiers flicker, then the gold founding card stamps down: the stars, unrationed.
- **`srpattern`** · 30 s · house · A — remix of **"Same person, different name"** (Series 2: hooks; original 30 s, from promo/films/pattern/ (cues.js + scenes/)). Original: Same red flags, same ending; the Push / Pull / Align reading shows the fit before you fall.
- **`srbutterflies`** · 30 s · jazzy · Fm — remix of **"Remember butterflies?"** (Series 2: hooks; original 30 s, from promo/films/butterflies/ (cues.js + scenes/)). Original: A warm first-crush memory against numb swiping; not knowing is the best part. Bring back the butterflies.
- **`sreightbillion`** · 30 s · screwed · F — remix of **"8 billion people."** (Series 2: hooks; original 30 s, from promo/films/eightbillion/ (cues.js + scenes/)). Original: Pull back from one window to Earth to the stars: someone's sky lines up with yours.

### Group 13: Explainers
- **`srastro101`** · 60 s · synthwave · D — remix of **"Astrology in 60 seconds"** (Explainers; original 60 s, from promo/films/astro101/ (cues.js + scenes/)). Original: The zodiac road, the 12 signs, elements and planets, then your Big Three. Now you speak astrology.
- **`sralignment`** · 60 s · lofi · Dm — remix of **"Two charts walk into a date"** (Explainers; original 60 s, from promo/films/alignment/ (cues.js + scenes/)). Original: Two charts are stacked and their angles measured: 120° easy, 60° click, 90° spicy. Push. Pull. Align.
- **`srdummies`** · 60 s · funk · Bb — remix of **"Astrology for dummies"** (Explainers; original 60 s, from promo/films/dummies/ (cues.js + scenes/)). Original: Rapid-fire Q&A: your sign, birth time, Rising, retrograde, cusps. Congrats, you're not a dummy anymore.

### Group 14: Series 3: astrology explainers
- **`srelements`** · 20 s · cinematic · G — remix of **"The 4 elements in 15 seconds"** (Series 3: astrology explainers; original 15 s, from promo/films/elements/ (cues.js + scenes/)). Original: Fire goes, earth builds, air talks, water feels. Which one are you?
- **`srmodalities`** · 20 s · dreamy · Gm — remix of **"Starters, keepers, changers"** (Series 3: astrology explainers; original 15 s, from promo/films/modalities/ (cues.js + scenes/)). Original: Cardinal starts it, fixed keeps it going, mutable switches it up. Every team needs all three.
- **`srmoonphases`** · 20 s · pop · E — remix of **"New Moon vs Full Moon"** (Series 3: astrology explainers; original 15 s, from promo/films/moonphases/ (cues.js + scenes/)). Original: New Moon: plant the seed. Full Moon: see what grew. Look up tonight.

### Group 15: Series 3: astrology explainers
- **`sropposites`** · 20 s · chiptune · Eb — remix of **"Meet your opposite sign"** (Series 3: astrology explainers; original 15 s, from promo/films/opposites/ (cues.js + scenes/)). Original: A seesaw swaps the six opposite pairs, then a coin flips Taurus to Scorpio. Opposites attract. Sometimes.
- **`srhouses`** · 30 s · house · Cm — remix of **"The 12 houses, explained"** (Series 3: astrology explainers; original 30 s, from promo/films/houses/ (cues.js + scenes/)). Original: An apartment building with 12 rooms lights up one by one, from YOU to REST & SECRETS. Welcome home.
- **`srvenus`** · 30 s · jazzy · C — remix of **"Your Venus sign = how you love"** (Series 3: astrology explainers; original 30 s, from promo/films/venus/ (cues.js + scenes/)). Original: Four love styles by element, and why Venus never strays far from the Sun. Go look up your Venus.

### Group 16: Series 3: astrology explainers
- **`srplanets`** · 30 s · screwed · A — remix of **"Every planet in 30 seconds"** (Series 3: astrology explainers; original 30 s, from promo/films/planets/ (cues.js + scenes/)). Original: Sun to Pluto fly in, each with a one-liner and a tiny gag. Ten planets. One you.
- **`srsaturnreturn`** · 45 s · synthwave · Fm — remix of **"What's a Saturn return?"** (Series 3: astrology explainers; original 45 s, from promo/films/saturnreturn/ (cues.js + scenes/)). Original: Saturn takes about 29½ years to come back round: big decisions, growing up. It's not mean, it's thorough.
- **`srorigins`** · 45 s · lofi · F — remix of **"Where did the zodiac come from?"** (Series 3: astrology explainers; original 45 s, from promo/films/origins/ (cues.js + scenes/)). Original: Babylonian sky-watchers, the Greek "circle of little animals", and Earth's wobble. Old sky. New you.
- **`srtwelvesigns`** · 60 s · funk · D — remix of **"All 12 signs in 60 seconds"** (Series 3: astrology explainers; original 60 s, from promo/films/twelvesigns/ (cues.js + scenes/)). Original: Twelve colour-wash scenes, one quip per sign, from Aries' starting pistol to Pisces' fish. Tag your sign.

### Group 17: Houston
- **`srhtxproblem`** · 20 s · cinematic · Dm — remix of **"Houston, we have a problem"** (Houston; original 15 s, from promo/films/htxproblem/ (cues.js + scenes/)). Original: Mission Control flags your dating life; the chart comes first. Houston, we have a solution.
- **`srhtxhumidity`** · 20 s · dreamy · Bb — remix of **"Houston humidity"** (Houston; original 15 s, from promo/films/htxhumidity/ (cues.js + scenes/)). Original: Frizz explodes, then a mystery card replaces the photo. Fall for the chart, not the hair.
- **`srhtxtraffic`** · 20 s · pop · G — remix of **"An hour on the Katy Freeway…"** (Houston; original 15 s, from promo/films/htxtraffic/ (cues.js + scenes/)). Original: …for a date who just says "hey". Dealbreakers and a talk card fix it. Know before you drive.

### Group 18: Houston
- **`srhtxspacecity`** · 30 s · chiptune · Gm — remix of **"They call it Space City"** (Houston; original 30 s, from promo/films/htxspacecity/ (cues.js + scenes/)). Original: So why does dating here feel Earth-bound? Two charts lock and a deck deals. Mission: find your person.
- **`srhtxloops`** · 30 s · house · E — remix of **"Inside the Loop"** (Houston; original 30 s, from promo/films/htxloops/ (cues.js + scenes/)). Original: The 610, Beltway 8 and Grand Parkway rings spin into a zodiac wheel; someone's sky lines up with yours.
- **`srhtxstars`** · 45 s · jazzy · Eb — remix of **"You can barely see the stars"** (Houston; original 45 s, from promo/films/htxstars/ (cues.js + scenes/)). Original: City haze clears into your birth chart and a tour of Align's features. The stars are still up there.

### Group 19: Houston
- **`srhtxtaste`** · 20 s · screwed · Cm — remix of **"Houston has taste"** (Houston; original 15 s, from promo/films/htxtaste/ (cues.js + scenes/)). Original: Tacos, kolaches, crawfish, then two charts snap together. Have good taste in people.
- **`srhtxrodeo`** · 20 s · synthwave · C — remix of **"Rodeo season"** (Houston; original 15 s, from promo/films/htxrodeo/ (cues.js + scenes/)). Original: Suddenly everyone's a cowboy; the hats fly off and a mystery card lands. Find the real thing.
- **`srhtxbayou`** · 20 s · lofi · A — remix of **"Sunset walk on Buffalo Bayou"** (Houston; original 15 s, from promo/films/htxbayou/ (cues.js + scenes/)). Original: A perfect date walk, alone, until tonight's deck deals in. Your walk partner is out there.

### Group 20: Houston
- **`srhtxbrunch`** · 30 s · funk · Fm — remix of **"Another Midtown brunch"** (Houston; original 30 s, from promo/films/htxbrunch/ (cues.js + scenes/)). Original: "Just seeing where it goes" meets dealbreakers that come first. Brunch with intention.
- **`srhtxsprawl`** · 30 s · cinematic · F — remix of **"Houston is huge"** (Houston; original 30 s, from promo/films/htxsprawl/ (cues.js + scenes/)). Original: The map sprawls endlessly, then city lights become two charts joined by a gold arc.
- **`srhtxweather`** · 20 s · dreamy · D — remix of **"Sunny, pouring, sunny again"** (Houston; original 15 s, from promo/films/htxweather/ (cues.js + scenes/)). Original: Houston weather sends mixed signals; Push / Pull / Align doesn't. Read the signs.

### Group 21: Houston
- **`srhtxeta`** · 20 s · pop · Dm — remix of **""10 minutes away.""** (Houston; original 15 s, from promo/films/htxeta/ (cues.js + scenes/)). Original: Houston minutes tick by until a talk card flips in. Talk like you mean it.
- **`srhtxlatenight`** · 20 s · chiptune · Bb — remix of **"2 AM taco run"** (Houston; original 15 s, from promo/films/htxlatenight/ (cues.js + scenes/)). Original: Alone again at the food truck, until tonight's deck fans across the sky. Next run's for two.
- **`srhtxgameday`** · 20 s · house · G — remix of **"Game day"** (Houston; original 15 s, from promo/films/htxgameday/ (cues.js + scenes/)). Original: The whole city wears the same colours, but matching shirts aren't matching people. Match on more than colors.

### Group 22: Houston
- **`srhtxheat`** · 20 s · jazzy · Gm — remix of **"Houston summer"** (Houston; original 15 s, from promo/films/htxheat/ (cues.js + scenes/)). Original: You sweat walking to the car, so dealbreakers get stamped first. Save your evenings.
- **`srhtxmuseum`** · 30 s · screwed · E — remix of **"Museum District first date"** (Houston; original 30 s, from promo/films/htxmuseum/ (cues.js + scenes/)). Original: Staring at art, still guessing who they are, until a mystery card hangs like a painting. Skip the guessing.
- **`srhtxenergy`** · 30 s · synthwave · Eb — remix of **"The energy capital"** (Houston; original 30 s, from promo/films/htxenergy/ (cues.js + scenes/)). Original: The energy that matters is between two people: their charts arc a spark. Find your spark.

### Group 23: Houston
- **`srhtxbingo`** · 30 s · lofi · Cm — remix of **"Houston first-date bingo"** (Houston; original 30 s, from promo/films/htxbingo/ (cues.js + scenes/)). Original: Small talk, late again, mentions an ex: BINGO, again. Align skips the bingo. Get a real first date.
- **`srhtxonesky`** · 30 s · funk · C — remix of **"Every culture. One city."** (Houston; original 30 s, from promo/films/htxonesky/ (cues.js + scenes/)). Original: Hellos in many languages float up into stars over one sky. Your person is under the same sky.
- **`srhtxhoods`** · 45 s · cinematic · A — remix of **"Your sign as a Houston hood"** (Houston; original 45 s, from promo/films/htxhoods/ (cues.js + scenes/)). Original: Twelve signs, twelve neighbourhoods, from Aries in EaDo to Pisces at Galveston Bay. Tag your neighborhood.

### Group 24: Cities
- **`srcitynyc`** · 30 s · dreamy · Fm — remix of **"Millions of people in New York…"** (Cities; original 30 s, from promo/films/citynyc/ (cues.js + scenes/)). Original: …and the apps keep showing you the same five. Tonight's deck is new every night. Meet someone actually new.
- **`srcityla`** · 20 s · pop · F — remix of **"LA: everyone's photo is perfect"** (Cities; original 15 s, from promo/films/cityla/ (cues.js + scenes/)). Original: Filters and golden hour, until an aura veils the photo: card first. Fall for the chart, not the lighting.
- **`srcitychicago`** · 20 s · chiptune · D — remix of **"Chicago winter"** (Cities; original 15 s, from promo/films/citychicago/ (cues.js + scenes/)). Original: Cuffing season is survival; two charts link and the snow turns to sparkles. Get cuffed by someone who fits.

### Group 25: Cities
- **`srcityaustin`** · 20 s · house · Dm — remix of **"Austin: everyone's 'in a band'"** (Cities; original 15 s, from promo/films/cityaustin/ (cues.js + scenes/)). Original: "Between things" gets stamped as a dealbreaker. Know what they're about, first.
- **`srcitymiami`** · 20 s · jazzy · Bb — remix of **"Miami: 'just visiting'"** (Cities; original 15 s, from promo/films/citymiami/ (cues.js + scenes/)). Original: Hot nights and rolling suitcases, then JUST VISITING is stamped out. Find someone who stays.
- **`srcityatlanta`** · 30 s · screwed · G — remix of **"Atlanta: a city in a forest"** (Cities; original 30 s, from promo/films/cityatlanta/ (cues.js + scenes/)). Original: So many trees, so hard to find the one; card backs fall like leaves. Find your one in the forest.

### Group 26: Cities
- **`srcitynashville`** · 20 s · synthwave · Gm — remix of **"Nashville heartbreak"** (Cities; original 15 s, from promo/films/citynashville/ (cues.js + scenes/)). Original: Every song's about heartbreak; Push / Pull / Align draws like staff lines. Your love song starts here.
- **`srcityseattle`** · 30 s · lofi · E — remix of **"Seattle: you never see the stars"** (Cities; original 30 s, from promo/films/cityseattle/ (cues.js + scenes/)). Original: The clouds part and a birth chart blooms in the sky. The stars are still up there.
- **`srcitydallas`** · 20 s · funk · Eb — remix of **"Dallas: big expectations"** (Cities; original 15 s, from promo/films/citydallas/ (cues.js + scenes/)). Original: Big hair, big trucks, then two charts lock round a giant star. Big love, by the stars.
- **`srcityneworleans`** · 30 s · cinematic · Cm — remix of **"New Orleans reads your cards"** (Cities; original 30 s, from promo/films/cityneworleans/ (cues.js + scenes/)). Original: Align reads your chart, then deals you a person: talk cards, not small talk. Let the cards decide.

### Group 27: Vote for city #2
- **`srvotenext`** · 20 s · dreamy · C — remix of **"Houston got the stars first"** (Vote for city #2; original 15 s, from promo/films/votenext/ (cues.js + scenes/)). Original: Ten card backs flip to candidate cities, one stays face-down. Your city could be next.
- **`srvoteballot`** · 20 s · pop · A — remix of **"Launch city #2 is up to you"** (Vote for city #2; original 15 s, from promo/films/voteballot/ (cues.js + scenes/)). Original: A ballot card fills, every vote becomes a star, then card first, face last. Pick the next sky.
- **`srvotemap`** · 30 s · chiptune · Fm — remix of **"Align starts in Houston"** (Vote for city #2; original 30 s, from promo/films/votemap/ (cues.js + scenes/)). Original: Constellation lines reach from Houston to ten candidate cities. Vote your city into the sky.

### Group 28: Toronto
- **`srtorpatio`** · 20 s · house · F — remix of **"Two seasons: winter and patio"** (Toronto; original 15 s, from promo/films/torpatio/ (cues.js + scenes/)). Original: Don't spend patio season on the wrong person: dealbreakers get stamped first. Make it count.
- **`srtorsubway`** · 20 s · jazzy · D — remix of **"Swiping the same faces"** (Toronto; original 15 s, from promo/films/torsubway/ (cues.js + scenes/)). Original: Stuck on the subway with the same loop of faces, until tonight's deck deals in. Get off the same loop.
- **`srtorworld`** · 20 s · screwed · Dm — remix of **"Everyone's from somewhere"** (Toronto; original 15 s, from promo/films/torworld/ (cues.js + scenes/)). Original: Greetings in many languages rise into stars and two charts link. Find them under one sky.

### Group 29: Toronto
- **`srtorglass`** · 30 s · synthwave · Bb — remix of **"A city of glass towers"** (Toronto; original 30 s, from promo/films/torglass/ (cues.js + scenes/)). Original: Everyone alone in their own box, until two windows light up gold. Come out of your box.
- **`srtorsorry`** · 30 s · lofi · G — remix of **"So polite, nobody says it"** (Toronto; original 30 s, from promo/films/torsorry/ (cues.js + scenes/)). Original: "Sorry!" bubbles pile up on a date; dealbreakers come first on Align. Say what you mean.
