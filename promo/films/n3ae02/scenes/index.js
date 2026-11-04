// n3ae02 · 3 AM IN WINTER 2: "Taurus, 3 AM toast, too comfy to date?" (18 s vertical, star_advice trial reel, lofi Bbm).
// Rows: promo/films/next30/b40.md. The format engine is ../../n3ae01/amkit.js (shared by n3ae01–n3ae12).
//   0      "3 AM. Toast. | *Taurus* is thinking."  Taurus on the bed edge with a slice of toast (bites vanish as it thinks), a blanket round its shoulders.
//   1.5 / 3.6 / 5.7   thoughts: toast at 3 AM: *perfect* · my life: also perfect · am I *too comfy* to date?
//   7.5    card cut. THE STARS in the window: "Cozy alone is a lovely place to *choose* from."
//   ~10.4  last line: "Choose from *cozy*."  ♓ Pisces cries all film (in the lit window across the street).
import { makeAM, R, INK, MONO, INTER, pop01, outK } from '../../n3ae01/amkit.js'

const AM = makeAM({
  sign: 'taurus',
  caption: "3 AM. Toast. | *Taurus* is thinking.", captionAccent: '#ffd27a',
  thoughts: ["toast at 3 AM: *perfect*", "my life: also perfect", "am I *too comfy* to date?"],
  line: "Cozy alone is a lovely place to *choose* from.",
  last: "Choose from *cozy*.", lastAccent: '#ffe0a0',
  me: { x: 340, y: 1228, s: 250 },
  over(x, t, W) {
    const { T } = W

    // the blanket round the shoulders and the toast (one bite gone per thought)
    const F = W.starFrame(W.ME.x, W.ME.y, W.ME.s, t, { seed: 3 })
    const bites = t < T.th[0] ? 0 : t < T.th[1] ? 1 : t < T.th[2] ? 2 : 3
    const tx = W.ME.x + 150, ty = F.cy + 30
    R(x, INK, tx - 44, ty - 44, 88, 88); R(x, '#d9a25a', tx - 40, ty - 40, 80, 80); R(x, '#f4d9a0', tx - 30, ty - 30, 60, 62)
    for (let b = 0; b < bites; b++) { R(x, '#161340', tx + 20 - b * 26, ty - 48, 30, 22) }
    R(x, '#ffe58a', tx - 14, ty - 8, 28, 16)   // butter
    R(x, INK, W.ME.x - 140, F.cy + 40, 280, 70); R(x, '#a86fd0', W.ME.x - 134, F.cy + 46, 268, 58)
    for (let i = 0; i < 6; i++) R(x, '#c58ae6', W.ME.x - 120 + i * 44, F.cy + 60, 20, 20)
  },
})
void INK; void MONO; void INTER; void pop01; void outK; void R

export const DURATION = AM.DURATION
export const SCENES = AM.SCENES
export const CUES = AM.CUES
export const MUSIC = AM.MUSIC
export const TIMES = AM.T
