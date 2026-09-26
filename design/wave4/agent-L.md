# Agent L — Wave 4 notes

Row y=9900 in section `937:1924`, x = 80 + 450·i. All 13 screens 390×874,
fills copied from S-05 (variable binding `935:857` preserved), starfield
`1378:1919` clone at 0.5 opacity (0.7–1.0 on the three art screens), status bar
`1379:1915` + home indicator `1384:1928` clones, back chevron cloned from O-03
`1019:2461` at 24/62, utility title SF Pro Semibold 13 cream @0.85 centred.
Caps headers and rows are **instances** of `1529:858` / `1529:860` (label
rewritten via the TEXT child; value column and toggles are placed on the
screen frame over the row because instances refuse new children). Holo
`1387:1915` cloned, label in EB Garamond Medium Italic 19 with the trailing
`✦` as its own SF Pro Regular 15 range. Renders in `scratchpad/cut/w4L_*.png`.

| # | screen | node | accent % | haze % | gate |
|---|---|---|---|---|---|
| 0 | S-19 — Notifications | `1535:855` | **0.19** | 0.05 | < 1 ✓ (state dots + 2 avatar tiles) |
| 1 | S-19b — No Notifications | `1535:8475` | **0.00** | 0.00 | < 1 ✓ |
| 2 | S-19c — Notification · Detail | `1536:2379` | **0.01** | 0.00 | < 1 ✓ |
| 3 | S-19d — Notification · Grouped | `1536:8588` | **0.20** | 0.06 | < 1 ✓ |
| 4 | S-19e — Notification · Settings | `1538:867` | **0.07** | 0.00 | < 1 ✓ |
| 5 | S-12 — Trial Active | `1539:8338` | 27.23 → **21.34** | 28.9 | 20–25 ✓ |
| 6 | S-13 — Wait for Reset | `1540:855` | **0.00** | 0.00 | ≤ 3 ✓ |
| 7 | P-01 — Block a Sign | `1548:855` | **0.03** | 0.07 | ~2 ✓ (under) |
| 8 | P-01b — Choose Signs to Block | `1548:8517` | **0.05** | 0.04 | < 1 ✓ |
| 9 | P-02 — Priority Queue | `1547:855` | **0.42** | 0.45 | < 1 ✓ (5 aura tiles) |
| 10 | P-03 — Change City | `1550:855` | **0.00** | 0.00 | < 1 ✓ |
| 11 | A-01 — About Align | `1550:8397` | **0.82** | 0.52 | ~5 (under; the mark is the only colour) |
| 12 | A-02 — About Align · Space City | `1550:8500` | **0.00** | 0.00 | < 1 ✓ |

## S-19 — Notifications (x=80) · `1535:855`
Source `6:2224` (a lock-screen mock; its four pushes became the rows). Custom
`Notif · *` rows 350×66 panel `#2B1E4C` r12, 6px state dot at x14 (green
`#7ED957` new · orange `#FF914D` expiring · blue `#7B7BF5` closed), 28px
avatar disc (IMAGE fill from `Kit · Aura photos`, cream stroke @0.3) on rows
about a person, title SF Pro Semibold 13, sub 12 @0.6, time 11 @0.45 right.
`TODAY`: Juniper (Libra tile, new) · deck refilled (new) · M.'s card closes
(Virgo tile, expiring). `EARLIER`: Venus entered Leo (closed) · post hit 444
in Taurus (closed). `APP` → `Row · list` "Notification settings". No holo —
the list is the screen. "Jules" in the source became Juniper (the file's
match); "Gemini" → Taurus. Two subs shortened to one line after the first
render wrapped them into the row's bottom edge.

## S-19b — No Notifications (x=530) · `1535:8475`
Source `146:283`. Empty state: a ghost tray (three faded hairline rows with
dim dots, `empty · tray`) at y196, eyebrow `NOTIFICATIONS · NOTHING NEW`,
headline *The stars have been / quiet for you.* (kept from the source), sub
folds the source's two blocks: "…all land here. Nothing has landed yet."
`YOUR MORNING READING` → row "Arrives every day at 8:11 am" + "That one never
goes quiet." Holo `Read today's reading ✦`.

## S-19c — Notification · Detail (x=980) · `1536:2379`
Source `296:528`. Green dot + eyebrow `ACTIVE TRANSIT · JULY 13 · 8:00`,
headline EB Garamond Italic 26 *Venus enters Leo tonight.*, legal-style body
13/22 @0.8, panel `WHAT IT MEANS FOR YOU` ("Taurus Sun · Venus rules you" —
the source's Gemini framing rewritten for the account), row `LASTS` "Until
August 4 · 22 days", holo `See it on your chart ✦`, note "Sent to you because
Transit alerts are on."

## S-19d — Notification · Grouped (x=1430) · `1536:8588`
Source `296:601`. One panel per group (`Group · TODAY · 3 NEW`, `Group · THIS
WEEK`), 62px rows with hairline separators @0.08, same dot/avatar/time
anatomy as S-19. `OLDER` is a sentence, not a list: "Anything older than a
week clears itself." "New replies in Gemini" → Taurus.

## S-19e — Notification · Settings (x=1880) · `1538:867`
Source `296:680`. Intro line, then toggle rows under `THE DECK` (Morning
reading · 8:11 am, Deck refilled, Transits that touch your chart), `MATCHES`
(New alignments, Comets sent your way, Cards about to close — off), `THE
CLUB` (Replies to your posts, Mentions in your sign — off). Toggle 44×26:
on `#31167A` knob right; off `#2B1E4C` + cream stroke @0.18 (needed — the
off pill vanished on the same-colour row) knob @0.45 left. Row chevrons
hidden on toggle rows. Quiet-hours note at the foot. No CTA.

## S-12 — Trial Active (x=2330) · `1539:8338` — the loud one
Source `6:2444`. Aurora frame instance `1539:8414` at index 1 (directly above
the starfield); top aurora `I1539:8414;1473:857` fill rebuilt as the same
4-stop radial in hot gold `#D4AF37` (1.0/0.9/0.45/0). First render at ellipse
opacity 1 measured **27.23%** — over the 25 cap — so the ellipse opacity
went to **0.78** → 21.34%. Bottom warm aurora left as shipped. Hero `hero ·
golden door`: 150×220 arch (top radii 75, bottom 6) vertical gradient
`#FFE49A → #E8A63C → #7A4A10`, drop-shadow glow `#F8AC55` @0.75 r48 plus a
300px radial `#F8AC55` bloom (blur 40) behind; inner hairline arch `#FFF4DC`
@0.55; cream key (26px ring stroke 4, 4×34 shaft, two teeth); four 4-point
`createStar` sparkles (the first pass drew them as crossed bars and they read
as plus signs). Headline *Seven days on us. / Then $88.88 a year.* — the
source said three days, but the brief's timeline ends at `IN 7 DAYS`, so the
trial length follows the timeline. Timeline `timeline · 3 steps`: hairline
rail, gold dot on TODAY, hollow dots on THIS WEEK / IN 7 DAYS, caps + 12px
subs (`Align+ opens` / `we nudge you` / `$88.88 renews`). Holo `Back to my
deck ✦`, note "Cancel any time in Settings · Align+". Haze 28.9% is the gold
field against the violet ground (same effect H saw on S-11 teal) — expected.

## S-13 — Wait for Reset (x=2780) · `1540:855`
Source `6:2498`. × close, eyebrow `THE DECK · EMPTY UNTIL 11:11`, `rings ·
waiting` three hairline ellipses r60/95/130 `#FFF9F2` @0.2 centred at
195/330, `aura lobe · Taurus (dim)` 120px radial `#8FC24B` 0.5→0 blur 30
beneath, EB Garamond Italic 40 `6h 12m`, caps `UNTIL THE DECK REFILLS`,
headline *Rest. The good ones are / worth a night's wait.* (26 italic), sub,
holo `Notify me at 11:11 ✦`, underlined `or skip the wait with Align+`.
Starfield at 0.8. Accent 0.00 — the lobe is under the scorer's gate (as on
O-03d) but reads as one green ember in the target.

## P-01 — Block a Sign (x=3230) · `1548:855`
Source `347:670`. Back chevron, eyebrow `ALIGN+ · BLOCK A SIGN`, headline 26
italic. Grid 4×3 of `Chip · <Sign> · <state>` 76×36 r18 at x 20 / 111.33 /
202.67 / 294, rows 224/270/316: panel fill, cream stroke @0.26, **drawn**
glyph (VECTOR path, 12px box, stroke 1.5 round in the sign's core colour
@0.8 — path data must be Figma's space-separated `M x y C … L … Z` form; the
comma form throws) + name SF Pro Semibold 10 @0.85 (Sagittarius/Capricorn at
9 with -2% tracking to fit). Blocked (Scorpio, Aries): fill `#1A1030`, stroke
@0.12, glyph @0.3, name @0.35. Caps `TWO BLOCKED · TEN OF TWELVE STILL
DEALT`, three bulleted lines from the source, `CURRENTLY BLOCKED` row
"Scorpio · Aries · since Jul 2", holo `Choose signs to block ✦`. The source
blocked one sign; the brief asked for two, so Aries joined Scorpio.

## P-01b — Choose Signs to Block (x=3680) · `1548:8517`
Source `347:590`. Same grid; Scorpio + Aries in the selected state (fill
`#3A2A6A`, stroke cream @0.6). Caps `TWO CHOSEN · TEN STILL DEALT`, body
(source copy + the suns-only clause), hint "Tap a sign to choose it…" (moved
from 478 to 500 after it collided with the four-line body), holo `Confirm ✦`.

## P-02 — Priority Queue (x=4130) · `1547:855`
Source `209:538`. `hero · queue as orbit`: hairline ellipse 320×120 @0.18,
four 28px aura discs (Aquarius, Leo, Scorpio, Cancer) on the front arc at
25°/57°/123°/155° with depth opacity 0.5/0.7, yours (Taurus tile) 44px at
the front with a green `#8FC24B` @0.35 r18 glow, caps `YOU · CARD 3 OF 41`.
Copy: `WHAT IT DOES` / `IT IS NOT A CHEAT` / `THIS WEEK` (the source's
`IT RESETS AT 11:11` folded into THIS WEEK). First render had the three
blocks stacked on each other — `text.height` reads 10 right after
`resize()` with `textAutoResize='HEIGHT'`, so the y-cursor must not trust it;
re-seated at 412/486/560. Holo `Skip the queue ✦`.

## P-03 — Change City (x=4580) · `1550:855`
Source `209:592`. Utility: title `Change city`, `READING FROM` → `Field ·
search` (panel row, drawn magnifier vector, placeholder @0.4), `LIVE CITIES`
→ rows Houston (value `Current · home`), Austin, Dallas, then `ONE CHANGE A
WEEK` and `THEY ARE TOLD` bodies from the source, holo `Pick a city ✦`.

## A-01 — About Align (x=5030) · `1550:8397`
Source `164:150`. Mark `1100:1928` cloned → `Mark · Align (0.5)` `1550:8475`,
`rescale(0.5)` = 178×178, centred at x106, **top** y=120 (the brief's "centred
at y≈120" read as the mark's top edge; centring its middle there would put it
under the status bar). Centred eyebrow, headline *It started with / my
mother.*, two paragraphs 13/20 @0.8 (the third source paragraph, "older than
any app", was cut — it ran into the holo), holo `Keep reading ✦`, version
line `ALIGN 1.0 (88) · HOUSTON · CAST UNDER A TAURUS SUN` @0.4. Starfield 0.7.
0.82% — the chakra column is the only colour on the screen.

## A-02 — About Align · Space City (x=5480) · `1550:8500`
Source `171:160`. No art. Eyebrow, headline *Astrology is not / the
aesthetic.*, body in EB Garamond Regular 16/24 cream @0.85 centred (two
paragraphs), caps `SPACE CITY FIRST`, the Houston line, closing line in EB
Garamond Italic, holo `Done ✦`.

## Unsure / for review
- S-12's trial length: headline now says seven days to match the timeline;
  the source frame said three. If three is the real offer, change the
  headline and the third step label together.
- S-19 uses "Juniper" where the source said "Jules"; swap back if Jules is a
  distinct person in the notification fixtures.
- S-12 haze 28.9% is the scorer counting the gold field as off-hue against the
  violet ground; accent itself is 21.3%.
