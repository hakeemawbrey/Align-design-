// trsignsmovie: THE SIGNS AS… on a movie date. (45 s vertical, Star Talk Trends §13.5, music: pop · G)
// The film they're all watching is made up: "COMET & ME". Story 0–40.6, then the shared end card. The format look
// lives in ./signs.js (identical in all five trsigns films).
//   0.0–2.8    "The signs on a | *movie date.*"  The twelve line up for roll call, then dive into the pip row.
//   2.8–31.7   the roll call, one stage card per sign:
//              ♈ guessed the ending during the trailer · ♉ here for the popcorn (large) · ♊ whispered through the
//              whole movie · ♋ brought a blanket for two · ♌ reenacted the hero's speech · ♍ picked the seats, row F,
//              dead center · ♎ shared the armrest, perfectly · ♏ watched your face during the twist · ♐ fell asleep,
//              woke up for the credits · ♑ stayed for every credit · ♒ rooting for the background robot
//              · ♓ cried at the trailer for a different movie
//  17.3        card cut (cameo 6 → 7).
//  31.7        "Twelve seats. | *One* popcorn."  The group photo in front of the screen glow. FLASH.
//  33.4        LESSON UNLOCKED: "The best scene | *is next to you.*"  +1 SHARED ARMREST
//  37.95       "*Watch* them, not it."  Two little stars lean in; hearts.
import { prog, ease, lerp, clamp } from '../../../src/lib.js'
import { drawStarChar } from '../../startalk.js'
import {
  makeFilm, drawBits, sparkles, hearts, notes, bubble, label, inSprite, starFrame, signChar, pop01, outK,
  GOLD, BONE, PINK, INK, SKYB, INTER, MONO,
} from './signs.js'

const at = (t0, d) => +(t0 + d).toFixed(3)
/** the cinema screen: a glowing rectangle; fn(x, l, tp, w, h) draws the picture */
function screen(x, cx, cy, w, h, k, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = 'rgba(190,220,255,0.12)'; x.beginPath(); x.moveTo(-w / 2, h / 2); x.lineTo(w / 2, h / 2); x.lineTo(w * 0.9, h / 2 + 420); x.lineTo(-w * 0.9, h / 2 + 420); x.fill()
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16)
  x.fillStyle = '#cfe3ff'; x.fillRect(-w / 2, -h / 2, w, h)
  if (fn) { x.save(); x.beginPath(); x.rect(-w / 2, -h / 2, w, h); x.clip(); fn(x, -w / 2, -h / 2, w, h); x.restore() }
  x.restore()
}
const txt = (x, s, cx, cy, size, col = INK, font = INTER) => { x.font = `800 ${size}px ${font}`; x.fillStyle = col; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, cx, cy) }
const POPCORN = ['.W.WW.W.', 'WWWWWWWW', 'WYWWWYWW', 'RWRWRWRW', 'RWRWRWRW', '.RWRWRW.', '.RWRWRW.', '..RWRW..']
const POP_C = { W: '#fff4e2', Y: '#ffe27a', R: '#e23d4e' }
const KERNEL = ['.W.', 'WWW', '.W.']
const BLANKET = ['BBBBBBBBBBBBBB', 'BbBBbBBbBBbBBB', 'BBBBBBBBBBBBBB', 'BBbBBbBBbBBbBB', 'BBBBBBBBBBBBBB']
const CAPE = ['RRRRRRRR', 'RRRRRRRR', '.RRRRRR.', '.RRRRRRR', '..RRRRRR', '..RRRRR.']
const ROBOT = ['..A..', '.GGG.', 'GEGEG', 'GGGGG', '.GGG.', 'G...G']

const CAMEOS = [
  { sign: 'aries', cap: 'Guessed the ending | *during the trailer.*', mood: lt => lt > 0.4 ? 'wide' : 'sparkle', look: [0, -1], star: { x: -140, y: 80 }, hops: [0.4, 0.55],
    back(x, t, lt, P) {
      screen(x, 640, 680, 480, 250, pop01(t, P.t0 + 0.05, 0.3, 2), (x, l, tp, w, h) => { txt(x, 'TRAILER', l + w / 2, tp + h / 2, 52, '#3a2d74') })
      bubble(x, 300, 650, 'THE DOG DID IT', pop01(t, P.t0 + 0.4, 0.22, 2.4), { size: 36, tail: 'bl', col: '#ffb3a0' })
      label(x, 700, 1100, 'shhh!', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 28, bg: BONE, rot: 0.06 })
    },
    cues: t0 => [['pop', at(t0, 0.4), 1174.66, 0.05, -0.3], ['pop', at(t0, 1.1), 523.25, 0.03, 0.3]] },
  { sign: 'taurus', cap: 'Here for | *the popcorn.* (Large.)', mood: 'heart', look: [1, 0], star: { x: -160 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), g = lerp(1, 1.35, ease.outBack(prog(lt, 1.0, 1.3)))
      drawBits(x, POPCORN, POP_C, 770, 1000 - (g - 1) * 140, 26 * k * g)
      for (let i = 0; i < 5; i++) { const ph = ((lt * 0.8 + i / 5) % 1); drawBits(x, KERNEL, { W: '#fff4e2' }, 700 + i * 35, 780 - Math.sin(Math.PI * ph) * 100, 8, { alpha: k }) }
      label(x, 770, 1150, 'LARGE', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 28, bg: '#e9b24a', rot: -0.05 })
    },
    cues: t0 => [['pop', at(t0, 1.0), 1046.5, 0.045, 0.3]] },
  { sign: 'gemini', beats: 5, cap: 'Whispered through | *the whole movie.*', mood: lt => (Math.floor(lt * 3) % 2 ? 'wide' : 'happy'), look: [1, 0], star: { x: -160 }, hops: [0.3, 0.7, 1.1, 1.5, 1.9],
    back(x, t, lt, P) {
      const W = ['psst', 'who’s that?', 'is he the dad??', 'wait go back', 'ok I love her']
      W.forEach((s, i) => bubble(x, 700 + (i % 2 ? 60 : -20), 600 + i * 110, s, pop01(t, P.t0 + 0.3 + i * 0.36, 0.2, 2.2), { size: 28, tail: 'bl', col: '#fff1b8' }))
    },
    cues: t0 => Array.from({ length: 5 }, (_, i) => ['pop', at(t0, 0.3 + i * 0.36), 1318.51 + i * 60, 0.02, 0.3]) },
  { sign: 'cancer', cap: 'Brought a blanket | *for two.*', mood: 'sparkle', star: { x: -110 },
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      const d = { color: '#c9a6ff', mood: lt > 1.0 ? 'heart' : 'happy', pop: k, seed: 52, glow: 0.6 }
      drawStarChar(x, 760, 950, 210, t, d)
      const s = ease.outBack(prog(lt, 0.6, 1.0))
      drawBits(x, BLANKET, { B: '#3fb6f0', b: '#bfe6ff' }, lerp(430, 590, s), 1050, 40 * clamp(s * 3), { rot: -0.03 })
    },
    cues: t0 => [['whoosh', at(t0, 0.6), 0.35, 0.03], ['pluck', at(t0, 1.0), 1318.51, 0.035, 0.5, 0.2]] },
  { sign: 'leo', cap: 'Reenacted | *the hero’s speech.*', mood: 'sparkle', squash: lt => -0.05 * Math.abs(Math.sin(lt * 4)), hops: [0.4, 1.2], star: { y: -30 },
    back(x, t, lt, P, F) { drawBits(x, CAPE, { R: '#e23d4e' }, F.x - 40 + 10 * Math.sin(lt * 7), F.cy + 20, 26 * P.k, { rot: -0.2 + 0.1 * Math.sin(lt * 5) }) },
    front(x, t, lt, P, F) {
      bubble(x, 540, 600, '“for the GALAXY!”', pop01(t, P.t0 + 0.4, 0.22, 2.4), { size: 40, tail: 'bc' })
      label(x, 820, 1130, 'row F: clapping', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 22, bg: '#f39a3a', rot: 0.05 })
    },
    cues: t0 => [['pop', at(t0, 0.4), 783.99, 0.05, 0], ['glitter', at(t0, 0.45), at(t0, 0.8)]] },
  { sign: 'virgo', beats: 5, cap: 'Picked the seats. | *Row F. Dead center.*', mood: 'squint', look: [-1, 0], star: { x: 190 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.1, 0.3, 2)
      if (k <= 0.01) return
      x.save(); x.translate(330, 900); x.scale(k, k)
      x.fillStyle = INK; x.fillRect(-170, -210, 340, 420); x.fillStyle = '#2a1f55'; x.fillRect(-160, -200, 320, 400)
      x.fillStyle = '#cfe3ff'; x.fillRect(-120, -180, 240, 18)
      for (let r = 0; r < 7; r++) for (let c = 0; c < 7; c++) {
        const target = r === 5 && c === 3, on = target && lt > 1.0
        x.fillStyle = on ? GOLD : '#6b62a8'; x.fillRect(-126 + c * 36, -130 + r * 44, 28, 30)
      }
      x.fillStyle = BONE; x.font = `700 20px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'
      'ABCDEFG'.split('').forEach((ch, r) => x.fillText(ch, -152, -115 + r * 44))
      // the cursor sweeps the rows, then lands
      const cr = lt < 1.0 ? Math.floor(lt * 7) % 7 : 5
      x.strokeStyle = '#ef5c94'; x.lineWidth = 5; x.strokeRect(-130, -134 + cr * 44, 252, 38)
      x.restore()
      sparkles(x, t, 330 + 18, 900 - 130 + 5 * 44 + 15, P.t0 + 1.0, 8, 70, 1, [GOLD, BONE, '#ef5c94'])
    },
    cues: t0 => Array.from({ length: 7 }, (_, i) => ['tick', at(t0, i / 7), 0.02]).concat([['bell', at(t0, 1.0), 1760, 0.03, 0.8, -0.3]]) },
  { sign: 'libra', cap: 'Shared the armrest. | *Perfectly.*', mood: 'sparkle', look: [1, 0], star: { x: -170, s: 260 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      drawStarChar(x, 710, 880, 260, t, { color: '#c9a6ff', mood: lt > 1.0 ? 'heart' : 'happy', look: [-1, 0], pop: k, seed: 53, glow: 0.6 })
      x.fillStyle = INK; x.fillRect(470, 1010, 140, 30); x.fillStyle = '#6b62a8'; x.fillRect(476, 1016, 128, 18)
      x.fillStyle = '#e163d6'; x.fillRect(538, 990, 4, 70)
      label(x, 540, 1110, '50 / 50', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 30, bg: '#e163d6', color: BONE })
    },
    cues: t0 => [['pop', at(t0, 0.7), 1046.5, 0.04, 0]] },
  { sign: 'scorpio', cap: 'Watched *your face* | during the twist.', mood: 'heart', look: [1, 0], star: { x: -170 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      drawStarChar(x, 760, 900, 230, t, { color: '#c9a6ff', mood: lt > 0.6 ? 'wide' : 'neutral', look: [0, -1], pop: k, seed: 54, glow: 0.6 })
      bubble(x, 760, 640, 'GASP', pop01(t, P.t0 + 0.6, 0.2, 2.4), { size: 40, tail: 'bc', col: '#ffe27a' })
      label(x, 300, 1110, 'twist: missed', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 24, bg: '#e23d66', color: BONE, rot: -0.05 })
    },
    cues: t0 => [['pop', at(t0, 0.6), 1318.51, 0.05, 0.3], ['pop', at(t0, 1.2), 659.25, 0.03, -0.3]] },
  { sign: 'sagittarius', beats: 5, cap: 'Fell asleep. | *Woke up for the credits.*', mood: lt => lt < 1.4 ? 'sleepy' : 'wide', star: { x: -150 }, hops: [1.4, 1.55],
    back(x, t, lt, P) {
      screen(x, 760, 820, 300, 200, pop01(t, P.t0 + 0.1, 0.3, 2), (x, l, tp, w, h) => {
        if (lt < 1.4) { x.fillStyle = '#a0b8e8'; x.fillRect(l, tp, w, h); return }
        x.fillStyle = '#120c2a'; x.fillRect(l, tp, w, h)
        for (let i = 0; i < 6; i++) { x.fillStyle = BONE; x.fillRect(l + 60, tp + 30 + i * 32 - ((lt - 1.4) * 60), w - 120, 10) }
      })
      label(x, 760, 1110, 'best nap ever', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 24, bg: '#a35cf0', color: BONE, rot: 0.05 })
    },
    cues: t0 => [['pop', at(t0, 1.4), 1567.98, 0.05, -0.3]] },
  { sign: 'capricorn', cap: 'Stayed for | *every* credit.', mood: 'neutral', look: [1, -1], star: { x: -170 },
    back(x, t, lt, P) {
      screen(x, 740, 820, 340, 380, pop01(t, P.t0 + 0.1, 0.3, 2), (x, l, tp, w, h) => {
        x.fillStyle = '#120c2a'; x.fillRect(l, tp, w, h)
        const R = ['DIRECTOR', 'COMET', 'MOON #2', 'GAFFER', 'CATERING', 'BEST BOY', 'A DOG', 'THE END?', 'BONUS SCENE!']
        R.forEach((s, i) => txt(x, s, l + w / 2, tp + h + 30 + i * 52 - lt * 230, 26, i === 8 ? GOLD : BONE, MONO))
      })
    },
    front(x, t, lt, P, F) { if (lt > 1.6) { sparkles(x, t, F.x, F.top, P.t0 + 1.6, 8, 120, 2, [GOLD, '#2fc79a', BONE]) } },
    cues: t0 => [['bell', at(t0, 1.6), 1760, 0.03, 0.8, -0.3]] },
  { sign: 'aquarius', cap: 'Rooting for | *the background robot.*', mood: lt => lt > 0.9 ? 'heart' : 'sparkle', look: [1, -1], star: { x: -170, y: 60 }, hops: [0.9, 1.1],
    back(x, t, lt, P) {
      screen(x, 700, 760, 420, 280, pop01(t, P.t0 + 0.1, 0.3, 2), (x, l, tp, w, h) => {
        x.fillStyle = '#a0b8e8'; x.fillRect(l, tp, w, h)
        drawStarChar(x, l + 140, tp + 150, 150, t, { color: '#f7cf68', mood: 'happy', seed: 81, glow: 0.3 })
        drawBits(x, ROBOT, { A: '#ff4f6d', G: '#c9c4d8', E: '#38c4ec' }, l + w - 70 + 6 * Math.sin(lt * 5), tp + h - 50, 8)
      })
      label(x, 820, 1080, 'GO LITTLE GUY', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 26, bg: '#38c4ec', rot: 0.05 })
    },
    cues: t0 => [['pop', at(t0, 0.9), 1318.51, 0.045, 0.3]] },
  { sign: 'pisces', beats: 5, cap: 'Cried at the trailer | *for a different movie.*', mood: lt => lt > 0.8 ? 'wide' : 'sparkle', tears: lt => lt > 0.8 ? 3 : 1, star: { x: -150, y: 60 },
    back(x, t, lt, P) {
      screen(x, 700, 720, 440, 240, pop01(t, P.t0 + 0.1, 0.3, 2), (x, l, tp, w, h) => {
        txt(x, 'COMING SOON', l + w / 2, tp + h / 2 - 30, 40, '#3a2d74')
        txt(x, 'A Movie About a Sock', l + w / 2, tp + h / 2 + 30, 28, '#7c74f0')
      })
      label(x, 760, 1100, 'not even our movie', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 24, bg: '#7c74f0', color: BONE, rot: 0.05 })
    },
    cues: t0 => [['pluck', at(t0, 0.8), 659.25, 0.04, 0.6, 0.3], ['pop', at(t0, 1.3), 783.99, 0.03, 0.3]] },
]

const F = makeFilm({
  id: 'trsignsmovie', key: 'G', accent: '#ffe27a',
  title: 'The signs on a | *movie date.*',
  cameos: CAMEOS,
  group: {
    cap: 'Twelve seats. | *One* popcorn.',
    draw(x, t, lt) {
      const k = pop01(t, 31.711 + 0.2, 0.4, 1.8) * outK(t, [33.2, 33.45])
      screen(x, 540, 690, 760, 200, k, (x, l, tp, w, h) => txt(x, 'COMET & ME', l + w / 2, tp + h / 2, 64, '#3a2d74'))
      drawBits(x, POPCORN, POP_C, 540, 1800, 15 * pop01(t, 31.711 + 0.9, 0.3, 2.2))
    },
    cues: t0 => [['pop', at(t0, 0.9), 1046.5, 0.04, 0]],
  },
  lesson: { text: 'The best scene | *is next to you.*', chip: '+1 SHARED ARMREST' },
  last: {
    text: '*Watch* them, | not it.',
    draw(x, t, lt) { hearts(x, t, 540, 1250, 37.95 + 0.5, { n: 10, life: 2.0, spread: 700, cell: 8, seed: 8 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
