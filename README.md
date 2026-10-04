# Align — investor demo

A clickable, recordable build of Align's core loop, made from the Figma file
*Align — design v2 Stardust*: **deal → deck → align → match → reveal → chat**.

## Run it

```bash
cd app
npm install
npm run dev        # open http://localhost:5173
```

Record in desktop Chrome. The app renders a 390×844 iPhone, scaled to fit the
window. Make the window tall (or full-screen it) for the sharpest capture.
Sound is synthesised live. Click once anywhere first so the browser allows audio.

## Recording shortcuts

| Key | Action |
| --- | --- |
| `R` | Restart the demo from the splash |
| `1`–`9` | Jump to a screen: 1 splash · 2 welcome · 3 dealing · 4 deck · 5 match · 6 reveal · 7 chat · 8 alignment · 9 deck spent |
| `M` | Mute or unmute sound |
| `←` / `→` | On the deck: release or align the top card |
| hold `Space` | On the deck: peek at the photo |
| `Enter` / `Esc` | On the deck: open or close the card detail |

You can also open a screen directly from the URL, e.g. `http://localhost:5173/#reveal`.

## Suggested 60-second take

1. **Splash → Welcome** (auto). Click **Continue as Hakeem**.
2. **Dealing**: cards fly in and the deck is dealt.
3. **Deck**: drag card 1 left to **release** it.
4. Card 2 (Rio): drag right to **align**: gold star burst, "+1 aligned", the counter ticks down. No match yet.
5. Card 3 (Juniper): **press and hold** to *peek*. Her photo opens for 3 seconds, then seals when you let go. Then drag right (or press →) to align.
6. **Match**: the two auras collide and *You both aligned* appears. Click **Say something**.
7. **Reveal**: the card flips and the veil lifts off her photo. Move the mouse over the card for the holographic tilt.
8. **Say the honest thing** → **Chat**: the conversation plays in. Type a line and press Enter, and she replies.
9. Tap the sky icon or the alignment card → **Cosmic alignment**: switch the Spark, Rub, Align and Relationship tabs.

## Where things live

- `app/src/screens/`: one file per screen
- `app/src/components/`: shared UI (phone frame, starfield, tab bar) plus per-feature folders
- `app/src/data/`: signs (aura palette) and the demo deck. Juniper is the scripted match.
- `app/src/lib/sfx.ts`: WebAudio sound effects
- `design-refs/`: Figma exports used as references
