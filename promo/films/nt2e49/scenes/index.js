// nt2e49: EXPLAIN IT BADLY, "Meeting the parents, explained badly." (20 s vertical, Trends Vol. 2 ep 49, music: chiptune · F)
// Format kit: ../../nt2e46/scenes/badkit.js. Story 0–15.6, then the shared end card.
//   0.0–2.1    hook "Explain *meeting the parents* | badly." ♊ Gemini at the whiteboard, sketching a lasagna.
//   2.1        1 "a job interview, *with lasagna.*"  a desk, a stick figure, a lasagna, "HIRED?"
//   4.85       2 "your baby photos are *the slideshow.*"  a screen with a baby face, "next →"
//   7.6        (card cut) 3 "secret: they’re *nervous too.*"  two parent figures, sweating: "do they like us??"
//   11.35      stamp "…accurate."  THE STARS: "*Lasagna* diplomacy."  Pisces: A+.
import { makeBad, scribble, circle, stick, write, arrow, MARKER, BX, BY, B } from '../../nt2e46/scenes/badkit.js'
const { clamp } = B
const [BLU, RED, GRN] = MARKER
const rect = (x, X, Y, w, h, p, col, lw) => scribble(x, [[X, Y], [X + w, Y], [X + w, Y + h], [X, Y + h], [X, Y]], p, col, lw)
function lasagna(x, X, Y, w, p) {
  rect(x, X, Y, w, w * 0.45, clamp(p * 2), RED)
  for (let k = 1; k < 3; k++) { const pts = []; for (let i = 0; i <= 12; i++) pts.push([X + i / 12 * w, Y + k * w * 0.15 + Math.sin(i * 1.4) * 8]); scribble(x, pts, clamp(p * 2 - 0.6 - k * 0.2), '#f2a33a', 7) }
}
const EP = makeBad({
  id: 'nt2e49', hero: 'gemini', thing: 'meeting the parents', accent: '#ffd45c', deep: '#b0820c',
  hookDoodle(x, t) { lasagna(x, BX + 260, BY + 230, 320, 0.8 + t / 2.2) },
  steps: [
    { caption: 'a job interview, *with lasagna.*',
      doodle(x, t, { p }) {
        stick(x, BX + 200, BY + 440, 220, clamp(p * 2), BLU)
        scribble(x, [[BX + 300, BY + 420], [BX + 760, BY + 420]], clamp(p * 2 - 0.5), BLU)
        lasagna(x, BX + 430, BY + 300, 220, p - 0.4)
        write(x, 'HIRED?', BX + 620, BY + 140, clamp(p * 2 - 1.3), { size: 48, col: GRN, rot: -0.08 })
      } },
    { caption: 'your baby photos are *the slideshow.*',
      doodle(x, t, { p }) {
        rect(x, BX + 170, BY + 110, 500, 330, clamp(p * 2), BLU)
        circle(x, BX + 420, BY + 270, 90, clamp(p * 2 - 0.6), RED)
        circle(x, BX + 390, BY + 250, 8, clamp(p * 3 - 1.8), RED, 8); circle(x, BX + 450, BY + 250, 8, clamp(p * 3 - 1.8), RED, 8)
        scribble(x, [[BX + 385, BY + 300], [BX + 420, BY + 320], [BX + 455, BY + 300]], clamp(p * 3 - 2), RED, 7)
        write(x, 'next →', BX + 600, BY + 520, clamp(p * 2 - 1.3), { size: 40, col: GRN })
      } },
    { caption: 'secret: they’re *nervous too.*',
      doodle(x, t, { p }) {
        stick(x, BX + 300, BY + 470, 260, clamp(p * 2), BLU); stick(x, BX + 540, BY + 470, 260, clamp(p * 2 - 0.3), BLU)
        for (const sx of [BX + 370, BX + 610]) scribble(x, [[sx, BY + 210], [sx + 12, BY + 240], [sx, BY + 250], [sx - 12, BY + 240], [sx, BY + 210]], clamp(p * 2 - 0.9), '#5ab0ff', 6)
        write(x, '"do they like us??"', BX + 420, BY + 110, clamp(p * 2 - 1.1), { size: 38, col: RED })
        void arrow
      } },
  ],
  last: '*Lasagna* diplomacy.',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
