// r2a0424: star_advice, ADVICE ROLL CALL, "What each sign | *wants noticed.*" (~53 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs in zodiac order: one warm, specific thing each sign hopes you notice, each with a light visual gag. Ending: callback.
//   0.0–3.6    "What each sign | *wants noticed.*"
//   3.6–49.2   ♈ showed up first, every time · ♉ the snack they saved you · ♊ remembered your random story · ♋ soup on your doorstep
//              · ♌ the new haircut (say it's iconic) · ♍ fixed it before you asked · ♎ checked your compatibility
//              · ♏ they let you in, that's huge · ♐ the postcard from somewhere wild · ♑ the effort, not just the result
//              · ♒ their weird idea is genius · ♓ the doodle of your sign on the fridge (happy tears)
//  49.2        "Small things. | *Big love.*"
//  52.6        CALLBACK: "Noticed the snack? | *Share one back.*"  Taurus's plate returns, two cookies now.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, notes,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CREAM = '#fff4e2', RED = '#e23d4e', ORANGE = '#ffb34a', GREY = '#9aa5c4', PURP = '#6b62a8', DEEP = '#2a2350'
const L = (x, cx, cy, text, k, bg = GOLD, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
const B = (x, cx, cy, text, k, o = {}) => bubble(x, cx, cy, text, k, { size: 44, ...o })
const ST = { x: -170 }

/** a phone with a header strip and chat pills: lines = [[text, colour, k, right?], …] */
function phone(x, cx, cy, k, { head = '', headCol = MINT, lines = [], rot = 0.05 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = DEEP; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  if (head) { x.fillStyle = headCol; x.fillRect(-100, -156, 200, 46); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -132) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach(([txt, col, kk, right], i) => {
    if (kk <= 0.01) return
    x.font = `700 26px ${MONO}`; const w = x.measureText(txt).width + 24
    x.save(); x.translate(right ? 96 - w : -96, -60 + i * 64); x.scale(kk, kk)
    x.fillStyle = col; x.fillRect(0, -22, w, 44); x.fillStyle = INK; x.fillText(txt, 12, 2)
    x.restore()
  })
  x.restore()
}
/** soft pixel puffs rising from (cx, cy) after t0 (steam, sighs, dust) */
function puffs(x, t, cx, cy, t0, { n = 5, col = '#e6e1f2', cell = 14, rise = 200, spread = 90, seed = 0 } = {}) {
  if (t < t0) return
  for (let i = 0; i < n; i++) {
    const ph = (((t - t0) * 0.9 + i / n) % 1 + 1) % 1
    const px = cx + Math.sin(i * 2.1 + seed) * spread * 0.5 + Math.sin(ph * 5 + i) * 12, py = cy - ph * rise, r = cell * (0.8 + ph * 1.4)
    x.save(); x.globalAlpha = Math.sin(Math.PI * ph) * 0.9
    x.fillStyle = INK; x.fillRect(px - r - 4, py - r * 0.7 - 4, 2 * r + 8, 1.4 * r + 8)
    x.fillStyle = col; x.fillRect(px - r, py - r * 0.7, 2 * r, 1.4 * r)
    x.restore()
  }
}
/** a sticky note / paper card with lines of text */
function note(x, cx, cy, k, lines, { w = 300, bg = '#ffe27a', size = 34, rot = -0.06, font = INTER, weight = 800 } = {}) {
  if (k <= 0.01) return
  const lh = size * 1.55, h = lines.length * lh + 50
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16); x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = INK; x.font = `${weight} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, 0, -h / 2 + 25 + lh * (i + 0.5)))
  x.restore()
}
/** a birth-chart wheel */
const WHEEL = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
function chart(x, cx, cy, r, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.3)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { x.fillStyle = WHEEL[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, (i / 12) * Math.PI * 2, ((i + 1) / 12) * Math.PI * 2); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, r * 0.62, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; for (const a of [0.4, 2.6, 4.5]) x.fillRect(Math.cos(a) * r * 0.4 - 8, Math.sin(a) * r * 0.4 - 8, 16, 16)
  x.restore()
}
/** a little anger mark (four red corner ticks) */
function vein(x, cx, cy, k, t) {
  if (k <= 0.01) return
  const s = 9 * k * (1 + 0.15 * Math.sin(t * 14))
  x.save(); x.translate(cx, cy)
  for (const [dx, dy] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) { x.fillStyle = INK; x.fillRect(dx * s * 1.6 - s * 0.9, dy * s * 1.6 - s * 0.9, s * 1.8, s * 1.8); x.fillStyle = RED; x.fillRect(dx * s * 1.6 - s * 0.6, dy * s * 1.6 - s * 0.6, s * 1.2, s * 1.2) }
  x.restore()
}
const ACC = '#ffb34a'
const PLATE = ['..WWWWWWWWW..', '.WWWWWWWWWWW.', 'WWWWWWWWWWWWW', '.WWWWWWWWWWW.', '..WWWWWWWWW..']
const COOKIE = ['.CCCC.', 'CCKCCC', 'CCCCKC', 'CKCCCC', '.CCCC.']
const COOKIE_C = { C: '#e0a56a', K: '#5a3a2e' }
const POT = ['...KKKKK...', '..S.S.S....', 'KKKKKKKKKKK', 'KRRRRRRRRRK', 'KRRWRRRRRRK', 'KRRRRRRRRRK', '.KRRRRRRRK.', '..KKKKKKK..']
const POT_C = { K: INK, S: '#e6e1f2', R: '#ff6b5a', W: '#fff' }
const SHELF = ['BBBBBBBBBBBB', '.K........K.', '.K........K.']
const DOOR = ['KKKKKKKK', 'KDDDDDDK', 'KDDDDDDK', 'KDDDDDDK', 'KDDDDYDK', 'KDDDDDDK', 'KDDDDDDK', 'KDDDDDDK', 'KKKKKKKK']
const BULB = ['..YYYY..', '.YYYYYY.', 'YYYWYYYY', 'YYWYYYYY', 'YYYYYYYY', '.YYYYYY.', '..GGGG..', '..GGGG..', '...GG...']
const KEY = ['.YYY.......', 'Y...Y......', 'Y...YYYYYYY', 'Y...Y...Y.Y', '.YYY.......']

const CAMEOS = [
  { sign: 'aries', cap: 'Notice they showed up | *first. Every time.*', mood: 'sparkle', star: { x: -170 }, hops: [0.5],
    front(x, t, lt, P) {
      L(x, 790, 700, 'ARRIVED: FIRST', pop01(t, P.t0 + 0.3, 0.3, 2), GOLD, -0.04, 38)
      L(x, 790, 860, 'EVERYONE ELSE: OMW', pop01(t, P.t0 + 0.9, 0.3, 2), LAV, 0.04, 30)
      bubble(x, 790, 1060, 'here for you!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Notice the snack | they *saved for you.*', mood: 'heart', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, PLATE, { W: CREAM }, 790, 960, 20 * pop01(t, P.t0 + 0.15, 0.3, 2))
      drawBits(x, COOKIE, COOKIE_C, 790, 920, 16 * pop01(t, P.t0 + 0.4, 0.3, 2))
      L(x, 790, 720, 'YOURS ♡', pop01(t, P.t0 + 0.9, 0.3, 2.2), PINK, 0.04, 44)
      L(x, 790, 1110, 'RESISTED: BARELY', pop01(t, P.t0 + 1.5, 0.3, 2.2), BONE, -0.04, 30)
    } },
  { sign: 'gemini', cap: 'Notice they remembered | *your random story.*', mood: 'sparkle', look: [1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 760, 700, 'how’s your | cousin’s goat?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      L(x, 790, 960, 'TOLD: 2 YEARS AGO', pop01(t, P.t0 + 1.1, 0.3, 2.2), MINT, -0.04, 32)
    } },
  { sign: 'cancer', cap: 'Notice the soup | *on your doorstep.*', mood: 'heart', star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, POT, POT_C, 790, 950, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      puffs(x, t, 790, 820, P.t0 + 0.6, { n: 3, cell: 10, rise: 140, spread: 80 })
      L(x, 790, 660, 'NOTE: GET WELL ♡', pop01(t, P.t0 + 1.0, 0.3, 2.2), GOLD, 0.04, 32)
    } },
  { sign: 'leo', cap: 'Notice the new haircut. | Say it’s *iconic.*', mood: 'sparkle', star: { x: -170 },
    front(x, t, lt, P, F) {
      sparkles(x, t, F.x, F.top, P.t0 + 0.3, 8, 120, 0.2); sparkles(x, t, F.x, F.top, P.t0 + 1.0, 8, 160, 0.6)
      L(x, 790, 720, 'NEW HAIR ✦', pop01(t, P.t0 + 0.3, 0.3, 2), ORANGE, -0.04, 40)
      bubble(x, 790, 940, 'ICONIC.', pop01(t, P.t0 + 1.1, 0.25, 2.4), { size: 56, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Notice they fixed it | *before you asked.*', mood: lt => lt < 1.0 ? 'squint' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const r = lerp(0.3, 0, ease.outBack(prog(lt, 0.7, 1.2)))
      drawBits(x, SHELF, { B: '#c99a2e', K: INK }, 790, 860, 28 * pop01(t, P.t0 + 0.15, 0.3, 2), { rot: r })
      L(x, 790, 1060, 'FIXED ✓ (QUIETLY)', pop01(t, P.t0 + 1.3, 0.3, 2.2), MINT, -0.04, 32)
    } },
  { sign: 'libra', cap: 'Notice they checked | *your compatibility.*', mood: 'heart', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      chart(x, 790, 820, 120, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      L(x, 760, 1050, '✦ MATCH: ♡♡♡', pop01(t, P.t0 + 1.0, 0.3, 2.2), PINK, 0.03, 38)
      hearts(x, t, 790, 760, P.t0 + 1.2, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 1 })
    } },
  { sign: 'scorpio', cap: 'Notice they let you in. | *That’s huge.*', mood: lt => lt < 1.0 ? 'neutral' : 'heart', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const open = ease.outCubic(prog(lt, 0.5, 1.2))
      x.save(); x.fillStyle = '#ffe9a8'; x.globalAlpha = 0.6 * open; x.fillRect(720, 760, 140, 300); x.restore()
      drawBits(x, DOOR, { K: INK, D: '#8a4a2e', Y: GOLD }, 790 - open * 40, 910, 22 * pop01(t, P.t0 + 0.15, 0.3, 2), { sx: lerp(1, 0.35, open) })
      drawBits(x, KEY, { Y: GOLD }, 790, 1120, 12 * pop01(t, P.t0 + 1.1, 0.3, 2.2))
      L(x, 790, 640, 'ACCESS: GRANTED', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, -0.04, 32)
    } },
  { sign: 'sagittarius', cap: 'Notice the postcard | *from somewhere wild.*', mood: 'sparkle', star: { x: -170 },
    front(x, t, lt, P) {
      note(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), ['wish u were', 'here!! ♡', '(a glacier?)'], { w: 340, bg: SKYB, size: 36, rot: 0.06 })
      L(x, 790, 1100, 'THOUGHT OF YOU', pop01(t, P.t0 + 1.3, 0.3, 2.2), GOLD, -0.04, 34)
    } },
  { sign: 'capricorn', cap: 'Notice the effort. | *Not just the result.*', mood: lt => lt < 1.0 ? 'squint' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      note(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), ['DRAFT 14', 'FINAL ✓'], { w: 300, bg: CREAM, size: 44, font: MONO, weight: 700 })
      L(x, 790, 1040, 'HOURS: MANY', pop01(t, P.t0 + 1.0, 0.3, 2.2), MINT, 0.04, 36)
      bubble(x, 420, 600, 'proud of you', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, col: LAV, tail: 'bc' })
    } },
  { sign: 'aquarius', cap: 'Notice their weird idea. | *It’s genius.*', mood: 'sparkle', look: [1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, BULB, { Y: '#ffe27a', W: '#fff', G: GREY }, 790, 840, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      x.save(); x.globalAlpha = 0.3 * clamp(lt - 0.4); x.fillStyle = '#ffe27a'; x.beginPath(); x.arc(790, 820, 170, 0, 7); x.fill(); x.restore()
      L(x, 790, 1080, 'SOCKS FOR CHAIRS?', pop01(t, P.t0 + 0.8, 0.3, 2.2), BONE, -0.04, 32)
    } },
  { sign: 'pisces', cap: 'Notice the doodle | *of your sign.*', mood: 'heart', tears: 2, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.5, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      note(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), [' ', ' ', 'you’re great'], { w: 320, bg: '#ffe27a', size: 40, rot: -0.05 })
      { const k = pop01(t, P.t0 + 0.5, 0.3, 2); if (k > 0.01) signChar(x, t, 'leo', 790, 810, 130 * k, { mood: 'happy', seed: 50, glyph: false }) }
      L(x, 790, 1080, 'ON YOUR FRIDGE', pop01(t, P.t0 + 1.2, 0.3, 2.2), SKYB, 0.04, 34)
    } },
]

const F = makeFilm({
  id: 'r2a0424', key: 'E', accent: ACC, ending: 'callback',
  title: 'What each sign | *wants noticed.*',
  cameos: CAMEOS,
  group: { cap: 'Small things. | *Big love.*', moods: ['sparkle', 'heart', 'sparkle', 'heart', 'sparkle', 'happy', 'heart', 'heart', 'sparkle', 'happy', 'sparkle', 'heart'] },
  last: {
    text: 'Noticed the snack? | *Share one back.*',
    draw(x, t, lt) {
      const t0 = t - lt, k = pop01(t, t0 + 0.3, 0.45, 1.8)
      if (k <= 0.01) return
      drawBits(x, PLATE, { W: CREAM }, 660, 1260, 40 * k)
      drawBits(x, COOKIE, COOKIE_C, 590, 1200, 28 * k)
      drawBits(x, COOKIE, COOKIE_C, 740, 1210, 28 * pop01(t, t0 + 1.3, 0.35, 2.4))
      signChar(x, t, 'taurus', 320, 1060, 340 * k, { mood: lt > 1.4 ? 'heart' : 'happy', look: [1, 0], seed: 33, hops: [t0 + 1.5] })
      hearts(x, t, 640, 1100, t0 + 1.4, { n: 7, life: 2.0, spread: 360, cell: 8, seed: 4 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
