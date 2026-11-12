// r2t0466: THE SIGNS AS… v3, SOLO film (star_talk), "Sagittarians telling | the truth." (~51 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole way through: nine situations where Sagittarius simply cannot not say it.
//   0.0–3.6    "Sagittarians telling | *the truth.*"  One big Sagittarius pops in.
//   3.6–37.8   nine cards: "how do I look?" answered · told you about your own surprise party · spoiled the book on page one
//              · read your birth chart: "whew" · the lie detector fell asleep · kept a secret four seconds
//              · "this soup is bad", three bowls · biggest weakness: mornings (and your tie), hired · dating profile, brutally honest
//  37.8        "Zero filter. | *All heart.*"
//  41.0        LESSON UNLOCKED: "Their truth comes | *with a hug.*"  STATUS: TRUSTED
//  46.9        "Sag rated this video. | *‘Honestly? Ten.’*"
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
const S = 'sagittarius'
const GIFT = [
  '...RR.RR...',
  '....RRR....',
  'GGGGGRGGGGG',
  'GGGGGRGGGGG',
  '.HHHHRHHHH.',
  '.HHHHRHHHH.',
  '.HHHHRHHHH.',
  '.HHHHRHHHH.',
  '.HHHHRHHHH.',
]
const GIFT_C = { R: RED, G: '#ff8fb1', H: '#ffb8cf' }
const BOOK = [
  'BBBBBBBBBBBB',
  'BPPPPPBPPPPB',
  'BPKKKPBPKKPB',
  'BPPPPPBPPPPB',
  'BPKKKPBPKKKB',
  'BPPPPPBPPPPB',
  'BPKKPPBPKKPB',
  'BPPPPPBPPPPB',
  'BBBBBBBBBBBB',
]
const BOOK_C = { B: '#3d7cb8', P: PAPER, K: '#9a8f7a' }
const BOWL = [
  '..S..S..S..',
  '.S..S..S...',
  'WWWWWWWWWWW',
  'WOOOOOOOOOW',
  '.WWWWWWWWW.',
  '..WWWWWWW..',
  '...WWWWW...',
]
const BOWL_C = { S: '#d8dbe8', W: '#fff4e2', O: ORANGE }
const TIE = [
  '.RR.',
  'RRRR',
  '.RR.',
  '.YR.',
  'RRYR',
  'RYRR',
  'RRYR',
  '.RR.',
]
const TIE_C = { R: RED, Y: GOLD }

// a lie detector: a box with a screen whose needle line stays perfectly flat (and the machine dozes off)
function detector(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.03); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -96, 316, 220)
  x.fillStyle = INK; x.fillRect(-164, -110, 328, 224)
  x.fillStyle = '#9aa5c4'; x.fillRect(-156, -102, 312, 208)
  x.fillStyle = '#0d2a1e'; x.fillRect(-134, -80, 268, 130)
  x.strokeStyle = MINT; x.lineWidth = 5; x.beginPath()
  for (let i = 0; i <= 40; i++) { const px = -124 + i * 6.2, wob = lt < 0.6 ? Math.sin(i * 1.3 + t * 9) * 12 * (1 - lt / 0.6) : 0; i ? x.lineTo(px, -15 + wob) : x.moveTo(px, -15 + wob) }
  x.stroke()
  x.fillStyle = lt > 1.2 ? '#5b6380' : RED; x.fillRect(-120, 70, 24, 24)
  x.fillStyle = MINT; x.fillRect(-84, 70, 24, 24)
  x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('TRUTH-O-METER', -46, 83)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: '“How do I look?” | Sag *answered.*', mood: lt => lt > 1.2 ? 'squint' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'libra', 790, 960, 230 * k, { mood: lt > 1.5 ? 'wide' : 'sparkle', look: [-1, 0], seed: 11, glyph: false, hops: [P.t0 + 1.55] })
      bubble(x, 790, 650, 'how do I look?', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 38, col: PINK, tail: 'bc' })
      bubble(x, 380, 600, 'honestly? | not the hat.', pop01(t, P.t0 + 1.25, 0.25, 2.2), { size: 38, tail: 'bc' })
    } },
  { sign: S, cap: 'Your surprise party? | Sag *told you first.*', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, GIFT, GIFT_C, 790, 930, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })
      label(x, 790, 650, 'SURPRISE PARTY', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 34, bg: GOLD, rot: -0.04 })
      bubble(x, 400, 590, 'it’s at 8! | act shocked.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, tail: 'bc' })
      label(x, 790, 1120, 'SURPRISE: GONE', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 30, bg: RED, color: PAPER, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You opened a new book. | *Sag spoiled it.*', mood: lt => lt > 1.1 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.1],
    front(x, t, lt, P) {
      drawBits(x, BOOK, BOOK_C, 790, 900, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.04 })
      label(x, 790, 700, 'PAGE 1', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 34, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 420, 590, 'the butler | did it.', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 40, tail: 'bc' })
      label(x, 790, 1100, 'THE END, BASICALLY', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 28, bg: LAV, rot: -0.05 })
    } },
  { sign: S, cap: 'Read your birth chart. | Said *“whew.”*', mood: lt => lt > 1.3 ? 'wide' : 'squint', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      chartWheel(x, t, 790, 880, pop01(t, P.t0 + 0.2, 0.35, 2), { r: 150, spin: t * 0.2 })
      label(x, 790, 660, 'YOUR CHART', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 400, 590, 'whew. | a lot going on.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 36, tail: 'bc' })
      label(x, 790, 1100, '(LOVINGLY)', pop01(t, P.t0 + 1.9, 0.3, 2.4), { size: 30, bg: PINK, rot: 0.05 })
    } },
  { sign: S, cap: 'Lie detector test? | It got *bored.*', mood: lt => lt > 1.4 ? 'wink' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      detector(x, t, 790, 880, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      label(x, 790, 660, 'LIES: 0', pop01(t, P.t0 + 0.7, 0.3, 2), { size: 40, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      if (lt > 1.2) zzz(x, t, 640, 760, { n: 3, size: 60, col: BONE })
      label(x, 790, 1080, 'MACHINE: ASLEEP', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: LAV, rot: -0.05 })
    } },
  { sign: S, cap: 'Keeping a secret? | *Four seconds.* Tops.', mood: lt => lt > 1.6 ? 'wide' : 'squint', look: [1, 0], star: { x: -170 }, squash: lt => lt < 1.5 ? 0.06 * Math.sin(lt * 30) : 0,
    front(x, t, lt, P) {
      const s = Math.min(4, Math.floor(Math.max(0, lt - 0.4) / 0.3))
      const out = lt > 1.6
      label(x, 790, 760, out ? 'SECRET: OUT' : `HOLDING IT… 0:0${s}`, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 38, bg: out ? RED : GOLD, color: out ? PAPER : INK, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 760, 960, out ? 'THEY’RE | ENGAGED!!' : 'mmmhmm…', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: out ? 40 : 38, tail: 'bl' })
      sparkles(x, t, 790, 960, P.t0 + 1.65, 7, 190, 0.2)
    } },
  { sign: S, cap: '“This soup is bad.” | Had *three bowls.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: { x: -170 }, hops: [1.0, 1.5],
    front(x, t, lt, P) {
      const n = lt < 0.9 ? 1 : lt < 1.3 ? 2 : 3
      for (let i = 0; i < n; i++) drawBits(x, BOWL, BOWL_C, 790 + (i % 2 ? 16 : -10), 1080 - i * 96, 20 * pop01(t, P.t0 + 0.2 + (i ? 0.5 + i * 0.4 : 0), 0.25, 2.2), { rot: i % 2 ? 0.05 : -0.04 })
      bubble(x, 410, 590, 'too salty. | more, please.', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 36, tail: 'bc' })
      label(x, 800, 700, `BOWL ${n}`, pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 38, bg: ORANGE, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Biggest weakness? | *“Honestly? Mornings.”*', mood: lt => lt > 1.6 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.7],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.35, 2)
      if (k > 0.01) {
        const Fc = signChar(x, t, 'capricorn', 800, 960, 220 * k, { mood: lt > 1.6 ? 'heart' : lt > 1.0 ? 'wide' : 'neutral', look: [-1, 0], seed: 15, glyph: false })
        drawBits(x, TIE, TIE_C, 800, Fc.cy + 96, 10 * k)
      }
      bubble(x, 800, 650, 'any weaknesses?', pop01(t, P.t0 + 0.35, 0.25, 2.2), { size: 36, col: MINT, tail: 'bc' })
      bubble(x, 390, 590, 'mornings. | also, your tie.', pop01(t, P.t0 + 0.95, 0.25, 2.2), { size: 34, tail: 'bc' })
      label(x, 800, 1160, 'HIRED. RESPECTED.', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04 })
    } },
  { sign: S, cap: 'Their dating profile? | *Brutally honest.*', mood: lt => lt > 1.5 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const show = Math.floor(Math.max(0, lt - 0.4) / 0.32) + 1
      card(x, 790, 880, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 320, h: 400, title: '♐︎ MY PROFILE', titleBg: '#a35cf0', lines: ['late: always', 'filter: none', 'passport: ready', 'heart: huge'], size: 28, show })
      hearts(x, t, 790, 760, P.t0 + 1.8, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2t0466', key: 'C', accent: VIOLET, solo: S, ending: 'lesson',
  title: 'Sagittarians telling | *the truth.*',
  cameos: CAMEOS,
  group: { cap: 'Zero filter. | *All heart.*', mood: 'sparkle' },
  lesson: { text: 'Their truth comes | *with a hug.*', chip: 'STATUS: TRUSTED' },
  last: {
    text: 'Sag rated this video. | *“Honestly? Ten.”*',
    draw(x, t, lt) {
      const t0 = t - lt
      label(x, 540, 1200, '10 / 10', pop01(t, t0 + 1.2, 0.3, 2.4), { size: 56, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 540, 860, t0 + 1.3, 8, 240, 0.4)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
