// r2t0470: THE SIGNS AS… v3, ROLL CALL (star_talk), "The signs | at the library." (~57 s vertical, signs3kit social cut, music: lofi · F)
// Twelve signs in zodiac order, each the most extreme version of itself at the library.
//   0.0–3.6    "The signs | *at the library.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ finished the book in the lobby · ♉ found the beanbag, lives there now · ♊ library voice? never heard of it
//              · ♋ returning a book, a proper goodbye · ♌ asked for their autobiography, wrote it there
//              · ♍ found a typo, wrote to the author · ♎ found the astrology aisle, never left · ♏ borrowed the book nobody touches
//              · ♐ borrowed the whole travel section · ♑ booked the study room, all year · ♒ asked for books written by aliens
//              · ♓ one sad chapter, the book is soggy
//  49.2        "Shhh… | *nobody whispered.*"  The twelve fly up into a group photo.
//  52.6        callback: "Library closed. | *Taurus stayed.*" (the beanbag, paid off).
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
const bookC = c => ({ B: c, P: PAPER, K: '#9a8f7a' })
const SPINE = ['CCCCCCCCCCCCCC', 'CWWCCCCCCCCWWC', 'CCCCCCCCCCCCCC']
const BEAN = [
  '....GGGGGG....',
  '..GGGGGGGGGG..',
  '.GGGgGGGGGGGG.',
  'GGGGGGGGGgGGGG',
  'GGGGGGGGGGGGGG',
  'GGgGGGGGGGGGGG',
  '.GGGGGGGGGGGG.',
  '..GGGGGGGGGG..',
]
const BEAN_C = { G: '#ff9a4a', g: '#ffc08a' }
const ENVELOPE = [
  'WWWWWWWWWWWW',
  'WKWWWWWWWWKW',
  'WWKWWWWWWKWW',
  'WWWKWRRWKWWW',
  'WWWWKRRKWWWW',
  'WWWWWWWWWWWW',
  'WWWWWWWWWWWW',
]
const ENV_C = { W: PAPER, K: '#c9b89a', R: RED }
const GLOBE = [
  '...BBBBB...',
  '..BGGBBGB..',
  '.BBGGGBBBB.',
  '.BBBGGBBGB.',
  '.BGBBBBGGB.',
  '..BBGGBBB..',
  '...BBBBB...',
  '.....K.....',
  '...KKKKK...',
]
const GLOBE_C = { B: '#3fb6f0', G: '#5fd068', K: '#2a2350' }
const COLS = ['#e23d4e', '#3fb6f0', '#5fd068', '#f2c75c', '#b48cff', '#ff8fb1', '#ffb34a']
function books(x, cx, bottom, n, k, { cell = 9, seed = 0 } = {}) {
  for (let i = 0; i < n; i++) drawBits(x, SPINE, { C: COLS[(i + seed) % COLS.length], W: '#fff4e2' }, cx + Math.sin(i * 2.3 + seed) * 10, bottom - i * cell * 3.4, cell * k)
}
function cobweb(x, cx, cy, s, a) {
  x.save(); x.globalAlpha = a; x.strokeStyle = BONE; x.lineWidth = 2
  for (let i = 0; i < 4; i++) { x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx + Math.cos(i * 0.5) * s, cy + Math.sin(i * 0.5) * s); x.stroke() }
  for (const r of [0.35, 0.65, 0.95]) { x.beginPath(); for (let i = 0; i < 4; i++) { const px = cx + Math.cos(i * 0.5) * s * r, py = cy + Math.sin(i * 0.5) * s * r; i ? x.lineTo(px, py) : x.moveTo(px, py) } x.stroke() }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Finished the book | *in the lobby.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -170 }, hops: [1.5],
    front(x, t, lt, P) {
      const flip = Math.floor(lt * 14) % 2
      drawBits(x, BOOK, bookC(RED), 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: flip ? 0.06 : -0.06 })
      const s = Math.min(58, Math.floor(lt * 30))
      label(x, 790, 660, lt > 1.4 ? 'DONE. NEXT.' : `0:${String(s).padStart(2, '0')}`, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 40, bg: lt > 1.4 ? MINT : GOLD, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1110, 'YOU ARE HERE: LOBBY', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 28, bg: BONE, rot: -0.04 })
    } },
  { sign: 'taurus', cap: 'Found the beanbag. | *Lives there now.*', mood: 'sleepy', star: { x: -40, y: 20 },
    back(x, t, lt, P) { drawBits(x, BEAN, BEAN_C, 540, 1020, 30 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      const d = 1 + Math.floor(clamp((lt - 0.5) / 1.3) * 2)
      label(x, 790, 640, `DAY ${d}`, pop01(t, P.t0 + 0.4, 0.3, 2), { size: 44, bg: LAV, rot: 0.05, font: MONO, weight: 700 })
      label(x, 320, 680, 'MAIL GOES HERE NOW', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 26, bg: GOLD, rot: -0.05 })
    } },
  { sign: 'gemini', cap: 'Library voice? | *Never heard of it.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -170 }, squash: lt => 0.04 * Math.sin(lt * 26),
    front(x, t, lt, P) {
      card(x, 820, 900, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 220, h: 150, title: 'QUIET', titleBg: '#3d7cb8', lines: ['please :)'], size: 30, rot: 0.06 })
      bubble(x, 480, 600, 'SO ANYWAY!!', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 44, tail: 'bc' })
      bubble(x, 790, 680, 'shhh!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 38, col: PINK, tail: 'bc' })
      label(x, 790, 1110, 'VOLUME: 11', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 34, bg: RED, color: PAPER, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Returning a book? | *A proper goodbye.*', mood: lt => lt > 1.2 ? 'wide' : 'heart', tears: 0, look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const slot = ease.inOutCubic(prog(lt, 1.0, 1.6))
      drawBits(x, BOOK, bookC('#3fb6f0'), 790, lerp(860, 1010, slot), 20 * pop01(t, P.t0 + 0.2, 0.3, 2) * (1 - 0.5 * slot), { alpha: 1 - prog(lt, 1.5, 1.7) })
      label(x, 790, 1060, 'RETURNS', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 34, bg: BONE, rot: 0, font: MONO, weight: 700 })
      bubble(x, 380, 600, 'I’ll visit. | be good.', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 38, tail: 'bc' })
      hearts(x, t, 790, 860, P.t0 + 0.7, { n: 4, life: 1.3, spread: 140, cell: 7, seed: 5 })
    } },
  { sign: 'leo', cap: 'Asked for their autobiography. | *Wrote it there.*', mood: lt => lt > 1.3 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      card(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 320, h: 300, title: lt > 1.3 ? 'ME: A STORY' : 'SEARCH: LEO', titleBg: '#f39a3a', titleCol: INK, lines: lt > 1.3 ? ['ch. 1: me', 'ch. 2: also me', 'ch. 3: guess'] : ['no results'], size: 28, show: lt > 1.3 ? Math.floor((lt - 1.3) / 0.2) + 1 : 1 })
      label(x, 790, 1090, 'VOLUME 1 OF 12', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.04 })
    } },
  { sign: 'virgo', cap: 'Found a typo. | *Wrote to the author.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      card(x, 790, 820, k, { w: 300, h: 200, lines: ['…and they lived', 'happily ever', 'aftr.'], size: 30, rot: -0.03 })
      const r = ease.outCubic(prog(lt, 0.6, 1.0))
      if (r > 0) { x.save(); x.strokeStyle = RED; x.lineWidth = 7; x.beginPath(); x.ellipse(700, 868, 66, 30, -0.05, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * r); x.stroke(); x.restore() }
      drawBits(x, ENVELOPE, ENV_C, 820, 1060, 14 * pop01(t, P.t0 + 1.3, 0.3, 2.2), { rot: 0.08 })
      label(x, 790, 640, 'DEAR AUTHOR,', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: '#ef5c94', color: PAPER, rot: 0.04 })
    } },
  { sign: 'libra', cap: 'Found the astrology aisle. | *Never left.*', mood: lt => lt > 1.4 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      chartWheel(x, t, 800, 860, k * 0.8, { r: 150, spin: t * 0.15 })
      label(x, 800, 640, 'AISLE 7: THE STARS', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 30, bg: '#e163d6', color: INK, rot: -0.04, font: MONO, weight: 700 })
      label(x, 800, 1070, 'LIBRA + EVERYONE?', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: PINK, rot: 0.04 })
      hearts(x, t, 800, 820, P.t0 + 1.5, { n: 4, life: 1.4, spread: 160, cell: 7, seed: 4 })
    } },
  { sign: 'scorpio', cap: 'Borrowed the book | *nobody touches.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, BOOK, bookC('#3a2e55'), 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.03 })
      cobweb(x, 660, 790, 110, pop01(t, P.t0 + 0.4, 0.3, 1))
      if (lt > 0.9 && lt < 1.8) sparkles(x, t, 790, 900, P.t0 + 0.95, 8, 160, 0.4, ['#b9b0a0', '#d8cfbd', BONE])
      label(x, 790, 1100, 'LAST BORROWED: 1987', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 28, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 380, 600, 'perfect.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 40, tail: 'bc' })
    } },
  { sign: 'sagittarius', cap: 'Borrowed the whole | *travel section.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.4],
    front(x, t, lt, P) {
      const n = Math.min(12, Math.floor(Math.max(0, lt - 0.2) / 0.1) + 1)
      books(x, 790, 1120, n, 1, { cell: 9, seed: 2 })
      drawBits(x, GLOBE, GLOBE_C, 790, 1120 - n * 30.6 - 70, 11 * pop01(t, P.t0 + 1.4, 0.3, 2.2))
      label(x, 450, 640, 'DUE: WHENEVER I’M BACK', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 26, bg: GOLD, rot: -0.04 })
    } },
  { sign: 'capricorn', cap: 'Booked the study room. | *All year.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      card(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 320, h: 320, title: 'ROOM 3', titleBg: '#2fc79a', titleCol: INK, lines: ['mon: capricorn', 'tue: capricorn', 'wed: capricorn', 'etc.'], size: 26, show: Math.floor(Math.max(0, lt - 0.3) / 0.2) + 1 })
      label(x, 790, 1100, 'BOOKED: 365 DAYS', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Asked for books | *written by aliens.*', mood: lt => lt > 1.4 ? 'wide' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'virgo', 800, 960, 200 * k, { mood: lt > 1.2 ? 'wide' : 'neutral', look: [-1, 0], seed: 71, glyph: false })
      bubble(x, 400, 600, 'nonfiction, | please.', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 36, tail: 'bc' })
      bubble(x, 800, 690, 'aisle… nine?', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, col: MINT, tail: 'bc' })
    } },
  { sign: 'pisces', cap: 'One sad chapter. | *The book is soggy.*', mood: 'wide', tears: 3, look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const wet = clamp((lt - 0.4) / 1.2)
      drawBits(x, BOOK, bookC(wet > 0.5 ? '#5b7cc8' : '#7c74f0'), 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.04, sy: 1 - 0.08 * wet })
      for (let i = 0; i < 4; i++) { const ph = (t * 1.2 + i / 4) % 1; x.globalAlpha = wet * (1 - ph); x.fillStyle = SKYB; x.fillRect(700 + i * 56, 1000 + ph * 90, 10, 16); x.globalAlpha = 1 }
      label(x, 790, 660, 'ROMANCE: ♓︎ + ♋︎', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 32, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1130, 'BOOK: SOGGY', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: SKYB, rot: 0.04 })
    } },
]

const F = makeFilm({
  id: 'r2t0470', key: 'F', accent: MINT, ending: 'callback',
  title: 'The signs | *at the library.*',
  cameos: CAMEOS,
  group: { cap: 'Shhh… | *nobody whispered.*' },
  last: {
    text: 'Library closed. | *Taurus stayed.*',
    draw(x, t, lt) {
      const t0 = t - lt
      drawBits(x, BEAN, BEAN_C, 540, 1140, 30 * pop01(t, t0 + 0.2, 0.4, 2))
      const k = pop01(t, t0 + 0.5, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'taurus', 540, 1030, 260 * k, { mood: 'sleepy', seed: 12 })
      label(x, 820, 900, 'CLOSED', pop01(t, t0 + 1.2, 0.3, 2.4), { size: 40, bg: RED, color: PAPER, rot: 0.06, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
