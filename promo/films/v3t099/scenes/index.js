// v3t099: THE SIGNS AS… v3, "Their song plays | be like." (belike: zodiacs when their song comes on; ~54 s vertical,
// signs3kit social cut, music: lofi · F). Ending: 'group'.
//   0.0–3.6    "Their song plays | *be like.*"
//   3.6–49.2   ♈ turned it up, broke the knob · ♉ slow-danced with the snacks · ♊ knows every word of every version
//              · ♋ called the friend it reminds them of · ♌ the kitchen is a stadium (crowd: one cat) · ♍ air-drummed,
//              every beat · ♎ grabbed a stranger to slow dance · ♏ on repeat, day 300 · ♐ danced on the table, wrong song
//              · ♑ allowed one head nod (okay, two) · ♒ danced to the song in their head · ♓ first note, full tears
//  49.2        group (the ending): "Same song. | *Twelve dances.*"  A speaker: ON REPEAT
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const SPEAKER = [
  'KKKKKKKKK',
  'KGGGGGGGK',
  'KGGKKKGGK',
  'KGKSSSKGK',
  'KGKSKSKGK',
  'KGKSSSKGK',
  'KGGKKKGGK',
  'KGGGGGGGK',
  'KGGKKKGGK',
  'KGKSSSKGK',
  'KGGKKKGGK',
  'KKKKKKKKK',
]
const SPEAKER_C = { K: '#2a2350', G: '#4a4380', S: '#9aa5c4' }
const CHIPS = [
  '.YYYYYY.',
  'YRRRRRRY',
  'YRWWWWRY',
  'YRWOOWRY',
  'YRRRRRRY',
  '.YYYYYY.',
]
const CHIPS_C = { Y: GOLD, R: '#ff6b5a', W: '#fff4e2', O: '#ffb34a' }
const CAT = ['K...K.', 'KK.KK.', 'KKKKK.', 'KWKWK.', 'KKKKK.', '.KKKKK', '.KKKKK', '.K.K.K']
const PHONE = [
  'KKKKKKKK',
  'KSSSSSSK',
  'KSHHSHHK',
  'KSHHHHHK',
  'KSSHHHSK',
  'KSSSHSSK',
  'KSSSSSSK',
  'KKKGGKKK',
]
const PHONE_C = { K: '#2a2350', S: '#8fe3ff', H: '#ff4f86', G: '#6b62a8' }

// a big volume knob that spins and pops off
function knob(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  const off = clamp((lt - 1.3) / 0.5)
  x.save(); x.translate(cx + off * 60, cy - off * 160 + off * off * 120); x.rotate(lt * 5); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 86, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#9aa5c4'; x.beginPath(); x.arc(0, 0, 76, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#ff6b5a'; x.fillRect(-8, -72, 16, 46)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Turned it up. | *Broke the knob.*', mood: lt => lt > 1.3 ? 'wide' : 'sparkle', star: { x: -160 }, hops: [0.5, 1.0],
    front(x, t, lt, P) {
      knob(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 1060, 'VOLUME: ALL OF IT', pop01(t, P.t0 + 0.7, 0.3, 2), { size: 28, bg: '#ff6b5a', rot: 0.04 })
    } },
  { sign: 'taurus', cap: 'Slow-danced | *with the snacks.*', mood: 'heart', star: { x: -150 }, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      drawBits(x, CHIPS, CHIPS_C, 790 + 40 * Math.sin(lt * 3), 880, 26 * pop01(t, P.t0 + 0.3, 0.35, 2), { rot: 0.15 * Math.sin(lt * 3) })
      notes(x, t, 790, 760, { n: 3, cell: 7, col: PINK, alpha: clamp(lt - 0.4) })
      label(x, 790, 1080, 'PARTNER: CHIPS', pop01(t, P.t0 + 1.2, 0.3, 2), { size: 30, bg: GOLD, rot: -0.04 })
    } },
  { sign: 'gemini', cap: 'Knows every word. | Of *every version.*', mood: lt => Math.floor(lt * 2.4) % 2 ? 'wink' : 'sparkle', star: { x: -160 },
    front(x, t, lt, P) {
      const V = ['original!', 'acoustic!', 'remix 3!', 'live, 2011!']
      bubble(x, 780, 680, V[Math.min(3, Math.floor(lt * 1.8))], pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, tail: 'bl' })
      notes(x, t, 790, 1040, { n: 5, cell: 8, col: GOLD })
    } },
  { sign: 'cancer', cap: 'Called the friend | it *reminds them of.*', mood: 'heart', star: { x: -160 },
    front(x, t, lt, P) {
      drawBits(x, PHONE, PHONE_C, 790, 900, 22 * pop01(t, P.t0 + 0.3, 0.35, 2), { rot: 0.08 })
      bubble(x, 790, 660, 'OUR SONG!!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 44, col: PINK, tail: 'bl' })
      hearts(x, t, 790, 1000, P.t0 + 1.2, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Kitchen? | No. *A stadium.*', mood: 'sparkle', star: { x: -150 }, hops: [0.6, 1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, CAT, { K: '#ffb34a', W: INK }, 800, 1000, 14 * pop01(t, P.t0 + 0.6, 0.3, 2), { outline: BONE })
      label(x, 790, 700, 'SOLD OUT', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 44, bg: '#ffb34a', rot: -0.05 })
      label(x, 790, 860, 'CROWD: 1 CAT', pop01(t, P.t0 + 1.1, 0.3, 2), { size: 30, bg: GOLD, rot: 0.05 })
      sparkles(x, t, 390, 860, P.t0 + 0.6, 6, 170, 0.2)
    } },
  { sign: 'virgo', cap: 'Air-drummed. | *Every single beat.*', mood: 'squint', star: { x: -160 }, hops: [0.4, 0.8, 1.2, 1.6],
    front(x, t, lt, P) {
      const a = Math.sin(lt * 14) * 0.5
      x.save(); x.strokeStyle = '#e8a24a'; x.lineWidth = 12; x.lineCap = 'round'
      for (const [cx, s] of [[300, 1], [480, -1]]) { if (lt < 0.2) continue; x.beginPath(); x.moveTo(cx, 820); x.lineTo(cx + Math.cos(-1.2 + s * a) * 110 * s, 820 + Math.sin(-1.2 + s * a) * 110); x.stroke() }
      x.restore()
      label(x, 790, 760, 'TIMING: FLAWLESS', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 30, bg: MINT, rot: 0.04 })
      label(x, 790, 920, 'DRUMS: NONE', pop01(t, P.t0 + 1.3, 0.3, 2), { size: 30, bg: GOLD, rot: -0.05 })
    } },
  { sign: 'libra', cap: 'Grabbed a stranger | for *a slow dance.*', mood: 'heart', star: { x: -150 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.4, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'capricorn', 790, 920, 230 * k, { mood: lt > 1.3 ? 'happy' : 'wide', look: [-1, 0], seed: 14, glyph: false })
      label(x, 790, 680, 'COMPATIBILITY: GROOVY', pop01(t, P.t0 + 1.2, 0.3, 2), { size: 26, bg: PINK, rot: 0.04 })
      hearts(x, t, 560, 800, P.t0 + 1.3, { n: 5, life: 1.8, spread: 260, cell: 7, seed: 6 })
    } },
  { sign: 'scorpio', cap: 'On repeat. | *Day 300.*', mood: 'neutral', look: [1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      drawBits(x, SPEAKER, SPEAKER_C, 790, 860, 18 * pop01(t, P.t0 + 0.25, 0.35, 2), { sy: 1 + 0.03 * Math.sin(t * 20) })
      label(x, 790, 660, `PLAYS: ${4800 + Math.floor(lt * 6)}`, pop01(t, P.t0 + 0.7, 0.3, 2), { size: 32, bg: LAV, rot: -0.04 })
      label(x, 790, 1070, 'NOT SICK OF IT', pop01(t, P.t0 + 1.4, 0.3, 2), { size: 28, bg: GOLD, rot: 0.04 })
    } },
  { sign: 'sagittarius', cap: 'Danced on the table. | *Wrong song.*', mood: lt => lt > 1.3 ? 'wide' : 'sparkle', star: { x: 150, y: -80, s: 260 }, hops: [0.4, 0.8, 1.2],
    back(x, t, lt, P) {
      drawBits(x, ['WWWWWWWWWWW', 'WWWWWWWWWWW', '.B.......B.', '.B.......B.', '.B.......B.'], { W: '#fff4e2', B: '#8a4a2e' }, 690, 1000, 26 * pop01(t, P.t0 + 0.15, 0.3, 2))
    },
    front(x, t, lt, P) {
      label(x, 320, 680, 'THIS ISN’T IT', pop01(t, P.t0 + 1.3, 0.3, 2), { size: 30, bg: '#ff6b5a', rot: -0.05 })
      bubble(x, 320, 880, 'still counts!', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 34, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'Allowed one head nod. | *Okay, two.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', squash: lt => 0.06 * Math.max(0, Math.sin(lt * 9)), star: { x: -160 },
    front(x, t, lt, P) {
      label(x, 790, 700, lt > 1.3 ? 'NODS: 2' : 'NODS: 1', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 40, bg: MINT, rot: 0.04 })
      bubble(x, 790, 920, 'don’t tell | anyone', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'aquarius', cap: 'Danced to the song | *in their head.*', mood: 'sparkle', look: [1, -1], star: { x: -160 }, hops: [0.7, 1.5],
    front(x, t, lt, P) {
      label(x, 790, 700, 'MUSIC: OFF', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 36, bg: SKYB, rot: -0.04 })
      bubble(x, 790, 900, 'it’s a banger', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, col: SKYB, tail: 'bl' })
      notes(x, t, 400, 640, { n: 3, cell: 6, col: SKYB, alpha: 0.7 })
    } },
  { sign: 'pisces', cap: 'First note. | *Full tears.*', mood: lt => lt < 0.6 ? 'happy' : 'wide', tears: lt => lt < 0.6 ? 1 : 3, star: { x: -160 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 680, '♪ —', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 50, tail: 'bl' })
      label(x, 790, 900, 'SECONDS IN: 1', pop01(t, P.t0 + 0.9, 0.3, 2), { size: 32, bg: SKYB, rot: 0.05 })
      hearts(x, t, 790, 1040, P.t0 + 1.1, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'v3t099', key: 'F', accent: '#7dffb0', ending: 'group',
  title: 'Their song plays | *be like.*',
  cameos: CAMEOS,
  group: {
    cap: 'Same song. | *Twelve dances.*',
    moods: ['sparkle', 'heart', 'wink', 'heart', 'sparkle', 'squint', 'heart', 'neutral', 'wide', 'happy', 'sparkle', 'heart'],
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 1.4, 0.35, 2)
      drawBits(x, SPEAKER, SPEAKER_C, 270, 640, 12 * k, { sy: 1 + 0.04 * Math.sin(t * 20) })
      drawBits(x, SPEAKER, SPEAKER_C, 810, 640, 12 * k, { sy: 1 + 0.04 * Math.sin(t * 20 + 1) })
      label(x, 540, 640, 'ON REPEAT', k, { size: 40, bg: GOLD, rot: -0.04 })
      notes(x, t, 540, 820, { n: 6, cell: 8, col: GOLD, alpha: k })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
