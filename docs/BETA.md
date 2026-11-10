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
6. **Compatibility:** the ring top-right in every chat. Tap for sun, moon, rising and cross pairings, elements, today, and their card's reading (`src/lib/compat.ts`).
7. **Aura photo:** take or pick a photo. MediaPipe finds one face on the phone, cuts the person out and paints their aura in their element's colours, then sets it as the card photo (`src/lib/aura.ts`, `x/aura-photo`). Also runs in onboarding's photo step.
8. **Profile:** edit your card, the cosmic calendar (`calendar`), aura photo.
9. **Learn your sign:** your chart, plus the whole glossary unlocked.
10. **Peeks:** hold a card to peek, 3 a night.

Left out: Club, packs and binder, Align+, trading, energy, notifications and the Sky screen (links to them do nothing; "today's sky" opens the deck panel).

The photo check's WebAssembly is copied into `dist-beta/mp/wasm` by the Vite plugin. The two models live in `app/beta-assets/mp` and are bundled as bytes into their own chunk, because some hosts won't serve `.tflite` files.
