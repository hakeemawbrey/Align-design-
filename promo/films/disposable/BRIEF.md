# "Disposable": a 60-second, slower version of "Ghosted" for an older audience

The user wants a one-minute version of the 30-second film that is **slower and easier to follow for older viewers** ("boomers like Michael"). It must **open on the problem: "We've made people disposable."**

Read ../FILMS.md (world, brand, helpers, contract) and watch the source film promo/out/films/ghosted/align-ghosted-v3-share.mp4. Its code is in promo/films/ghosted/scenes/a and b. Copy from it freely, and from promo/film2, promo/film3, and promo/films/*. Never edit other films.

## What "slower, for older viewers" means (rules)
- **One idea on screen at a time.** No layered text, no fast montage, no flashing glitches, no 2-frame cuts. Motion is calm and slow (ease-in-out, ≥ 0.6 s moves).
- **Big type.** Statements are EB Garamond italic at ≥ 112 px. Eyebrows are Space Mono at ≥ 40 px (opacity ≥ 0.85). App UI shown on a phone must fill the frame (phone ≥ 1300 px tall, cropped if needed) so its words read at ≥ 44 px.
- **Long holds.** Every statement is fully readable for **≥ 2.5 s**, then gets a beat of breathing room. Typing is slower too (about 0.045 s per character).
- **Plain words.** Explain what Align does in plain English. No jargon.
- **Brightness and audio.** The film should be a touch brighter overall than ghosted (problem scenes average luma ≥ 40). The music is warm and calm (lead-owned score, 72 bpm). Sound effects are softer.
- **Grain and moon.** One moon only, and grain consistent.

## Beat map (60 s). Three parts, each owned by one agent; neighbouring parts overlap by 0.2 s.
| time | owner | beat and copy |
|---|---|---|
| 0–5 | A | **"We've made people disposable."** on screen from about 0.3 (fully readable by about 1.5), over a slow, cold, grainy stack of generic B&W profile cards (people photos) being swiped away, slowly at first. Hold. |
| 5–11 | A | A personal example. A generic phone chat fills the frame: your message "had a really good time tonight :)" and under it "Seen · 3 days ago". Caption **"Seen. Three days ago."** You type "did I do something wrong?"… and slowly delete it. |
| 11–16 | A | **"Ghosted."** (then the line "As if we were never there."). The other person's name and picture fade to grain. The message list greys out, row by row: Seen, Seen, Unmatched. |
| 16–20.2 | A | Everything clears to one last card, still and quiet. **"What if no one was disposable?"** The card slowly turns face down to show the Align card back; colour and the night sky bloom gently from it. **H1 at 19.8–20.2:** `drawSky(zoom 1, dx 0, dy 0, dim 1, moon {x 1716, y 122, r 52, phase .12, alpha 1})`, grain 0.5, card-back.png centred at (960,540), body height 560, upright and still, nothing else. |
| 20–27 | B | Eyebrow **"THIS IS ALIGN"**, then **"A dating app that takes its time."** The card back becomes a small deck. |
| 27–33 | B | **TONIGHT'S DECK**: a few cards dealt slowly, one by one (veiled profile cards, no faces). **"Each night, a few people. Chosen with care."** |
| 33–40.2 | B | **DEALBREAKERS FIRST**: one card comes forward and its dealbreakers stamp on slowly, one at a time and big (e.g. "✕ ONE-WORD TEXTS", "✕ READS, NO REPLY", "✕ FLAKY PLANS"). **"What matters is said first."** **H2 at 39.8–40.2:** the sky as above, nothing else on screen (the card has drifted away and faded by 39.8). |
| 40–46 | C | **FACE LAST**: Juniper's mystery card (aura veil, no face). **"You see who someone is before you see their face."** |
| 46–52 | C | **BOTH CHOOSE**: your card and hers; the seven chakra stars align gently between them (soft, not flashy), then the phone A+'screen-match.png', "You both aligned". **"Nobody gets picked alone."** |
| 52–60 | C | **"Be chosen."** types slowly by about 54, held alone to about 55.5; then the lockup (mark, chakras, wordmark "Align", "BLIND BY DESIGN") complete by about 57, held; fade to black 59.3–60.0, last frame black. |

## Contract
- `scenes/a|b|c/index.js` export `SCENES` (array of async build(stage) fns) and `CUES`. Only edit your own folder; the lead owns cues.js (score).
- Pure function of t. Captions are readable ≥ 2.5 s (this film's rule). No doubled text in dissolves. No pops at handoffs.
- Render: `node promo/scripts/render.mjs --film=disposable --sheet --rate=4 --from=X --to=Y --dir=/tmp/claude-0/disp-<part>/<fresh>`. Always use a FRESH dir.
