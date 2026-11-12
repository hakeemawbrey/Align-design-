// r2a0468: THE SIGNS AS… v3, ADVICE SOLO (star_advice), "Signs a Leo | needs a break." (~46 s vertical, signs3kit social cut, music: lofi · C)
// Nine gentle signs a Leo is running on empty, each with one light visual gag and a warm reframe.
//   0.0–3.6    "Signs a Leo | *needs a break.*"
//   3.6–37.8   nine cards: hosting party number four, let someone else · shining nonstop, dimmer mode is allowed
//              · everyone's hype person, you deserve one too · even the mane needs a nap · said yes to everything, try "next week"
//              · performing at brunch, you can just eat · refreshing for a reply, phone down, snack up
//              · carrying everyone's stuff, share the load · bubble bath, no audience: royal behaviour
//  37.8        "Rest is | *still radiant.*"
//  41.2        callback: "The rubber duck? | *Also on break.*" (the bubble bath, paid off).
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
const S = 'leo', LCOL = '#f39a3a'
const HAT = [
  '....Y....',
  '...PPP...',
  '...PYP...',
  '..PPPPP..',
  '..PYPYP..',
  '.PPPPPPP.',
  '.PYPPPYP.',
  'PPPPPPPPP',
]
const POM = [
  '.P.P.P.',
  'P.PPP.P',
  '.PPPPP.',
  'PPPPPPP',
  '.PPPPP.',
  'P.PPP.P',
  '...K...',
  '...K...',
  '...K...',
]
const PANCAKE = [
  '....BB.....',
  '..YYYYYYY..',
  '.OOOOOOOOO.',
  '..YYYYYYY..',
  '.OOOOOOOOO.',
  '..YYYYYYY..',
  '.OOOOOOOOO.',
  'WWWWWWWWWWW',
]
const PANCAKE_C = { B: '#fff1b0', Y: '#d9774a', O: '#f2c75c', W: '#fff4e2' }
const COOKIE = [
  '..CCCCC..',
  '.CCKCCCC.',
  'CCCCCCKCC',
  'CKCCCCCCC',
  'CCCCKCCCC',
  '.CCCCCKC.',
  '..CCCCC..',
]
const COOKIE_C = { C: '#d9a05a', K: '#5b2e1a' }
const BOX = [
  'KKKKKKKKKKKK',
  'KBBBBTTBBBBK',
  'KBBBBTTBBBBK',
  'KBBBBBBBBBBK',
  'KBBBBBBBBBBK',
  'KKKKKKKKKKKK',
]
const BOX_C = { K: '#7a5230', B: '#c98f5a', T: '#e9d6a8' }
const TUB = [
  '.W.WW.W.WW.W.WW.',
  'WWWWWWWWWWWWWWWW',
  'TTTTTTTTTTTTTTTT',
  'TTTTTTTTTTTTTTTT',
  '.TTTTTTTTTTTTTT.',
  '..TTTTTTTTTTTT..',
  '..K..........K..',
]
const TUB_C = { W: '#ffffff', T: '#cfe9ff', K: '#9aa5c4' }
const DUCK = [
  '..YYY...',
  '.YYKYY..',
  '.YYYYYOO',
  '..YYY...',
  'YYYYYYY.',
  'YYYYYYYY',
  '.YYYYYY.',
]
const DUCK_C = { Y: '#ffd23a', K: INK, O: ORANGE }
const MASK = ['KKKKKKKKKKKKKKKKKK', 'KPPPPPPKKKKPPPPPPK', 'KPPPPPPKKKKPPPPPPK', 'KKKKKKKKKKKKKKKKKK']

// a dimmer slider on a wall plate; v 1 → 0.3
function dimmer(x, cx, cy, k, v) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-74, -170, 148, 340); x.fillStyle = BONE; x.fillRect(-66, -162, 132, 324)
  x.fillStyle = '#2a2350'; x.fillRect(-10, -130, 20, 260)
  const y = lerp(130, -130, v)
  x.fillStyle = INK; x.fillRect(-46, y - 22, 92, 44); x.fillStyle = GOLD; x.fillRect(-40, y - 16, 80, 32)
  x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText('BRIGHT', 0, -150); x.fillText('COZY', 0, 150)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Hosting party number four? | *Let someone else.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P, F) {
      const n = Math.min(4, Math.floor(Math.max(0, lt - 0.2) / 0.3) + 1)
      for (let i = 0; i < n; i++) drawBits(x, HAT, { P: [PINK, MINT, SKYB, GOLD][i], Y: BONE }, F.x + 10, F.top - 30 - i * 62, 9)
      label(x, 790, 760, `PARTY #${n}: AT YOURS`, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 960, 'my turn! | sit down.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, col: MINT, tail: 'bl' })
    } },
  { sign: S, cap: 'Shining nonstop? | *Cozy mode is allowed.*', mood: lt => lt > 1.4 ? 'sleepy' : 'sparkle', look: [1, 0], star: { x: -170 },
    back(x, t, lt, P, F) {
      const v = 1 - 0.7 * ease.inOutCubic(prog(lt, 0.8, 1.5))
      x.save(); x.globalAlpha = 0.5 * v; x.fillStyle = '#fff1b0'; x.beginPath(); x.arc(F.x, F.cy, 200, 0, Math.PI * 2); x.fill(); x.restore()
      dimmer(x, 800, 870, pop01(t, P.t0 + 0.2, 0.35, 2), v)
    },
    front(x, t, lt, P) {
      label(x, 800, 640, lt > 1.5 ? 'GLOW: COZY' : 'GLOW: 24/7', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 34, bg: lt > 1.5 ? LAV : GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Everyone’s hype person? | *You deserve one too.*', mood: lt => lt > 1.4 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.4, 0.8, 1.5],
    front(x, t, lt, P, F) {
      drawBits(x, POM, { P: GOLD, K: INK }, F.x - 120, F.cy - 40 + Math.sin(t * 12) * 14, 10)
      drawBits(x, POM, { P: GOLD, K: INK }, F.x + 120, F.cy - 40 - Math.sin(t * 12) * 14, 10)
      const k = pop01(t, P.t0 + 1.0, 0.35, 2)
      if (k > 0.01) { signChar(x, t, 'aries', 810, 960, 200 * k, { mood: 'sparkle', look: [-1, 0], seed: 61, glyph: false, hops: [P.t0 + 1.4, P.t0 + 1.8] }); drawBits(x, POM, { P: PINK, K: INK }, 930, 880 + Math.sin(t * 12) * 14, 9 * k) }
      bubble(x, 800, 650, 'GO LEO GO!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, col: PINK, tail: 'bc' })
    } },
  { sign: S, cap: 'Even the mane | *needs a nap.*', mood: 'sleepy', star: { x: -170 },
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.5, 0.25, 2.2)
      if (k > 0.01) drawBits(x, MASK, { K: INK, P: PINK }, F.x, F.cy - 26, 11 * k)
      label(x, 790, 760, 'DO NOT DISTURB', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 36, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 960, 'BACK AT: LATER', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.04 })
      zzz(x, t, F.x + 90, F.cy - 120, { n: 3, size: 48 })
    } },
  { sign: S, cap: 'Said yes to everything? | *Try “next week.”*', mood: lt => lt > 1.5 ? 'happy' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      phone(x, 790, 870, pop01(t, P.t0 + 0.2, 0.35, 2), { head: 'INVITES', headBg: LCOL, msgs: [
        { text: 'brunch?', side: 'l', k: pop01(t, P.t0 + 0.4, 0.25, 2) },
        { text: 'help me move?', side: 'l', k: pop01(t, P.t0 + 0.7, 0.25, 2) },
        { text: 'gala tonight?', side: 'l', k: pop01(t, P.t0 + 1.0, 0.25, 2) },
        { text: 'next week ♡', side: 'r', col: MINT, k: pop01(t, P.t0 + 1.5, 0.25, 2.2) },
      ] })
    } },
  { sign: S, cap: 'Performing at brunch? | *You can just eat.*', mood: lt => lt > 1.4 ? 'heart' : 'wink', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, PANCAKE, PANCAKE_C, 790, 920, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 660, lt > 1.3 ? 'SHOW: CANCELLED' : 'ACT 1: THE ENTRANCE', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 30, bg: lt > 1.3 ? MINT : GOLD, rot: -0.04 })
      bubble(x, 380, 600, 'mm. syrup.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, tail: 'bc' })
    } },
  { sign: S, cap: 'Refreshing for a reply? | *Phone down. Snack up.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: { x: -170 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const flip = ease.inOutCubic(prog(lt, 0.8, 1.2))
      x.save(); x.translate(790, 820); x.scale(1, 1 - 1.4 * flip > 0 ? 1 - 1.4 * flip : 0.18); x.translate(-790, -820)
      phone(x, 790, 820, pop01(t, P.t0 + 0.2, 0.35, 2) * 0.8, { head: '♌︎ MATCH', headBg: LCOL, msgs: [{ text: 'typing…', side: 'l', col: BONE }] })
      x.restore()
      drawBits(x, COOKIE, COOKIE_C, 790, 1010, 18 * pop01(t, P.t0 + 1.2, 0.3, 2.2), { rot: 0.1 })
      label(x, 790, 1150, 'REPLY: WHENEVER', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Carrying everyone’s stuff? | *Share the load.*', mood: lt => lt > 1.5 ? 'happy' : 'wide', star: { x: -170, y: 60 },
    front(x, t, lt, P, F) {
      const gone = lt > 1.3 ? Math.min(3, Math.floor((lt - 1.3) / 0.2) + 1) : 0
      for (let i = gone; i < 5; i++) drawBits(x, BOX, BOX_C, F.x + (i % 2 ? 10 : -10), F.top - 40 - (i - gone) * 76, 14, { rot: i % 2 ? 0.04 : -0.04 })
      label(x, 760, 640, 'EVERYONE’S STUFF', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 30, bg: GOLD, rot: 0.04 })
      const k = pop01(t, P.t0 + 1.1, 0.35, 2)
      if (k > 0.01) { signChar(x, t, 'taurus', 790, 1000, 190 * k, { mood: 'happy', look: [-1, 0], seed: 62, glyph: false }); for (let i = 0; i < gone; i++) drawBits(x, BOX, BOX_C, 790, 890 - i * 76, 12 * k) }
    } },
  { sign: S, cap: 'Bubble bath, no audience? | *Royal behaviour.*', mood: 'sleepy', star: { x: -40, y: -30, s: 260 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, TUB, TUB_C, 540, 1000, 30 * pop01(t, P.t0 + 0.1, 0.3, 2))
      drawBits(x, DUCK, DUCK_C, 800, 900 + Math.sin(t * 3) * 6, 14 * pop01(t, P.t0 + 0.8, 0.3, 2.2))
      sparkles(x, t, 540, 850, P.t0 + 1.0, 8, 240, 0.2, [BONE, SKYB, '#ffffff'])
      label(x, 540, 640, 'SPA: OPEN', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0468', key: 'C', accent: ORANGE, solo: S, ending: 'callback',
  title: 'Signs a Leo | *needs a break.*',
  cameos: CAMEOS,
  group: { cap: 'Rest is | *still radiant.*', mood: 'sparkle' },
  last: {
    text: 'The rubber duck? | *Also on break.*',
    draw(x, t, lt) {
      const t0 = t - lt
      drawBits(x, DUCK, DUCK_C, 540, 1050 + Math.sin(t * 3) * 8, 28 * pop01(t, t0 + 0.3, 0.45, 1.8))
      if (lt > 1.0) drawBits(x, MASK, { K: INK, P: PINK }, 526, 995, 6 * pop01(t, t0 + 1.0, 0.25, 2.2))
      zzz(x, t, 640, 920, { n: 3, size: 50, alpha: clamp(lt - 1.2) })
      label(x, 540, 1250, 'OUT OF OFFICE', pop01(t, t0 + 1.4, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.04 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
