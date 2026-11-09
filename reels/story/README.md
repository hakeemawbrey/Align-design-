# Align "In this town" story reels

Vertical reels (1080 × 1920, ~55–65 s) in the "In this town…" storytelling
format. A narrator tells a short fable about a toy town with one strange rule.
The town is full of blocky 3D characters, and one big word at a time is on
screen. Each line is its own shot, the story turns on a twist, and the last
beat is the call to action. Here the town's rule is always an Align idea: your
card only flips when it's mutual, your star only lights up when it's mutual,
you can only trade cards after three days.

Everything is original to Align. The town, the characters and their faces are
built in code (three.js). The narrator is the open-weights Kokoro voice from
`reels/affirm`, and the music bed is synthesised (`mix.py`). Only the
format carries over from the trend; no lines, art or audio do.

| Path | What |
| --- | --- |
| `scripts/*.json` | one story per reel |
| `engine.js` | the town, the characters, the camera, and the captions/overlays |
| `render.mjs` | script → narrator → frames (Chromium) → MP4 with ffmpeg |
| `mix.py` | voice lines placed at each cut, over a music bed that ducks under the voice |
| `../out/story/` | renders and the cached voice (git-ignored) |

## The three stories

1. **`01-cards-flip`: In this town, your card only flips when it's mutual.**
   Theo, a Virgo, aligns on everyone, but nobody aligns back. He keeps
   rewriting his bio to sound cooler, until he gives up and writes the honest
   thing. June (Taurus) writes back "same." *Read the sky before the face.*
2. **`02-stars-light-up`: In this town, your star only lights up when it's mutual.**
   Marcus, a Scorpio, has only ever aligned on his ex. The town astrologer
   tells him his star can't light up while he's still holding someone else's.
   He lets her go, and a Pisces at the bakery aligns back. *It has to be mutual. Release, don't haunt.*
3. **`03-fall-in-love-trading-cards`: In this town, people fall in love by trading cards.**
   You can only trade after three days aligned. Rosa, a Cancer, keeps an empty
   binder and finds a reason to release everyone, until Eli, a Capricorn, just
   keeps showing up. On day three they trade. Now her binder has one card:
   "the whole set."
4. **`04-one-moment-no-context`: In this town, you're shown one moment from your love life. No context.**
   From the "photo of your future" variant of the trend. One Leo sees himself
   on one knee and proposes on a first date (he was tying his shoe). Maya, a
   Cancer, sees herself crying alone in the rain at 11:11, so she releases
   everyone first. The moment turns out to be the three seconds before Sol
   (Pisces) runs over with an umbrella. *It's who you align with after.*

### Comedy-first stories (current direction)

Feedback on 5 and 6: not fun enough, and the ad was too loud. Both reference
reels work the same way. An absurd rule comes with quick-fire jokes about who
gets what, then a specific loser, an escalating plan, and a deadpan or dark
anticlimax. The plug is one throwaway line at the end. So 7 and 8 follow
these rules:

- **Story first, ad last and quiet.** The narrator never says "Align". There's
  no logo on the shots (`"logo": true` brings it back) and no chrome CTA
  (`"cta"` adds one). The end card is a silent 2.2 s shot (`"say": ""`,
  `"dur": 2.2`) with the mark, the wordmark and one mono line.
- **The app lives inside the story,** as props the plot needs: grandma's
  blocked-signs list (Block a sign), Doreen's daily horoscope column, and
  reading your own chart (Venus in Leo).
- **Jokes per beat:** a sign gag in the opening, a beat of silence before
  punchlines (`"hold": 0.4`), and a kicker after the twist.

7. **`07-it-never-said-first`: In this town, the sky tells you the sign you'll marry.**
   Priya gets Scorpio. Mum cries, Dad changes the locks, Grandma blocks the
   whole sign. She spends ten years running from Scorpios, marries a sweet
   Taurus, and then a Scorpio moves in next door with soup. The astrologer:
   "Sweetie. It never said *first*." Dev was the best man. Grandma blocked Tauruses.
8. **`08-doreen-writes-the-horoscopes`: In this town, one woman writes every horoscope.**
   Doreen is 81. Leos come to work in sequins. For eight years, Virgos: "Stay
   inside." Theo, the only Virgo, misses prom and watches June date Brock. He
   finally storms Doreen's door: "I don't hate Virgos. I just don't know anything
   about them. You never leave the house." His Venus is in Leo, so he's supposed to make a scene.
   June: "I married Brock. But my sister's a Virgo too." They've been inside together for two years. Very happy.

### Beta-feature stories

Stories 1–4 were written before the beta scope was set. Two of their premises
aren't in the beta: trading cards after three days (3) and a star over every
head (2). Stories 5 and 6 are built only from beta features, and every rule in
their towns is something the app actually does:

5. **`05-no-face-until-you-align`: In this town, nobody sees your face until you both align.**
   The aura photo checks you're a real person, your card holds your sun, moon and
   rising, dealbreakers and one line, and each night's deck is align or release,
   with the veil lifting only when it's mutual. Dre (Leo), "best face in town",
   writes "dealbreakers: none. bio: I'm better in person" and gets nothing back.
   He reads his own sign in his profile ("Leo · work on: needing an audience"),
   rewrites his card, and Ivy (Virgo) aligns. "Oh. You're cute too." "Too?"
   "Your card already was." *Read the sky before the face.*
   Beta: onboarding, aura photo, deck, veiled card and mutual reveal, edit your card, learn your sign.
6. **`06-nobody-writes-a-first-message`: In this town, nobody has to write a first message.**
   You play a talk card, and neither answer shows until you both have. Nia
   (Capricorn) checks today's sky every morning and reads her alignment with Jonah
   (Pisces): Pull 4, "he answers like you do"; Push 2, "you plan, he drifts". She
   waits on the cosmic calendar for a perfect day. On Oct 24, Mercury retrograde,
   Jonah plays "What's something you're scared to say first?" Both answers flip:
   the same line. *Astrology reads. It never decides.*
   Beta: chat, talk cards, the alignment widget (Pull / Push), today's sky, cosmic calendar.

Each script lists the features it shows in a `beta` field. The on-screen
boards (`fx: "board:TITLE|second line"`) stand in for the app's widgets. Keep
their wording to Align's: **alignment**, never "compatibility".

## Design language

The reels use the app's own Stardust system, not a generic toy-town look:

- **Colour:** the tokens from `app/src/index.css`. Indigo surfaces (`--void`
  `#0b0620`, `--canvas` `#140a2e`, `--raised` `#1e1240`), never black, and
  warm bone labels (`#efe6d6`), never white. Spark `#7fd8b0`, Rub `#e8628a`
  and Align `#f2c75c` appear only where the app uses them.
- **Characters** wear their sign's aura colour from `app/src/data/signs.ts`
  (Leo Goldleaf, Virgo Rose Quartz, Capricorn Jade, Pisces Dusk…).
- **Cards** are the app's cards. The overhead card is a small `ProfileCard`:
  "D., 26", the sign's aura image with "NO PHOTO UNTIL YOU BOTH ALIGN", the
  sign and element chip, Spark / Rub / Align pips, "ALIGN · № 031" and
  "✦ STRONG PULL". When both align, it flips to the same card with the face
  and a "REVEALED TONIGHT" chip. A held card is the `CardBack`: indigo glass,
  foil edge, seed of life and the chakra column.
- **Type:** EB Garamond italic for captions, headlines and bubbles; Space Mono
  for eyebrows. That's the app's two voices, with mono for labels and serials.
- **Widgets:** `fx: "board:EYEBROW|Headline"` draws an app panel (raised
  indigo, mono eyebrow, serif italic headline). The edge is Spark for PULL,
  Rub for PUSH, Align gold otherwise. Write headlines in sentence case, the
  way the app does ("Moon in Cancer — stay close to home.").
- **Logo:** the mark (seed-of-life circles and the glowing chakra column, from
  `components/intro/AlignMark.tsx`) and the italic "Align" wordmark sit top
  left on every shot. The end card is the splash screen: mark, wordmark, a
  mono line (`endSub`), then one chrome CTA pill (`cta`, default "Read
  tonight's deck").

## Render

Needs Node 18+, ffmpeg, and the narrator voice. Run `npm install` in
`carousel/` and `reels/affirm/setup.sh` once.

```bash
node reels/story/render.mjs --stills          # one frame per shot → reels/out/story/stills/
node reels/story/render.mjs --jobs 3          # every reel → reels/out/story/<id>.mp4 (+ .web.mp4)
node reels/story/render.mjs cards-flip        # by id
```

The voice is cached per script text, so changing a shot's camera or
animation re-renders frames without re-speaking.

## Script contract

```json
{
  "id": "01-cards-flip",
  "sign": "virgo",                       // the gold glyph on the plaza wheel
  "voice": "am_michael", "speed": 1.08,  // Kokoro voice
  "accent": ["Theo", "Virgo"],           // caption words drawn in gold
  "cast": { "theo": { "skin": "#f2c79b", "shirt": "#6f8fb8", "pants": "#2f3446",
                      "hair": "short", "hairColor": "#4a3022", "sign": "virgo", "glasses": true } },
  "shots": [
    { "say": "In this town, everyone is dealt a card on their eighteenth birthday.",
      "at": "plaza", "sky": "day",
      "cast": [{ "id": "theo", "x": 0, "z": 0, "face": "shock", "anim": "idle", "over": "card", "hat": "party" }],
      "props": [{ "kind": "cake", "x": 0, "z": 1.6 }],
      "fx": ["confetti"],
      "cam": { "on": "theo", "view": "close", "yaw": 0 } }
  ],
  "end": "align", "endSub": "read the sky before the face"
}
```

- **One shot per spoken line.** Its length is however long the narrator
  takes, so write lines the way they should be said. Spell numbers out
  ("eleven eleven", "eighteenth").
- `at`: `plaza` (zodiac wheel, clock tower at 11:11), `street`, `room`, `cafe`.
  `sky`: `day` | `dusk` | `night`.
- Cast options: `hair` `short|long|bun|curly|none`, `glasses`, `shades`,
  `beard`, `hat` `party|beanie|wizard`.
- Per shot, per character: `x` `z` `ry` (degrees; 0 faces the camera at yaw 0),
  `face` (`neutral happy love sad cry shock smirk focus angry soft`),
  `anim` (`idle wave point cheer jump dance slump cry type snap hold phone talk
  release trade trade2 give stomp shrug shake kneel tie umbrella walk walkoff`),
  `hold` (`card coffee phone binder binder-empty binder-one`),
  `over` (`card` or `star`) with `flipped` / `flipAt` (0–1 of the shot),
  `lit` / `litAt`, `glow`, `overSize`.
- `crowd`: `{ "n": 18, "radius": 6, "anim": "cheer", "over": "card", "flipSome": true }`.
- `fx`: `confetti`, `rain`, `hearts:<id>`, `sparkle[:<id>]`, `question:<id>`,
  `rings:<id>`, `release:<id>`, `bubble:<id>:<text>`, `board:<text>`.
- `grade: "gray"` for the low point. `end: true` on the last shot shows the
  wordmark and `endSub`.
- `cam`: `on` (a cast id) or `at` (`[x, y, z]`), `view` `close|medium|wide`,
  `yaw` (degrees), `push`, `lookUp`, `height`. In `room` and `cafe`, keep the
  camera inside the walls: use `close`, or `medium` with a small yaw.

## Voice

The same as `reels/SPEC.md`: warm and honest, astrology reads but never
decides. No soulmate promises, no "manifest", never "download". The trend's
shape is setup rule → the exceptions (a joke per sign) → "But one…" →
"Their name was…" → the low point → "Until one day…" → the twist → the call
to action. Keep it under about 65 seconds.
