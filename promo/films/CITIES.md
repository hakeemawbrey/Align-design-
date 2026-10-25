# Cities: ten vertical Align ads for other cities (1080×1920, 30fps; 15 or 30 s)

The user asked: "Also do other cities too like 10 variety and their CTA is join waitlist or vote for your city"

These are exactly like the Houston ads in promo/films/HOUSTON.md: the same style, Align-truth, contract and commit rules. Read it fully. The round-2 Houston films are your examples: promo/films/htxtaste, htxrodeo, htxbayou, htxbrunch and htxsprawl. Copy freely from them, and never edit other films.

The differences from Houston:
- **City-specific hooks.** Each hook is something locals instantly recognise.
- **The END CARD's CTA line.** Your scaffold's `scenes/index.js` exports `CTA` ("JOIN THE WAITLIST" or "VOTE FOR YOUR CITY") and passes it to `buildEndcard(stage, { start, cta: CTA })`. Keep that. The end card is still "come", then the seed-of-life logo, then "Align", with your CTA under it. Never say "Align" in the frames just before the end card.

## City rules
- Use generic silhouettes and line art for landmarks and skylines.
- No team, brand or company logos or wordmarks, and no trademarked event names.
- No invented statistics (no population or "most/best" numbers).
- Affectionate, never mean about a city or its people.
- No disaster jokes.

## Music
It's pre-assigned in cues.js. Set `sections` to your big moments, and keep `outroAt: DURATION - 4.4`.

## The ten
| folder | len | music | CTA | hook | turn (the real Align feature) | last line before the end card |
|---|---|---|---|---|---|---|
| **citynyc** | 30 | synthwave | JOIN THE WAITLIST | **"Millions of people in New York…"** A dense generic skyline grows with lit windows, and a subway car whooshes by. "…and the apps keep showing you the *same five*." The same five faces cycle again and again (generic silhouettes). | "Tonight's deck: a *new* hand, every night." Card backs (card-back.png) deal in over the city. Then the chart comes first: a mystery card with an aura veil. | "Meet someone *actually new*." |
| **cityla** | 15 | pop | VOTE FOR YOUR CITY | **"LA: everyone's photo is *perfect*."** A ring light, a phone and a profile photo that keeps getting filters, golden-hour glow and a palm-tree backdrop. | "On Align, the face comes *last*." The photo gets veiled by an aura and the chart takes its place: "Card first." | "Fall for the chart, *not the lighting*." |
| **citychicago** | 15 | jazzy | JOIN THE WAITLIST | **"Chicago winter: *cuffing season* is survival."** Snow, wind gusts and a pictogram bundled up to the eyes, shivering. | "Find someone whose chart *lines up* before the first snow." Two charts link with a warm gold line, and the snow turns to sparkles. | "Get cuffed by someone *who fits*." |
| **cityaustin** | 15 | funk | VOTE FOR YOUR CITY | **"Austin: everyone's '*in a band*' and 'between things'."** Pictograms with guitars, a food-truck window, chat bubbles saying "between things", "kinda", "we'll see". | "On Align, dealbreakers come *first*." Chips stamp onto a card: "✕ 'BETWEEN THINGS'", "✕ FLAKY PLANS". | "Know what they're about, *first*." |
| **citymiami** | 15 | house | JOIN THE WAITLIST | **"Miami: hot nights, and everyone's '*just visiting*'."** Neon palm trees, a beach at night and suitcases rolling past. | Dealbreakers stamp: "✕ JUST VISITING". Then the chart: "See who's here for *real*." | "Find someone who *stays*." |
| **cityatlanta** | 30 | lofi | VOTE FOR YOUR CITY | **"Atlanta: a city in a *forest*."** A canopy of line-art trees grows over a generic skyline. "So many trees. So hard to find *the one*." A pictogram wanders among the trunks. | "Tonight's deck is dealt from the *stars*." Card backs fall through the canopy like leaves, one glows, and it flips to a mystery card: "Card first. Face last." | "Find your one *in the forest*." |
| **citynashville** | 15 | pop | JOIN THE WAITLIST | **"Nashville: every bar has a band, every song's about *heartbreak*."** Neon guitar signs, a cowboy-hatted pictogram and a broken-heart music note. | "Write a *different* song." The Push / Pull / Align reading draws over two charts like music staff lines. | "Your love song *starts here*." |
| **cityseattle** | 30 | dreamy | VOTE FOR YOUR CITY | **"Seattle: cloudy, rainy… you can never see the *stars*."** Rain on a generic skyline, and a pictogram with an umbrella looking up at grey clouds. | "We'll show you *yours*." The clouds part and a birth chart blooms in the sky (Sun, Moon and Rising pop with signs), then two charts connect: "Align matches you by the stars you were born under." | "The stars are still *up there*." |
| **citydallas** | 15 | chiptune | VOTE FOR YOUR CITY | **"Dallas: big hair, big trucks, *big expectations*."** A pictogram with growing big hair, a pickup truck bouncing, a giant star. | "Meet someone who *meets them*." Two charts lock together and a giant star glows. | "Big love, *by the stars*." |
| **cityneworleans** | 30 | jazzy | JOIN THE WAITLIST | **"New Orleans: someone's always reading *your cards*."** A generic French Quarter balcony silhouette with lanterns and a little card table with tarot-style cards. | "Align reads your *chart*, then deals you a person." Real Align talk cards (card-talk-*.png, which are tarot-styled) flip one by one: "Talk cards, not small talk." A mystery card is dealt: "Card first. Face last." | "Let the *cards* decide." |
