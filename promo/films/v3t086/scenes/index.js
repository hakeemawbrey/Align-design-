// v3t086: THE SIGNS AS… v3, SOLO film, "Dating a Capricorn | be like." (~45 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole way through: nine dating moments, each pushed to the most extreme (and lovable) Capricorn version.
//   0.0–3.6    "Dating a Capricorn | *be like.*"  One big Capricorn pops in, then the cards start.
//   3.6–37.8   nine cards: brought an agenda · five-year plan on date one · romance = a shared calendar
//              · "I love you" in a quarterly review · love note, stamped APPROVED · dating profile = a résumé
//              · birthday gift: a savings account · took a day off, felt guilty · stoic all year, cried at your graduation
//  37.8        "Serious. | *Seriously sweet.*"
//  41.2        callback: "The five-year plan? | *You’re in it.*" with the plan label back, now with a heart.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const TEAL = '#2fc79a', RED = '#e23d4e', BROWN = '#8a4a2e', CREAM = '#fff4e2'

const PIG = [
  '....KK......',
  '.PPPPPPPPP..',
  'PPPPPPPPPPP.',
  'PPWKPPPPPPPP',
  'PPPPPPPPPPPN',
  'PPPPPPPPPPPN',
  'PPPPPPPPPPP.',
  '.PPPPPPPPP..',
  '.PP.....PP..',
]
const PIG_C = { K: INK, P: PINK, W: '#ffffff', N: '#ff6a9a' }
const CAP = [
  'KKKKKKKKKKKK',
  '.KKKKKKKKKKY',
  '...KKKKKK..Y',
  '...KKKKKK..Y',
  '...........Y',
  '..........YY',
]
const CAP_C = { K: '#2a2350', Y: GOLD }

// a page with a title and line items that appear one by one
function page(x, cx, cy, k, lt, title, items, { rot = 0.05, w = 300, size = 26 } = {}) {
  if (k <= 0.01) return
  const h = 110 + items.length * 52
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16)
  x.fillStyle = CREAM; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = TEAL; x.fillRect(-w / 2, -h / 2, w, 56)
  x.fillStyle = CREAM; x.font = `800 28px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(title, 0, -h / 2 + 30)
  const n = Math.floor(clamp((lt - 0.4) / 1.3) * items.length + 0.001)
  x.fillStyle = INK; x.font = `700 ${size}px ${MONO}`; x.textAlign = 'left'
  for (let i = 0; i < Math.min(n + 1, items.length); i++) x.fillText(items[i], -w / 2 + 22, -h / 2 + 92 + i * 52)
  x.restore()
}
// a bar chart, rising
function bars(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -170, 300, 300)
  x.fillStyle = '#140c30'; x.fillRect(-142, -162, 284, 284)
  const H = [50, 80, 120, 200]
  for (let i = 0; i < 4; i++) { const h = H[i] * ease.outCubic(prog(lt, 0.4 + i * 0.2, 0.9 + i * 0.2)); x.fillStyle = i === 3 ? PINK : TEAL; x.fillRect(-120 + i * 64, 110 - h, 46, h) }
  x.fillStyle = CREAM; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.fillText('Q1  Q2  Q3  Q4', 0, -138)
  x.restore()
  if (lt > 1.5) drawBits(x, ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: '#ff4f86' }, cx + 110 * k, cy - 120 * k, 8)
}
// a big red APPROVED stamp slamming down
function stamp(x, cx, cy, lt) {
  const p = prog(lt, 1.0, 1.25)
  if (p <= 0) return
  const s = lerp(2.2, 1, ease.inCubic(p))
  x.save(); x.translate(cx, cy); x.rotate(-0.18); x.scale(s, s); x.globalAlpha *= clamp(p * 3)
  x.strokeStyle = RED; x.lineWidth = 8; x.strokeRect(-150, -40, 300, 80)
  x.fillStyle = RED; x.font = `800 48px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('APPROVED', 0, 4)
  x.restore()
}
// a love note card
function note(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -110, 300, 220)
  x.fillStyle = '#ffe1ea'; x.fillRect(-142, -102, 284, 204)
  x.fillStyle = INK; x.font = `800 36px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('i like you', 0, -30)
  x.font = `700 26px ${MONO}`; x.fillStyle = '#c94f7c'; x.fillText('do you like me?', 0, 30)
  x.restore()
}

const CAMEOS = [
  { sign: 'capricorn', cap: 'First date? | Brought *an agenda.*', mood: 'neutral', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      page(x, 800, 860, pop01(t, P.t0 + 0.2, 0.35, 2), lt, 'AGENDA', ['1. intros', '2. goals', '3. dessert', '4. AOB'])
      label(x, 800, 1130, 'MINUTES: TAKEN', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Asked your five-year plan. | *On date one.*', mood: lt => lt > 1.2 ? 'squint' : 'neutral', look: [1, 0], star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 800, 660, 'and in 2031?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      const k = pop01(t, P.t0 + 0.8, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'gemini', 800, 960, 210 * k, { mood: 'wide', look: [-1, 0], seed: 17, glyph: false })
      label(x, 800, 1150, 'APPETIZERS: NOT YET', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 28, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Most romantic gesture? | *A shared calendar.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: { x: -190 }, hops: [1.3],
    front(x, t, lt, P) {
      page(x, 800, 860, pop01(t, P.t0 + 0.2, 0.35, 2), lt, 'INVITE', ['DATE NIGHT', 'FRI 7:00 PM', 'REPEATS: FOREVER'], { size: 24, w: 320 })
      hearts(x, t, 560, 800, P.t0 + 1.3, { n: 4, life: 1.6, spread: 140, cell: 6, seed: 2 })
      label(x, 800, 1110, 'ACCEPTED ✓', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Said “I love you” | in *a quarterly review.*', mood: lt => lt > 1.5 ? 'heart' : 'neutral', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      bars(x, 800, 860, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      label(x, 800, 1110, 'Q4: FEELINGS UP', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'You wrote a love note. | It got *approved.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      note(x, 800, 860, pop01(t, P.t0 + 0.2, 0.35, 2))
      stamp(x, 800, 880, lt)
      label(x, 800, 1110, 'FILED UNDER: YES', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Their dating profile? | *A résumé.*', mood: 'neutral', look: [1, 0], star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      page(x, 800, 860, pop01(t, P.t0 + 0.2, 0.35, 2), lt, '♑︎ CAP, 31', ['EXPERIENCE:', '  dating, 10 yrs', 'SKILLS: loyalty', 'REFERENCES: mum'], { size: 24, w: 320, rot: 0.04 })
      label(x, 800, 1140, 'HOBBIES: WORK', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 30, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Birthday gift? | *A savings account.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', star: { x: -190 }, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, PIG, PIG_C, 800, 880, 22 * pop01(t, P.t0 + 0.3, 0.3, 2))
      x.save(); x.fillStyle = INK; x.fillRect(758, 760, 84, 14); x.restore()
      const c = prog(lt, 0.8, 1.2); if (c > 0 && c < 1) drawBits(x, ['.YYY.', 'YYYYY', 'YYYYY', '.YYY.'], { Y: GOLD }, 800, lerp(640, 760, c), 9)
      bubble(x, 390, 600, 'happy birthday!', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 36, tail: 'bc' })
      label(x, 800, 1110, 'IT COMPOUNDS ♡', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Took one day off. | Felt *guilty* all day.', mood: lt => lt > 1.0 ? 'wide' : 'sleepy', look: [1, 0], star: { x: -190 }, hops: [1.0],
    front(x, t, lt, P) {
      bubble(x, 800, 660, 'relax, babe', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, col: PINK, tail: 'br' })
      const n = Math.floor(clamp((lt - 0.8) / 1.2) * 4)
      for (let i = 0; i < n; i++) label(x, 800, 830 + i * 80, ['checked email', 'checked again', 'made a plan', 'for tomorrow'][i], 1, { size: 28, bg: BONE, rot: i % 2 ? 0.04 : -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Stoic all year. | *Cried* at your graduation.', mood: lt => lt > 1.0 ? 'heart' : 'neutral', tears: lt => lt > 1.0 ? 2 : 0, look: [1, 0], star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) { const Fc = signChar(x, t, 'gemini', 800, 970, 220 * k, { mood: 'sparkle', look: [-1, 0], seed: 21, glyph: false, hops: [P.t0 + 0.9] }); drawBits(x, CAP, CAP_C, 800, Fc.top - 10, 12 * k, { rot: -0.08 }) }
      label(x, 800, 680, '“NOT CRYING.”', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 560, 800, P.t0 + 1.4, { n: 5, life: 1.7, spread: 160, cell: 7, seed: 4 })
    } },
]

const F = makeFilm({
  id: 'v3t086', key: 'C', accent: TEAL, solo: 'capricorn', ending: 'callback',
  title: 'Dating a Capricorn | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Serious. | *Seriously sweet.*', mood: 'heart' },
  last: {
    text: 'The five-year plan? | *You’re in it.*',
    draw(x, t, lt) {
      const t0 = t - lt
      page(x, 540, 1180, 1.6 * pop01(t, t0 + 0.4, 0.35, 2), lt - 0.4, 'PLAN: 2031', ['house: yes', 'dog: yes', 'you: YES'], { w: 300, rot: -0.04, size: 30 })
      hearts(x, t, 250, 1300, t0 + 1.6, { n: 4, life: 2.0, spread: 120, cell: 8, seed: 3 }); hearts(x, t, 830, 1300, t0 + 1.8, { n: 4, life: 2.0, spread: 120, cell: 8, seed: 5 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
