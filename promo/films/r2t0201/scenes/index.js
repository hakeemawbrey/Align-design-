// r2t0201: star_talk, SOLO film, "Capricorn red flags | *we love.*" (~52 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole way: nine "red flags" that are secretly the best things about a Capricorn. Ending: card.
//   0.0–3.6    "Capricorn red flags | *we love.*"
//   3.6–37.8   nine cards: a five-year plan on date one · answers "hey" with a calendar invite · Friday: asleep by nine
//              · a spreadsheet for their feelings · on vacation, answering emails · says "I love you" as "noted."
//              · was forty years old at age eight · checked your birth chart and your résumé · laughs once a year
//  37.8        "Red flags? | *Green, actually.*"
//  41.0        LESSON: "Their love is a plan | with *you* in it."  STATUS: SECURED
//  46.9        "Ideal date? | Both *asleep by nine.*" over the match card: Capricorn + Taurus.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const SLATE = '#9aa5c4', RED = '#e23d4e', GREEN = '#3fcf7a'

// a bone index card with an optional coloured header
function card(x, cx, cy, k, lines, { w = 330, size = 32, rot = 0.04, head = null, headBg = GOLD, mono = false } = {}) {
  if (k <= 0.01) return
  const lh = size * 1.45, h = lines.length * lh + 40 + (head ? 60 : 0)
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = BONE; x.fillRect(-w / 2, -h / 2, w, h)
  let y0 = -h / 2 + 20
  if (head) { x.fillStyle = headBg; x.fillRect(-w / 2, -h / 2, w, 60); x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -h / 2 + 31); y0 += 60 }
  x.fillStyle = INK; x.font = `${mono ? 700 : 800} ${size}px ${mono ? MONO : INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, -w / 2 + 24, y0 + lh * (i + 0.5)))
  x.restore()
}
const GLASSES = ['KKKKK.KKKKK', 'KWWWK.KWWWK', 'KWWWKKKWWWK', 'KWWWK.KWWWK', 'KKKKK.KKKKK']
const LAPTOP = ['KKKKKKKKKKKKKK', 'KSSSSSSSSSSSSK', 'KSBBBBBBBBBBSK', 'KSBWWWWWWWWBSK', 'KSBBBBBBBBBBSK', 'KSBWWWWWBBBBSK', 'KSBBBBBBBBBBSK', 'KSSSSSSSSSSSSK', 'KKKKKKKKKKKKKK', 'KGGGGGGGGGGGGGGK', 'KKKKKKKKKKKKKKKK']
const LAPTOP_C = { K: INK, S: '#2a2350', B: '#3d8fd8', W: '#e8f4ff', G: SLATE }
const UMBRELLA = ['....RRRRR....', '..RRWWRRRWR..', '.RRRWWRRRWWR.', 'RRRRWWRRRRWWR', '......K......', '......K......', '......K......', '......K......', '......K......', '......K......', '.....KK......']
const MOON = ['..YYY.', '.YY...', 'YY....', 'YY....', 'YY....', '.YY...', '..YYY.']

const CAMEOS = [
  { sign: 'capricorn', cap: 'Made a *five-year plan* | on date one.', mood: lt => lt > 1.4 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const yrs = ['YR 1: 2nd date', 'YR 2: a dog', 'YR 3: a sofa', 'YR 5: a house']
      const n = Math.min(4, Math.floor(clamp((lt - 0.3) / 1.2) * 4) + 1)
      card(x, 790, 840, pop01(t, P.t0 + 0.2, 0.3, 2), yrs.slice(0, n).concat(Array(4 - n).fill('')), { head: 'THE PLAN', headBg: SLATE, w: 330, size: 30, rot: 0.05 })
      label(x, 790, 1130, 'APPETIZERS: NOT YET', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 28, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Answers "hey" | with a *calendar invite.*', mood: 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 780, 640, 'hey', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 44, col: LAV, tail: 'bl' })
      card(x, 790, 920, pop01(t, P.t0 + 0.9, 0.3, 2), ['"hey"', '7:00–7:15 pm', 'agenda attached'], { head: 'INVITE', headBg: MINT, w: 330, size: 30, rot: -0.04 })
    } },
  { sign: 'capricorn', cap: 'Friday night? | *Asleep by nine.*', mood: lt => lt > 1.0 ? 'sleepy' : 'neutral', star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, MOON, { Y: '#ffe7a8' }, 800, 700, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 960, '9:00 PM', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 56, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 800, 1130, 'party? at 9?', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 32, col: PINK, tail: 'bc' })
    } },
  { sign: 'capricorn', cap: 'Has a *spreadsheet* | for their feelings.', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(770, 860); x.rotate(0.03); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-176, -166, 352, 332); x.fillStyle = '#f6f8f2'; x.fillRect(-168, -158, 336, 316)
        x.fillStyle = GREEN; x.fillRect(-168, -158, 336, 52)
        x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'
        x.fillText('FEELING', -152, -132); x.fillText('WHEN', 40, -132)
        const rows = [['happy', 'Q2'], ['sad', 'later'], ['in love', 'yes!']]
        const n = Math.min(3, Math.floor(clamp((lt - 0.4) / 1.0) * 3) + 1)
        x.strokeStyle = '#b9c0b0'; x.lineWidth = 2
        for (let r = 0; r < 3; r++) { const yy = -106 + r * 86; x.beginPath(); x.moveTo(-168, yy); x.lineTo(168, yy); x.stroke() }
        x.beginPath(); x.moveTo(26, -158); x.lineTo(26, 158); x.stroke()
        x.font = `800 28px ${INTER}`
        for (let r = 0; r < n; r++) { x.fillStyle = INK; x.fillText(rows[r][0], -152, -62 + r * 86); x.fillStyle = r === 2 ? '#1f9a55' : '#6b62a8'; x.fillText(rows[r][1], 40, -62 + r * 86) }
        x.restore()
      }
    } },
  { sign: 'capricorn', cap: 'On vacation. | *Answering emails.*', mood: 'neutral', look: [1, 1], star: { x: -170 },
    back(x, t, lt, P) {
      drawBits(x, UMBRELLA, { R: '#ff6b5a', W: '#fff4e2', K: INK }, 420, 640, 22 * pop01(t, P.t0 + 0.1, 0.3, 2), { rot: -0.1 })
      x.fillStyle = 'rgba(255,214,140,0.35)'; x.fillRect(110, 1110, 860, 110)
    },
    front(x, t, lt, P) {
      drawBits(x, LAPTOP, LAPTOP_C, 790, 930, 20 * pop01(t, P.t0 + 0.3, 0.3, 2))
      const n = Math.floor(clamp((lt - 0.5) / 1.4) * 48)
      label(x, 790, 690, `REPLIED: ${n}`, pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 36, bg: SKYB, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Says "I love you" | as *"noted."*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 }, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'I love you!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, col: PINK, tail: 'br' })
      bubble(x, 760, 960, 'noted.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 60, tail: 'bl' })
      hearts(x, t, 560, 760, P.t0 + 1.4, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 5 })
    } },
  { sign: 'capricorn', cap: 'Was *forty years old* | at age eight.', mood: 'neutral', star: { x: -170 },
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      if (k > 0.01) drawBits(x, GLASSES, { K: INK, W: 'rgba(232,244,255,0.55)' }, F.x, F.cy - 6, 14 * k)
      card(x, 800, 840, pop01(t, P.t0 + 0.6, 0.3, 2), ['age: 8', 'hobby: taxes', 'bedtime: 7'], { head: 'CLASS PHOTO', headBg: GOLD, w: 300, size: 30, rot: 0.05 })
      label(x, 800, 1120, 'MENTALLY: 40', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: SLATE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Checked your *birth chart* | and your résumé.', mood: lt => lt > 1.6 ? 'wink' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      card(x, 720, 760, pop01(t, P.t0 + 0.2, 0.3, 2), ['sun: Taurus', 'moon: Virgo'], { head: 'BIRTH CHART', headBg: LAV, w: 300, size: 30, rot: -0.06 })
      card(x, 860, 1010, pop01(t, P.t0 + 0.9, 0.3, 2), ['3 references', 'all checked'], { head: 'RÉSUMÉ', headBg: SKYB, w: 290, size: 30, rot: 0.06 })
      label(x, 600, 1150, 'APPROVED', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.08, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Laughs once a year. | *Worth the wait.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', star: { x: -170 }, hops: [1.25, 1.5],
    keyCue: t0 => ['pluck', t0 + 1.6, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 800, 680, 'LAUGH: 1 / YEAR', pop01(t, P.t0 + 0.2, 0.3, 2.2), { size: 34, bg: BONE, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 920, 'ha.', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 96, col: GOLD, tail: 'bl' })
      sparkles(x, t, 790, 920, P.t0 + 1.25 * 1.29, 8, 200, 0.4)
      if (lt > 1.4) label(x, 800, 1140, 'EVERYONE CRIED', pop01(t, P.t0 + 1.9, 0.3, 2.4), { size: 30, bg: PINK, rot: -0.05, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0201', key: 'C', accent: SLATE, solo: 'capricorn', ending: 'card',
  title: 'Capricorn red flags | *we love.*',
  cameos: CAMEOS,
  card: { a: 'capricorn', b: 'taurus', chip: 'ALIGNED' },
  group: { cap: 'Red flags? | *Green, actually.*', mood: 'wink' },
  lesson: { text: 'Their love is a plan | with *you* in it.', chip: 'STATUS: SECURED' },
  last: {
    text: 'Ideal date? | Both *asleep by nine.*',
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
