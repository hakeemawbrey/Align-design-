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
2. **The deck:** people only (no event cards). The card uses Spark / Clash / Align with strength dots, moon and rising tags, and the element orb.
3. **Today's horoscope and cosmic calendar:** the deck's horoscope pill drops down a panel. "Today" is your daily reading; "This month" is a real calendar of moon phases, planets changing sign, retrogrades and seasons, worked out from the ephemeris (`src/data/cosmicMonth.ts`).
4. **Chat** with matches (Juniper's scripted chat and everyone else's thread).
5. **Talk cards** in chat (no packs or binder).
6. **Compatibility:** one score per person, shown the same on the match moment, the matches list, the chat ring and its sheet. Half comes from the two charts, half from the Spark / Clash / Align on their card (`src/lib/compat.ts`).
7. **Aura photo:** take or pick a photo. MediaPipe finds one face on the phone, cuts the person out and paints their aura in their element's colours, then sets it as the card photo (`src/lib/aura.ts`, `x/aura-photo`). Also runs in onboarding's photo step.
8. **Profile** (`src/screens/BetaYou.tsx`): your card first (face down, aura photo behind; tap to flip), your big three, Edit card and Aura photo, your sign, your next sky events, then settings and the demo tools.
9. **Learn your sign:** your chart, plus the whole glossary unlocked.
10. **Peeks:** hold a card to peek, 3 a night.

Left out: Club, packs and binder, Align+, trading, energy, notifications and the Sky screen (links to them do nothing; "today's sky" opens the deck panel).

The photo check's WebAssembly is copied into `dist-beta/mp/wasm` by the Vite plugin. The two models live in `app/beta-assets/mp` and are bundled as bytes into their own chunk, because some hosts won't serve `.tflite` files.

## How it connects

- **One compatibility score** everywhere (see 6). Her card's "Your alignment" and the chat ring open the same sheet; the sheet leads on to the full reading.
- **One vocabulary:** Spark / Clash / Align on cards, in chat and in the full reading.
- **Back returns you where you were:** the calendar remembers whether it was opened from the deck, the profile or your chart, and a tapped event opens on its day.
- **First visit:** Welcome leads with "Read my chart"; after the first deal it says "Welcome back".
- **The horoscope pill's dot** clears once you've opened today's reading.
