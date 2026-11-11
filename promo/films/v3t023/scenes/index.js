// v3t023: THE SIGNS AS… v3, "Zodiacs in an | argument be like." (~57 s vertical, signs3kit social cut, music: lofi · E)
// The format look lives in ../../signs3kit.js.
//   0.0–3.6    "Zodiacs in an | argument *be like.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   how each sign argues (3.8 s each), pushed to the extreme:
//              ♈ won the argument before it started · ♉ said nothing, still winning · ♊ argued both sides, lost to themself
//              · ♋ argued, then made you soup · ♌ lost, took a bow anyway · ♍ corrected your grammar mid-argument
//              · ♎ agreed with you, and them, and you · ♏ remembered everything, dated and filed
//              · ♐ too honest, started a second argument · ♑ booked a meeting to discuss it
//              · ♒ still debating, you left an hour ago · ♓ apologised first, it wasn't their fault
//  49.2        "Nobody | *backed down.*"  The twelve fly up into a group photo.
//  52.6        callback: "Argument over. | *More soup.*" (the soup bowls come back, one for everyone).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ORANGE = '#ffb34a', RED = '#e23d4e'
const pad = bm => { const w = Math.max(...bm.map(r => r.length)); return bm.map(r => r.padEnd(w, '.')) }

const TROPHY = pad([
  'YYYYYYYYYYY',
  'YWYYYYYYYYY',
  'YYYYYYYYYYY',
  '.YYYYYYYYY.',
  '..YYYYYYY..',
  '...YYYYY...',
  '....YYY....',
  '....YYY....',
  '...BBBBB...',
  '..BBBBBBB..',
])
const TROPHY_C = { Y: GOLD, W: '#fff6c8', B: '#8a4a2e' }
const SOUP = pad([
  '..S....S...',
  '...S..S....',
  '..S....S...',
  'OOOOOOOOOOO',
  'WOOOGOOOROW',
  'WWWWWWWWWWW',
  '.WWWWWWWWW.',
  '..WWWWWWW..',
])
const SOUP_C = { S: '#e8e3f4', O: ORANGE, G: '#5fd068', R: RED, W: '#fff4e2' }
const ROSE = pad([
  '.RR.',
  'RRRR',
  '.RR.',
  '..G.',
  '.GG.',
  '..G.',
  '..G.',
])
const ROSE_C = { R: '#ff4f86', G: '#5fd068' }
const CHAIR = pad([
  'B.......',
  'B.......',
  'B.......',
  'B.......',
  'BBBBBBBB',
  'B......B',
  'B......B',
  'B......B',
])

/** a paper with a red-pen correction */
function grammar(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-142, -92, 300, 200)
  x.fillStyle = INK; x.fillRect(-156, -106, 312, 212); x.fillStyle = '#fff4e2'; x.fillRect(-148, -98, 296, 196)
  x.fillStyle = INK; x.font = `800 40px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText('“your wrong”', 0, -20)
  const g = ease.outCubic(prog(lt, 0.6, 1.0))
  x.fillStyle = RED; x.fillRect(-112, -20, 100 * g, 6)
  if (lt > 0.9) { x.font = `800 38px ${INTER}`; x.fillText("you're", -40, -72 + 0 * g) }
  if (lt > 1.2) { x.font = `800 30px ${MONO}`; x.fillText('B–', 90, 60) }
  x.restore()
}
/** a pair of scales tipping back and forth */
function scales(x, cx, cy, k, t) {
  if (k <= 0.01) return
  const a = 0.28 * Math.sin(t * 4)
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-12, -120, 24, 240); x.fillRect(-80, 110, 160, 24)
  x.fillStyle = GOLD; x.fillRect(-8, -116, 16, 232); x.fillRect(-76, 114, 152, 16)
  x.save(); x.translate(0, -110); x.rotate(a)
  x.fillStyle = INK; x.fillRect(-150, -8, 300, 16); x.fillStyle = GOLD; x.fillRect(-146, -5, 292, 10)
  for (const s of [-1, 1]) {
    x.save(); x.translate(s * 140, 0); x.rotate(-a)
    x.strokeStyle = BONE; x.lineWidth = 3; x.beginPath(); x.moveTo(0, 0); x.lineTo(-40, 80); x.moveTo(0, 0); x.lineTo(40, 80); x.stroke()
    x.fillStyle = INK; x.fillRect(-56, 78, 112, 18); x.fillStyle = GOLD; x.fillRect(-52, 80, 104, 12)
    x.fillStyle = BONE; x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.fillText(s < 0 ? 'YOU' : 'THEM', 0, 66)
    x.restore()
  }
  x.restore(); x.restore()
}
/** a filing cabinet whose drawers slide out, one per year */
function cabinet(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-112, -192, 236, 400)
  x.fillStyle = INK; x.fillRect(-126, -206, 252, 412); x.fillStyle = '#6b62a8'; x.fillRect(-118, -198, 236, 396)
  ;['2019', '2021', '2023', 'TUESDAY'].forEach((y, i) => {
    const o = ease.outBack ? ease.outCubic(prog(lt, 0.4 + i * 0.3, 0.7 + i * 0.3)) * 50 : 0
    const dy = -186 + i * 96
    x.fillStyle = INK; x.fillRect(-108 + o * 0.3, dy, 216, 86); x.fillStyle = '#9aa5c4'; x.fillRect(-104 + o * 0.3, dy + 4, 208, 78)
    x.fillStyle = '#fff4e2'; x.fillRect(-60 + o * 0.3, dy + 20, 120, 40)
    x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(y, o * 0.3, dy + 41)
  })
  x.restore()
}
/** a calendar invite card */
function invite(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-152, -112, 320, 240)
  x.fillStyle = INK; x.fillRect(-166, -126, 332, 252); x.fillStyle = '#fff4e2'; x.fillRect(-158, -118, 316, 236)
  x.fillStyle = '#2fc79a'; x.fillRect(-158, -118, 316, 54)
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.font = `800 28px ${INTER}`; x.fillText('MEETING INVITE', 0, -90)
  x.font = `700 26px ${MONO}`; x.fillText('RE: us', 0, -30); x.fillText('Thu · 3:00–3:15', 0, 14)
  x.fillStyle = '#6b62a8'; x.font = `700 22px ${MONO}`; x.fillText('agenda attached', 0, 60)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Won the argument. | It *hadn’t started.*', mood: 'sparkle', star: { x: -160 }, hops: [0.6, 1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, TROPHY, TROPHY_C, 790, 900, 22 * pop01(t, P.t0 + 0.3, 0.35, 2))
      label(x, 790, 1100, 'WINNER (EARLY)', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.05 })
      bubble(x, 560, 620, 'you were saying?', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, tail: 'bl' })
      sparkles(x, t, 790, 880, P.t0 + 0.7, 6, 160, 0.2)
    } },
  { sign: 'taurus', cap: 'Said nothing. | *Still winning.*', mood: 'neutral', look: [1, 0], star: { x: -150 },
    front(x, t, lt, P) {
      const h = 1 + Math.floor(clamp((lt - 0.4) / 1.6) * 3)
      label(x, 790, 780, `SILENCE: HOUR ${h}`, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 40, bg: MINT, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 980, '…', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 64, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Argued both sides. | *Lost to themself.*', mood: lt => Math.floor(lt * 2.4) % 2 ? 'squint' : 'sparkle', look: lt => [Math.floor(lt * 2.4) % 2 ? 1 : -1, 0], star: { x: 0, y: 40 },
    front(x, t, lt, P) {
      const s = Math.floor(lt * 2.4) % 2
      bubble(x, 320, 660, 'you’re wrong!', pop01(t, P.t0 + 0.3, 0.25, 2.2) * (s ? 0.85 : 1), { size: 38, tail: 'br', col: s ? '#c9c2da' : BONE })
      bubble(x, 760, 660, 'no, YOU are!', pop01(t, P.t0 + 0.6, 0.25, 2.2) * (s ? 1 : 0.85), { size: 38, tail: 'bl', col: s ? BONE : '#c9c2da' })
      label(x, 540, 1150, 'GEMINI vs GEMINI', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.04 })
    } },
  { sign: 'cancer', cap: 'Argued. Then | *made you soup.*', mood: lt => lt > 1.1 ? 'heart' : 'squint', star: { x: -160 },
    front(x, t, lt, P) {
      if (lt < 1.0) bubble(x, 780, 700, 'I’m SO upset', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, tail: 'bl' })
      else bubble(x, 780, 700, 'eat. it’s hot.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      drawBits(x, SOUP, SOUP_C, 790, 960, 20 * pop01(t, P.t0 + 1.3, 0.35, 2))
      hearts(x, t, 790, 900, P.t0 + 1.6, { n: 4, life: 1.4, spread: 120, cell: 6, seed: 2 })
    } },
  { sign: 'leo', cap: 'Lost the argument. | *Took a bow.*', mood: 'sparkle', star: { x: -150 }, squash: lt => lt > 1.0 && lt < 1.6 ? 0.12 : 0,
    front(x, t, lt, P) {
      for (let i = 0; i < 5; i++) {
        const p = prog(lt, 1.1 + i * 0.12, 1.6 + i * 0.12)
        if (p > 0) drawBits(x, ROSE, ROSE_C, lerp(900 - i * 40, 470 + i * 40, p), lerp(560, 1080 + (i % 2) * 30, p) - Math.sin(Math.PI * p) * 80, 9, { rot: p * 3 + i })
      }
      label(x, 790, 760, 'BRAVO!', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 48, bg: ORANGE, rot: 0.05 })
      bubble(x, 790, 950, 'thank you!', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 42, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Corrected your grammar. | *Mid-argument.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      grammar(x, 790, 850, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      label(x, 790, 1060, 'GRADED', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 36, bg: MINT, rot: -0.05 })
    } },
  { sign: 'libra', cap: 'Agreed with you. | And *them.* And you.', mood: 'happy', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      scales(x, 790, 900, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      bubble(x, 790, 620, 'you’re BOTH right!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'Remembered everything. | *Dated and filed.*', mood: lt => lt > 1.5 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      cabinet(x, 800, 860, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      bubble(x, 420, 620, 'as you said | in 2019…', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 32, tail: 'bl', col: LAV })
    } },
  { sign: 'sagittarius', cap: 'Too honest. | Started *a second argument.*', mood: lt => lt > 1.3 ? 'wide' : 'sparkle', star: { x: 150 },
    front(x, t, lt, P) {
      bubble(x, 330, 660, 'honestly? your | haircut, too.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 34, tail: 'br' })
      const n = lt > 1.3 ? 2 : 1
      label(x, 320, 920, `ARGUMENTS: ${n}`, pop01(t, P.t0 + 0.8, 0.3, 2), { size: 40, bg: n > 1 ? RED : GOLD, color: n > 1 ? '#fff4e2' : INK, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Booked a meeting | *to discuss it.*', mood: 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      invite(x, 790, 840, pop01(t, P.t0 + 0.25, 0.35, 2))
      label(x, 790, 1060, 'ACCEPT · DECLINE', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04 })
    } },
  { sign: 'aquarius', cap: 'Still debating. | You *left an hour ago.*', mood: 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, CHAIR, { B: '#8a4a2e' }, 800, 1020, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 560, 640, '…and ANOTHER thing', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 34, tail: 'bl' })
      label(x, 800, 820, 'YOU: GONE', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 38, bg: SKYB, rot: 0.05 })
    } },
  { sign: 'pisces', cap: 'Apologised first. | It *wasn’t their fault.*', mood: 'wide', tears: lt => lt < 0.8 ? 2 : 3, star: { x: -160 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const n = Math.min(40, 1 + Math.floor(clamp((lt - 0.3) / 1.6) * 40))
      label(x, 790, 780, `SORRY ×${n}`, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 48, bg: LAV, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 980, 'it was me, | it was me!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'v3t023', key: 'E', accent: '#ff8fb1', ending: 'callback',
  title: 'Zodiacs in an | argument *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Nobody | *backed down.*' },
  last: {
    text: 'Argument over. | *More soup.*',
    draw(x, t, lt) {
      for (let i = 0; i < 5; i++) drawBits(x, SOUP, SOUP_C, 540 + (i - 2) * 175, 1060 + (i % 2) * 90, 17 * pop01(t, t - lt + 0.4 + i * 0.12, 0.35, 2))
      hearts(x, t, 540, 1050, t - lt + 1.1, { n: 8, life: 2, spread: 600, cell: 7, seed: 6 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
