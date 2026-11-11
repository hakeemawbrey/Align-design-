// v3a045: star_advice, ADVICE SOLO, "Aries, your gift | is this." (~45 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole way through (solo mode, 9 cards): the brave, lovely things Aries does for everyone, one gag each.
// Ending: 'callback' (no lesson): the match from card 8 replies just as fast.
//   0.0–3.6    "Aries, your gift | *is this.*"  One big Aries pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              jumps in the cold lake first, then everyone's in · "snack break?" (the room: relieved) · starts the dance floor
//              · jump-starts a sleepy Taurus with cables · "HEY. they look GREAT." · tears up the grudge list
//              · SOMEDAY → TODAY · "you matched with Libra!" "hi!!" (sent instantly) · the cheer meter: VOLUME: YES
//  37.8        "Brave. | *Out loud.*"  Aries comes back, big.
//  41.2        "Libra replied. | *Just as fast.*"  The phone comes back with "hi!!" from Libra.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, notes,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', TEAL = '#2fc79a', FLAME = '#ff6b5a', WATER = '#3f8fe0'
const S = 'aries'

function slab(x, cx, cy, w, h, k, { bg = BONE, rot = 0, inner = null, pad = 14 } = {}) {
  if (k <= 0.01) return false
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  if (inner) { x.fillStyle = inner; x.fillRect(-w / 2 + pad, -h / 2 + pad, w - 2 * pad, h - 2 * pad) }
  return true
}
const txt = (x, s, X, Y, size, col = INK, font = INTER, w = 800) => { x.fillStyle = col; x.font = `${w} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, X, Y) }

// the match phone (card 8 and the callback)
function phone(x, cx, cy, k, lines, rot = 0.04) {
  if (!slab(x, cx, cy, 280, 410, k, { bg: '#2a2350', inner: '#140c30', rot })) return
  x.fillStyle = PINK; x.fillRect(-120, -180, 240, 54); txt(x, 'NEW MATCH: LIBRA', 0, -152, 22, INK, MONO, 700)
  lines.forEach(([s, me], i) => { const y = -80 + i * 80; x.fillStyle = me ? FLAME : LAV; x.fillRect(me ? -10 : -110, y - 30, 120, 60); txt(x, s, me ? 50 : -50, y, 30) })
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'You go first | so others *feel brave.*', mood: lt => lt > 1.1 ? 'sparkle' : 'happy', star: { x: -200, y: -40 }, hops: [0.7],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.1, 0.3, 2)
      if (k > 0.01) { x.save(); x.globalAlpha = clamp(k); x.fillStyle = INK; x.fillRect(110, 1010, 860, 210); x.fillStyle = WATER; x.fillRect(118, 1018, 844, 194); x.fillStyle = '#7fc0ff'; for (let i = 0; i < 8; i++) x.fillRect(150 + i * 100 + 20 * Math.sin(t * 2 + i), 1050 + (i % 2) * 60, 50, 8); x.restore() }
    },
    front(x, t, lt, P) {
      const ids = ['cancer', 'virgo', 'pisces']
      ids.forEach((id, i) => {
        const k = pop01(t, P.t0 + 0.2, 0.3, 2), jump = ease.inOutCubic(prog(lt, 1.2 + i * 0.2, 1.5 + i * 0.2))
        if (k > 0.01) signChar(x, t, id, lerp(640 + i * 120, 600 + i * 130, jump), lerp(820, 1040, jump) - Math.sin(Math.PI * jump) * 120, 130 * k, { mood: jump > 0.9 ? 'happy' : 'wide', look: [-1, 0], seed: 61 + i, glyph: false, tears: id === 'pisces' ? 1 : 0 })
      })
      if (lt > 0.85 && lt < 1.3) for (let i = 0; i < 8; i++) { const a = Math.PI + (i / 7) * Math.PI, r = 60 + (lt - 0.85) * 200; x.fillStyle = '#cfe8ff'; x.fillRect(340 + Math.cos(a) * r - 8, 1010 + Math.sin(a) * r - 8, 16, 16) }
      label(x, 540, 610, "NOW EVERYONE'S IN", pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You say what | *everyone’s thinking.*', mood: lt => lt > 1.2 ? 'wink' : 'happy', star: { x: -220, y: 30 }, hops: [0.5],
    front(x, t, lt, P) {
      bubble(x, 420, 620, 'snack break?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, tail: 'bl' })
      const ids = ['capricorn', 'taurus', 'gemini']
      ids.forEach((id, i) => {
        const k = pop01(t, P.t0 + 0.4 + i * 0.1, 0.3, 2), yes = lt > 1.0 + i * 0.12
        if (k > 0.01) signChar(x, t, id, 640 + i * 125, 970 + (yes ? 10 * Math.sin(t * 12 + i) : 0), 140 * k, { mood: yes ? 'heart' : 'neutral', look: [-1, 0], seed: 64 + i, glyph: false })
      })
      label(x, 760, 790, 'ROOM: RELIEVED', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You start | the *dance floor.*', mood: 'sparkle', star: { x: -200, y: -10 }, hops: [0.4, 0.8, 1.2, 1.6, 2.0],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.1, 0.3, 2)
      if (k <= 0.01) return
      const COLS = [PINK, GOLD, SKYB, MINT, LAV]
      for (let r = 0; r < 2; r++) for (let c = 0; c < 8; c++) { const on = (c + r + Math.floor(t * 4)) % 3 === 0; x.fillStyle = INK; x.fillRect(130 + c * 103, 1000 + r * 100, 103, 100); x.fillStyle = on ? COLS[(c + r) % 5] : '#2a2350'; x.fillRect(136 + c * 103, 1006 + r * 100, 91, 88) }
    },
    front(x, t, lt, P) {
      notes(x, t, 360, 800, { n: 4, cell: 7, col: FLAME, seed: 1 })
      const ids = ['libra', 'leo']
      ids.forEach((id, i) => { const k = pop01(t, P.t0 + 1.0 + i * 0.3, 0.35, 2); if (k > 0.01) signChar(x, t, id, 690 + i * 160, 930, 150 * k, { mood: 'sparkle', seed: 67 + i, glyph: false, hops: [P.t0 + 1.4 + i * 0.3, P.t0 + 1.9 + i * 0.3, P.t0 + 2.4] }) })
      label(x, 760, 640, 'FLOOR: OPEN', pop01(t, P.t0 + 0.5, 0.3, 2.4), { size: 38, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Your energy | *jump-starts* a room.', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -220 }, hops: [1.3],
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), on = lt > 1.1
      if (k > 0.01) signChar(x, t, 'taurus', 820, 920, 210 * k, { mood: on ? 'wide' : 'sleepy', look: [-1, 0], seed: 69, glyph: false, hops: on ? [P.t0 + 1.5, P.t0 + 2.0] : [] })
      const c = pop01(t, P.t0 + 0.5, 0.3, 2)
      if (c > 0.01) {
        x.save(); x.globalAlpha = clamp(c); x.lineWidth = 10
        for (const [col, dy] of [[RED, -16], [INK, 16]]) { x.strokeStyle = col; x.beginPath(); x.moveTo(F.x + 70, F.cy + dy); x.bezierCurveTo(500, 1150 + dy, 650, 1150 + dy, 720, 920 + dy); x.stroke(); x.fillStyle = '#9aa5c4'; x.fillRect(F.x + 60, F.cy + dy - 12, 26, 24); x.fillRect(708, 908 + dy, 26, 24) }
        x.restore()
      }
      if (on && lt < 1.6) for (let i = 0; i < 6; i++) { x.fillStyle = GOLD; const a = i * 1.05 + t * 8; x.fillRect(720 + Math.cos(a) * 60 - 6, 920 + Math.sin(a) * 60 - 6, 12, 12) }
      label(x, 820, 650, 'FULLY CHARGED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You stand up | *for your people.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [-1, 0], star: { x: 40, y: 20, s: 260 }, hops: [0.5],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'pisces', 830, 960, 170 * k, { mood: lt > 1.4 ? 'heart' : 'neutral', look: [-1, 0], seed: 70, glyph: false, tears: lt > 1.4 ? 1 : 2 })
      bubble(x, 300, 620, 'socks with | sandals? ew', pop01(t, P.t0 + 0.3, 0.25, 2.2) * (lt < 1.0 ? 1 : 0), { size: 30, col: '#9aa5c4', tail: 'bc' })
      bubble(x, 520, 600, 'HEY. They look | GREAT.', pop01(t, P.t0 + 1.0, 0.25, 2.4), { size: 40, tail: 'bc' })
      label(x, 830, 1150, 'DEFENDED', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.04 })
    } },
  { sign: S, cap: 'You forgive *fast.* | No grudges.', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: { x: -200 }, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), rip = ease.outCubic(prog(lt, 1.0, 1.4))
      for (const side of [-1, 1]) {
        if (k <= 0.01) break
        x.save(); x.translate(760 + side * rip * 45, 860 + rip * 40); x.rotate(side * rip * 0.18); x.scale(k, k)
        x.beginPath(); x.rect(side < 0 ? -160 : 0, -200, 160, 400); x.clip()
        x.fillStyle = INK; x.fillRect(-146, -186, 292, 372); x.fillStyle = '#fff4e2'; x.fillRect(-140, -180, 280, 360)
        txt(x, 'GRUDGES', 0, -140, 36, RED)
        x.fillStyle = '#b9b0a0'; for (let i = 0; i < 6; i++) x.fillRect(-110, -90 + i * 44, 220 - (i % 2) * 50, 14)
        x.restore()
      }
      label(x, 760, 1130, 'GRUDGES: 0', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: MINT, rot: 0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You turn “someday” | into *today.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -200 }, hops: [1.3],
    front(x, t, lt, P) {
      if (slab(x, 800, 860, 300, 330, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: '#fff4e2', rot: 0.04 })) {
        x.fillStyle = RED; x.fillRect(-150, -165, 300, 70); txt(x, 'PLANS', 0, -130, 34, '#fff4e2')
        txt(x, 'learn to surf:', 0, -50, 28, INK, INTER, 700)
        const on = lt > 1.0
        txt(x, 'SOMEDAY', 0, 30, 44, on ? '#b9b0a0' : INK, MONO, 700)
        if (on) { x.strokeStyle = RED; x.lineWidth = 8; x.beginPath(); x.moveTo(-110, 30); x.lineTo(110, 30); x.stroke(); txt(x, 'TODAY', 0, 104, 54, TEAL, MONO, 700) }
        x.restore()
      }
      sparkles(x, t, 800, 960, P.t0 + 1.1, 7, 170, 0.2)
    } },
  { sign: S, cap: 'You make | the *first move.*', mood: lt => lt > 0.9 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -210 }, hops: [0.9],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt > 0.8 ? [['hi!!', true]] : [])
      label(x, 800, 1140, 'SENT INSTANTLY', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You cheer | the *loudest.*', mood: 'sparkle', star: { x: -200 }, hops: [0.5, 1.0, 1.5, 2.0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        const n = Math.min(10, Math.floor(clamp((lt - 0.3) / 1.2) * 10) + 1)
        for (let i = 0; i < 10; i++) { const h = 30 + i * 18; x.fillStyle = INK; x.fillRect(640 + i * 32 - 3, 1060 - h - 3, 28, h + 6); x.fillStyle = i < n ? (i > 7 ? RED : i > 4 ? GOLD : MINT) : '#2a2350'; x.fillRect(640 + i * 32, 1060 - h, 22, h) }
      }
      bubble(x, 520, 620, 'GO GO GO!!', pop01(t, P.t0 + 0.5, 0.25, 2.4) * (1 + 0.05 * Math.sin(t * 22)), { size: 48, tail: 'bl' })
      label(x, 790, 1130, 'VOLUME: YES', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: RED, color: '#fff4e2', rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3a045', key: 'C', accent: FLAME, solo: S, ending: 'callback',
  title: 'Aries, your gift | *is this.*',
  cameos: CAMEOS,
  group: { cap: 'Brave. | *Out loud.*', mood: 'sparkle' },
  last: {
    text: 'Libra replied. | *Just as fast.*',
    draw(x, t, lt) {
      phone(x, 540, 1000, 1.3 * pop01(t, t - lt + 0.5, 0.35, 2), lt > 1.2 ? [['hi!!', true], ['hi!!', false]] : [['hi!!', true]], -0.03)
      hearts(x, t, 540, 760, t - lt + 1.3, { n: 8, life: 2, spread: 500, cell: 8, seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
