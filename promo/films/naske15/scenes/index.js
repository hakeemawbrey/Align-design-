// naske15 · Ask the Stars, Volume 2, ep 15 · "I keep changing my mind about them." (18 s, star_advice post)
// Story 0–15.6, then the short end card (2.4 s). The look lives in ../../naske01/askkit.js.
//   0.00  frame 0: the DM; ♊ Gemini mid-pluck at a big pixel flower, a petal flying off: "YES"… "NO"… "YES"…
//   2.5   GEMINI: "mixed feelings are info, not a failure."  chip ♊ THE TWINS · MUTABLE AIR
//         every petal it plucks grows straight back. POP. POP.
//   ~5.6  "write what you like and what you don't."  It gives up on the flower and holds up a two-column note.
//   ~8.6  "then tell them, gently, where you are."  The note gets a heart in the corner; Gemini nods.
//   box closes → "Unsure is okay. | *Say* it."  Pisces (left) cries happily.
import { askFilm, drawBits, drawSign, floatHeart, sparkles, lerp, prog, ease, clamp, pop01, INK, MONO } from '../../naske01/askkit.js'

const FL = { x: 790, y: 830 }
const PET = ['.PP.', 'PPPP', 'PPPP', '.PP.']
const PETC = { P: '#ff8fb1' }
const PLUCKS = [-0.3, 0.6, 1.5, 2.4, 3.3, 4.2]
const WORDS = ['YES', 'NO', 'YES', 'NO', 'YES', 'NO']

const F = askFilm({
  id: 'naske15', sign: 'gemini',
  question: 'I keep changing my *mind* about them.',
  lines: ['mixed feelings are info, not a failure.', "write what you like and what you don't.", 'then tell them, gently, where you are.'],
  chip: '♊ THE TWINS · MUTABLE AIR',
  last: 'Unsure is okay. | *Say* it.', late: 2,
  hero: { x: 420, y: 1010, size: 340 },
  extraT: T => ({ note: T.l[1] + 0.35, heart: T.l[2] + 0.9 }),
  state(t, T) {
    if (t < T.note) { const k = PLUCKS.some(p => t > p && t < p + 0.25); return { mood: k ? 'squint' : 'wide', look: [1, -1], squash: k ? 0.06 : 0 } }
    if (t < T.heart) return { mood: 'neutral', look: [1, 0] }
    return { mood: 'happy' }
  },
  back(x, t, T, H) {
    const ok = H.ok, fk = ok * (1 - ease.inCubic(prog(t, T.note - 0.2, T.note + 0.3)))
    if (fk <= 0.01) return
    // stem + leaves
    x.fillStyle = INK; x.fillRect(FL.x - 10, FL.y, 20, 1210 - FL.y); x.fillStyle = '#2f9a5a'; x.fillRect(FL.x - 6, FL.y, 12, 1206 - FL.y)
    drawBits(x, ['LLL.', '.LLL'], { L: '#5fd38a' }, FL.x - 40, FL.y + 200, 14 * fk)
    // petals: one per pluck slot, regrowing right after it flies
    for (let i = 0; i < 6; i++) {
      const a = i * Math.PI / 3 - Math.PI / 2
      const last = PLUCKS.filter(p => p <= t && PLUCKS.indexOf(p) % 6 === i).pop()
      const regrow = last === undefined ? 1 : pop01(t, last + 0.35, 0.3, 2.8)
      drawBits(x, PET, PETC, FL.x + Math.cos(a) * 60, FL.y + Math.sin(a) * 60, 16 * fk * regrow, { rot: a })
    }
    drawBits(x, ['YYYY', 'YYYY', 'YYYY', 'YYYY'], { Y: '#f2c75c' }, FL.x, FL.y, 16 * fk)
    // flying petals + their words
    PLUCKS.forEach((p0, i) => {
      const p = prog(t, p0, p0 + 1.0)
      if (p <= 0 || p >= 1 || t > T.note) return
      const a = (i % 6) * Math.PI / 3 - Math.PI / 2
      drawBits(x, PET, PETC, FL.x + Math.cos(a) * 60 - p * 260, FL.y + Math.sin(a) * 60 - Math.sin(Math.PI * p) * 120 + p * 200, 16 * ok, { rot: p * 8 })
      x.save(); x.globalAlpha = (1 - ease.inQuad(p)) * ok; x.font = "800 64px Inter, sans-serif"; x.textAlign = 'center'; x.lineWidth = 10; x.strokeStyle = INK; x.fillStyle = WORDS[i] === 'YES' ? '#5fd38a' : '#ff6b6b'
      const wy = FL.y - 140 - p * 80; x.strokeText(WORDS[i], FL.x - 120, wy); x.fillText(WORDS[i], FL.x - 120, wy); x.restore()
    })
  },
  front(x, t, T, H) {
    const ok = H.ok
    const nk = pop01(t, T.note, 0.4, 2.2) * (1 - prog(t, T.close - 0.1, T.close + 0.15))
    if (nk > 0.01) {
      drawSign(x, 760, 760 + Math.sin(t * 2) * 5, 'LIKE     UNSURE\n------   ------\nkind     the pace\nfunny    big plans', { w: 470, size: 32, color: '#f2cf4a', scale: nk * ok, rot: 0.04, align: 'left', pad: 26 })
      if (t > T.heart) { drawBits(x, ['.RR.RR.', 'RRRRRRR', '.RRRRR.', '..RRR..', '...R...'], { R: '#ff5d8f' }, 960, 660, 9 * pop01(t, T.heart, 0.3, 2.8) * nk) }
    }
    sparkles(x, t, 960, 660, T.heart, 8, 80, 1)
    floatHeart(x, t, T.h2Land, H.x + 60, H.y - 230)
  },
  cues: T => [
    ...PLUCKS.filter(p => p >= 0).flatMap((p, i) => [['pop', p, i % 2 ? 523.25 : 783.99, 0.035, 0.3], ['pop', p + 0.4, 1318.51, 0.02, 0.4]]),
    ['whoosh', T.note - 0.2, 0.4, 0.03], ['pop', T.note + 0.1, 987.77, 0.035, 0.2], ['tick', T.note + 0.6, 0.02], ['tick', T.note + 0.9, 0.02],
    ['pop', T.heart, 1567.98, 0.035, 0.4], ['glitter', T.heart, T.heart + 0.5],
  ],
})
export const { DURATION, SCENES, CUES, T, DROP } = F
export default F
