// nt2e50: EXPLAIN IT BADLY, "A talk card, explained badly." (20 s vertical, Trends Vol. 2 ep 50, music: chiptune · G)
// Format kit: ../../nt2e46/scenes/badkit.js. Story 0–15.6, then the shared end card. Tie-in: talk cards (a real feature).
//   0.0–2.1    hook "Explain *a talk card* | badly." ♉ Taurus at the whiteboard, drawing a card with a cake on it.
//   2.1        1 "it’s a card. *it asks a question.*"  a card, a big question mark.
//   4.85       2 "you both have to be honest. *scary.*"  two stick figures: "!!" "eek."
//   7.6        (card cut) 3 "it’s dessert, *but for feelings.*"  a cake slice with a heart = the card.
//   11.35      stamp "…accurate."  THE STARS: "*Dessert*, but feelings."  Pisces: A+.
import { makeBad, scribble, circle, stick, write, MARKER, BX, BY, B } from '../../nt2e46/scenes/badkit.js'
const { clamp } = B
const [BLU, RED, GRN] = MARKER
const rect = (x, X, Y, w, h, p, col, lw) => scribble(x, [[X, Y], [X + w, Y], [X + w, Y + h], [X, Y + h], [X, Y]], p, col, lw)
function cake(x, cx, cy, s, p) {
  scribble(x, [[cx - s, cy + s * 0.5], [cx + s, cy + s * 0.5], [cx + s, cy - s * 0.1], [cx - s, cy + s * 0.2], [cx - s, cy + s * 0.5]], clamp(p * 2), '#c9844a')
  scribble(x, [[cx - s, cy + s * 0.2], [cx + s, cy - s * 0.1]], clamp(p * 2 - 0.5), RED, 8)
  circle(x, cx + s * 0.6, cy - s * 0.32, s * 0.12, clamp(p * 3 - 1.8), RED, 8)
}
const heart = (x, cx, cy, s, p, col = RED) => scribble(x, [[cx, cy + s], [cx - s, cy], [cx - s * 0.9, cy - s * 0.7], [cx, cy - s * 0.4], [cx + s * 0.9, cy - s * 0.7], [cx + s, cy], [cx, cy + s]], p, col, 8)
const EP = makeBad({
  id: 'nt2e50', hero: 'taurus', thing: 'a talk card', accent: '#9fe6b0', deep: '#1f8a5c',
  hookDoodle(x, t) { const p = 0.8 + t / 2.2; rect(x, BX + 300, BY + 120, 240, 340, clamp(p * 2), BLU); cake(x, BX + 420, BY + 300, 80, p - 0.3) },
  steps: [
    { caption: 'it’s a card. *it asks a question.*',
      doodle(x, t, { p }) { rect(x, BX + 300, BY + 110, 240, 360, clamp(p * 2), BLU); write(x, '?', BX + 420, BY + 290, clamp(p * 2 - 0.8), { size: 200, col: RED }) } },
    { caption: 'you both have to be honest. *scary.*',
      doodle(x, t, { p, u }) {
        const j = p > 1 ? 4 * Math.sin(u * 40) : 0
        stick(x, BX + 230 + j, BY + 450, 230, clamp(p * 2), BLU); stick(x, BX + 610 - j, BY + 450, 230, clamp(p * 2 - 0.3), BLU)
        write(x, '!!', BX + 230, BY + 130, clamp(p * 2 - 1.0), { size: 70, col: RED }); write(x, 'eek.', BX + 610, BY + 130, clamp(p * 2 - 1.2), { size: 52, col: RED })
      } },
    { caption: 'it’s dessert, *but for feelings.*',
      doodle(x, t, { p }) {
        cake(x, BX + 230, BY + 300, 120, p)
        heart(x, BX + 230, BY + 280, 34, clamp(p * 2 - 0.8))
        write(x, '=', BX + 420, BY + 300, clamp(p * 2 - 1.0), { size: 90, col: GRN })
        rect(x, BX + 530, BY + 150, 180, 260, clamp(p * 2 - 1.1), BLU); heart(x, BX + 620, BY + 280, 40, clamp(p * 2 - 1.5))
      } },
  ],
  last: '*Dessert*, but feelings.',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
