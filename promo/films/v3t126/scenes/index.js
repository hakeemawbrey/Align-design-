// v3t126: THE SIGNS AS… v3, SOLO film, "Leos in love | be like." (~51 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole way through: nine love situations, each the most extreme (and lovable) Leo version.
//   0.0–3.6    "Leos in love | *be like.*"  One big Leo pops in, then the cards start.
//   3.6–37.8   nine cards: first date, brought a photographer · said "I love you" with an orchestra · anniversary,
//              planned a gala · replies to "hi" with a ten-minute voice note · loves you loudly, told the whole bus
//              · you said "cute", Leo heard "iconic" · matching shirts, their face on both · cooked dinner, took a bow
//              · your biggest fan, with a sign
//  37.8        "Loud love. | *Real love.*"
//  41.0        LESSON UNLOCKED: "Let them adore you. | *That’s love.*"  STATUS: ADORED
//  46.9        "They mean | *every word.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, notes,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ORANGE = '#ffb34a', RED = '#e23d4e', DARK = '#2a2350', STEEL = '#9aa5c4', BROWN = '#8a4a2e'

const CAMERA = [
  '...KKK.......',
  'KKKKKKKKKKKKK',
  'KSSSSSSSSSSSK',
  'KSSSKKKKSSSSK',
  'KSSKBBBBKSSSK',
  'KSSKBWBBKSSSK',
  'KSSKBBBBKSSSK',
  'KSSSKKKKSSSSK',
  'KKKKKKKKKKKKK',
]
const CAMERA_C = { K: INK, S: STEEL, B: '#6fc3ff', W: '#fff' }
const VIOLIN = [
  '.....K',
  '....K.',
  '...BB.',
  '..BBB.',
  '.BBKB.',
  'BBBBB.',
  'BBKBB.',
  '.BBB..',
]
const SHIRT = [
  'SS.....SS',
  'SSSS.SSSS',
  'SSSSSSSSS',
  '.SSSSSSS.',
  '.SSSSSSS.',
  '.SSSSSSS.',
  '.SSSSSSS.',
]
const PLATE = [
  '...RRRR...',
  '..RGRRGR..',
  'WWWWWWWWWW',
  '.WWWWWWWW.',
]
const PLATE_C = { R: '#e8865a', G: '#5fd068', W: BONE }

// a sound-wave voice note bubble with a growing timer
function voiceNote(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-180, -60, 360, 120)
  x.fillStyle = BONE; x.fillRect(-172, -52, 344, 104)
  x.fillStyle = ORANGE; x.beginPath(); x.moveTo(-150, -22); x.lineTo(-150, 22); x.lineTo(-118, 0); x.closePath(); x.fill()
  for (let i = 0; i < 14; i++) { const h = 10 + Math.abs(Math.sin(i * 1.7 + t * 5)) * 34; x.fillStyle = INK; x.fillRect(-96 + i * 15, -h / 2 - 8, 8, h) }
  const s = Math.min(600, Math.floor(clamp((lt - 0.2) / 1.8) * 600))
  x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'right'; x.textBaseline = 'middle'
  x.fillText(`${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`, 160, 34)
  x.restore()
}
// a hand-painted fan sign on a stick
function fanSign(x, cx, cy, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(Math.sin(t * 5) * 0.12); x.scale(k, k)
  x.fillStyle = BROWN; x.fillRect(-8, 60, 16, 200)
  x.fillStyle = INK; x.fillRect(-170, -110, 340, 190)
  x.fillStyle = ORANGE; x.fillRect(-162, -102, 324, 174)
  x.fillStyle = INK; x.font = `800 52px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('GO YOU!!', 0, -16)
  x.restore()
}

const L = 'leo'
const CAMEOS = [
  { sign: L, cap: 'First date. | Brought *a photographer.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.6],
    front(x, t, lt, P) {
      drawBits(x, CAMERA, CAMERA_C, 790, 880, 20 * pop01(t, P.t0 + 0.3, 0.3, 2))
      const fl = t - (P.t0 + 1.0 * 1.29)
      if (fl > 0 && fl < 0.3) { x.fillStyle = `rgba(255,250,235,${(0.5 * (1 - fl / 0.3)).toFixed(3)})`; x.fillRect(110, 480, 860, 740) }
      label(x, 790, 680, 'SHOT 214', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 40, bg: ORANGE, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 1090, 'chin up, babe', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: L, cap: 'Said “I love you.” | *With an orchestra.*', mood: 'heart', star: { x: -170 },
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) drawBits(x, VIOLIN, { K: BONE, B: '#c98a5a' }, 690 + i * 100, 960 - (i % 2) * 40, 16 * pop01(t, P.t0 + 0.3 + i * 0.2, 0.3, 2), { rot: -0.3 })
      if (lt > 0.6) notes(x, t, 790, 860, { n: 5, cell: 7, col: ORANGE, seed: 2 })
      label(x, 790, 680, 'ORCHESTRA: HIRED', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 34, bg: GOLD, rot: 0.05 })
    } },
  { sign: L, cap: 'Your anniversary? | Leo *planned a gala.*', mood: 'sparkle', star: { x: -170 }, hops: [1.2],
    front(x, t, lt, P) {
      label(x, 790, 720, 'BLACK TIE', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 46, bg: INK, color: GOLD, rot: 0.05, font: MONO, weight: 700 })
      label(x, 790, 900, 'GUESTS: 300', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 40, bg: ORANGE, rot: -0.05, font: MONO, weight: 700 })
      sparkles(x, t, 790, 820, P.t0 + 0.6, 8, 200, 0.2)
      sparkles(x, t, 790, 820, P.t0 + 1.3, 8, 160, 0.6)
    } },
  { sign: L, cap: 'You texted “hi.” | Got *a voice note.*', mood: lt => lt > 0.4 ? 'happy' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 660, 'hi', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 46, col: LAV, tail: 'br' })
      voiceNote(x, t, 790, 880, pop01(t, P.t0 + 0.6, 0.3, 2), lt)
    } },
  { sign: L, cap: 'Loves you loudly. | Told *the entire bus.*', mood: 'heart', star: { x: -170 }, hops: [0.5, 1.2],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'I LOVE | THEM!!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 52, tail: 'bl' })
      label(x, 790, 940, 'NEXT STOP: YOU', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 36, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      hearts(x, t, 390, 820, P.t0 + 0.8, { n: 5, life: 1.8, spread: 200, cell: 8, seed: 3 })
    } },
  { sign: L, cap: 'You said “cute.” | Leo heard *“iconic.”*', mood: lt => lt > 1.1 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.1],
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'cute.', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 46, col: LAV, tail: 'br' })
      label(x, 790, 900, 'ICONIC', pop01(t, P.t0 + 1.0, 0.3, 2.6), { size: 64, bg: ORANGE, rot: -0.06, font: MONO, weight: 700 })
      sparkles(x, t, 790, 900, P.t0 + 1.2, 8, 180, 0.3)
    } },
  { sign: L, cap: 'Matching shirts. | *Their face* on both.', mood: 'sparkle', star: { x: -190 },
    front(x, t, lt, P) {
      for (let i = 0; i < 2; i++) {
        const k = pop01(t, P.t0 + 0.3 + i * 0.4, 0.3, 2), cx = 700 + i * 180
        drawBits(x, SHIRT, { S: i ? LAV : MINT }, cx, 880, 22 * k)
        if (k > 0.3) signChar(x, t, L, cx, 900, 110 * k, { mood: 'sparkle', seed: 70 + i, glyph: false, glow: 0.6 })
      }
      label(x, 790, 1110, 'LEO X2', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 38, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: L, cap: 'Cooked you dinner. | *Took a bow.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', star: { x: -170 }, squash: lt => lt > 1.0 && lt < 1.6 ? 0.18 : 0,
    front(x, t, lt, P) {
      drawBits(x, PLATE, PLATE_C, 790, 970, 28 * pop01(t, P.t0 + 0.3, 0.3, 2))
      label(x, 790, 700, 'ENCORE?', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 48, bg: ORANGE, rot: 0.05, font: MONO, weight: 700 })
      sparkles(x, t, 390, 760, P.t0 + 1.3, 6, 140, 0.3)
    } },
  { sign: L, cap: 'Your biggest fan. | *Brought a sign.*', mood: 'heart', look: [1, 0], star: { x: -180 }, hops: [0.6, 1.2, 1.8],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      fanSign(x, 790, 820, pop01(t, P.t0 + 0.3, 0.35, 2), t)
      hearts(x, t, 790, 760, P.t0 + 1.0, { n: 5, life: 1.8, spread: 220, cell: 8, seed: 4 })
    } },
]

const F = makeFilm({
  id: 'v3t126', key: 'C', accent: ORANGE, solo: L, ending: 'lesson',
  title: 'Leos in love | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Loud love. | *Real love.*', mood: 'heart' },
  lesson: { text: 'Let them adore you. | *That’s love.*', chip: 'STATUS: ADORED' },
  last: {
    text: 'They mean | *every word.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 10, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
