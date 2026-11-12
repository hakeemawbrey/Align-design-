// r2t0401: THE SIGNS AS… v3, BELIKE, "Sitting too close? | Zodiacs be like." (topic: someone sits too close) (~62 s vertical, signs3kit social
// cut, music: lofi · C). The format look lives in ../../signs3kit.js. Ending: lesson.
//   0.0–3.6    the hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   one reaction per sign (3.8 s each), pushed to the extreme:
//              ♈ staring contest · ♉ too close to the fries, growled · ♊ new best friend in four minutes
//              · ♋ adopted them (blanket) · ♌ assumed it was a fan, signed an autograph · ♍ measured the gap (4 cm)
//              · ♎ scooted away politely, forty times · ♏ one look, the seat was suddenly free
//              · ♐ moved, to another country · ♑ charged them rent · ♒ drew a border, then a flag · ♓ cried: a hug?
//  49.2        "One bench. | *Twelve reactions.*"
//  52.4        LESSON: "Everyone needs | a little *room.*"  SPACE: RESPECTED
//  58.3        "Except Cancer. | *Hug incoming.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', ORANGE = '#ffb34a', PAPER = '#fff4e2'

const FRIES = [
  '.Y.Y.Y.Y.',
  '.YYY.YYY.',
  'YYYYYYYYY',
  'RRRRRRRRR',
  'RWRRRRRWR',
  'RRRRRRRRR',
  '.RRRRRRR.',
  '..RRRRR..',
]
const FRIES_C = { Y: '#ffd23a', R: RED, W: '#fff' }
const BLANKET = [
  'PPPPPPPPPPPP',
  'PLPPLPPLPPLP',
  'PPPPPPPPPPPP',
  'PPLPPLPPLPPL',
  'PPPPPPPPPPPP',
]
const BLANKET_C = { P: PINK, L: '#ffd0de' }
const CASE = [
  '....KKKK....',
  '....K..K....',
  'BBBBBBBBBBBB',
  'BbBBBBBBBBbB',
  'BBBBYYYYBBBB',
  'BbBBBBBBBBbB',
  'BBBBBBBBBBBB',
  'BbBBBBBBBBbB',
  'BBBBBBBBBBBB',
  '.K........K.',
]
const CASE_C = { K: INK, B: '#5b8cff', b: '#8fb0ff', Y: GOLD }
const FLAG = [
  'PFFFFFF',
  'PFFGFFF',
  'PFGGGFF',
  'PFFGFFF',
  'PFFFFFF',
  'P......',
  'P......',
  'P......',
  'P......',
]
const FLAG_C = { P: BONE, F: '#7dffb0', G: '#ffd23a' }

// a little stranger: a plain grey star sitting just a bit too close
const stranger = (x, t, cx, cy, s, k, o = {}) => k > 0.01 && signChar(x, t, o.id || 'capricorn', cx, cy, s * k, { mood: 'happy', look: [-1, 0], seed: 31, glyph: false, glow: 0.6, ...o })
// a bench under the star and the stranger
function bench(x, cx, cy, w, k) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha *= clamp(k * 1.5)
  x.fillStyle = INK; x.fillRect(cx - w / 2 - 6, cy - 6, w + 12, 40)
  x.fillStyle = '#c98f2a'; x.fillRect(cx - w / 2, cy, w, 28)
  x.fillStyle = '#8a5a1e'; x.fillRect(cx - w / 2, cy + 20, w, 8)
  x.fillStyle = INK; x.fillRect(cx - w / 2 + 30, cy + 34, 18, 60); x.fillRect(cx + w / 2 - 48, cy + 34, 18, 60)
  x.restore()
}
// a ruler with a measured gap
function ruler(x, cx, cy, w, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -26, w + 12, 52)
  x.fillStyle = '#ffd23a'; x.fillRect(-w / 2, -20, w, 40)
  x.fillStyle = INK; for (let i = 0; i <= 20; i++) { const px = -w / 2 + 8 + i * (w - 16) / 20; x.fillRect(px, -20, 3, i % 5 ? 12 : 22) }
  x.restore()
}
// a paper invoice
function invoice(x, cx, cy, k, lines) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-112, -142, 240, 300)
  x.fillStyle = INK; x.fillRect(-126, -156, 252, 312)
  x.fillStyle = PAPER; x.fillRect(-120, -150, 240, 300)
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.font = `800 34px ${INTER}`; x.fillText('INVOICE', 0, -108)
  x.fillRect(-90, -80, 180, 4)
  x.font = `700 24px ${MONO}`; x.textAlign = 'left'
  lines.forEach((l, i) => { x.fillText(l[0], -96, -40 + i * 44); x.textAlign = 'right'; x.fillText(l[1], 96, -40 + i * 44); x.textAlign = 'left' })
  x.fillRect(-90, 92, 180, 4); x.font = `800 28px ${INTER}`; x.textAlign = 'center'; x.fillStyle = RED; x.fillText('DUE: NOW', 0, 122)
  x.restore()
}
// an autograph pad with a scribble that draws itself
function autograph(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.06); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-126, -96, 252, 192)
  x.fillStyle = PAPER; x.fillRect(-120, -90, 240, 180)
  x.strokeStyle = '#3a2a8a'; x.lineWidth = 6; x.lineCap = 'round'; x.beginPath()
  const p = clamp((lt - 0.9) / 0.9), n = Math.floor(p * 40)
  for (let i = 0; i <= n; i++) { const u = i / 40, px = -90 + u * 180, py = Math.sin(u * 18) * 26 * (1 - u * 0.4) - 8; i ? x.lineTo(px, py) : x.moveTo(px, py) }
  x.stroke()
  x.fillStyle = INK; x.fillRect(-90, 52, 180, 3)
  x.restore()
}

const STAR = { x: -170 }
const CAMEOS = [
  { sign: 'aries', cap: 'Aries started | a *staring contest.*', mood: 'squint', look: [1, 0], star: STAR,
    front(x, t, lt, P) {
      stranger(x, t, 620, 930, 230, pop01(t, P.t0 + 0.2, 0.35, 2), { mood: lt > 1.8 ? 'wide' : 'squint' })
      label(x, 790, 640, 'FIRST TO BLINK LOSES', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 30, bg: RED, color: PAPER, rot: -0.04 })
      label(x, 800, 1130, `ROUND ${1 + Math.floor(clamp((lt - 0.8) / 1.4) * 6)}`, pop01(t, P.t0 + 0.8, 0.3, 2), { size: 40, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Too close to the fries. | Taurus *growled.*', mood: lt => lt > 1.2 ? 'squint' : 'happy', look: [1, 0], star: STAR, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, FRIES, FRIES_C, 560, 1060, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      stranger(x, t, 820, 930, 220, pop01(t, P.t0 + 0.3, 0.35, 2), { mood: lt > 1.3 ? 'wide' : 'happy' })
      bubble(x, 560, 640, 'MY side.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 48, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Gemini made | a *new best friend.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: STAR,
    front(x, t, lt, P) {
      stranger(x, t, 800, 950, 230, pop01(t, P.t0 + 0.2, 0.35, 2), { mood: lt > 1.4 ? 'heart' : 'happy' })
      bubble(x, 760, 660, 'okay SO, | my aunt…', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 800, 1150, 'BFF SINCE: 4 MIN AGO', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: GOLD, rot: 0.04 })
      hearts(x, t, 640, 860, P.t0 + 1.5, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 3 })
    } },
  { sign: 'cancer', cap: 'Cancer adopted them | by *minute two.*', mood: lt => lt > 1.1 ? 'heart' : 'happy', look: [1, 0], star: STAR, hops: [1.1],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      stranger(x, t, 790, 930, 230, k, { mood: lt > 1.0 ? 'sleepy' : 'wide', zzz: false })
      const d = ease.outCubic(prog(lt, 0.7, 1.1))
      if (lt > 0.6) drawBits(x, BLANKET, BLANKET_C, 790, lerp(700, 1000, d), 22)
      label(x, 790, 650, 'HELLO, MY NAME IS: FAMILY', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 26, bg: BONE, rot: -0.04 })
    } },
  { sign: 'leo', cap: 'Leo assumed | it was a *fan.*', mood: 'sparkle', look: [1, 0], star: STAR, hops: [0.9],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      stranger(x, t, 830, 1010, 190, pop01(t, P.t0 + 0.2, 0.35, 2), { mood: 'wide' })
      autograph(x, 780, 760, pop01(t, P.t0 + 0.5, 0.3, 2), lt)
      label(x, 780, 600, 'AUTOGRAPH? FREE.', pop01(t, P.t0 + 0.7, 0.3, 2), { size: 30, bg: GOLD, rot: 0.04 })
      sparkles(x, t, 780, 760, P.t0 + 1.9, 7, 170, 0.4)
    } },
  { sign: 'virgo', cap: 'Virgo measured | *the gap.*', mood: lt => lt > 1.4 ? 'wide' : 'squint', look: [1, 0], star: STAR,
    front(x, t, lt, P) {
      stranger(x, t, 820, 930, 220, pop01(t, P.t0 + 0.2, 0.35, 2))
      ruler(x, 640, 1100, 320, pop01(t, P.t0 + 0.4, 0.3, 2))
      label(x, 640, 1040, 'GAP: 4 CM', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 34, bg: RED, color: PAPER, rot: -0.03, font: MONO, weight: 700 })
      label(x, 800, 640, 'REQUIRED: 60 CM', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Libra scooted away. | *Politely.* Forty times.', mood: 'happy', look: [1, 0],
    star: { x: -170 },
    front(x, t, lt, P) {
      const n = Math.min(40, 1 + Math.floor(clamp((lt - 0.4) / 1.8) * 40))
      stranger(x, t, 760, 930, 220, pop01(t, P.t0 + 0.2, 0.35, 2), { hops: [P.t0 + 0.8, P.t0 + 1.4, P.t0 + 2.0] })
      label(x, 790, 640, `SCOOT #${n}`, pop01(t, P.t0 + 0.4, 0.3, 2), { size: 40, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 800, 1120, 'no, you’re fine!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'Scorpio gave one look. | Seat *freed up.*', mood: 'squint', look: [1, 0], star: STAR,
    front(x, t, lt, P) {
      const gone = ease.inCubic(prog(lt, 1.0, 1.5))
      if (gone < 1) stranger(x, t, lerp(760, 900, gone), 930, 220, pop01(t, P.t0 + 0.2, 0.35, 2), { mood: lt > 0.7 ? 'wide' : 'happy', alpha: 1 - gone })
      label(x, 790, 1120, 'SEAT: SUDDENLY FREE', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: GOLD, rot: 0.04 })
      bubble(x, 620, 640, '…', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 60, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Sagittarius moved. | To *another country.*', mood: 'sparkle', look: [1, 0], star: STAR, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      drawBits(x, CASE, CASE_C, 790, 980, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })
      label(x, 790, 650, '✈ BOARDING NOW', pop01(t, P.t0 + 0.7, 0.3, 2), { size: 34, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 800, 820, 'one way!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Capricorn charged them | *rent.*', mood: 'squint', look: [1, 0], star: STAR,
    front(x, t, lt, P) {
      invoice(x, 790, 880, pop01(t, P.t0 + 0.25, 0.35, 2), [['SEAT', '1'], ['SPACE', '4 CM'], ['VIBES', 'EXTRA']])
      sparkles(x, t, 790, 880, P.t0 + 1.3, 6, 190, 0.2, [GOLD, MINT, BONE])
    } },
  { sign: 'aquarius', cap: 'Aquarius drew a border. | Then *a flag.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: STAR, hops: [1.5],
    front(x, t, lt, P) {
      const p = clamp((lt - 0.3) / 0.7)
      x.save(); x.strokeStyle = BONE; x.lineWidth = 8; x.setLineDash([22, 14]); x.beginPath(); x.moveTo(560, 1180); x.lineTo(560, 1180 - 560 * p); x.stroke(); x.restore()
      drawBits(x, FLAG, FLAG_C, 470, 640, 16 * pop01(t, P.t0 + 1.4, 0.3, 2))
      stranger(x, t, 800, 950, 210, pop01(t, P.t0 + 0.2, 0.35, 2), { mood: lt > 1.6 ? 'wide' : 'happy' })
      label(x, 800, 660, 'REPUBLIC OF ME', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Pisces cried. | Is this *a hug?*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: STAR, tears: lt => lt > 0.8 ? 3 : 1, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      stranger(x, t, 760, 940, 220, pop01(t, P.t0 + 0.2, 0.35, 2), { mood: 'wide' })
      bubble(x, 760, 650, 'i love | you too', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 40, col: SKYB, tail: 'bl' })
      hearts(x, t, 560, 820, P.t0 + 1.2, { n: 6, life: 1.8, spread: 260, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2t0401', key: 'C', accent: PINK, ending: 'lesson',
  title: 'Sitting too close? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'One bench. | *Twelve reactions.*' },
  lesson: { text: 'Everyone needs | a little *room.*', chip: 'SPACE: RESPECTED' },
  last: {
    text: 'Except Cancer. | *Hug incoming.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.4, { n: 9, life: 2.0, spread: 640, cell: 8, seed: 6 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
