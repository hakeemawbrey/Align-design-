// r2a0033: star_advice ADVICE SOLO, "What Pisces need | to feel heard." (~45 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole film (makeFilm solo mode, 9 cards): a relatable Pisces truth + a warm reframe, one gag each. Pisces cries
// in every card (happy and sad tears alike).
//   0.0–3.6    "What Pisces need | *to feel heard.*"
//   3.6–37.8   a twelve-minute voice note (listen to all of it) · "I'm fine" (ask twice) · a wild dream (hear the whole thing)
//              · a sad song on repeat (sit in it with them) · big feelings (make room on the couch) · they remember everything
//              (remember one thing back) · quiet isn't empty (they're processing) · a shared poem (say which line got you)
//              · cry together (it counts as talking)
//  37.8        "Listen soft. | They *open up.*"
//  41.2        CALLBACK: "Your voice note back? | *Fifteen minutes.*"  the voice note returns, longer
import { prog, lerp, ease } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, notes, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO,
} from '../../signs3kit.js'

const SEA = '#9fb8ff'
// ── props
/** a chat-style voice note: play button + waveform bars + a duration */
function voiceNote(x, t, cx, cy, k, dur, { playing = true } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-200, -60, 400, 120); x.fillStyle = '#3b3170'; x.fillRect(-192, -52, 384, 104)
  x.fillStyle = SEA; x.beginPath(); x.arc(-140, 0, 32, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.beginPath(); x.moveTo(-150, -16); x.lineTo(-150, 16); x.lineTo(-124, 0); x.closePath(); x.fill()
  for (let i = 0; i < 14; i++) { const h = 10 + 30 * Math.abs(Math.sin(i * 1.7 + (playing ? t * 4 : 0))); x.fillStyle = BONE; x.fillRect(-90 + i * 18, -h / 2, 10, h) }
  x.restore()
  label(x, cx + 120, cy + 80, dur, k, { size: 32, bg: SEA, font: MONO, weight: 700, rot: 0.03 })
}
const CLOUD = ['....WWWW......', '..WWWWWWWW....', '.WWWWWWWWWWWW.', 'WWWWWWWWWWWWWW', 'WWWWWWWWWWWWWW', '.WWWWWWWWWWWW.']
const FISH = ['..O....', '.OOOO.O', 'OKOOOOO', '.OOOO.O', '..O....']
const MOON = ['..MMM..', '.MMM...', 'MMM....', 'MMM....', '.MMM...', '..MMM..']
const PHONES = ['..KKKKKK..', '.K......K.', 'K........K', 'K........K', 'PP......PP', 'PP......PP', 'PP......PP']
const COUCH = ['PP..........PP', 'PPPPPPPPPPPPPP', 'PPCCCCCCCCCCPP', 'PPCCCCCCCCCCPP', 'PPPPPPPPPPPPPP', 'B............B']
const COUCH_C = { P: '#6b62a8', C: LAV, B: '#3b2a70' }
const TEA = ['WWWWWWW..', 'WTTTTTWWW', 'WTTTTTW.W', 'WTTTTTW.W', 'WTTTTTWWW', 'WTTTTTW..', '.WWWWW...']
function paper(x, cx, cy, w, h, k, rot = 0, col = BONE) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2 - 5, w + 10, h + 10)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  x.restore()
}

const S = 'pisces'
const ST = { x: -170 }
const CAMEOS = [
  { sign: S, cap: 'Twelve-minute voice note? | *Listen to all of it.*', mood: 'wide', tears: 2, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      voiceNote(x, t, 760, 820, pop01(t, P.t0 + 0.15, 0.3, 2), '12:04')
      label(x, 760, 1110, 'PLAYED: 100%', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: MINT, font: MONO, weight: 700 })
    } },
  { sign: S, cap: '“I’m fine”? | *Ask twice.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', tears: lt => lt > 1.4 ? 3 : 1, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 760, 700, 'i’m fine.', pop01(t, P.t0 + 0.2, 0.25, 2.4), { size: 50, tail: 'bl' })
      bubble(x, 800, 900, 'you sure?', pop01(t, P.t0 + 1.0, 0.25, 2.4), { size: 46, col: PINK, tail: 'br' })
      label(x, 780, 1120, 'ASKED TWICE ✓', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 36, bg: SEA, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Had a wild dream? | *Hear the whole thing.*', mood: 'sparkle', tears: 1, look: [1, -1], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      drawBits(x, CLOUD, { W: '#e8eef8' }, 780, 760, 26 * k)
      drawBits(x, FISH, { O: '#ff9a4a', K: INK }, 700 + Math.sin(t * 2) * 20, 760, 12 * pop01(t, P.t0 + 0.6, 0.3, 2))
      drawBits(x, MOON, { M: '#fff1b0' }, 860, 740, 10 * pop01(t, P.t0 + 0.8, 0.3, 2))
      label(x, 790, 1080, 'CHAPTER 7 OF 7', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: LAV, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Sad song on repeat? | *Sit in it with them.*', mood: 'sleepy', tears: 2, star: { x: -170, y: 20 },
    front(x, t, lt, P, Fr) {
      drawBits(x, PHONES, { K: INK, P: PINK }, Fr.x, Fr.top + 20, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      notes(x, t, 780, 900, { n: 4, cell: 8, col: SEA, alpha: pop01(t, P.t0 + 0.6, 0.3, 1.5) })
      label(x, 790, 1110, 'REPEAT: TOGETHER', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: SEA, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Big feelings? | *Make room on the couch.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', tears: 2, star: { x: -120, y: 30, s: 260 },
    back(x, t, lt, P) { drawBits(x, COUCH, COUCH_C, 540, 990, 40 * pop01(t, P.t0 + 0.05, 0.3, 1.8)) },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.8, 0.3, 2)
      label(x, 740, 900, 'SAVED FOR YOU', k, { size: 30, bg: GOLD, font: MONO, weight: 700, rot: -0.04 })
      hearts(x, t, 700, 820, P.t0 + 1.2, { n: 5, life: 1.8, spread: 200, cell: 7, seed: 4 })
    } },
  { sign: S, cap: 'They remember everything. | *Remember one thing back.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', tears: lt => lt > 1.3 ? 3 : 1, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, TEA, { W: BONE, T: '#ffb38a' }, 790, 830, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 640, 'PEACH TEA, NO SUGAR', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 30, bg: PINK, font: MONO, weight: 700 })
      bubble(x, 800, 1080, 'you remembered?!', pop01(t, P.t0 + 1.4, 0.25, 2.4), { size: 36, tail: 'bl' })
    } },
  { sign: S, cap: 'Gone quiet? | *They’re processing.*', mood: 'neutral', tears: 1, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2), p = Math.min(1, Math.max(0, lt - 0.3) / 1.9)
      if (k > 0.01) {
        x.save(); x.translate(790, 830); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-170, -40, 340, 80); x.fillStyle = '#2a2350'; x.fillRect(-162, -32, 324, 64)
        x.fillStyle = SEA; x.fillRect(-162, -32, 324 * p, 64)
        x.restore()
      }
      label(x, 790, 720, 'FEELING…', k, { size: 40, bg: LAV, font: MONO, weight: 700 })
      label(x, 790, 1060, 'TAKE YOUR TIME', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: MINT, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Shared a poem? | *Say which line got you.*', mood: lt => lt > 1.3 ? 'sparkle' : 'wide', tears: lt => lt > 1.3 ? 3 : 1, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      paper(x, 790, 830, 280, 360, k, 0.03)
      if (k > 0.01) {
        x.save(); x.translate(790, 830); x.rotate(0.03); x.scale(k, k)
        for (let i = 0; i < 7; i++) { if (i === 3 && lt > 1.0) { x.fillStyle = GOLD; x.fillRect(-120, -142 + i * 44, 240, 30) } x.fillStyle = '#9aa5c4'; x.fillRect(-100, -134 + i * 44, 170 - (i * 37) % 70, 12) }
        x.restore()
      }
      label(x, 790, 1110, 'LINE 4. WOW.', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 38, bg: GOLD, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Cry together. | *It counts as talking.*', mood: 'heart', tears: 3, star: { x: -150 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.4, 1.8)
      if (k > 0.01) signChar(x, t, 'cancer', 690, 900, 250 * k, { mood: 'heart', look: [-1, 0], seed: 33, hops: [P.t0 + 0.4], tears: 3 })
      hearts(x, t, 540, 700, P.t0 + 1.0, { n: 6, life: 2, spread: 240, cell: 7, seed: 3 })
      label(x, 540, 1140, 'BEST TALK EVER', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 38, bg: PINK, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0033', key: 'C', accent: SEA, solo: 'pisces', ending: 'callback',
  title: 'What Pisces need | *to feel heard.*',
  cameos: CAMEOS,
  group: { cap: 'Listen soft. | They *open up.*', mood: 'heart' },
  last: {
    text: 'Your voice note back? | *Fifteen minutes.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'pisces', 300, 1060, 260 * k, { mood: lt > 1.4 ? 'heart' : 'sparkle', look: [1, 0], seed: 40, hops: [t - lt + 1.2], tears: 3 })
      voiceNote(x, t, 700, 1040, 1.25 * pop01(t, t - lt + 0.8, 0.35, 2), '15:00')
      hearts(x, t, 560, 900, t - lt + 1.6, { n: 6, life: 1.6, spread: 260, cell: 6, seed: 9 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
