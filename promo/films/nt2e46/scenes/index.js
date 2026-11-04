// nt2e46: EXPLAIN IT BADLY, "A first date, explained badly." (20 s vertical, Trends Vol. 2 ep 46, music: chiptune · C)
// Format kit: ./badkit.js (shared by nt2e46–nt2e50). Story 0–15.6, then the shared end card.
//   0.0–2.1    hook "Explain *a first date* | badly." ♍ Virgo at the whiteboard, marker up, writing "first date".
//   2.1        1 "two strangers. one table. *a mutual interview.*"  two stick figures, a table, question marks.
//   4.85       2 "snacks are *involved.*"  a plate of snacks, circled three times.
//   7.6        (card cut) 3 "you both pretend you’re *not nervous.*"  two sweaty stick figures: "i'm chill." "me too."
//   11.35      stamp "…accurate."  THE STARS: "*Mutual* interview, honestly."  Pisces: A+.
import { makeBad, scribble, circle, stick, write, arrow, MARKER, BX, BY, B } from './badkit.js'
const { clamp } = B
const [BLU, RED, GRN] = MARKER

const EP = makeBad({
  id: 'nt2e46', hero: 'virgo', thing: 'a first date', accent: '#9fe6b0', deep: '#1f8a5c',
  hookDoodle(x, t) { write(x, 'first date', BX + 420, BY + 250, clamp(0.45 + t / 2.0), { size: 64, col: BLU }) },
  steps: [
    { caption: 'two strangers. one table. *a mutual interview.*',
      doodle(x, t, { p }) {
        stick(x, BX + 230, BY + 420, 220, clamp(p * 2), BLU); stick(x, BX + 610, BY + 420, 220, clamp(p * 2 - 0.3), BLU)
        scribble(x, [[BX + 300, BY + 400], [BX + 540, BY + 400]], clamp(p * 2 - 0.8), BLU)
        write(x, '?', BX + 230, BY + 170, clamp(p * 3 - 1.6), { size: 80, col: RED }); write(x, '?', BX + 610, BY + 170, clamp(p * 3 - 1.9), { size: 80, col: RED })
        write(x, 'INTERVIEW (both)', BX + 420, BY + 520, clamp(p * 2 - 1.2), { size: 40, col: GRN })
      } },
    { caption: 'snacks are *involved.*',
      doodle(x, t, { p }) {
        circle(x, BX + 420, BY + 320, 150, clamp(p * 2), BLU)
        for (let i = 0; i < 9; i++) { const a = i * 0.7, r = 40 + (i * 23) % 80; circle(x, BX + 420 + Math.cos(a) * r, BY + 320 + Math.sin(a) * r, 16, clamp(p * 3 - 1 - i * 0.08), GRN, 7) }
        circle(x, BX + 420, BY + 320, 200, clamp(p * 2 - 1.1), RED); circle(x, BX + 420, BY + 320, 220, clamp(p * 2 - 1.3), RED)
        write(x, 'SNACKS!!', BX + 700, BY + 110, clamp(p * 2 - 1.4), { size: 44, col: RED, rot: 0.12 })
      } },
    { caption: 'you both pretend you’re *not nervous.*',
      doodle(x, t, { p }) {
        stick(x, BX + 240, BY + 440, 220, clamp(p * 2), BLU); stick(x, BX + 600, BY + 440, 220, clamp(p * 2 - 0.3), BLU)
        // sweat drops
        for (const sx of [BX + 300, BX + 660]) scribble(x, [[sx, BY + 210], [sx + 12, BY + 240], [sx, BY + 250], [sx - 12, BY + 240], [sx, BY + 210]], clamp(p * 2 - 0.9), '#5ab0ff', 6)
        write(x, '"i\'m chill."', BX + 220, BY + 110, clamp(p * 2 - 1.1), { size: 34, col: RED })
        write(x, '"me too."', BX + 620, BY + 110, clamp(p * 2 - 1.4), { size: 34, col: RED })
        // a heart between them
        scribble(x, [[BX + 420, BY + 400], [BX + 380, BY + 360], [BX + 385, BY + 325], [BX + 420, BY + 340], [BX + 455, BY + 325], [BX + 460, BY + 360], [BX + 420, BY + 400]], clamp(p * 2 - 1.6), RED, 8)
        void arrow
      },
      cues: [['pop', 2.0, 1318.51, 0.03, 0], ['pop', 2.1, 1567.98, 0.03, 0]] },
  ],
  last: '*Mutual* interview, honestly.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
