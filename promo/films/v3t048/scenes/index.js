// v3t048: THE SIGNS AS… v3, "Zodiac advice | be like." (~63 s vertical, signs3kit social cut, music: lofi · E)
//   0.0–3.6    "Zodiac advice | *be like.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   the advice each sign gives (3.8 s each), pushed to the extreme:
//              ♈ "just do it. now." · ♉ "sleep on it." for a week · ♊ gave advice, then the opposite
//              · ♋ advice plus a blanket · ♌ "be more like me." · ♍ advice came with a flowchart
//              · ♎ "on one hand… on the other…" · ♏ already knew the problem · ♐ "quit. move to Peru."
//              · ♑ a ten-year plan · ♒ "what if time isn't real?" · ♓ cried harder than you did
//  49.2        "Everyone's | *an expert.*"
//  52.4        LESSON UNLOCKED: "Best advice? | *Listen first.*"  HEART: HEARD
//  58.3        "Then pass | *the snacks.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', TEAL = '#2fc79a'

const BLANKET = [
  'PPLLPPLLPPLL',
  'PPLLPPLLPPLL',
  'LLPPLLPPLLPP',
  'LLPPLLPPLLPP',
  'PPLLPPLLPPLL',
  'PPLLPPLLPPLL',
]
const BLANKET_C = { P: PINK, L: LAV }
const LLAMA = [
  '.WW......',
  '.WKW.....',
  '.WWW.....',
  '.WWW.....',
  '.WWWWWWW.',
  '.WWWWWWWW',
  '.WWWWWWWW',
  '.W.W..W.W',
  '.W.W..W.W',
]
const LLAMA_C = { W: '#f4ead8', K: INK }
const SCALE = [
  '.....Y.....',
  'YYYYYYYYYYY',
  'Y....Y....Y',
  'Y....Y....Y',
  'YYY..Y..YYY',
  '.....Y.....',
  '....YYY....',
]
function flowchart(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const p = clamp((lt - 0.3) / 1.4)
  const nodes = [[0, -150, 'PROBLEM?'], [-90, -20, 'YES'], [90, -20, 'NO'], [-90, 110, 'FIX IT'], [90, 110, 'NAP']]
  x.strokeStyle = BONE; x.lineWidth = 5
  const L = [[0, -150, -90, -20], [0, -150, 90, -20], [-90, -20, -90, 110], [90, -20, 90, 110]]
  L.forEach(([a, b, c, d], i) => { if (p > (i + 1) / 6) { x.beginPath(); x.moveTo(a, b); x.lineTo(c, d); x.stroke() } })
  nodes.forEach(([nx, ny, s], i) => {
    if (p < i / 6) return
    x.font = `800 28px ${INTER}`; const w = x.measureText(s).width + 26
    x.fillStyle = INK; x.fillRect(nx - w / 2 - 4, ny - 26, w + 8, 52); x.fillStyle = [GOLD, MINT, PINK, SKYB, LAV][i]; x.fillRect(nx - w / 2, ny - 22, w, 44)
    x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, nx, ny + 1)
  })
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Their advice: | *“Do it. Now.”*', mood: 'sparkle', look: [1, 0], star: { x: -180 }, hops: [0.4, 0.8, 1.2],
    front(x, t, lt, P) {
      bubble(x, 800, 690, 'should i…', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, col: LAV, tail: 'br' })
      bubble(x, 800, 890, 'YES. GO. NOW.', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 44, tail: 'bl' })
      label(x, 800, 1090, 'THINKING TIME: 0s', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: RED, color: '#fff4e2', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: '“Sleep on it.” | *For a week.*', mood: 'sleepy', star: { x: -180 },
    front(x, t, lt, P) {
      const d = 1 + Math.floor(clamp((lt - 0.4) / 1.5) * 6)
      label(x, 800, 760, `NIGHT ${d}`, pop01(t, P.t0 + 0.4, 0.3, 2), { size: 48, bg: LAV, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 800, 980, 'still thinking.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Gave advice. | Then *the opposite.*', mood: lt => lt > 1.1 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -180 }, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      bubble(x, 800, 700, 'text them!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, tail: 'bl' })
      bubble(x, 800, 920, 'DON’T text them!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, col: PINK, tail: 'bl' })
      label(x, 800, 1100, 'BOTH VALID', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Gave advice. | Plus *a blanket.*', mood: 'heart', star: { x: -180 },
    front(x, t, lt, P) {
      bubble(x, 800, 680, 'it’ll be okay', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      drawBits(x, BLANKET, BLANKET_C, 800, 900, 22 * pop01(t, P.t0 + 0.9, 0.3, 2), { rot: 0.05 })
      label(x, 800, 1090, 'COZY LEVEL: MAX', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Their advice: | *“Be more like me.”*', mood: 'sparkle', star: { x: -180 }, hops: [1.0],
    front(x, t, lt, P) {
      bubble(x, 800, 720, 'just be me.', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 44, tail: 'bl' })
      label(x, 800, 960, 'WORKS EVERY TIME', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.05 })
      sparkles(x, t, 360, 800, P.t0 + 1.0, 8, 180, 0.4)
    } },
  { sign: 'virgo', cap: 'The advice came | with *a flowchart.*', mood: 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) { flowchart(x, 790, 900, 1.35 * pop01(t, P.t0 + 0.2, 0.3, 2), lt) } },
  { sign: 'libra', cap: '“On one hand…” | *“On the other…”*', mood: 'squint', look: lt => [Math.sin(lt * 4) > 0 ? 1 : -1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const tilt = 0.18 * Math.sin(lt * 3)
      drawBits(x, SCALE, { Y: GOLD }, 800, 860, 24 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: tilt })
      label(x, 800, 1080, 'HOUR 2', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 38, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'You said one word. | They *knew everything.*', mood: 'squint', look: [1, 0], star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 800, 680, 'so…', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, col: LAV, tail: 'br' })
      bubble(x, 800, 880, 'it’s your ex.', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 800, 1080, 'CORRECT', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 40, bg: MINT, rot: -0.04 })
    } },
  { sign: 'sagittarius', cap: 'Their advice: | *“Quit. Move to Peru.”*', mood: 'sparkle', star: { x: -180 }, hops: [1.1],
    front(x, t, lt, P) {
      drawBits(x, LLAMA, LLAMA_C, 820, 900, 22 * pop01(t, P.t0 + 0.6, 0.3, 2))
      bubble(x, 760, 650, 'trust me', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 800, 1120, 'PROBLEM: SOLVED?', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Asked for a tip. | Got *a ten-year plan.*', mood: 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const n = Math.floor(clamp((lt - 0.3) / 1.5) * 10)
      for (let i = 0; i < n; i++) label(x, 710 + (i % 2) * 170, 640 + Math.floor(i / 2) * 110, `YEAR ${i + 1}`, 1, { size: 32, bg: i % 2 ? MINT : BONE, rot: i % 2 ? 0.04 : -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Their advice: | *“Is time even real?”*', mood: lt => lt > 1.0 ? 'wide' : 'sparkle', look: [0, -1], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 860); x.scale(k, k)
        x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 120, 0, Math.PI * 2); x.fill()
        x.fillStyle = '#fff4e2'; x.beginPath(); x.arc(0, 0, 108, 0, Math.PI * 2); x.fill()
        x.strokeStyle = INK; x.lineWidth = 10; x.lineCap = 'round'
        x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(t * 9) * 80, Math.sin(t * 9) * 80); x.stroke()
        x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(-t * 5) * 55, Math.sin(-t * 5) * 55); x.stroke()
        x.restore()
      }
      label(x, 800, 1080, 'ADVICE: UNCLEAR', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Gave advice. | Cried *harder than you.*', mood: 'happy', tears: lt => lt > 0.8 ? 3 : 2, star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      if (k > 0.01) signChar(x, t, 'taurus', 820, 920, 190 * k, { mood: 'neutral', look: [-1, 0], seed: 13, glyph: false, tears: 1 })
      bubble(x, 800, 660, 'you’ll be okay!!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 38, col: LAV, tail: 'bc' })
      label(x, 820, 1120, 'ROLES: REVERSED', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 32, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3t048', key: 'E', accent: TEAL, ending: 'lesson',
  title: 'Zodiac advice | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Everyone’s | *an expert.*' },
  lesson: { text: 'Best advice? | *Listen first.*', chip: 'HEART: HEARD' },
  last: {
    text: 'Then pass | *the snacks.*',
    draw(x, t, lt) { sparkles(x, t, 540, 1150, t - lt + 0.6, 9, 260, 0.4) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
