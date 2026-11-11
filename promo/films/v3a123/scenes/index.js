// v3a123: star_advice, ADVICE SOLO, "Virgo, you're allowed | to rest." (~51 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole way through (makeFilm solo mode, 9 cards): permission to rest, Virgo-style, one gag each.
//   0.0–3.6    "Virgo, you’re allowed | *to rest.*"  One big Virgo pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              a to-do list unrolls off the floor: TOMORROW'S PROBLEM · a crooked frame, an eye twitch, then LEFT IT.
//              GROWTH. · a planner page that just says TODAY: ? · Cancer folds a shirt badly, Virgo says "thank you!"
//              · cucumber face mask, inbox closed · the gold star: ENOUGH · crumbs on the counter, the broom goes down
//              · a typo to a match ("so tird") and the reply is "cute." · swaying in a hammock: NO AGENDA
//  37.8        "Perfectly | *imperfect.*"  Virgo comes back, big.
//  41.0        LESSON UNLOCKED: "You don’t have to | *earn your rest.*"  REST: APPROVED
//  46.9        "Frame still crooked. | *Virgo’s fine.*"  (card two, paid off). No match card.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const VG = '#8fd17a', WOOD = '#c98f2a', RED = '#e23d4e'
const S = 'virgo'

// ── props
const SHIRT = ['.BB...BB.', 'BBBB.BBBB', 'BBBBBBBBB', '.BBBBBBB.', '..BBBBB..', '..BBBBB..', '..BBBBB..']
const STARB = ['....Y....', '...YYY...', 'YYYYYYYYY', '.YYYYYYY.', '..YYYYY..', '.YYY.YYY.', 'YY.....YY']
const CUKE = ['.GGG.', 'GLLLG', 'GLDLG', 'GLLLG', '.GGG.']
const CUKE_C = { G: '#3f9c45', L: '#c8f0a8', D: '#8fd17a' }

function phone(x, cx, cy, k, { head = '', headBg = MINT, lines = [], lineBg = '#2a2350', ink = BONE, rot = 0.05 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -182, 256, 380)
  x.fillStyle = INK; x.fillRect(-134, -194, 268, 388)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -184, 248, 368)
  x.fillStyle = '#140c30'; x.fillRect(-112, -160, 224, 320)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  if (head) { x.fillStyle = headBg; x.fillRect(-100, -146, 200, 46); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.fillText(head, 0, -122) }
  lines.forEach(([txt, a, bg], i) => {
    if (a <= 0.01) return
    x.save(); x.translate(0, -40 + i * 92); x.scale(a, a)
    x.fillStyle = bg || lineBg; x.fillRect(-96, -38, 192, 76)
    x.fillStyle = bg ? INK : ink; x.font = `800 26px ${INTER}`
    String(txt).split('|').forEach((l, j, arr) => x.fillText(l.trim(), 0, (j - (arr.length - 1) / 2) * 30 + 2))
    x.restore()
  })
  x.restore()
}
// a paper list that unrolls downward
function scroll(x, t, cx, top, k, len) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, top); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-110, -10, 220, len + 20); x.fillStyle = '#f4eee2'; x.fillRect(-102, -2, 204, len + 4)
  x.fillStyle = INK
  for (let y = 26; y < len; y += 34) { x.fillRect(-84, y - 8, 16, 16); x.fillRect(-58, y - 3, 120 - ((y * 7) % 50), 6) }
  x.fillStyle = INK; x.fillRect(-124, -26, 248, 30); x.fillStyle = WOOD; x.fillRect(-118, -20, 236, 18)
  x.restore()
}
// a picture frame (a little mountain picture)
function frame(x, cx, cy, k, rot) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.strokeStyle = INK; x.lineWidth = 4; x.beginPath(); x.moveTo(-60, -110); x.lineTo(0, -170); x.lineTo(60, -110); x.stroke()
  x.fillStyle = INK; x.fillRect(-150, -120, 300, 230); x.fillStyle = WOOD; x.fillRect(-142, -112, 284, 214)
  x.fillStyle = SKYB; x.fillRect(-120, -90, 240, 170)
  x.fillStyle = '#5fd068'; x.beginPath(); x.moveTo(-120, 80); x.lineTo(-40, -20); x.lineTo(30, 50); x.lineTo(70, 10); x.lineTo(120, 80); x.closePath(); x.fill()
  x.fillStyle = GOLD; x.fillRect(70, -70, 30, 30)
  x.restore()
}
// a planner page
function planner(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -166, 316, 350)
  x.fillStyle = INK; x.fillRect(-160, -180, 320, 360); x.fillStyle = '#f4eee2'; x.fillRect(-152, -172, 304, 344)
  x.fillStyle = INK; for (let i = 0; i < 6; i++) x.fillRect(-120 + i * 48, -192, 14, 30)
  x.fillStyle = VG; x.fillRect(-152, -140, 304, 50)
  x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('TODAY:', 0, -114)
  x.font = `800 150px ${INTER}`; x.fillText('?', 0, 40)
  x.restore()
}
// a hammock between two posts, sagging under the star
function hammock(x, t, cx, cy, k, sway) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha = clamp(k)
  x.fillStyle = INK; x.fillRect(cx - 380, cy - 220, 30, 360); x.fillRect(cx + 350, cy - 220, 30, 360)
  x.fillStyle = WOOD; x.fillRect(cx - 374, cy - 214, 18, 348); x.fillRect(cx + 356, cy - 214, 18, 348)
  const sag = 150, d = sway
  const band = (o, c, w) => { x.strokeStyle = c; x.lineWidth = w; x.beginPath(); x.moveTo(cx - 350, cy - 180 + o); x.quadraticCurveTo(cx + d, cy + sag + o, cx + 350, cy - 180 + o); x.stroke() }
  band(0, INK, 44); band(0, PINK, 32); band(-10, '#ffd0dc', 6)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'The to-do list | *can wait.*', mood: lt => lt > 1.4 ? 'sleepy' : 'wide', look: [1, 1], star: { x: -220 }, hops: [0.5],
    front(x, t, lt, P) {
      const len = lerp(80, 620, ease.inOutCubic(prog(lt, 0.3, 1.3)))
      x.save(); x.beginPath(); x.rect(110, 480, 860, 740); x.clip()
      scroll(x, t, 790, 560, pop01(t, P.t0 + 0.2, 0.3, 2), len)
      x.restore()
      label(x, 760, 1150, 'TOMORROW’S PROBLEM', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'A crooked frame | *won’t hurt anyone.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: lt => lt > 1.5 ? [0, 0] : [1, -1], star: { x: -220 },
    squash: lt => lt > 0.6 && lt < 1.4 ? 0.03 * Math.sin(lt * 60) : 0,
    front(x, t, lt, P) {
      frame(x, 780, 770, pop01(t, P.t0 + 0.2, 0.35, 2), 0.16)
      if (lt > 0.6 && lt < 1.4) label(x, 400, 620, 'TWITCH', 1, { size: 34, bg: BONE, rot: -0.1, font: MONO, weight: 700 })
      label(x, 780, 1080, 'LEFT IT. GROWTH.', pop01(t, P.t0 + 2.0, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Not every day | *needs a plan.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -230 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      planner(x, 780, 850, pop01(t, P.t0 + 0.2, 0.35, 2))
      sparkles(x, t, 780, 850, P.t0 + 1.4, 7, 220, 0.3)
    } },
  { sign: S, cap: 'Let them help, | *even messily.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -230 }, hops: [1.5],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 830, 930, 200 * k, { mood: 'happy', look: [-1, 1], seed: 21, glyph: false, hops: [P.t0 + 0.9] })
      drawBits(x, SHIRT, { B: SKYB }, 690, 1110, 13 * pop01(t, P.t0 + 0.5, 0.3, 2), { rot: 0.5, sx: 1.2, sy: 0.7 })
      label(x, 690, 1180, 'FOLDED (ISH)', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 28, bg: BONE, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 420, 620, 'thank you!', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 42, col: MINT, tail: 'bl' })
    } },
  { sign: S, cap: 'Face mask on. | *Inbox off.*', mood: 'happy', star: { x: -80 }, hops: [0.3],
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.4, 0.3, 2.2)
      // the cucumber slices sit on the eyes
      drawBits(x, CUKE, CUKE_C, F.x - 50, F.cy + 4, 12 * k)
      drawBits(x, CUKE, CUKE_C, F.x + 50, F.cy + 4, 12 * k)
      const m = pop01(t, P.t0 + 0.9, 0.3, 2)
      if (m > 0.01) {
        x.save(); x.translate(820, 720); x.rotate(0.06); x.scale(m, m)
        x.fillStyle = INK; x.fillRect(-120, -80, 240, 160); x.fillStyle = '#f4eee2'; x.fillRect(-112, -72, 224, 144)
        x.strokeStyle = INK; x.lineWidth = 6; x.beginPath(); x.moveTo(-112, -72); x.lineTo(0, 10); x.lineTo(112, -72); x.stroke()
        x.restore()
      }
      label(x, 820, 850, 'INBOX: CLOSED', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Your best is | *already enough.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, -1], star: { x: -220 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.5, 0.35, 2.4)
      drawBits(x, STARB, { Y: GOLD }, 790, 820, 26 * k, { rot: Math.sin(t * 2) * 0.08 })
      sparkles(x, t, 790, 820, P.t0 + 0.9, 8, 200, 0.1)
      label(x, 790, 1080, 'ENOUGH. TRULY.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.04 })
    } },
  { sign: S, cap: 'Leave the crumbs. | *Just tonight.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 1], star: { x: -230 },
    front(x, t, lt, P) {
      x.fillStyle = INK; x.fillRect(560, 1000, 380, 26); x.fillStyle = '#e8e2d0'; x.fillRect(564, 1004, 372, 18)
      const c = pop01(t, P.t0 + 0.2, 0.3, 2)
      for (let i = 0; i < 9; i++) { const s = (6 + (i * 5) % 7) * c; x.fillStyle = INK; x.fillRect(600 + i * 36 - 2, 990 - s - 2, s + 4, s + 4); x.fillStyle = '#d99a4a'; x.fillRect(600 + i * 36, 990 - s, s, s) }
      // a broom leaning, then laid down
      const down = ease.inOutCubic(prog(lt, 1.0, 1.4))
      x.save(); x.translate(880, 990); x.rotate(lerp(-0.2, -1.5, down)); x.scale(c, c)
      x.fillStyle = INK; x.fillRect(-8, -330, 16, 300); x.fillStyle = WOOD; x.fillRect(-4, -326, 8, 292)
      x.fillStyle = INK; x.fillRect(-46, -40, 92, 50); x.fillStyle = GOLD; x.fillRect(-40, -34, 80, 38)
      x.restore()
      label(x, 760, 650, 'OFF DUTY', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 40, bg: MINT, rot: 0.04 })
    } },
  { sign: S, cap: 'A typo won’t | *scare off* your match.', mood: lt => lt > 1.4 ? 'heart' : 'wide', look: [1, 0], star: { x: -220 }, hops: [1.5],
    front(x, t, lt, P) {
      phone(x, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { head: '✦ YOUR MATCH', headBg: MINT, lines: [['so tird lol', pop01(t, P.t0 + 0.5, 0.3, 2.2)], ['cute.', pop01(t, P.t0 + 1.4, 0.3, 2.2), PINK]] })
      label(x, 560, 590, 'TIRD?!', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 36, bg: BONE, rot: -0.08, font: MONO, weight: 700 })
      hearts(x, t, 790, 900, P.t0 + 1.8, { n: 5, life: 1.4, spread: 160, cell: 6, seed: 2 })
    } },
  { sign: S, cap: 'Hammock day. | *No agenda.*', mood: 'sleepy', look: [0, 0], star: { x: 0, y: 60, s: 260 },
    back(x, t, lt, P) { hammock(x, t, 540, 860, pop01(t, P.t0 + 0.1, 0.3, 1.4), Math.sin(t * 1.6) * 60) },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.1, 0.3, 1.4)
      if (k > 0.01) { x.save(); x.globalAlpha = clamp(k); x.strokeStyle = INK; x.lineWidth = 34; x.beginPath(); x.moveTo(370, 940 + 40); x.quadraticCurveTo(540 + Math.sin(t * 1.6) * 60, 1060, 710, 940 + 40); x.stroke(); x.strokeStyle = PINK; x.lineWidth = 24; x.stroke(); x.restore() }
      label(x, 540, 580, 'NO AGENDA', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: GOLD, rot: -0.04 })
    } },
]

const F = makeFilm({
  id: 'v3a123', key: 'F', accent: VG, solo: S, ending: 'lesson',
  title: 'Virgo, you’re | allowed *to rest.*',
  cameos: CAMEOS,
  group: { cap: 'Perfectly | *imperfect.*', mood: 'sleepy' },
  lesson: { text: 'You don’t have to | *earn your rest.*', chip: 'REST: APPROVED' },
  last: { text: 'Frame still crooked. | *Virgo’s fine.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
