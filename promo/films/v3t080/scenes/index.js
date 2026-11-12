// v3t080: THE SIGNS AS… v3, "Won the argument? | Zodiacs be like." (~57 s vertical, signs3kit social cut, music: lofi · G)
// The format look lives in ../../signs3kit.js. Ending: callback.
//   0.0–3.6    "Won the argument? | Zodiacs *be like.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   each sign after winning an argument (3.8 s each), pushed to the extreme:
//              ♈ won, picked another one · ♉ will mention it every year · ♊ won both sides · ♋ apologised for winning
//              · ♌ victory speech, took questions · ♍ sent the sources, fourteen of them · ♎ felt bad, called it a tie
//              · ♏ won by quoting your birth chart · ♐ already forgot what it was about · ♑ had it in writing, notarised
//              · ♒ started a podcast about it · ♓ won, cried anyway
//  49.2        "Gracious winners? | *Not one.*"  The twelve fly up into a group photo.
//  52.6        "Cancer is | *still apologising.*"  (Cancer comes back with the "sorry" bubble)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', ORANGE = '#ffb34a', TEAL = '#2fc79a'

// ── props
const TROPHY = [
  'YYYYYYYYYY',
  'YWYYYYYYYY',
  'YYYYYYYYYY',
  '.YYYYYYYY.',
  '..YYYYYY..',
  '....YY....',
  '....YY....',
  '..KKKKKK..',
  '..KKKKKK..',
]
const TROPHY_C = { Y: GOLD, W: '#fff1b0', K: '#8a5a3a' }
const WHEEL = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
function chart(x, cx, cy, r, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.3)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { x.fillStyle = WHEEL[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, (i / 12) * Math.PI * 2, ((i + 1) / 12) * Math.PI * 2); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, r * 0.6, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; for (const a of [0.5, 2.2, 4.1]) x.fillRect(Math.cos(a) * r * 0.4 - 7, Math.sin(a) * r * 0.4 - 7, 14, 14)
  x.restore()
}
function card(x, cx, cy, k, { w = 300, h = 300, head = '', headBg = TEAL, body = [], rot = 0.05, size = 30, align = 'center', stamp = 0 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = '#fff4e2'; x.fillRect(-w / 2, -h / 2, w, h)
  x.textBaseline = 'middle'
  if (head) { x.textAlign = 'center'; x.fillStyle = headBg; x.fillRect(-w / 2, -h / 2, w, 58); x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.fillText(head, 0, -h / 2 + 31) }
  x.fillStyle = INK; x.font = `800 ${size}px ${INTER}`; x.textAlign = align
  const top = head ? -h / 2 + 58 : -h / 2, ax = align === 'left' ? -w / 2 + 22 : 0
  body.forEach((l, i) => x.fillText(l, ax, top + (h - (head ? 58 : 0)) * (i + 0.5) / body.length))
  if (stamp > 0.01) {
    x.save(); x.translate(w / 2 - 20, -h / 2 + 20); x.rotate(-0.3); x.scale(stamp, stamp)
    x.strokeStyle = RED; x.lineWidth = 8; x.beginPath(); x.arc(0, 0, 58, 0, Math.PI * 2); x.stroke()
    x.fillStyle = RED; x.font = `800 22px ${INTER}`; x.textAlign = 'center'; x.fillText('OFFICIAL', 0, 2)
    x.restore()
  }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Won. | Picked *another one.*', mood: lt => lt > 1.0 ? 'wide' : 'sparkle', star: { x: -160 }, hops: [0.4, 1.0],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 790, 680, 'ROUND 1: WON', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 880, 'NEXT!', pop01(t, P.t0 + 0.9, 0.25, 2.4), { size: 60, tail: 'bl' })
      label(x, 790, 1080, 'TOPIC: YOUR SHOES', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 28, bg: RED, color: '#fff4e2', rot: 0.05 })
    } },
  { sign: 'taurus', cap: 'Was right once. | *Mentions it yearly.*', mood: 'happy', star: { x: -160 },
    front(x, t, lt, P) {
      card(x, 790, 850, pop01(t, P.t0 + 0.3, 0.35, 2), { w: 300, h: 280, head: 'REMINDER', headBg: GOLD, body: ['“I was right”', 'repeats: yearly', 'since 2019'], size: 30 })
      bubble(x, 790, 1100, 'remember when…', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, tail: 'bc' })
    } },
  { sign: 'gemini', cap: 'Won both sides | *of the argument.*', mood: lt => Math.floor(lt * 2.6) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.6) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 780, 660, 'cats are best!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, col: MINT, tail: 'bl' })
      bubble(x, 780, 860, 'no, DOGS are!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 38, col: PINK, tail: 'bl' })
      label(x, 790, 1070, 'WINNER: GEMINI ×2', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: GOLD, rot: 0.04 })
    } },
  { sign: 'cancer', cap: 'Won. | *Apologised for it.*', mood: lt => lt > 1.0 ? 'neutral' : 'happy', look: [0, 1], star: { x: -160 },
    front(x, t, lt, P) {
      drawBits(x, TROPHY, TROPHY_C, 790, 880, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 660, 'sorry I was | right!!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 38, col: LAV, tail: 'bl' })
      label(x, 790, 1080, 'APOLOGIES: 6', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 32, bg: SKYB, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Victory speech. | *Took questions.*', mood: 'sparkle', star: { x: -150 }, hops: [0.9],
    front(x, t, lt, P) {
      drawBits(x, TROPHY, TROPHY_C, 790, 860, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.06 })
      label(x, 790, 660, 'PRESS CONFERENCE', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 30, bg: ORANGE, rot: -0.04 })
      bubble(x, 790, 1080, 'yes, you in the back', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 32, tail: 'bl' })
      sparkles(x, t, 380, 820, P.t0 + 0.8, 7, 170, 0.2)
    } },
  { sign: 'virgo', cap: 'Sent the sources. | *All fourteen.*', mood: lt => lt > 1.6 ? 'wink' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const n = Math.min(14, Math.floor(Math.max(0, lt - 0.3) / 0.11))
      for (let i = 0; i < Math.min(n, 6); i++) card(x, 760 + i * 14, 900 - i * 22, 1, { w: 220, h: 150, body: ['SOURCE', String(Math.max(1, n - 5 + i))], size: 30, rot: 0.04 * ((i % 2) * 2 - 1) })
      label(x, 790, 1110, 'ATTACHED: 14 FILES', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 28, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Won. Felt bad. | *Called it a tie.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', star: { x: -170 },
    front(x, t, lt, P) {
      label(x, 790, 680, 'LIBRA: 1 · YOU: 0', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 32, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      const k = pop01(t, P.t0 + 1.1, 0.3, 2.4)
      label(x, 790, 860, 'LIBRA: 1 · YOU: 1', k, { size: 32, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1070, 'let’s call it even', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'Won by quoting | *your birth chart.*', mood: lt => lt > 1.4 ? 'wink' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      chart(x, 790, 790, 120, pop01(t, P.t0 + 0.25, 0.35, 2), t)
      bubble(x, 790, 1040, 'Mars in Aries. | Case closed.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 34, col: LAV, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Won. Already forgot | *what it was about.*', mood: lt => lt > 1.2 ? 'wide' : 'sparkle', star: { x: 160 }, hops: [0.5],
    front(x, t, lt, P) {
      label(x, 320, 680, 'WINNER!', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 44, bg: GOLD, rot: -0.05 })
      bubble(x, 320, 900, 'wait, what | were we…', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 36, tail: 'br' })
      label(x, 320, 1090, 'TOPIC: UNKNOWN', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 28, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Had it in writing. | *Notarised.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [-1, 0], star: { x: 160 },
    front(x, t, lt, P) {
      card(x, 320, 860, pop01(t, P.t0 + 0.3, 0.35, 2), { w: 320, h: 340, head: 'AGREEMENT', headBg: TEAL, body: ['“Capricorn', 'was right.”', '— signed, you'], size: 30, stamp: pop01(t, P.t0 + 1.3, 0.3, 2.6) })
    } },
  { sign: 'aquarius', cap: 'Won. Started | *a podcast about it.*', mood: 'sparkle', look: [1, -1], star: { x: -170 }, hops: [1.2],
    front(x, t, lt, P) {
      label(x, 790, 700, '● ON AIR', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 40, bg: RED, color: '#fff4e2', rot: -0.04, font: MONO, weight: 700 })
      card(x, 790, 920, pop01(t, P.t0 + 0.7, 0.35, 2), { w: 330, h: 190, head: 'EPISODE 1', headBg: SKYB, body: ['I Was Right'], size: 40 })
      label(x, 790, 1110, 'LISTENERS: 2', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 28, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Won. | *Cried anyway.*', mood: 'wide', tears: lt => lt < 0.9 ? 2 : 3, star: { x: -160 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, TROPHY, TROPHY_C, 790, 880, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })
      bubble(x, 790, 660, 'you were so | brave though', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 34, col: LAV, tail: 'bl' })
      label(x, 790, 1090, 'HUGGED THE LOSER', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 28, bg: SKYB, rot: 0.04 })
    } },
]

const F = makeFilm({
  id: 'v3t080', key: 'G', accent: GOLD, ending: 'callback',
  title: 'Won the argument? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Gracious winners? | *Not one.*' },
  last: {
    text: 'Cancer is | *still apologising.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.5, 0.4, 1.8)
      if (k > 0.01) signChar(x, t, 'cancer', 420, 1140, 270 * k, { mood: 'neutral', look: [0, 1], seed: 5 })
      bubble(x, 720, 1000, 'sorry!! | (again)', pop01(t, t - lt + 1.0, 0.25, 2.2), { size: 42, col: LAV, tail: 'bl' })
      label(x, 720, 1200, 'APOLOGIES: 47', pop01(t, t - lt + 1.6, 0.3, 2.2), { size: 34, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
