// r2a0322: star_advice, ADVICE SOLO (virgo), "Signs a Virgo | likes you." (signs3kit social cut, music: lofi · F).
// Nine little ways Virgo love shows up, each a warm truth with one gag. Ending: card (Virgo + Taurus, the labeled snacks).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CREAM = '#fff4e2', ACC = '#7dffb0'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })
const BOX = ['.KKKKKKKKKK.', 'KKKKKKKKKKKK', 'KMMMMMMMMMMK', 'KMWWWWWWWWMK', 'KMWWWWWWWWMK', 'KMMMMMMMMMMK', 'KKKKKKKKKKKK']
const FRAME = ['KKKKKKKKKK', 'KYYYYYYYYK', 'KYSSSSSSYK', 'KYSGGSSSYK', 'KYGGGGSSYK', 'KYGGGGGGYK', 'KYYYYYYYYK', 'KKKKKKKKKK']
const HEARTBM = ['.HH.HH.', 'HHHHHHH', 'HWHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']
const WHEEL = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
function chart(x, cx, cy, r, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.25)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { x.fillStyle = WHEEL[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, (i / 12) * Math.PI * 2, ((i + 1) / 12) * Math.PI * 2); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, r * 0.62, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; for (const a of [0.4, 2.6, 4.5, 1.2, 3.9]) x.fillRect(Math.cos(a) * r * 0.45 - 7, Math.sin(a) * r * 0.45 - 7, 14, 14)
  x.restore()
}
/** a paper card with lines of text; marks = [[lineIndex, 'strike'|'tick'], …] revealed by k2 */
function paper(x, cx, cy, k, head, lines, { rot = 0.04, w = 320, headCol = ACC, size = 28 } = {}) {
  if (k <= 0.01) return
  const h = 90 + lines.length * 50
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12); x.fillStyle = CREAM; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = headCol; x.fillRect(-w / 2, -h / 2, w, 56)
  x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -h / 2 + 29)
  x.font = `800 ${size}px ${INTER}`
  lines.forEach((l, i) => { x.fillStyle = l.startsWith('!') ? RED : INK; x.fillText(l.replace(/^!/, ''), 0, -h / 2 + 90 + i * 50) })
  x.restore()
}

const S = 'virgo', ST = { x: -170 }
const CAMEOS = [
  { sign: S, cap: 'They fixed your typo. | That’s *a love letter.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      paper(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), 'YOUR TEXT', lt > 1.0 ? ['see you their', '!*there'] : ['see you their', ''])
      if (lt > 1.4) hearts(x, t, 620, 1000, P.t0 + 1.4, { n: 4, life: 1.4, spread: 180, cell: 7, seed: 3 })
      L(x, 790, 1080, 'CORRECTED WITH LOVE', pop01(t, P.t0 + 1.6, 0.3, 2.4), PINK, -0.04, 28)
    } },
  { sign: S, cap: 'They remember your order. | *Exactly.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      paper(x, 790, 840, pop01(t, P.t0 + 0.2, 0.3, 2), 'YOUR USUAL', ['oat milk', 'extra hot', 'no foam', 'one sugar (secret)'], { size: 26 })
      L(x, 790, 1120, 'MEMORIZED ✓', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, 0.04, 34)
    } },
  { sign: S, cap: 'They planned your week. | *With naps.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      paper(x, 790, 840, pop01(t, P.t0 + 0.2, 0.3, 2), 'YOUR WEEK', ['9:00 work', '1:00 lunch', lt > 1.0 ? '!2:00 NAP (you)' : '2:00 ——', '3:00 nap again'], { headCol: LAV })
    } },
  { sign: S, cap: 'They pack your snacks. | *Labeled.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const D = ['MON', 'TUE', 'WED']
      D.forEach((d, i) => {
        const k = pop01(t, P.t0 + 0.2 + i * 0.3, 0.3, 2)
        drawBits(x, BOX, { K: INK, M: [PINK, GOLD, SKYB][i], W: CREAM }, 790, 700 + i * 150, 16 * k)
        L(x, 790, 708 + i * 150, d, k, BONE, 0, 26)
      })
      bubble(x, 790, 1150, 'eat the tuesday | on tuesday.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 30, tail: 'bl' })
    } },
  { sign: S, cap: 'Noticed your haircut. | *Day one.*', mood: lt => lt > 1.3 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'libra', 810, 900, 180 * k, { mood: 'happy', look: [-1, 0], seed: 11, glyph: false })
      bubble(x, 790, 650, 'one cm shorter? | it suits you.', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 32, col: ACC, tail: 'bl' })
      L(x, 800, 1100, 'NOBODY ELSE SAW', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: S, cap: 'They checked your chart. | *Twice.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      chart(x, 790, 800, 130, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      L(x, 790, 1000, 'CHECK 1 ✓', pop01(t, P.t0 + 0.7, 0.3, 2.4), MINT, -0.04, 32)
      L(x, 790, 1090, 'CHECK 2 ✓', pop01(t, P.t0 + 1.3, 0.3, 2.4), PINK, 0.04, 32)
    } },
  { sign: S, cap: 'They worry out loud. | That’s *care.*', mood: lt => lt > 1.5 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 760, 620, 'did you eat?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 36, tail: 'bl' })
      bubble(x, 820, 780, 'water??', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 36, tail: 'bl' })
      bubble(x, 760, 940, 'jacket. it’s cold.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 34, tail: 'bl' })
      L(x, 790, 1110, 'TRANSLATION: LOVE', pop01(t, P.t0 + 1.6, 0.3, 2.4), PINK, -0.04, 34)
    } },
  { sign: S, cap: 'They organized your shelf. | *By colour.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k <= 0.01) return
      x.save(); x.translate(790, 900); x.scale(k, k)
      x.fillStyle = INK; x.fillRect(-170, 70, 340, 24); x.fillStyle = '#8a4a2e'; x.fillRect(-164, 74, 328, 16)
      const C = ['#ff6b5a', '#ffb34a', '#ffd23a', '#5fd068', '#6fc3ff', '#4f8bff', '#c97bff', '#ff8fb1']
      const mess = [3, 0, 6, 1, 7, 2, 5, 4], p = ease.inOutCubic(prog(lt, 0.6, 1.4))
      for (let i = 0; i < 8; i++) {
        const from = mess.indexOf(i), xx = lerp(-150 + from * 38, -150 + i * 38, p), h = 120 + (i % 3) * 16
        x.fillStyle = INK; x.fillRect(xx - 3, 70 - h - 3, 36, h + 3); x.fillStyle = C[i]; x.fillRect(xx, 70 - h, 30, h)
      }
      x.restore()
      L(x, 790, 1090, 'RAINBOW: RESTORED', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: S, cap: 'Left one thing crooked. | *For you.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      const r = lerp(0, 0.22, ease.outBack ? clamp(lt / 0.8) : 0)
      drawBits(x, FRAME, { K: INK, Y: GOLD, S: SKYB, G: '#5fd068' }, 790, 820, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: r })
      bubble(x, 780, 1060, 'it’s fine. | (it’s growth.)', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 34, col: ACC, tail: 'bl' })
      hearts(x, t, 790, 760, P.t0 + 1.5, { n: 4, life: 1.4, spread: 200, cell: 7, seed: 8 })
    } },
]

const F = makeFilm({
  id: 'r2a0322', key: 'F', accent: ACC, solo: 'virgo', ending: 'card',
  title: 'Signs a Virgo | *likes you.*',
  cameos: CAMEOS,
  group: { cap: 'Love is | *in the details.*', mood: 'heart' },
  lesson: { text: 'Notice their noticing. | It’s *how they say it.*', chip: 'STATUS: NOTICED' },
  card: { a: 'virgo', b: 'taurus', chip: 'ALIGNED' },
  last: { text: 'Snacks, labeled | *forever.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
