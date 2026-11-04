// n3ae10 · 3 AM IN WINTER 10: "Capricorn writes next year's goals" (18 s vertical, star_advice trial reel, lofi F#m).
// Rows: promo/films/next30/b40.md. The format engine is ../../n3ae01/amkit.js (shared by n3ae01–n3ae12).
//   0      "3 AM. Goals. | *Capricorn* is planning."  Capricorn writes in a planner; after the cut goal 3 moves to the top with a little heart.
//   1.5 / 3.6 / 5.7   thoughts: goal 1: the promotion · goal 2: save more · goal 3: …call them back *more*
//   7.5    card cut. THE STARS in the window: "Put the people on the list *first*."
//   ~10.4  last line: "People go *first*."  ♓ Pisces cries all film (in the lit window across the street).
import { makeAM, R, INK, MONO, INTER, pop01, outK, lerp, ease, prog } from '../../n3ae01/amkit.js'

const AM = makeAM({
  sign: 'capricorn',
  caption: "3 AM. Goals. | *Capricorn* is planning.", captionAccent: '#8ff0c8',
  thoughts: ["goal 1: the promotion", "goal 2: save more", "goal 3: …call them back *more*"],
  line: "Put the people on the list *first*.",
  last: "People go *first*.", lastAccent: '#8ff0c8',
  me: { x: 300, y: 1228, s: 250 },
  over(x, t, W) {
    const { T } = W

    // the planner: three goals; after the cut, goal 3 moves to the top with a heart
    const N = { x: 470, y: 1130, w: 260, h: 260 }
    x.save(); x.translate(N.x + N.w / 2, N.y + N.h / 2); x.rotate(-0.05)
    R(x, INK, -N.w / 2 - 5, -N.h / 2 - 5, N.w + 10, N.h + 10); R(x, '#f6f2e6', -N.w / 2, -N.h / 2, N.w, N.h); R(x, '#2fc79a', -N.w / 2, -N.h / 2, 18, N.h)
    W.label(x, 'GOALS', 10, -N.h / 2 + 30, { size: 22, col: INK, font: MONO })
    const rows = ['promotion', 'save more', 'call them']
    const sw = ease.inOutCubic(prog(t, T.cut + 0.6, T.cut + 1.3))
    rows.forEach((s, i) => {
      const k = pop01(t, T.th[i] + 0.1, 0.3, 2)
      if (k <= 0.01) return
      const slot = i === 2 ? lerp(2, 0, sw) : i + sw
      const v = -N.h / 2 + 80 + slot * 52
      x.save(); x.globalAlpha *= k
      W.label(x, `${i === 2 ? 1 + Math.round(2 * (1 - sw)) : i + 1 + Math.round(sw)}. ${s}`, -N.w / 2 + 34, v, { size: 22, col: i === 2 ? '#c0305a' : INK, font: MONO, align: 'left' })
      if (i === 2 && sw > 0.5) W.heart(x, N.w / 2 - 22, v, 3)
      x.restore()
    })
    x.restore()
  },
})
void INK; void MONO; void INTER; void pop01; void outK; void R

export const DURATION = AM.DURATION
export const SCENES = AM.SCENES
export const CUES = AM.CUES
export const MUSIC = AM.MUSIC
export const TIMES = AM.T
