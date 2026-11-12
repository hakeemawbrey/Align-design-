// r2t0462: star_talk, BELIKE (twelve signs), "Zodiacs on a call | *be like.*" (signs3kit social cut, music: lofi · E).
// Ending: lesson.
//   ♈ called, forgot why · ♉ on speaker so they can keep eating · ♊ one quick thing, three hours · ♋ called mom, third time today
//   · ♌ only takes calls on speaker, in public · ♍ a script with footnotes · ♎ still deciding whether to answer (ring 14)
//   · ♏ ignored it, texted "who's this." · ♐ called from a mountain at 4 a.m. their time · ♑ booked the call two weeks out
//   · ♒ replied by letter · ♓ a match called, sobbed with joy
//   group "Could've been | a text."   lesson "A two-minute call | can make a whole day."   last "Call your people. | Gemini still is."
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#7dffb0', CREAM = '#fff4e2', RED = '#e23d4e', ORANGE = '#ffb34a', GREY = '#9aa5c4', PURP = '#6b62a8', DEEP = '#2a2350'
const L = (x, cx, cy, text, k, bg = GOLD, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
const ST = { x: -170 }

/** a phone: header strip, a big middle line, optional ring waves */
function phone(x, t, cx, cy, k, { head = '', headCol = MINT, big = '', bigCol = BONE, sub = '', ring = false, rot = 0.05, shake = 0 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx + shake * Math.sin(t * 40) * 6, cy); x.rotate(rot); x.scale(k, k)
  if (ring) {
    x.strokeStyle = MINT; x.lineWidth = 6
    for (let i = 0; i < 3; i++) { const ph = ((t * 1.4 + i / 3) % 1); x.globalAlpha = 1 - ph; x.beginPath(); x.arc(0, 0, 210 + ph * 90, -0.6, 0.6); x.stroke(); x.beginPath(); x.arc(0, 0, 210 + ph * 90, Math.PI - 0.6, Math.PI + 0.6); x.stroke() }
    x.globalAlpha = 1
  }
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = DEEP; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  if (head) { x.fillStyle = headCol; x.fillRect(-100, -156, 200, 46); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.fillText(head, 0, -132) }
  if (big) { x.fillStyle = bigCol; x.font = `800 ${big.length > 7 ? 34 : 44}px ${INTER}`; big.split('|').forEach((l, i, a) => x.fillText(l.trim(), 0, -10 + (i - (a.length - 1) / 2) * 50)) }
  if (sub) { x.fillStyle = GREY; x.font = `700 22px ${MONO}`; x.fillText(sub, 0, 70) }
  x.fillStyle = '#5fd068'; x.fillRect(-70, 110, 50, 40); x.fillStyle = RED; x.fillRect(20, 110, 50, 40)
  x.restore()
}
/** a paper card with lines of text */
function note(x, cx, cy, k, lines, { w = 300, bg = '#ffe27a', size = 34, rot = -0.06, font = INTER, weight = 800, lh = 1.55 } = {}) {
  if (k <= 0.01) return
  const LH = size * lh, h = lines.length * LH + 50
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16); x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = INK; x.font = `${weight} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, 0, -h / 2 + 25 + LH * (i + 0.5)))
  x.restore()
}
const SANDWICH = [
  '..BBBBBBBB..',
  '.BBWBBBBBBB.',
  'BBBBBBBBBBBB',
  'GGGGGGGGGGGG',
  'RRRRRRRRRRRR',
  'YYYYYYYYYYYY',
  'BBBBBBBBBBBB',
  '.BBBBBBBBBB.',
]
const SANDWICH_C = { B: '#e0a458', W: CREAM, G: '#5fd068', R: RED, Y: GOLD }
const MOUNTAIN = [
  '.......WW.......',
  '......WWWW......',
  '.....GGWWGG.....',
  '....GGGGGGGG....',
  '...GGGgGGGGGG...',
  '..GGGGGGGgGGGG..',
  '.GGgGGGGGGGGGGG.',
  'GGGGGGGGGGGgGGGG',
]
const MOUNTAIN_C = { W: '#ffffff', G: GREY, g: '#6b7590' }
const ENVELOPE = [
  'KKKKKKKKKKKKKK',
  'KWKWWWWWWWWKWK',
  'KWWKWWWWWWKWWK',
  'KWWWKWWWWKWWWK',
  'KWWWWKRRKWWWWK',
  'KWWWWWRRWWWWWK',
  'KWWWWWWWWWWWWK',
  'KKKKKKKKKKKKKK',
]
const ENVELOPE_C = { K: PURP, W: CREAM, R: RED }
const SUN = ['..Y..Y..', 'Y.YYYY.Y', '.YYYYYY.', 'YYYYYYYY', 'YYYYYYYY', '.YYYYYY.', 'Y.YYYY.Y', '..Y..Y..']

const CAMEOS = [
  // ♈
  { sign: 'aries', cap: 'Called instantly. | Forgot *why.*', mood: lt => lt < 1.0 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [0.4],
    front(x, t, lt, P) {
      phone(x, t, 800, 880, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'CALLING…', big: 'HI!!', bigCol: GOLD, sub: '0:02' })
      bubble(x, 520, 620, '…wait.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 44, tail: 'bc' })
    } },
  // ♉
  { sign: 'taurus', cap: 'On speaker. | Hands busy *eating.*', mood: lt => lt < 0.8 ? 'happy' : 'sparkle', star: ST,
    front(x, t, lt, P) {
      drawBits(x, SANDWICH, SANDWICH_C, 790, 1020, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 660, 'SPEAKER: ON', pop01(t, P.t0 + 0.5, 0.3, 2), MINT, -0.04, 36)
      bubble(x, 790, 830, 'mm-hm. mm.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 40, col: LAV, tail: 'bl' })
    } },
  // ♊
  { sign: 'gemini', cap: 'One quick thing. | *Three hours.*', mood: lt => lt < 1.2 ? 'happy' : 'sparkle', look: [1, 0], star: ST, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      const s = Math.floor(clamp((lt - 0.3) / 1.6) * 11284)
      const hh = Math.floor(s / 3600), mm = Math.floor(s / 60) % 60, ss = s % 60, f = n => String(n).padStart(2, '0')
      phone(x, t, 800, 880, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'ON CALL', big: `${hh}:${f(mm)}:${f(ss)}`, bigCol: MINT, sub: 'and another thing' })
      L(x, 520, 620, 'BATTERY 2%', pop01(t, P.t0 + 1.5, 0.3, 2.2), RED, -0.05, 32, CREAM)
    } },
  // ♋
  { sign: 'cancer', cap: 'Called mom. | *Third time today.*', mood: lt => lt < 0.9 ? 'happy' : 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 800, 880, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'MOM ♡', headCol: PINK, big: 'CALL #3', bigCol: PINK, sub: 'today' })
      hearts(x, t, 800, 700, P.t0 + 0.9, { n: 6, life: 1.6, spread: 220, cell: 7, seed: 4 })
    } },
  // ♌
  { sign: 'leo', cap: 'Only takes calls | on speaker, *in public.*', mood: 'sparkle', star: ST, hops: [1.0],
    front(x, t, lt, P) {
      phone(x, t, 820, 900, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'SPEAKER: MAX', headCol: GOLD, big: 'IT’S LEO!', bigCol: GOLD, rot: -0.08 })
      notes(x, t, 820, 700, { n: 4, cell: 7, col: GOLD, seed: 2 })
      bubble(x, 480, 620, 'HELLOOO!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 46, tail: 'bc' })
    } },
  // ♍
  { sign: 'virgo', cap: 'Wrote a script. | With *footnotes.*', mood: lt => lt < 1.2 ? 'squint' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      note(x, 790, 860, pop01(t, P.t0 + 0.15, 0.3, 2), ['CALL SCRIPT v4', '1. hi*', '2. small talk**', '*warmly', '**max 40 s'], { w: 330, bg: CREAM, size: 30, rot: 0.04, font: MONO, weight: 700 })
      L(x, 790, 1150, 'REHEARSED ×12', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, -0.04, 34)
    } },
  // ♎
  { sign: 'libra', cap: 'Phone ringing. | Still *deciding.*', mood: lt => lt < 1.0 ? 'wide' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.2) / 1.6) * 13)
      phone(x, t, 800, 880, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'INCOMING', big: 'answer?', bigCol: BONE, sub: `ring ${n}`, ring: true, shake: 1 })
      L(x, 520, 620, 'PROS / CONS…', pop01(t, P.t0 + 1.2, 0.3, 2.2), LAV, -0.05, 32)
    } },
  // ♏
  { sign: 'scorpio', cap: 'Ignored the call. | Texted *“who’s this.”*', mood: lt => lt < 1.0 ? 'squint' : 'eyeroll', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 800, 880, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'MISSED CALL', headCol: RED, big: 'Best Friend', bigCol: BONE, sub: 'saved since 2016' })
      bubble(x, 760, 620, 'who’s this.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 44, tail: 'br' })
    } },
  // ♐
  { sign: 'sagittarius', cap: 'Called to chat. | From *a mountaintop.*', mood: 'sparkle', star: ST, hops: [0.9],
    back(x, t, lt, P) { drawBits(x, MOUNTAIN, MOUNTAIN_C, 790, 1010, 26 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      drawBits(x, SUN, { Y: GOLD }, 900, 620, 12 * pop01(t, P.t0 + 0.4, 0.3, 2))
      L(x, 720, 640, '4 A.M. HERE!', pop01(t, P.t0 + 0.8, 0.3, 2.2), GOLD, -0.05, 36)
      bubble(x, 790, 1150, 'can you hear me?!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  // ♑
  { sign: 'capricorn', cap: 'Booked the call. | *Two weeks out.*', mood: lt => lt < 1.2 ? 'squint' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      note(x, 790, 860, pop01(t, P.t0 + 0.15, 0.3, 2), ['INVITE', 'call w/ friend', 'the 28th, 4:15', '15 min', 'agenda attached'], { w: 330, bg: CREAM, size: 30, rot: -0.04, font: MONO, weight: 700 })
      L(x, 790, 1150, 'ACCEPTED ✓', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, 0.04, 36)
    } },
  // ♒
  { sign: 'aquarius', cap: 'Got a call. | Replied *by letter.*', mood: lt => lt < 1.0 ? 'happy' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 860, 760, pop01(t, P.t0 + 0.15, 0.3, 2) * 0.7, { head: 'MISSED', headCol: RED, big: '1 CALL', bigCol: BONE })
      const d = ease.outCubic(prog(lt, 0.8, 1.4))
      drawBits(x, ENVELOPE, ENVELOPE_C, lerp(560, 760, d), lerp(900, 1050, d), 16 * pop01(t, P.t0 + 0.7, 0.3, 2), { rot: lerp(-0.3, 0.06, d) })
      L(x, 540, 640, 'POSTMARKED', pop01(t, P.t0 + 1.4, 0.3, 2.2), LAV, -0.06, 32)
    } },
  // ♓ (Align nod)
  { sign: 'pisces', cap: 'A match called. | Pisces *sobbed with joy.*', mood: 'sparkle', tears: 3, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.0, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, t, 800, 880, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'YOUR MATCH', headCol: PINK, big: 'is calling', bigCol: PINK, sub: '♋ cancer', ring: true })
      hearts(x, t, 800, 700, P.t0 + 0.8, { n: 6, life: 1.6, spread: 220, cell: 7, seed: 7 })
    } },
]

const F = makeFilm({
  id: 'r2t0462', key: 'E', accent: ACC, ending: 'lesson',
  title: 'Zodiacs on a call | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Could’ve been | *a text.*' },
  lesson: { text: 'A two-minute call | can *make a whole day.*', chip: 'CALL: ANSWERED' },
  last: {
    text: 'Call your people. | Gemini *still is.*',
    draw(x, t, lt) { label(x, 540, 1470, 'STILL ON THE LINE', pop01(t, t - lt + 1.2, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
