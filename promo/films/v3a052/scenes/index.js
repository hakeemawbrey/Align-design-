// v3a052: zodiac.advice444, ADVICE SOLO, "Signs you're | a healed Virgo." (~45 s vertical, signs3kit social cut, music: lofi · E)
// One sign the whole way through (makeFilm solo mode, 9 cards): a relatable Virgo truth with a warm reframe, one gag each.
//   0.0–3.6    "Signs you’re | *a healed Virgo.*"  One big Virgo pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              a typo on the page, the red pen goes back down: TYPO: SURVIVED · a full sink at night: SINK: FULL. YOU: CALM
//              · a lumpy towel someone else folded: IT'S FINE. REALLY. · a to-do list where "nap" gets ticked
//              · "you look great!" "thank you!": JUST THANK YOU · plans cancelled, the calendar says PLAN B: FUN
//              · a sticky note on Virgo: "hug, please" · bedhead in the mirror: GOOD ENOUGH · a report card: ME: ENOUGH
//  37.8        "Less fixing. | *More living.*"  Virgo comes back, big.
//  41.2        callback: "The typo? | *Framed it.*" (the page from card one comes back, in a gold frame).
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const SAGE = '#9fe08a', RED = '#e23d4e', WOOD = '#c98f2a'
const S = 'virgo'

// ── props
const TOWEL = [
  '..PPPP.....',
  '.PPPPPPP...',
  'PPWPPPPPPP.',
  'PPPPPPWPPPP',
  '.PPPPPPPPP.',
  'PPPPWPPPPP.',
  'PPPPPPPPPPP',
  '..PPPPPPP..',
]
const TOWEL_C = { P: '#ff9ccf', W: '#ffd0e6' }
const PEN = ['RR', 'RR', 'RR', 'RR', 'RR', 'RR', 'RR', 'RR', 'KK', '.K']
const PEN_C = { R: RED, K: INK }

// a sheet of paper with a circled typo
function page(x, cx, cy, k, { rot = 0.04, circle = 1 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-124, -156, 260, 330)
  x.fillStyle = INK; x.fillRect(-134, -170, 268, 340)
  x.fillStyle = '#fffaf0'; x.fillRect(-126, -162, 252, 324)
  x.fillStyle = '#c9c4dd'; for (let i = 0; i < 6; i++) if (i !== 2) x.fillRect(-100, -120 + i * 44, i % 2 ? 160 : 200, 10)
  x.fillStyle = INK; x.font = `800 40px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('recieve', 0, -32)
  if (circle > 0.01) {
    x.strokeStyle = RED; x.lineWidth = 6; x.beginPath(); x.ellipse(0, -32, 92, 36, -0.05, 0, Math.PI * 2 * circle); x.stroke()
  }
  x.restore()
}
// a sink full of plates
function sink(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -20, 340, 150)
  x.fillStyle = '#c9c9d8'; x.fillRect(-160, -12, 320, 134)
  x.fillStyle = '#9d9ab0'; x.fillRect(-140, 0, 280, 100)
  for (let i = 0; i < 6; i++) {
    const px = -100 + (i % 3) * 100, py = -40 - Math.floor(i / 3) * 50 + (i % 2) * 8
    x.fillStyle = INK; x.beginPath(); x.ellipse(px, py, 64, 22, (i - 2.5) * 0.08, 0, Math.PI * 2); x.fill()
    x.fillStyle = i % 2 ? '#fff4e2' : SKYB; x.beginPath(); x.ellipse(px, py - 2, 58, 17, (i - 2.5) * 0.08, 0, Math.PI * 2); x.fill()
  }
  x.fillStyle = INK; x.fillRect(110, -170, 24, 160); x.fillRect(60, -180, 74, 24)
  x.fillStyle = '#c9c9d8'; x.fillRect(114, -166, 16, 152); x.fillRect(64, -176, 66, 16)
  x.restore()
}
// a checklist on a clipboard
function checklist(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.03); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -200, 300, 400)
  x.fillStyle = WOOD; x.fillRect(-142, -192, 284, 384)
  x.fillStyle = '#fffaf0'; x.fillRect(-122, -150, 244, 326)
  x.fillStyle = INK; x.fillRect(-50, -214, 100, 40); x.fillStyle = '#c9c9d8'; x.fillRect(-42, -206, 84, 24)
  const items = ['laundry', 'emails', 'taxes', 'NAP']
  x.textAlign = 'left'; x.textBaseline = 'middle'
  items.forEach((it, i) => {
    const y = -100 + i * 74
    x.fillStyle = INK; x.fillRect(-104, y - 20, 40, 40); x.fillStyle = '#fffaf0'; x.fillRect(-98, y - 14, 28, 28)
    x.fillStyle = INK; x.font = `${i === 3 ? 800 : 600} ${i === 3 ? 40 : 32}px ${INTER}`; x.fillText(it, -50, y + 2)
    if (i === 3 && lt > 1.1) { x.strokeStyle = '#2bb673'; x.lineWidth = 9; x.lineCap = 'round'; x.beginPath(); x.moveTo(-96, y); x.lineTo(-84, y + 14); x.lineTo(-60, y - 26); x.stroke() }
  })
  x.restore()
}
// a wall calendar with a crossed-out plan
function calendar(x, cx, cy, k, cross) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -170, 300, 340)
  x.fillStyle = '#fffaf0'; x.fillRect(-142, -162, 284, 324)
  x.fillStyle = RED; x.fillRect(-142, -162, 284, 70)
  x.fillStyle = '#fff'; x.font = `700 32px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('SATURDAY', 0, -126)
  x.fillStyle = INK; x.font = `800 34px ${INTER}`; x.fillText('the plan:', 0, -40); x.fillText('6:00 sharp', 0, 10)
  if (cross > 0.01) { x.strokeStyle = RED; x.lineWidth = 10; x.lineCap = 'round'; x.beginPath(); x.moveTo(-110, -60); x.lineTo(lerp(-110, 110, cross), lerp(-60, 40, cross)); x.stroke() }
  x.restore()
}
// a mirror on a stand
function mirror(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 130, 170, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; x.beginPath(); x.ellipse(0, 0, 120, 160, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#bfe9ff'; x.beginPath(); x.ellipse(0, 0, 100, 140, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = 'rgba(255,255,255,0.6)'; x.fillRect(-60, -100, 16, 70); x.fillRect(-36, -110, 10, 40)
  x.fillStyle = INK; x.fillRect(-12, 160, 24, 90); x.fillRect(-70, 240, 140, 24)
  x.restore()
}
// a little report card
function reportCard(x, cx, cy, k, stamp) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -150, 316, 316)
  x.fillStyle = INK; x.fillRect(-160, -160, 320, 320)
  x.fillStyle = '#fffaf0'; x.fillRect(-150, -150, 300, 300)
  x.fillStyle = SAGE; x.fillRect(-150, -150, 300, 64)
  x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('REPORT CARD', 0, -118)
  x.font = `800 36px ${INTER}`; x.textAlign = 'left'
  x.fillText('Name: me', -120, -40)
  x.fillText('Grade:', -120, 30)
  if (stamp > 0.01) {
    x.save(); x.translate(50, 90); x.rotate(-0.18); x.scale(stamp, stamp)
    x.strokeStyle = RED; x.lineWidth = 7; x.strokeRect(-110, -40, 220, 80)
    x.fillStyle = RED; x.font = `800 42px ${INTER}`; x.textAlign = 'center'; x.fillText('ENOUGH', 0, 3)
    x.restore()
  }
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'A typo. | *You let it live.*', mood: lt => lt < 1.0 ? 'squint' : 'happy', look: [1, 0], star: { x: -210 }, hops: [1.5],
    front(x, t, lt, P) {
      page(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { circle: clamp((lt - 0.4) * 2.5) })
      const up = ease.inOutCubic(prog(lt, 0.3, 0.7)), down = ease.inOutCubic(prog(lt, 1.1, 1.5))
      drawBits(x, PEN, PEN_C, lerp(lerp(930, 860, up), 900, down), lerp(lerp(1060, 820, up), 1080, down), 12 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: lerp(0.5, 1.4, down) })
      label(x, 760, 620, 'TYPO: SURVIVED', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: SAGE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'The dishes can | *wait till morning.*', mood: 'sleepy', look: [1, 0], star: { x: -220, y: 30 },
    front(x, t, lt, P) {
      sink(x, 790, 960, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 660, 'SINK: FULL', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 34, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 740, 'YOU: CALM', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: SAGE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'They folded it wrong. | *You let them.*', mood: lt => lt < 1.1 ? 'eyeroll' : 'heart', look: [1, 1], star: { x: -210 }, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const twitch = lt > 0.5 && lt < 1.0 ? Math.sin(lt * 90) * 4 : 0
      drawBits(x, TOWEL, TOWEL_C, 790 + twitch, 960, 24 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.12 })
      label(x, 780, 680, 'IT’S FINE.', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 40, bg: GOLD, rot: -0.05 })
      label(x, 800, 770, 'REALLY.', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: PINK, rot: 0.05 })
    } },
  { sign: S, cap: 'Your to-do list | *includes a nap.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -220 }, hops: [1.4],
    front(x, t, lt, P) { checklist(x, 780, 860, pop01(t, P.t0 + 0.2, 0.35, 2), lt); sparkles(x, t, 760, 1000, P.t0 + 1.2, 6, 120, 0.3) } },
  { sign: S, cap: 'A compliment? | *Just “thank you.”*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: { x: -220 }, hops: [1.5],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'leo', 810, 980, 210 * k, { mood: 'sparkle', look: [-1, 0], seed: 21, glyph: false })
      bubble(x, 760, 640, 'you look | GREAT!', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 40, tail: 'br' })
      bubble(x, 420, 640, 'thank you!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 36, col: SAGE, tail: 'bl' })
      label(x, 600, 1140, 'NO NOTES', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Plans changed. | *You rolled with it.*', mood: lt => lt > 1.3 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -220 }, hops: [1.5],
    front(x, t, lt, P) {
      calendar(x, 790, 850, pop01(t, P.t0 + 0.2, 0.35, 2), ease.inOutCubic(prog(lt, 0.7, 1.0)))
      label(x, 790, 1100, 'PLAN B: FUN', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 40, bg: SAGE, rot: 0.04 })
    } },
  { sign: S, cap: 'You ask | *for what you need.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -200, y: 40, s: 300 }, hops: [1.4],
    front(x, t, lt, P, F) {
      label(x, F.x, F.top - 50, 'hug, please?', pop01(t, P.t0 + 0.7, 0.3, 2.2), { size: 38, bg: '#fff27a', rot: -0.08 })
      const k = pop01(t, P.t0 + 1.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 790, 960, 220 * k, { mood: 'heart', look: [-1, 0], seed: 22, glyph: false, hops: [P.t0 + 1.9] })
      hearts(x, t, 560, 820, P.t0 + 1.6, { n: 5, life: 1.6, spread: 160, cell: 6, seed: 3 })
    } },
  { sign: S, cap: 'Messy hair. | *Still went out.*', mood: lt => lt > 1.2 ? 'wink' : 'wide', look: [1, 0], star: { x: -210 }, hops: [1.4],
    front(x, t, lt, P, F) {
      // a bedhead tuft on the star's top point
      if (P.k > 0.3) { x.save(); x.fillStyle = INK; x.translate(F.x + 8, F.top - 4); for (const [dx, h, r] of [[-26, 54, -0.5], [0, 70, 0], [24, 50, 0.5]]) { x.save(); x.rotate(r); x.fillStyle = INK; x.fillRect(dx - 9, -h, 18, h); x.fillStyle = '#ffb34a'; x.fillRect(dx - 5, -h + 4, 10, h - 4); x.restore() } x.restore() }
      mirror(x, 800, 820, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 800, 1110, 'GOOD ENOUGH', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 40, bg: GOLD, rot: -0.04 })
    } },
  { sign: S, cap: 'You forgive | *yourself first.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -220 }, hops: [1.6],
    front(x, t, lt, P) {
      reportCard(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), pop01(t, P.t0 + 1.3, 0.25, 2.6))
      sparkles(x, t, 840, 950, P.t0 + 1.35, 7, 150, 0.5)
    } },
]

const F = makeFilm({
  id: 'v3a052', key: 'E', accent: SAGE, solo: S, ending: 'callback',
  title: 'Signs you’re | *a healed Virgo.*',
  cameos: CAMEOS,
  group: { cap: 'Less fixing. | *More living.*', mood: 'sparkle' },
  last: {
    text: 'The typo? | *Framed it.*',
    draw(x, t, lt) {
      const k = pop01(lt, 0.4, 0.45, 1.8)
      if (k <= 0.01) return
      x.save(); x.translate(540, 1080); x.scale(k, k)
      x.fillStyle = INK; x.fillRect(-196, -232, 392, 464)
      x.fillStyle = GOLD; x.fillRect(-186, -222, 372, 444)
      x.fillStyle = WOOD; x.fillRect(-160, -196, 320, 392)
      x.restore()
      page(x, 540, 1080, k * 1.04, { rot: 0, circle: 1 })
      sparkles(x, t, 540, 1080, t - lt + 0.9, 8, 260, 0.2)
      if (lt > 1.2) label(x, 540, 1360, 'MASTERPIECE', pop01(lt, 1.2, 0.3, 2.4), { size: 36, bg: SAGE, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
