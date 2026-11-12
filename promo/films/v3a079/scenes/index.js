// v3a079: star_advice, ADVICE SOLO, "Gemini, you're allowed | to rest." (~51 s vertical, signs3kit social cut, music: lofi · G)
// One sign the whole way through (makeFilm solo mode, 9 cards): permission to slow down, Gemini-style, one gag each.
//   0.0–3.6    "Gemini, you’re allowed | *to rest.*"  One big Gemini pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              a pile of unread bubbles: later, maybe · juggling five hobbies down to one · the little TV goes from
//              static to off · today's plans crossed out, all but "nap" · a beige swatch: today's vibe · two tiny pillows,
//              one for each of you · a hammock: agenda, none · a muted speaker: muted, the world · a sleep mask: back tomorrow
//  37.8        "Quiet mind. | *Full heart.*"  Gemini comes back, sleepy.
//  41.0        LESSON UNLOCKED: "Resting is | part of *being you.*"  MIND: QUIET
//  46.9        "Rested Gemini? | *Twice the fun.*"
import { clamp, prog, lerp, ease } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ORANGE = '#ffb34a', RED = '#e23d4e', CREAM = '#fff4e2', GREEN = '#2fc79a', BROWN = '#8a4a2e', YEL = '#ffd23a'
const S = 'gemini'

function paper(x, cx, cy, w, h, k, { rot = 0, bg = CREAM, head, headBg = PINK, lines = [] } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  if (head) { x.fillStyle = headBg; x.fillRect(-w / 2, -h / 2, w, 54); x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.fillText(head, 0, -h / 2 + 29) }
  for (const l of lines) {
    if (l.k !== undefined && l.k <= 0.01) continue
    x.fillStyle = l.color || INK; x.font = l.font || `800 ${l.size || 34}px ${INTER}`; x.fillText(l.text, l.x || 0, l.y)
    if (l.strike) { const w2 = x.measureText(l.text).width; x.fillStyle = RED; x.fillRect((l.x || 0) - w2 / 2 - 6, l.y - 3, (w2 + 12) * clamp(l.strike), 7) }
  }
  x.restore()
}

// ── props
const TV = [
  '..A....A..',
  '...A..A...',
  '....AA....',
  'BBBBBBBBBB',
  'BSSSSSSSBB',
  'BSSSSSSSBK',
  'BSSSSSSSBB',
  'BSSSSSSSBK',
  'BBBBBBBBBB',
  '.L......L.',
]
const PILLOW = [
  '.PPPPPPPP.',
  'PPPPPPPPPP',
  'PPPWPPPPPP',
  'PPPPPPPPPP',
  '.PPPPPPPP.',
]
const SPEAKER = [
  '....K.....',
  '...KK.R..R',
  'KKKKK..RR.',
  'KKKKK..RR.',
  '...KK.R..R',
  '....K.....',
]
const MASK = [
  '.MMMM....MMMM.',
  'MMMMMMMMMMMMMM',
  'MMWWMMMMMMWWMM',
  'MMMMMMMMMMMMMM',
  '.MMMM....MMMM.',
]

const CAMEOS = [
  { sign: S, cap: 'You don’t have to | *reply to everyone.*', mood: lt => lt > 1.4 ? 'sleepy' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const TX = ['hey!!', 'did u see', 'call me?', 'omg', 'wait—', 'hello?']
      TX.forEach((s, i) => bubble(x, 760 + (i % 2) * 60, 1030 - i * 72, s, pop01(t, P.t0 + 0.2 + i * 0.12, 0.25, 2.2), { size: 30, tail: i % 2 ? 'br' : 'bl' }))
      label(x, 790, 1150, 'LATER. MAYBE.', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'One hobby | *at a time.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, -1], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const COLS = [RED, GOLD, MINT, SKYB, PINK]
      const n = lt < 1.2 ? 5 : 1
      for (let i = 0; i < n; i++) {
        const a = t * 4 + i * Math.PI * 2 / 5, R = n > 1 ? 150 : 0
        const bx = 790 + Math.cos(a) * R, by = 820 + Math.sin(a) * R * 0.6
        x.fillStyle = INK; x.beginPath(); x.arc(bx, by, 34, 0, Math.PI * 2); x.fill()
        x.fillStyle = COLS[i]; x.beginPath(); x.arc(bx, by, 27, 0, Math.PI * 2); x.fill()
      }
      label(x, 790, 1070, n > 1 ? 'HOBBIES: 5' : 'HOBBIES: JUST 1', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Your brain can | *go quiet.*', mood: lt => lt > 1.3 ? 'sleepy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), off = lt > 1.2
      drawBits(x, TV, { A: '#c9d1e0', B: '#9b5fd6', S: off ? '#140c30' : '#888', K: INK, L: INK }, 790, 860, 24 * k)
      if (!off && k > 0.9) { x.save(); for (let i = 0; i < 60; i++) { const r = Math.abs(Math.sin(i * 12.9898 + Math.floor(t * 20) * 78.233)); x.fillStyle = r > 0.5 ? '#fff' : '#444'; x.fillRect(790 - 84 + (i % 10) * 16, 780 + Math.floor(i / 10) * 16 + 12, 14, 14) } x.restore() }
      label(x, 790, 1090, off ? 'CHANNEL: OFF' : 'CHANNEL: ALL', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 34, bg: off ? MINT : BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Cancel the plan. | *It’s fine.*', mood: lt => lt > 1.5 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      paper(x, 790, 860, 300, 340, pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.03, head: 'TODAY', headBg: GOLD, lines: [
        { text: 'brunch', y: -70, size: 36, strike: prog(lt, 0.5, 0.7) },
        { text: 'gym class', y: -15, size: 36, strike: prog(lt, 0.8, 1.0) },
        { text: 'party', y: 40, size: 36, strike: prog(lt, 1.1, 1.3) },
        { text: 'nap ♥', y: 100, size: 40, color: GREEN, k: pop01(t, P.t0 + 1.5, 0.3, 2) }] })
    } },
  { sign: S, cap: 'A boring day | *is allowed.*', mood: lt => lt > 1.2 ? 'sleepy' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      paper(x, 790, 820, 240, 280, pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.04, bg: '#d9c8a9', lines: [{ text: 'BEIGE', y: 100, size: 30, font: `700 30px ${MONO}` }] })
      label(x, 790, 1070, 'TODAY’S VIBE', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 34, bg: BONE, rot: 0.04 })
    } },
  { sign: S, cap: 'Both of you | *need a nap.*', mood: 'sleepy', star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, PILLOW, { P: LAV, W: '#fff' }, 720, 900, 18 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: -0.06 })
      drawBits(x, PILLOW, { P: PINK, W: '#fff' }, 870, 900, 18 * pop01(t, P.t0 + 0.5, 0.3, 2), { rot: 0.06 })
      label(x, 790, 1070, 'ONE FOR EACH TWIN', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Hammock day. | *No agenda.*', mood: 'sleepy', star: { x: -150, y: 30 },
    back(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.1, 0.3, 2)
      if (k <= 0.01) return
      x.save(); x.globalAlpha = clamp(k)
      x.fillStyle = BROWN; x.fillRect(190, 820, 22, 360); x.fillRect(570, 820, 22, 360)
      x.strokeStyle = MINT; x.lineWidth = 16; x.beginPath(); x.moveTo(205, 840); x.quadraticCurveTo(390, 1140 + 10 * Math.sin(t * 2), 580, 840); x.stroke()
      x.restore()
    },
    front(x, t, lt, P) {
      label(x, 790, 780, 'AGENDA:', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 36, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 880, 'NONE', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 56, bg: MINT, rot: 0.05 })
    } },
  { sign: S, cap: 'Silence | *isn’t boring.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, SPEAKER, { K: BONE, R: RED }, 790, 850, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1060, 'MUTED: THE WORLD', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 32, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 850, P.t0 + 1.0, 6, 150, 0.3, [LAV, BONE, SKYB])
    } },
  { sign: S, cap: 'Rest now. | *Chat later.*', mood: 'sleepy', star: { x: -170 },
    front(x, t, lt, P, F) {
      drawBits(x, MASK, { M: '#6f8cff', W: '#bfe9ff' }, F.x, F.cy + 10, 14 * pop01(t, P.t0 + 0.6, 0.3, 2.2))
      label(x, 790, 820, 'BACK TOMORROW', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 36, bg: GOLD, rot: 0.04 })
      label(x, 790, 920, '(PROBABLY)', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 28, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3a079', key: 'G', accent: GOLD, solo: S, ending: 'lesson',
  title: 'Gemini, you’re | allowed *to rest.*',
  cameos: CAMEOS,
  group: { cap: 'Quiet mind. | *Full heart.*', mood: 'sleepy' },
  lesson: { text: 'Resting is | part of *being you.*', chip: 'MIND: QUIET' },
  last: { text: 'Rested Gemini? | *Twice the fun.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
