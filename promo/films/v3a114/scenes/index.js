// v3a114: star_advice, ADVICE SOLO, "Gemini, your gift | is this." (~45 s vertical, signs3kit social cut, music: lofi · G)
// One sign the whole way through (makeFilm solo mode, 9 cards): the gifts a Gemini brings, one light gag each.
//   0.0–3.6    "Gemini, your gift | *is this.*"
//   3.6–37.8   nine cards: talks to anyone (even a grumpy Capricorn laughs) · makes a waiting room fun · a little about
//              everything: FUN FACT #208 · revives the group chat · curiosity: "wait, tell me EVERYTHING" (Pisces, delighted)
//              · plan changes in seconds: PLAN B. C. D. · two moods, twice the fun · first dates: AWKWARD SILENCES: 0
//              · makes Virgo feel interesting ("you KNIT?")
//  37.8        "Curious. Quick. | *Never boring.*"
//  41.2        callback: "Fun fact #209: | *we love you.*"
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const S = 'gemini'
const RED = '#e23d4e', YEL = '#ffd23a'

const card = (x, cx, cy, w, h, k, rot = 0, bg = BONE) => {
  x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
}
function phone(x, cx, cy, k, head, headCol, msgs, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-142, -212, 300, 440)
  x.fillStyle = INK; x.fillRect(-154, -224, 308, 448)
  x.fillStyle = '#2a2350'; x.fillRect(-144, -214, 288, 428)
  x.fillStyle = '#140c30'; x.fillRect(-132, -190, 264, 380)
  x.fillStyle = headCol; x.fillRect(-120, -178, 240, 44)
  x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -155)
  msgs.forEach(([at, y, col, lines, sz = 34]) => {
    const b = pop01(lt, at, 0.25, 2)
    if (b <= 0.01) return
    x.save(); x.translate(0, y); x.scale(b, b)
    const h = lines.length * (sz + 8) + 30
    x.fillStyle = INK; x.fillRect(-120, -h / 2 - 4, 240, h + 8); x.fillStyle = col; x.fillRect(-116, -h / 2, 232, h)
    x.fillStyle = INK; x.font = `800 ${sz}px ${INTER}`
    lines.forEach((l, j) => x.fillText(l, 0, -h / 2 + 15 + (sz + 8) * (j + 0.5) + 2))
    x.restore()
  })
  x.restore()
}
// a row of waiting-room chairs and a ticket number
function chairs(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  for (const px of [-240, -80, 80, 240]) {
    x.fillStyle = INK; x.fillRect(px - 60, -80, 120, 160); x.fillStyle = '#6fc3ff'; x.fillRect(px - 52, -72, 104, 70); x.fillRect(px - 52, 6, 104, 22)
    x.fillStyle = INK; x.fillRect(px - 50, 28, 10, 70); x.fillRect(px + 40, 28, 10, 70)
  }
  x.restore()
}
// a weather icon that flips through sun → rain → snow
function weather(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  const st = lt < 0.8 ? 0 : lt < 1.3 ? 1 : 2
  x.save(); card(x, cx, cy, 260, 240, k, 0.04, ['#ffe9a8', '#bcd7ff', '#ffffff'][st])
  if (st === 0) { x.fillStyle = GOLD; x.beginPath(); x.arc(0, 0, 60, 0, Math.PI * 2); x.fill(); x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.fillText('PICNIC', 0, 100) }
  if (st === 1) { x.fillStyle = '#9aa5c4'; x.beginPath(); x.arc(-30, -20, 40, 0, Math.PI * 2); x.arc(30, -20, 50, 0, Math.PI * 2); x.fill(); x.fillStyle = SKYB; for (let i = 0; i < 5; i++) x.fillRect(-60 + i * 30, 30 + ((t * 120 + i * 20) % 50), 6, 18); x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.fillText('MOVIE', 0, 100) }
  if (st === 2) { x.fillStyle = '#9aa5c4'; for (let i = 0; i < 9; i++) x.fillRect(-80 + (i * 37) % 160, -60 + ((t * 40 + i * 30) % 120), 10, 10); x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.fillText('SNOWMAN', 0, 100) }
  x.restore()
}
// a match profile card with an "awkward silence" meter at zero
function meter(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); card(x, cx, cy, 340, 220, k, -0.04, '#140c30')
  x.fillStyle = PINK; x.fillRect(-170, -110, 340, 50)
  x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('FIRST DATE · LIVE', 0, -85)
  x.fillStyle = BONE; x.font = `700 22px ${MONO}`; x.fillText('AWKWARD SILENCES', 0, -26)
  x.fillStyle = INK; x.fillRect(-140, 6, 280, 40); x.fillStyle = '#2a2350'; x.fillRect(-134, 12, 268, 28)
  x.fillStyle = MINT; x.font = `800 60px ${INTER}`; x.fillText('0', 0, 80)
  x.restore()
}
const YARN = ['..PPPP..', '.PpPPpP.', 'PPPpPPPP', 'PpPPPPpP', 'PPPPpPPP', '.PPpPPP.', '..PPPP..']

const CAMEOS = [
  { sign: S, cap: 'You can talk | *to anyone.*', mood: 'sparkle', look: [1, 0], star: { x: -210 }, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), laugh = lt > 1.4
      if (k > 0.01) signChar(x, t, 'capricorn', 810, 980, 230 * k, { mood: laugh ? 'happy' : 'eyeroll', look: [-1, 0], seed: 61, glyph: false, hops: laugh ? [P.t0 + 1.9, P.t0 + 2.3] : [] })
      bubble(x, 560, 620, 'ok but what’s | your rising?', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 34, tail: 'bl' })
      if (laugh) label(x, 810, 720, 'HA! HA!', pop01(lt, 1.4, 0.3, 2.4), { size: 40, bg: MINT, rot: 0.06 })
    } },
  { sign: S, cap: 'You make boring | *hilarious.*', mood: lt => lt > 1.2 ? 'wink' : 'happy', look: [1, 0], star: { x: 0, y: -70, s: 230 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) { chairs(x, 540, 1050, pop01(t, P.t0 + 0.2, 0.35, 2)) },
    front(x, t, lt, P) {
      label(x, 300, 620, 'WAIT: 2 HRS', pop01(t, P.t0 + 0.5, 0.3, 2.4), { size: 34, bg: BONE, rot: -0.05, font: MONO, weight: 700 })
      label(x, 790, 620, 'FUN: SOMEHOW', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: YEL, rot: 0.05, font: MONO, weight: 700 })
      if (lt > 1.3) for (let i = 0; i < 4; i++) { const k = pop01(lt, 1.3 + i * 0.1, 0.3, 2); if (k > 0.01) signChar(x, t, ['taurus', 'virgo', 'libra', 'aquarius'][i], 300 + i * 160, 960, 110 * k, { mood: 'happy', seed: 62 + i, glyph: false, hops: [P.t0 + 2.0 + i * 0.05] }) }
    } },
  { sign: S, cap: 'You know a little | *about everything.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, -1], star: { x: -220 },
    front(x, t, lt, P) {
      label(x, 790, 640, 'octopuses: 3 hearts', pop01(t, P.t0 + 0.3, 0.3, 2.4), { size: 32, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 780, 'honey never spoils', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 32, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 960, 'FUN FACT #208', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 44, bg: YEL, rot: -0.05 })
    } },
  { sign: S, cap: 'You light up | *the group chat.*', mood: lt => lt > 1.3 ? 'wink' : 'happy', look: [1, 0], star: { x: -210 },
    front(x, t, lt, P) {
      phone(x, 780, 850, 1.15 * pop01(t, P.t0 + 0.2, 0.35, 2), 'GROUP CHAT', LAV, [[0.4, -60, '#9aa5c4', ['(silent for', '3 weeks)'], 30], [1.0, 90, YEL, ['GUYS. you will', 'not believe this'], 28]], lt)
      label(x, 780, 1140, 'CHAT: REVIVED', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 38, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Your curiosity | *feels like love.*', mood: 'sparkle', look: [1, 0], star: { x: -220, s: 270 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'pisces', 820, 980, 220 * k, { mood: lt > 1.3 ? 'heart' : 'happy', look: [-1, 0], seed: 66, glyph: false, tears: 1, hops: [P.t0 + 1.8] })
      bubble(x, 560, 620, 'wait. tell me | EVERYTHING.', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 36, tail: 'bl' })
      if (lt > 1.3) hearts(x, t, 820, 860, P.t0 + 1.3 * (3.1 / 2.4), { n: 5, life: 1.6, spread: 120, cell: 6, seed: 3 })
    } },
  { sign: S, cap: 'Plans change? | You *adapt in seconds.*', mood: lt => lt > 1.3 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      weather(x, t, 790, 820, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      label(x, 790, 1080, 'PLAN B. C. D.', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 42, bg: YEL, rot: -0.04 })
    } },
  { sign: S, cap: 'Two moods? | *Twice the fun.*', mood: lt => Math.floor(lt * 2.2) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.2) % 2 ? 1 : -1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      const a = Math.floor(lt * 2.2) % 2
      label(x, 790, 760, a ? 'MOOD: DANCE' : 'MOOD: DEEP TALK', pop01(t, P.t0 + 0.3, 0.3, 2.4), { size: 38, bg: a ? PINK : SKYB, rot: a ? 0.05 : -0.05, font: MONO, weight: 700 })
      label(x, 790, 940, 'BOTH: VALID', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 42, bg: MINT, rot: 0.03 })
    } },
  { sign: S, cap: 'First dates | *never feel awkward.*', mood: lt => lt > 1.3 ? 'happy' : 'sparkle', look: [1, 0], star: { x: -220 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      meter(x, 790, 860, 1.05 * pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      bubble(x, 790, 610, 'so, about | your chart…', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: S, cap: 'You make people | *feel interesting.*', mood: 'wide', look: [1, 0], star: { x: -220, s: 270 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'virgo', 810, 980, 220 * k, { mood: lt > 1.3 ? 'heart' : 'neutral', look: [-1, 0], seed: 67, glyph: false, hops: [P.t0 + 1.8] })
      drawBits(x, YARN, { P: PINK, p: '#ff4f86' }, 920, 1110, 12 * pop01(t, P.t0 + 0.4, 0.3, 2))
      bubble(x, 560, 620, 'wait, you KNIT? | teach me!', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 34, tail: 'bl' })
      label(x, 810, 760, 'VIRGO: GLOWING', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: MINT, rot: 0.05, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3a114', key: 'G', accent: YEL, solo: S, ending: 'callback',
  title: 'Gemini, your gift | *is this.*',
  cameos: CAMEOS,
  group: { cap: 'Curious. Quick. | *Never boring.*', mood: 'sparkle' },
  last: {
    text: 'Fun fact #209: | *we love you.*',
    draw(x, t, lt) {
      const k = pop01(lt, 0.3, 0.4, 2)
      if (k > 0.01) signChar(x, t, 'gemini', 540, 1080, 300 * k, { mood: lt > 1.2 ? 'heart' : 'wide', seed: 69, glyph: false, hops: [t - lt + 1.2] })
      label(x, 540, 1340, 'FUN FACT #209', pop01(lt, 0.6, 0.3, 2.4), { size: 44, bg: YEL, rot: -0.04 })
      hearts(x, t, 540, 960, t - lt + 1.1, { n: 8, life: 2.2, spread: 460, cell: 8, seed: 5 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
