// v3a103: zodiac.advice444 (star_advice), ADVICE SOLO, "Signs you're | a healed Libra." (~42 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole way through (makeFilm solo mode, 9 cards): the people-pleaser learns to please themself too.
//   0.0–3.6    "Signs you're | *a healed Libra.*"
//   3.6–37.8   nine cards: picked dinner in under a minute · said no and nobody exploded · one outfit, first try
//              · disagreed out loud (and the pal nodded) · a Friday alone with a book · stopped apologising to chairs
//              · a playlist that's only your taste · reads their chart for themself · group chat muted, guilt-free
//  37.8        ending (group): "Balanced. | *Starting with you.*" (the big Libra, heart eyes)
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const S = 'libra'
const WOOD = '#c98f2a', RED = '#e23d4e', ROSE = '#ff9ccf', WHITE = '#fff4e2'

// ── shared little props for this film
// a phone: a coloured header strip and an optional message bubble that pops in
function phone(x, cx, cy, k, head, msg, sent, { headCol = MINT, msgCol = ROSE, rot = 0.05, msgSize = 30 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -182, 256, 380)
  x.fillStyle = INK; x.fillRect(-134, -194, 268, 388)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -184, 248, 368)
  x.fillStyle = '#140c30'; x.fillRect(-112, -160, 224, 320)
  x.fillStyle = headCol; x.fillRect(-100, -146, 200, 46)
  x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -122)
  if (msg && sent > 0.01) {
    x.save(); x.translate(4, -6); x.scale(sent, sent)
    const lines = msg.split('|').map(s => s.trim())
    const h = lines.length * msgSize * 1.25 + 30
    x.fillStyle = msgCol; x.fillRect(-96, -h / 2, 192, h)
    x.fillStyle = INK; x.font = `800 ${msgSize}px ${INTER}`
    lines.forEach((l, i) => x.fillText(l, 0, -h / 2 + 15 + msgSize * 1.25 * (i + 0.5)))
    x.restore()
  }
  x.restore()
}
// a tiny pal star with a placard on a stick
function placard(x, t, id, cx, cy, size, text, k, { col = GOLD, mood = 'happy', seed = 31, tears = 0, look } = {}) {
  if (k <= 0.01) return
  signChar(x, t, id, cx, cy, size * k, { mood, seed, glyph: false, tears, look })
  x.fillStyle = INK; x.fillRect(cx + size * 0.42 - 5, cy - size * 1.05, 10, size * 0.9)
  label(x, cx + size * 0.42, cy - size * 1.1, text, k, { size: 28, bg: col, rot: -0.04 })
}
// a little table top line
function table(x, cx, cy, w) { x.fillStyle = INK; x.fillRect(cx - w / 2, cy, w, 22); x.fillStyle = WOOD; x.fillRect(cx - w / 2 + 4, cy + 4, w - 8, 14) }

const SHIRT = ['.MM...MM.', 'MMMMMMMMM', 'MMMMWMMMM', '.MMMMMMM.', '..MMMMM..', '..MMMMM..', '..MMMMM..']
const SHIRT_C = { M: MINT, W: '#fff' }
const BOOK = ['RRRRR.BBBBB', 'RWWWWRWWWWB', 'RWKKWRWKKWB', 'RWWWWRWWWWB', 'RWKKWRWKKWB', 'RWWWWRWWWWB', 'RRRRRRBBBBB']
const BOOK_C = { R: ROSE, B: LAV, W: WHITE, K: '#9a8fb5' }
const PHONES = ['.KKKKKKKK.', 'K........K', 'K........K', 'MM......MM', 'MM......MM', 'MM......MM']
const PHONES_C = { K: INK, M: LAV }
const CHAIR = ['W....', 'W....', 'W....', 'WWWWW', 'W...W', 'W...W']
const CHAIR_C = { W: WOOD }
// a little birth chart wheel
function chart(x, cx, cy, r, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, 7); x.fill()
  x.fillStyle = '#21184a'; x.beginPath(); x.arc(0, 0, r, 0, 7); x.fill()
  x.strokeStyle = GOLD; x.lineWidth = 4; x.beginPath(); x.arc(0, 0, r * 0.72, 0, 7); x.stroke()
  x.strokeStyle = 'rgba(239,230,214,0.5)'; x.lineWidth = 2
  for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6 + t * 0.2; x.beginPath(); x.moveTo(Math.cos(a) * r * 0.72, Math.sin(a) * r * 0.72); x.lineTo(Math.cos(a) * r, Math.sin(a) * r); x.stroke() }
  x.strokeStyle = PINK; x.lineWidth = 3; x.beginPath(); x.moveTo(-r * 0.5, -r * 0.3); x.lineTo(r * 0.45, r * 0.35); x.lineTo(r * 0.1, -r * 0.55); x.closePath(); x.stroke()
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'You picked dinner | *in one minute.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -210 }, hops: [1.4],
    front(x, t, lt, P) {
      bubble(x, 780, 780, 'noodles.', pop01(t, P.t0 + 0.7, 0.25, 2.4), { size: 52, tail: 'bl' })
      label(x, 780, 960, 'DECIDED IN 0:58', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      label(x, 780, 1060, 'NO POLL NEEDED', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 28, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You said no. | *Nobody exploded.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: { x: -220 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'sagittarius', 810, 1020, 170 * k, { mood: lt > 1.3 ? 'happy' : 'neutral', look: [-1, 0], seed: 61, glyph: false, hops: [P.t0 + 1.6] })
      bubble(x, 420, 640, 'no thanks!', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 38, tail: 'bc' })
      bubble(x, 800, 720, 'cool!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, col: MINT, tail: 'bc' })
    } },
  { sign: S, cap: 'One outfit. | *First try.*', mood: lt => lt > 1.2 ? 'wink' : 'happy', look: [1, 0], star: { x: -200 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      x.fillStyle = INK; x.fillRect(640, 700, 300, 14); x.fillRect(784, 700, 12, 40)
      drawBits(x, SHIRT, SHIRT_C, 790, 840, 24 * k)
      label(x, 790, 1080, 'TRIED ON: 1', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You disagree | *out loud* now.', mood: lt => lt > 1.5 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'capricorn', 810, 1020, 170 * k, { mood: lt > 1.5 ? 'happy' : 'squint', look: [-1, 0], seed: 62, glyph: false, hops: [P.t0 + 1.7, P.t0 + 2.0] })
      bubble(x, 560, 640, 'hmm, I see it | differently.', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 34, tail: 'bl' })
      label(x, 810, 820, '*NODS*', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.06, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'A Friday alone? | *Kind of perfect.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0.5], star: { x: -210 },
    front(x, t, lt, P) {
      drawBits(x, BOOK, BOOK_C, 780, 960, 20 * pop01(t, P.t0 + 0.3, 0.35, 2))
      label(x, 780, 760, 'BOOK CLUB: ME', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 780, 960, P.t0 + 1.0, 6, 170, 0.5)
    } },
  { sign: S, cap: 'You stopped | *apologising to chairs.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: { x: -150 }, squash: lt => lt > 0.5 && lt < 0.8 ? 0.12 : 0,
    front(x, t, lt, P) {
      drawBits(x, CHAIR, CHAIR_C, 720, 1010, 30 * pop01(t, P.t0 + 0.1, 0.3, 2))
      bubble(x, 460, 640, 'sorr— | oh. a chair.', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 36, tail: 'bc' })
      label(x, 760, 1150, 'SORRYS SAVED: 1', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 28, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Your playlist? | *Just your taste.*', mood: 'sparkle', look: [1, -0.5], star: { x: -200 }, hops: [0.8, 1.4, 2.0],
    front(x, t, lt, P, F) {
      drawBits(x, PHONES, PHONES_C, F.x, F.top + 30, 16 * pop01(t, P.t0 + 0.3, 0.3, 2))
      label(x, 780, 820, 'CROWD-PLEASERS: 0', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 28, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      label(x, 780, 920, 'VIBES: ALL MINE', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 28, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You read your chart | *for you* now.', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -220 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      chart(x, 780, 900, 150, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      label(x, 780, 1110, 'NOT FOR APPROVAL', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Group chat on mute. | *Zero guilt.*', mood: lt => lt > 1.4 ? 'sleepy' : 'happy', look: [1, 0], star: { x: -210 },
    front(x, t, lt, P) {
      phone(x, 780, 830, pop01(t, P.t0 + 0.2, 0.3, 2), 'GROUP CHAT · 99+', 'MUTED', pop01(t, P.t0 + 0.9, 0.3, 2.4), { headCol: PINK, msgCol: MINT, msgSize: 40 })
      label(x, 780, 1110, 'PEACE: RESTORED', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3a103', key: 'F', accent: ROSE, solo: S, ending: 'group',
  title: 'Signs you’re | *a healed Libra.*',
  cameos: CAMEOS,
  group: { cap: 'Balanced. | *Starting with you.*', mood: 'heart' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
