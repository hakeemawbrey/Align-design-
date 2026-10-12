# Align teaser series (vertical 9:16)

Ten 11–14s teasers for TikTok / Reels / Shorts / Stories, all sharing one look (deep space, grain, pixel
stars, the moon, bone serif type, the chakra column) and one end tag.

| # | Teaser | Feature | Line | End tag |
|---|---|---|---|---|
| 01 | Blind by design | mystery cards | No faces. Just faith. | Put your faith / in the stars |
| 02 | The stars aligned | the align moment | When it's right, the stars line up. | Put your faith / in the stars |
| 03 | Tonight's moon | daily sky readings | Tonight's moon has notes for you. | The sky reads / you back |
| 04 | You were born a card | sign card | You were born a card. | Put your faith / in the stars |
| 05 | Talk in cards | talk cards | Both answer. Neither sees until you both do. | One card. / Two answers. |
| 06 | A new deck every night | nightly deal | Every night, the stars deal again. | Put your faith / in the stars |
| 07 | What color is your aura? | aura readings | Your aura says what your bio won't. | What color / is yours? |
| 08 | Houston, the stars are dealing | local + founding | Founding cards are numbered. | Founding members / Houston |
| 09 | Spark · Rub · Align | compatibility | Some spark. Some rub. Some align. | Put your faith / in the stars |
| 10 | Put your faith in the stars | manifesto | We hide the faces. We read the sky. You bring the courage. | Put your faith / in the stars |

Suggested posting order (story arc): 10 → 01 → 07 → 04 → 03 → 06 → 05 → 09 → 02 → 08.

Render one: `node promo/scripts/teaser-sound.mjs --teaser=03-moon && node promo/scripts/render.mjs --teaser=03-moon`
→ `promo/out/teasers/03-moon.mp4` (+ `-share.mp4`). Preview: serve the repo root and open `/promo/teaser.html?t=03-moon`.
Make a new one: copy a teaser file in this folder, add its id to `index.js`, follow `BRIEF.md`.
