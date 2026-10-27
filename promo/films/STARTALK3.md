# Star Talk, batch 3: twenty more star-advice films (vertical, 15–30 s)

The user asked: "Fork this and create 20 more 10–30 seconds star advice/chat to their zodiac signs videos."

Same series as STARTALK.md (read it first: premise, look, tone, the shared `startalk.js` module, the end card, the card cuts). The pixel stars with eyes talk to you, a sign at a time, in the retro RPG dialogue box. Every film is **vertical 1080×1920**, total length **15–30 s including the 4.4 s end card**, so 10.6–25.6 s of story.

## Rules for all twenty
- **One sign's star talks to that sign** ("Dear *Aries*…"), or a small group of stars chats. The star is tinted with its sign colour (`signStar(id)`) and wears its glyph badge. "THE STARS" (bone/gold) is the narrator.
- **Three beats:** the hook (headline + a sight gag that reads in one glance), the advice (1–3 lines in the box, each readable ≥1.5 s after typing), the last line (big Inter 800 + one Garamond italic accent). Then the shared end card.
- **One prop per film** that makes the joke land at a glance (a pixel prop drawn with cells, like Leo's crown and mirror in starleo). Keep props simple and legible.
- **Tone:** playful, warm, a little roasting, never mean or toxic. The advice is genuinely healthy. Astrology must be real (rulers, elements, modalities, opposite signs). No invented statistics.
- **Tie to Align** with one real feature where it fits: "Card first. Face last.", Push / Pull / Align, talk cards (assets/card-talk-*.png), dealbreakers, tonight's deck. Never say "Align" in the frames just before the end card.
- Copy below is a starting point: tighten it if a line reads long in the box. Box lines ≤ ~70 characters.

## The twenty

### Dear (sign): the ten signs not yet covered (15 s each unless noted)
| folder | len | music | hook / prop | box lines | last line |
|---|---|---|---|---|---|
| **staries** | 15 | synthwave | **"Dear *Aries*…"** The ♈ star (Mars-ruled) sprints in with a pixel boxing glove, already mid-fight with nobody. | "you don't have to win the first date." → "it's not a race. it's a *conversation*." (the glove drops; it sits down, wide eyes) | **"Slow is *hot*."** |
| **startaurus** | 15 | lofi | **"Dear *Taurus*…"** The ♉ star (Venus-ruled) is buried in a cozy pixel blanket with snacks, eyes sleepy. A phone buzzes: "new plans?" | "we love that you love comfort." → "but your person won't knock on your blanket." (it peeks out) | **"Say *yes* to one new thing."** |
| **stargemini** | 15 | pop | **"Dear *Gemini*…"** The ♊ star has twelve chat bubbles stacked over its head, all typing at once. | "you have 47 tabs open on 12 people." → "close the tabs. *pick one* chat." (bubbles pop until one is left) | **"Depth over *dopamine*."** |
| **starcancer** | 15 | dreamy | **"Dear *Cancer*…"** The ♋ star (Moon-ruled) peeks out of a tiny pixel crab shell, teary eyes. | "your shell is cute. we made it." → "but let someone *in* before you're sure." (it steps out, blushes) | **"Soft is *strong*."** |
| **starvirgo** | 15 | jazzy | **"Dear *Virgo*…"** The ♍ star holds a clipboard checklist that keeps getting longer, squinting. | "their shoes were wrong. we heard." → "a person isn't a project. let them be *a little* messy." (it crumples the list) | **"Done is better than *perfect*."** |
| **starlibra** | 15 | dreamy | **"Dear *Libra*…"** The ♎ star (Venus-ruled) balances a wobbling pixel scale: "Thai?" vs "sushi?", eyes darting. | "it's been 40 minutes. it's dinner." → "your opinion is *attractive*. use it." (scale clunks down) | **"Just *pick*."** |
| **starsag** | 15 | house | **"Dear *Sagittarius*…"** The ♐ star (Jupiter-ruled) has a backpack and a passport, half out of frame already. | "we know. adventure. freedom. planes." → "the right one *comes with you*." (a second star hops in with its own backpack) | **"Bring a *plus one*."** |
| **starcap** | 15 | cinematic | **"Dear *Capricorn*…"** The ♑ star (Saturn-ruled) in a pixel tie, at a desk, a calendar full of "WORK". | "you scheduled love for Q3." → "the stars don't do *calendar invites*." (it slides the laptop shut) | **"Log *off*. Show up."** |
| **staraqua** | 15 | synthwave | **"Dear *Aquarius*…"** The ♒ star (Saturn/Uranus) floats with pixel headphones and an alien-green glow, far from everyone. | "being different is your whole thing." → "being *close* doesn't make you less you." (it floats down to another star) | **"Let them *in*."** |
| **starpisces** | 15 | dreamy | **"Dear *Pisces*…"** The ♓ star (Jupiter/Neptune) daydreams: a thought bubble with a full wedding, two cats, a cottage. Date #1. | "it's the first date, babe." → "fall for who they *are*, not who you *imagined*." (bubble pops) | **"Stay *here*. It's nice."** |

### Group chats, pairs and sky events (20–30 s)
| folder | len | music | beats | last line |
|---|---|---|---|---|
| **stfire** | 25 | house | **"The *fire signs* group chat."** ♈ ♌ ♐ stars, all hyped, each line a louder flame (pixel fire grows). ARIES: "i texted first. obviously." · LEO: "i texted first AND sent a selfie." · SAG: "i'm booking us a trip to Peru." · THE STARS: "…did anyone ask how *they're* doing?" (all three go wide-eyed; fire shrinks to a candle) | **"Passion *listens*, too."** |
| **stwater** | 25 | lofi | **"The *water signs* group chat."** ♋ ♏ ♓ stars, a pixel rain cloud and a growing puddle of tears. CANCER: "they said 'k.'" · SCORPIO: "i've already analyzed it 9 ways." · PISCES: "i wrote a song about it." · THE STARS: "or… ask them what they meant?" (the cloud clears to a rainbow) | **"Feel it. Then *say* it."** |
| **stearth** | 25 | jazzy | **"The *earth signs* plan a date."** ♉ ♍ ♑ with a pixel spreadsheet. TAURUS: "dinner. the good place." · VIRGO: "i made a backup reservation." · CAPRICORN: "and a 5-year plan." · THE STARS: "it's a first date. maybe just… *have fun*?" (spreadsheet folds into a paper plane) | **"Plan less. *Feel* more."** |
| **stair** | 25 | pop | **"The *air signs* draft a text."** ♊ ♎ ♒ crowd one phone; the draft rewrites: "hey" → "heyyy" → "hey :)" → a 400-word essay. GEMINI: "add a joke." · LIBRA: "no, too much." · AQUARIUS: "send a meme instead." · THE STARS: "just send what you *mean*." (it sends "had fun. again?") | **"Say it *plainly*."** |
| **stopposites** | 20 | funk | **"*Opposites* attract."** ♈ Aries and ♎ Libra (opposite signs, Mars vs Venus) at a pixel table. ARIES: "let's go now." LIBRA: "let's think about it." Both glare, then the reading pops between them: PUSH / PULL / ALIGN rows light. THE STARS: "your opposite shows you what you're *missing*." | **"Push. Pull. *Align*."** |
| **stretro** | 20 | screwed | **"Mercury is *retrograde*."** A pixel ☿ orb spins backwards; a phone drafts "hey stranger" to an ex. ALL STARS (alarmed, wide eyes, whistle): "PUT. THE PHONE. DOWN." → THE STARS: "retrograde is for *reflecting*, not re-texting." (the draft deletes) | **"Leave the *ex* in the past."** |
| **stmoon** | 20 | dreamy | **"Your *Moon* sign knows."** A big pixel moon star (bone, sleepy) talks softly. "your Sun is who you show." → "your Moon is what you *need*." → "date someone who meets the Moon, too." A card flips showing Sun / Moon / Rising. | **"Feed your *Moon*."** |
| **strising** | 20 | pop | **"First impressions are your *Rising*."** A star tries on pixel masks (cool sunglasses, a smile, a mysterious hood) in a mirror. THE STARS: "your Rising is the front door." → "*card first, face last.* let them see the whole house." (a blind card flips) | **"Card first. *Face last.*"** |
| **stsaturn** | 25 | cinematic | **"Turning 29? That's your *Saturn return*."** A pixel ringed Saturn rolls in like a teacher; the star (any sign, bone) gulps. SATURN: "time to grow up." → "stop dating the same mistake." → "write your dealbreakers." Dealbreaker chips stamp onto a card: "✕ HOT AND COLD", "✕ NO PLANS, ONLY VIBES". | **"Your 30s are *calling*."** |
| **stghost** | 20 | lofi | **"Dear *ghoster*…"** A tiny pixel ghost-star with a sheet over it, eyes peeking. THE STARS: "a goodbye takes ten seconds." → "'not feeling it, but thank you' is *enough*." (the sheet slides off; the star blushes) | **"Nobody is *disposable*."** |

## Contract (per film agent)
- **Edit only your own folders** (promo/films/<name>/). Don't change startalk.js, cardfx.js, endcard.js or sky.js; if you hit a real bug there, report it instead.
- **Start from the starleo / starscorpio / starmercury structure** (scenes/index.js + cues.js). Music in cues.js with sections (drop, `outroAt: DURATION - 4.4`), and a style from the engine (synthwave, lofi, funk, cinematic, screwed, dreamy, pop, chiptune, house, jazzy). Pick a key and seed. End card from endcard.js, the card frame and cuts from cardfx.js. Pure function of t, no `document` at module top level.
- **Loop:** build → contact sheet (`node promo/scripts/render.mjs --film=<name> --vertical --sheet --rate=4 --dir=<fresh dir in your scratchpad>`) → look at it critically → fix. Check that no text overflows its box or the frame, every line is readable before it's cut, props read at a glance, and the stars' moods change with the beats.
- **Required before committing:** the sound build runs: `node promo/scripts/teaser-sound.mjs --film=<name>`.
- **Don't render the final mp4s** (the lead does). Delete your scratch dirs when done.
- **Commit only your files.** `git pull --rebase --autostash` first; push to `claude/align-promo-video`. Commit messages end with:
  ```
  Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
  Claude-Session: https://claude.ai/code/session_01WS8NKWkCaoWJ4moSfKnv24
  ```
- **Report back:** each film's length and anything changed from this brief and why.
