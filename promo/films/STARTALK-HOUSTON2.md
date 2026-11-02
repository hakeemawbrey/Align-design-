# Star Talk: Houston (40 new vertical films, 15–45 s)

The user asked: "can you make like 40 more houston ones now that we have a ton of formats? … only align card
transition 1 time max per video", and earlier: "take out any season or episode numbers from the videos".

So this batch is **40 new Houston films, told in the formats Star Talk already has**, 5 films per format. Each
builder owns one pack of 5 and copies that format's existing film as its template.

## The two hard rules (check both on every sheet)
1. **At most ONE Align card transition per video.** Use only `cardCuts(CUTS)` / `cardCutCues(CUTS)` from cardfx.js
   (it now plays exactly one cut, the middle candidate, in this film's own kind). Give it 1–3 candidate cut times.
   No other card-flip / card-deal / card-shuffle *transition* of your own anywhere, and the end card has none.
   (A card as a prop inside a scene, e.g. tonight's deck on a table or a talk card in a hand, is fine; a full-screen
   card wipe between scenes is not.) A 15–20 s film may have zero.
2. **No season or episode numbers anywhere on screen.** `cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' })`
   with NO `numeral`. Show bugs carry the show name only (no "EP 3", no "#4", no "S14"): e.g. Star Mail's
   `buildBug(root, { at })` without `ep`, Neighborhood Stars' `showBug(el, root, 'ASIATOWN')`. No "Day 4" counters,
   no "PART 2" titles. Titles are words, not numbers.

## Read first
- promo/films/STARTALK-BUILD.md: the contract (frame 0 is the thumbnail, accuracy, box lines, pure f(t), polish loop,
  final renders). Its setup/commit/gallery steps are replaced by the "Process" section below.
- promo/films/STARTALK9.md, "The hook rules"; promo/films/STARTALK.md for the look and tone.
- Your pack's template film (below): read it fully, copy its folder structure (scenes/index.js, cues.js, lore.json and
  any local props.js) into your new folder and change the story. Never edit the template or any shared module
  (startalk.js, lesson.js, cardfx.js, endcard.js, sky.js, wheel.js, sthot.js, stexplain.js, st5cast.js, st8cast.js).

## Rules for every film
- Folder `promo/films/hx<name>/` exactly as in your row. Length includes the 4.4 s end card; `buildEndcard` with the
  default CTA ("JOIN THE HOUSTON BETA").
- **Houston, affectionately.** Real public places and neighborhoods are fine (Buffalo Bayou, Hermann Park, the Loop,
  Bellaire Blvd, the East End, Clear Lake, Sugar Land…). No real brands, businesses, teams, venues or people. No
  disaster or flood jokes, no weapons. Funny, warm, never mean, to Houston or to any sign.
- **Don't repeat** what already exists: Midtown, EaDo, Third Ward, Montrose, the Heights, Katy Freeway, humidity as a
  love test, "20 minutes away", Space City launches, rodeo hats, game day, the Museum District, brunch, 2 AM tacos,
  kolaches vs tacos, the indoor-jacket rule. Your rows are already clear of these.
- Truth: no invented statistics; standard astrology, always attributed; real astronomy stated correctly; advice
  healthy. App features only: blind mystery cards, tonight's deck, talk cards, dealbreakers, Push / Pull / Align
  readings, the founding card. "Card first. *Face* last." Never say "Align" in the 2 s before the end card.
- Recurring gag: Pisces cries somewhere in the background.
- Keep each row's length, music, hook and **last line** exactly; improve the jokes.

## Process (this machine: 4 CPUs, shared by 8 builders)
- Work in /home/user/apv (branch claude/tender-wright-n3objn). **Do not run git at all**; the lead commits.
- Every render and sound build goes through the throttle (2 at a time):
  - sheet: `promo/scripts/htx-render.sh --film=<f> --vertical --sheet --rate=4 --dir=/tmp/htx/<f>/sN` (rate 2 at ≥ 45 s)
  - stills: `promo/scripts/htx-render.sh --film=<f> --vertical --stills=0,<t> --dir=/tmp/htx/<f>/st`
  - sound: `promo/scripts/htx-render.sh --sound <f>` must run without errors.
- At most 3 full sheets per film; read each sheet critically against STARTALK-BUILD's checklist **and the two hard
  rules** (count the card transitions on the sheet: ≤ 1; look for any number on screen).
- Final, per film, when it passes:
  - `promo/scripts/htx-render.sh --sound <f>` first (the render muxes promo/out/films/<f>/soundtrack.wav)
  - `promo/scripts/htx-render.sh --film=<f> --vertical --out=/tmp/htx/<f>/<f>-m.mp4`
  - check the master has an audio stream (`ffprobe -v error -select_streams a -show_entries stream=codec_name <master>`)
  - `ffmpeg -y -i /tmp/htx/<f>/<f>-m.mp4 -c:v libx264 -preset slow -crf 26 -maxrate 3.2M -bufsize 6.4M -vf scale=720:1280 -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart promo/out/htx/<f>.mp4`
  - `ffmpeg -y -ss 0 -i /tmp/htx/<f>/<f>-m.mp4 -frames:v 1 -vf scale=540:960 -q:v 4 promo/out/htx/<f>.jpg` (frame 0 is the thumbnail)
  - delete /tmp/htx/<f> and promo/out/frames/<f>-m (render.mjs keeps every final render's frames there, about 1.3 GB a film; disk is limited).
  - append one line to promo/out/htx/DONE.tsv: `<folder>\t<title>\t<len>\t<last line>\t<format>`
- Finish each film completely before starting the next.
- Report back: per film the folder, length, last line, and anything you changed from the row and why.

---

## Pack A · Hot Takes, Houston edition (template `st12twentymin`, sthot.js) · show "HOT TAKES"
THE TAKE (frame 0) → HEAT → OBJECTION! → THE VERDICT → AGREE / DISAGREE?. Cast with `cityStar(…, { city: 'HOU' })`
and sign stars. 15–20 s.

| folder | len | music | take (frame 0) | objection → verdict | last line |
|---|---|---|---|---|---|
| hxfeeder | 20 | funk | "The feeder road is a *love* language." | Aries: "it's just a road!" → knowing someone's shortcuts means you've been paying attention | **"Know their *shortcuts*."** |
| hxpatio | 15 | house | "Patio dates in August are *brave*." | Cancer melts → pick the spot that keeps them comfortable, not the one that looks cute | **"Comfort is *romantic*."** |
| hxpho | 20 | lofi | "65 degrees is *soup* weather in Houston." | a NYC star laughs → let people have their cozy; share the bowl | **"Share the *bowl*."** |
| hxwave | 15 | pop | "Waving someone into your lane is *flirting*." | Virgo: "it's traffic safety" → small kindness is attractive everywhere | **"Small kindness is *hot*."** |
| hxpollen | 20 | dreamy | "Pollen season is not a *personality*." | Taurus sneezes mid-objection → it's fine to reschedule; just say so | **"Reschedule *kindly*."** |

## Pack B · Star Talk Explains: the Houston sky (template `st13sunsign`, stexplain.js) · show "STAR TALK EXPLAINS"
THE QUESTION (frame 0) → THE BOARD (tags ✓ / ✦ / ♥) → THE LIGHTBULB → THE SHORT VERSION. 30–45 s. ✓ facts only as
written; leave anything out you're unsure of.

| folder | len | music | ❓ question | teacher / student | board beats (tag) | last line |
|---|---|---|---|---|---|---|
| hxlightpollution | 45 | cinematic | "Why can't I *see* stars in Houston?" | the Stars / Pisces | ✓ city lights scatter in the air and wash out faint stars (light pollution) ✓ haze and humidity make it worse ✓ the bright planets and the Moon still show through ♥ a drive out of town is a great date | **"Still up there. *Promise*."** |
| hxsunset | 30 | dreamy | "Why are Houston sunsets so *pink*?" | the Sun / Libra | ✓ sunlight crosses more air at sunset, so blue scatters away and reds and oranges reach you ✓ haze and clouds catch the colour ♥ sunsets are free; bring someone | **"Free show. *Every* night."** |
| hxmoonrise | 30 | lofi | "Why does the Moon look *huge* tonight?" | the Moon / Cancer | ✓ the Moon isn't bigger near the horizon; it's an illusion your brain makes (the Moon illusion) ✦ in astrology the Moon is feelings ♥ point it out to someone | **"Same Moon. *Bigger* feelings."** |
| hxnewmoon | 45 | synthwave | "When's the best night to *stargaze*?" | Saturn / Sagittarius | ✓ near the new Moon the sky is darkest ✓ give your eyes about 20 minutes to adjust in the dark ✓ use a red light, not a bright screen ✦ astrologers read the new Moon as a fresh start ♥ plan it together | **"Dark sky. *Bright* idea."** |
| hxsummertriangle | 30 | pop | "What's that bright *triangle* up there?" | Venus / Gemini | ✓ the Summer Triangle: three bright stars, Vega, Deneb and Altair, high on summer evenings ✓ bright enough to see from the city ♥ name a star pattern together | **"Three stars. *One* story."** |

## Pack C · Neighborhood Stars, new hoods (template `sxhoodmidtown`) · show "NEIGHBORHOOD STARS"
Each neighborhood gets its own star with a personality and one affectionate prop; a mini story with a dating lesson.
30 s. Bug: `★ NEIGHBORHOOD STARS · <HOOD>`.

| folder | len | music | hood · its star | beats | last line |
|---|---|---|---|---|---|
| hxasiatown | 30 | lofi | Asiatown (Bellaire Blvd) · the late-night foodie with a bubble-tea | it plans a 9-stop food crawl; Virgo's date gets full at stop 2; they slow down and share one dish | **"Slow down. *Share* it."** |
| hxeastend | 30 | funk | the East End · the mural painter with paint on its points | it paints its feelings on a wall instead of saying them; Leo can't read murals; it finally says it out loud | **"Say it. *Then* paint it."** |
| hxdowntown | 30 | synthwave | Downtown · the busy commuter who knows the tunnels | it rushes through tunnels all week and never sees the sky; Libra pulls it up to street level at sunset | **"Come up for *air*."** |
| hxclearlake | 30 | cinematic | Clear Lake · the space nerd with a model rocket | it explains orbits on every date; Aquarius loves it; Taurus glazes over; it learns to ask questions too | **"Ask *back*."** |
| hxsugarland | 30 | pop | Sugar Land · the planner with a perfect calendar | it schedules a spontaneous date for Saturday 3:15 sharp; Sagittarius improvises; they meet in the middle | **"Plan a *little*. Leave room."** |

## Pack D · Date Night Recap, Houston dates (template `sxrecapbowl`) · show "DATE NIGHT RECAP"
A sportscast of a date: two commentator stars, replays, a scorebug, a stat line, a LESSON UNLOCKED. 45 s. Scorebug
shows names/stats, never numbers of episodes.

| folder | len | music | the date | beats | LESSON (lesson.js) | last line |
|---|---|---|---|---|---|---|
| hxpaddle | 45 | funk | paddle boats in Hermann Park | they pedal in circles, can't steer, a duck overtakes them; they laugh and give up steering | "Laughing *together* | beats getting it right." | **"Circles count."** |
| hxartcar | 45 | house | an art car parade | Leo wants to be in it; Virgo wants to watch; they build a tiny cardboard art car together | "Make something *together*." | **"Best car in the parade."** |
| hxkayak | 45 | cinematic | kayaking Buffalo Bayou | one paddles left, one right; they spin; a slow-mo replay; they count strokes and glide | "Find your *rhythm*." | **"Paddle *together*."** |
| hxfoodtrucks | 45 | pop | a food-truck park | indecisive Libra can't pick a truck; Aries orders from all of them; they split six things | "Different paces | can still *share* a table." | **"Six trucks. *One* table."** |
| hxfarmers | 45 | lofi | a Saturday farmers market | Capricorn has a list; Pisces adopts every vegetable; they cook one imperfect dinner | "Imperfect is *delicious*." | **"Dinner's *ugly*. Love it."** |

## Pack E · Two Stars Disagree, Houston debates (template `sxdebatetext`) · show "TWO STARS DISAGREE"
Two podiums, two sides, a moderator, a crowd meter, a wholesome resolution. 30 s.

| folder | len | music | the question | sides | last line |
|---|---|---|---|---|---|
| hxtortilla | 30 | jazzy | "Flour or corn?" | Taurus (flour) vs Scorpio (corn) | **"Order *both*. Share."** |
| hxseventy | 30 | lofi | "Is 70° jacket weather?" | a Houston star (yes!) vs a Chicago star (laughing) | **"Bring the jacket. *Lend* it."** |
| hxridetogether | 30 | synthwave | "Ride together, or meet there?" | Cancer (ride together) vs Aquarius (meet there) | **"Ask what feels *safe*."** |
| hxboothbar | 30 | pop | "Booth or bar seats?" | Libra (booth, face to face) vs Gemini (bar, side by side) | **"Sit where you *talk* best."** |
| hxearlylate | 30 | funk | "Early dinner or late night?" | Capricorn (5:30 pm) vs Leo (10 pm) | **"Meet at *eight*."** |

## Pack F · Star Mail, letters from Houston (template `sxmail1`) · show "STAR MAIL"
A reader's letter flies in, the stars read it, argue, and seal a warm answer. 30 s. Bug "STAR MAIL" with no episode.

| folder | len | music | the letter (frame 0) | the answer | last line |
|---|---|---|---|---|---|
| hxnightshift | 30 | dreamy | "“I work nights at the hospital. | When do I *date*?”" | love fits around real lives; breakfast dates count | **"Breakfast *counts*."** |
| hxnewinhtx | 30 | pop | "“Just moved to Houston. | I know *nobody*.”" | say yes to one thing a week; tonight's deck helps | **"One *yes* a week."** |
| hxcrawfishboil | 30 | funk | "“Bringing my date | to the family *crawfish boil*.”" | warn them, pick a buddy at the table, let them be new at it | **"Peel *together*."** |
| hxraincheck | 30 | lofi | "“We keep rescheduling | for *rain*.”" | rain plans are still plans: pick an indoor backup | **"Rain plan: *still* a plan."** |
| hxfarapart | 30 | cinematic | "“They live across | the *Beltway*.”" | take turns driving; the middle is a place too | **"Take *turns*."** |

## Pack G · Wild lessons, Houston genre parodies (template `stwestern`; lesson.js) · no show bug
One genre parody each, with a real relationship lesson. 45 s.

| folder | len | music | genre | beats | LESSON | last line |
|---|---|---|---|---|---|---|
| hxgrackles | 45 | cinematic | nature documentary | a hushed narrator star observes grackles courting in a parking lot: puffing, squeaking, dramatic; then two stars do the same at a first date | "Nobody's *smooth*. | Be sincere." | **"Squawk *sincerely*."** |
| hxmosquito | 45 | synthwave | horror movie | "they come at dusk"… a mosquito ruins every outdoor date; the stars find a screened porch and finally talk | "Change the *setting*, | not the person." | **"Fine. *Indoors*."** |
| hxpollenzombies | 45 | screwed | zombie movie | the yellow pollen apocalypse: every star sneezing, yellow cars; two survivors share tissues | "Show up | on their *worst* day." | **"Bless *you*."** |
| hxslab | 45 | screwed | slow-rolling music video | a candy-painted slab cruise; the star shows off its shine, then slows down to really talk | "Slow it *down*." | **"Candy paint. *Real* talk."** |
| hxtrailride | 45 | lofi | western | a trail ride heads into the city; a cowboy star and a city star swap worlds for a day | "Visit *their* world." | **"See you on the *trail*."** |

## Pack H · Myth-Busters and Beta Diaries, Houston (templates `sxmythsun` and `sxdiary1`)
Myth-Busters: a myth stamp, the stars test it, BUSTED / PARTLY TRUE, 30 s, bug "MYTH-BUSTERS". Beta Diaries: a
selfie-vlog of a beta tester in Houston, 45 s, bug "BETA DIARIES" (no day counter).

| folder | len | music | format · title | beats | last line |
|---|---|---|---|---|---|
| hxnowalk | 30 | funk | Myth: "Nobody *walks* in Houston." | the stars walk a bayou trail at sunset; plenty of walkers; PARTLY BUSTED | **"Walk and *talk*."** |
| hxnothingtodo | 30 | pop | Myth: "There's *nothing* to do on a date here." | the stars fill a board with free ideas: parks, markets, murals, sunsets; BUSTED | **"Pick *one*. Go."** |
| hxcarneeded | 30 | lofi | Myth: "You *can't* date without a car." | a bike, a bus, a walk, a ride from a friend; PARTLY TRUE; plan it with them | **"Plan the *ride*."** |
| hxdiarytalkcard | 45 | dreamy | Beta Diaries: "My first *talk card* in Houston." | Pisces vlogs nerves before a first talk card on a bayou bench; the card asks something real; they talk for hours | **"Ask the *real* one."** |
| hxdiarymatch | 45 | synthwave | Beta Diaries: "Matched with someone *across town*." | Aquarius vlogs a cross-town match; plans a halfway date; it was worth the drive | **"Meet in the *middle*."** |
