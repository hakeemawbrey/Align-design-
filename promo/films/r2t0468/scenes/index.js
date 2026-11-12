// r2t0468: THE SIGNS AS… v3, SOLO film (star_talk), "Your Scorpio sibling | be like." (~46 s vertical, signs3kit social cut, music: lofi · G)
// One sign the whole way through: nine sibling moments, each the most extreme (and secretly loyal) Scorpio version.
//   0.0–3.6    "Your Scorpio sibling | *be like.*"
//   3.6–37.8   nine cards: borrowed their charger, they already know · found their diary, it's in code · who broke the vase? silent stare
//              · still mad about the juice box (from 2009) · family game night, nobody is safe · your new match? an interview
//              · their bedroom door: five locks · your ex at the door: "no." · you seemed off, they noticed first
//  37.8        "Scary? No. | *Loyal for life.*"
//  41.2        callback: "The juice box? | *Forgiven. Mostly.*" (the 2009 grudge, paid off).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', ORANGE = '#ffb34a', PAPER = '#fff4e2', WOOD = '#8a4a2e', DEEP = '#2a2350', VIOLET = '#b48cff'

// ── shared drawing helpers (this film's own copy)
// a paper card: optional title strip, lines (show = how many are visible), strike = lines crossed out
function card(x, cx, cy, k, { w = 300, h = 360, rot = 0.04, title = '', titleBg = RED, titleCol = PAPER, lines = [], size = 26, show = 99, strike = 0, bg = PAPER, ink = INK } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  let y0 = -h / 2 + 16
  if (title) {
    x.fillStyle = titleBg; x.fillRect(-w / 2, -h / 2, w, 62)
    x.fillStyle = titleCol; x.font = `800 28px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(title, 0, -h / 2 + 33)
    y0 = -h / 2 + 76
  }
  x.font = `700 ${size}px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  const lh = size * 1.7
  lines.slice(0, Math.max(0, show)).forEach((s, i) => {
    const y = y0 + lh * (i + 0.5)
    x.fillStyle = ink; x.fillText(s, -w / 2 + 24, y)
    const c = clamp(strike - i)
    if (c > 0) { x.fillStyle = RED; x.fillRect(-w / 2 + 18, y - 3, (w - 36) * c, 7) }
  })
  x.restore()
}
// a phone: header strip + chat bubbles [{ text, side: 'l'|'r', col, k }]
function phone(x, cx, cy, k, { head = '', headBg = PINK, msgs = [], rot = 0.04, w = 300, h = 470, size = 26 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16)
  x.fillStyle = DEEP; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = '#140c30'; x.fillRect(-w / 2 + 12, -h / 2 + 14, w - 24, h - 50)
  if (head) { x.fillStyle = headBg; x.fillRect(-w / 2 + 12, -h / 2 + 14, w - 24, 56); x.fillStyle = INK; x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -h / 2 + 43) }
  x.fillStyle = '#6b62a8'; x.fillRect(-28, h / 2 - 24, 56, 9)
  let y = -h / 2 + 100
  x.font = `700 ${size}px ${INTER}`; x.textBaseline = 'middle'
  for (const m of msgs) {
    const mk = m.k === undefined ? 1 : m.k
    if (mk <= 0.01) continue
    const parts = String(m.text).split('|').map(s => s.trim())
    const bw = Math.min(w - 50, Math.max(...parts.map(p => x.measureText(p).width)) + 30), bh = parts.length * size * 1.25 + 20
    const bx = m.side === 'r' ? w / 2 - 22 - bw : -w / 2 + 22
    x.save(); x.globalAlpha *= clamp(mk); x.translate(bx + bw / 2, y + bh / 2); x.scale(0.6 + 0.4 * mk, 0.6 + 0.4 * mk)
    x.fillStyle = m.col || (m.side === 'r' ? SKYB : BONE); x.fillRect(-bw / 2, -bh / 2, bw, bh)
    x.fillStyle = INK; x.textAlign = 'center'
    parts.forEach((p, i) => x.fillText(p, 0, -bh / 2 + 10 + size * 1.25 * (i + 0.5) + 1))
    x.restore()
    y += bh + 14
  }
  x.restore()
}
// little rising z's
function zzz(x, t, cx, cy, { n = 3, size = 40, col = BONE, alpha = 1 } = {}) {
  x.save(); x.font = `800 ${size}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  for (let i = 0; i < n; i++) {
    const ph = ((t * 0.6 + i / n) % 1 + 1) % 1
    x.globalAlpha = alpha * Math.sin(Math.PI * ph); x.fillStyle = col
    x.fillText('z', cx + ph * 60 + Math.sin(ph * 6 + i) * 8, cy - ph * 120); 
  }
  x.restore()
}
// paper confetti
function confetti(x, t, cx, cy, t0, { n = 20, spread = 320, h = 500 } = {}) {
  const lt = t - t0
  if (lt <= 0) return
  const COLS = [GOLD, PINK, MINT, SKYB, ORANGE, LAV]
  for (let i = 0; i < n; i++) {
    const ph = (lt * 0.55 + i * 0.137) % 1
    const px = cx + Math.sin(i * 2.71) * spread + Math.sin(t * 2 + i) * 18, py = cy - h / 2 + ph * h
    x.save(); x.translate(px, py); x.rotate(t * 3 + i); x.globalAlpha = Math.sin(Math.PI * ph)
    x.fillStyle = COLS[i % COLS.length]; x.fillRect(-9, -5, 18, 10); x.restore()
  }
}
// a birth-chart wheel: twelve coloured wedges, a ring, a few planet dots
const WHEEL_COLS = ['#f0603a', '#e9b24a', '#f2cf4a', '#3fb6f0', '#f39a3a', '#ef5c94', '#e163d6', '#e23d66', '#a35cf0', '#2fc79a', '#38c4ec', '#7c74f0']
function chartWheel(x, t, cx, cy, k, { r = 150, spin = 0 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 10, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { x.fillStyle = WHEEL_COLS[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, spin + i * Math.PI / 6, spin + (i + 1) * Math.PI / 6); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, r * 0.66, 0, Math.PI * 2); x.fill()
  x.strokeStyle = BONE; x.lineWidth = 3
  for (const [a, b] of [[0.3, 2.4], [1.1, 4.0], [2.9, 5.2], [0.3, 4.0]]) { x.beginPath(); x.moveTo(Math.cos(a) * r * 0.6, Math.sin(a) * r * 0.6); x.lineTo(Math.cos(b) * r * 0.6, Math.sin(b) * r * 0.6); x.stroke() }
  for (const a of [0.3, 1.1, 2.4, 2.9, 4.0, 5.2]) { x.fillStyle = GOLD; x.fillRect(Math.cos(a) * r * 0.6 - 7, Math.sin(a) * r * 0.6 - 7, 14, 14) }
  x.restore()
}
const S = 'scorpio', SCOL = '#e23d66'
const PLUG = [
  '.K..K.',
  '.K..K.',
  'WWWWWW',
  'WWWWWW',
  'WWWWWW',
  '..WW..',
  '..WW..',
  '..WW..',
  '..WW..',
  '...WW.',
  '....WW',
]
const PLUG_C = { K: '#9aa5c4', W: '#fff4e2' }
const DIARY = [
  'RRRRRRRRRRR.',
  'RPPPPPPPPPRY',
  'RPRRRRRRRPRY',
  'RPRPPPPPRPRY',
  'RPRRRRRRRPRY',
  'RPPPPPPPPPRY',
  'RPPPPPPPPPRY',
  'RPPPPPPPPPRY',
  'RRRRRRRRRRR.',
]
const DIARY_C = { R: '#7a2050', P: '#b33a6e', Y: GOLD }
const VASE = [
  '...BB..BB...',
  '...BBB.BB...',
  '..BBBB..BB..',
  '.BBWBB.BBBB.',
  '.BBWBB..BBB.',
  '..BBB...BB..',
  '.............',
  'B.BB..BB..BB',
]
const VASE_C = { B: '#3fb6f0', W: '#cfe9ff' }
const JUICE = [
  '......K..',
  '......K..',
  '.....K...',
  '.OOOOOOO.',
  '.OYYYYYO.',
  '.OYGGGYO.',
  '.OYGGGYO.',
  '.OYYYYYO.',
  '.OOOOOOO.',
  '.OOOOOOO.',
]
const JUICE_C = { K: '#fff4e2', O: '#ff8fb1', Y: '#fff4e2', G: ORANGE }
const DICE = [
  'WWWWWWW',
  'WKWWWKW',
  'WWWWWWW',
  'WWWKWWW',
  'WWWWWWW',
  'WKWWWKW',
  'WWWWWWW',
]
const LAMP = [
  'KKKKKKKKK',
  '.KYYYYYK.',
  '..KYYYK..',
  '....K....',
  '....K....',
  '....K....',
  '..KKKKK..',
]
const LAMP_C = { K: '#2a2350', Y: GOLD }
const MUG = [
  '.SS..SS..',
  '..SS..SS.',
  'WWWWWWW..',
  'WBBBBBWWW',
  'WBBHBBW.W',
  'WBHHHBW.W',
  'WBBHBBWWW',
  'WBBBBBW..',
  '.WWWWW...',
]
const MUG_C = { S: '#d8dbe8', W: '#fff4e2', B: '#8a4a2e', H: PINK }

function door(x, cx, cy, k, locks) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-106, -196, 212, 372)
  x.fillStyle = '#5b2e1a'; x.fillRect(-98, -188, 196, 356)
  x.fillStyle = '#8a4a2e'; x.fillRect(-80, -170, 160, 140); x.fillRect(-80, -10, 160, 160)
  for (let i = 0; i < locks; i++) { x.fillStyle = INK; x.fillRect(46, -150 + i * 62, 44, 36); x.fillStyle = GOLD; x.fillRect(50, -146 + i * 62, 36, 28); x.fillStyle = INK; x.fillRect(64, -138 + i * 62, 8, 12) }
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Borrowed their charger? | *They already know.*', mood: 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, PLUG, PLUG_C, 800, 880, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.2 })
      label(x, 790, 650, 'LAST SEEN: YOUR ROOM', pop01(t, P.t0 + 0.7, 0.3, 2), { size: 28, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 380, 600, 'hm.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 48, tail: 'bc' })
      label(x, 790, 1110, 'RETURN IT. TODAY.', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 30, bg: RED, color: PAPER, rot: 0.04 })
    } },
  { sign: S, cap: 'Found their diary? | It’s *in code.*', mood: lt => lt > 1.3 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      card(x, 790, 860, k, { w: 320, h: 330, title: 'DEAR DIARY', titleBg: SCOL, lines: ['♏︎⊗ ◐▲ ⌘◇◇', '▲⊗ ✦◐ ⌘▲', '◇◇◇ ⊗♏︎ ◐', '— end —'], size: 30, show: Math.floor(Math.max(0, lt - 0.4) / 0.3) + 1 })
      label(x, 790, 1100, 'GOOD LUCK.', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: LAV, rot: -0.04 })
    } },
  { sign: S, cap: 'Who broke the vase? | Scorpio *just stares.*', mood: 'squint', look: [0, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, VASE, VASE_C, 790, 1020, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 680, 'WHO DID THIS?', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 38, col: PINK, tail: 'bc' })
      bubble(x, 380, 600, '…', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 56, tail: 'bc' })
      label(x, 790, 860, 'WILL NEVER SNITCH', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04 })
    } },
  { sign: S, cap: 'Still mad about | *the juice box.* From 2009.', mood: 'squint', look: [1, 0], star: { x: -170 }, squash: lt => 0.03 * Math.sin(lt * 20),
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, JUICE, JUICE_C, 790, 880, 27 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.06 })
      label(x, 790, 640, 'EVIDENCE A', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 34, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1120, 'NEVER FORGET', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: RED, color: PAPER, rot: -0.05 })
    } },
  { sign: S, cap: 'Family game night? | *Nobody is safe.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -170 }, hops: [1.5],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, DICE, { W: PAPER, K: INK }, 740, 900, 20 * k, { rot: t * 2 })
      drawBits(x, DICE, { W: PAPER, K: INK }, 860, 940, 20 * k, { rot: -t * 1.6 })
      label(x, 800, 660, 'ROUND 9 · STILL GOING', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 28, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 380, 600, 'I don’t | do “for fun.”', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 36, tail: 'bc' })
      label(x, 800, 1110, 'WINNER: GUESS WHO', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04 })
    } },
  { sign: S, cap: 'Your new match? | Scorpio *interviews them.*', mood: 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, LAMP, LAMP_C, 800, 640, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const k = pop01(t, P.t0 + 0.4, 0.35, 2)
      if (k > 0.3) { x.save(); x.globalAlpha = 0.18; x.fillStyle = '#fff1b0'; x.beginPath(); x.moveTo(760, 680); x.lineTo(840, 680); x.lineTo(930, 1080); x.lineTo(670, 1080); x.fill(); x.restore() }
      if (k > 0.01) signChar(x, t, 'gemini', 800, 960, 210 * k, { mood: lt > 1.2 ? 'wide' : 'happy', look: [-1, 0], seed: 51, glyph: false })
      label(x, 800, 760, 'QUESTION 1 OF 40', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 28, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 380, 600, 'your rising | sign. now.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 36, tail: 'bc' })
    } },
  { sign: S, cap: 'Their bedroom door? | *Five locks.*', mood: lt => lt > 1.6 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const n = Math.min(5, Math.floor(Math.max(0, lt - 0.4) / 0.22) + 1)
      door(x, 790, 860, pop01(t, P.t0 + 0.15, 0.35, 2), n)
      label(x, 790, 1120, 'KNOCK? DENIED.', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: RED, color: PAPER, rot: -0.04 })
    } },
  { sign: S, cap: 'Your ex at the door? | Scorpio *answers it.*', mood: 'squint', look: [-1, 0], star: { x: 160 }, hops: [1.2],
    back(x, t, lt, P) { door(x, 330, 860, pop01(t, P.t0 + 0.15, 0.35, 2), 0) },
    front(x, t, lt, P) {
      label(x, 330, 620, 'KNOCK KNOCK', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 34, bg: BONE, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 720, 620, 'no.', pop01(t, P.t0 + 1.1, 0.25, 2.4), { size: 60, tail: 'bc' })
      label(x, 700, 1120, 'DOOR: CLOSED. GENTLY.', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 28, bg: GOLD, rot: 0.04 })
    } },
  { sign: S, cap: 'You seemed off? | *They noticed first.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, MUG, MUG_C, 790, 900, 22 * pop01(t, P.t0 + 0.3, 0.35, 2))
      bubble(x, 380, 600, 'sit. talk.', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 42, tail: 'bc' })
      label(x, 790, 650, 'COCOA: MADE', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 790, 800, P.t0 + 1.4, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2t0468', key: 'G', accent: SCOL, solo: S, ending: 'callback',
  title: 'Your Scorpio sibling | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Scary? No. | *Loyal for life.*', mood: 'heart' },
  last: {
    text: 'The juice box? | *Forgiven. Mostly.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.3, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, S, 420, 1060, 280 * k, { mood: lt > 1.4 ? 'happy' : 'squint', look: [1, 0], seed: 12, hops: [t0 + 1.4] })
      drawBits(x, JUICE, JUICE_C, 730, 1040, 26 * pop01(t, t0 + 0.7, 0.35, 2), { rot: 0.1 })
      label(x, 700, 1250, 'STILL WATCHING IT', pop01(t, t0 + 1.6, 0.3, 2.4), { size: 38, bg: GOLD, rot: -0.04 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
