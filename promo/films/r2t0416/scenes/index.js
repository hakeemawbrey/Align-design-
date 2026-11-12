// r2t0416: star_talk, BELIKE, "What's your sign? | Zodiacs be like." (~59 s vertical, signs3kit social cut, music: lofi · C)
// Twelve signs in zodiac order, each one's most extreme answer to "what's your sign?". Ending: lesson.
//   0.0–3.6    hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ answered before you finished asking · ♉ answers after snacks · ♊ two answers, both confident
//              · ♋ asked yours, then adopted you · ♌ hired a spotlight · ♍ laminated their chart · ♎ "what would you like?"
//              · ♏ didn't answer, already knew yours · ♐ answered from the airport · ♑ asked for your five-year plan
//              · ♒ "signs aren't real" then explained theirs · ♓ someone asked? happy tears
//  49.2        "One question. | *Twelve speeches.*"
//  52.4        LESSON UNLOCKED: "Ask people about themselves. | They *light up.*"  CURIOSITY: ON
//  58.3        "So… what's | *your* sign?"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CREAM = '#fff4e2', ORANGE = '#ffb34a', ACC = '#8fd4ff'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })
const ST = { x: -170 }

// ── props
const COOKIE = ['..CCCC..', '.CCdCCC.', 'CCCCCdCC', 'CdCCCCCC', 'CCCCdCCC', '.CdCCCC.', '..CCCC..']
const COOKIE_C = { C: '#e7b46a', d: '#6b3a1e' }
const SUITCASE = ['....KKKK....', '....K..K....', 'OOOOOOOOOOOO', 'OOyOOOOOOyOO', 'OOyOOOOOOyOO', 'OOyOOOOOOyOO', 'OOOOOOOOOOOO', '.K........K.']
const SUITCASE_C = { K: INK, O: ORANGE, y: '#c98f2a' }
const HEART_BIG = ['.HH.HH.', 'HHHHHHH', 'HWHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']

/** a sheet of paper with a little wheel chart and lines of tiny text */
function chartSheet(x, t, cx, cy, k, { shine = 0, rot = 0.05 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-128, -158, 268, 336)
  x.fillStyle = INK; x.fillRect(-140, -170, 280, 340); x.fillStyle = CREAM; x.fillRect(-132, -162, 264, 324)
  x.strokeStyle = '#6b62a8'; x.lineWidth = 5; x.beginPath(); x.arc(0, -60, 70, 0, Math.PI * 2); x.stroke()
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2 + t * 0.3; x.beginPath(); x.moveTo(0, -60); x.lineTo(Math.cos(a) * 70, -60 + Math.sin(a) * 70); x.lineWidth = 2; x.stroke() }
  x.fillStyle = '#b9b0a0'; for (let i = 0; i < 5; i++) x.fillRect(-100, 40 + i * 22, i % 2 ? 150 : 200, 8)
  if (shine > 0) { x.globalAlpha = 0.5 * shine; x.fillStyle = '#ffffff'; x.beginPath(); x.moveTo(-132 + 300 * shine - 60, -162); x.lineTo(-132 + 300 * shine, -162); x.lineTo(-132 + 300 * shine - 160, 162); x.lineTo(-132 + 300 * shine - 220, 162); x.fill() }
  x.restore()
}
/** a spotlight cone from the top of the panel down onto (cx, floor) */
function spotlight(x, cx, k) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha = 0.32 * clamp(k)
  const g = x.createLinearGradient(0, 480, 0, 1180); g.addColorStop(0, '#fff3c0'); g.addColorStop(1, 'rgba(255,243,192,0)')
  x.fillStyle = g; x.beginPath(); x.moveTo(cx - 40, 480); x.lineTo(cx + 40, 480); x.lineTo(cx + 230, 1180); x.lineTo(cx - 230, 1180); x.fill()
  x.restore()
  x.save(); x.fillStyle = INK; x.fillRect(cx - 54, 470, 108, 44); x.fillStyle = '#9aa5c4'; x.fillRect(cx - 46, 476, 92, 32); x.restore()
}
/** a clipboard with a heading and tick boxes */
function clipboard(x, cx, cy, k, head, rows, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -190, 300, 380); x.fillStyle = '#c98f2a'; x.fillRect(-142, -182, 284, 364)
  x.fillStyle = CREAM; x.fillRect(-124, -150, 248, 316)
  x.fillStyle = '#9aa5c4'; x.fillRect(-50, -200, 100, 34)
  x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -112)
  x.textAlign = 'left'; x.font = `700 24px ${MONO}`
  rows.forEach((r, i) => {
    const y = -50 + i * 66
    x.fillStyle = INK; x.fillRect(-104, y - 16, 32, 32); x.fillStyle = CREAM; x.fillRect(-98, y - 10, 20, 20)
    if (lt > 0.8 + i * 0.35) { x.fillStyle = '#2f9a4a'; x.fillRect(-96, y - 4, 8, 10); x.fillRect(-90, y - 10, 8, 16) }
    x.fillStyle = INK; x.fillText(r, -58, y + 2)
  })
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Answered before | you *finished asking.*', mood: 'sparkle', star: ST, hops: [0.4],
    front(x, t, lt, P) {
      bubble(x, 790, 660, 'so what’s yo—', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 36, col: LAV, tail: 'br' })
      L(x, 790, 880, 'ARIES. NEXT.', pop01(t, P.t0 + 0.55, 0.3, 2.6), RED, -0.06, 52)
      sparkles(x, t, 790, 880, P.t0 + 0.6, 7, 190, 0.2, [RED, GOLD, BONE])
      L(x, 790, 1090, 'RESPONSE TIME: 0.0s', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, 0.04, 28)
    } },
  { sign: 'taurus', cap: 'Will answer. | *After snacks.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      x.save(); const pk = pop01(t, P.t0 + 0.2, 0.3, 2); x.globalAlpha = clamp(pk)
      x.fillStyle = INK; x.beginPath(); x.ellipse(790, 1020, 180 * pk, 48 * pk, 0, 0, Math.PI * 2); x.fill()
      x.fillStyle = CREAM; x.beginPath(); x.ellipse(790, 1014, 168 * pk, 40 * pk, 0, 0, Math.PI * 2); x.fill(); x.restore()
      const n = 3 - Math.floor(clamp((lt - 0.9) / 1.1) * 3)
      for (let i = 0; i < n; i++) drawBits(x, COOKIE, COOKIE_C, 720 + i * 70, 985 - (i % 2) * 18, 11 * pop01(t, P.t0 + 0.3 + i * 0.12, 0.3, 2))
      bubble(x, 800, 690, 'one sec. | chewing.', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 36, tail: 'bl' })
      L(x, 800, 1140, 'ANSWER: PENDING', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, -0.04, 28)
    } },
  { sign: 'gemini', cap: 'Gave two answers. | Both *confident.*', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 760, 660, 'gemini!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 46, tail: 'bl' })
      bubble(x, 820, 880, 'also libra?', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, col: ACC, tail: 'bl' })
      L(x, 790, 1090, 'BOTH. FINAL ANSWER.', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, 0.04, 28)
    } },
  { sign: 'cancer', cap: 'Asked yours back. | Then *adopted you.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'sagittarius', 800, 930, 190 * k, { mood: lt > 1.4 ? 'wide' : 'happy', look: [-1, 0], seed: 12, glyph: false })
      bubble(x, 800, 660, 'and you?', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 40, tail: 'bl' })
      L(x, 800, 1110, 'FAMILY NOW', pop01(t, P.t0 + 1.3, 0.3, 2.4), PINK, -0.04, 40)
      hearts(x, t, 680, 900, P.t0 + 1.4, { n: 5, life: 1.6, spread: 220, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Hired a *spotlight* | to answer.', mood: 'sparkle', star: ST, hops: [1.0],
    back(x, t, lt, P) { spotlight(x, 370, pop01(t, P.t0 + 0.4, 0.3, 2)) },
    front(x, t, lt, P) {
      L(x, 790, 760, 'LEO.', pop01(t, P.t0 + 1.0, 0.3, 2.6), ORANGE, -0.05, 64)
      L(x, 790, 900, 'OBVIOUSLY.', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, 0.05, 40)
      sparkles(x, t, 370, 620, P.t0 + 1.0, 8, 160, 0.5)
    } },
  { sign: 'virgo', cap: 'Handed you | a *laminated chart.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      chartSheet(x, t, 790, 860, pop01(t, P.t0 + 0.3, 0.35, 2), { shine: clamp((lt - 1.0) / 0.6) })
      L(x, 790, 1110, 'NOW WITH FOOTNOTES', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, 0.04, 28)
    } },
  { sign: 'libra', cap: 'Asked which sign | *you’d prefer.*', mood: lt => lt > 1.0 ? 'wink' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'what would | you like me | to be?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, col: PINK, tail: 'bl' })
      L(x, 790, 1000, 'OPEN TO OFFERS', pop01(t, P.t0 + 1.3, 0.3, 2.4), LAV, -0.04, 32)
    } },
  { sign: 'scorpio', cap: 'Didn’t answer. | Already *knew yours.*', mood: lt => lt > 1.2 ? 'squint' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 680, '…', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 60, col: LAV, tail: 'bl' })
      bubble(x, 790, 880, 'you’re a virgo.', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 38, tail: 'bl' })
      L(x, 790, 1080, 'THEIRS: CLASSIFIED', pop01(t, P.t0 + 1.7, 0.3, 2.4), RED, 0.04, 30)
    } },
  { sign: 'sagittarius', cap: 'Answered from | *the airport.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.6, 1.2],
    front(x, t, lt, P, F) {
      drawBits(x, SUITCASE, SUITCASE_C, 800, 960, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.04 * Math.sin(t * 6) })
      L(x, 800, 1110, 'GATE 12: BOARDING', pop01(t, P.t0 + 0.6, 0.3, 2.4), SKYB, -0.04, 28)
      bubble(x, 790, 680, 'SAG! BYE!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 44, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'First, your | *five-year plan.*', mood: lt => lt > 1.4 ? 'squint' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      clipboard(x, 790, 860, pop01(t, P.t0 + 0.25, 0.35, 2), 'SIGN INTAKE', ['GOALS?', 'BUDGET?', 'RISING?'], lt)
      L(x, 790, 1120, 'THEN WE TALK SIGNS', pop01(t, P.t0 + 1.8, 0.3, 2.4), GOLD, 0.04, 28)
    } },
  { sign: 'aquarius', cap: 'Signs aren’t real. | Anyway, *I’m Aquarius.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 660, 'it’s all fake', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, col: LAV, tail: 'bl' })
      chartSheet(x, t, 810, 920, pop01(t, P.t0 + 1.0, 0.35, 2) * 0.8, { rot: -0.06 })
      L(x, 790, 1120, 'LECTURE: 40 MIN', pop01(t, P.t0 + 1.6, 0.3, 2.4), ACC, -0.04, 30)
    } },
  { sign: 'pisces', cap: 'Someone *asked?* | Happy tears.', mood: 'heart', tears: lt => lt > 0.9 ? 3 : 2, look: [1, 0], star: ST, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, HEART_BIG, { H: PINK, W: '#fff' }, 790, 830, 26 * pop01(t, P.t0 + 0.4, 0.35, 2), { rot: 0.06 * Math.sin(t * 3) })
      hearts(x, t, 790, 900, P.t0 + 0.8, { n: 7, life: 2.0, spread: 260, cell: 7, seed: 6 })
      L(x, 790, 1100, 'BEST DAY EVER', pop01(t, P.t0 + 1.3, 0.3, 2.4), SKYB, 0.04, 34)
    } },
]

const F = makeFilm({
  id: 'r2t0416', key: 'C', accent: GOLD, ending: 'lesson',
  title: 'What’s your sign? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'One question. | *Twelve speeches.*' },
  lesson: { text: 'Ask people about themselves. | They *light up.*', chip: 'CURIOSITY: ON' },
  last: {
    text: 'So… what’s | *your* sign?',
    draw(x, t, lt) {
      const t0 = t - lt
      bubble(x, 540, 750, '?', pop01(t, t0 + 0.9, 0.3, 2.4), { size: 90, col: GOLD, tail: 'bc' })
      sparkles(x, t, 540, 750, t0 + 1.0, 9, 170, 0.4)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
