// trexpectcook (20 s vertical, Star Talk Trends · EXPECTATION vs REALITY · 2) "Five stars. Cereal." · lofi Bm.
// The format's shared look lives in ./evr.js (identical in all five trexpect films). Story 0–15.6, then the end card.
//   EXPECTATION  "Expectation: | a *candlelit* dinner."  A rose-lit dining room: white tablecloth, two tall candles, a rose.
//                ♑ CAPRICORN lifts a silver cloche: a perfect roast, steam curling (sparkle). Both go heart-eyed.
//   REALITY      "Reality: | the *pasta* fought back."  The kitchen at 12:04 AM. Three stickers:
//                PASTA BRICK (the fork lifts the whole pasta out as one block) · PLAN B: CEREAL (a box tips in and pours) ·
//                ONE CLEAN SPOON (it clatters down between them). A hush: they look at the spoon… at each other… crack up.
//   card cut     at the laugh.
//   TURN         "Two stars, | *one* good spoon."  They take turns with the spoon. Reality fills the frame: the open fridge
//                glowing on the left; on the right a tower of dishes and ♓ Pisces, sobbing happy tears into a dish towel.
//                Box (CAPRICORN): "booking this. *weekly.*"
//   LAST         "Five stars. *Cereal.*"  A stamp THUNKs on: 5 STARS.
import { makeEVR, BEAT, r3, INK, BONE, GOLD, PINK, HOT, clamp, lerp, prog, ease } from './evr.js'

const CANDLE = ['WW', 'WW', 'WW', 'WW', 'WW', 'WW', 'WW', 'WW', 'ww']
const FLAME = ['.f.', 'fFf', 'fYf', '.f.']
const FLAME_C = { f: '#ff9a3a', F: '#ffd25a', Y: '#fff6c0' }
const ROSE = ['.rr.', 'rRrr', 'rrRr', '.rr.', '..g.', '.gg.', '..g.', '..g.']
const ROSE_C = { r: '#e8344a', R: '#ff7a8a', g: '#4fae5a' }
const ROAST = ['....bbbbbb....', '..bbBBBBBBbb..', '.bBBBBBBBBBBb.', 'bBBBbBBBBbBBBb', 'bBBBBBBBBBBBBb', '.bbbbbbbbbbbb.', 'PPPPPPPPPPPPPP']
const ROAST_C = { b: '#8a4a22', B: '#c8783a', P: '#f4f0ea' }
const CLOCHE = ['.....kk.....', '...SSSSSS...', '.SSsSSSSSSS.', 'SSsSSSSSSSSS', 'SSSSSSSSSSSS', 'GGGGGGGGGGGG']
const CLOCHE_C = { k: '#d9dde8', S: '#c9cfdc', s: '#ffffff', G: '#8a90a6' }
const PLATE = ['.WWWWWW.', 'WwwwwwwW', '.WWWWWW.']
const POT = ['h............h', 'hPPPPPPPPPPPPh', '.PppppppppppP.', '.PppppppppppP.', '.PppppppppppP.', '..PPPPPPPPPP..']
const POT_C = { h: '#3a3a4a', P: '#5a6378', p: '#7a8398' }
const BRICK = ['yYyYyYyYyY', 'YyYyYyYyYy', 'yYyYyYyYyY', 'YyYyYyYyYy']
const BRICK_C = { y: '#f2c75c', Y: '#e0a83c' }
const FORK = ['f.f.f', 'fffff', '..f..', '..f..', '..f..', '..f..', '..f..']
const BOX = ['RRRRRRRR', 'RyyyyyyR', 'RyOOOOyR', 'RyOooOyR', 'RyOOOOyR', 'RyyyyyyR', 'RRRRRRRR', 'RRRRRRRR', 'RwwwwwwR', 'RRRRRRRR']
const BOX_C = { R: '#3f7cf0', y: '#ffe27a', O: '#f29a4a', o: '#fff1c8', w: '#efe6d6' }
const BOWL = ['FFFFFFFFFF', 'WWWWWWWWWW', '.WwwwwwwW.', '..WWWWWW..']
const BOWL_C = { F: '#f2b54a', W: '#ffffff', w: '#dfe8f6' }
const SPOON = ['.ss.', 'ssss', 'ssss', '.ss.', '..s.', '..s.', '..s.', '..s.', '..s.']
const SPOON_C = { s: '#e4e9f4' }
const HEART = ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']
const TOWEL = ['tTtTtT', 'TtTtTt', 'tTtTtT', 'TtTtTt']

const STAR_Y = 1058, STAR_S = 176, CAN_X = 410, CAP_X = 670
const TABLE_Y = 1132
const G1 = BEAT(9), G2 = BEAT(11), G3 = BEAT(13)
const T2 = { cloche: BEAT(3), hearts: BEAT(5), pour: G2 + 0.25, spoon: G3 }

function table(W, { cloth = '#fbf6ee', shade = '#e6dccd', edge = '#d2c4b0' } = {}) {
  const { px } = W
  px(282, TABLE_Y - 6, 516, 290, INK)
  px(288, TABLE_Y, 504, 278, cloth); px(288, TABLE_Y, 504, 10, '#fff')
  for (let X = 300; X < 790; X += 42) px(X, TABLE_Y + 40, 8, 238, shade)
  px(288, TABLE_Y + 34, 504, 6, edge)
}

const EVR = makeEVR({
  id: 'trexpectcook', pair: ['cancer', 'capricorn'],
  heads: {
    expect: 'Expectation: | a *candlelit* dinner.',
    reality: 'Reality: | the *pasta* fought back.',
    turn: 'Two stars, | *one* good spoon.',
    last: 'Five stars. *Cereal.*',
  },
  accents: { expect: '#ffb36b', reality: '#ffe27a', turn: '#bfe6ff', last: '#ffd25a' },
  stickers: [{ text: 'PASTA BRICK', x: -70, y: 610, rot: -0.07 }, { text: 'PLAN B: CEREAL', x: 40, y: 690, rot: 0.05 }, { text: 'ONE CLEAN SPOON', x: -10, y: 772, rot: -0.04 }],
  stamp: '5 STARS', stampAt: { y: 690 },
  clock: { expect: '8:00 PM', reality: '12:04 AM' },
  line: { who: 1, text: 'booking this. *weekly.*' },
  lineColor: '#ffd25a',
  gloss: ['#ffb39a', '#7a3a63'],
  real: ['#2f3a5c', '#191b30'],

  glossy(x, t, W) {
    const { px, bits } = W
    // candlelight glow + a window with a big moon
    px(380, 470, 320, 280, INK); px(388, 478, 304, 264, '#3a2a62')
    px(536, 478, 8, 264, INK); px(388, 606, 304, 8, INK)
    bits(['.MMMM.', 'MMMMMM', 'MMMMmM', 'MMMMMM', 'MMmMMM', '.MMMM.'], { M: '#fff3d0', m: '#f2dca0' }, 618, 548, 9, { outline: null })
    const flick = 0.85 + 0.15 * Math.sin(t * 17) * Math.sin(t * 5.3)
    const g = x.createRadialGradient(540, 1040, 0, 540, 1040, 420 * flick); g.addColorStop(0, 'rgba(255,214,140,0.55)'); g.addColorStop(1, 'rgba(255,190,120,0)')
    x.fillStyle = g; x.fillRect(100, 600, 900, 800)
    // the couple, behind the table
    const mood = t > T2.hearts - 0.2 ? 'heart' : t > T2.cloche ? 'sparkle' : 'happy'
    W.star(0, CAN_X, STAR_Y, STAR_S, { mood, look: [1, 0.6], hops: [1.0, T2.cloche + 0.1], pop: W.pop01(t, 0.7, 0.35, 2) })
    W.star(1, CAP_X, STAR_Y, STAR_S, { mood, look: [-1, 0.6], hops: [1.15, T2.cloche - 0.3], pop: W.pop01(t, 0.82, 0.35, 2) })
    table(W)
    // candles, rose, plates, the roast under the cloche
    for (const cx of [330, 750]) {
      bits(CANDLE, { W: '#fff8ea', w: '#e9dcc2' }, cx, TABLE_Y - 46, 9)
      bits(FLAME, FLAME_C, cx, TABLE_Y - 106 - 2 * Math.sin(t * 13 + cx), 7, { sy: flick })
    }
    bits(PLATE, { W: '#fff', w: '#e8eef8' }, 410, TABLE_Y + 14, 9); bits(PLATE, { W: '#fff', w: '#e8eef8' }, 670, TABLE_Y + 14, 9)
    bits(ROSE, ROSE_C, 540, TABLE_Y - 30, 6)
    const lift = ease.outBack(prog(t, T2.cloche - 0.15, T2.cloche + 0.25))
    bits(ROAST, ROAST_C, 540, TABLE_Y + 30, 7)
    if (t > T2.cloche) {
      for (let i = 0; i < 3; i++) { const q = ((t - T2.cloche) * 0.7 + i / 3) % 1; px(510 + i * 28 + 10 * Math.sin(q * 9 + i), TABLE_Y - 8 - q * 120, 8, 22, `rgba(255,255,255,${0.5 * Math.sin(Math.PI * q)})`) }
    }
    bits(CLOCHE, CLOCHE_C, 540 + 70 * lift, TABLE_Y + 4 - 110 * lift, 9, { rot: 0.5 * lift })
    W.sparkles(t, 540, TABLE_Y, T2.cloche, 8, 80, 1, [GOLD, '#fff', PINK])
    for (let i = 0; i < 5; i++) {
      const b = T2.hearts + i * 0.32, q = prog(t, b, b + 2.2)
      if (q <= 0 || q >= 1) continue
      W.bits(HEART, { H: i % 2 ? HOT : PINK }, 540 + (i - 2) * 60 + 18 * Math.sin(t * 3 + i), 930 - q * 360, 5, { alpha: Math.sin(Math.PI * q) })
    }
  },

  scrappy(x, t, W) {
    const { px, bits, T } = W
    // kitchen tiles
    for (let j = 0; j < 9; j++) for (let i = 0; i < 18; i++) px(i * 60 + (j % 2) * 30, 640 + j * 60, 56, 56, 'rgba(160,180,220,0.07)')
    // the open fridge on the left (revealed by the widen): a light cone
    const fg = x.createLinearGradient(240, 0, 520, 0); fg.addColorStop(0, 'rgba(220,240,255,0.35)'); fg.addColorStop(1, 'rgba(220,240,255,0)')
    x.fillStyle = fg; x.beginPath(); x.moveTo(230, 760); x.lineTo(600, 640); x.lineTo(600, 1400); x.lineTo(230, 1300); x.fill()
    px(40, 700, 200, 620, INK); px(48, 708, 184, 604, '#e8eef6'); px(64, 724, 152, 572, '#fdfdff')
    for (const y of [880, 1040, 1180]) px(64, y, 152, 8, '#bcd0e6')
    bits(['.MM.', 'MMMM', 'MMMM', 'MMMM'], { M: '#9fd0ff' }, 110, 850, 9); bits(['jj', 'jj', 'JJ'], { j: '#ff8a8a', J: '#c8586a' }, 170, 1012, 10)
    px(232, 708, 20, 604, INK); px(236, 716, 12, 588, '#c9d4e4')
    // the couple, behind the counter
    const hush = t > T.hush[0] && t < T.laugh
    let cm = 'sleepy', km = 'neutral', cl, kl = [-1, 0.6]
    if (t > G1) { cm = 'wide'; cl = [1, 0]; km = 'squint'; kl = [0, -1] }
    if (t > G2) { cm = 'neutral'; cl = [0, -1]; km = 'wide'; kl = [-1, -1] }
    if (t > G3) { cm = 'wide'; cl = [1, 1]; km = 'wide'; kl = [-1, 1] }
    if (hush) { cm = 'neutral'; cl = [1, 0]; km = 'neutral'; kl = [-1, 0] }
    if (t > T.laugh) { cm = 'happy'; km = 'happy'; cl = kl = undefined }
    if (t > T.line + 1.1) cm = 'heart'
    const tears = t > T.laugh + 0.5 ? 2 : 0
    const sq = t > T.laugh && t < T.laugh + 1.8 ? 0.06 * Math.sin((t - T.laugh) * 30) : 0
    W.star(0, CAN_X, STAR_Y, STAR_S, { mood: cm, look: cl, tears, squash: sq, zzz: false, hops: [T.Rin[1] + 0.1, G2 + 0.2, ...W.laughHops] })
    W.star(1, CAP_X, STAR_Y, STAR_S, { mood: km, look: kl, tears, squash: -sq, hops: [T.Rin[1] + 0.2, G1 + 0.05, ...W.laughHops.map(h => r3(h + 0.12)), T.line + 0.1] })
    table(W, { cloth: '#8c95ad', shade: '#77809a', edge: '#69728c' })
    px(288, TABLE_Y, 504, 10, '#a9b2c8')
    // the pot + the PASTA BRICK (the fork lifts the whole lot)
    const lift = ease.outBack(prog(t, G1 - 0.05, G1 + 0.3)) * (1 - ease.inCubic(prog(t, G2 - 0.3, G2)))
    bits(POT, POT_C, 400, TABLE_Y - 20, 8)
    bits(BRICK, BRICK_C, 400 + 6 * Math.sin(t * 20) * lift, TABLE_Y - 36 - 150 * lift, 8)
    if (lift > 0.02) bits(FORK, { f: '#d9dde8' }, 400 + 6 * Math.sin(t * 20) * lift, TABLE_Y - 110 - 150 * lift, 7)
    // PLAN B: the cereal box tips in and pours into the bowl
    const bx = ease.outBack(prog(t, G2 - 0.1, G2 + 0.2)), tip = ease.inOutCubic(prog(t, T2.pour, T2.pour + 0.25)) * (1 - ease.inOutCubic(prog(t, T2.pour + 0.9, T2.pour + 1.2)))
    const boxOut = ease.inCubic(prog(t, T2.pour + 1.2, T2.pour + 1.5))
    if (bx > 0.01 && boxOut < 1) bits(BOX, BOX_C, lerp(860, 610, bx) + 200 * boxOut, TABLE_Y - 150 - 300 * boxOut, 9, { rot: -1.5 * tip })
    if (t > T2.pour && t < T2.pour + 1.1) for (let i = 0; i < 12; i++) { const q = ((t - T2.pour) * 2.2 + i / 12) % 1; px(560 + 6 * Math.sin(i * 5), TABLE_Y - 120 + q * 110, 9, 9, i % 2 ? '#f2b54a' : '#e09a30') }
    const bowlK = W.pop01(t, G2 + 0.05, 0.3, 2)
    if (bowlK > 0.01) bits(BOWL, BOWL_C, 560, TABLE_Y + 2, 8, { sx: bowlK, sy: bowlK })
    // ONE CLEAN SPOON clatters down… then they take turns with it
    const sk = ease.outBounce ? ease.outBounce(prog(t, T2.spoon, T2.spoon + 0.4)) : ease.outCubic(prog(t, T2.spoon, T2.spoon + 0.4))
    if (t > T2.spoon) {
      let sx = 560, sy = lerp(TABLE_Y - 400, TABLE_Y - 70, sk), rot = 0.2
      if (t > T.laugh + 0.9) {
        const k = (t - T.laugh - 0.9) / 1.1, side = Math.floor(k) % 2, f = ease.inOutCubic(clamp((k % 1) * 2.2))
        const from = side ? CAP_X - 70 : CAN_X + 70, to = side ? CAN_X + 70 : CAP_X - 70
        sx = lerp(from, to, f); sy = TABLE_Y - 90 - 40 * Math.sin(Math.PI * f); rot = lerp(side ? 0.6 : -0.6, side ? -0.6 : 0.6, f)
      }
      const glow = x.createRadialGradient(sx, sy, 0, sx, sy, 70); glow.addColorStop(0, 'rgba(255,250,220,0.5)'); glow.addColorStop(1, 'rgba(255,250,220,0)')
      x.fillStyle = glow; x.fillRect(sx - 70, sy - 70, 140, 140)
      bits(SPOON, SPOON_C, sx, sy, 8, { rot })
      if (t < T2.spoon + 1) W.sparkles(t, sx, sy, T2.spoon + 0.4, 6, 50, 3, ['#fff', GOLD])
    }
    // the dish tower + Pisces with a dish towel (revealed by the widen)
    for (let i = 0; i < 9; i++) bits(['PPPPPPPP', '.pppppp.'], { P: '#f4f6fb', p: '#c9d2e4' }, 990 + 6 * Math.sin(i * 2.1 + t * 1.5) * (i / 9), 1240 - i * 22, 9)
    W.pisces(880, 1140, 150, t > T.laugh ? 3 : 2, t > T.laugh ? 'happy' : 'sparkle', { look: [-1, 0], hops: [T.widen[1] + 0.05, T.widen[1] + 0.5] })
    bits(TOWEL, { t: '#ff8fb1', T: '#fff1f6' }, 840, 1210 + 3 * Math.sin(t * 6), 10, { rot: 0.3 })
  },

  cues(T) {
    return [
      // glossy: the cloche ta-da + hearts
      ['tick', r3(T2.cloche - 0.15), 0.04], ['bell', r3(T2.cloche + 0.05), 1760, 0.035, 1.6, 0], ['bell', r3(T2.cloche + 0.12), 2349.32, 0.025, 1.4, 0.2], ['glitter', T2.cloche, r3(T2.cloche + 0.45)],
      ...Array.from({ length: 5 }, (_, i) => ['pluck', r3(T2.hearts + i * 0.32), [880, 987.77, 1174.66, 1318.51, 1567.98][i], 0.022, 0.4, (i - 2) * 0.2]),
      // the pasta brick: a heavy clunk + a strain
      ['tom', r3(G1 + 0.05), 80, { gain: 0.16, decay: 0.2 }], ['pluck', r3(G1 + 0.3), 196, 0.03, 0.4, -0.3], ['tom', r3(G2 - 0.02), 70, { gain: 0.14, decay: 0.2 }],
      // plan B: the box whoosh + the pour (a rattle of ticks)
      ['whoosh', r3(G2 - 0.1), 0.3, 0.035], ...Array.from({ length: 14 }, (_, i) => ['tick', r3(T2.pour + i * 0.06), 0.02 + 0.006 * (i % 3)]),
      // the spoon clatters down (three bounces, a ding)
      ['tick', r3(T2.spoon + 0.18), 0.06], ['tick', r3(T2.spoon + 0.3), 0.045], ['tick', r3(T2.spoon + 0.37), 0.03], ['bell', r3(T2.spoon + 0.4), 2637, 0.03, 1.0, 0],
      // spoon turns
      ...[0, 1, 2, 3].map(i => ['pop', r3(T.laugh + 0.9 + i * 1.1 + 0.45), [987.77, 1174.66][i % 2], 0.025, i % 2 ? -0.3 : 0.3]),
    ]
  },
})

export const { DURATION, T, SCENES, CUES, CUTS, MUSIC } = EVR
