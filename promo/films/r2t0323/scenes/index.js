// r2t0323: star_talk, SOLO (aries), "Your Aries roommate | be like." (signs3kit social cut, music: lofi · G). Ending: callback.
//   leftovers were a race · built the shelf with no instructions · repainted before unpacking · did every chore on the
//   chart · 5 a.m. sunrise sprint · movie night became a tournament · ten seconds in the microwave: too slow · set you
//   up on a date, tonight · someone upset you? on it.
//  37.8 "Chaos. | But loyal."   41.2 callback: "See you at | 5 a.m. sharp." (the sunrise sprint)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CREAM = '#fff4e2', ACC = '#ff6b5a'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })
const BOX = ['.KKKKKKKKKK.', 'KKKKKKKKKKKK', 'KMMMMMMMMMMK', 'KMWWWWWWWWMK', 'KMMMMMMMMMMK', 'KKKKKKKKKKKK']
const SHELF = ['KKKKKKKKKKKK', 'KWWWWWWWWWWK', 'KK........KK', 'K.K........K', 'KKKKKKKKKKKK', 'KWWWWWWWWWWK', 'K..........K', 'KKKKKKKKKKKK']
const SCREW = ['KKK', '.K.', '.K.']
const ROLLER = ['KKKKKKKK', 'KRRRRRRK', 'KRRRRRRK', 'KKKKKKKK', '...KK...', '...KK...', '...KK...', '...KK...']
const SUN = ['...Y..Y..Y...', '....Y.Y.Y....', '..YYYYYYYYY..', 'YYYYYYYYYYYYY', 'OOOOOOOOOOOOO', 'OOOOOOOOOOOOO']
const MICRO = ['KKKKKKKKKKKKKK', 'KGGGGGGGGGKSSK', 'KGYYYYYYYGKSSK', 'KGYYYYYYYGKSSK', 'KGYYYYYYYGKSSK', 'KGGGGGGGGGKSSK', 'KKKKKKKKKKKKKK']

function chores(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -150, 316, 320)
  x.fillStyle = INK; x.fillRect(-162, -166, 324, 330); x.fillStyle = CREAM; x.fillRect(-154, -158, 308, 314)
  x.fillStyle = INK; x.font = `800 26px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  x.fillText('CHORE', -140, -128); x.fillText('ARIES', 6, -128); x.fillText('YOU', 96, -128)
  const C = ['dishes', 'trash', 'floors', 'laundry', 'plants']
  C.forEach((c, i) => {
    const y = -78 + i * 52
    x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.fillText(c, -140, y)
    if (lt > 0.4 + i * 0.25) { x.fillStyle = '#2fc79a'; x.font = `800 34px ${INTER}`; x.fillText('✓', 30, y) }
    x.fillStyle = '#b9b0a0'; x.fillText('–', 112, y)
  })
  x.restore()
}
function bracket(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -140, 316, 290)
  x.fillStyle = INK; x.fillRect(-162, -156, 324, 300); x.fillStyle = CREAM; x.fillRect(-154, -148, 308, 284)
  x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('MOVIE NIGHT CUP', 0, -122)
  x.strokeStyle = INK; x.lineWidth = 5
  for (let i = 0; i < 4; i++) { const y = -70 + i * 56; x.beginPath(); x.moveTo(-130, y); x.lineTo(-60, y); x.stroke() }
  for (let i = 0; i < 2; i++) { const y = -42 + i * 112; x.beginPath(); x.moveTo(-60, y - 28); x.lineTo(-60, y + 28); x.moveTo(-60, y); x.lineTo(20, y); x.stroke() }
  x.beginPath(); x.moveTo(20, -42); x.lineTo(20, 70); x.moveTo(20, 14); x.lineTo(70, 14); x.stroke()
  if (lt > 1.0) { x.fillStyle = GOLD; x.fillRect(66, -6, 80, 40); x.fillStyle = INK; x.font = `800 22px ${INTER}`; x.fillText('FINAL', 106, 14) }
  x.restore()
}

const S = 'aries', ST = { x: -170 }
const CAMEOS = [
  { sign: S, cap: 'Ate your leftovers. | Called it *a race.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, BOX, { K: INK, M: '#5fd068', W: CREAM }, 790, 900, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { alpha: lt > 0.9 ? 0.7 : 1 })
      L(x, 790, 760, 'YOURS (EMPTY)', pop01(t, P.t0 + 0.9, 0.3, 2.4), BONE, 0.04, 32)
      bubble(x, 790, 1080, 'I won!!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 44, col: GOLD, tail: 'bl' })
    } },
  { sign: S, cap: 'Built the shelf. | *No instructions.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', star: ST,
    front(x, t, lt, P) {
      drawBits(x, SHELF, { K: '#8a4a2e', W: '#c9915a' }, 790, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.16 })
      const k = pop01(t, P.t0 + 0.9, 0.3, 2)
      for (let i = 0; i < 5; i++) drawBits(x, SCREW, { K: '#c9c9d8' }, 690 + i * 50, 1120 - (i % 2) * 14, 10 * k, { rot: i * 0.7 })
      L(x, 790, 640, 'SPARE PARTS: 14', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: S, cap: 'Repainted the place. | *Before unpacking.*', mood: 'sparkle', star: ST, hops: [0.6],
    back(x, t, lt, P) {
      const p = ease.inOutCubic(prog(lt, 0.2, 1.4))
      x.save(); x.fillStyle = RED; x.globalAlpha = 0.55; x.fillRect(110, 480, 860 * p, 740); x.restore()
    },
    front(x, t, lt, P) {
      const p = ease.inOutCubic(prog(lt, 0.2, 1.4))
      drawBits(x, ROLLER, { K: INK, R: RED }, 110 + 860 * p, 640, 16 * pop01(t, P.t0 + 0.1, 0.3, 2))
      drawBits(x, BOX, { K: INK, M: '#c9915a', W: '#a8743f' }, 800, 1100, 14 * pop01(t, P.t0 + 0.3, 0.3, 2))
      L(x, 790, 900, 'RED. OBVIOUSLY.', pop01(t, P.t0 + 1.5, 0.3, 2.4), BONE, 0.04, 36)
    } },
  { sign: S, cap: 'Made a chore chart. | Did *every chore.*', mood: lt => lt > 1.6 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) { chores(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt) } },
  { sign: S, cap: 'Woke you up | for a *sunrise sprint.*', mood: 'sparkle', star: ST, hops: [0.5, 1.0, 1.5],
    back(x, t, lt, P) {
      const p = ease.outCubic(prog(lt, 0.2, 1.2))
      x.save(); x.beginPath(); x.rect(110, 480, 860, 740); x.clip()
      drawBits(x, SUN, { Y: GOLD, O: '#ff9a4a' }, 790, lerp(1180, 760, p), 22)
      x.restore()
    },
    front(x, t, lt, P) {
      L(x, 790, 620, '5:00 A.M.', pop01(t, P.t0 + 0.4, 0.3, 2), BONE, -0.04, 40)
      bubble(x, 520, 600, "LET'S GO!!", pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: S, cap: 'Movie night? | Now it’s *a tournament.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bracket(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      L(x, 790, 1120, 'WINNER PICKS FOREVER', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, 0.04, 28)
    } },
  { sign: S, cap: 'Microwave: ten seconds. | *Too slow.*', mood: lt => lt > 1.0 ? 'squint' : 'neutral', look: [1, 0], star: ST, hops: [0.8, 1.2, 1.6],
    front(x, t, lt, P) {
      drawBits(x, MICRO, { K: INK, G: '#9aa5c4', Y: '#ffe7a8', S: '#6b62a8' }, 790, 860, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const n = Math.max(1, 10 - Math.floor(lt * 1.2))
      if (lt > 0.3) L(x, 790, 1050, `0:0${n === 10 ? '9' : n}`, 1, '#2fc79a', 0, 40)
      bubble(x, 790, 640, 'come ON', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 44, tail: 'bl' })
    } },
  { sign: S, cap: 'Set you up on a date. | *Tonight. Now.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'libra', 810, 910, 180 * k, { mood: 'wide', look: [-1, 0], seed: 11, glyph: false })
      L(x, 800, 720, 'IT’S A MATCH ✦', pop01(t, P.t0 + 0.8, 0.3, 2.4), PINK, -0.04, 32)
      L(x, 800, 1100, 'DATE: IN 5 MIN', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, 0.04, 34)
    } },
  { sign: S, cap: 'Someone upset you? | *On it.*', mood: lt => lt > 0.8 ? 'squint' : 'wide', look: [1, 0], star: { x: -60, s: 330 }, hops: [0.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'pisces', 270, 930, 160 * k, { mood: lt > 1.4 ? 'heart' : 'wide', look: [1, 0], seed: 12, glyph: false, tears: lt > 1.4 ? 1 : 2 })
    },
    front(x, t, lt, P) {
      bubble(x, 760, 620, 'who was it.', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 44, tail: 'bl' })
      L(x, 790, 1130, 'ROOMMATE: PROTECTED', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 30)
    } },
]

const F = makeFilm({
  id: 'r2t0323', key: 'G', accent: ACC, solo: 'aries', ending: 'callback',
  title: 'Your Aries | roommate *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Chaos. | But *loyal.*', mood: 'sparkle' },
  last: {
    text: 'See you at | *5 a.m. sharp.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const p = ease.outCubic(prog(lt, 0.3, 1.6))
      drawBits(x, SUN, { Y: GOLD, O: '#ff9a4a' }, 720, lerp(1300, 1000, p), 22, { alpha: clamp(lt / 0.4) })
      const k = pop01(t, t0 + 0.2, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'aries', 400, 1080, 300 * k, { mood: 'sparkle', seed: 7, look: [1, 0], hops: [t0 + 0.9, t0 + 1.4, t0 + 1.9] })
      bubble(x, 740, 820, 'ready??', pop01(t, t0 + 1.2, 0.25, 2.4), { size: 46, tail: 'bl' })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
