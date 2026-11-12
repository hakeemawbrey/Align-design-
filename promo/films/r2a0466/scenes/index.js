// r2a0466: THE SIGNS AS… v3, ADVICE SOLO (star_advice), "Libra, before you | send that text." (~51 s vertical, signs3kit social cut, music: lofi · D)
// Nine gentle truths for a Libra holding a phone, each with one light visual gag and a warm reframe.
//   0.0–3.6    "Libra, before you | *send that text.*"
//   3.6–37.8   nine cards: thumb over SEND, one breath · polled five friends, your gut votes too · four sorrys, one is plenty
//              · upset? the moon says sleep on it, the sun says send · "whatever you want!" Libra picks tacos
//              · AIR + AIR compatibility, now just say hi · waiting on a reply, water a plant (it grows) · the scale: count yourself in
//              · delivered ✓, proud of you
//  37.8        "Kind *and* | honest. That’s you."
//  41.0        LESSON UNLOCKED: "Kind words land. | *Even messy ones.*"  STATUS: SENT
//  46.9        "Gemini replied. | *Instantly.*" over the match card: Libra + Gemini (the compatibility check, paid off).
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
const S = 'libra', LCOL = '#e163d6'
const PLANT = [
  '....LL.LL....',
  '...LLL.LLL...',
  '....LLLLL....',
  '.LL...L...LL.',
  'LLLL..L..LLLL',
  '.LLLL.L.LLLL.',
  '....LLLLL....',
  '......L......',
  '..PPPPPPPPP..',
  '..PPPPPPPPP..',
  '...PPPPPPP...',
  '...PPPPPPP...',
  '....PPPPP....',
]
const PLANT_C = { L: '#5fd068', P: '#d9774a' }
const CAN = [
  '.......KKK..',
  'S.....K...K.',
  '.S....K...K.',
  '..SCCCCCCC..',
  '...CCCCCCC..',
  '...CCCCCCC..',
  '...CCCCCCC..',
  '...CCCCCCC..',
]
const CAN_C = { K: '#2a2350', S: '#8fe3ff', C: '#8fe3ff' }
const SUN = [
  '...Y..Y..Y...',
  '.Y.........Y.',
  '....YYYYY....',
  'Y..YYYYYYY..Y',
  '...YYYYYYY...',
  'Y..YYYYYYY..Y',
  '...YYYYYYY...',
  '....YYYYY....',
  '.Y.........Y.',
  '...Y..Y..Y...',
]
const MOON = [
  '...MMMM..',
  '..MMMM...',
  '.MMMM....',
  '.MMMM....',
  '.MMMM....',
  '.MMMMM...',
  '..MMMMMM.',
  '...MMMM..',
]
const TACO = [
  '....YYYYY....',
  '..YYGRGRGYY..',
  '.YGRMGRMGRGY.',
  'YYMMMMMMMMMYY',
  'YYYYYYYYYYYYY',
  '.YYYYYYYYYYY.',
]
const TACO_C = { Y: '#f2c75c', G: '#5fd068', R: RED, M: WOOD }

// a balance scale: two pans; tilt -1 (THEM heavy) … 0 (balanced)
function scale(x, t, cx, cy, k, tilt, youHeart) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-14, -150, 28, 300); x.fillRect(-90, 140, 180, 26)
  x.fillStyle = GOLD; x.fillRect(-8, -144, 16, 288); x.fillRect(-84, 144, 168, 18)
  const a = tilt * 0.28
  x.save(); x.translate(0, -140); x.rotate(a)
  x.fillStyle = INK; x.fillRect(-170, -10, 340, 20); x.fillStyle = GOLD; x.fillRect(-166, -6, 332, 12)
  x.restore()
  for (const side of [-1, 1]) {
    const px = side * 160 * Math.cos(a), py = -140 + side * 160 * Math.sin(a)
    x.strokeStyle = BONE; x.lineWidth = 3; x.beginPath(); x.moveTo(px, py); x.lineTo(px - 60, py + 90); x.moveTo(px, py); x.lineTo(px + 60, py + 90); x.stroke()
    x.fillStyle = INK; x.fillRect(px - 76, py + 86, 152, 22); x.fillStyle = GOLD; x.fillRect(px - 72, py + 90, 144, 14)
    x.fillStyle = side < 0 ? '#ff8fb1' : MINT
    x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    label(x, px, py + 140, side < 0 ? 'THEM' : 'YOU', 1, { size: 26, bg: side < 0 ? PINK : MINT, rot: 0 })
    if (side < 0) for (let i = 0; i < 3; i++) drawBits(x, HEARTB, { H: PINK, W: '#fff' }, px - 40 + i * 40, py + 62, 5)
    else if (youHeart > 0.01) drawBits(x, HEARTB, { H: '#ff4f86', W: '#fff' }, px, py + 54 - (1 - youHeart) * 120, 9 * youHeart)
  }
  x.restore()
}
const HEARTB = ['.HH.HH.', 'HHHHHHH', 'HWHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']

const CAMEOS = [
  { sign: S, cap: 'Thumb over “send”? | Take *one breath.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 }, squash: lt => lt > 0.9 && lt < 1.4 ? -0.06 * Math.sin((lt - 0.9) * Math.PI / 0.5) : 0,
    front(x, t, lt, P) {
      const blink = lt < 1.4 && Math.floor(lt * 4) % 2
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { head: '♊︎ GEMINI', headBg: '#f2cf4a', msgs: [{ text: 'hey! loved | today :)', side: 'r', col: PINK }] })
      label(x, 790, 1080, lt > 1.4 ? 'BREATHED. READY.' : 'SEND?', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 38, bg: lt > 1.4 ? MINT : blink ? GOLD : BONE, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 380, 600, 'in… and out.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, tail: 'bc' })
    } },
  { sign: S, cap: 'Polled five friends? | *Your gut* votes too.', mood: lt => lt > 1.5 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -170 }, hops: [1.6],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      card(x, 790, 860, k, { w: 330, h: 330, title: 'SHOULD I SEND?', titleBg: LCOL, lines: [], size: 26 })
      if (k > 0.6) {
        const g = ease.outCubic(prog(lt, 0.5, 1.2))
        x.save(); x.translate(790, 860); x.rotate(0.04)
        const rows = [['YES', 0.5 * g, MINT], ['NO', 0.5 * g, PINK], ['MY GUT', lt > 1.4 ? ease.outBack(prog(lt, 1.4, 1.8)) : 0, GOLD]]
        rows.forEach(([n, v, c], i) => {
          const y = -60 + i * 72
          x.fillStyle = INK; x.font = `800 24px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(n, -140, y)
          x.fillStyle = '#d8cfbd'; x.fillRect(-140, y + 18, 280, 18); x.fillStyle = c; x.fillRect(-140, y + 18, 280 * Math.min(1, v), 18)
        })
        x.restore()
      }
      label(x, 790, 1080, 'GUT SAYS: SEND', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04 })
    } },
  { sign: S, cap: 'Four “sorry”s in one text? | *One is plenty.*', mood: lt => lt > 1.5 ? 'happy' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      card(x, 790, 860, k, { w: 340, h: 330, title: 'DRAFT', titleBg: LAV, titleCol: INK, lines: ['sorry!! so sorry', 'if this is weird,', 'sorry, no worries', 'haha sorry!!'], size: 26, strike: lt > 1.0 ? (lt - 1.0) / 0.12 : 0 })
      x.save(); x.globalAlpha = clamp(lt - 1.0); x.restore()
      label(x, 790, 1080, lt > 1.5 ? 'NOW: “sorry I’m late :)”' : 'SORRY COUNT: 4', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 28, bg: lt > 1.5 ? MINT : PINK, rot: 0.04 })
    } },
  { sign: S, cap: 'Upset? Save the draft. | *Sleep on it.*', mood: lt => lt > 1.5 ? 'happy' : 'sleepy', look: [1, 0], star: { x: -170 }, hops: [1.6],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      const day = ease.inOutCubic(prog(lt, 1.1, 1.5))
      drawBits(x, MOON, { M: '#fff1b0' }, 800, lerp(760, 540, day), 22 * k * (1 - day), { rot: -0.1 })
      drawBits(x, SUN, { Y: GOLD }, 800, lerp(1000, 760, day), 20 * k * day, { rot: t * 0.3 })
      label(x, 790, 1060, day > 0.5 ? 'MORNING: CALMER' : 'DRAFT: SAVED', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 32, bg: day > 0.5 ? GOLD : LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: '“Whatever you want!” | You *can pick.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      bubble(x, 790, 650, 'where to eat?', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 38, col: MINT, tail: 'bc' })
      bubble(x, 380, 590, 'tacos. | final answer.', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 38, tail: 'bc' })
      drawBits(x, TACO, TACO_C, 790, 880, 22 * pop01(t, P.t0 + 1.2, 0.3, 2.2), { rot: 0.06 })
      label(x, 790, 1080, 'DECIDED. FIRST TRY.', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.04 })
      sparkles(x, t, 790, 880, P.t0 + 1.3, 7, 180, 0.4)
    } },
  { sign: S, cap: 'Checked your compatibility? | *Now say hi.*', mood: lt => lt > 1.5 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 790, 620, '✦ COMPATIBILITY', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 30, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      const k = pop01(t, P.t0 + 0.4, 0.35, 2)
      if (k > 0.01) { signChar(x, t, 'libra', 700, 840, 180 * k, { mood: 'happy', seed: 31, glyph: false }); signChar(x, t, 'gemini', 880, 840, 180 * k, { mood: 'wink', seed: 32, glyph: false }) }
      label(x, 790, 990, 'AIR + AIR: BREEZY', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 30, bg: SKYB, rot: 0.04 })
      bubble(x, 790, 1130, 'hi :)', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 40, col: PINK, tail: 'bl' })
      hearts(x, t, 790, 820, P.t0 + 1.6, { n: 4, life: 1.4, spread: 160, cell: 7, seed: 8 })
    } },
  { sign: S, cap: 'Waiting on a reply? | *Water a plant.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      const g = 0.6 + 0.5 * ease.outBack(prog(lt, 0.9, 1.6))
      drawBits(x, PLANT, PLANT_C, 800, 1000 - (g - 0.6) * 90, 18 * k * g)
      drawBits(x, CAN, CAN_C, 640, 720, 14 * pop01(t, P.t0 + 0.4, 0.3, 2), { rot: lt > 0.7 ? 0.35 : 0 })
      if (lt > 0.7 && lt < 1.6) for (let i = 0; i < 4; i++) { x.fillStyle = SKYB; x.fillRect(700 + i * 12, 780 + ((t * 300 + i * 40) % 120), 8, 14) }
      label(x, 800, 640, 'REPLY: WHENEVER', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      label(x, 800, 1150, 'PLANT: THRIVING', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04 })
    } },
  { sign: S, cap: 'Keeping everyone happy? | *Count yourself in.*', mood: lt => lt > 1.5 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -170 }, hops: [1.6],
    front(x, t, lt, P) {
      const yh = ease.outCubic(prog(lt, 1.0, 1.5))
      scale(x, t, 790, 900, pop01(t, P.t0 + 0.2, 0.35, 2) * 0.95, -1 + yh, yh)
      label(x, 790, 610, 'BALANCED. FINALLY.', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04 })
    } },
  { sign: S, cap: 'You hit send. | *Proud of you.*', mood: lt => lt > 1.0 ? 'heart' : 'wide', look: [1, 0], star: { x: -170 }, hops: [1.0, 1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { head: 'SENT', headBg: MINT, msgs: [{ text: 'hey! loved | today :)', side: 'r', col: PINK }, { text: 'delivered ✓', side: 'r', col: BONE, k: pop01(t, P.t0 + 0.8, 0.25, 2) }] })
      confetti(x, t, 560, 860, P.t0 + 1.0)
      label(x, 790, 1110, 'BRAVE LITTLE STAR', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.04 })
    } },
]

const F = makeFilm({
  id: 'r2a0466', key: 'D', accent: PINK, solo: S, ending: 'card',
  title: 'Libra, before you | *send that text.*',
  cameos: CAMEOS,
  card: { a: 'libra', b: 'gemini', chip: 'IT’S A MATCH' },
  group: { cap: 'Kind *and* honest. | That’s you.', mood: 'sparkle' },
  lesson: { text: 'Kind words land. | *Even messy ones.*', chip: 'STATUS: SENT' },
  last: {
    text: 'Gemini replied. | *Instantly.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 10, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
