// r2a0352: star_advice, ADVICE SOLO, "Gemini, before you | *send that text.*" (~51 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole way: nine kind texting checks for a Gemini, each a relatable truth + a warm reframe and one light
// visual gag. Ending: card (lesson + last line over the match card).
//   0.0–3.6    "Gemini, before you | *send that text.*"
//   3.6–37.8   nine cards: a paragraph? read it once · twelve messages in a row, pick your favourite · joke or serious?
//              say which · 2 a.m. thoughts can wait for daylight · nine-minute voice note, maybe just call · they're not
//              ignoring you, they're busy · checked their sign? still be you · changed your mind? allowed
//              · sent it anyway? brave
//  37.8        "Fast mind. | *Kind words.*"
//  41.0        LESSON UNLOCKED: "Your words matter. | *Take a breath.*"  DRAFT: SAVED
//  46.9        "Libra replied: | *'tell me more.'*" over the match card: Gemini + Libra.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#ffd23a', PAPER = '#fff4e2'
const L = (x, cx, cy, s, k, o = {}) => label(x, cx, cy, s, k, { size: 30, font: MONO, weight: 700, ...o })

// ── props
// a phone-shaped scroll of text lines
function longText(x, cx, cy, n, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const h = 60 + n * 30
  x.fillStyle = INK; x.fillRect(-126, -h / 2 - 6, 252, h + 12)
  x.fillStyle = PAPER; x.fillRect(-120, -h / 2, 240, h)
  x.fillStyle = '#9aa5c4'; for (let j = 0; j < n; j++) x.fillRect(-100, -h / 2 + 30 + j * 30, j % 3 === 2 ? 120 : 200, 12)
  x.restore()
}
const MOON = ['..YYYY.', '.YYY...', 'YYY....', 'YYY....', 'YYY....', '.YYY...', '..YYYY.']
const SUN = [
  '...Y..Y...',
  'Y..YYYY..Y',
  '.YYYYYYYY.',
  '.YYYYYYYY.',
  'YYYYYYYYYY',
  '.YYYYYYYY.',
  '.YYYYYYYY.',
  'Y..YYYY..Y',
  '...Y..Y...',
]
// a voice-note wave bar
function wave(x, t, cx, cy, w, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -46, w + 12, 92)
  x.fillStyle = LAV; x.fillRect(-w / 2, -40, w, 80)
  x.fillStyle = INK
  for (let i = 0; i < 18; i++) { const hh = 10 + 24 * Math.abs(Math.sin(i * 1.3 + t * 4)); x.fillRect(-w / 2 + 60 + i * ((w - 80) / 18), -hh / 2, 8, hh) }
  x.beginPath(); x.moveTo(-w / 2 + 18, -16); x.lineTo(-w / 2 + 18, 16); x.lineTo(-w / 2 + 44, 0); x.fill()
  x.restore()
}
const PHONE = ['KKKKKKKKK', 'KSSSSSSSK', 'KSSSSSSSK', 'KSSSSSSSK', 'KSSSSSSSK', 'KSSSSSSSK', 'KSSSSSSSK', 'KSSSSSSSK', 'KSSSSSSSK', 'KKKKWKKKK']
const PHONE_C = { K: '#2a2350', S: '#8fe3ff', W: '#9aa5c4' }
const PLANE = [
  '.......WW',
  '.....WWWW',
  '...WWWWWW',
  '.WWWWWWW.',
  'WWWWWWW..',
  '...WWW...',
  '....WW...',
  '.....W...',
]

const CAMEOS = [
  // 1 · the paragraph
  { sign: 'gemini', cap: 'Typed a whole essay? | *Read it once.*', mood: lt => lt < 1.2 ? 'wide' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const n = Math.min(12, 2 + Math.floor(lt / 0.12))
      longText(x, 790, 860, n, pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 1150, 'WORDS: 1,204', pop01(t, P.t0 + 1.2, 0.3, 2.2), { bg: GOLD })
    } },
  // 2 · twelve in a row
  { sign: 'gemini', cap: 'Twelve texts in a row? | *Pick your favourite.*', mood: lt => Math.floor(lt * 2.6) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const words = ['hey', 'wait', 'also', 'lol', 'ok so', 'one more']
      for (let i = 0; i < 6; i++) bubble(x, 760 + (i % 2 ? 60 : -20), 620 + i * 95, words[i], pop01(t, P.t0 + 0.15 + i * 0.12, 0.2, 2.2), { size: 30, tail: i % 2 ? 'br' : 'bl', col: i === 3 && lt > 1.4 ? MINT : BONE })
      if (lt > 1.4) sparkles(x, t, 750, 905, P.t0 + 1.4, 6, 90, 0.3)
    } },
  // 3 · joke or serious
  { sign: 'gemini', cap: 'Joke or serious? | *Say which.*', mood: lt => lt < 1.2 ? 'wink' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'we should | get married', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 38, tail: 'bl' })
      L(x, 790, 980, lt < 1.3 ? '(???)' : '(JOKING. MOSTLY.)', pop01(t, P.t0 + 0.8, 0.3, 2.2), { bg: lt < 1.3 ? LAV : MINT, size: 32 })
    } },
  // 4 · 2 a.m.
  { sign: 'gemini', cap: '2 a.m. thoughts? | *Sleep on them.*', mood: lt => lt < 1.3 ? 'wide' : 'sleepy', star: { x: -170 },
    front(x, t, lt, P) {
      const day = lt > 1.4
      if (!day) drawBits(x, MOON, { Y: GOLD }, 820, 700, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      else drawBits(x, SUN, { Y: '#ffd23a' }, 820, 700, 14 * pop01(t, P.t0 + 1.4, 0.3, 2.2))
      bubble(x, 790, 950, day ? 'oh. never mind.' : 'what if birds | are LYING', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  // 5 · the voice note
  { sign: 'gemini', cap: 'Nine-minute voice note? | *Maybe just call.*', mood: lt => lt < 1.2 ? 'sparkle' : 'wink', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      wave(x, t, 790, 850, 360, pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 980, '9:47', pop01(t, P.t0 + 0.5, 0.3, 2), { bg: BONE, size: 40 })
      L(x, 790, 700, '…PART 2 OF 3', pop01(t, P.t0 + 1.4, 0.3, 2.2), { bg: PINK })
    } },
  // 6 · they're busy
  { sign: 'gemini', cap: 'No reply yet? | They’re *just busy.*', mood: lt => lt < 1.3 ? 'squint' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, PHONE, PHONE_C, 790, 900, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 860, lt < 1.3 ? 'SEEN 2 MIN AGO' : 'typing…', pop01(t, P.t0 + 0.4, 0.3, 2), { bg: lt < 1.3 ? LAV : MINT, size: 26, rot: 0 })
      if (lt > 1.4) bubble(x, 790, 640, 'sorry, was | at the dentist!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
  // 7 · Align: checked their sign
  { sign: 'gemini', cap: 'Checked their sign? | *Still be you.*', mood: lt => lt < 1.2 ? 'sparkle' : 'heart', look: [1, 0], star: { x: -170 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.4, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      L(x, 790, 640, '✦ MATCH: LIBRA', pop01(t, P.t0 + 0.2, 0.3, 2), { bg: GOLD, size: 32 })
      const k = pop01(t, P.t0 + 0.5, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'libra', 790, 900, 200 * k, { mood: 'happy', look: [-1, 0], seed: 19, glyph: false })
      L(x, 790, 1120, 'COMPATIBLE: SO FAR', pop01(t, P.t0 + 1.3, 0.3, 2.2), { bg: MINT, size: 28 })
    } },
  // 8 · changed your mind
  { sign: 'gemini', cap: 'Changed your mind? | That’s *allowed.*', mood: lt => Math.floor(lt * 2) % 2 ? 'wink' : 'happy', look: lt => [Math.floor(lt * 2) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const opts = ['PIZZA', 'SUSHI', 'PIZZA', 'TACOS', 'PIZZA!']
      const i = Math.min(4, Math.floor(lt / 0.42))
      bubble(x, 790, 800, `let’s get | ${opts[i]}`, pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, tail: 'bl' })
      L(x, 790, 1050, `EDITED ×${i + 1}`, pop01(t, P.t0 + 0.6, 0.3, 2), { bg: LAV })
    } },
  // 9 · sent it anyway
  { sign: 'gemini', cap: 'Sent it anyway? | *Brave.* Proud of you.', mood: lt => lt < 1.2 ? 'wide' : 'sparkle', look: [1, -1], star: { x: -170 }, hops: [1.3, 1.8],
    front(x, t, lt, P) {
      const fly = ease.inOutCubic(prog(lt, 0.4, 1.3))
      drawBits(x, PLANE, { W: PAPER }, lerp(700, 900, fly), lerp(1000, 640, fly), 16 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.2 })
      L(x, 790, 1100, 'DELIVERED ✓', pop01(t, P.t0 + 1.3, 0.3, 2.4), { bg: MINT, size: 34 })
      sparkles(x, t, 900, 640, P.t0 + 1.3, 8, 120, 0.2)
    } },
]

const F = makeFilm({
  id: 'r2a0352', key: 'F', accent: ACC, solo: 'gemini', ending: 'card',
  title: 'Gemini, before you | *send that text.*',
  cameos: CAMEOS,
  card: { a: 'gemini', b: 'libra', chip: "IT'S A MATCH" },
  group: { cap: 'Fast mind. | *Kind words.*', mood: 'heart' },
  lesson: { text: 'Your words matter. | *Take a breath.*', chip: 'DRAFT: SAVED' },
  last: { text: 'Libra replied: | *“tell me more.”*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
