// naske18 · Ask the Stars, Volume 2, ep 18 · "I can't stop noticing their flaws." (20 s, star_advice post)
// Story 0–15.6, then the shared end card. The look lives in ../../naske01/askkit.js.
//   0.00  frame 0: the DM; ♍ Virgo, pen raised, ticking a clipboard list that keeps growing: SOCKS: MISMATCHED…
//   2.5   VIRGO: "noticing is your gift. judging is a choice."  chip ♍ THE MAIDEN · MUTABLE EARTH
//   ~5.6  "write down three things you love, too."  The clipboard flips over: THINGS I LOVE. Lines write on.
//   ~8.6  "nobody's perfect. that's the good part."  The last line gets a heart: LAUGHS AT MY JOKES.
//   card cut → "Look for the *good*, | on purpose."  + CARD FIRST. FACE LAST. Pisces (left) cries happily.
import { askFilm, drawSign, drawBits, sparkles, floatHeart, spritePt, lerp, prog, ease, clamp, pop01, INK, HEART, HEART_C } from '../../naske01/askkit.js'

const CB = { x: 760, y: 830 }
const FLAWS = ['NOTES:', 'SOCKS: MISMATCHED', 'LAUGH: VERY LOUD', 'HUMS WHILE COOKING', 'SAYS "EXPRESSO"']
const LOVES = ['THINGS I LOVE:', 'REMEMBERS MY TEA', 'HOLDS THE DOOR', 'LAUGHS AT MY JOKES']

const F = askFilm({
  id: 'naske18', sign: 'virgo',
  question: "I can't stop *noticing* their flaws.",
  lines: ['noticing is your gift. judging is a choice.', 'write down three things you love, too.', "nobody's perfect. that's the good part."],
  chip: '♍ THE MAIDEN · MUTABLE EARTH',
  last: 'Look for the *good*, | on purpose.', late: 2, lastSize: 104, lastAccent: 144,
  tie: 'CARD FIRST. FACE LAST.',
  hero: { x: 380, y: 1020, size: 330 },
  extraT: T => ({ flip: [T.l[1] + 0.25, T.l[1] + 0.75], heart: T.l[2] + 1.0 }),
  state(t, T) {
    if (t < T.flip[0]) return { mood: 'squint', look: [1, -1] }
    if (t < T.flip[1] + 0.3) return { mood: 'wide', look: [1, -1] }
    if (t < T.heart) return { mood: 'neutral', look: [1, -1] }
    return { mood: 'heart', look: [1, -1] }
  },
  front(x, t, T, H) {
    const ok = H.ok
    if (ok <= 0.01) return
    const f = prog(t, ...T.flip), sx = Math.cos(Math.PI * f), back = f > 0.5
    const list = back ? LOVES : FLAWS
    const shown = back ? 1 + Math.min(3, Math.floor(Math.max(0, t - T.flip[1]) / 0.8) + 1) : Math.min(FLAWS.length, 2 + Math.floor((t + 0.4) / 0.9))
    const txt = list.slice(0, shown).join('\n') + '\n'.repeat(list.length - shown)
    x.save(); x.translate(CB.x, CB.y + Math.sin(t * 2) * 4); x.scale(Math.max(0.03, Math.abs(sx)) * ok, ok); x.rotate(0.04)
    // the board + clip
    x.fillStyle = INK; x.fillRect(-250, -200, 500, 400); x.fillStyle = '#b8743c'; x.fillRect(-244, -194, 488, 388)
    drawSign(x, 0, 10, txt, { w: 440, size: 31, lh: 1.45, color: back ? '#ef5c94' : '#aab3c8', align: 'left', pad: 22 })
    x.fillStyle = INK; x.fillRect(-70, -222, 140, 50); x.fillStyle = '#c9c4d8'; x.fillRect(-64, -216, 128, 38)
    // ticks on the flaw side
    if (!back) for (let i = 1; i < shown; i++) { x.fillStyle = '#c8283c'; x.font = "800 34px Inter, sans-serif"; x.fillText('✓', 175, -145 + i * 45 + 22) }
    x.restore()
    if (t > T.heart) drawBits(x, HEART, HEART_C, CB.x + 205, CB.y + 95, 9 * pop01(t, T.heart, 0.3, 2.8) * ok)
    sparkles(x, t, CB.x + 205, CB.y + 95, T.heart, 10, 100, 1)
    // the pen in its tip, writing
    const p = spritePt(H.F, 31, 12)
    x.save(); x.translate(p.x + 40 + Math.sin(t * 14) * 6, p.y - 40); x.rotate(-0.7)
    x.fillStyle = INK; x.fillRect(-10, -70, 20, 90); x.fillStyle = '#ef5c94'; x.fillRect(-6, -66, 12, 70); x.fillStyle = '#f5eedf'; x.fillRect(-6, 4, 12, 12)
    x.restore()
    floatHeart(x, t, T.h2Land, H.x + 60, H.y - 220)
  },
  cues: T => [
    ...Array.from({ length: 4 }, (_, i) => ['tick', 0.5 + i * 0.9, 0.035]),
    ['whoosh', T.flip[0], 0.5, 0.04], ['pop', T.flip[1], 987.77, 0.035, 0.3],
    ...Array.from({ length: 3 }, (_, i) => ['pluck', T.flip[1] + 0.8 * (i + 1), [659.25, 739.99, 880][i], 0.025, 0.4, 0.3]),
    ['pop', T.heart, 1567.98, 0.04, 0.3], ['glitter', T.heart, T.heart + 0.5],
  ],
})
export const { DURATION, SCENES, CUES, T, DROP } = F
export default F
