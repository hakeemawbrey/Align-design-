// r2a0040: ADVICE ROLL CALL, "Each sign’s | holiday reminder." (~57 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs in zodiac order, one warm reminder each with a light visual gag. Ending: callback.
//   0.0–3.6    "Each sign’s | *holiday reminder.*"
//   3.6–49.2   Aries: the gift exchange isn't a contest · Taurus: seconds allowed · Gemini: pick one party, be there
//              · Cancer: let someone else wash up · Leo: the ugly sweater looks great · Virgo: the crooked candle is still
//              lovely · Libra: your company counts as a gift · Scorpio: leaving early is allowed · Sagittarius: call when
//              you land · Capricorn: out of office · Aquarius: a new tradition (a tree of books) · Pisces: cry at the movie
//  49.2        "Rest. Eat. | *Be loved.*"
//  52.6        CALLBACK: "The ugly sweater? | *Now a group look.*"  Three matching sweaters on a line.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, HEART,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', NAVY = '#2a2350', ORANGE = '#ffb34a', BROWN = '#8a4a2e', GREEN = '#5fd068', PINE = '#2f9e5a', FESTIVE = '#ff7a6b'
function box(x, l, tp, w, h, col, b = 6) { x.fillStyle = INK; x.fillRect(l - b, tp - b, w + 2 * b, h + 2 * b); x.fillStyle = col; x.fillRect(l, tp, w, h) }
function shadow(x, l, tp, w, h) { x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(l + 10, tp + 12, w, h) }
function txt(x, s, px, py, size, col = INK, { font = INTER, weight = 800, align = 'center' } = {}) { x.fillStyle = col; x.font = `${weight} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillText(s, px, py) }

function gift(x, cx, cy, k, { col = RED, rib = GOLD, s = 1, mark = null } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k * s, k * s)
  shadow(x, -100, -80, 200, 170); box(x, -100, -80, 200, 170, col); x.fillStyle = rib; x.fillRect(-14, -80, 28, 170); x.fillRect(-100, -10, 200, 24)
  x.fillStyle = INK; x.beginPath(); x.ellipse(-30, -96, 34, 20, -0.4, 0, Math.PI * 2); x.ellipse(30, -96, 34, 20, 0.4, 0, Math.PI * 2); x.fill()
  x.fillStyle = rib; x.beginPath(); x.ellipse(-30, -96, 26, 13, -0.4, 0, Math.PI * 2); x.ellipse(30, -96, 26, 13, 0.4, 0, Math.PI * 2); x.fill()
  if (mark) txt(x, mark, 0, 50, 70, INK)
  x.restore()
}
function pie(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 30, 150, 46, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#fff4e2'; x.beginPath(); x.ellipse(0, 30, 142, 39, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.beginPath(); x.moveTo(-110, 34); x.lineTo(110, 34); x.lineTo(0, -110); x.fill()
  x.fillStyle = '#d99a4e'; x.beginPath(); x.moveTo(-98, 28); x.lineTo(98, 28); x.lineTo(0, -98); x.fill()
  x.fillStyle = ORANGE; x.beginPath(); x.moveTo(-74, 22); x.lineTo(74, 22); x.lineTo(0, -66); x.fill()
  x.fillStyle = BONE; x.beginPath(); x.arc(0, -40, 22, 0, Math.PI * 2); x.fill()
  x.restore()
}
const HAT = ['....G....', '...GPG...', '..GPPPG..', '..PPGPP..', '.PGPPPGP.', '.PPPGPPP.', 'GPPPPPPPG']
function dishes(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  for (let i = 0; i < 7; i++) { const ox = Math.sin(i * 1.9) * 16; x.fillStyle = INK; x.beginPath(); x.ellipse(ox, 80 - i * 30, 130, 28, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = i % 2 ? '#fff4e2' : '#e8ecf6'; x.beginPath(); x.ellipse(ox, 80 - i * 30, 122, 22, 0, 0, Math.PI * 2); x.fill() }
  x.fillStyle = 'rgba(255,255,255,0.8)'; for (let i = 0; i < 4; i++) { x.beginPath(); x.arc(-100 + i * 70, -140 + Math.sin(i) * 20, 14, 0, Math.PI * 2); x.fill() }
  x.restore()
}
const SWEATER = ['RRR.....RRR', 'RRRRRRRRRRR', 'RRWRRWRRWRR', 'RRRRRRRRRRR', '.RRRRYRRRR.', '.RRRYYYRRR.', '.RRRRYRRRR.', '.RWRRWRRWR.', '.RRRRRRRRR.', '.GGGGGGGGG.']
const SWEATER_C = c => ({ R: c, W: BONE, Y: GOLD, G: PINE })
function candle(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -110, 120, 220, 26, '#c9c9d8', 4)
  x.save(); x.translate(0, 120); x.rotate(0.22); box(x, -26, -230, 52, 230, '#fff4e2'); x.fillStyle = INK; x.fillRect(-3, -252, 6, 24)
  x.fillStyle = GOLD; x.beginPath(); x.ellipse(0, -270 + Math.sin(t * 9) * 2, 14, 24, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#fff4e2'; x.beginPath(); x.ellipse(0, -264, 6, 12, 0, 0, Math.PI * 2); x.fill()
  x.restore(); x.restore()
}
function exitSign(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  shadow(x, -130, -50, 260, 100); box(x, -130, -50, 260, 100, '#1e8a4c')
  x.shadowColor = MINT; x.shadowBlur = 20; txt(x, 'EXIT →', 0, 4, 54, '#d8ffe6', { font: MONO, weight: 700 })
  x.restore()
}
function suitcase(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.05); x.scale(k, k)
  shadow(x, -110, -120, 220, 240); box(x, -110, -120, 220, 240, ORANGE)
  x.strokeStyle = INK; x.lineWidth = 12; x.strokeRect(-40, -170, 80, 50)
  x.fillStyle = '#e0902a'; x.fillRect(-110, -50, 220, 16); x.fillRect(-110, 40, 220, 16)
  box(x, 30, -100, 60, 40, PINK, 3); box(x, -90, 70, 60, 36, MINT, 3)
  x.restore()
}
function laptopShut(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  const shut = ease.inOutCubic(prog(lt, 0.6, 1.2))
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -170, 40, 340, 26, NAVY)
  x.save(); x.translate(0, 40); x.scale(1, Math.max(0.06, 1 - shut)); box(x, -150, -200, 300, 200, '#d8dbe8'); x.fillStyle = '#140c30'; x.fillRect(-136, -186, 272, 172); txt(x, 'INBOX (48)', 0, -100, 30, BONE, { font: MONO, weight: 700 }); x.restore()
  x.restore()
}
function bookTree(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const C = [RED, SKYB, GOLD, PINK, MINT, LAV, ORANGE]
  for (let r = 0; r < 5; r++) { const w = 260 - r * 50; box(x, -w / 2, 120 - r * 52, w, 40, C[r % 7], 4); x.fillStyle = 'rgba(255,255,255,0.4)'; x.fillRect(-w / 2 + 8, 128 - r * 52, w - 16, 6) }
  drawBits(x, ['..Y..', '.YYY.', 'YYYYY', '.Y.Y.'], { Y: GOLD }, 0, -170, 12)
  x.restore()
}
function tv(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  shadow(x, -170, -130, 340, 260); box(x, -170, -130, 340, 230, NAVY); x.fillStyle = '#3a6ab0'; x.fillRect(-150, -110, 300, 190)
  x.fillStyle = '#fff'; for (let i = 0; i < 14; i++) { const ph = (t * 0.3 + i * 0.13) % 1; x.fillRect(-140 + (i * 47) % 280, -100 + ph * 170, 6, 6) }
  drawBits(x, HEART, { H: RED, W: '#fff' }, 0, -10, 10)
  box(x, -40, 106, 80, 20, NAVY, 4)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'The gift exchange | *isn’t a contest.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      gift(x, 790, 900, pop01(t, P.t0 + 0.2, 0.3, 2), { s: 1.2 })
      label(x, 790, 680, 'NO WINNERS. JUST LOVE', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 26, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Second helpings? | *Allowed. Obviously.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      pie(x, 790, 900, pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1100, 'SLICE 2 ✓', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 38, bg: GREEN, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Four parties tonight? | *Pick one. Be there.*', mood: lt => lt > 1.4 ? 'sparkle' : 'wide', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const COLS = [PINK, SKYB, GOLD, MINT]
      COLS.forEach((c, i) => { const keep = i === 2, a = keep ? 1 : 1 - ease.inCubic(prog(lt, 1.0, 1.4)); drawBits(x, HAT, { G: GOLD, P: c }, 690 + (i % 2) * 200, 760 + Math.floor(i / 2) * 220, 16 * pop01(t, P.t0 + 0.2 + i * 0.1, 0.3, 2) * (keep && lt > 1.4 ? 1.3 : 1), { alpha: a }) })
    } },
  { sign: 'cancer', cap: 'You cooked. | *Someone else washes up.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      dishes(x, 790, 920, pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 660, 'NOT YOUR JOB', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: SKYB, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'The ugly sweater? | *Looks great on you.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, SWEATER, SWEATER_C(RED), 740, 880, 24 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.05 })
      label(x, 790, 1120, 'ICONIC, ACTUALLY', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: GOLD, font: MONO, weight: 700 })
      sparkles(x, t, 790, 880, P.t0 + 1.0, 7, 200, 0.4)
    } },
  { sign: 'virgo', cap: 'The candle’s crooked. | *Still lovely.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      candle(x, t, 780, 900, pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1110, 'LEAVE IT ♥', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Can’t pick a gift? | *Your company counts.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      gift(x, 790, 900, pop01(t, P.t0 + 0.2, 0.3, 2), { col: LAV, rib: PINK, mark: lt > 1.3 ? '♥' : '?' })
      bubble(x, 790, 680, 'you came! best gift', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 30, col: MINT, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'Leaving early? | *Allowed. Wave once.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      exitSign(x, t, 790, 760, pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 960, 'bye! love you all', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Travelling home? | *Text when you land.*', mood: 'sparkle', look: [-1, 0], star: { x: 170 }, hops: [0.6],
    front(x, t, lt, P) {
      suitcase(x, 350, 920, pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 360, 650, 'landed! ♥', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, col: MINT, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'Close the laptop. | *It’s the holidays.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      laptopShut(x, t, 790, 900, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 680, 'OUT OF OFFICE ✦', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Skipping a tradition? | *Start your own.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bookTree(x, t, 790, 890, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 1110, 'NEW TRADITION', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Cry at the holiday movie. | *Everyone else is.*', mood: lt => lt < 0.8 ? 'happy' : 'wide', tears: lt => lt < 0.8 ? 1 : 3, star: { x: -170 },
    front(x, t, lt, P) {
      tv(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1090, 'SNIFF (ALL OF US)', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0040', key: 'G', accent: FESTIVE, ending: 'callback',
  title: 'Each sign’s | *holiday reminder.*',
  cameos: CAMEOS,
  group: { cap: 'Rest. Eat. | *Be loved.*', moods: ['happy', 'heart', 'sparkle', 'heart', 'sparkle', 'happy', 'heart', 'wink', 'sparkle', 'happy', 'sparkle', 'heart'] },
  last: {
    text: 'The ugly sweater? | *Now a group look.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.3, 0.4, 2)
      if (k > 0.01) { x.save(); x.globalAlpha = clamp(k); x.strokeStyle = BONE; x.lineWidth = 5; x.beginPath(); x.moveTo(170, 960); x.quadraticCurveTo(540, 1010, 910, 960); x.stroke(); x.restore() }
      ;[[RED, 300], [PINE, 540], [SKYB, 780]].forEach(([c, px], i) => drawBits(x, SWEATER, SWEATER_C(c), px, 1090 + (i === 1 ? 14 : 0), 24 * pop01(t, t0 + 0.6 + i * 0.25, 0.35, 2), { rot: (i - 1) * 0.05 }))
      label(x, 540, 1300, 'MATCHING ✦', pop01(t, t0 + 1.5, 0.3, 2.4), { size: 40, bg: GOLD, font: MONO, weight: 700 })
      sparkles(x, t, 540, 1080, t0 + 1.4, 8, 260, 0.4)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
