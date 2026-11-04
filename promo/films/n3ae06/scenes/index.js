// n3ae06 · 3 AM IN WINTER 6: "Virgo's 3 AM pros and cons" (16 s vertical, star_advice trial reel, lofi Dm).
// Rows: promo/films/next30/b40.md. The format engine is ../../n3ae01/amkit.js (shared by n3ae01–n3ae12).
//   0      "3 AM. A list. | *Virgo* is deciding."  Virgo with a notepad: two ticks under PRO, then one line under CON.
//   1.5 / 3.6 / 5.7   thoughts: pro: they're *kind* · pro: they laugh at my jokes · con: …*I'm scared.*
//   7.5    beat change. THE STARS in the window: "Scared isn't a con. It means it *matters*."
//   ~10.4  last line: "Scared means it *matters*."  ♓ Pisces cries all film (in the lit window across the street).
import { makeAM, R, INK, MONO, INTER, pop01, outK } from '../../n3ae01/amkit.js'

const AM = makeAM({
  sign: 'virgo',
  caption: "3 AM. A list. | *Virgo* is deciding.", captionAccent: '#ffb0d0',
  thoughts: ["pro: they're *kind*", "pro: they laugh at my jokes", "con: …*I'm scared.*"],
  line: "Scared isn't a con. It means it *matters*.",
  last: "Scared means it *matters*.", lastAccent: '#ffb0d0',
  me: { x: 300, y: 1228, s: 250 },
  over(x, t, W) {
    const { T } = W

    // the notepad: PRO / CON with ticks appearing on each thought
    const N = { x: 470, y: 1150, w: 230, h: 250 }
    x.save(); x.translate(N.x + N.w / 2, N.y + N.h / 2); x.rotate(0.06)
    R(x, INK, -N.w / 2 - 5, -N.h / 2 - 5, N.w + 10, N.h + 10); R(x, '#fffbe8', -N.w / 2, -N.h / 2, N.w, N.h); R(x, '#ef5c94', -N.w / 2, -N.h / 2, N.w, 22)
    for (let i = 0; i < 6; i++) R(x, '#bcd3f0', -N.w / 2 + 10, -N.h / 2 + 50 + i * 34, N.w - 20, 2)
    W.label(x, 'PRO', -N.w / 2 + 50, -N.h / 2 + 44, { size: 20, col: '#2a8a5a', font: MONO })
    W.label(x, 'CON', N.w / 2 - 50, -N.h / 2 + 44, { size: 20, col: '#c0305a', font: MONO })
    const tick = (u, v, k) => { if (k <= 0.01) return; x.save(); x.translate(u, v); x.scale(k, k); W.label(x, '✓', 0, 0, { size: 34, col: '#2a8a5a', font: INTER, weight: 800 }); x.restore() }
    tick(-N.w / 2 + 50, -N.h / 2 + 90, pop01(t, T.th[0] + 0.1, 0.3, 2.4))
    tick(-N.w / 2 + 50, -N.h / 2 + 130, pop01(t, T.th[1] + 0.1, 0.3, 2.4))
    const ck = pop01(t, T.th[2] + 0.15, 0.3, 2.4)
    if (ck > 0.01) { x.save(); x.translate(N.w / 2 - 50, -N.h / 2 + 90); x.scale(ck, ck); R(x, '#c0305a', -22, -3, 44, 6); x.restore() }
    x.restore()
  },
})
void INK; void MONO; void INTER; void pop01; void outK; void R

export const DURATION = AM.DURATION
export const SCENES = AM.SCENES
export const CUES = AM.CUES
export const MUSIC = AM.MUSIC
export const TIMES = AM.T
