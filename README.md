# Align — investor demo

A clickable, recordable build of Align's core loop, made from the Figma file
*Align — design v2 Stardust*: **deal → deck → align → match → reveal → chat**.

## Online demo

A hosted copy runs at **https://claude.ai/artifact/V4y14GqpBoBrv6VwAM7NYD**.
It is private to the owner until shared from the page's Share menu.

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
| `1`–`9`, `0` | Jump to a screen: 1 splash · 2 welcome · 3 dealing · 4 deck · 5 match · 6 reveal · 7 chat · 8 alignment · 9 deck spent · 0 matches |
| `B` | Matches tab with a fresh binder (resets any trades) |
| `O` | New-user onboarding (birth date → sky → sign reveal) |
| `F` | Founding-member offer (end of onboarding) |
| `P` | Align+ paywall |
| `Y` / `C` | You tab / Club tab |
| `↑` / `Enter` | On the trade screen: send your card |
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

## New-user path

From Welcome, tap **New here — read my chart** (or press `O`):

1. **Arrival** → **Begin your chart**
2. **Birth date**: wheel picker; the constellation and sign update live. Leave May 4 1994 (Taurus).
3. **Your sky**: planets place themselves around the ring.
4. **Sign reveal**: the card charges up, then flips to show the glowing bull, as if you'd pulled a rare card. Let it flip on its own or tap it.
5. **Big three** → **How Align works** → **I'm in**
6. **Founding member**: tap **Claim founding member**. The gold № 0112 card stamps in, then **Deal my first deck**.

## Align+ (business model)

- **Paywall** (`P`, or **Keep going with Align+** when the deck is spent, or the Align+ button on You):
  weekly, yearly or monthly plans. **Start seven days free** flares the portal into *The whole sky is yours.*
- After claiming Align+, peeks on the deck are unlimited (∞) and You shows **Align+ · Active**.

## Other tabs

- **You**: your sign, sky tiles, and **Your card** (tap the card panel, then flip between FACE DOWN and FLIPPED).
- **Club**: the Taurus room. Like posts, open a thread, or **Say it to the room** to post; your post gets likes a few seconds later.

## Binder: trading cards

Once two people have been aligned for **3 days**, they can trade a copy of their
cards. Each copy lives in the other person's binder.

1. Tap **Matches** in the tab bar (or press `B`). Matches that can trade show a gold **✦ TRADE** tag.
2. Switch to **Binder**. Traded copies sit in sleeves; Juniper's sleeve is locked at *Day 0 / 3*.
3. Tap **Tobias** (*Ready to trade*). His copy is already waiting face-down.
4. Drag your card up (or tap **Trade copies**). The cards cross, his flips face-up, and *TRADED* is stamped on it.
5. **Put it in your binder**: his card drops into its sleeve, and that completes the
   element set (fire, earth, air, water), so you get the *All four elements* moment.
6. Tap any traded card to hold it up and tilt it.

### Artist Series (future vision)

Page 2 of the binder shows where this could go: verified artists get
limited-edition **Legendary** cards that fans collect and trade.

- In the Binder, tap **ARTIST SERIES ›** (or press `→`).
- **NOVA** (a fictional K-pop idol) sits in a rainbow-holo sleeve, edition № 001 / 500.
  The other sleeves are locked "?" slots for artists to come.
- Tap NOVA's card for the showcase: move the mouse over it to tilt, see demand
  (41 collectors want it, 3 traded this week), and **Offer a trade**, marked *Coming soon*.
- **‹ YOUR BINDER** (or `←`) goes back.

## Where things live

- `app/src/screens/`: one file per screen
- `app/src/components/`: shared UI (phone frame, starfield, tab bar) plus per-feature folders
- `app/src/data/`: signs (aura palette) and the demo deck. Juniper is the scripted match.
- `app/src/lib/sfx.ts`: WebAudio sound effects
- `design-refs/`: Figma exports used as references
