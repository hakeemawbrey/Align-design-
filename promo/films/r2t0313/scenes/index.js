// r2t0313: THE SIGNS AS… v3, SOLO film, "Scorpios texting | be like." (~51 s vertical, signs3kit social cut, music: lofi · G)
// One sign the whole way: nine texting moments, each the most extreme (and lovable) Scorpio version. Ending: lesson.
//   0.0–3.6    "Scorpios texting | *be like.*"  One big Scorpio pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              read in a second, replied in three days · one word: "interesting." · profile pic: a black square
//              · texted "hey." (you felt it in your soul) · your typing bubble vanished; noted · replied with just a period
//              · read receipts off, forever · saved every text since day one · "we need to talk" (…about pizza)
//  37.8        "Few words. | *Big feelings.*"  Scorpio comes back, big.
//  41.0        LESSON UNLOCKED: "One word from a Scorpio | *means a lot.*"  STATUS: DECODED
//  46.9        "Text back. | *Totally* not waiting."
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CRIM = '#ff5a7a', RED = '#e23d4e', PAPER = '#fff4e2'

// ── props
const LOCK = [
  '..KKKKK..',
  '.K.....K.',
  '.K.....K.',
  'YYYYYYYYY',
  'YYYYKYYYY',
  'YYYKKKYYY',
  'YYYYKYYYY',
  'YYYYYYYYY',
]
const LOCK_C = { K: '#9aa5c4', Y: GOLD }
const PIZZA = [
  'CCCCCCCCCCC',
  '.YRYYYYRYY.',
  '..YYYRYYY..',
  '...YYYYY...',
  '....YRY....',
  '.....Y.....',
]
const PIZZA_C = { C: '#c98f5a', Y: '#ffd23a', R: RED }

function phone(x, cx, cy, k, { w = 250, h = 400, rot = 0.04 } = {}, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16)
  x.fillStyle = '#2a2350'; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = '#140c30'; x.fillRect(-w / 2 + 12, -h / 2 + 30, w - 24, h - 60)
  if (fn) fn(x, w, h)
  x.restore()
}
// a filing drawer, pulled open, stuffed with little message cards
function drawer(x, cx, cy, k, open) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-142, -122, 296, 270)
  x.fillStyle = INK; x.fillRect(-154, -134, 308, 280); x.fillStyle = '#6b62a8'; x.fillRect(-146, -126, 292, 264)
  const oy = 60 * open
  for (let i = 0; i < 7; i++) { x.fillStyle = [SKYB, LAV, PINK, BONE][i % 4]; x.fillRect(-120 + i * 34, -100 + oy - (i % 3) * 10, 26, 70) }
  x.fillStyle = INK; x.fillRect(-140, -30 + oy, 280, 130); x.fillStyle = '#9aa5c4'; x.fillRect(-132, -22 + oy, 264, 114)
  x.fillStyle = INK; x.fillRect(-40, 20 + oy, 80, 18)
  x.fillStyle = PAPER; x.fillRect(-70, 50 + oy, 140, 34); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('ARCHIVE: YOU', 0, 68 + oy)
  x.restore()
}

const CAMEOS = [
  { sign: 'scorpio', cap: 'Read it in a second. | Replied *in three days.*', mood: lt => lt > 1.4 ? 'wink' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      phone(x, 790, 870, pop01(t, P.t0 + 0.2, 0.3, 2), {}, (x) => {
        x.fillStyle = SKYB; x.fillRect(-96, -120, 170, 44)
        x.fillStyle = BONE; x.font = `700 22px ${MONO}`; x.textAlign = 'right'; x.textBaseline = 'middle'; x.fillText('seen ✓✓', 90, -50)
      })
      const d = lt < 0.9 ? 0 : 1 + Math.min(2, Math.floor((lt - 0.9) / 0.35))
      label(x, 790, 1080, `REPLY: DAY ${d}`, pop01(t, P.t0 + 0.9, 0.3, 2), { size: 38, bg: CRIM, color: '#fff4e2', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Sent one word: | *“interesting.”*', mood: 'squint', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'interesting.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 50, col: LAV, tail: 'bl' })
      label(x, 790, 900, 'YOU: SPIRALING', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: GOLD, rot: 0.05 })
      label(x, 790, 1010, 'FOR: 4 DAYS', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 28, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'New profile pic: | *a black square.*', mood: 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 880); x.rotate(0.04); x.scale(k, k)
        x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -150, 260, 320)
        x.fillStyle = INK; x.fillRect(-134, -162, 268, 324); x.fillStyle = '#2a2350'; x.fillRect(-126, -154, 252, 308)
        x.fillStyle = '#000'; x.fillRect(-106, -134, 212, 212)
        x.fillStyle = CRIM; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('♏︎ SCORPIO', 0, 116)
        x.restore()
      }
      label(x, 790, 640, 'BIO: —', pop01(t, P.t0 + 0.8, 0.3, 2), { size: 34, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1110, 'MOOD: CLASSIFIED', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: CRIM, color: '#fff4e2', rot: 0.04 })
    } },
  { sign: 'scorpio', cap: 'Texted “hey.” | You *felt it in your soul.*', mood: lt => lt > 1.2 ? 'wink' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      bubble(x, 700, 660, 'hey.', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 54, col: LAV, tail: 'bl' })
      const k = pop01(t, P.t0 + 0.8, 0.35, 2)
      const sh = lt > 1.1 ? Math.sin(t * 60) * 6 : 0
      if (k > 0.01) signChar(x, t, 'libra', 800 + sh, 960, 200 * k, { mood: 'wide', look: [-1, 0], seed: 23, glyph: false })
      if (lt > 1.1) { x.save(); x.strokeStyle = BONE; x.lineWidth = 5; for (const d of [-1, 1]) for (let j = 0; j < 3; j++) { x.beginPath(); x.moveTo(800 + d * (120 + j * 16), 900 + j * 30); x.lineTo(800 + d * (138 + j * 16), 920 + j * 30); x.stroke() } x.restore() }
      label(x, 800, 1150, 'GOOSEBUMPS', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.04 })
    } },
  { sign: 'scorpio', cap: 'Your typing bubble vanished. | They *noticed.*', mood: lt => lt > 1.2 ? 'squint' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const gone = lt > 1.0
      const k = pop01(t, P.t0 + 0.2, 0.3, 2) * (gone ? 1 - prog(lt, 1.0, 1.2) : 1)
      bubble(x, 790, 780, '      ', k, { size: 50, col: BONE, tail: 'br' })
      if (k > 0.02) for (let i = 0; i < 3; i++) { const b = Math.max(0, Math.sin(t * 8 - i * 0.8)); x.fillStyle = INK; x.globalAlpha = k; x.fillRect(750 + i * 34, 772 - b * 10, 18, 18); x.globalAlpha = 1 }
      label(x, 790, 960, 'NOTED.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 56, bg: CRIM, color: '#fff4e2', rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1080, 'FILED: FOREVER', pop01(t, P.t0 + 1.8, 0.3, 2.2), { size: 28, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Replied with | *just a period.*', mood: 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'so are we good?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 36, col: SKYB, tail: 'br' })
      bubble(x, 790, 900, '.', pop01(t, P.t0 + 0.9, 0.25, 2.6), { size: 110, col: LAV, tail: 'bl' })
      label(x, 790, 1100, 'DECODE TIME: A WEEK', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 28, bg: GOLD, rot: 0.04 })
    } },
  { sign: 'scorpio', cap: 'Read receipts? | *Off. Forever.*', mood: lt => lt > 1.3 ? 'wink' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, LOCK, LOCK_C, 790, 900, 22 * pop01(t, P.t0 + 0.3, 0.3, 2))
      label(x, 790, 680, 'RECEIPTS: OFF', pop01(t, P.t0 + 0.7, 0.3, 2), { size: 40, bg: CRIM, color: '#fff4e2', rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1100, 'SINCE: BIRTH', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: BONE, rot: 0.04 })
    } },
  { sign: 'scorpio', cap: 'Saved every text | *since day one.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 }, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawer(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), ease.outBack ? ease.outCubic(prog(lt, 0.6, 1.1)) : prog(lt, 0.6, 1.1))
      label(x, 790, 640, 'SENTIMENTAL? NO.', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04 })
      hearts(x, t, 790, 820, P.t0 + 1.5, { n: 4, life: 1.5, spread: 160, cell: 7, seed: 3 })
    } },
  { sign: 'scorpio', cap: 'Finally texted first: | *“we need to talk.”*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 }, hops: [1.5],
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'we need to talk.', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 40, col: LAV, tail: 'bl' })
      bubble(x, 790, 850, '…about pizza.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 42, col: BONE, tail: 'bl' })
      drawBits(x, PIZZA, PIZZA_C, 790, 1040, 15 * pop01(t, P.t0 + 1.6, 0.3, 2.4), { rot: 0.1 })
    } },
]

const F = makeFilm({
  id: 'r2t0313', key: 'G', accent: CRIM, solo: 'scorpio', ending: 'lesson',
  title: 'Scorpios texting | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Few words. | *Big feelings.*', mood: 'squint' },
  lesson: { text: 'One word from a Scorpio | *means a lot.*', chip: 'STATUS: DECODED' },
  last: {
    text: 'Text back. | *Totally* not waiting.',
    draw(x, t, lt) { label(x, 540, 1300, 'CHECKED PHONE: 0 TIMES', pop01(t, t - lt + 1.2, 0.35, 2.2), { size: 34, bg: BONE, rot: -0.03, font: MONO, weight: 700 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
