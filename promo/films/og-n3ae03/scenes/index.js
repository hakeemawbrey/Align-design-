// og-n3ae03: social rework (static HOOK box 0–3.4, og amkit copy (from og-n3ae06): no bug/caption pop/end pop-out, crazier thoughts). Was: n3ae03 · 3 AM IN WINTER 3: "Gemini counts snowflakes, not sheep" (16 s vertical, star_advice trial reel, lofi Bm).
// Rows: promo/films/next30/b40.md. The format engine is ../../n3ae01/amkit.js (shared by n3ae01–n3ae12).
//   0      "Can't sleep. | *Gemini* counts snowflakes."  Gemini at the window counting; a FLAKES counter by the window climbs 1 → 2 → 48.
//   1.5 / 3.6 / 5.7   thoughts: flake 1: do they like *snow*? · flake 2: cats or dogs? · flake 48: their *middle name*?
//   7.5    beat change. THE STARS in the window: "Save them for coffee. Ask *one* at a time."
//   ~10.4  last line: "One question *at a time*."  ♓ Pisces cries all film (in the lit window across the street).
import { makeAM, R, INK, MONO, INTER, pop01, outK } from '../amkit.js'

const AM = makeAM({
  sign: 'gemini',
  caption: "Can't sleep. | *Gemini* counts snowflakes.", captionAccent: '#fff08a',
  thoughts: ["flake 1: do they like *snow*?", "flake 2: cats or dogs? *both?*", "flake 48: their *5-year plan*?"],
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
      R(x, INK, 736, 1070, 200, 80); R(x, '#fff8d8', 742, 1076, 188, 68)   // og: clear of the side buttons and the thoughts
      W.label(x, 'FLAKES', 836, 1094, { size: 18, col: INK, font: MONO })
      W.label(x, String(n), 836, 1124, { size: 34, col: '#e0306a', font: MONO })
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

export const HOOK = "Gemini can't sleep: | *48 questions.*"
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 3.4
