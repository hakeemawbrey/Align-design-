// trexpectstars (20 s vertical, Star Talk Trends · EXPECTATION vs REALITY · 3) "Who needs a sky?" · lofi Cm.
// The format's shared look lives in ./evr.js (identical in all five trexpect films). Story 0–15.6, then the end card.
//   EXPECTATION  "Expectation: | *shooting* stars."  A clear violet night on a hilltop: a telescope, a blanket, the Milky
//                Way, a shooting star every beat. ♐ SAGITTARIUS and ♒ AQUARIUS look up; one huge streak → heart eyes.
//   REALITY      "Reality: | *clouds.* So many."  The same hill, overcast, 9:02 PM. Three stickers:
//                CLOUDS (a grey bank rolls over the sky) · MORE CLOUDS (a second bank swallows the moon; Aquarius
//                squints into the telescope: grey) · IT LOOKS LIKE YOU (one cloud is star-shaped… and winks at Sagittarius).
//                A hush. They look at each other… crack up.
//   card cut     at the laugh.
//   TURN         "They talked | till *sunrise.*"  The timestamp races 9:02 PM → 5:12 AM, dawn pinks the clouds. Reality
//                fills the frame: a tent with fairy lights on the right, and on the left ♓ Pisces, wrapped in a blanket,
//                sobbing happy tears. Box (AQUARIUS): "we *are* the stars, babe."  The two glow brighter.
//   LAST         "Who needs *a sky?*"  A stamp THUNKs on: WORTH IT.
import { makeEVR, BEAT, r3, INK, BONE, GOLD, PINK, HOT, clamp, lerp, prog, ease, drawPixelStar } from './evr.js'
import { drawStarChar } from '../../startalk.js'

const SCOPE = ['.......kk', '.....kKKk', '...kKKKk.', '.kKKKKk..', 'kKKKKk...', '.kkKk....', '...h.....', '..h.h....', '.h...h...', 'h.....h..']
const SCOPE_C = { k: '#3a3f5c', K: '#c9cfe6', h: '#8a8fa8' }
const TENT = ['......o......', '.....oOo.....', '....oOOOo....', '...oOOdOOo...', '..oOOOdOOOo..', '.oOOOOdOOOOo.', 'oOOOOOdOOOOOo', 'ooooooooooooo']
const TENT_C = { o: '#d9663a', O: '#f29a4a', d: '#5a2a1a' }
const MUG = ['MMMM.', 'MmmMM', 'MmmM.', 'MMMM.']
const HEART = ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']

const STAR_Y = 1084, STAR_S = 176, SAG_X = 390, AQU_X = 640
const G1 = BEAT(9), G2 = BEAT(11), G3 = BEAT(13)
const T2 = { big: BEAT(3), hearts: BEAT(5), wink: G3 + 0.5, dawn: [10.05, 12.2] }

function hill(W, col, colD) {
  for (let X = 0; X < 1080; X += 12) {
    const y = 1010 + 40 * Math.cos((X - 540) / 300) * -1 + 40
    W.px(X, y, 12, 1400 - y, col); W.px(X, y, 12, 6, colD)
  }
}
function blanket(W, a = '#3f7cf0', b = '#9fc0ff') {
  W.px(318, 1150, 444, 96, INK)
  for (let j = 0; j < 4; j++) for (let i = 0; i < 18; i++) W.px(324 + i * 24, 1156 + j * 21, 24, 21, (i + j) % 2 ? a : b)
}
function cloud(W, cx, cy, s, col = '#9ea3b8', hi = '#c3c7d6') {
  const { px } = W
  px(cx - 150 * s, cy - 30 * s, 300 * s, 70 * s, col); px(cx - 100 * s, cy - 70 * s, 140 * s, 60 * s, col); px(cx + 10 * s, cy - 92 * s, 110 * s, 80 * s, col)
  px(cx - 100 * s, cy - 70 * s, 140 * s, 10 * s, hi); px(cx + 10 * s, cy - 92 * s, 110 * s, 10 * s, hi); px(cx - 150 * s, cy - 30 * s, 50 * s, 8 * s, hi)
}
const hhmm = m => { m = Math.round(m) % 1440; const h = Math.floor(m / 60), mm = m % 60; return `${(h % 12) || 12}:${String(mm).padStart(2, '0')} ${h < 12 ? 'AM' : 'PM'}` }

const EVR = makeEVR({
  id: 'trexpectstars', pair: ['sagittarius', 'aquarius'],
  heads: {
    expect: 'Expectation: | *shooting* stars.',
    reality: 'Reality: | *clouds.* So many.',
    turn: 'They talked | till *sunrise.*',
    last: 'Who needs *a sky?*',
  },
  accents: { expect: '#c9a6ff', reality: '#c3c7d6', turn: '#ffb08a', last: '#9fe6ff' },
  stickers: [{ text: 'CLOUDS', x: -120, y: 606, rot: -0.07 }, { text: 'MORE CLOUDS', x: 60, y: 676, rot: 0.05 }, { text: 'IT LOOKS LIKE YOU', x: -10, y: 750, rot: -0.04 }],
  stamp: 'WORTH IT', stampAt: { y: 690 },
  clock: { expect: '9:00 PM', reality: t => hhmm(lerp(21 * 60 + 2, 29 * 60 + 12, ease.inOutQuad(prog(t, 10.05, 11.6)))) },
  line: { who: 1, text: 'we *are* the stars, babe.' },
  lineColor: '#9fe6ff',
  gloss: ['#1c1850', '#b25a9e'],
  real: ['#555a72', '#2c2d42'],

  glossy(x, t, W) {
    const { px, bits } = W
    // the Milky Way + twinkles
    x.save(); x.globalAlpha = 0.35; x.translate(540, 640); x.rotate(-0.5)
    const mw = x.createLinearGradient(0, -90, 0, 90); mw.addColorStop(0, 'rgba(255,220,255,0)'); mw.addColorStop(0.5, 'rgba(255,230,255,1)'); mw.addColorStop(1, 'rgba(255,220,255,0)')
    x.fillStyle = mw; x.fillRect(-600, -90, 1200, 180); x.restore()
    for (let i = 0; i < 26; i++) { const X = 260 + ((i * 137) % 560), Y = 360 + ((i * 89) % 520), a = 0.5 + 0.5 * Math.sin(t * 3 + i); px(X, Y, 5, 5, `rgba(255,248,230,${0.4 + 0.6 * a})`) }
    // the moon
    bits(['.MMMM.', 'MMMMMM', 'MMMMmM', 'MMMMMM', 'MMmMMM', '.MMMM.'], { M: '#fff3d0', m: '#f2dca0' }, 700, 420, 10, { outline: null })
    // shooting stars: one every beat, then the BIG one
    for (let n = 0; n < 7; n++) {
      const s0 = 0.9 + n * 0.5556, q = prog(t, s0, s0 + 0.45)
      if (q <= 0 || q >= 1) continue
      const X = 760 - q * 380 + (n % 3) * 40, Y = 380 + q * 200 + (n % 2) * 70
      x.save(); x.globalAlpha = Math.sin(Math.PI * q); x.strokeStyle = '#fff6d8'; x.lineWidth = 4; x.beginPath(); x.moveTo(X, Y); x.lineTo(X + 110, Y - 58); x.stroke(); x.restore()
      drawPixelStar(x, X, Y, 22, 2, '#fff6d8')
    }
    const bq = prog(t, T2.big, T2.big + 0.8)
    if (bq > 0 && bq < 1) {
      const X = lerp(860, 220, ease.inOutQuad(bq)), Y = lerp(380, 720, ease.inOutQuad(bq))
      x.save(); x.globalAlpha = Math.sin(Math.PI * bq); x.strokeStyle = '#ffe9a8'; x.lineWidth = 10; x.beginPath(); x.moveTo(X, Y); x.lineTo(X + 260, Y - 136); x.stroke(); x.restore()
      drawPixelStar(x, X, Y, 46, 1, '#fff6d8')
    }
    hill(W, '#2a2550', '#3d3870')
    blanket(W)
    bits(SCOPE, SCOPE_C, 734, 1040, 10)
    const mood = t > T2.hearts - 0.2 ? 'heart' : t > T2.big ? 'wide' : 'sparkle'
    const look = t > T2.big && t < T2.big + 0.8 ? [lerp(1, -1, prog(t, T2.big, T2.big + 0.8)), -1] : [0, -1]
    W.star(0, SAG_X, STAR_Y, STAR_S, { mood, look, hops: [1.0, T2.big + 0.1], pop: W.pop01(t, 0.7, 0.35, 2) })
    W.star(1, AQU_X, STAR_Y, STAR_S, { mood, look, hops: [1.15, T2.big + 0.18], pop: W.pop01(t, 0.82, 0.35, 2) })
    W.sparkles(t, 300, 700, T2.big + 0.75, 8, 60, 1, [GOLD, '#fff', PINK])
    for (let i = 0; i < 5; i++) {
      const b = T2.hearts + i * 0.32, q = prog(t, b, b + 2.2)
      if (q <= 0 || q >= 1) continue
      bits(HEART, { H: i % 2 ? HOT : PINK }, 520 + (i - 2) * 60 + 18 * Math.sin(t * 3 + i), 960 - q * 360, 5, { alpha: Math.sin(Math.PI * q) })
    }
  },

  scrappy(x, t, W) {
    const { px, bits, T } = W
    // dawn creeps in after the turn
    const dawn = ease.inOutQuad(prog(t, ...T2.dawn))
    if (dawn > 0) { const g = x.createLinearGradient(0, 320, 0, 1100); g.addColorStop(0, `rgba(255,170,140,${0.15 * dawn})`); g.addColorStop(1, `rgba(255,190,150,${0.75 * dawn})`); x.fillStyle = g; x.fillRect(0, 320, 1080, 800) }
    // a dim moon, swallowed by bank 2
    bits(['.MMMM.', 'MMMMMM', 'MMMMmM', 'MMMMMM', 'MMmMMM', '.MMMM.'], { M: '#e9e2c8', m: '#cfc6a6' }, 700, 470, 10, { outline: null, alpha: 0.7 * (1 - dawn) })
    const ccol = dawn > 0 ? `rgb(${lerp(158, 236, dawn) | 0},${lerp(163, 170, dawn) | 0},${lerp(184, 176, dawn) | 0})` : '#9ea3b8'
    const chi = dawn > 0 ? '#ffd6c2' : '#c3c7d6'
    // bank 1 (gag 1): rolls in from the right over the whole top
    const b1 = ease.outCubic(prog(t, G1 - 0.35, G1 + 0.3))
    if (b1 > 0) for (let i = 0; i < 5; i++) cloud(W, lerp(1300, 140, b1) + i * 210 + 12 * Math.sin(t * 0.7 + i), 420 + (i % 2) * 60, 1.05, ccol, chi)
    // bank 2 (gag 2): from the left, over the moon
    const b2 = ease.outCubic(prog(t, G2 - 0.35, G2 + 0.3))
    if (b2 > 0) for (let i = 0; i < 5; i++) cloud(W, lerp(-700, 240, b2) + i * 220 + 10 * Math.sin(t * 0.9 + i * 2), 560 + (i % 2) * 50, 0.95, ccol, chi)
    // the star-shaped cloud (gag 3): drifts in and winks
    const sc = ease.outBack(prog(t, G3 - 0.2, G3 + 0.25))
    if (sc > 0.01) drawStarChar(x, 600 + 8 * Math.sin(t * 0.8), 700, 210, t, { color: dawn > 0.3 ? '#f4c2b6' : '#c9ccd8', mood: t > T2.wink && t < T2.wink + 0.6 ? 'wink' : 'happy', look: [1, 1], pop: sc, glow: 0.2, tips: false, seed: 11 })
    hill(W, '#3b3d52', '#4d5068')
    // the tent with fairy lights (revealed by the widen) + mugs
    bits(TENT, TENT_C, 930, 1180, 16)
    for (let i = 0; i < 7; i++) { const on = Math.floor(t * 3 + i) % 3 !== 0; px(830 + i * 32, 1050 + 14 * Math.sin(i * 0.9), 10, 10, on ? ['#ffd25a', '#ff8fb1', '#9fe6ff'][i % 3] : '#5a5a70') }
    blanket(W, '#5a6aa0', '#8a96c0')
    bits(MUG, { M: '#efe6d6', m: '#8a5a3a' }, 540, 1196, 6); bits(MUG, { M: '#ff8fb1', m: '#8a5a3a' }, 580, 1200, 6)
    if (dawn > 0) for (let i = 0; i < 2; i++) { const q = (t * 0.6 + i * 0.5) % 1; px(536 + i * 40, 1170 - q * 60, 5, 14, `rgba(255,255,255,${0.5 * Math.sin(Math.PI * q)})`) }
    bits(SCOPE, SCOPE_C, 734, 1040, 10)
    // Pisces in a blanket on the left (revealed by the widen)
    W.pisces(150, 1110, 150, t > T.laugh ? 3 : 2, t > T.laugh ? 'happy' : 'sparkle', { look: [1, 0], hops: [T.widen[1] + 0.05, T.widen[1] + 0.5] })
    px(82, 1150, 136, 70, INK); px(88, 1156, 124, 58, '#7fbf8a'); for (let i = 0; i < 5; i++) px(92 + i * 24, 1160, 10, 50, '#9fd8a8')
    // the couple
    const hush = t > T.hush[0] && t < T.laugh
    let sm = 'neutral', am = 'neutral', sl = [0, -1], al = [0, -1]
    if (t > G1) { sm = 'wide'; am = 'wide' }
    if (t > G2) { sm = 'neutral'; sl = [1, -1]; am = 'squint'; al = [1, -1] }
    if (t > G3) { sm = 'wide'; sl = [1, -1]; am = 'wide'; al = [-1, -1] }
    if (t > T2.wink + 0.1) { sm = 'sparkle'; sl = [1, -1] }
    if (hush) { sm = 'neutral'; sl = [1, 0]; am = 'neutral'; al = [-1, 0] }
    if (t > T.laugh) { sm = 'happy'; am = 'happy'; sl = al = undefined }
    if (t > T.line + 0.9) { sm = 'heart'; am = 'sparkle' }
    const tears = t > T.laugh + 0.5 && t < T.widen[1] + 1 ? 2 : 0
    const sq = t > T.laugh && t < T.laugh + 1.8 ? 0.06 * Math.sin((t - T.laugh) * 30) : 0
    const glow = 0.9 + 0.8 * ease.inOutQuad(prog(t, T.line + 0.5, T.line + 1.3))
    // Aquarius leans to the telescope at gag 2
    const lean = ease.inOutCubic(prog(t, G2 - 0.1, G2 + 0.25)) * (1 - ease.inOutCubic(prog(t, G3 - 0.2, G3 + 0.1)))
    W.star(0, SAG_X, STAR_Y, STAR_S, { mood: sm, look: sl, tears, squash: sq, glow, hops: [T.Rin[1] + 0.1, G1 + 0.05, ...W.laughHops] })
    W.star(1, lerp(AQU_X, 700, lean), STAR_Y - 24 * lean, STAR_S, { mood: am, look: al, tears, squash: -sq, glow, hops: [T.Rin[1] + 0.2, T2.wink + 0.15, ...W.laughHops.map(h => r3(h + 0.12)), T.line + 0.1] })
    // the stars glow brighter than any sky: a few sparkles after the line
    if (t > T.line + 0.9) for (let i = 0; i < 6; i++) { const q = (t * 0.8 + i / 6) % 1; drawPixelStar(x, 540 + 220 * Math.cos(i + t * 0.4), 1000 + 120 * Math.sin(i * 2 + t * 0.5), 18 + 14 * Math.sin(Math.PI * q), i % 2 ? 1 : 2, i % 2 ? GOLD : '#fff6d8') }
  },

  cues(T) {
    return [
      // glossy: shooting-star blips + the big one
      ...Array.from({ length: 7 }, (_, n) => ['pluck', r3(0.9 + n * 0.5556), [1318.51, 1567.98, 1760, 1567.98, 1318.51, 1760, 1975.53][n], 0.015, 0.5, 0.3 - n * 0.1]),
      ['riser', r3(T2.big - 0.3), r3(T2.big + 0.4), 0.025], ['bell', r3(T2.big + 0.75), 2349.32, 0.035, 1.6, -0.3], ['glitter', r3(T2.big + 0.7), r3(T2.big + 1.2)],
      ...Array.from({ length: 5 }, (_, i) => ['pluck', r3(T2.hearts + i * 0.32), [880, 987.77, 1174.66, 1318.51, 1567.98][i], 0.022, 0.4, (i - 2) * 0.2]),
      // cloud banks roll in (soft whooshes), the telescope squint, the cloud winks
      ['whoosh', r3(G1 - 0.35), 0.8, 0.045], ['whoosh', r3(G2 - 0.35), 0.8, 0.045], ['tick', r3(G2 + 0.2), 0.04],
      ['whoosh', r3(G3 - 0.2), 0.4, 0.03], ['pop', r3(T2.wink), 1567.98, 0.04, 0.2], ['pluck', r3(T2.wink + 0.08), 2093, 0.025, 0.4, 0.2],
      // the clock races (ticks)
      ...Array.from({ length: 12 }, (_, i) => ['tick', r3(10.1 + i * 0.12), 0.018]),
      // the glow-up after the line
      ['glitter', r3(T.line + 0.9), r3(T.line + 1.5)], ['bell', r3(T.line + 1.0), 1760, 0.025, 1.4, 0],
    ]
  },
})

export const { DURATION, T, SCENES, CUES, CUTS, MUSIC } = EVR
