// r2a0470: THE SIGNS AS… v3, ADVICE ROLL CALL (star_advice), "Each sign's reason | to smile today." (~54 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs in zodiac order, one small, specific good thing each, with one light visual gag.
//   0.0–3.6    "Each sign’s reason | *to smile today.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ you started the brave thing (day 1 flag) · ♉ your favourite mug is clean · ♊ your joke landed, twice
//              · ♋ someone saved you the last cookie · ♌ a stranger loved your jacket · ♍ every sock found its pair
//              · ♎ shuffle picked the perfect song · ♏ someone remembered your little thing · ♐ green lights the whole way
//              · ♑ inbox: zero · ♒ your match loved your weird fact · ♓ the sunset was just for you (happy tears)
//  49.2        group ending: "Twelve reasons. | *Now smile.*"  The twelve, all smiles, in one photo.
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
const FLAG = [
  'KRRRRRR',
  'KRRRRRRR',
  'KRRRRRR.',
  'KRRRRR..',
  'K.......',
  'K.......',
  'K.......',
  'K.......',
  'K.......',
  'GGGGGGGG',
  'GGGGGGGGGG',
]
const FLAG_C = { K: '#2a2350', R: RED, G: '#5fd068' }
const MUG = [
  'PPPPPPPPP..',
  'PCCCCCCCPPP',
  'PPPPPPPPP.P',
  'PPPHPHPPP.P',
  'PPPHHHPPPPP',
  'PPPPHPPPP..',
  '.PPPPPPP...',
]
const MUG_C = { S: '#d8dbe8', P: PINK, C: '#8a4a2e', H: '#ffffff' }
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
const SOCK = [
  '.SSS.',
  '.SXS.',
  '.SSS.',
  '.SXS.',
  '.SSSS',
  'SSSSS',
  'SSSS.',
]
const SPEAKER = [
  'KKKKKKKKK',
  'KGGGGGGGK',
  'KGGKKKGGK',
  'KGKGGGKGK',
  'KGKGWGKGK',
  'KGKGGGKGK',
  'KGGKKKGGK',
  'KGGGGGGGK',
  'KKKKKKKKK',
]
const SPEAKER_C = { K: '#2a2350', G: '#6b62a8', W: BONE }
const LIGHT = [
  'KKKKK',
  'KDDDK',
  'KDDDK',
  'KKKKK',
  'KDDDK',
  'KDDDK',
  'KKKKK',
  'KGGGK',
  'KGGGK',
  'KKKKK',
  '..K..',
  '..K..',
  '..K..',
]
const LIGHT_C = { K: '#2a2350', D: '#3a2e55', G: MINT }
const GIFTB = [
  '...PP.PP...',
  '....PPP....',
  'MMMMMPMMMMM',
  '.LLLLPLLLL.',
  '.LLLLPLLLL.',
  '.LLLLPLLLL.',
  '.LLLLPLLLL.',
]
const GIFTB_C = { P: GOLD, M: '#7c74f0', L: '#b48cff' }
const JACKET = [
  'JJJ...JJJ',
  'JJJJ.JJJJ',
  'JJJJYJJJJ',
  'JJJJYJJJJ',
  'JJ.JYJ.JJ',
  'JJ.JYJ.JJ',
  'JJ.JJJ.JJ',
]

function sunset(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -130, 340, 260)
  const B = ['#ff8fb1', '#ffb34a', '#ffd23a', '#ff9a4a']
  B.forEach((c, i) => { x.fillStyle = c; x.fillRect(-162, -122 + i * 40, 324, 40) })
  x.fillStyle = '#fff1b0'; x.beginPath(); x.arc(0, 40, 60, Math.PI, 0); x.fill()
  x.fillStyle = '#3d7cb8'; x.fillRect(-162, 40, 324, 82)
  x.fillStyle = '#8fe3ff'; for (let i = 0; i < 4; i++) x.fillRect(-50 + Math.sin(t * 2 + i) * 8, 56 + i * 16, 100 - i * 20, 6)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'You started the brave thing. | *That counts.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, FLAG, FLAG_C, 800, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.02 * Math.sin(t * 3) })
      label(x, 800, 660, 'DAY 1: DONE', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 38, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 800, 840, P.t0 + 1.2, 7, 160, 0.3)
    } },
  { sign: 'taurus', cap: 'Your favourite mug | *is clean.*', mood: lt => lt > 1.0 ? 'heart' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, MUG, MUG_C, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      sparkles(x, t, 790, 900, P.t0 + 0.7, 8, 170, 0.5, [BONE, '#ffffff', GOLD])
      label(x, 790, 660, 'THE ONE. THE MUG.', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 32, bg: '#e9b24a', rot: 0.04 })
    } },
  { sign: 'gemini', cap: 'Your joke landed. | *Twice.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.9, 1.5],
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'HA HA HA', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 44, col: GOLD, tail: 'bc' })
      bubble(x, 790, 960, 'stop, MY RIBS', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 38, col: PINK, tail: 'bl' })
      label(x, 790, 1120, 'ENCORE!', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 38, bg: MINT, rot: -0.04 })
    } },
  { sign: 'cancer', cap: 'Someone saved you | *the last cookie.*', mood: lt => lt > 1.1 ? 'heart' : 'wide', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, COOKIE, COOKIE_C, 790, 900, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.06 })
      label(x, 790, 700, 'FOR YOU ♡', pop01(t, P.t0 + 0.7, 0.3, 2.2), { size: 36, bg: PINK, rot: -0.05 })
      hearts(x, t, 790, 860, P.t0 + 1.2, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 1 })
    } },
  { sign: 'leo', cap: 'A stranger loved | *your jacket.*', mood: lt => lt > 1.1 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.2],
    front(x, t, lt, P, F) {
      drawBits(x, JACKET, { J: '#e23d4e', Y: GOLD }, F.x, F.cy + 90, 16 * pop01(t, P.t0 + 0.15, 0.3, 2))
      bubble(x, 790, 760, 'love that | jacket!', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 40, col: MINT, tail: 'bl' })
      sparkles(x, t, F.x, F.cy, P.t0 + 1.2, 8, 190, 0.2, [GOLD, ORANGE, BONE])
      label(x, 790, 1040, 'MADE. MY. DAY.', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04 })
    } },
  { sign: 'virgo', cap: 'Every sock | *found its pair.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const pair = ease.inOutCubic(prog(lt, 0.6, 1.3))
      const C3 = [{ S: PINK, X: '#fff' }, { S: MINT, X: '#fff' }, { S: SKYB, X: '#fff' }]
      C3.forEach((c, i) => {
        const y = 760 + i * 130
        drawBits(x, SOCK, c, lerp(680 + i * 30, 770, pair), y + lerp(i * 20, 0, pair), 14 * pop01(t, P.t0 + 0.2 + i * 0.1, 0.3, 2), { rot: lerp(-0.3, 0, pair) })
        drawBits(x, SOCK, c, lerp(920 - i * 40, 840, pair), y + lerp(-i * 30, 0, pair), 14 * pop01(t, P.t0 + 0.3 + i * 0.1, 0.3, 2), { rot: lerp(0.4, 0, pair) })
      })
      label(x, 800, 1140, 'PAIRS: ALL OF THEM', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.04 })
    } },
  { sign: 'libra', cap: 'Shuffle picked | *the perfect song.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 }, hops: [0.8, 1.3, 1.8],
    front(x, t, lt, P) {
      drawBits(x, SPEAKER, SPEAKER_C, 800, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { sx: 1 + 0.04 * Math.sin(t * 14), sy: 1 + 0.04 * Math.sin(t * 14) })
      notes(x, t, 800, 760, { n: 5, cell: 7, col: PINK, seed: 3 })
      label(x, 800, 1120, 'SHUFFLE: PERFECT', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 32, bg: '#e163d6', color: INK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Someone remembered | *your little thing.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, GIFTB, GIFTB_C, 790, 930, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      card(x, 790, 700, pop01(t, P.t0 + 0.6, 0.3, 2), { w: 330, h: 110, lines: ['you said this once!'], size: 28, rot: -0.04 })
      hearts(x, t, 560, 800, P.t0 + 1.3, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 4 })
      label(x, 790, 1110, 'NOTICED. ♡', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: PINK, rot: 0.04 })
    } },
  { sign: 'sagittarius', cap: 'Green lights | *the whole way.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const n = Math.min(3, Math.floor(Math.max(0, lt - 0.2) / 0.35) + 1)
      for (let i = 0; i < n; i++) drawBits(x, LIGHT, LIGHT_C, 670 + i * 125, 880 + (i % 2) * 30, 15 * pop01(t, P.t0 + 0.2 + i * 0.35, 0.3, 2.2))
      label(x, 800, 650, 'GREEN. GREEN. GREEN.', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 380, 600, 'the universe | likes me!', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, tail: 'bc' })
    } },
  { sign: 'capricorn', cap: 'Inbox: zero. | *Breathe it in.*', mood: lt => lt > 1.1 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -170 }, hops: [1.2],
    front(x, t, lt, P) {
      const n = Math.max(0, 9 - Math.floor(Math.max(0, lt - 0.3) * 10))
      label(x, 790, 860, `INBOX: ${n}`, pop01(t, P.t0 + 0.2, 0.3, 2), { size: 56, bg: n ? BONE : MINT, rot: 0.03, font: MONO, weight: 700 })
      confetti(x, t, 790, 860, P.t0 + 1.2)
      bubble(x, 380, 600, 'so… quiet.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, tail: 'bc' })
    } },
  { sign: 'aquarius', cap: 'Your match loved | *your weird fact.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 790, 870, pop01(t, P.t0 + 0.2, 0.35, 2), { head: '♎︎ YOUR MATCH', headBg: '#e163d6', msgs: [
        { text: 'snails have | teeth btw', side: 'r', col: SKYB, k: pop01(t, P.t0 + 0.4, 0.25, 2) },
        { text: 'WAIT. tell | me more', side: 'l', col: PINK, k: pop01(t, P.t0 + 1.1, 0.25, 2) },
      ] })
      hearts(x, t, 560, 760, P.t0 + 1.3, { n: 4, life: 1.4, spread: 120, cell: 7, seed: 6 })
    } },
  { sign: 'pisces', cap: 'The sunset was | *just for you.*', mood: 'sparkle', tears: 2, look: [1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      sunset(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 1080, 'HAPPY TEARS ONLY', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: PINK, rot: -0.04 })
    } },
]

const F = makeFilm({
  id: 'r2a0470', key: 'G', accent: GOLD, ending: 'group',
  title: 'Each sign’s reason | *to smile today.*',
  cameos: CAMEOS,
  group: {
    cap: 'Twelve reasons. | *Now smile.*', moods: Array(12).fill('happy'),
    draw(x, t, lt) {
      sparkles(x, t, 540, 1150, t - lt + 1.2, 12, 420, 0.2)
      hearts(x, t, 540, 860, t - lt + 1.5, { n: 8, life: 2.2, spread: 700, cell: 8, seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
