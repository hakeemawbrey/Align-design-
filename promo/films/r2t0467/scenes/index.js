// r2t0467: THE SIGNS AS… v3, SOLO film (star_talk), "Your Taurus sibling | be like." (~43 s vertical, signs3kit social cut, music: lofi · E)
// One sign the whole way through: nine sibling moments, each the most extreme (and lovable) Taurus version.
//   0.0–3.6    "Your Taurus sibling | *be like.*"
//   3.6–37.8   nine cards: your labelled leftovers, gone · the good blanket, legally theirs · road-trip snacks, rationed (for you)
//              · your couch seat, annexed (day 3) · visiting mom's, leaves with the fridge · the thermostat: DO NOT TOUCH
//              · bought you a candle, burns it at theirs · met your date, checked their chart · bad day? they cook for you
//  37.8        group ending: "Snacky, stubborn, | *yours for life.*" Big heart eyes.
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
const S = 'taurus', TCOL = '#e9b24a'
const BOXF = [
  'WWWWWWWWWWWWW',
  'W...........W',
  'WWWWWWWWWWWWW',
  '.WWWWWWWWWWW.',
  '.WWWWWWWWWWW.',
  '..WWWWWWWWW..',
  '..WWWWWWWWW..',
]
const BOXF_C = { W: '#fff4e2' }
const BAG = [
  '..KKKKKKKKK..',
  '.OOOOOOOOOOO.',
  'OOOOOOOOOOOOO',
  'OOYYYYYYYYYOO',
  'OOYRRYYYRRYOO',
  'OOYYYYYYYYYOO',
  'OOOOOOOOOOOOO',
  'OOOOOOOOOOOOO',
  '.OOOOOOOOOOO.',
]
const BAG_C = { K: '#2a2350', O: ORANGE, Y: GOLD, R: RED }
const LOCK = [
  '.KKKK.',
  'K....K',
  'K....K',
  'YYYYYY',
  'YYKKYY',
  'YYKKYY',
  'YYYYYY',
]
const LOCK_C = { K: '#2a2350', Y: GOLD }
const COUCH = [
  '.PPPPPPPPPPPPPPPP.',
  'PPPPPPPPPPPPPPPPPP',
  'PPPPPPPPPPPPPPPPPP',
  'AACCCCCCCCCCCCCCAA',
  'AACCCCCCCCCCCCCCAA',
  'AAAAAAAAAAAAAAAAAA',
  '.W..............W.',
]
const COUCH_C = { P: '#7a5cc8', A: '#5b42a0', C: '#9a7ee0', W: '#2a2350' }
const TUB = [
  'LLLLLLLLLL',
  'TTTTTTTTTT',
  'TFFFFFFFFT',
  'TFFFFFFFFT',
  'TTTTTTTTTT',
]
const CANDLE = [
  '....F....',
  '...FYF...',
  '...FYF...',
  '....K....',
  '.WWWWWWW.',
  '.WWWWWWW.',
  '.WPPPPPW.',
  '.WPPPPPW.',
  '.WWWWWWW.',
  '.WWWWWWW.',
]
const CANDLE_C = { F: ORANGE, Y: GOLD, K: INK, W: '#fff4e2', P: PINK }
const POT = [
  'KKKKKKKKKKK',
  'KRRRRRRRRRK',
  'GRRRRRRRRRG',
  '.RRRRRRRRR.',
  '.RRRRRRRRR.',
  '..RRRRRRR..',
]
const POT_C = { S: '#d8dbe8', K: '#2a2350', R: RED, G: '#2a2350' }

// a wall thermostat dial
function thermostat(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-104, -96, 220, 210)
  x.fillStyle = INK; x.fillRect(-114, -110, 228, 220)
  x.fillStyle = BONE; x.fillRect(-106, -102, 212, 204)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 78, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#2a2350'; x.beginPath(); x.arc(0, 0, 70, 0, Math.PI * 2); x.fill()
  x.fillStyle = MINT; x.font = `700 52px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('21°', 0, 4)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Your labelled leftovers? | *Gone. Delicious.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, BOXF, BOXF_C, 790, 930, 22 * k, { rot: 0.05 })
      label(x, 790, 950, 'YOURS. DON’T.', k, { size: 28, bg: GOLD, rot: 0.05 })
      label(x, 790, 1110, 'CONTENTS: 0', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 32, bg: RED, color: PAPER, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 390, 600, 'it said “don’t”? | huh.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, tail: 'bc' })
    } },
  { sign: S, cap: 'The good blanket? | *Legally theirs.*', mood: lt => lt > 1.0 ? 'sleepy' : 'happy', star: { x: -150 },
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(F.x, F.cy + 60); x.rotate(-0.05); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-190, -60, 380, 170)
        x.fillStyle = '#ff8fb1'; x.fillRect(-182, -52, 364, 154)
        x.fillStyle = '#ffb8cf'; for (let i = 0; i < 6; i++) for (let j = 0; j < 3; j++) if ((i + j) % 2) x.fillRect(-182 + i * 61, -52 + j * 52, 61, 51)
        x.restore()
      }
      card(x, 790, 820, pop01(t, P.t0 + 0.7, 0.35, 2), { w: 300, h: 240, title: 'DEED OF OWNERSHIP', titleBg: TCOL, titleCol: INK, lines: ['item: blanket', 'owner: taurus', 'since: forever'], size: 26, rot: 0.06 })
      label(x, 790, 1090, 'NO RETURNS', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: RED, color: PAPER, rot: -0.05 })
    } },
  { sign: S, cap: 'Road-trip snacks? | *Rationed.* For you.', mood: lt => lt > 1.2 ? 'squint' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, BAG, BAG_C, 790, 900, 22 * k, { rot: 0.04 })
      drawBits(x, LOCK, LOCK_C, 790, 790, 14 * pop01(t, P.t0 + 0.9, 0.25, 2.4))
      label(x, 790, 640, 'YOUR SHARE: 1 CHIP', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 380, 600, 'pace yourself.', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 38, tail: 'bc' })
    } },
  { sign: S, cap: 'Your spot on the couch? | *Annexed.*', mood: 'sleepy', star: { x: -40, y: 10 },
    back(x, t, lt, P) { drawBits(x, COUCH, COUCH_C, 540, 990, 32 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      const d = 1 + Math.floor(clamp((lt - 0.4) / 1.4) * 2)
      label(x, 790, 640, `DAY ${d}`, pop01(t, P.t0 + 0.4, 0.3, 2), { size: 44, bg: LAV, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 300, 640, 'can I sit?', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 36, col: SKYB, tail: 'br' })
      label(x, 540, 1170, 'TERRITORY: TAURUS', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.03 })
    } },
  { sign: S, cap: 'Visiting mom’s? | Leaves with *the fridge.*', mood: lt => lt > 1.4 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.5],
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.3) * 6)
      const COLS = [{ L: SKYB, T: '#cfe9ff', F: ORANGE }, { L: PINK, T: '#ffe0ea', F: '#5fd068' }, { L: MINT, T: '#d8ffe9', F: RED }]
      for (let i = 0; i < n; i++) drawBits(x, TUB, COLS[i % 3], 790 + (i % 2 ? 14 : -12), 1110 - i * 66, 16 * pop01(t, P.t0 + 0.3 + i * 0.2, 0.22, 2.2), { rot: i % 2 ? 0.05 : -0.05 })
      label(x, 790, 640, 'MOM PACKED IT', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.04 })
    } },
  { sign: S, cap: 'Touched the thermostat? | *Bold move.*', mood: lt => lt > 1.0 ? 'squint' : 'neutral', look: [1, 0], star: { x: -170 }, squash: lt => lt > 1.0 && lt < 1.3 ? 0.08 : 0, hops: [1.0],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      thermostat(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      label(x, 790, 680, 'DO NOT TOUCH', pop01(t, P.t0 + 0.9, 0.25, 2.6), { size: 40, bg: RED, color: PAPER, rot: -0.06 })
      bubble(x, 790, 1080, 'I saw that.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: S, cap: 'Bought you a candle. | *Burns it at theirs.*', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, CANDLE, CANDLE_C, 790, 900, 24 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.02 })
      label(x, 790, 1110, 'HAPPY BDAY (MINE)', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 30, bg: PINK, rot: -0.04 })
      bubble(x, 390, 600, 'smells | amazing here', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, tail: 'bc' })
      notes(x, t, 790, 760, { n: 3, cell: 6, col: GOLD, seed: 4, alpha: clamp(lt - 1.0) })
    } },
  { sign: S, cap: 'Met your date. | *Checked their chart.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 }, hops: [1.6],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      chartWheel(x, t, 790, 860, k * 0.9, { r: 150 })
      if (k > 0.5) signChar(x, t, 'capricorn', 790, 860, 120 * k, { mood: 'neutral', seed: 33, glyph: false, glow: 0.5 })
      label(x, 790, 640, 'DATE: ♑︎ CAPRICORN', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1080, 'TAURUS APPROVES ✓', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.04 })
    } },
  { sign: S, cap: 'Bad day? | They *cook for you.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sparkles(x, t, 790, 760, P.t0 + 0.8, 5, 90, 0.2, [BONE, '#d8dbe8']); drawBits(x, POT, POT_C, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 640, 'SECRET FAMILY PASTA', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 28, bg: GOLD, rot: 0.04 })
      bubble(x, 790, 1100, 'sit. eat.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      hearts(x, t, 790, 800, P.t0 + 1.4, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 2 })
    } },
]

const F = makeFilm({
  id: 'r2t0467', key: 'E', accent: GOLD, solo: S, ending: 'group',
  title: 'Your Taurus sibling | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Snacky, stubborn, | *yours for life.*', mood: 'heart' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
