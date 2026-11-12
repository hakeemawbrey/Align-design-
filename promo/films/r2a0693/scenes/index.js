// r2a0693: star_advice, ADVICE SOLO (virgo), "Virgo, you’re allowed | *to change your mind.*" (signs3kit, lofi · C).
// Nine gentle truths for a Virgo who planned it all and now wants something else, each with a warm reframe and one
// light gag. Ending: callback.
//   ordered the salad, can still get fries · repainting the room again · changed your major · said yes, meant no
//   · a brand-new filing system · a new favourite match · new facts, new view · rethinking the haircut
//   · leaving the party early
//   group "Still you. | *Just updated.*"
//   callback "Salad *and* fries? | Best of both." (card 1's plate comes back with fries on it)
import { makeFilm, sparkles, hearts, bubble, label, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, phone, bits, swapLabel, zzz, RED, CREAM, STEEL, NIGHT, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ff8fb1', S = 'virgo', ST = { x: -190 }
const SALAD = ['..G.L.G.L...', '.GLGGLGLGG..', 'GLGTGLGGTLG.', 'WWWWWWWWWWWW', '.WWWWWWWWWW.', '..WWWWWWWW..']
const FRIES = ['.Y.Y.Y.Y.', '.Y.YYY.Y.', 'YYYYYYYYY', 'RRRRRRRRR', 'RRRWWWRRR', 'RRRRRRRRR', '.RRRRRRR.']
const ROLLER = ['KKKKKKKKKK', 'KPPPPPPPPK', 'KPPPPPPPPK', 'KKKKKKKKKK', '....KK....', '....KK....', '....KK....', '....KK....', '...KKKK...']
const SCISS = ['SS.....SS', 'S.S...S.S', 'SS.S.S.SS', '....S....', '...S.S...', '..S...S..', '.S.....S.']
const bmSalad = (x, cx, cy, cell, o) => drawBits(x, SALAD, { G: '#4fbf6a', L: '#8fdc6a', T: RED, W: BONE }, cx, cy, cell, o)
const bmFries = (x, cx, cy, cell, o) => drawBits(x, FRIES, { Y: '#ffd23a', R: RED, W: CREAM }, cx, cy, cell, o)

function shelf(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  const COLS = ['#ff6b5a', '#ffb34a', '#ffd23a', '#5fd068', '#6fc3ff', '#b46cff']
  const MIX = [3, 0, 5, 1, 4, 2]
  const p = clamp((lt - 0.6) / 0.8)
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, 70, 340, 18); x.fillStyle = '#8a4a2e'; x.fillRect(-166, 72, 332, 12)
  for (let i = 0; i < 6; i++) {
    const c = p < 1 ? COLS[MIX[i]] : COLS[i]
    x.fillStyle = INK; x.fillRect(-160 + i * 54, -80, 48, 152); x.fillStyle = c; x.fillRect(-156 + i * 54, -76, 40, 144)
  }
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Ordered the salad? | You can *still get fries.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bmSalad(x, 800, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 660, 'hmm… fries?', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 42, tail: 'bl' })
      L(x, 800, 1080, 'ORDER UPDATE: ALLOWED', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, -0.04, 26)
    } },
  { sign: S, cap: 'Repainting *again?* | Still valid.', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, ROLLER, { K: INK, P: lt > 1.0 ? '#9fd8a8' : '#e6d2b0' }, 800, 840, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: Math.sin(t * 4) * 0.15 })
      swapLabel(x, 800, 1080, lt, 1.0, 'BEIGE', 'SAGE ✦', { size: 36, fromBg: '#e6d2b0', toBg: '#9fd8a8' })
    } },
  { sign: S, cap: 'Changed your major? | That’s *smart,* not flaky.', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) bits(x, 'BOOK', 800 + (i % 2 ? 14 : -14), 960 - i * 84, 14 * pop01(t, P.t0 + 0.2 + i * 0.15, 0.25, 2), { rot: (i % 2 ? 0.04 : -0.04) })
      L(x, 800, 640, 'NEW PATH ✦', pop01(t, P.t0 + 1.2, 0.3, 2.2), GOLD, 0.04, 34)
    } },
  { sign: S, cap: 'Said yes, meant no? | *Change it kindly.*', mood: lt => lt > 1.5 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'yes! sure!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, tail: 'bl' })
      bubble(x, 800, 880, 'actually… can’t. sorry!', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 32, col: MINT, tail: 'br' })
      L(x, 800, 1080, 'BOUNDARY: SET', pop01(t, P.t0 + 1.7, 0.3, 2.2), ACC, -0.04, 32)
    } },
  { sign: S, cap: 'New shelf system? | That’s *growth.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      shelf(x, 800, 830, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      L(x, 800, 1060, 'SYSTEM #7 (BEST ONE)', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, 0.04, 28)
      sparkles(x, t, 800, 830, P.t0 + 1.4, 6, 170, 0.3)
    } },
  { sign: S, cap: 'New favourite match? | Hearts *get updates.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, t, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'MATCHES ✦', headCol: ACC, lines: [['top pick: libra', BONE, pop01(t, P.t0 + 0.5, 0.25, 2)], ['update…', STEEL, pop01(t, P.t0 + 0.9, 0.25, 2)], ['top pick: taurus', MINT, pop01(t, P.t0 + 1.3, 0.25, 2)]] })
      hearts(x, t, 600, 800, P.t0 + 1.4, { n: 4, life: 1.4, spread: 160, cell: 6, seed: 2 })
    } },
  { sign: S, cap: 'New facts, new view? | That’s *wisdom.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'PAPERS', 800, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'LENS', 700, 980, 12 * pop01(t, P.t0 + 0.6, 0.3, 2), { rot: -0.2 })
      L(x, 800, 650, 'OPINION v2', pop01(t, P.t0 + 1.2, 0.3, 2.2), LAV, -0.04, 34)
      L(x, 820, 1090, 'UPDATED ✓', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, 0.04, 32)
    } },
  { sign: S, cap: 'Rethinking the haircut? | It *grows back.*', mood: lt => lt > 1.5 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, SCISS, { S: STEEL }, 800, 830, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: Math.sin(t * 8) * 0.1 })
      bubble(x, 790, 640, 'too short?!', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 42, tail: 'bl' })
      L(x, 800, 1060, 'BACK BY SPRING', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, -0.04, 32)
    } },
  { sign: S, cap: 'Leaving the party early? | *Rest is a plan too.*', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', look: [1, 0], star: ST, hops: [1.1],
    front(x, t, lt, P) {
      bits(x, 'MOON', 820, 700, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'PILLOW', 800, 930, 20 * pop01(t, P.t0 + 0.7, 0.3, 2))
      L(x, 800, 1090, 'HOME BY 9 ✦', pop01(t, P.t0 + 1.3, 0.3, 2.2), LAV, 0.04, 32)
      if (lt > 1.2) zzz(x, t, 560, 700)
    } },
]

const F = makeFilm({
  id: 'r2a0693', key: 'C', accent: ACC, solo: S, ending: 'callback',
  title: 'Virgo, you can | change your *mind.*',
  cameos: CAMEOS,
  group: { cap: 'Still you. | *Just updated.*', mood: 'heart' },
  last: {
    text: 'Salad *and* fries? | Best of both.',
    draw(x, t, lt) {
      bmSalad(x, 450, 1150, 26 * pop01(t, t - lt + 0.5, 0.4, 2))
      bmFries(x, 650, 1130, 26 * pop01(t, t - lt + 0.9, 0.4, 2))
      sparkles(x, t, 550, 1120, t - lt + 1.2, 8, 230, 0.3)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
