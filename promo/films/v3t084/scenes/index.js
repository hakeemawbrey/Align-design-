// v3t084: THE SIGNS AS… v3, SOLO film, "Dating a Gemini | be like." (~51 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole way through: nine dating moments, each pushed to the most extreme (and lovable) Gemini version.
//   0.0–3.6    "Dating a Gemini | *be like.*"  One big Gemini pops in, then the cards start.
//   3.6–37.8   nine cards: brought their twin · one question, a podcast · forty texts, then gone a week
//              · changed their mind mid-sentence · six different bios · four date nights at once
//              · bored at dinner, learned Italian · ran your compatibility twice, two answers · you fell asleep, they kept talking
//  37.8        "Never dull. | *Never quiet.*"
//  41.0        LESSON UNLOCKED: "Date a Gemini. | You’ll *never be bored.*"  STATUS: ENTERTAINED
//  46.9        "Which Gemini? | *Both.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const YEL = '#f2cf4a', RED = '#e23d4e', BROWN = '#8a4a2e', CREAM = '#fff4e2'

const BOOK = [
  'RRRRRRRRRR',
  'RWWWWWWWWR',
  'RWKKKKKKWR',
  'RWWWWWWWWR',
  'RWKKKKWWWR',
  'RWWWWWWWWR',
  'RWKKKKKKWR',
  'RWWWWWWWWR',
  'RRRRRRRRRR',
]
const BOOK_C = { R: '#2fc79a', W: CREAM, K: '#b9b0a0' }

// a phone with a counter of sent messages
function phone(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-118, -194, 248, 400)
  x.fillStyle = INK; x.fillRect(-130, -206, 260, 412)
  x.fillStyle = '#2a2350'; x.fillRect(-120, -196, 240, 392)
  x.fillStyle = '#140c30'; x.fillRect(-106, -170, 212, 340)
  const gone = lt > 1.5
  const n = gone ? 40 : Math.min(40, 1 + Math.floor(lt / 1.4 * 40))
  for (let i = 0; i < 6; i++) { const w = 80 + ((i * 37) % 90); x.fillStyle = YEL; x.fillRect(96 - w, -150 + i * 44, w, 30) }
  x.fillStyle = gone ? '#6b62a8' : RED; x.fillRect(-60, 120, 120, 40)
  x.fillStyle = CREAM; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(gone ? '…' : String(n), 0, 141)
  x.restore()
}
// a profile card whose bio keeps changing
function profile(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  const BIOS = ['“chef”', '“poet”', '“dj”', '“astronaut”', '“lawyer?”', '“all of it”']
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-140, -190, 300, 400)
  x.fillStyle = INK; x.fillRect(-152, -204, 304, 408)
  x.fillStyle = CREAM; x.fillRect(-144, -196, 288, 392)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -176, 248, 200)
  x.restore()
  signChar(x, t, 'gemini', cx, cy - 76 * k, 140 * k, { mood: 'wink', seed: 51, glyph: false, glow: 0.3 })
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('♊︎ GEM, 25', 0, 70)
  const i = Math.min(5, Math.floor(Math.max(0, lt - 0.3) / 0.3))
  x.fillStyle = '#6b62a8'; x.font = `700 28px ${MONO}`; x.fillText(BIOS[i], 0, 130)
  x.restore()
}

const CAMEOS = [
  { sign: 'gemini', cap: 'First date? | They brought *their twin.*', mood: 'sparkle', look: [1, 0], star: { x: -180 }, hops: [0.6],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.5, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'gemini', 790, 950, 260 * k, { mood: 'wink', look: [-1, 0], seed: 19, hops: [P.t0 + 1.1] })
      bubble(x, 790, 640, 'hi! / hi!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 42, tail: 'bc' })
      label(x, 540, 1150, 'WAIT, WHICH ONE?', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: PINK, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Asked one question. | Got *a podcast.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', star: { x: -180 },
    front(x, t, lt, P) {
      bubble(x, 800, 660, 'so basically…', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      const ep = 1 + Math.floor(clamp((lt - 0.6) / 1.6) * 39)
      label(x, 800, 870, `EPISODE ${ep}`, pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 42, bg: YEL, rot: 0.05, font: MONO, weight: 700 })
      label(x, 800, 1060, 'NO ADS. NO BREAKS.', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 28, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Forty texts. | Then *gone for a week.*', mood: lt => lt > 1.5 ? 'sleepy' : 'sparkle', star: { x: -180 },
    front(x, t, lt, P) {
      phone(x, t, 800, 870, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      label(x, 800, 1130, 'LAST SEEN: 6 DAYS', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Changed their mind | *mid-sentence.*', mood: lt => lt > 1.1 ? 'wide' : 'happy', look: lt => [lt > 1.1 ? -1 : 1, 0], star: { x: -180 }, hops: [1.1],
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'yes, let’s—', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, col: MINT, tail: 'bl' })
      bubble(x, 790, 940, 'actually no.', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 42, col: PINK, tail: 'bl' })
      label(x, 790, 1120, 'WAIT, YES.', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 32, bg: YEL, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Their dating profile? | *Six different bios.*', mood: 'wink', star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      profile(x, t, 790, 860, pop01(t, P.t0 + 0.25, 0.35, 2), lt)
      label(x, 790, 1110, 'UPDATED: JUST NOW', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 28, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Planned date night. | *Four* at once.', mood: 'sparkle', star: { x: -190 }, hops: [0.5, 1.0, 1.5],
    front(x, t, lt, P) {
      const items = ['CINEMA 7:00', 'BOWLING 7:00', 'KARAOKE 7:00', 'PICNIC 7:00']
      items.forEach((s, i) => label(x, 800, 660 + i * 110, s, pop01(t, P.t0 + 0.3 + i * 0.3, 0.25, 2.2), { size: 32, bg: [MINT, GOLD, SKYB, PINK][i], rot: i % 2 ? 0.05 : -0.05, font: MONO, weight: 700 }))
    } },
  { sign: 'gemini', cap: 'Bored at dinner. | *Learned Italian.*', mood: lt => lt > 1.2 ? 'sparkle' : 'sleepy', star: { x: -190 }, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, BOOK, BOOK_C, 800, 880, 22 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: 0.08 })
      bubble(x, 380, 600, 'ciao, bella!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, tail: 'bc' })
      label(x, 800, 1110, 'MAIN COURSE: 12 MIN', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 28, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Ran your compatibility. | Got *two answers.*', mood: lt => lt > 1.3 ? 'wide' : 'happy', look: [1, 0], star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 800, 640, '✦ COMPATIBILITY', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 30, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      label(x, 800, 820, 'RUN 1: 100%', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 44, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      label(x, 800, 980, 'RUN 2: 12%', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 44, bg: RED, color: CREAM, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 800, 1140, 'best of three?', pop01(t, P.t0 + 1.8, 0.25, 2.2), { size: 34, tail: 'bc' })
    } },
  { sign: 'gemini', cap: 'You fell asleep. | They *kept talking.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'aquarius', 800, 980, 220 * k, { mood: 'sleepy', seed: 23, glyph: false })
      bubble(x, 390, 600, 'and ANOTHER thing', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 34, tail: 'bc' })
      label(x, 800, 720, 'Z Z Z', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: LAV, rot: 0.06, font: MONO, weight: 700 })
      hearts(x, t, 560, 800, P.t0 + 1.6, { n: 4, life: 1.5, spread: 140, cell: 6, seed: 4 })
    } },
]

const F = makeFilm({
  id: 'v3t084', key: 'F', accent: YEL, solo: 'gemini', ending: 'lesson',
  title: 'Dating a Gemini | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Never dull. | *Never quiet.*', mood: 'sparkle' },
  lesson: { text: 'Date a Gemini. | You’ll *never be bored.*', chip: 'STATUS: ENTERTAINED' },
  last: {
    text: 'Which Gemini? | *Both.*',
    draw(x, t, lt) { const k = pop01(t, t - lt + 0.7, 0.4, 2); if (k > 0.01) signChar(x, t, 'gemini', 850, 960, 230 * k, { mood: 'wink', look: [-1, 0], seed: 61, hops: [t - lt + 1.3] }); hearts(x, t, 540, 1350, t - lt + 0.3, { n: 10, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
