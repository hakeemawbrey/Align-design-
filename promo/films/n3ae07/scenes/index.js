// n3ae07 · 3 AM IN WINTER 7: "Libra moves the couch for a date night in" (18 s vertical, star_advice trial reel, lofi Ebm).
// Rows: promo/films/next30/b40.md. The format engine is ../../n3ae01/amkit.js (shared by n3ae01–n3ae12).
//   0      "Date night tomorrow. | *Libra* is redecorating."  A little couch slides left and right with each thought; fourteen candles pop up along the floor.
//   1.5 / 3.6 / 5.7   thoughts: couch *here*? · no… *there*. · candles: 1, 2, 3… *14*.
//   7.5    card cut. THE STARS in the window: "They're coming to see *you*, not the couch."
//   ~10.4  last line: "They're coming for *you*."  ♓ Pisces cries all film (in the lit window across the street).
import { makeAM, R, INK, MONO, INTER, pop01, outK, lerp, ease, prog } from '../../n3ae01/amkit.js'

const AM = makeAM({
  sign: 'libra',
  caption: "Date night tomorrow. | *Libra* is redecorating.", captionAccent: '#f0a0ff',
  thoughts: ["couch *here*?", "no… *there*.", "candles: 1, 2, 3… *14*."],
  line: "They're coming to see *you*, not the couch.",
  last: "They're coming for *you*.", lastAccent: '#f0a0ff',
  me: { x: 300, y: 1228, s: 250 },
  under(x, t, W) {
    const { T } = W

    // the couch slides with each thought
    const cxs = [640, 600, 700, 660]
    const seg = t < T.th[0] ? 0 : t < T.th[1] ? 1 : t < T.th[2] ? 2 : 3
    const from = cxs[Math.max(0, seg - 1)], to = cxs[seg], at = seg ? T.th[seg - 1] : 0
    const cx = lerp(from, to, ease.inOutCubic(prog(t, at, at + 0.5)))
    R(x, INK, cx - 90, 1300, 180, 110); R(x, '#d070c8', cx - 84, 1306, 168, 60); R(x, '#b058a8', cx - 84, 1360, 168, 44)
    R(x, INK, cx - 104, 1330, 28, 80); R(x, INK, cx + 76, 1330, 28, 80); R(x, '#e090d8', cx - 100, 1334, 20, 72); R(x, '#e090d8', cx + 80, 1334, 20, 72)
  },
  over(x, t, W) {
    const { T } = W

    // fourteen candles along the floor
    const n = t < T.th[2] ? 0 : Math.min(14, Math.floor((t - T.th[2]) * 9) + 1)
    for (let i = 0; i < n; i++) {
      const u = 70 + i * 68, v = 1760
      R(x, INK, u - 12, v - 34, 24, 50); R(x, '#fff3d8', u - 8, v - 30, 16, 42)
      const f = 0.8 + 0.2 * Math.sin(t * 12 + i)
      R(x, '#ffb84a', u - 5, v - 50 * f, 10, 16 * f); R(x, '#fff2a8', u - 2, v - 44 * f, 4, 8)
    }
  },
})
void INK; void MONO; void INTER; void pop01; void outK; void R

export const DURATION = AM.DURATION
export const SCENES = AM.SCENES
export const CUES = AM.CUES
export const MUSIC = AM.MUSIC
export const TIMES = AM.T
