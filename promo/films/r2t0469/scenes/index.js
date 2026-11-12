// r2t0469: THE SIGNS AS… v3, ROLL CALL (star_talk), "The signs at a | sunflower field." (~57 s vertical, signs3kit social cut, music: lofi · D)
// Twelve signs in zodiac order, each the most extreme version of itself in a sunflower field.
//   0.0–3.6    "The signs at a | *sunflower field.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ challenged a bee to a race (bee won) · ♉ ate every seed · ♊ named every sunflower, then renamed them
//              · ♋ took one home, it has a stroller · ♌ every sunflower turned to face Leo · ♍ replanted the rows, perfectly straight
//              · ♎ swiped through forty sunflowers · ♏ wore all black (dress code: yellow) · ♐ wandered off into a corn maze
//              · ♑ asked the farmer about quarterly yields · ♒ explained the seeds are basically math · ♓ a sunflower nodded, it's a match (sobbing)
//  49.2        "Nobody left | *without pollen.*"  The twelve fly up into a group photo.
//  52.6        callback: "The sunflowers? | *Still facing Leo.*" (the sun-tracking flowers, paid off).
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
const FLOWER = [
  '...Y.YYY.Y...',
  '..YYYYYYYYY..',
  '.YYYBBBBBYYY.',
  'YYYBbBBbBBYYY',
  '.YYBBBbBBBYY.',
  'YYYBBbBBbBYYY',
  '.YYBBBBBbBYY.',
  '..YYBBBBBYY..',
  '...YYYYYYY...',
  '....Y.G.Y....',
  '......G......',
  '..LL..G......',
  '..LLL.G..LL..',
  '...LLLG.LLL..',
  '......GLLL...',
  '......G......',
  '......G......',
]
const FLOWER_C = { Y: '#ffd23a', B: '#7a4a22', b: '#4a2a12', G: '#5fd068', L: '#3faa58' }
const BALD_C = { Y: '#ffd23a', B: '#c9a070', b: '#c9a070', G: '#5fd068', L: '#3faa58' }
const BEE = [
  '..WW.WW..',
  '..WWWWW..',
  '.YKYKYKY.',
  'YYKYKYKYK',
  '.YKYKYKY.',
]
const BEE_C = { W: '#e8f6ff', Y: '#ffd23a', K: INK }
const STROLLER = [
  'KKKK........',
  'KPPPK.......',
  'KPPPPK......',
  'KPPPPPKKKKKK',
  'KPPPPPPPPPPK',
  'KPPPPPPPPPPK',
  '.KPPPPPPPPK.',
  '..KKKKKKKK..',
  '..K......K..',
  '.KWK....KWK.',
  '..K......K..',
]
const STROLLER_C = { K: INK, P: '#8fe3ff', W: '#9aa5c4' }
const SHADES = ['KKKKKKKKKKKKKKKKKK', 'KKKKKKKKKKKKKKKKKK', '.KKKKK.KKKK.KKKKK.', '..KKK...KK...KKK..']
const RULER = ['YYYYYYYYYYYYYYYYYYYYYY', 'YKYKYKYKYKYKYKYKYKYKYK', 'YKYYYKYYYKYYYKYYYKYYYK']
function flower(x, cx, cy, cell, { rot = 0, bald = false, alpha = 1, sx = 1 } = {}) { drawBits(x, FLOWER, bald ? BALD_C : FLOWER_C, cx, cy, cell, { rot, alpha, sx }) }
function signpost(x, cx, cy, k, text) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-12, -60, 24, 260); x.fillStyle = WOOD; x.fillRect(-6, -56, 12, 252)
  x.restore()
  label(x, cx + 20 * k, cy - 70 * k, text, k, { size: 32, bg: '#d9a05a', rot: -0.05 })
}

const CAMEOS = [
  { sign: 'aries', cap: 'Challenged a bee | *to a race.*', mood: lt => lt > 1.5 ? 'wide' : 'squint', look: [1, 0], star: { x: -170 }, hops: [0.5, 0.9],
    front(x, t, lt, P) {
      const r = ease.inOutCubic(prog(lt, 0.6, 1.4))
      drawBits(x, BEE, BEE_C, lerp(620, 840, r) + Math.sin(t * 20) * 4, 760 + Math.sin(t * 9) * 16, 17 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 380, 600, 'you and me. | GO.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, tail: 'bc' })
      label(x, 790, 1040, 'WINNER: THE BEE', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04 })
    } },
  { sign: 'taurus', cap: 'Ate every | *sunflower seed.*', mood: lt => lt > 1.3 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      flower(x, 800, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { bald: lt > 1.2 })
      label(x, 800, 640, lt > 1.2 ? 'SEEDS LEFT: 0' : 'SEEDS LEFT: ALL', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 32, bg: lt > 1.2 ? RED : MINT, color: lt > 1.2 ? PAPER : INK, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 380, 600, 'just one more', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, tail: 'bc' })
    } },
  { sign: 'gemini', cap: 'Named every sunflower. | *Then renamed them.*', mood: lt => Math.floor(lt * 2.4) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      flower(x, 700, 920, 15 * k, { rot: -0.05 }); flower(x, 880, 940, 15 * k, { rot: 0.06 })
      const re = lt > 1.3
      label(x, 700, 1120, re ? 'GARY II' : 'STEVE', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 30, bg: re ? PINK : BONE, rot: -0.05 })
      label(x, 880, 1140, re ? 'STEVE (NEW)' : 'GARY', pop01(t, P.t0 + 0.7, 0.3, 2), { size: 30, bg: re ? PINK : BONE, rot: 0.05 })
      bubble(x, 380, 600, 'actually…', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, tail: 'bc' })
    } },
  { sign: 'cancer', cap: 'Took one home. | *It has a stroller.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      flower(x, 850, 820, 12 * k, { rot: 0.04 })
      drawBits(x, STROLLER, STROLLER_C, 800, 990, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 380, 600, 'my sunny boy', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, tail: 'bc' })
      hearts(x, t, 790, 780, P.t0 + 1.3, { n: 4, life: 1.4, spread: 160, cell: 7, seed: 3 })
    } },
  { sign: 'leo', cap: 'Every sunflower | turned *to face Leo.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', star: { x: -170 }, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const turn = ease.inOutCubic(prog(lt, 0.7, 1.3))
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      ;[[680, 930], [800, 880], [920, 950]].forEach(([fx, fy], i) => flower(x, fx, fy, 13 * k, { rot: lerp(0.3, -0.35, turn) + 0.04 * Math.sin(t * 2 + i), sx: lerp(1, -1, turn) }))
      label(x, 800, 640, 'THE SUN: IGNORED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04 })
    } },
  { sign: 'virgo', cap: 'Replanted the rows. | *Perfectly straight.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const fix = ease.inOutCubic(prog(lt, 0.6, 1.3))
      for (let i = 0; i < 4; i++) flower(x, 660 + i * 92, 900 + (1 - fix) * [30, -40, 20, -25][i], 8 * pop01(t, P.t0 + 0.2 + i * 0.08, 0.3, 2), { rot: (1 - fix) * [0.3, -0.2, 0.25, -0.3][i] })
      drawBits(x, RULER, { Y: GOLD, K: INK }, 800, 1050, 16 * pop01(t, P.t0 + 0.5, 0.3, 2))
      label(x, 800, 650, 'ROW 14: FIXED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Couldn’t pick one. | *Swiped through forty.*', mood: lt => lt > 1.6 ? 'heart' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      const sw = (lt * 2.6) % 1, n = Math.min(40, 1 + Math.floor(lt * 2.6) * 6)
      card(x, 800, 880, k, { w: 260, h: 320, rot: 0.03, bg: '#2a2350' })
      if (k > 0.5) {
        const done = lt > 1.6
        x.save(); x.translate(800 + (done ? 0 : ease.inCubic(sw) * 180), 880); x.rotate(done ? 0 : ease.inCubic(sw) * 0.4)
        card(x, 0, 0, 1, { w: 260, h: 320, rot: 0.03, bg: '#3b2f6a' }); flower(x, 0, -10, 13)
        x.restore()
      }
      label(x, 800, 640, lt > 1.6 ? '✦ IT’S A MATCH ✦' : `FLOWER ${n}`, pop01(t, P.t0 + 0.4, 0.3, 2), { size: 32, bg: lt > 1.6 ? PINK : LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Wore all black | *to a sunflower field.*', mood: 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P, F) {
      drawBits(x, SHADES, { K: INK }, F.x, F.cy - 22, 11 * pop01(t, P.t0 + 0.4, 0.25, 2.4))
      flower(x, 800, 920, 16 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })
      label(x, 800, 650, 'DRESS CODE: YELLOW', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 380, 600, 'it’s a vibe.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, tail: 'bc' })
    } },
  { sign: 'sagittarius', cap: 'Wandered off. | *Now in a corn maze.*', mood: lt => lt > 1.4 ? 'wide' : 'sparkle', look: [-1, 0], star: { x: 160 }, hops: [0.5, 1.0],
    front(x, t, lt, P) {
      signpost(x, 330, 960, pop01(t, P.t0 + 0.2, 0.35, 2), 'CORN MAZE →')
      bubble(x, 700, 620, 'where’s | everyone??', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 38, tail: 'bc' })
      label(x, 340, 640, 'LAST SEEN: FIELD 2', pop01(t, P.t0 + 0.7, 0.3, 2.2), { size: 26, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Asked the farmer | *about quarterly yields.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      card(x, 800, 880, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 300, h: 340, title: 'Q3: SUNFLOWERS', titleBg: '#2fc79a', titleCol: INK, lines: ['yield: ?', 'margin: ?', 'expansion: ?', 'bees: hired?'], size: 28, show: Math.floor(Math.max(0, lt - 0.4) / 0.25) + 1 })
      label(x, 800, 1110, 'FARMER: CONFUSED', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04 })
    } },
  { sign: 'aquarius', cap: 'Explained the seeds | *are basically math.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 860); x.scale(k, k)
        x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 150, 0, Math.PI * 2); x.fill()
        x.fillStyle = '#ffd23a'; x.beginPath(); x.arc(0, 0, 142, 0, Math.PI * 2); x.fill()
        x.fillStyle = '#7a4a22'; x.beginPath(); x.arc(0, 0, 110, 0, Math.PI * 2); x.fill()
        const m = Math.floor(clamp((lt - 0.4) / 1.2) * 160)
        for (let i = 0; i < m; i++) { const a = i * 2.39996, r = 8.4 * Math.sqrt(i); x.fillStyle = i % 2 ? '#4a2a12' : '#c9a070'; x.fillRect(Math.cos(a) * r - 4, Math.sin(a) * r - 4, 8, 8) }
        x.restore()
      }
      label(x, 800, 650, 'IT’S A SPIRAL!!', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: SKYB, rot: -0.04 })
      bubble(x, 800, 1100, 'nobody asked.', pop01(t, P.t0 + 1.8, 0.25, 2.2), { size: 34, col: BONE, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'A sunflower nodded. | Pisces *felt seen.*', mood: 'wide', tears: lt => lt > 1.1 ? 3 : 2, look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const nod = lt > 0.7 && lt < 1.2 ? Math.sin((lt - 0.7) * Math.PI * 4) * 0.25 : 0
      flower(x, 800, 900, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: nod })
      label(x, 800, 640, '✦ SOULMATE ✦', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 620, 760, P.t0 + 1.3, { n: 4, life: 1.5, spread: 140, cell: 7, seed: 7 })
    } },
]

const F = makeFilm({
  id: 'r2t0469', key: 'D', accent: GOLD, ending: 'callback',
  title: 'The signs at a | *sunflower field.*',
  cameos: CAMEOS,
  group: { cap: 'Nobody left | *without pollen.*' },
  last: {
    text: 'The sunflowers? | *Still facing Leo.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.3, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'leo', 380, 1080, 280 * k, { mood: 'sparkle', look: [1, 0], seed: 12, hops: [t0 + 1.4] })
      ;[[640, 1100], [760, 1050], [880, 1120]].forEach(([fx, fy], i) => flower(x, fx, fy, 11 * pop01(t, t0 + 0.6 + i * 0.15, 0.3, 2), { rot: -0.3 + 0.04 * Math.sin(t * 2 + i), sx: -1 }))
      sparkles(x, t, 380, 1080, t0 + 1.4, 8, 200, 0.3)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
