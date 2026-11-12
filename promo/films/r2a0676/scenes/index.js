// r2a0676: ADVICE SOLO, "How to check in | on a Pisces." (~51 s vertical, signs3kit social cut, music: lofi · D)
// One sign (solo, 9 cards), a warm how-to with one gag each; Pisces cries in every card. Ending: lesson.
//   "I'm fine" → ask once more · send the meme, it's a hug · sit with the tears, no fixing · remember the tiny thing
//   · ask about the dream, not just the day · a playlist says a lot · quiet company counts · ask about their chart
//   · text first
//   group "Soft heart. | *Check in often.*"   LESSON "Big feelings | *deserve company.*"   last "Bring tissues. | *The happy kind.*"
import { prog, ease } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, notes, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { phone, note, bits, ORANGE, RED, PAPER } from '../props.js'

const S = 'pisces', L = { x: -170 }, SEA = '#b7a6ff'
const TISSUE = [
  '....WWW....',
  '...WWWWW...',
  '..WW.W.WW..',
  'BBBBBBBBBBB',
  'BPPPPPPPPPB',
  'BPWPPPPPWPB',
  'BPPPPPPPPPB',
  'BBBBBBBBBBB',
]
const TISSUE_C = { W: BONE, B: '#6f8cff', P: SKYB }
const WHEEL = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
function chart(x, cx, cy, r, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.25)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { x.fillStyle = WHEEL[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, (i / 12) * Math.PI * 2, ((i + 1) / 12) * Math.PI * 2); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, r * 0.62, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; for (const a of [0.4, 2.6, 4.5]) x.fillRect(Math.cos(a) * r * 0.5 - 8, Math.sin(a) * r * 0.5 - 8, 16, 16)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'They say “I’m fine.” | *Ask once more.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: L, tears: lt => lt > 1.2 ? 2 : 1,
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'i’m fine!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 54, tail: 'bl' })
      bubble(x, 790, 900, 'you sure?', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 46, tail: 'br', col: LAV })
      bubble(x, 790, 1100, '…okay, not fine.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: S, cap: 'Send the meme. | It *counts as a hug.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: L, tears: 1,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 790, 800, 1.1 * pop01(t, P.t0 + 0.2, 0.3, 2), { top: '9:41', head: 'NEW MESSAGE', msg: 'saw this, | thought | of you', bg: MINT })
      label(x, 790, 1120, 'HUG: DELIVERED', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 38, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Sit with the tears. | *No fixing needed.*', mood: 'neutral', look: [1, 0], star: L, tears: 3,
    front(x, t, lt, P) {
      drawBits(x, TISSUE, TISSUE_C, 800, 880, 24 * pop01(t, P.t0 + 0.3, 0.3, 2))
      label(x, 790, 1100, 'TISSUES: ON STANDBY', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 32, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Remember the tiny thing | *they mentioned.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: L, tears: lt => lt > 1.2 ? 2 : 1,
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'how did the | dentist go?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 46, tail: 'br', col: LAV })
      bubble(x, 790, 960, 'YOU | REMEMBERED?!', pop01(t, P.t0 + 1.0, 0.25, 2.4), { size: 50, tail: 'bl' })
      sparkles(x, t, 790, 960, P.t0 + 1.1, 7, 200, 0.2)
    } },
  { sign: S, cap: 'Ask about the dream, | *not just the day.*', mood: 'sparkle', look: [1, -1], star: L, tears: 1,
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'how’s the | mermaid novel?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 42, tail: 'br', col: LAV })
      note(x, 790, 960, pop01(t, P.t0 + 1.0, 0.3, 2), 'Chapter 1 | (of 40)', { head: 'MY NOVEL', headBg: SEA, size: 38, w: 330 })
    } },
  { sign: S, cap: 'A playlist | *says a lot.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: L, tears: lt => lt > 1.3 ? 2 : 1,
    front(x, t, lt, P) {
      phone(x, 790, 800, 1.1 * pop01(t, P.t0 + 0.2, 0.3, 2), { top: '♪', head: 'FOR YOU', msg: '41 songs | about you | being great', bg: SEA })
      notes(x, t, 790, 640, { n: 4, cell: 7, col: GOLD, alpha: pop01(t, P.t0 + 0.6, 0.3, 2), seed: 2 })
    } },
  { sign: S, cap: 'Quiet company | *still counts.*', mood: 'sleepy', look: [1, 0], star: L, tears: 1,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      bits(x, 'mug', 730, 900, 18 * k); bits(x, 'mug', 880, 900, 18 * k, { sx: -1 })
      label(x, 800, 1090, 'NO TALKING NEEDED', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Ask about their chart. | *Watch them glow.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: L, tears: 2, hops: [1.2, 1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      chart(x, 790, 760, 140, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      bubble(x, 790, 1050, 'my moon is | in cancer!!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 42, tail: 'bl', col: LAV })
      sparkles(x, t, 790, 760, P.t0 + 1.2, 8, 200, 0.4)
    } },
  { sign: S, cap: 'Text first. | *It means everything.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: L, tears: lt => lt > 1.2 ? 3 : 1,
    front(x, t, lt, P) {
      phone(x, 790, 820, 1.1 * pop01(t, P.t0 + 0.2, 0.3, 2), { top: '8:02', head: 'NEW MESSAGE', msg: 'thinking | of you ♡', bg: PINK })
      hearts(x, t, 790, 640, P.t0 + 1.2, { n: 6, life: 1.8, spread: 200, cell: 8, seed: 6 })
    } },
]

const F = makeFilm({
  id: 'r2a0676', key: 'D', accent: SEA, solo: S, ending: 'lesson',
  title: 'How to check in | *on a Pisces.*',
  cameos: CAMEOS,
  group: { cap: 'Soft heart. | *Check in often.*', mood: 'heart' },
  lesson: { text: 'Big feelings | *deserve company.*', chip: 'HEART: HELD' },
  last: {
    text: 'Bring tissues. | *The happy kind.*',
    draw(x, t, lt) { drawBits(x, TISSUE, TISSUE_C, 540, 1320, 22 * pop01(t, t - lt + 0.8, 0.3, 2)); hearts(x, t, 540, 1220, t - lt + 1.2, { n: 6, life: 1.8, spread: 260, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
