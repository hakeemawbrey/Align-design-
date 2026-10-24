# Align promo assets

Captured from the running app by `node promo/scripts/capture-assets.mjs` (from repo root; needs the Vite dev server on :5173). Re-run with `--only=screens`, `--only=cards` or `--only=mark` for a subset.

- `screen-*`: full #phone canvas (390x844 CSS px) at deviceScaleFactor 3 -> 1170x2532, opaque.
- `card-*` / `align-*`: transparent PNGs (everything but the element hidden, background omitted, transparent margins trimmed; soft glows/shadows kept). Cards at DSF 4, talk cards at DSF 6, mark/wordmark at DSF 3 scaled up in place.

| File | Pixels | Shows |
| --- | --- | --- |
| screen-alignment.png | 1170x2532 | Cosmic alignment reading: Juniper + You, "Venus rules you both", Push/Pull tabs |
| screen-chart.png | 1170x2532 | Your chart: Sun in Taurus, planets row, traits reading |
| screen-chat-cards.png | 1170x2532 | Chat with the talk-card hand sheet open (Today tab, Wheel of Fortune card of the day) |
| screen-chat.png | 1170x2532 | Chat with Juniper after the scripted messages play in, alignment reading card in thread |
| screen-collection.png | 1170x2532 | Your binder: packs (Today's pack drop, Align pack, First Nights, Deep End) |
| screen-dealing-settled.png | 1170x2532 | Dealing finished: top card flipped face up (Maya), deck settled |
| screen-dealing.png | 1170x2532 | Dealing your deck, mid-deal: face-down card backs fanned, top card landing (t=1.25s) |
| screen-deck.png | 1170x2532 | Tonight's deck: Maya, 24 veiled profile card on top, chrome, tab bar |
| screen-founding-claimed.png | 1170x2532 | Founding offer claimed: gold Founding member card stamped down, "The stars, unrationed." |
| screen-founding.png | 1170x2532 | Founding member offer: "Stop rationing the stars", glowing arch portal, $88.88/yr plan cards |
| screen-match.png | 1170x2532 | "You both aligned": two auras colliding, star burst, Say something CTA |
| screen-onboarding-arrival.png | 1170x2532 | Onboarding arrival: planet ring over the horizon, "The sky already wrote you down" |
| screen-onboarding-big-three.png | 1170x2532 | "One sky. Three yous.": big three planets (Sun Taurus, Moon Sagittarius, Rising Libra) |
| screen-onboarding-birthdate.png | 1170x2532 | Onboarding step 1: birth date wheel (May 12 1998), Taurus constellation |
| screen-onboarding-birthtime.png | 1170x2532 | Onboarding step 2: birth time wheel (5:00 PM) + birthplace Tulsa |
| screen-onboarding-card-rule.png | 1170x2532 | "You fall for the chart. The face comes after.": veiled card -> revealed card diagram |
| screen-onboarding-chart-check.png | 1170x2532 | Chart check: six facts list (Taurus, Sagittarius, Libra, 12 May 1998, 5:00 PM, Tulsa) |
| screen-onboarding-dealbreakers.png | 1170x2532 | Dealbreakers chip picker ("What ends it before it starts?") |
| screen-onboarding-element.png | 1170x2532 | "You're earth. Here's your weather": green planet + element pairings |
| screen-onboarding-face-last.png | 1170x2532 | "Your face comes last": your own card preview + name/bio fields |
| screen-onboarding-field.png | 1170x2532 | "You are not arriving alone": fanned card backs, 333 charts nearby |
| screen-onboarding-manual.png | 1170x2532 | "Taurus, the user manual": strengths / weaknesses / work on |
| screen-onboarding-sign-charging.png | 1170x2532 | "One card has your name": face-down sign card charging (pre-flip) |
| screen-onboarding-sign-reveal.png | 1170x2532 | "Sun in Taurus": flipped Taurus sign card with YOUR CARD stamp |
| screen-onboarding-sky.png | 1170x2532 | "This was your sky": planet ring orbiting the Sun-in-Taurus globe |
| screen-onboarding-venus.png | 1170x2532 | "Venus runs your heart. Yours is in Aries": pink ringed planet |
| screen-paywall.png | 1170x2532 | Align+ paywall: "Three people are already in your orbit", yearly/monthly plans |
| screen-reveal.png | 1170x2532 | Reveal after the veil lifts: Juniper, 27 card flipped, photo shown, full bio |
| screen-sky.png | 1170x2532 | Today's sky: three face-down sky cards (You/Love/Move) + weekly Taurus reading |
| screen-splash.png | 1170x2532 | Splash: Align mark (seed-of-life + lit chakra column) and "Align" wordmark on indigo starfield |
| screen-welcome.png | 1170x2532 | Welcome back: "The stars kept your seat warm", card back, Continue as Hakeem / Sign in |
| screen-you.png | 1170x2532 | You tab: Hakeem, 28 green aura, binder, your sky row, your card |
| card-back.png | 1528x2347 | Deck card back, flat and face-down: violet glass, seed-of-life, chakra column, "ALIGN · TONIGHT" |
| card-event.png | 1496x2238 | Deck event card: "Second look" · Transit (Venus retrograde), draw 1/3 |
| card-founding.png | 1264x1584 | Gold-foil Founding member card, straightened (No 0112, Hakeem · Taurus, glowing arch) |
| card-profile-1.png | 1496x2238 | Deck top card, veiled: Maya, 24 · Virgo (pink aura, Slow Burn) |
| card-profile-2.png | 1496x2238 | Deck card, veiled: Rio, 29 · Leo (orange aura, Founder No 0018 holo chip, Wild Card) |
| card-profile-3.png | 1496x2238 | Deck card, veiled: Juniper, 27 · Libra (violet aura, Rare Pull) |
| card-profile-4.png | 1496x2238 | Deck card, veiled: Ari, 31 · Aquarius (blue aura) |
| card-profile-5.png | 1496x2238 | Deck card, veiled: Sol, 26 · Pisces (violet aura) |
| card-profile-6.png | 1496x2238 | Deck card, veiled: Kai, 28 · Capricorn (teal aura) |
| card-profile-peek.png | 1520x2281 | Deck card mid-peek (hold Space): Lena, 26 · Gemini, photo open with countdown ring |
| card-reveal-facedown.png | 1560x2688 | Reveal screen card before the flip: "Juniper, 27" back with chakra column (slight idle tilt) |
| card-reveal.png | 1560x2740 | Reveal screen card after the veil lifts: Juniper, 27 · Libra, photo + full bio |
| card-sign-back.png | 1044x1440 | Onboarding sign card face-down while charging (slight charge scale/tilt) |
| card-sign-stamped.png | 904x1156 | Taurus sign card with the "YOUR CARD" stamp |
| card-sign.png | 848x1152 | Taurus sign card face (Hakeem, 28 · green bull aura · Earth / Sagittarius Moon) |
| card-talk-1.png | 732x1170 | Talk card face from the hand: 0 The Fool ("What's a hill you will die on?") |
| card-talk-2.png | 732x1170 | Talk card face from the hand: XIX The Sun ("Morning person or night owl?") |
| card-talk-3.png | 732x1170 | Talk card face from the hand: XIX The Sun ("What does a perfect lazy Sunday look like for you?") |
| card-talk-4.png | 732x1170 | Talk card face from the hand: III The Empress ("Cook at home or try somewhere new?") |
| card-talk-5.png | 732x1170 | Talk card face from the hand: III The Empress ("What's your comfort meal?") |
| card-talk-6.png | 732x1170 | Talk card face from the hand: VI The Lovers ("Planned date or spontaneous date?") |
| card-talk-daily.png | 1176x1884 | Talk card face, card of the day: X Wheel of Fortune ("What's worth spending real money on?") |
| align-lockup.png | 351x630 | Mark + wordmark lockup at native splash size |
| align-mark.png | 988x1050 | Align mark alone, rendered 2.9x (seed-of-life circles + glowing 7-chakra dots) |
| align-wordmark.png | 780x470 | "Align" serif italic wordmark alone, rendered 2.5x |
