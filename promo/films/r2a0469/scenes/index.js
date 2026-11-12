// r2a0469: THE SIGNS AS… v3, ADVICE ROLL CALL (star_advice), "Each sign's | bedtime reminder." (~54 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs in zodiac order, one warm, specific reminder each before sleep, each with one light visual gag.
//   0.0–3.6    "Each sign’s | *bedtime reminder.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ round two: tomorrow · ♉ your pillow misses you (psst) · ♊ fifty thoughts, jarred till morning
//              · ♋ everyone's okay, the group chat says sleep · ♌ stage lights off, still a star · ♍ the to-do list is asleep too
//              · ♎ tomorrow's outfit is tomorrow's problem · ♏ their text was nice, believe it · ♐ dreams are free travel, board now
//              · ♑ you did enough, clocked out · ♒ the universe will wait · ♓ happy tears count, now sleep
//  49.2        group ending: "Goodnight, | *every sign.*"  The twelve, sleepy, in one photo under a moon.
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
const PILLOW = [
  '.WWWWWWWWWWWW.',
  'WWWWWWWWWWWWWW',
  'WWWKWWWWWWKWWW',
  'WWWWWWWWWWWWWW',
  'WWWWWPWWPWWWWW',
  'WWWWWWPPWWWWWW',
  'WWWWWWWWWWWWWW',
  '.WWWWWWWWWWWW.',
]
const PILLOW_C = { W: '#e8e0ff', K: INK, P: PINK }
const JAR = [
  '.KKKKKKK.',
  '.LLLLLLL.',
  'G.......G',
  'G.......G',
  'G.......G',
  'G.......G',
  'G.......G',
  '.GGGGGGG.',
]
const JAR_C = { K: WOOD, L: '#c98f5a', G: '#bfe8ff' }
const HANGER = [
  '....KK....',
  '...K..K...',
  '......K...',
  '.....K....',
  '...KK.KK..',
  '..K.....K.',
  '.KKKKKKKKK',
]
const SHIRT = [
  'CC.....CC',
  'CCCCCCCCC',
  '.CCCCCCC.',
  '.CCCCCCC.',
  '.CCCCCCC.',
  '.CCCCCCC.',
]
const TISSUE = [
  '...WWW...',
  '..WWWWW..',
  'BBBBBBBBB',
  'BPBPBPBPB',
  'BBBBBBBBB',
  'BPBPBPBPB',
  'BBBBBBBBB',
]
const TISSUE_C = { W: '#ffffff', B: SKYB, P: '#cfe9ff' }

// a window with a night sky; stars twinkle
function nightWindow(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -150, 300, 300)
  x.fillStyle = WOOD; x.fillRect(-142, -142, 284, 284)
  x.fillStyle = '#140c30'; x.fillRect(-126, -126, 252, 252)
  for (let i = 0; i < 14; i++) { const sx = -110 + ((i * 73) % 220), sy = -110 + ((i * 131) % 220); x.globalAlpha = 0.5 + 0.5 * Math.sin(t * 3 + i); x.fillStyle = i % 3 ? BONE : GOLD; x.fillRect(sx, sy, i % 4 ? 6 : 10, i % 4 ? 6 : 10) }
  x.globalAlpha = 1
  x.fillStyle = WOOD; x.fillRect(-142, -6, 284, 12); x.fillRect(-6, -142, 12, 284)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Today’s battles? | *Paused till breakfast.*', mood: lt => lt > 1.3 ? 'sleepy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      label(x, 790, 760, lt > 1.2 ? 'ROUND 2: TOMORROW' : 'ROUND 2: NOW!', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 34, bg: lt > 1.2 ? LAV : RED, color: lt > 1.2 ? INK : PAPER, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 960, 'fine. after | pancakes.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Your pillow misses you. | *Go say hi.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.4],
    front(x, t, lt, P) {
      drawBits(x, PILLOW, PILLOW_C, 790, 920, 20 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.04 + 0.03 * Math.sin(t * 2) })
      bubble(x, 800, 700, 'psst. | come here.', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 36, col: LAV, tail: 'bc' })
      hearts(x, t, 790, 860, P.t0 + 1.4, { n: 4, life: 1.4, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: 'gemini', cap: 'Fifty thoughts at once? | *Jar them till morning.*', mood: lt => lt > 1.5 ? 'sleepy' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P, F) {
      drawBits(x, JAR, JAR_C, 800, 950, 27 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const WORDS = ['what if…', 'emails!', 'that one thing', 'tacos?', 'aliens']
      WORDS.forEach((w, i) => {
        const p = ease.inOutCubic(prog(lt, 0.5 + i * 0.15, 1.1 + i * 0.15))
        if (p <= 0 || p >= 1) return
        bubble(x, lerp(F.x + (i % 2 ? 60 : -40), 800, p), lerp(640 + (i % 3) * 40, 960, p), w, (1 - 0.6 * p), { size: 30, tail: 'bc' })
      })
      label(x, 800, 1160, 'OPEN: 8 A.M.', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Everyone’s okay. | *You can sleep.*', mood: lt => lt > 1.4 ? 'sleepy' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      phone(x, 790, 870, pop01(t, P.t0 + 0.2, 0.35, 2), { head: 'THE GROUP', headBg: '#3fb6f0', msgs: [
        { text: 'everyone ok?', side: 'r', col: SKYB, k: pop01(t, P.t0 + 0.4, 0.25, 2) },
        { text: 'all good!', side: 'l', k: pop01(t, P.t0 + 0.8, 0.25, 2) },
        { text: 'go to SLEEP ♡', side: 'l', col: PINK, k: pop01(t, P.t0 + 1.2, 0.25, 2) },
      ] })
    } },
  { sign: 'leo', cap: 'Stage lights off. | *Still a star.*', mood: lt => lt > 1.3 ? 'sleepy' : 'sparkle', star: { x: -170 },
    back(x, t, lt, P, F) {
      const on = 1 - ease.inOutCubic(prog(lt, 0.8, 1.2))
      if (on > 0.01) { x.save(); x.globalAlpha = 0.25 * on; x.fillStyle = '#fff1b0'; x.beginPath(); x.moveTo(F.x - 40, 500); x.lineTo(F.x + 40, 500); x.lineTo(F.x + 200, 1100); x.lineTo(F.x - 200, 1100); x.fill(); x.restore() }
    },
    front(x, t, lt, P, F) {
      label(x, 790, 760, lt > 1.2 ? 'LIGHTS: OFF' : 'LIGHTS: ON', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 36, bg: lt > 1.2 ? LAV : GOLD, rot: 0.04, font: MONO, weight: 700 })
      if (lt > 1.3) sparkles(x, t, F.x, F.cy, P.t0 + 1.35, 7, 170, 0.3, [GOLD, BONE, ORANGE])
      bubble(x, 790, 960, 'glowing in | my sleep', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Your to-do list | *is asleep too.*', mood: lt => lt > 1.4 ? 'sleepy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      card(x, 790, 860, k, { w: 280, h: 320, title: 'TO DO', titleBg: '#ef5c94', lines: ['laundry', 'emails', 'fix the', 'everything'], size: 28 })
      const b = ease.outCubic(prog(lt, 0.8, 1.3))
      if (b > 0.01) { x.save(); x.translate(790, 860); x.rotate(0.04); x.fillStyle = INK; x.fillRect(-156, 160 - 220 * b - 6, 312, 220 * b + 12); x.fillStyle = LAV; x.fillRect(-150, 160 - 220 * b, 300, 220 * b); x.fillStyle = '#b48cff'; for (let i = 0; i < 5; i++) x.fillRect(-150 + i * 64, 160 - 220 * b, 30, 220 * b); x.restore() }
      if (lt > 1.3) zzz(x, t, 880, 700, { n: 3, size: 48 })
    } },
  { sign: 'libra', cap: 'Tomorrow’s outfit? | *Tomorrow’s problem.*', mood: lt => lt > 1.4 ? 'sleepy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      const sw = lt < 1.3 ? Math.sin(lt * 9) : 0
      ;[[700, PINK], [880, MINT]].forEach(([hx, c], i) => {
        const y = 860 + (i ? -1 : 1) * sw * 30
        drawBits(x, HANGER, { K: '#d8dbe8' }, hx, y - 80, 10 * k)
        drawBits(x, SHIRT, { C: c }, hx, y + 10, 18 * k)
      })
      label(x, 790, 1100, 'DECIDE: TOMORROW', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04 })
    } },
  { sign: 'scorpio', cap: 'Their text was nice. | *Believe it.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 }, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { head: '♓︎ YOUR MATCH', headBg: '#7c74f0', msgs: [{ text: 'had fun | tonight :)', side: 'l', col: PINK }] })
      const n = Math.min(9, 1 + Math.floor(Math.max(0, lt - 0.3) / 0.12))
      label(x, 790, 1110, lt > 1.4 ? 'BELIEVED ✓' : `READ ${n}×`, pop01(t, P.t0 + 0.4, 0.3, 2), { size: 34, bg: lt > 1.4 ? MINT : LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Dreams are free travel. | *Board now.*', mood: lt => lt > 1.3 ? 'sleepy' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      card(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 340, h: 250, title: 'BOARDING PASS', titleBg: '#a35cf0', lines: ['to: anywhere', 'seat: your bed', 'departs: now'], size: 28, rot: -0.04 })
      label(x, 790, 1080, 'NOW BOARDING', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'You did enough today. | *Clock out.*', mood: lt => lt > 1.3 ? 'sleepy' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      card(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 280, h: 300, title: 'TIME CARD', titleBg: '#2fc79a', titleCol: INK, lines: ['in: 7:00', 'out: …'], size: 32 })
      label(x, 790, 900, 'CLOCKED OUT', pop01(t, P.t0 + 1.0, 0.22, 3), { size: 40, bg: RED, color: PAPER, rot: -0.12, font: MONO, weight: 700 })
      bubble(x, 380, 600, 'oh. okay.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, tail: 'bc' })
    } },
  { sign: 'aquarius', cap: 'The universe | *will wait.*', mood: lt => lt > 1.4 ? 'sleepy' : 'sparkle', look: [1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      nightWindow(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 1080, 'OPEN TOMORROW TOO', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Happy tears count. | *Now sleep.*', mood: lt => lt > 1.4 ? 'sleepy' : 'happy', tears: lt => lt > 1.4 ? 1 : 2, look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, TISSUE, TISSUE_C, 790, 920, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 700, 'TISSUES: STOCKED', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 30, bg: LAV, rot: 0.04 })
      bubble(x, 790, 1110, 'goodnight, | feelings', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2a0469', key: 'E', accent: LAV, ending: 'group',
  title: 'Each sign’s | *bedtime reminder.*',
  cameos: CAMEOS,
  group: {
    cap: 'Goodnight, | *every sign.*', moods: Array(12).fill('sleepy'),
    draw(x, t, lt) {
      drawBits(x, MOON, { M: '#fff1b0' }, 900, 700, 14 * pop01(t, t - lt + 0.8, 0.4, 2), { rot: -0.1 })
      zzz(x, t, 560, 760, { n: 3, size: 60, alpha: clamp(lt - 1.4) })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
