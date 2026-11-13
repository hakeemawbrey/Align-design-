# Align PS2 reels

Short vertical reels (1080 × 1920, 14–24 s) that look like a 2002 console
cutscene. The two main characters are **Him** and **Her**, a single man and
a single woman, and each episode is a dating problem they haven't sorted
out. Every reel ends on an Align card with one of Align's lines.

The format came from reels by @unemployed_corp, @demitrivornov0 and
@lucamaxiim (notes in `REFERENCES.md`). Only the joke structure is borrowed.
Every character, set, line and note here is original to Align: the people
and places are built in code (three.js), drawn small and dithered to get the
PS2 look, and the music is synthesised (`score.py`).

## The two formats

**Crime scene** (`a01`–`a07`): a body under a sheet at the 11th Precinct,
with a phone in its hand. "Detective, what killed him?" The detective closes
his eyes: "He didn't align." "Another victim." Then a black-and-white shot
of a couple who did align walking out, and the Align card.

**Storytime** (`c01`–`c03`): Him and Her on a scooter in front of a gold
armillary-sphere monument. One of them deadpans the other's strange habit,
and the sign explains it. The other one gets the last word.

| Script | Format | Punchline | Align line |
| --- | --- | --- | --- |
| `a01-he-didnt-align` | crime scene | he didn't align. | it has to be mutual. |
| `a02-talking-stage` | crime scene | an 8-month talking stage. | it has to be mutual. |
| `a03-never-asked` | crime scene | she never wanted kids. he never asked. | dealbreakers up front. |
| `a04-swiped-on-a-face` | crime scene | he swiped on a face. | read the sky before the face. |
| `a05-situationship` | crime scene | a situationship. two years. | say the honest thing. |
| `a06-im-fine` | crime scene | he said "i'm fine." | say the honest thing. |
| `a07-ghosted` | crime scene | she got ghosted. then she checked his story. | release, don't haunt. |
| `c01-scorpio-phone` | storytime | that's worse. | say the honest thing. |
| `c02-capricorn-time` | storytime | she was very late. | dealbreakers up front. |
| `c03-leo-mirrors` | storytime | and you still missed my good side. | read the sky before the face. |

## Render

Needs Node 18+, Python 3 with numpy, and ffmpeg. Run `npm install` in
`carousel/` once (Playwright, three and the fonts come from there).

```bash
node reels/ps2/render.mjs --stills        # a contact sheet per script → reels/out/ps2/stills/
node reels/ps2/render.mjs                 # every reel → reels/out/ps2/<id>.mp4 (+ .web.mp4)
node reels/ps2/render.mjs a03 c01         # by id
node reels/ps2/render.mjs --jobs 3        # reels rendered at once
```

A reel takes about a minute. Post the `.mp4` with the script's `caption`
and `hashtags`.

## Script contract

```json
{
  "id": "a02-talking-stage",
  "format": "crime-scene",
  "captions": "caps",
  "music": "noir",
  "victim": "her",
  "phone": { "screen": "chat", "name": "Jordan", "lines": ["hey stranger", ">when?"], "footer": "8 months ago" },
  "caption": "eight months of 'we should hang soon'",
  "hashtags": ["dating", "astrology"],
  "beats": [
    { "shot": "sheet", "text": "detective, what killed her?", "dur": 2.4 },
    { "shot": "detective", "face": "closed", "text": "an 8-month talking stage.", "dur": 2.8, "cue": "sting" }
  ],
  "end": { "line": "it has to be mutual.", "sub": "a new deal at 11:11" }
}
```

- `captions`: `caps` (chunky white capitals) or `sub` (game subtitles).
- `music`: `noir` (drone, a hit on the punchline, a cool beat for the walk-out) or `sunny` (lo-fi loop).
- `victim`: `him` or `her`. It picks the hand that holds the phone.
- `phone.screen`: `swipe` (a face card), `chat` (bubbles; start a line with `>` for your own message) or `notifs` (lock-screen notifications).
- **Shots, crime scene:** `sheet`, `phone`, `detective`, `group`, `coroner`, `walkout` (black and white), `end`.
- **Shots, storytime:** `wide`, `himclose`, `herclose`, `end`. Give each beat a `speaker` (`him` or `her`) and optionally a `gesture` (`shrug` or `head`).
- `face`: `neutral`, `closed`, `stern`, `smug`, `talk` or `shock`. `cue: "sting"` puts the music hit on that beat, and `cue: "reveal"` starts the walk-out beat.

Voice rules from `reels/SPEC.md` apply: never "compatible", always "align".
