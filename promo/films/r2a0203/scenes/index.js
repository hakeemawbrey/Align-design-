// r2a0203: star_advice, ADVICE SOLO, "How to give | *a Sag space.*" (~52 s, signs3kit social cut, lofi · C)
// One sign the whole way: nine kind ways to give a Sagittarius room to roam, each with one gag. Ending: lesson.
//   0.0–3.6    "How to give | *a Sag space.*"
//   3.6–37.8   nine cards: say "go explore" (a compass) · ask "how's the view?" (a postcard) · let them say yes to the
//              random trip (packed in 4 min) · one "have fun!" instead of forty texts · loose plans (PLAN: maybe tacos)
//              · alone time isn't about you (RECHARGING) · keep your own hobbies · they bring you a souvenir (a snow globe)
//              · give them space, they boomerang back
//  37.8        "Free spirit. | *Loyal heart.*"
//  41.0        LESSON: "Freedom is how | they *love you back.*"  STATUS: FREE & HAPPY
//  46.9        "They'll be back. | *With snacks.*"
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const PURPLE = '#c58bff', RED = '#ff5a4f', WOOD = '#c98f5a'

function card(x, cx, cy, k, lines, { w = 330, size = 30, rot = 0.04, head = null, headBg = GOLD } = {}) {
  if (k <= 0.01) return
  const lh = size * 1.45, h = lines.length * lh + 40 + (head ? 60 : 0)
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = BONE; x.fillRect(-w / 2, -h / 2, w, h)
  let y0 = -h / 2 + 20
  if (head) { x.fillStyle = headBg; x.fillRect(-w / 2, -h / 2, w, 60); x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -h / 2 + 31); y0 += 60 }
  x.fillStyle = INK; x.font = `800 ${size}px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, -w / 2 + 24, y0 + lh * (i + 0.5)))
  x.restore()
}
function compass(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 150, 0, 7); x.fill()
  x.fillStyle = GOLD; x.beginPath(); x.arc(0, 0, 140, 0, 7); x.fill()
  x.fillStyle = BONE; x.beginPath(); x.arc(0, 0, 118, 0, 7); x.fill()
  x.fillStyle = INK; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText('N', 0, -92); x.fillText('S', 0, 92); x.fillText('E', 92, 0); x.fillText('W', -92, 0)
  x.rotate(t * 3 + Math.sin(t * 7) * 0.4)
  x.fillStyle = RED; x.beginPath(); x.moveTo(0, -80); x.lineTo(16, 0); x.lineTo(-16, 0); x.fill()
  x.fillStyle = '#6b62a8'; x.beginPath(); x.moveTo(0, 80); x.lineTo(16, 0); x.lineTo(-16, 0); x.fill()
  x.restore()
}
const BACKPACK = ['...KKKK...', '..KGGGGK..', '.KGGGGGGK.', 'KGGGGGGGGK', 'KGKKKKKKGK', 'KGKYYYYKGK', 'KGKKKKKKGK', 'KGGGGGGGGK', 'KGGGGGGGGK', '.KKKKKKKK.']
const GLOBE = ['...KKKKK...', '..KWWWWWK..', '.KWSWWWSWK.', 'KWWWWHWWWWK', 'KWWWHHHWWWK', 'KWWHHHHHWWK', '.KWWWWWWWK.', '..KKKKKKK..', '.KBBBBBBBK.', 'KBBBBBBBBBK', 'KKKKKKKKKKK']
const BOOM = ['KKK.......', 'KWWK......', 'KWWWK.....', '.KWWWK....', '..KWWWKKKK', '...KWWWWWK', '....KKKKKK']

const CAMEOS = [
  { sign: 'sagittarius', cap: 'Say *"go explore."* | They\'ll come back.', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.8],
    front(x, t, lt, P) {
      compass(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 1110, 'DIRECTION: YES', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Skip "where are you?" | Ask *"how\'s the view?"*', mood: 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 860); x.rotate(-0.06); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-176, -126, 352, 252); x.fillStyle = '#ffd9a8'; x.fillRect(-168, -118, 336, 236)
        x.fillStyle = '#ff9a5a'; x.fillRect(-168, -118, 336, 118); x.fillStyle = '#ffd23a'; x.beginPath(); x.arc(0, 0, 60, Math.PI, 0); x.fill()
        x.fillStyle = '#5a4a9a'; x.beginPath(); x.moveTo(-168, 0); x.lineTo(-90, -70); x.lineTo(-20, 0); x.lineTo(60, -50); x.lineTo(168, 0); x.fill()
        x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('wish you were here', 0, 62)
        x.restore()
      }
      label(x, 790, 1100, 'VIEW: UNREAL', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Let them say yes | to *the random trip.*', mood: 'wide', look: [1, 0], star: { x: -170 }, hops: [0.5, 1.0, 1.5],
    front(x, t, lt, P) {
      drawBits(x, BACKPACK, { K: INK, G: '#5ab86a', Y: GOLD }, 790, 880, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })
      label(x, 790, 650, 'PACKED IN 4 MIN', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 1130, 'back sunday!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Not forty texts. | *One "have fun!"*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 860, 'have fun!', pop01(t, P.t0 + 0.4, 0.3, 2.4), { size: 64, col: PINK, tail: 'bl' })
      label(x, 790, 1100, 'SENT: 1', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 34, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 560, 760, P.t0 + 1.4, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 8 })
    } },
  { sign: 'sagittarius', cap: 'Plans can be loose. | *Really loose.*', mood: 'wink', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      card(x, 790, 870, pop01(t, P.t0 + 0.2, 0.3, 2), ['saturday:', 'something?', 'maybe tacos'], { head: 'THE PLAN', headBg: PURPLE, w: 310, rot: 0.05 })
      label(x, 790, 1130, 'DETAILS: VIBES', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Alone time isn\'t | *about you.* Promise.', mood: 'sleepy', star: { x: -170 },
    front(x, t, lt, P) {
      label(x, 790, 760, 'RECHARGING…', pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 40, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      const lvl = clamp((lt - 0.4) / 1.6)
      const k = pop01(t, P.t0 + 0.5, 0.3, 2)
      if (k > 0.01) { x.save(); x.translate(790, 960); x.scale(k, k); x.fillStyle = INK; x.fillRect(-130, -50, 260, 100); x.fillRect(130, -22, 18, 44); x.fillStyle = '#2a2350'; x.fillRect(-122, -42, 244, 84); x.fillStyle = lvl > 0.6 ? '#3fcf7a' : GOLD; x.fillRect(-116, -36, 232 * Math.max(0.05, lvl), 72); x.restore() }
      bubble(x, 790, 1130, 'love you, brb', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 30, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Keep *your own* hobbies. | They love that.', mood: 'heart', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      label(x, 790, 760, 'YOU: POTTERY', pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 34, bg: PINK, rot: -0.05, font: MONO, weight: 700 })
      label(x, 790, 900, 'SAG: ROCK WALL', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 34, bg: PURPLE, rot: 0.05, font: MONO, weight: 700 })
      label(x, 790, 1060, 'DINNER: TOGETHER', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Every trip, they | *bring you something.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.1],
    front(x, t, lt, P) {
      drawBits(x, GLOBE, { K: INK, W: '#dff4ff', S: '#fff', H: '#ff9a5a', B: WOOD }, 790, 860, 24 * pop01(t, P.t0 + 0.3, 0.3, 2))
      for (let i = 0; i < 6; i++) { const ph = ((t * 0.5 + i / 6) % 1); x.fillStyle = '#fff'; x.fillRect(720 + i * 26, 760 + ph * 90, 6, 6) }
      label(x, 790, 1110, 'FOR YOU ♡', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Give them space. | They *boomerang back.*', mood: lt => lt > 1.6 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 2.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const p = clamp((lt - 0.3) / 1.6), a = p * Math.PI * 2
      const bx = 640 + Math.sin(a / 2) * 280, by = 860 - Math.sin(a) * 160
      drawBits(x, BOOM, { K: INK, W: WOOD }, bx, by, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: t * 12 })
      if (lt > 1.9) label(x, 800, 1100, 'BACK ALREADY', pop01(t, P.t0 + 1.9 * 1.29, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0203', key: 'C', accent: PURPLE, solo: 'sagittarius', ending: 'lesson',
  title: 'How to give | *a Sag space.*',
  cameos: CAMEOS,
  group: { cap: 'Free spirit. | *Loyal heart.*', mood: 'heart' },
  lesson: { text: 'Freedom is how | they *love you back.*', chip: 'STATUS: FREE & HAPPY' },
  last: { text: 'They\'ll be back. | *With snacks.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
