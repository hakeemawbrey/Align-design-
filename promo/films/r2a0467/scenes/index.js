// r2a0467: THE SIGNS AS… v3, ADVICE SOLO (star_advice), "Aquarius, you're not | too much." (~46 s vertical, signs3kit social cut, music: lofi · F)
// Nine gentle truths for an Aquarius, each a relatable "too much" moment with one light visual gag and a warm reframe.
//   0.0–3.6    "Aquarius, you’re not | *too much.*"
//   3.6–37.8   nine cards: forty minutes on black holes (someone loved it) · the "weird" idea, give it ten years · the cape at brunch
//              · vanishing to recharge, friends wait · six snails rescued, soft heart · 3 a.m. fun facts, free education
//              · "too niche" for dating, the match exists · robot mode off, feelings on · your people are out there
//  37.8        "Not too much. | *Just enough.*"
//  41.2        callback: "The snails? | *Wrote back.*" (the six rescued snails, paid off).
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
const S = 'aquarius', ACOL = '#38c4ec'
const SNAIL = [
  '.....SSSS...',
  '....SsssSS..',
  '...SssSSsS..',
  '...SsSssSS..',
  'K..SSssSS...',
  '.K.BSSSSB...',
  '.BBBBBBBBBBB',
]
const SNAIL_C = { S: '#d9774a', s: '#f2a86a', K: '#2a2350', B: '#c9e98a' }
const BULB = [
  '...YYYYY...',
  '..YYYYYYY..',
  '.YYYWYYYYY.',
  '.YYWYYYYYY.',
  '.YYYYYYYYY.',
  '..YYYYYYY..',
  '...YYYYY...',
  '....GGG....',
  '....ggg....',
  '....GGG....',
]
const BULB_C = { Y: '#fff1b0', W: '#ffffff', G: '#9aa5c4', g: '#6b62a8' }
const PLANET = [
  '.....PPPP.....',
  '...PPPPPPPP...',
  'RR.PPpPPPPP.RR',
  '.RRRRRRRRRRRR.',
  '..PPPPPPpPPP..',
  '...PPPPPPPP...',
  '.....PPPP.....',
]
const PLANET_C = { P: '#ffb34a', p: '#d9774a', R: '#c9a6ff' }
const MASK = [
  'GGGGGGGGGGG',
  'GKKKGGGKKKG',
  'GKRKGGGKRKG',
  'GKKKGGGKKKG',
  'GGGGGGGGGGG',
  'GGKKKKKKKGG',
  'GGGGGGGGGGG',
]
const MASK_C = { G: '#9aa5c4', K: '#2a2350', R: RED }

function cape(x, t, F, k) {
  if (k <= 0.01) return
  const flap = Math.sin(t * 5) * 18
  x.save(); x.globalAlpha = clamp(k)
  x.fillStyle = INK; x.beginPath(); x.moveTo(F.x - 70, F.cy - 40); x.lineTo(F.x + 70, F.cy - 40); x.lineTo(F.x + 170 + flap, F.cy + 150); x.lineTo(F.x - 150 + flap * 0.5, F.cy + 160); x.closePath(); x.fill()
  x.fillStyle = RED; x.beginPath(); x.moveTo(F.x - 62, F.cy - 34); x.lineTo(F.x + 62, F.cy - 34); x.lineTo(F.x + 158 + flap, F.cy + 142); x.lineTo(F.x - 140 + flap * 0.5, F.cy + 150); x.closePath(); x.fill()
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Forty minutes on black holes? | *Someone loved it.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.8],
    front(x, t, lt, P) {
      drawBits(x, PLANET, PLANET_C, 400, 620, 16 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.15 })
      const k = pop01(t, P.t0 + 0.4, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 790, 950, 220 * k, { mood: lt > 1.3 ? 'heart' : 'sparkle', look: [-1, 0], seed: 21, glyph: false, hops: [P.t0 + 1.4] })
      bubble(x, 790, 660, 'tell me MORE', pop01(t, P.t0 + 1.35, 0.25, 2.2), { size: 38, col: PINK, tail: 'bc' })
      hearts(x, t, 790, 840, P.t0 + 1.5, { n: 4, life: 1.4, spread: 160, cell: 7, seed: 3 })
    } },
  { sign: S, cap: 'Your “weird” idea? | Give it *ten years.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.3) { x.save(); x.globalAlpha = 0.35 + 0.2 * Math.sin(t * 6); x.fillStyle = '#fff1b0'; x.beginPath(); x.arc(790, 820, 150, 0, Math.PI * 2); x.fill(); x.restore() }
      drawBits(x, BULB, BULB_C, 790, 840, 24 * k)
      label(x, 790, 620, 'IDEA #212', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1100, 'STATUS: AHEAD OF TIME', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 28, bg: MINT, rot: 0.04 })
    } },
  { sign: S, cap: 'Wore a cape to brunch? | *Iconic, honestly.*', mood: lt => lt > 1.0 ? 'wink' : 'happy', look: [1, 0], star: { x: -150 }, hops: [1.1],
    back(x, t, lt, P, F) { cape(x, t, F, pop01(t, P.t0 + 0.3, 0.35, 2)) },
    front(x, t, lt, P) {
      label(x, 790, 680, 'DRESS CODE: CASUAL', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 28, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 900, 'love the cape!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, col: PINK, tail: 'bl' })
      label(x, 790, 1090, 'BEST DRESSED', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04 })
    } },
  { sign: S, cap: 'Need to vanish a bit? | *Friends will wait.*', mood: 'sleepy', star: { x: -170 },
    front(x, t, lt, P) {
      label(x, 400, 620, 'RECHARGING…', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 34, bg: LAV, rot: -0.05, font: MONO, weight: 700 })
      phone(x, 790, 870, pop01(t, P.t0 + 0.4, 0.35, 2), { head: 'FRIENDS', headBg: MINT, msgs: [
        { text: 'take your | time ♡', side: 'l', col: BONE, k: pop01(t, P.t0 + 0.9, 0.25, 2) },
        { text: 'here when | you’re back', side: 'l', col: PINK, k: pop01(t, P.t0 + 1.4, 0.25, 2) },
      ] })
    } },
  { sign: S, cap: 'Rescued six snails today? | *Soft heart. Keep it.*', mood: lt => lt > 1.5 ? 'heart' : 'happy', look: [1, 1], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const n = Math.min(6, Math.floor(Math.max(0, lt - 0.3) / 0.2) + 1)
      for (let i = 0; i < n; i++) drawBits(x, SNAIL, SNAIL_C, 680 + (i % 3) * 110, 900 + Math.floor(i / 3) * 110, 9 * pop01(t, P.t0 + 0.3 + i * 0.2, 0.25, 2.2))
      label(x, 790, 680, `SNAILS SAVED: ${n}`, pop01(t, P.t0 + 0.4, 0.3, 2), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 380, 600, 'safe now, | buddy.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 36, tail: 'bc' })
    } },
  { sign: S, cap: '3 a.m. fun facts? | *Free education.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      phone(x, 790, 870, pop01(t, P.t0 + 0.2, 0.35, 2), { head: '3:07 AM', headBg: LAV, msgs: [
        { text: 'fun fact:', side: 'r', col: SKYB, k: pop01(t, P.t0 + 0.5, 0.25, 2) },
        { text: 'octopuses have | three hearts', side: 'r', col: SKYB, k: pop01(t, P.t0 + 0.9, 0.25, 2) },
        { text: 'wow. 10/10', side: 'l', col: BONE, k: pop01(t, P.t0 + 1.6, 0.25, 2) },
      ] })
      label(x, 400, 620, 'CLASS IS IN', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.05 })
    } },
  { sign: S, cap: 'Too niche for dating? | *Your match exists.*', mood: lt => lt > 1.5 ? 'heart' : 'squint', look: [1, 0], star: { x: -170 }, hops: [1.6],
    front(x, t, lt, P) {
      card(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 320, h: 340, title: '♒︎ INTO:', titleBg: ACOL, titleCol: INK, lines: ['comets', 'frogs', 'old synths', 'aliens (nice ones)'], size: 28, show: Math.floor(Math.max(0, lt - 0.3) / 0.25) + 1 })
      label(x, 790, 1100, '✦ MATCH FOUND ✦', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 790, 760, P.t0 + 1.6, { n: 5, life: 1.6, spread: 220, cell: 7, seed: 6 })
    } },
  { sign: S, cap: 'Acting like a robot? | *Feelings suit you.*', mood: lt => lt > 1.1 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 }, hops: [1.1],
    front(x, t, lt, P, F) {
      const off = ease.inCubic(prog(lt, 0.9, 1.4))
      drawBits(x, MASK, MASK_C, F.x + off * 160, F.cy - 10 + off * 260, 22 * pop01(t, P.t0 + 0.15, 0.25, 2), { rot: off * 0.8, alpha: 1 - prog(lt, 1.3, 1.5) })
      label(x, 790, 760, lt > 1.1 ? 'FEELINGS: ON' : 'ROBOT MODE', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 40, bg: lt > 1.1 ? PINK : '#9aa5c4', rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, F.x, F.cy - 60, P.t0 + 1.2, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 2 })
      bubble(x, 790, 980, 'oh. hi, | feelings.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: S, cap: 'Feel like the odd one out? | *Your people exist.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -170 }, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const ids = ['gemini', 'sagittarius', 'aries']
      ids.forEach((id, i) => { const k = pop01(t, P.t0 + 0.5 + i * 0.25, 0.35, 2); if (k > 0.01) signChar(x, t, id, 680 + i * 110, 900 - (i % 2) * 60, 150 * k, { mood: i === 1 ? 'wink' : 'happy', look: [-1, 0], seed: 40 + i, glyph: false, hops: [P.t0 + 1.3 + i * 0.1] }) })
      label(x, 790, 660, 'YOUR PEOPLE', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 36, bg: GOLD, rot: -0.04 })
      bubble(x, 790, 1100, 'saved you a seat!', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, col: MINT, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2a0467', key: 'F', accent: SKYB, solo: S, ending: 'callback',
  title: 'Aquarius, you’re not | *too much.*',
  cameos: CAMEOS,
  group: { cap: 'Not too much. | *Just enough.*', mood: 'sparkle' },
  last: {
    text: 'The snails? | *Wrote back.*',
    draw(x, t, lt) {
      const t0 = t - lt
      for (let i = 0; i < 6; i++) drawBits(x, SNAIL, SNAIL_C, 265 + i * 110, 1240, 12 * pop01(t, t0 + 0.4 + i * 0.12, 0.25, 2.2))
      card(x, 540, 950, pop01(t, t0 + 0.9, 0.35, 2), { w: 360, h: 220, title: 'THANK YOU ♡', titleBg: PINK, titleCol: INK, lines: ['for the lift.', '– the snails'], size: 32, rot: -0.04 })
      hearts(x, t, 540, 780, t0 + 1.4, { n: 7, life: 2.0, spread: 600, cell: 8, seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
