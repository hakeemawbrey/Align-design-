// n3ae12 · 3 AM IN WINTER 12: "Pisces gets a 3 AM text from a friend" (18 s vertical, star_advice trial reel, lofi G#m).
// Rows: promo/films/next30/b40.md. The format engine is ../../n3ae01/amkit.js (shared by n3ae01–n3ae12).
//   0      "3 AM. Snowing. | *Pisces* can't sleep."  Pisces at the window, a little teary; the phone buzzes; Cancer waves from the lit window across the street; Pisces happy-sobs.
//   1.5 / 3.6 / 5.7   thoughts: long night… · *bzz* 'you up too?' · …they're up *too*.
//   7.5    card cut. THE STARS in the window: "Long nights are easier *together*. Check on your people."
//   ~10.4  last line: "Easier *together*."  ♓ Pisces cries all film (its own episode: Cancer is across the street).
import { makeAM, R, INK, MONO, INTER, pop01, outK } from '../../n3ae01/amkit.js'

const AM = makeAM({
  sign: 'pisces',
  caption: "3 AM. Snowing. | *Pisces* can't sleep.", captionAccent: '#b8b0ff',
  thoughts: ["long night…", "*bzz* 'you up too?'", "…they're up *too*."],
  line: "Long nights are easier *together*. Check on your people.",
  last: "Easier *together*.", lastAccent: '#b8b0ff',
  me: { x: 330, y: 1228, s: 250 },
  across: 'cancer', meTears: true,

  mood(t, T) {
    if (t < T.th[1]) return { mood: 'neutral', look: [0.3, -1] }
    if (t < T.th[2]) return { mood: 'wide', look: [1, 0] }
    if (t < T.cut) return { mood: 'sparkle', look: [0.6, -1] }
    return null
  },
  over(x, t, W) {
    const { T } = W

    // the phone buzzes at the second thought
    const k = pop01(t, T.th[1] - 0.05, 0.3, 2)
    if (k <= 0.01) return
    const F = W.starFrame(W.ME.x, W.ME.y, W.ME.s, t, { seed: 3 })
    const bz = t > T.th[1] && t < T.th[1] + 0.8 ? Math.sin(t * 60) * 4 : 0
    x.save(); x.translate(W.ME.x + 160 + bz, F.cy + 20); x.rotate(-0.1); x.scale(k, k)
    R(x, INK, -40, -65, 80, 130); R(x, '#2a2a40', -35, -60, 70, 120); R(x, '#9fd8ff', -29, -50, 58, 96)
    R(x, '#3fb6f0', -24, -40, 48, 20); R(x, '#ffffff', -24, -12, 40, 8); R(x, '#ffffff', -24, 2, 30, 8)
    x.restore()
  },
})
void INK; void MONO; void INTER; void pop01; void outK; void R

export const DURATION = AM.DURATION
export const SCENES = AM.SCENES
export const CUES = AM.CUES
export const MUSIC = AM.MUSIC
export const TIMES = AM.T
