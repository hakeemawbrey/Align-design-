// r2t0172: star_talk, SOLO film, "Cancers on a | first date *be like.*" (~52 s vertical, signs3kit social cut, music: lofi · E)
// One sign the whole way: nine first-date moments, each the most extreme (and lovable) Cancer version. Ending: card.
//   0.0–3.6    "Cancers on a | first date *be like.*"
//   3.6–37.8   nine cards: brought you a cardigan in July · asked about your childhood before the menu
//              · already named your future dog · you mentioned your grandma, they sent her a card
//              · checked your compatibility under the table · kept the receipt for the scrapbook
//              · walked you to your door, then texted "home safe??" · you said "cool", back into the shell
//              · second date? already planned the tenth
//  37.8        "All heart. | *Zero chill.*"
//  41.2        LESSON: "Date a Cancer and | you're *home already.*"  MATCH: MADE
//  47.1        "Cancer + Taurus? | *Biscuit approves.*" over the match card: Cancer + Taurus.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', SILVER = '#c9d3e8'

// ── props
const SWEATER = [
  '..WW..WW..',
  '.WWWWWWWWW.'.slice(0, 10),
  'WWWWWWWWWW',
  'WWbWWWWbWW',
  'WW.WWWW.WW',
  'WW.WbbW.WW',
  'WW.WWWW.WW',
  '...WWWW...',
  '...WbbW...',
]
const DOG = [
  'KK......KK',
  'KBK....KBK',
  'KBBKKKKBBK',
  'KBBBBBBBBK',
  'KBWKBBKWBK',
  'KBBBBBBBBK',
  '.KBBNNBBK.',
  '..KBBBBK..',
  '...KKKK...',
]
function menu(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.06); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-130, -180, 260, 360); x.fillStyle = '#6b2e2e'; x.fillRect(-122, -172, 244, 344)
  x.fillStyle = GOLD; x.font = `800 40px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('MENU', 0, -110)
  x.fillStyle = '#e8c9a0'; for (let i = 0; i < 5; i++) x.fillRect(-80, -50 + i * 44, 160 - (i % 2) * 40, 10)
  x.restore()
}
function envelope(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.06); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-160, -104, 320, 208); x.fillStyle = BONE; x.fillRect(-152, -96, 304, 192)
  x.strokeStyle = '#b9b0a0'; x.lineWidth = 5; x.beginPath(); x.moveTo(-152, -96); x.lineTo(0, 10); x.lineTo(152, -96); x.stroke()
  drawBits(x, ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: RED }, 0, 12, 7)
  x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('to: your grandma', 0, 66)
  x.restore()
}
function phone(x, t, cx, cy, k, lines, { rot = 0.05, bg = PINK } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-128, -204, 268, 420)
  x.fillStyle = INK; x.fillRect(-140, -216, 280, 432); x.fillStyle = '#2a2350'; x.fillRect(-130, -206, 260, 412)
  x.fillStyle = '#140c30'; x.fillRect(-116, -180, 232, 360)
  lines.forEach((l, i) => {
    x.fillStyle = bg; x.fillRect(-100, -130 + i * 92, 200, 70)
    x.fillStyle = INK; x.font = `800 ${l.length > 11 ? 24 : 30}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(l, 0, -95 + i * 92)
  })
  x.restore()
}
function scrapbook(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-180, -150, 360, 300); x.fillStyle = '#d9a8c9'; x.fillRect(-172, -142, 344, 284)
  x.fillStyle = '#fff8ea'; x.fillRect(-150, -120, 300, 240)
  x.save(); x.rotate(0.08); x.fillStyle = '#ffffff'; x.fillRect(-70, -100, 140, 200)
  x.fillStyle = INK; x.font = `700 18px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  ;['RECEIPT', '2 pasta', '1 dessert', 'table 4'].forEach((l, i) => x.fillText(l, 0, -70 + i * 34))
  x.fillStyle = 'rgba(255,210,58,0.8)'; x.fillRect(-40, -112, 80, 22)
  x.restore()
  drawBits(x, ['.HH.HH.', 'HHHHHHH', '.HHHHH.', '...H...'], { H: RED }, -110, 90, 6)
  drawBits(x, ['.HH.HH.', 'HHHHHHH', '.HHHHH.', '...H...'], { H: PINK }, 112, -88, 6)
  x.restore()
}
function shell(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 40, 200, 160, 0, Math.PI, 0); x.lineTo(200, 70); x.lineTo(-200, 70); x.fill()
  x.fillStyle = '#ff9a8a'; x.beginPath(); x.ellipse(0, 40, 188, 148, 0, Math.PI, 0); x.lineTo(188, 60); x.lineTo(-188, 60); x.fill()
  x.strokeStyle = '#e8706a'; x.lineWidth = 8
  for (let i = -2; i <= 2; i++) { x.beginPath(); x.moveTo(0, 50); x.lineTo(i * 70, -90 + Math.abs(i) * 30); x.stroke() }
  x.restore()
}
function tickets(x, cx, cy, k, n) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  for (let i = 0; i < n; i++) {
    x.save(); x.translate((i % 3 - 1) * 14, -i * 26); x.rotate(-0.12 + (i % 4) * 0.07)
    x.fillStyle = INK; x.fillRect(-130, -36, 260, 72); x.fillStyle = i === n - 1 ? GOLD : ['#ffd0dc', '#d9c9ff', '#c9f0e0'][i % 3]; x.fillRect(-124, -30, 248, 60)
    x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(`DATE #${i + 2}`, 0, 0)
    x.restore()
  }
  x.restore()
}

const CAMEOS = [
  { sign: 'cancer', cap: 'Brought you a cardigan. | *In July.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -190 }, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, SWEATER, { W: '#c9a6ff', b: '#8a6ad8' }, 800, 870, 30 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.06 })
      label(x, 800, 640, '☀ 34°C OUTSIDE', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 800, 1120, 'you looked cold', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, tail: 'tl' })
    } },
  { sign: 'cancer', cap: 'Asked about your childhood | *before the menu.*', mood: 'heart', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      menu(x, 830, 900, pop01(t, P.t0 + 0.2, 0.35, 2))
      bubble(x, 760, 640, 'so… your mom?', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 38, tail: 'bl' })
      label(x, 830, 1130, 'STILL UNOPENED', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 28, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Already named | your *future dog.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -190 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, DOG, { K: INK, B: '#c98f5a', W: '#fff', N: '#2a2350' }, 800, 860, 26 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: Math.sin(t * 3) * 0.04 })
      label(x, 800, 1090, 'NAME: BISCUIT', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      if (lt > 1.2) hearts(x, t, 800, 760, P.t0 + 1.2 * 1.29, { n: 4, life: 1.6, spread: 140, cell: 6, seed: 5 })
    } },
  { sign: 'cancer', cap: 'You mentioned your grandma. | Cancer *sent her a card.*', mood: 'sparkle', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      envelope(x, 800, 860, pop01(t, P.t0 + 0.3, 0.35, 2))
      label(x, 800, 1070, 'SENT. WITH STAMPS.', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 28, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Checked your compatibility | *under the table.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 1], star: { x: -190 },
    back(x, t, lt, P) { x.fillStyle = INK; x.fillRect(120, 1000, 840, 30); x.fillStyle = '#8a5a3a'; x.fillRect(126, 1004, 828, 22) },
    front(x, t, lt, P) {
      phone(x, t, 800, 820, pop01(t, P.t0 + 0.2, 0.35, 2) * 0.85, lt > 1.3 ? ['♋ + you', 'MATCH: YES!!'] : ['♋ + you', 'checking…'], { bg: lt > 1.3 ? MINT : LAV })
      bubble(x, 420, 640, 'nothing!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 34, tail: 'bc' })
    } },
  { sign: 'cancer', cap: 'Kept the receipt. | For the *scrapbook.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      scrapbook(x, t, 790, 870, pop01(t, P.t0 + 0.25, 0.35, 2))
      label(x, 790, 640, 'PAGE 1 OF FOREVER', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 28, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Walked you to your door. | Then texted *“home safe??”*', mood: 'wide', look: [1, 0], star: { x: -190 }, hops: [1.0],
    front(x, t, lt, P) {
      phone(x, t, 800, 870, pop01(t, P.t0 + 0.2, 0.35, 2), ['home safe??', ...(lt > 1.0 ? ['you there??'] : []), ...(lt > 1.7 ? ['ok good'] : [])])
    } },
  { sign: 'cancer', cap: 'You said “cool.” | Cancer went *back in the shell.*', mood: 'wide', star: { x: -150 },
    front(x, t, lt, P) {
      shell(x, 390, 950, pop01(t, P.t0 + 0.9, 0.35, 1.8))
      bubble(x, 790, 680, 'cool.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 48, tail: 'br', col: SKYB })
      label(x, 790, 1060, 'BE RIGHT BACK', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Second date? | Already *planned the tenth.*', mood: 'sparkle', look: [1, 0], star: { x: -190 }, hops: [1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      tickets(x, 800, 1060, pop01(t, P.t0 + 0.2, 0.3, 2), 1 + Math.floor(clamp((lt - 0.3) / 1.4) * 8))
      sparkles(x, t, 800, 820, P.t0 + 1.9, 7, 200, 0.4)
    } },
]

const F = makeFilm({
  id: 'r2t0172', key: 'E', accent: SILVER, solo: 'cancer', ending: 'card',
  title: 'Cancers on a | first date *be like.*',
  cameos: CAMEOS,
  card: { a: 'cancer', b: 'taurus', chip: 'IT’S A MATCH' },
  group: { cap: 'All heart. | *Zero chill.*', mood: 'heart' },
  lesson: { text: 'Date a Cancer and | you’re *home already.*', chip: 'MATCH: MADE' },
  last: {
    text: 'Cancer + Taurus? | *Biscuit approves.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 8, life: 2.2, spread: 600, cell: 8, seed: 7 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
