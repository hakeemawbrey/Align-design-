// nt2e48: EXPLAIN IT BADLY, "Cuffing season, explained badly." (20 s vertical, Trends Vol. 2 ep 48, music: chiptune · Eb)
// Format kit: ../../nt2e46/scenes/badkit.js. Story 0–15.6, then the shared end card.
//   0.0–2.1    hook "Explain *cuffing season* | badly." ♒ Aquarius at the whiteboard, drawing a penguin.
//   2.1        1 "it gets cold. humans huddle. *like penguins.*"  two penguins huddled, snowflakes. (Emperor penguins
//              really do huddle together for warmth.)
//   4.85       2 "a blanket, but *it talks back.*"  a blanket with a speech bubble: "hi :)"
//   7.6        (card cut) 3 "the blanket’s optional. *the person isn’t.*"  blanket crossed out; two figures, a heart.
//   11.35      stamp "…accurate."  THE STARS: "Penguins *get* it."  Pisces: A+.
import { makeBad, scribble, circle, stick, write, MARKER, BX, BY, B } from '../../nt2e46/scenes/badkit.js'
const { clamp } = B
const [BLU, RED, GRN] = MARKER
const rect = (x, X, Y, w, h, p, col, lw) => scribble(x, [[X, Y], [X + w, Y], [X + w, Y + h], [X, Y + h], [X, Y]], p, col, lw)
function penguin(x, cx, cy, s, p) {
  const pts = []; for (let i = 0; i <= 30; i++) { const a = i / 30 * Math.PI * 2; pts.push([cx + Math.cos(a) * s * 0.45, cy + Math.sin(a) * s * 0.75]) }
  scribble(x, pts, clamp(p * 2), BLU)
  const bel = []; for (let i = 0; i <= 24; i++) { const a = i / 24 * Math.PI * 2; bel.push([cx + Math.cos(a) * s * 0.25, cy + s * 0.15 + Math.sin(a) * s * 0.45]) }
  scribble(x, bel, clamp(p * 2 - 0.7), BLU, 6)
  circle(x, cx - s * 0.12, cy - s * 0.4, 5, clamp(p * 3 - 2), BLU, 8); circle(x, cx + s * 0.12, cy - s * 0.4, 5, clamp(p * 3 - 2), BLU, 8)
  scribble(x, [[cx - s * 0.08, cy - s * 0.28], [cx, cy - s * 0.2], [cx + s * 0.08, cy - s * 0.28]], clamp(p * 3 - 2.2), '#f2a33a', 7)
}
const flake = (x, cx, cy, p) => { scribble(x, [[cx - 18, cy], [cx + 18, cy]], p, '#5ab0ff', 5); scribble(x, [[cx, cy - 18], [cx, cy + 18]], p, '#5ab0ff', 5); scribble(x, [[cx - 13, cy - 13], [cx + 13, cy + 13]], p, '#5ab0ff', 5) }
function blanket(x, p) { rect(x, BX + 200, BY + 300, 440, 200, clamp(p * 2), RED, 9); for (let i = 1; i < 4; i++) scribble(x, [[BX + 200 + i * 110, BY + 300], [BX + 200 + i * 110, BY + 500]], clamp(p * 2 - 0.6), RED, 5) }

const EP = makeBad({
  id: 'nt2e48', hero: 'aquarius', thing: 'cuffing season', accent: '#7fd0ff', deep: '#1f6fae',
  hookDoodle(x, t) { penguin(x, BX + 420, BY + 330, 220, 0.8 + t / 2.2) },
  steps: [
    { caption: 'it gets cold. humans huddle. *like penguins.*',
      doodle(x, t, { p }) {
        penguin(x, BX + 340, BY + 340, 220, p); penguin(x, BX + 500, BY + 350, 210, p - 0.3)
        for (let i = 0; i < 5; i++) flake(x, BX + 100 + i * 160, BY + 110 + (i % 2) * 40, clamp(p * 2 - 1 - i * 0.1))
        write(x, 'HUDDLE', BX + 420, BY + 560, clamp(p * 2 - 1.3), { size: 40, col: GRN })
      } },
    { caption: 'a blanket, but *it talks back.*',
      doodle(x, t, { p }) {
        blanket(x, p)
        rect(x, BX + 470, BY + 120, 220, 110, clamp(p * 2 - 1.0), BLU, 8); scribble(x, [[BX + 520, BY + 230], [BX + 500, BY + 290], [BX + 570, BY + 230]], clamp(p * 2 - 1.2), BLU, 8)
        write(x, 'hi :)', BX + 580, BY + 176, clamp(p * 2 - 1.3), { size: 44, col: BLU })
      } },
    { caption: 'the blanket’s optional. *the person isn’t.*',
      doodle(x, t, { p }) {
        x.save(); x.translate(-130, 40); x.scale(0.6, 0.6); x.translate(BX * 0.66, BY * 0.66); blanket(x, 2); x.restore()
        scribble(x, [[BX + 140, BY + 260], [BX + 420, BY + 470]], clamp(p * 2), GRN, 10); scribble(x, [[BX + 420, BY + 260], [BX + 140, BY + 470]], clamp(p * 2 - 0.3), GRN, 10)
        write(x, 'optional', BX + 280, BY + 540, clamp(p * 2 - 0.5), { size: 30, col: '#8a8fb0' })
        stick(x, BX + 560, BY + 450, 200, clamp(p * 2 - 0.7), BLU); stick(x, BX + 720, BY + 450, 200, clamp(p * 2 - 1.0), BLU)
        scribble(x, [[BX + 640, BY + 200], [BX + 605, BY + 165], [BX + 610, BY + 135], [BX + 640, BY + 150], [BX + 670, BY + 135], [BX + 675, BY + 165], [BX + 640, BY + 200]], clamp(p * 2 - 1.5), RED, 8)
      } },
  ],
  last: 'Penguins *get* it.',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
