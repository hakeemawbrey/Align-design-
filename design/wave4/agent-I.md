# Agent I — wave 4 notes

Section `937:1924`, file `tj4UC3bpikhe8u1TL0kA35`. Twelve NEW screens on row **y=6900**, x = 80 + 450·i. Renders in scratchpad `cut/G01.png … cut/G12.png`.

## Scores (score.py, 300px thumb) — gate < 1% accent

| i | screen | node | accent | haze | hues | notes |
|---|---|---|---|---|---|---|
| 0 | G-01 — Phone Entry | `1534:2050` | **0.00** | 0.00 | 1 | one field, holo |
| 1 | G-01b — Email Entry | `1534:2140` | **0.00** | 0.00 | 1 | |
| 2 | G-02 — Code Verification | `1535:8273` | **0.00** | 0.00 | 1 | six 44×52 boxes, 4th lit |
| 3 | G-03 — Permission Primers | `1535:8367` | **0.20** | 0.34 | 4 | three mock notification cards, Taurus tile icons (allowed ≤7%) |
| 4 | G-03b — Permissions Denied | `1538:8237` | **0.00** | 0.00 | 1 | |
| 5 | G-04 — Sign-in Failure | `1538:8338` | **0.00** | 0.00 | 0 | |
| 6 | G-21 — Lost Number | `1539:2024` | **0.00** | 0.00 | 1 | |
| 7 | G-22 — New Device | `1539:2124` | **0.00** | 0.00 | 1 | |
| 8 | G-09b — No Matches Yet | `1544:2231` | **0.00** | 0.00 | 0 | three hairline rings |
| 9 | G-10 — Chat Empty State | `1544:2317` | **0.10** | 0.00 | 2 | Libra avatar tile only |
| 10 | G-11 — Report / Block | `1546:8555` | **4.64** | 0.15 | 1 | all of it is the red destructive pill (allowed exception); 0 otherwise |
| 11 | G-12 — Match Expired | `1546:8663` | **0.00** | 0.00 | 0 | no theme, one secondary pill |

Reference: O-03b `1478:855` (wave 3 utility) scores 0.00 on the same script.

## Common frame (every screen)

390×874, fills copied from S-05 `937:1925` (variable-bound `#140A2E`), clipsContent. Clones: starfield `1378:1919` at **opacity 0.5**, status bar `1379:1915`, home indicator `1384:1928`. No auroras, no glows, no geometry. Header: `‹` SF Pro Regular 30 at (24,50) or `×` at (346,52); utility title SF Pro Semibold 13 cream @0.85 centred at y62. Eyebrow SF Pro Semibold 10 ls14% cream @0.5 at y112; headline EB Garamond Italic 26 lh31 at y132 (left, w342) or centred; sub SF Pro Regular 13 `#EFE6D6` @0.75 lh18 at y206; body 13 @0.8 lh20. Caps section headers are instances of `1529:858` at x36; rows are instances of `1529:860` at x20, 52px pitch (44 + 8); value column = SF Pro Regular 13 cream @0.6 right-aligned, added to the **screen frame** (instances refuse new children) at x180 w140, or x110 w244 when the row's `›` is hidden. Holo = clone of `1387:1915` at (38,668), label EB Garamond Medium Italic 19 + `  ✦` as its own SF Pro Regular 15 range. Text links SF Pro Semibold 13 cream @0.55–0.65 centred at y742.

## Per screen

- **G-01 / G-01b** `1534:2050` / `1534:2140` — copy from `6:2551` / `749:819`. `STEP 1 · WHO'S ARRIVING` / *The stars need somewhere to reach you.* / sub "One code by text (to your inbox). No password, ever." Field = Row instance, `›` hidden, placeholder cream @0.4 (`+1` at full cream on phone). Links "Or continue with email/phone", "No access to this number/inbox?". Holo *Send my code*. Footer caps `NO PASSWORDS. EVER. · STANDARD RATES APPLY`.
- **G-02** `1535:8273` — `STEP 2 · PROVE IT'S YOU` / *Six numbers, sent to your sky.* Six 44×52 `#2B1E4C` r10 boxes at x28 pitch 58, y262; digits `4 1 1` SF Pro Semibold 22; box 4 lit: 1.5px cream stroke @0.9 + caret. "Resend in 44s" @0.5. Holo *Verify*, link "Wrong number?".
- **G-03** `1535:8367` — `BEFORE THE SYSTEM ASKS` / *Three asks, each with a reason.* / "Notifications first. All they would ever say:". Three cards 342×64 `#2B1E4C` r16 at y248/320/392: 32px r8 icon with Taurus aura IMAGE fill (hash `0df2db68…`), `Align` SF Pro Semibold 13, body 12 @0.8 w272, time 11 @0.5 right. Copy: "Juniper aligned back. Seven days. Start talking." (now) · "Your deck refreshes at 11:11. Fifteen cards." (11:11) · "Venus is retrograde. Do not text the ex." (Tue). Then `THE OTHER TWO`: rows Camera → "One veiled photo", Location → "City, never live". Holo *Allow all three*, link "Decide one at a time". First pass: sub wrapped into the first card and "One veiled photo" wrapped at w100 → sub shortened, value column widened to 140.
- **G-03b** `1538:8237` — title Permissions. `YOU SAID NO` / *Some of this needs the hardware.* Rows Location/Notifications/Camera → "Off". `WHAT THAT COSTS` body (one text, permission names set Semibold by range, paragraphSpacing 8). Holo *Open Settings*, link "Continue without them". Sub shortened to one line after first render.
- **G-04** `1538:8338` — centred: `TOO MANY TRIES · TRY AGAIN IN`, countdown `2:59` EB Garamond Italic 44, *The stars need a minute.*, sub "Try again at 9:44 pm, or use a different number. Nothing on your chart has changed." Holo *Back to sign in*, link "No account on that number? Start your chart instead."
- **G-21** `1539:2024` — title Recovery. `NO ACCESS TO THIS NUMBER` / *Locked out of your number.* Rows "Code to my email" → `j•••@thestars.com`, "Answer from my chart" → "Human review"; `WHAT WE WILL ASK` and `HOW LONG` bodies from the clone. Holo *Verify another way*, link "Back to sign in".
- **G-22** `1539:2124` — title Security, `×` close. `SOMEONE SIGNED IN` / *A new device asked for you.* Rows (no `›`) Device → "iPhone 17 Pro, iOS 26.2", When → "Today, 9:41 pm", Where → "Houston, 4 mi from usual"; `IF THIS WAS NOT YOU` body. Holo *That was me*, link "That was not me — lock my account". Values wrapped at w140 on first render → widened to x110 w244.
- **G-09b** `1544:2231` — "Matches" EB Garamond Italic 24 at (24,60) like the parent tab. Three rings `#FFF9F2` @0.2 1px, Ø120/200/280 centred (195,330), nothing inside. `NO AURAS OVERLAP YET` / *Your card is out there. Nobody has flipped it yet.* / "Matches land here the moment you both align." Holo *Deal tonight's deck*, link "Notify me when it happens".
- **G-10** `1544:2317` — chat header mirrors S-09: 34px Libra aura disc (hash `43b8eac6…`) at (44,68), *Juniper* EB Garamond Italic 20, `MATCHED 2 MINUTES AGO`, 1px divider @0.1 at y118. Centred *Nobody has said anything yet.* / "Earth and air. Neither of you will start — unless one of you does." (clone said "Air signs both" — corrected for Taurus × Libra). `GUIDANCE · ASK, DON'T HINT` + two suggestion panels 342×60 r12 with the clone's two openers. Holo *Say something*, link "Or say your own thing".
- **G-11** `1546:8555` — title Juniper, `×`. *Something off?* / "They are never told, whichever you pick." `REPORT · REVIEWED WITHIN 24H` rows Harassment / Fake chart / Underage / Something else; `OR JUST LEAVE` rows Unmatch → "The card closes", Block → "Permanent". ONE `Pill · destructive` instance (`1529:855`) *Block Juniper* at y668; caps `REPORTING ALSO BLOCKS, AUTOMATICALLY`; link "Never mind". No holo.
- **G-12** `1546:8663` — `×` only. Face-down card 56×84 r8 `#2B1E4C` @0.7 with cream stroke @0.18 at (167,262); `FACE DOWN AGAIN` / *Seven quiet days. The card closed.* / "Juniper is back among strangers. That's the deal — nobody lingers unread." (Sasha → Juniper). Single secondary pill 314×54 r999 cream @0.06 fill, 1px cream stroke @0.3, EB Garamond Medium Italic 19 *Let it go*. Dropped the clone's `ALIGN+ · ONE RE-OPEN A WEEK` upsell — not kind on a loss screen.

## Gotchas hit

- `INSTANCE.appendChild` is refused, so a row's value text lives in the screen frame at the row's absolute coords, not inside the instance.
- Text height is stale inside the script after `resize` + `textAutoResize='HEIGHT'`; all ys are explicit. Three copy lines had to be shortened/widened after the first render (G-03 sub + value, G-03b sub, G-22 values).
- The kit status bar's `▪▪▪` renders faintly green in the PNG; it is the shared furniture, scores 0.00, left as is.
