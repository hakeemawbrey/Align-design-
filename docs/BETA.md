# Align beta

A scaled-down build of the app with the core loop only. Same codebase as the
full demo; `BETA` (src/lib/beta.ts) switches the rest off.

```
cd app
npm run build:beta     # → dist-beta/
npm run preview:beta   # http://localhost:4175
```

## What's in it

1. **Onboarding:** ends on the deal (no founding offer).
2. **The deck:** people only (no event cards). The card uses Spark / Clash / Align with strength dots, moon and rising tags, and the element orb. When you both align, the match moment (`src/screens/BetaMatch.tsx`) brings your card and theirs in face down and flips them together, then shows the Align line from their card. No pull badge or lights.
3. **Today's horoscope and cosmic calendar:** the deck's horoscope pill drops down a panel. "Today" is your daily reading, drawn as three face-down cards (You, Love, Move) you turn over one at a time (`components/sky/SkySpread.tsx`); "This month" is a real calendar of moon phases, planets changing sign, retrogrades and seasons, worked out from the ephemeris (`src/data/cosmicMonth.ts`).
4. **Chat** with matches (Juniper's scripted chat and everyone else's thread).
5. **Talk cards** in chat (no packs or binder).
6. **How you fit:** the two-orb button top-right in every chat opens a sheet written for the relationship: Day to day, Feelings, First impressions and Feeling understood, each a plain sentence and one thing to try, then their card's Spark / Clash / Align, tonight's line and a button to play a talk card (`src/lib/compat.ts`, `src/components/chat/Compat.tsx`). The astrology behind each area sits under a "Why?" toggle. **There is no compatibility score, percentage or rating anywhere, on purpose (liability). Don't add one.**
7. **Aura photo:** take or pick a photo. MediaPipe finds one face on the phone, cuts the person out and paints their aura in their element's colours, then sets it as the card photo (`src/lib/aura.ts`, `x/aura-photo`). Also runs in onboarding's photo step.
8. **Profile** (`src/screens/BetaYou.tsx`): your card first (face down, your photo card behind; tap either), your name and big three, Edit card and Aura photo, Block a sign, today's horoscope as one row that opens into the three cards, your sign (with "Learn your sign" for Sun, Moon, Rising, Venus, Jupiter and your house), your next sky events, then settings and the demo tools. The Venus, Jupiter and House readings live on the Your sign screen (`BetaChart`, `src/components/you/parts.tsx`, `src/data/planetReadings.ts`).
9. **Learn your sign** (`src/screens/BetaChart.tsx`): a scrolling page built to be read. Three big tiles (Sun, Moon, Rising) with what each means, the reading for the one you pick as In love / For you / Try this, then the rest of the chart as plain questions that open in place, and quick facts. The whole glossary is unlocked.
10. **Peeks:** hold a card to peek, 3 a night.

Left out: Club, packs and binder, Align+, trading, energy, notifications and the Sky screen (links to them do nothing; "today's sky" opens the deck panel).

The photo check's WebAssembly is copied into `dist-beta/mp/wasm` by the Vite plugin. The two models live in `app/beta-assets/mp` and are bundled as bytes into their own chunk, because some hosts won't serve `.tflite` files.

## How it connects

- **One way into "how you fit":** her card's "Your alignment" and the chat's top-right button open the same sheet; the sheet leads on to the full reading. No scores.
- **One vocabulary:** Spark / Clash / Align on cards, in chat and in the full reading.
- **Back returns you where you were:** the calendar remembers whether it was opened from the deck, the profile or your chart, and a tapped event opens on its day.
- **Welcome:** the main button goes straight into the app; "New here — read my chart" under it starts onboarding. A first visit says "Welcome to Align", later ones "Welcome back".
- **The horoscope pill's dot** clears once you've opened today's reading.

## The card frame

Widgets between two people and for self-discovery share one frame, `src/components/CardFrame.tsx`, so they read as cards from the same deck as the people: a thick (3px) foil border in the card's colour, a title bar with an orb, an optional "Try this" strip and a mono footer. It's used by How you fit, Your sign, the horoscope and calendar, and the profile's sign and sky panels. Colours follow the planet or sign (sun gold, moon blue, rising violet), never how a reading comes out. Plain lists (settings, demo tools) stay unframed.

## The slow reveal (every match)

Aligning with someone who aligned back (Juniper, Sol, Amara, Bianca, Mina) no longer shows their face at once. Each match runs on its own clock (`src/lib/betaFlow.ts`):

1. **The stars align:** when you both say yes the deck carries on. The notification takes over the screen (`BetaFlowPopup`): the reels' pixel stars gather, seven of them in the Align mark's colours fly into a column and burst (`PixelAlign`), the Align mark draws itself around them, and "The stars align." arrives with "Draw our card" and "Later". The notification star on the deck (top right) also gets a "1" and pulses, and keeps it if you choose Later. The same pop-up says "It's time" when the 33:33 ends while you're outside the chat.
2. **The alignment card** (`src/pages/chat/AlignCard.tsx`, `x/align-card`): tapping the star opens its own screen. A deck of big cards shuffles, their backs the same violet Align card back as the main cards (`components/intro/CardBack`), one lifts out and turns over to show the question, and you answer it there. Their answer arrives sealed.
3. **Both answer:** sealing yours shows both answers and an "Open the chat" button. The chat opens veiled (their aura, not their photo) with a 33:33 countdown under the header (`RevealBar`). It survives leaving and reloading. In the demo, tap the clock to jump to its last five seconds.
4. **The reveal:** at 00:00 the two cards flip (`BetaMatch`, "The veil lifts."). The big button is "See Juniper's card"; back in the chat her photo and full card are open. If you're on the deck when the clock ends, the star lights up again and takes you to the flip.

**Several at once.** The flow store keeps one entry per match (`beta-flow:v2`), each with its own card and countdown. The notification leads with the sign: "The stars have aligned with a Libra." (name and age underneath). If others are still waiting, they're listed under it as "Also on your star", each one tappable. The deck's star counts what's waiting on you and opens the overview: "The stars have aligned with 3 signs.", then "Waiting on you" (a card to draw, or cards to flip) and "Counting down" (chat open, time left). The matches list shows the same status per row. Other matches use `screens/Thread.tsx`, which has the same veil, countdown and star-dealt card as Juniper's chat.
