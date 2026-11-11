// v3a006: zodiac.advice444, ADVICE SOLO, "Gemini, read this | before your date." (~51 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole way through (makeFilm solo mode, 9 cards): a relatable Gemini dating truth with a warm reframe, one gag each.
// Ending: card (lesson, then the last line over the two-card match).
//   0.0–3.6    "Gemini, read this | *before your date.*"  One big Gemini pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              forty cue cards fanned out (TOPICS: 40), pick two · a big PAUSE button: let them finish
//              · a mood ring flicking colours: MOOD: ALL OF THEM · a magnifying glass on Aquarius: curiosity is flirting
//              · a quiet moment, one cricket chirps, then hearts: QUIET = COZY · two mini Geminis ("memes?" / "the universe?")
//              · their profile, scrolled past the sign (loves: dogs, board games) · a wristwatch: EARLY, ACTUALLY
//              · "can I see you again?" "YES."
//  37.8        "Chatty. Curious. | *Easy to love.*"  Gemini comes back, big.
//  41.0        LESSON UNLOCKED: "Curious and kind | is *a great first date.*"  DATE #2: YES
//  46.9        "Topic forty-one: | *date number two.*" over the match card: Gemini + Aquarius (the curious date, paid off).
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', WOOD = '#c98f2a', LEMON = '#ffd84a'
const S = 'gemini'

// ── props
const CRICKET = ['.A.....A.', '..A...A..', '...GGG...', '..GGGGGW.', '.GGGGGGGG', 'GGGGGGGG.', '.L.L.L.L.']
const CRICKET_C = { A: '#3a3157', G: '#5fd068', W: '#ffffff', L: '#3a3157' }
const WATCH = ['..BBBB..', '..BBBB..', '.KKKKKK.', 'KWWWWWWK', 'KWWKWWWK', 'KWWKKKWK', 'KWWWWWWK', '.KKKKKK.', '..BBBB..', '..BBBB..']
const WATCH_C = { B: '#8a4a2e', K: INK, W: '#fff4e2' }
function cueCards(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  const fan = ease.outCubic(clamp(lt / 0.8))
  const C = [PINK, SKYB, MINT, GOLD, LAV, BONE, '#ff9a3c']
  for (let i = 0; i < 7; i++) {
    const a = (i - 3) * 0.17 * fan
    x.save(); x.translate(cx, cy + 140); x.rotate(a); x.translate(0, -140); x.scale(k, k)
    x.fillStyle = INK; x.fillRect(-80, -110, 160, 220); x.fillStyle = C[i]; x.fillRect(-74, -104, 148, 208)
    x.fillStyle = 'rgba(27,18,54,0.35)'; for (let j = 0; j < 5; j++) x.fillRect(-56, -70 + j * 30, 112 - (j % 2) * 30, 8)
    x.restore()
  }
}
function pauseBtn(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 120, 0, Math.PI * 2); x.fill()
  x.fillStyle = LEMON; x.beginPath(); x.arc(0, 0, 108, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.fillRect(-44, -54, 30, 108); x.fillRect(14, -54, 30, 108)
  x.restore()
}
function ring(x, t, cx, cy, k) {
  if (k <= 0.01) return
  const C = [PINK, SKYB, MINT, GOLD, LAV, RED]
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 70, 120, 120, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#c9a65a'; x.beginPath(); x.ellipse(0, 70, 108, 108, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#140c30'; x.beginPath(); x.ellipse(0, 70, 78, 78, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.beginPath(); x.arc(0, -50, 72, 0, Math.PI * 2); x.fill()
  x.fillStyle = C[Math.floor(t * 6) % C.length]; x.beginPath(); x.arc(0, -50, 62, 0, Math.PI * 2); x.fill()
  x.fillStyle = 'rgba(255,255,255,0.6)'; x.fillRect(-30, -86, 22, 14)
  x.restore()
}
function magnifier(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.6); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-18, 100, 36, 170); x.fillStyle = '#8a4a2e'; x.fillRect(-12, 106, 24, 158)
  x.strokeStyle = INK; x.lineWidth = 34; x.beginPath(); x.arc(0, 0, 110, 0, Math.PI * 2); x.stroke()
  x.strokeStyle = GOLD; x.lineWidth = 20; x.beginPath(); x.arc(0, 0, 110, 0, Math.PI * 2); x.stroke()
  x.fillStyle = 'rgba(143,227,255,0.18)'; x.beginPath(); x.arc(0, 0, 96, 0, Math.PI * 2); x.fill()
  x.restore()
}
function profile(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  const scroll = ease.inOutCubic(prog(lt, 0.6, 1.2)) * 150
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -182, 256, 380)
  x.fillStyle = INK; x.fillRect(-134, -194, 268, 388)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -184, 248, 368)
  x.save(); x.beginPath(); x.rect(-112, -160, 224, 320); x.clip()
  x.fillStyle = '#140c30'; x.fillRect(-112, -160, 224, 320)
  x.translate(0, -scroll)
  x.fillStyle = SKYB; x.fillRect(-96, -146, 192, 150)
  x.fillStyle = INK; x.font = `700 90px 'Segoe UI Symbol', 'Noto Sans Symbols', serif`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('♒︎', 0, -70)
  x.fillStyle = BONE; x.font = `700 22px ${MONO}`; x.fillText('AQUARIUS', 0, 36)
  x.fillStyle = MINT; x.font = `800 28px ${INTER}`; x.textAlign = 'left'
  x.fillText('loves:', -96, 96); x.fillStyle = BONE; x.fillText('dogs,', -96, 136); x.fillText('board games,', -96, 176); x.fillText('soup', -96, 216)
  x.restore(); x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'You prepped forty topics. | *Pick two.*', mood: lt => lt > 1.4 ? 'wink' : 'wide', look: [1, 0], star: { x: -230 },
    front(x, t, lt, P) {
      cueCards(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      label(x, 790, 1110, 'TOPICS: 40', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Let them finish | *the sentence.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 0], star: { x: -230 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'aquarius', 830, 1020, 170 * k, { mood: 'happy', look: [-1, 0], seed: 21, glyph: false })
      bubble(x, 800, 820, 'so then I—', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 32, tail: 'br' })
      pauseBtn(x, 560, 640, pop01(t, P.t0 + 1.0, 0.3, 2.4))
    } },
  { sign: S, cap: 'Two moods by dessert? | *Still lovable.*', mood: lt => ['happy', 'squint', 'sparkle', 'wide'][Math.floor(lt * 3) % 4], star: { x: -220 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      ring(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 1110, 'MOOD: ALL OF THEM', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Your curiosity | *is flirting.*', mood: lt => lt > 1.3 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -240 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'aquarius', 820, 960, 190 * k, { mood: lt > 1.2 ? 'heart' : 'happy', look: [-1, 0], seed: 22, glyph: false, hops: [P.t0 + 1.7] })
      magnifier(x, lerp(560, 660, ease.inOutCubic(prog(lt, 0.4, 1.0))), 820, pop01(t, P.t0 + 0.5, 0.3, 2))
      bubble(x, 800, 650, 'tell me | EVERYTHING', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 32, tail: 'bc' })
    } },
  { sign: S, cap: 'A quiet moment | *isn’t a crisis.*', mood: lt => lt > 1.5 ? 'happy' : 'wide', look: [1, 1], star: { x: -220 },
    front(x, t, lt, P) {
      drawBits(x, CRICKET, CRICKET_C, 790, 1080, 20 * pop01(t, P.t0 + 0.3, 0.35, 2))
      bubble(x, 830, 920, 'chirp.', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 30, tail: 'bl' })
      hearts(x, t, 560, 760, P.t0 + 1.6 * 1.29, { n: 5, life: 1.4, spread: 140, cell: 6, seed: 4 })
      label(x, 790, 680, 'QUIET = COZY', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 36, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Show both sides. | *They’ll like both.*', mood: 'sparkle', hideStar: true, star: { x: 0, y: 30, s: 220 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const a = pop01(t, P.t0 + 0.4, 0.35, 2), b = pop01(t, P.t0 + 0.6, 0.35, 2)
      if (a > 0.01) signChar(x, t, S, 330, 960, 220 * a, { mood: 'wink', seed: 23, glyph: false, hops: [P.t0 + 1.4] })
      if (b > 0.01) signChar(x, t, S, 760, 960, 220 * b, { mood: 'squint', look: [0, -1], seed: 24, glyph: false })
      bubble(x, 330, 700, 'memes?', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 32, tail: 'bc' })
      bubble(x, 760, 700, 'the universe?', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 32, tail: 'bc' })
      label(x, 540, 1170, 'BOTH: APPROVED', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Read their profile | *past the sign.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -230 },
    front(x, t, lt, P) {
      profile(x, t, 780, 850, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 780, 1110, 'SCROLLED. NICE.', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Show up on time. | *Story later.*', mood: lt => lt > 1.3 ? 'wink' : 'wide', look: [1, 0], star: { x: -220 }, hops: [0.3, 0.6, 0.9],
    front(x, t, lt, P) {
      drawBits(x, WATCH, WATCH_C, 790, 860, 26 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.1 })
      label(x, 790, 1120, 'EARLY, ACTUALLY', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Want a second date? | *Just ask.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -230 }, hops: [1.6],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'aquarius', 830, 1010, 180 * k, { mood: lt > 1.3 ? 'sparkle' : 'happy', look: [-1, 0], seed: 25, glyph: false, hops: [P.t0 + 1.8] })
      bubble(x, 520, 640, 'can I see | you again?', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 32, tail: 'bl' })
      bubble(x, 830, 790, 'YES.', pop01(t, P.t0 + 1.3, 0.25, 2.4), { size: 52, tail: 'bc', col: GOLD })
      hearts(x, t, 680, 960, P.t0 + 1.4 * 1.29, { n: 6, life: 1.6, spread: 200, cell: 6, seed: 8 })
    } },
]

const F = makeFilm({
  id: 'v3a006', key: 'D', accent: LEMON, solo: S, ending: 'card',
  title: 'Gemini, read this | *before your date.*',
  cameos: CAMEOS,
  card: { a: 'gemini', b: 'aquarius', chip: 'ALIGNED' },
  group: { cap: 'Chatty. Curious. | *Easy to love.*', mood: 'sparkle' },
  lesson: { text: 'Curious and kind | is *a great first date.*', chip: 'DATE #2: YES' },
  last: { text: 'Topic forty-one: | *date number two.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
