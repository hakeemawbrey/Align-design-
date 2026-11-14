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
8. **Profile** (`src/screens/BetaYou.tsx`): Your two cards come first (face down, your photo card behind; tap either to open it full size and flip between Mystery and Revealed). Each control sits on the card it changes: a pencil badge on the corner of your face-down card (edit card) and an aura-gradient camera badge on the corner of your photo card (aura photo). Then your name with a one-line insight about your sun sign, and right under it your hand: six cards from your birth chart (Sun, Moon, Rising, Venus, Jupiter, House) fanned out; tap one and it opens big, swipe or use the arrows for the rest. Under the hand, three little cards read your own sign the way other people's cards are read: Spark (what lights you up), Clash (what trips you up), Align (what brings you back). Tap one and it opens big; swipe or use the arrows for the other two. Then today's horoscope (labelled with the date; one row that opens into the three cards), your next sky events, Block a sign, then one list (the language, settings, help) and the demo tools. Readings: `src/components/you/parts.tsx`, `src/data/planetReadings.ts`.
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

## The alignment guide between two people

One guide, two places (`components/chat/Compat.tsx`). In the chat it is one quiet row in the card frame (`AlignGuideCard`): your two sign orbs, "You & NAME · alignment guide", the line that sums you up, and an arrow. Tapping it, or the top-right badge, opens the sheet (`CompatSheet`), which starts with the same orbs, name and line, then five tabs: Spark · Clash · Align · Relationship · Chart.

- **Spark, Clash, Align:** one card each, with four parts: a headline, a paragraph (Juniper's written reading, or a read of the other person's element), the line from their card when there is one, "In your charts" (the pairings behind it: attraction for Spark, the ones that take work for Clash, the easy ones for Align), and a "try this".
- **Relationship:** the long game, then the four areas worked out from both charts (day to day, feelings, first impressions, feeling understood), with the astrology behind a "why" toggle.
- **Chart:** your chart next to theirs, pairing by pairing, read for love (`chartRows` in `lib/compat.ts`): Sun × Sun (who you each are), Moon × Moon (how you each feel), Rising × Rising (how you come across), your Venus × their Sun (what you're drawn to), your Sun × their Moon (whether you feel like home). Each row shows both signs, a neutral tag for how they sit to each other, and one sentence. A match whose card only shows a sun sign gets the rows that need nothing else.
- Under every tab: "Tonight" as one small row that opens to the full line and "Play a talk card", then the disclaimer.

Each tab is a rail of same-size section cards you swipe through, with dots and a count underneath (`Rail` in `Compat.tsx`). Spark, Clash and Align go: the read (picture, headline, paragraph), "in their words" (the line from their card), one card per chart pairing behind it, then "one thing to do". Relationship goes: the long game, then the four areas. Chart goes: the wheel, then every pairing.

Pictures carry it, not paragraphs (`components/chat/GuideArt.tsx`): each part opens with the two sign orbs acting it out (leaning in with sparks, bumping with a crack, coming to rest overlapped, circling each other), the pairings in a part are shown as two small sign orbs, the long paragraph shows two lines with a "More" toggle, and the Chart tab leads with a zodiac wheel: your placements on the outer ring, theirs on the inner, a line for each pairing. The pictures illustrate; none of them is a meter.

No score, percentage, rating or strength dots anywhere in it. The old separate "full alignment" screen is no longer linked from the beta.

## Cards in chat: today's three

The cards button in a chat no longer opens a hand. It opens `components/talk/TodayThree.tsx`: the deck shuffles, deals three cards face down and turns them over. Tap one to read it, then play it; a played card is stamped and can't be played again that day. Each chat gets its own three, chosen at random from all the talk cards the first time you open the sheet that day, and they reset at 11:11 PM local time (`lib/chatDraw.ts`, stored on the device). "Your cards", "Places" and "Packs" are gone from the beta; the full demo keeps them. The chat keeps moving around a card: your match answers it, and once you answer too they react to what you said (`CARD_REACTIONS` in `data/talkCards.ts`). After a slow-reveal alignment card, a seeded match also speaks first when the chat opens.

## The background

Every beta screen sits on the background from comealign.com and the feature film: the grainy violet nebula with four-point stars (`app/public/img/align-bg-mobile.svg`, 390 × 844, drawn by `components/Starfield.tsx` when `BETA`). The file's pixel moon is left out in the app copy, because it sat under the deck's star and the You screen's buttons. Over it run the site's shooting stars (`components/FallingStars.tsx`): a pixel streak every 4 to 10 seconds, ported from comealign.com with the same timing, size and colours. They stop for reduced motion and while the tab is hidden. The full demo keeps its own starfield.

## The card frame

People's cards carry the same idea: in the beta the mystery card (`components/deck/ProfileCard.tsx`) and the revealed card (`components/reveal/ProfileFace.tsx`) have a thick foil border (about 7px) in the sign's colours, like a printed trading card. The face is drawn at its usual size and scaled to fit inside the border, so nothing moves. Card backs follow the same rule: one thick foil border and no inner rule. The deck's back (`components/deck/CardBack.tsx`) carries the mark with "Align" in the serif italic wordmark under it. The small back used by talk cards, horoscope cards and the alignment-card shuffle (`components/intro/CardBack.tsx`) matches, and the talk and horoscope card faces lose their engraved inner rules and corner stars.

Widgets between two people and for self-discovery share one frame, `src/components/CardFrame.tsx`, so they read as cards from the same deck as the people: a thick (3px) foil border in the card's colour, a title bar with an orb, an optional "Try this" strip and a mono footer. It's used by How you fit, Your sign, the horoscope and calendar, and the profile's sign and sky panels. Colours follow the planet or sign (sun gold, moon blue, rising violet), never how a reading comes out. Plain lists (settings, demo tools) stay unframed.

## The slow reveal (every match)

Aligning with someone who aligned back (Juniper, Sol, Amara, Bianca, Mina) no longer shows their face at once. Each match runs on its own clock (`src/lib/betaFlow.ts`):

1. **The stars align:** when you both say yes the deck carries on. The notification takes over the screen (`BetaFlowPopup`): the reels' pixel stars gather, seven of them in the Align mark's colours fly into a column and burst (`PixelAlign`), the Align mark draws itself around them, and "The stars align." arrives with "Draw our card" and "Later". The notification star on the deck (top right) also gets a "1" and pulses, and keeps it if you choose Later. The same pop-up says "It's time" when the 33:33 ends while you're outside the chat.
2. **The alignment card** (`src/pages/chat/AlignCard.tsx`, `x/align-card`): tapping the star opens its own screen. A deck of big cards shuffles, their backs the same violet Align card back as the main cards (`components/intro/CardBack`), one lifts out and turns over to show the question, and you answer it there. Their answer arrives sealed.
3. **Both answer:** sealing yours shows both answers and an "Open the chat" button. The chat opens veiled (their aura, not their photo) with a 33:33 countdown under the header (`RevealBar`). In Juniper's chat the scripted demo conversation then plays itself through under the card, once, and carries on hands-off (`MORE` in `screens/Chat.tsx`): more back-and-forth, she plays a card, both answers come in, she reacts. It steps aside as soon as you type, play or answer something yourself; other matches reply as you write. It survives leaving and reloading. In the demo, tap the clock to jump to its last five seconds.
4. **The reveal:** at 00:00 the two cards flip (`BetaMatch`, "The veil lifts."). The big button is "See Juniper's card"; back in the chat her photo and full card are open. If you're on the deck when the clock ends, the star lights up again and takes you to the flip.

**Several at once.** The flow store keeps one entry per match (`beta-flow:v2`), each with its own card and countdown. The notification leads with the sign: "The stars have aligned with a Libra." (name and age underneath). If others are still waiting, they're listed under it as "Also on your star", each one tappable. The deck's star counts what's waiting on you and opens the overview: "The stars have aligned with 3 signs.", then "Waiting on you" (a card to draw, or cards to flip) and "Counting down" (chat open, time left). The matches list shows the same status per row. Other matches use `screens/Thread.tsx`, which has the same veil, countdown and star-dealt card as Juniper's chat.
