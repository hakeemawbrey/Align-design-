// naske02 · Ask the Stars, Volume 2, ep 2 · "They love new things. I love my routine." (20 s, star_advice post)
// Story 0–15.6, then the shared end card. The look lives in ../../naske01/askkit.js.
//   0.00  frame 0: the DM; ♉ Taurus sinks into its armchair, eyes shut in bliss, the same mug as always (steam curling).
//   2.5   TAURUS: "routines are cozy. new can be cozy too."  chip ♉ FIXED EARTH · RULED BY VENUS
//   ~5.6  "trade: one old favorite, one new thing."  A side table slides in with a mystery plate of dumplings. Side-eye.
//   ~7.3  one cautious bite… heart eyes ("!").
//   ~8.8  "say yes to small. you can still go home."  Mug in one tip, dumpling in the other.
//   card cut → "Keep the *comfort*. | Add one surprise."  Pisces (left) cries happily.
import { askFilm, drawBits, drawBurst, floatHeart, sparkles, lerp, prog, ease, pop01, spritePt, MUG, MUG_C } from '../../naske01/askkit.js'

const CHAIR = [
  '...BBBBBBBBBBBBBBBBBB...',
  '..BCCCCCCCCCCCCCCCCCCB..',
  '..BCCCCCCCCCCCCCCCCCCB..',
  '..BCCCCCCCCCCCCCCCCCCB..',
  '..BCCCCCCCCCCCCCCCCCCB..',
  '..BCCCCCCCCCCCCCCCCCCB..',
  '..BCCCCCCCCCCCCCCCCCCB..',
  'BBBBCCCCCCCCCCCCCCCCBBBB',
  'BAAABCCCCCCCCCCCCCCBAAAB',
  'BAAABCCCCCCCCCCCCCCBAAAB',
  'BAAABSSSSSSSSSSSSSSBAAAB',
  'BAAABSSSSSSSSSSSSSSBAAAB',
  'BBBBBBBBBBBBBBBBBBBBBBBB',
  '.LL..................LL.',
]
const CHAIR_C = { B: '#7a3b2e', C: '#a8513b', A: '#93463a', S: '#c8664b', L: '#4a2a20' }
const TABLE = ['WWWWWWWWWWW', '.D.......D.', '.D.......D.', '.D.......D.', 'DDD.....DDD']
const TABLE_C = { W: '#b8743c', D: '#5a3a26' }
const PLATE = ['..DD.DD.DD..', '.DDDDDDDDDD.', 'PPPPPPPPPPPP', '.PPPPPPPPPP.']
const PLATE_C = { D: '#f2e2c4', P: '#e9f1ff' }
const DUMP = ['.DD.', 'DDDD', 'DDDD']
const DUMP_C = { D: '#f2e2c4' }

const F = askFilm({
  id: 'naske02', sign: 'taurus',
  question: 'They love new things. I love my *routine*.',
  lines: ['routines are cozy. new can be cozy too.', 'trade: one old favorite, one new thing.', 'say yes to small. you can still go home.'],
  chip: '♉ FIXED EARTH · RULED BY VENUS',
  last: 'Keep the *comfort*. | Add one surprise.', late: 3, lastSize: 92, lastAccent: 128,
  hero: { x: 470, y: 990, size: 340 },
  extraT: T => ({ table: T.l[1] + 0.2, bite: T.l[1] + 1.7 }),
  state(t, T) {
    if (t < T.l[0]) return { mood: 'sleepy', bob: 2 }
    if (t < T.table + 0.4) return { mood: 'happy' }
    if (t < T.bite) return { mood: 'squint', look: [1, 0], hops: false }
    if (t < T.bite + 0.35) return { mood: 'wide', look: [0, 0], squash: 0.1 * Math.exp(-(t - T.bite) * 5) }
    return { mood: t < T.l[2] ? 'heart' : 'happy' }
  },
  back(x, t, T, H) {
    drawBits(x, CHAIR, CHAIR_C, H.x, 1075, 19 * H.ok)
    // the side table + plate slide in from the right
    const k = ease.outBack(prog(t, T.table, T.table + 0.55))
    if (k > 0 && H.ok > 0.01) {
      const tx = lerp(1250, 850, k)
      drawBits(x, TABLE, TABLE_C, tx, 1150, 16 * H.ok)
      drawBits(x, PLATE, PLATE_C, tx, 1092, 13 * H.ok)
      x.save(); x.fillStyle = '#f5eedf'; x.font = "700 26px 'Space Mono', monospace"; x.textAlign = 'center'
      x.globalAlpha = 1 - prog(t, T.bite - 0.4, T.bite)
      x.fillText('NEW?', tx, 1020); x.restore()
    }
  },
  front(x, t, T, H) {
    // the mug, always in the left tip
    const m = spritePt(H.F, 4, 15)
    drawBits(x, MUG, MUG_C, m.x - 20, m.y + 10 + (t < T.l[0] ? Math.sin(t * 2) * 3 : 0), 10 * H.ok)
    x.save(); x.fillStyle = 'rgba(239,230,214,0.65)'
    for (let i = 0; i < 3; i++) { const ph = (t * 0.8 + i * 0.33) % 1; x.globalAlpha = Math.sin(Math.PI * ph) * H.ok; x.fillRect(Math.round(m.x - 40 + i * 16 + Math.sin(ph * 6 + i) * 6), Math.round(m.y - 40 - ph * 70), 8, 8) }
    x.restore()
    // the dumpling: lifted from the plate to the right tip at the bite
    if (t > T.bite - 0.5) {
      const r = spritePt(H.F, 32, 15)
      const p = ease.inOutCubic(prog(t, T.bite - 0.5, T.bite))
      drawBits(x, DUMP, DUMP_C, lerp(850, r.x + 14, p), lerp(1072, r.y + 6, p), 12 * H.ok)
    }
    drawBurst(x, H.x + 170, 760, 80, t, T.bite + 0.05, { word: '!', size: 70, color: '#ff8fb1', life: 0.8 })
    sparkles(x, t, H.x, H.y - 40, T.bite + 0.1, 10, 220, 2)
    floatHeart(x, t, T.bite + 0.3, H.x + 120, 800)
    floatHeart(x, t, T.h2Land, H.x - 120, 820)
    floatHeart(x, t, T.h2Land + 0.5, H.x + 140, 820)
  },
  cues: T => [
    ['pluck', 0.2, 659.25, 0.025, 0.6, -0.2], ['pluck', 0.9, 587.33, 0.02, 0.6, -0.2],
    ['whoosh', T.table, 0.4, 0.04], ['tick', T.table + 0.5, 0.04], ['tick', T.bite - 0.5, 0.03],
    ['pop', T.bite, 1318.51, 0.05, 0.2], ['glitter', T.bite + 0.1, T.bite + 0.5], ['pop', T.bite + 0.3, 1567.98, 0.03, 0.3],
  ],
})
export const { DURATION, SCENES, CUES, T, DROP } = F
export default F
