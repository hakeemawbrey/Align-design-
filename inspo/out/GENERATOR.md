# Build: the Align infinite content generator

_Written from the founder's inspo review on 2026-11-02: 0 to use, 0 maybe, 0 skipped, 0 with written feedback, out of 1068 posts. This file is regenerated every time a pick is saved; rebuild the generator's recipe deck from it whenever it changes._

## To Claude Code

Build a program at `generator/` (Node, ES modules, no paid services) that turns the recipes below into an endless supply of new Align content, in Align's voice, without ever repeating itself.

1. **Recipe deck.** Parse this file (or `inspo/out/accepted.json` + `inspo/data/decisions.json`) into recipes: format, what to take, the founder's feedback, the Align spin. "Use" recipes weigh 3, "maybe" weigh 1. Re-read on every run so new picks flow in.
2. **Variables.** Cross each recipe with things that change: the 12 signs; tonight's real sky (moon phase, retrogrades, ingresses; compute with an ephemeris library, never guess dates); Align features and true facts from `founder/data/align-brief.json`; story angles and hook types from `founder/src/library.mjs`; the 51 talk cards in `app/src`; Align vocabulary (deal, deck, align, release, peek, veil, reveal, 11:11). Recipes × variables give thousands of distinct pieces; when they run low, ask Claude to propose new variables in the same voice.
3. **Never repeat.** Hash recipe id + variables + hook and keep a ledger in `generator/data/made.json`. Also reject anything too close to an earlier piece (same first line, same sign and format within 14 days).
4. **Write the piece.** For each pick, write a complete script in the shape the repo already renders: reels → `reels/scripts/*.json` (or Align Town in `reels/town/`), carousels → `carousel/content/*.json`, talking-head → founder scripts (`founder/out/scripts/*.json`). Read those schemas first and validate against them. Use Claude (Anthropic API, the latest model) for the writing, with the recipe, the variables, the voice rules and the taste rules below in the prompt.
5. **Hard rules.** Carry over structure only: never their words, footage, audio, likeness or captions. Follow the founder's Align spin over everything else. Every "Skip it" reason below is an avoid rule. Voice rules from `founder/data/align-brief.json` → `voice.rules`: short sentences, no exclamation marks, no emoji in lines, no "manifest", no therapy jargon, astrology reads and never decides, never "download Align", at most two Align vocabulary words per piece. Anything only the founder knows (a real number, a date) stays a `[bracket]`. Write a check that fails a piece on any of these.
6. **Learn from results.** Read `instagram/data/posts.json` (skip rate, average watch, shares, saves from trial reels). Recipes whose pieces beat the median skip rate get their weight doubled; ones that lose three times running get halved. Log every change.
7. **Run it.** `npm run make -- --count 10 [--kind reel|carousel|talking] [--sign leo] [--recipe i0002]` writes a batch and prints a table; `npm run make -- --daily` makes one day's batch (for example 3 reels and 1 carousel) and is safe to schedule. Hand the reels to `reels/` to render and to `instagram/` to post as trial reels.
8. **Test it.** No network in tests (fake Claude and Meta). Cover: deck parsing, weighting, the no-repeat ledger, every voice rule, schema validation, and that a skipped post's reason blocks a matching piece.

## Taste rules (the founder's own words)

_No written feedback yet. As the founder reviews, their notes land here._


## What they want to take most

_Nothing ticked yet._

## Recipes (0)

_No posts marked "Use it" or "Maybe" yet._

## Avoid (0 skipped)



## Spin library

Ready-made Align spins (the review page suggests them per post). Use them as extra recipes when a variable fits, weighted by how often the founder picked them.

- **Comment your sign** (`comment-card`, Caption / CTA, Hook): Comment-to-get, but the prize is a card: "comment your sign and I'll tell you the card you'd be dealt at 11:11 tonight." Reply with its aura, its push and its pull. No photo.
- **Deal Night series** (`deal-night-series`, Series, Format): A nightly series called Deal Night. Each episode deals one veiled card on screen, the comments vote align or release, and the next episode shows whether it was mutual.
- **Dear [sign]** (`dear-sign`, Hook, On-screen text): "dear [sign]," then one true trait, the place they rub (push) and the thing that pulls them in. Ends on the card a [sign] would be dealt tonight. It can sting, but it never punches down.
- **Tonight's sky as a deal** (`sky-tonight`, Format, Series): Tonight's sky read as a hand of cards: what this [full moon / retrograde] does to your deck, one sign group per beat. Payoff: tonight's event card (Lunar peek, Comet, Second look).
- **Pull a talk card** (`talk-card-pull`, Format, Hook): Swap the tarot pull for a talk card: draw one of the 51 questions on camera ("planned date or spontaneous date?") and the viewer answers in the comments. Neither answer shows until both of you have.
- **Built with Claude Code** (`built-with-claude`, Automation, Series): Build in public: one Align reel made start to finish with Claude Code (script, Align Town 3D, captions), sped up. End on the finished reel, and the real view count once it's in.
- **Founder numbers** (`trial-numbers`, Hook, Caption / CTA): Founder diary with one real number: "[N] trial reels in, here's what the skip rate taught us about a dating app with no photos." Numbers from instagram/ stats, never invented.
- **POV at 11:11** (`pov-1111`, Format, On-screen text): POV skit: it's 11:11, the new deal lands, and the one card you aligned on last night has aligned back. One line of text on screen, a held reaction, the match animation as the payoff.
- **Say the honest thing** (`honest-opener`, Hook, Format): Show a chat that opens from something on their card, the way Align prompts it ("say the honest thing"). Then the line people actually send. Keep it warm, a little funny, and true.
- **The reveal** (`the-reveal`, Editing, Look): Keep their reveal structure: a veiled card, the auras collide, "You both aligned", then the face flips. Use the hold-to-the-end tension on the veil.
- **You get 3 seconds** (`peek`, Hook, Editing): Hook on the peek: "you get three seconds to see their face. Then it seals." Hold the card, show the photo for three seconds, let it close.
- **The flip lands on the drop** (`sound-led`, Sound, Editing): A sound-led edit: build to the drop with veiled cards being dealt, and land the card flip exactly on it. Pick sounds that feel like 2am, not a party.
- **A day building it** (`day-building`, Format, Look): A day building a dating app with no photos: small real moments, one caption each, closing on the deal landing at 11:11.
- **One slow line** (`slow-line`, On-screen text, Sound): One slow line per screen over a mood sound, lowercase: "you weren't too much. you were early." Last screen: "read the sky before the face." No logo until the end card.
- **How to read a card** (`read-a-card`, Format, On-screen text): Tutorial shape: how to read an Align card in 20 seconds. Aura, then push (where you'll rub), pull (what draws you in), align (where it holds). Demo on one real card from the deck.
- **Signs ranked** (`signs-ranked`, Format, Carousel): Rank the signs by who texts first (or who releases a perfect card over one dealbreaker). Who's-more-likely is a real talk card kind, so end on "play it with your match".
- **Lowercase carousel** (`carousel-dear`, Carousel, Caption / CTA): Carousel: slide 1 is a lowercase hook ("the sign who leaves you on read"), then one sign or one truth per slide, and the last slide carries one Align idea. Never an ad.
- **Guess my big three** (`guess-big-three`, Format, Caption / CTA): A game: "guess my big three from my dealbreakers." Show three dealbreakers, ask for Sun, Moon and Rising in the comments, and reveal in the next video.
- **Reply with a talk card** (`reply-with-card`, Format, Caption / CTA): Answer a real comment by playing it as a talk card on screen, then answering it honestly yourself. Ask viewers for their answer and keep it sealed until the next video.
- **Why no photos** (`why-no-photos`, Hook, Format): Explainer: why Align hides photos until it's mutual. One claim per beat, honest about what's opinion, and the 3-second peek as the proof you still get a look.
- **Their card, not their face** (`celebrity-card`, Look, Format): What a famous person's Align card would read, from their public birth date: sun sign, push, pull, align. No face until the flip. Only public facts, nothing invented.
- **What's inside a card** (`inside-a-card`, Format, Look): Teardown: what's inside one Align card, layer by layer: aura, chart, dealbreakers, the veil, the photo underneath. Clean product shots, one label per layer.
- **Align Town walk** (`align-town`, Look, Editing): An Align Town walk: the camera moves one way through the 3D astrology town, one card per street, slow. A line of text per card, and the deal at the end.
- **Card-game meme** (`meme`, Format, On-screen text): Meme format: "me releasing a perfect chart because their dealbreaker is 'no cats'." The target is the behaviour, never the sign or the person.
- **Place card date** (`place-card`, Format, Look): Place cards: two people, one place card, "if they say yes, it's a date." Film it at a real café and end on the check-in card they unlock there.
- **Why I built it** (`founder-why`, Hook, Format): Founder story in 30 seconds: why build a dating app played as a card game, with no photos. One true moment, one number, and the line "read the sky before the face."
- **First sketch vs now** (`before-align`, Look, Format): Then and now: the first sketch of the veiled card next to the app today, cut on the beat. Caption: what changed and why.
