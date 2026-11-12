// r2a0178: star_advice, ADVICE SOLO (Virgo), "Virgo, let yourself | be loved." (~51 s vertical, signs3kit social cut, music: lofi · C)
// Nine cards, each a relatable Virgo truth + a warm reframe, one gag each. Ending: card (lesson + last line + match card).
//   0.0–3.6    "Virgo, let yourself | *be loved.*"
//   3.6–37.8   someone made you tea, don't re-make it · a compliment: just "thank you" · they planned the date, let them
//              · help offered, say yes · messy gift wrap is still love · rest while they cook · your match likes you, not
//              your résumé · hugs don't need a schedule · no need to earn it (the checklist ticks itself)
//  37.8        "Let it in. | *All of it.*"
//  41.0        LESSON: "Let someone | *take care of you.*"  STATUS: CHERISHED
//  46.9        "Even if the tea | is *a little weak.*" over the match card: Virgo + Cancer (who made the tea).
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const S = 'virgo', ST = { x: -170 }, SAGE = '#7dffb0', RED = '#e23d4e'

const MUG = ['..S..S....', '...S..S...', '..S..S....', 'WWWWWWWW..', 'WTTTTTTWWW', 'WTTTTTTW.W', 'WTTTTTTW.W', 'WTTTTTTWWW', 'WTTTTTTW..', '.WWWWWW...']
const MUG_C = { S: 'rgba(239,230,214,0.6)', W: '#fff4e2', T: '#c98f2a' }
const GIFT = ['..R...R...', '...R.R....', 'PPPPRPPPP.', 'PPPPRPPPPP', '.PPPRPPPPP', 'PPPPRPPP.P', 'PPYYRPPPPP', 'PPYYRPPPP.', 'PPPPRPPPPP']
const GIFT_C = { P: SKYB, R: PINK, Y: '#fff4e2' }
const BOX = ['KKKKKKKKKK', 'BBBBBBBBBB', 'BBBBTTBBBB', 'BBBBBBBBBB', 'BBBBBBBBBB', 'BBBBBBBBBB']
const BOX_C = { K: '#8a5a3a', B: '#c98f2a', T: '#fff4e2' }
const PAN = ['..FFFFFF......', '.FFFFFFFF.....', 'KKKKKKKKKKKKKK', 'KGGGGGGGGGGK..', '.KKKKKKKKKK...']
const PAN_C = { F: '#fff4e2', K: INK, G: '#9aa5c4' }

function note(x, cx, cy, k, lines, { head, headBg = GOLD, w = 330, size = 34, rot = 0.04, checks = null } = {}) {
  if (k <= 0.01) return
  const lh = size * 1.45, h = lines.length * lh + 40 + (head ? 56 : 0)
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = BONE; x.fillRect(-w / 2, -h / 2, w, h)
  let y0 = -h / 2 + 20
  if (head) { x.fillStyle = headBg; x.fillRect(-w / 2, -h / 2, w, 56); x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -h / 2 + 29); y0 += 56 }
  x.font = `800 ${size}px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach((l, i) => {
    const y = y0 + lh * (i + 0.5)
    let lx = -w / 2 + 24
    if (checks) { x.fillStyle = INK; x.fillRect(lx, y - 14, 28, 28); x.fillStyle = BONE; x.fillRect(lx + 4, y - 10, 20, 20); if (checks[i]) { x.fillStyle = '#2fc79a'; x.fillRect(lx + 2, y - 4, 10, 8); x.fillRect(lx + 10, y - 12, 8, 18); x.fillRect(lx + 16, y - 20, 8, 10) } lx += 44 }
    x.fillStyle = INK; x.fillText(l, lx, y)
  })
  x.restore()
}
function profile(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-142, -182, 300, 380)
  x.fillStyle = INK; x.beginPath(); x.roundRect(-156, -196, 312, 392, 26); x.fill()
  x.fillStyle = '#140c30'; x.beginPath(); x.roundRect(-148, -188, 296, 376, 20); x.fill()
  x.fillStyle = BONE; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('MATCH', 0, -150)
  x.restore()
  if (k > 0.6) signChar(x, t, 'virgo', cx, cy - 30, 150, { mood: 'happy', seed: 61, glyph: false, glow: 0.6 })
  x.save(); x.translate(cx, cy); x.rotate(0.04)
  x.fillStyle = BONE; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.fillText('likes: you', 0, 130); x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Someone made you tea. | *Don’t re-make it.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, MUG, MUG_C, 790, 880, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1110, 'PERFECT AS IS', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 38, bg: SAGE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'A compliment? | Just say *“thank you.”*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bubble(x, 800, 660, 'you look great!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, col: PINK, tail: 'br' })
      bubble(x, 780, 880, lt > 1.2 ? 'thank you!' : 'well, actual—', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 48, tail: 'bl' })
      label(x, 790, 1110, 'NO FOOTNOTES', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'They planned the date. | *Let them.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      note(x, 790, 840, pop01(t, P.t0 + 0.2, 0.3, 2), ['7:00 ???', '8:00 surprise!', '9:00 more ???'], { head: 'THEIR PLAN', headBg: PINK, w: 380, size: 38 })
      label(x, 790, 1110, 'YOUR CLIPBOARD: AWAY', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: SAGE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Help offered? | *Say yes* this time.', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      const lift = ease.outCubic(prog(lt, 1.1, 1.6)) * 80
      drawBits(x, BOX, BOX_C, 820, 960 - lift, 22 * k)
      if (k > 0.3) signChar(x, t, 'taurus', 820, 1100 - lift * 0.2, 180, { mood: 'happy', look: [-1, -1], seed: 22, glyph: false, glow: 0.5 })
      bubble(x, 780, 680, 'I got it!', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 44, col: '#5fd068', tail: 'br' })
    } },
  { sign: S, cap: 'Messy gift wrap | is still *love.*', mood: lt => lt > 1.1 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, GIFT, GIFT_C, 790, 870, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.12 })
      label(x, 790, 1110, 'TAPE: EVERYWHERE', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 34, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 790, 760, P.t0 + 1.5, { n: 4, life: 1.5, spread: 140, cell: 7, seed: 2 })
    } },
  { sign: S, cap: 'Rest while they cook. | The kitchen *will survive.*', mood: lt => lt > 1.4 ? 'sleepy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, PAN, PAN_C, 800, 900, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.1 * Math.sin(t * 6) })
      for (let i = 0; i < 6; i++) { const ph = ((t * 0.6 + i / 6) % 1); x.fillStyle = `rgba(255,244,226,${(0.6 * (1 - ph)).toFixed(2)})`; x.fillRect(740 + i * 22 + Math.sin(ph * 6 + i) * 20, 840 - ph * 200, 16, 16) }
      label(x, 790, 1110, 'FLOUR: ON CEILING', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Your match likes you. | *Not your résumé.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      profile(x, t, 790, 870, pop01(t, P.t0 + 0.2, 0.35, 2))
      hearts(x, t, 790, 700, P.t0 + 1.3, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 6 })
    } },
  { sign: S, cap: 'Hugs don’t need | *a schedule.*', mood: lt => lt > 1.1 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      note(x, 790, 840, pop01(t, P.t0 + 0.2, 0.3, 2), ['hug: 3:15pm', 'hug: anytime'], { head: 'SCHEDULE', headBg: SKYB, w: 360, size: 38 })
      if (lt > 1.0) { x.fillStyle = RED; x.fillRect(630, 822, 290 * clamp((lt - 1.0) / 0.3), 7) }
      label(x, 790, 1100, 'UPDATED', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 38, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'No need to earn it. | You’re *already loved.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      note(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), ['be perfect', 'be useful', 'be loved'], { head: 'TO DO', headBg: GOLD, w: 360, size: 38, checks: [0, 0, lt > 1.1] })
      sparkles(x, t, 790, 860, P.t0 + 1.2 * 1.29, 8, 220, 0.4)
      label(x, 790, 1120, 'DONE ALREADY', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 36, bg: SAGE, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0178', key: 'C', accent: SAGE, solo: S, ending: 'card',
  title: 'Virgo, let yourself | *be loved.*',
  cameos: CAMEOS,
  card: { a: 'virgo', b: 'cancer', chip: 'ALIGNED' },
  group: { cap: 'Let it in. | *All of it.*', mood: 'heart' },
  lesson: { text: 'Let someone | *take care of you.*', chip: 'STATUS: CHERISHED' },
  last: { text: 'Even if the tea | is *a little weak.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
