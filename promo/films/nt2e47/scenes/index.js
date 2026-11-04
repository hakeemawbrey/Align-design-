// nt2e47: EXPLAIN IT BADLY, "A crush, explained badly." (20 s vertical, Trends Vol. 2 ep 47, music: chiptune · D)
// Format kit: ../../nt2e46/scenes/badkit.js. Story 0–15.6, then the shared end card.
//   0.0–2.1    hook "Explain *a crush* | badly." ♑ Capricorn at the whiteboard, writing "a crush".
//   2.1        1 "your brain opens *a tab.*"  a head, and a little tab labelled THEM.
//   4.85       2 "the tab *never closes.*"  the tab's ✕, crossed out: "NOPE." (still open)
//   7.6        (card cut) 3 "you re-read one ‘haha’ *for an hour.*"  a "haha" bubble, a clock going round, tally marks.
//   11.35      stamp "…accurate."  THE STARS: "Tab *still* open."  Pisces: A+.
import { makeBad, scribble, circle, stick, write, arrow, MARKER, BX, BY, B } from '../../nt2e46/scenes/badkit.js'
const { clamp } = B
const [BLU, RED, GRN] = MARKER
const rect = (x, X, Y, w, h, p, col, lw) => scribble(x, [[X, Y], [X + w, Y], [X + w, Y + h], [X, Y + h], [X, Y]], p, col, lw)
function tab(x, X, Y, p, col) {
  scribble(x, [[X, Y + 70], [X + 20, Y], [X + 230, Y], [X + 250, Y + 70]], clamp(p * 2), col)
  write(x, 'THEM', X + 110, Y + 38, clamp(p * 2 - 0.8), { size: 34, col })
  write(x, '×', X + 205, Y + 36, clamp(p * 2 - 1.2), { size: 40, col: '#8a8fb0' })
}
function head(x, p) { circle(x, BX + 420, BY + 320, 200, clamp(p * 1.6), BLU); write(x, 'brain', BX + 420, BY + 470, clamp(p * 2 - 1), { size: 30, col: '#8a8fb0' }) }

const EP = makeBad({
  id: 'nt2e47', hero: 'capricorn', thing: 'a crush', accent: '#b8a07a', deep: '#7a5a2c',
  hookDoodle(x, t) { write(x, 'a crush', BX + 420, BY + 250, clamp(0.75 + t / 2.0), { size: 64, col: BLU }) },
  steps: [
    { caption: 'your brain opens *a tab.*',
      doodle(x, t, { p }) { head(x, p); tab(x, BX + 295, BY + 230, Math.max(0, p - 0.6), RED) } },
    { caption: 'the tab *never closes.*',
      doodle(x, t, { p }) {
        head(x, 2); tab(x, BX + 295, BY + 230, 2, RED)
        circle(x, BX + 500, BY + 266, 40, clamp(p * 2 - 0.2), GRN)
        arrow(x, [BX + 700, BY + 140], [BX + 545, BY + 240], clamp(p * 2 - 0.6), GRN)
        write(x, 'NOPE.', BX + 720, BY + 110, clamp(p * 2 - 1.0), { size: 46, col: GRN, rot: 0.1 })
        write(x, '(still open)', BX + 420, BY + 560, clamp(p * 2 - 1.4), { size: 30, col: '#8a8fb0' })
      } },
    { caption: 'you re-read one ‘haha’ *for an hour.*',
      doodle(x, t, { p, u }) {
        // the bubble
        rect(x, BX + 90, BY + 150, 300, 140, clamp(p * 2), BLU, 9); scribble(x, [[BX + 140, BY + 290], [BX + 120, BY + 340], [BX + 190, BY + 290]], clamp(p * 2 - 0.6), BLU)
        write(x, 'haha', BX + 240, BY + 222, clamp(p * 2 - 0.5), { size: 56, col: BLU })
        // the clock, hands spinning
        circle(x, BX + 610, BY + 260, 120, clamp(p * 2 - 0.4), RED)
        if (p > 0.8) { const a = u * 7, b = u * 0.6; scribble(x, [[BX + 610, BY + 260], [BX + 610 + Math.cos(a) * 95, BY + 260 + Math.sin(a) * 95]], 1, RED, 8); scribble(x, [[BX + 610, BY + 260], [BX + 610 + Math.cos(b) * 60, BY + 260 + Math.sin(b) * 60]], 1, RED, 10) }
        // tally marks
        for (let i = 0; i < 12; i++) { const gx = BX + 120 + i * 50 + Math.floor(i / 5) * 20; if (i % 5 === 4) scribble(x, [[gx - 210, BY + 470], [gx + 10, BY + 420]], clamp(p * 3 - 2 - i * 0.05), GRN, 7); else scribble(x, [[gx, BY + 410], [gx, BY + 480]], clamp(p * 3 - 2 - i * 0.05), GRN, 7) }
        void stick
      } },
  ],
  last: 'Tab *still* open.',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
