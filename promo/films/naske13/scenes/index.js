// naske13 · Ask the Stars, Volume 2, ep 13 · 'I want to say "I love you" first.' (20 s, star_advice post)
// Story 0–15.6, then the shared end card. The look lives in ../../naske01/askkit.js.
//   0.00  frame 0: the DM; ♈ Aries, cheeks puffed, mid-exhale: a wobbly frosty breath cloud drifting up.
//   2.5   ARIES: "if you feel it, it's okay to say it."  chip ♈ THE RAM · FIRST SIGN OF THE ZODIAC
//         more practice puffs: a lump, a squiggle, a lopsided almost-heart.
//   ~5.4  "say it without needing it back right away."
//   ~8.2  "their answer can come in its own time."  One slow breath: a perfect frosty heart floats up and away.
//   card cut → "Say it *brave*. | Let it land."  Pisces (left) cries happily.
import { askFilm, drawBits, sparkles, floatHeart, lerp, prog, ease, clamp, INK } from '../../naske01/askkit.js'

const SHAPES = [
  ['..WWW...', '.WWWWW..', 'WWWWWWW.', '.WWWWWWW', '..WWWW..'],
  ['WW....WW', '.WW..WW.', '..WWWW..', '...WW...', '..WW....'],
  ['.WW..W..', 'WWWWWWW.', 'WWWWWW..', '.WWWWW..', '..WWW...', '...W....'],
]
const HEART = ['.WW.WW.', 'WWWWWWW', 'WWWWWWW', 'WWWWWWW', '.WWWWW.', '..WWW..', '...W...']
const FROST = { W: '#eaf4ff' }

const F = askFilm({
  id: 'naske13', sign: 'aries',
  question: 'I want to say "I love you" *first*.',
  qSize: 92,
  lines: ["if you feel it, it's okay to say it.", 'say it without needing it back right away.', 'their answer can come in its own time.'],
  chip: '♈ THE RAM · FIRST SIGN OF THE ZODIAC',
  last: 'Say it *brave*. | Let it land.', late: 3,
  hero: { x: 460, y: 1020, size: 340 },
  extraT: T => ({ puffs: [-0.8, T.l[0] + 0.6, T.l[0] + 1.9, T.l[1] + 1.2], big: T.l[2] + 0.4 }),
  state(t, T) {
    const all = [...T.puffs, T.big]
    for (const p of all) { if (t > p - 0.6 && t < p) return { mood: 'squint', look: [1, -1], squash: 0.1 * prog(t, p - 0.6, p), hops: false } }
    if (t > T.big && t < T.big + 1.6) return { mood: 'sparkle', look: [1, -1] }
    if (t > T.big) return { mood: 'happy' }
    return { mood: 'neutral', look: [1, -1] }
  },
  front(x, t, T, H) {
    const ok = H.ok
    const mx = H.x + 120, my = H.y - 20
    T.puffs.forEach((p0, i) => {
      const p = prog(t, p0, p0 + 2.6)
      if (p <= 0 || p >= 1) return
      drawBits(x, SHAPES[i % 3], FROST, mx + 60 + p * 300 + Math.sin(p * 9) * 20, my - p * 380, (12 + 12 * Math.min(1, p * 3)) * ok, { alpha: 0.9 * (1 - ease.inQuad(p)), outline: 'rgba(27,18,54,0.5)', rot: Math.sin(p * 6 + i) * 0.3 })
    })
    // the perfect heart
    const q = prog(t, T.big, T.big + 4.6)
    if (q > 0 && q < 1) {
      const s = 10 + 14 * ease.outCubic(Math.min(1, q * 3))
      drawBits(x, HEART, FROST, mx + 120 + q * 160, my - 60 - q * 520 + Math.sin(t * 2) * 10, s * ok, { alpha: 1 - ease.inQuad(prog(q, 0.75, 1)), outline: '#ff5d8f' })
    }
    sparkles(x, t, mx + 200, my - 200, T.big + 0.9, 12, 170, 1, ['#eaf4ff', '#ff8fb1', '#ffffff'])
    floatHeart(x, t, T.h2Land, H.x, H.y - 230)
  },
  cues: T => [
    ...T.puffs.filter(p => p > 0).map(p => ['whoosh', p, 0.7, 0.03]), ['whoosh', 0.0, 0.6, 0.025],
    ['pluck', T.l[0] + 0.7, 392, 0.025, 0.5, 0.2], ['pluck', T.l[0] + 2.0, 440, 0.025, 0.5, 0.2],
    ['whoosh', T.big, 1.4, 0.04], ['bell', T.big + 0.8, 1760, 0.025, 1.4, 0.2], ['glitter', T.big + 0.9, T.big + 1.5],
  ],
})
export const { DURATION, SCENES, CUES, T, DROP } = F
export default F
