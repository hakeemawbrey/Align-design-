// r2a0080: star_advice ADVICE ROLLCALL, "How to give advice | to each sign." (~61 s vertical, signs3kit social cut,
// music: lofi · G). Twelve signs in zodiac order; one warm, specific line per sign with a light visual gag:
//   ♈ keep it short, they left mid-sentence · ♉ give it a week, they'll come round · ♊ give options, lots of them
//   · ♋ start with a hug · ♌ lead with a compliment, a big one · ♍ bring a bullet list · ♎ make it their idea
//   · ♏ be honest, they'll know anyway · ♐ make it a pep talk for an adventure · ♑ bring a plan with steps
//   · ♒ ask their theory first · ♓ gently, tissues ready
//  49.2   "Same advice. | *Twelve deliveries.*"  group photo
//  52.4   LESSON UNLOCKED: "Good advice fits the person. | *Not a rulebook.*"  ADVICE: RECEIVED
//  58.3   "Or just ask: | *“What helps?”*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const PEACH = '#ffb38a', RED = '#e23d4e', BROWN = '#8a4a2e', GREEN = '#6fcf7a', ORANGE = '#ffb34a'
const ST = { x: -170 }

function card(x, cx, cy, w, h, bg, k, rot = 0) {
  if (k <= 0.01) return false
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  return true
}
function text(x, s, px, py, size, col = INK, font = INTER, weight = 800, align = 'center') {
  x.fillStyle = col; x.font = `${weight} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillText(s, px, py)
}
// a note card with a few lines of text
function note(x, cx, cy, k, lines, { bg = BONE, rot = 0.04, size = 30, w = 300 } = {}) {
  if (!card(x, cx, cy, w, 70 + lines.length * 48, bg, k, rot)) return
  lines.forEach((l, i) => text(x, l, -w / 2 + 24, -((lines.length - 1) * 48) / 2 + i * 48, size, INK, MONO, 700, 'left'))
  x.restore()
}
const SNAIL = ['....SSS....', '...SsssS...', '..SsSSSsS..', '..SsSsSsS..', '..SsSSsSS..', '...SSSSS...', 'BBBBBBBBBBB', '.BBBBBBBBB.']
const BULB = ['..YYYYY..', '.YYYYYYY.', 'YYYWYYYYY', 'YYWYYYYYY', 'YYYYYYYYY', '.YYYYYYY.', '..YYYYY..', '...KKK...', '...KKK...', '....K....']
const GLASS = ['..KKKK....', '.KWWWWK...', 'KWWSWWWK..', 'KWSWWWWK..', 'KWWWWWWK..', '.KWWWWK...', '..KKKKKK..', '......KKK.', '.......KKK', '........KK']
const COMPASS = ['...KKKKK...', '.KKBBBBBKK.', 'KBBBBRBBBBK', 'KBBBRRRBBBK', 'KBBBBWBBBBK', 'KBBBWWWBBBK', 'KBBBBWBBBBK', '.KKBBBBBKK.', '...KKKKK...']
const STAIRS = ['........GG', '........GG', '......GGGG', '......GGGG', '....GGGGGG', '....GGGGGG', '..GGGGGGGG', '..GGGGGGGG', 'GGGGGGGGGG', 'GGGGGGGGGG']
const TISSUE = ['....WW....', '...WWWW...', '..WW..WW..', 'BBBBBBBBBB', 'BPBBBBBBPB', 'BBBBBBBBBB', 'BBBBBBBBBB']
const HEART = ['.HH.HH.', 'HHHHHHH', 'HWHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']
const TROPHY = ['YYYYYYYYY', 'YYYYYYYYY', '.YYYYYYY.', '..YYYYY..', '...YYY...', '....Y....', '...YYY...', '.KKKKKKK.']
// a chalkboard
function board(x, cx, cy, k) {
  if (!card(x, cx, cy, 320, 230, '#2f5a46', k, -0.03)) return
  x.strokeStyle = BROWN; x.lineWidth = 10; x.strokeRect(-160, -115, 320, 230)
  text(x, 'MY THEORY:', 0, -60, 28, BONE, MONO, 700)
  x.strokeStyle = BONE; x.lineWidth = 4; x.beginPath(); x.arc(-60, 20, 34, 0, Math.PI * 2); x.moveTo(-20, 20); x.lineTo(40, 20); x.lineTo(30, 10); x.moveTo(40, 20); x.lineTo(30, 30); x.stroke()
  text(x, '?!', 90, 22, 44, GOLD, MONO, 700)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Keep it short. | *They left mid-sentence.*', mood: 'sparkle', look: [1, 0], hops: [0.6],
    star: { x: -170 },
    front(x, t, lt, P, F) {
      bubble(x, 790, 720, 'so basically—', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 38, col: LAV, tail: 'br' })
      const k = pop01(t, P.t0 + 1.0, 0.3, 2)
      if (k > 0.01) { x.save(); x.globalAlpha = k; x.fillStyle = '#c9c9d8'; for (let i = 0; i < 4; i++) x.fillRect(F.x - 210 - i * 40, F.cy - 60 + i * 34, 120, 12); x.restore() }
      label(x, 790, 1020, 'GOT IT. BYE!', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.04 })
    } },
  { sign: 'taurus', cap: 'Give it a week. | *They’ll come round.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, SNAIL, { S: PEACH, s: '#c97a52', B: GREEN }, lerp(900, 760, clamp(lt / 2.4)), 940, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 700, 'DAY 7: “FINE.”', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Give options. | *Lots of options.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.2) / 1.4) * 4)
      note(x, 790, 870, pop01(t, P.t0 + 0.15, 0.3, 2), ['A) this', 'B) that', 'C) both', 'D) neither', 'E) nap'].slice(0, n))
    } },
  { sign: 'cancer', cap: 'Start with a hug. | *Then the advice.*', mood: 'heart', look: [1, 0], star: { x: -110 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'virgo', 740, 950, 200 * k, { mood: 'heart', look: [-1, 0], seed: 21, glyph: false })
      drawBits(x, HEART, { H: '#ff4f86', W: '#fff' }, 600, 700, 14 * pop01(t, P.t0 + 0.9, 0.3, 2.4))
      label(x, 790, 650, 'STEP 1: HUG', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Lead with a compliment. | *A big one.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, TROPHY, { Y: GOLD, K: BROWN }, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 670, 'YOU’RE ICONIC', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 38, bg: ORANGE, rot: 0.05 })
      sparkles(x, t, 790, 900, P.t0 + 1.0, 7, 170, 0.4)
    } },
  { sign: 'virgo', cap: 'Bring a bullet list. | *They’ll add to it.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      note(x, 790, 860, pop01(t, P.t0 + 0.15, 0.3, 2), ['• rest', '• drink water', lt > 1.2 ? '• (sources?)' : ''].filter(Boolean), { size: 28, w: 320 })
      label(x, 790, 1090, 'EDITED: 3x', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Make it sound | *like their idea.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      drawBits(x, BULB, { Y: GOLD, W: '#fff', K: '#9aa5c4' }, 790, 820, 20 * pop01(t, P.t0 + 1.0, 0.3, 2.4))
      bubble(x, 790, 1070, 'ooh, MY idea!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'Be honest. | *They’ll know anyway.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, GLASS, { K: INK, W: '#cfe6ff', S: '#fff' }, 750 + Math.sin(t * 2) * 25, 860, 28 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1090, 'TRUTH: DETECTED', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Make it a pep talk | *for an adventure.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.0, 1.6],
    front(x, t, lt, P) {
      drawBits(x, COMPASS, { K: INK, B: BONE, R: RED, W: '#9aa5c4' }, 790, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: Math.sin(t * 3) * 0.3 })
      label(x, 790, 1090, 'GO GET IT!', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: LAV, rot: -0.04 })
    } },
  { sign: 'capricorn', cap: 'Bring a plan. | *With steps.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, STAIRS, { G: '#9fd8a8' }, 790, 900, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const s = 1 + Math.floor(clamp((lt - 0.4) / 1.4) * 4)
      label(x, 790, 660, `STEP ${s} OF 5`, pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Ask their theory first. | *It’s a long one.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      board(x, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1070, 'PART 1 OF 6', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Say it gently. | *Tissues ready.*', mood: 'sparkle', tears: lt => lt < 1.2 ? 2 : 3, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, TISSUE, { W: '#fff', B: SKYB, P: PINK }, 790, 900, 22 * pop01(t, P.t0 + 0.3, 0.3, 2))
      bubble(x, 790, 680, 'thank you!!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 38, col: LAV, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2a0080', key: 'G', accent: PEACH, ending: 'lesson',
  title: 'How to give advice | *to each sign.*',
  cameos: CAMEOS,
  group: { cap: 'Same advice. | *Twelve deliveries.*' },
  lesson: { text: 'Good advice fits the person. | *Not a rulebook.*', chip: 'ADVICE: RECEIVED' },
  last: {
    text: 'Or just ask: | *“What helps?”*',
    draw(x, t, lt) { hearts(x, t, 540, 1150, t - lt + 0.5, { n: 8, life: 2.2, spread: 500, cell: 7, seed: 8 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
