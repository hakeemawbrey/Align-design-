# Align

Align's core loop, made from the Figma file *Align — design v2 Stardust*:
**deal → deck → align → match → reveal → chat**. It started as a recordable
investor demo and is now an installable app you can hand someone on your phone.

## The app (for live demos)

- **Install it on your phone:** open the deployed link in Safari → Share →
  **Add to Home Screen**. It opens full-screen with the real status bar, works
  offline after the first open, and remembers where you are.
- **Your progress is saved.** Swipes, matches, chat messages and trades go
  through a backend; deck position and settings are kept on the device.
  **You → Reset demo** (tap twice) starts over.
- **No sign-up.** You are Hakeem. Everyone else is a seeded profile, and their
  side of a chat is written by the app.

### Backend

The app talks to one interface (`app/src/api`) with two implementations:

| | When | Where data lives |
| --- | --- | --- |
| **On this device** | no env vars set (default) | the browser's storage |
| **Supabase** | `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` set | your Supabase project |

On Supabase, each phone signs in anonymously, so every device gets its own
account and its own fresh run. The server decides matches (a client can't fake
one), and row-level security keeps accounts apart. Chat is live: open the same
account in two tabs and messages appear in both. If Supabase can't be reached,
the app falls back to on-device storage instead of breaking mid-demo.

**Set up Supabase (about 5 minutes):**

1. Create a project at [supabase.com](https://supabase.com).
2. **SQL Editor** → run `supabase/migrations/20261007000000_init.sql`, then `supabase/seed.sql`.
3. **Authentication → Sign In / Providers** → turn on **Allow anonymous sign-ins**.
4. **Project Settings → API** → copy the URL and the `anon` public key.
5. Locally: copy `app/.env.example` to `app/.env.local` and fill both in.
   On Vercel: add the same two as Environment Variables, then redeploy.

Each new account starts with five matches already in the binder (Tobias,
Anselm, Zena, Mira, Sunny), the same as the demo. Changed a profile in
`app/src/data/profiles.ts`? Run `npm run seed:gen` and re-run `supabase/seed.sql`.

### Real people (two phones)

With Supabase set up, anyone who opens the link and goes through **New here**
makes a real card: first name, a one-line bio and a photo on the last step.
Published cards are dealt first in everyone else's deck, tagged
**NEW · NEAR YOU**. When two people align on each other it's a match on both
phones: the second to align sees "It's mutual", and the first gets a live banner
that opens the chat. Chat between real people is shared and live.

Try it with two phones (or two browsers): onboard on both, align on each other,
then message.

**Reset demo** wipes your swipes, matches and chat, and hands the phone back to
Hakeem. A published card stays published.

**Still scripted:** the seeded people, Juniper aligning back, and her replies.

### Talk cards

In any chat with a match, the card button left of the message box opens your
**talk cards**: core relationship questions about everyday habits, romance,
intimacy, food, family and kids, money, the future, conflict, and some just
for fun. Play one and it lands in the chat. You both answer, and neither answer
shows until you both have (the daily-question idea from couples apps like
Paired). There are three kinds: open questions, this-or-that, and who's more
likely.

You start with 8 cards and 2 packs. Each new match gives a **First Nights**
pack, everyone gets a free **card of the day**, and Align+ unlocks the
**After Dark** pack (intimacy and romance). There are 51 cards; rare and
legendary ones get gold and holo edges. Cards and answers are ordinary chat
messages, so they work between two real people too. Reset demo restores the
starting hand.

### iOS app

`app/ios` is a native Xcode project (Capacitor) wrapping the same web app, so
every change ships to both. On iOS, haptics replace vibration and the status
bar is real.

On a Mac with Xcode 16+:

```bash
cd app
npm install
npm run ios        # builds, syncs into ios/, opens Xcode
```

In Xcode, pick your team under **Signing & Capabilities**, then run on your
phone, or **Product → Archive** to upload to TestFlight. Set the Supabase env
vars in `app/.env.local` *before* building: they're baked into the app.

For a founder-camp walkthrough, see [docs/FOUNDER-CAMP.md](docs/FOUNDER-CAMP.md).

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

## Resetting the demo (works on phones and on Vercel)

- **You tab → Reset demo**, then tap again to confirm.
- **Triple-tap the 9:41 clock** at the top of any screen (handy mid-presentation).
- Open any demo link ending in **`#reset`**, e.g. `https://your-app.vercel.app/#reset`.

Each clears every swipe, match, trade, block, peek and post and returns to the splash.
A plain browser refresh also clears state, but reopens the screen you were on.

## Recording shortcuts

| Key | Action |
| --- | --- |
| `R` | Restart the demo from the splash |
| `1`–`9`, `0` | Jump to a screen: 1 splash · 2 welcome · 3 dealing · 4 deck · 5 match · 6 reveal · 7 chat · 8 alignment · 9 deck spent · 0 matches |
| `B` | Matches tab with a fresh binder (resets any trades) |
| `O` | New-user onboarding (14 steps, birth date → founding offer) |
| `F` | Founding-member offer (end of onboarding) |
| `P` | Align+ paywall |
| `Y` / `C` | You tab / Club tab |
| `S` / `K` | Today's sky / Cosmic calendar (Oct 5 2026) |
| `N` | Notifications (also the gold star, top right of the deck) |
| — | Your chart: tap **Your sign** on the You tab (big three: Sun, Moon, Rising; then Traits, Element, Ruler, House) |
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
2. **Birth date**: wheel picker; the constellation and sign update live. Leave May 12 1998 (Taurus). A year that makes you under 18 shows **Come back at eighteen**.
3. **Time and place**: 5:00 PM, Tulsa. **I don't know the minute** switches to morning / afternoon / evening / night and estimates the Rising.
4. **Your sky**: planets place themselves around the ring.
5. **Sign reveal**: the card charges up, then flips to show the glowing bull, as if you'd pulled a rare card. Let it flip on its own or tap it.
6. **Taurus, the user manual**: strengths, weaknesses, what to work on.
7. **Big three**: Sun, Moon, Rising.
8. **Chart check**: six facts read back. Tap one to fix it; Continue brings you straight back.
9. **Venus runs your heart**: Hakeem's Venus is in Aries.
10. **Your weather**: your element against the other three.
11. **How Align works**: veiled cards flip when you both align.
12. **Dealbreakers**: pick up to three (or write your own); they go on your card.
13. **Your face comes last**: your own veiled card with those dealbreakers. Tap it to see what a match sees.
14. **You are not arriving alone**: 333 charts near you → **Show me who is out there**
15. **Founding member**: tap **Claim founding member**. The gold № 0112 card stamps in, then **Deal my first deck**.

If the page is refreshed mid-onboarding, it opens on **The sky saved your place** (Resume, or Start my chart over). Reset clears it.

## Align+ (business model)

- **Paywall** (`P`, or **Keep going with Align+** when the deck is spent, or the Align+ button on You):
  weekly, yearly or monthly plans. **Start seven days free** flares the portal into *The whole sky is yours.*
- After claiming Align+, peeks on the deck are unlimited (∞) and You shows **Align+ · Active**.

## Today's sky (Oct 5 2026)

Tap the **Today's Sky** pill on the deck (or press `S`). The reading is for Monday, October 5, 2026, using real
planet positions: Venus turned retrograde in Scorpio on Saturday Oct 3, the Moon is in Leo and waning (27% lit),
and the Sun is opposite Saturn. Switch **Today / Tonight / Week / Moon**. Tap **OCT 5 ›** for the
**Cosmic calendar** (October 2026: New Moon in Libra on the 10th, Scorpio season on the 23rd,
Mercury retrograde on the 24th, Full Moon in Taurus on the 25th). Tap any day to see what happens.

## How a night is dealt: draws and events

Every draw is **six cards: five people, then an event** (the gold card). The tracker under the card
shows *Draw 1/3* and the six slots, with the event as ✦.

- **Free**: three draws, so 18 cards: 15 people and 3 events.
- **Align+**: the draws keep coming, same rhythm.

Event cards use the same layout as people cards (title, badge, framed art, What / Play / Pass, Why tonight,
rarity). Swipe right or tap to play, swipe left to pass. Free nights get the first three; Align+ cycles all five:
1. **Second look** (Venus retrograde): brings back the last person you released.
2. **Lunar peek** (Moon in Leo): +1 peek tonight.
3. **Mulligan** (end of the free fifteen): shuffles back everyone you released and redraws up to five.
4. **Comet** (Align+): deals one extra person from outside tonight's sky.
5. **Spotlight** (Align+): moves your card to the top of three decks tonight.

Founders in the deck (Rio, Noor, Ivy) have holo borders and a *Founder №* badge.
The first time a free user runs out of peeks, an Align+ offer slides up.

## Free vs Align+

- **Free**: fifteen cards a night (the counter shows 11 / 15), three peeks, and the deck ends with *Your deck is spent*.
- **Align+**: the counter shows **∞ ALIGN+**, peeks are unlimited, and the deck keeps dealing new people.
  Start a trial with `P` → **Start seven days free** → **Deal me in**.

## Blocking

- **Block a sign** (Align+): You tab → **BLOCKED · 2 ›** → **Choose signs to block** → tap signs → **Confirm**.
  Blocked suns leave your deck (block Virgo and the deal opens on Rio instead of Maya).
- **Report / block a person**: in Juniper's chat, tap **•••** → pick a reason, **Unmatch**, or **Block Juniper**.
  She leaves your matches and binder.

## Other tabs

- **You**: your sign, sky tiles, and **Your card** (tap the card panel, then flip between FACE DOWN and FLIPPED).
- **Club**: the Taurus room. A pinned **founders card** post at the top of the feed shows the serialized
  Houston founders card (№ 0112 of 1,111, 64 left); **Claim yours** opens the founding-member offer.
  The room: Like posts, open a thread, or **Say it to the room** to post; your post gets likes a few seconds later.

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

### Rare series (future vision)

Page 2 of the binder shows where this could go: verified famous people get
limited-edition **Rare** cards that fans collect and trade.

- In the Binder, tap **RARE SERIES ›** (or press `→`).
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
