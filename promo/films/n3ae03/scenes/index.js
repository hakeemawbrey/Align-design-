// n3ae03 · 3 AM IN WINTER 3: "Gemini counts snowflakes, not sheep" (18 s vertical, star_advice trial reel, lofi Bm).
// Rows: promo/films/next30/b40.md. The format engine is ../../n3ae01/amkit.js (shared by n3ae01–n3ae12).
//   0      "Can't sleep. | *Gemini* counts snowflakes."  Gemini at the window counting; a FLAKES counter by the window climbs 1 → 2 → 48.
//   1.5 / 3.6 / 5.7   thoughts: flake 1: do they like *snow*? · flake 2: cats or dogs? · flake 48: their *middle name*?
//   7.5    card cut. THE STARS in the window: "Save them for coffee. Ask *one* at a time."
//   ~10.4  last line: "One question *at a time*."  ♓ Pisces cries all film (in the lit window across the street).
import { makeAM, R, INK, MONO, INTER, pop01, outK } from '../../n3ae01/amkit.js'

const AM = makeAM({
  sign: 'gemini',
  caption: "Can't sleep. | *Gemini* counts snowflakes.", captionAccent: '#fff08a',
  thoughts: ["flake 1: do they like *snow*?", "flake 2: cats or dogs?", "flake 48: their *middle name*?"],
  line: "Save them for coffee. Ask *one* at a time.",
  last: "One question *at a time*.", lastAccent: '#fff08a',
  me: { x: 420, y: 1228, s: 250 },

  mood(t, T) {
    if (t < T.cut) return { mood: t < T.th[2] ? 'sparkle' : 'wide', look: [0.3, -1], sweat: t > T.th[2] ? 2 : 0 }
    return null
  },
  over(x, t, W) {
    const { T } = W

    // the flake counter, stuck on the wall by the window
    const n = t < T.th[0] ? 0 : t < T.th[1] ? 1 : t < T.th[2] ? 2 : Math.min(48, Math.round(2 + (t - T.th[2]) * 60))
    const k = outK(t, [T.cut - 0.2, T.cut + 0.1])
    if (k > 0.01) {
      x.save(); x.globalAlpha *= k
      R(x, INK, 856, 990, 200, 80); R(x, '#fff8d8', 862, 996, 188, 68)
      W.label(x, 'FLAKES', 956, 1014, { size: 18, col: INK, font: MONO })
      W.label(x, String(n), 956, 1044, { size: 34, col: '#e0306a', font: MONO })
      x.restore()
    }
  },
})
void INK; void MONO; void INTER; void pop01; void outK; void R

export const DURATION = AM.DURATION
export const SCENES = AM.SCENES
export const CUES = AM.CUES
export const MUSIC = AM.MUSIC
export const TIMES = AM.T
