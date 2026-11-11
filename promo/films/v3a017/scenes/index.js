// v3a017: zodiac.advice444, ADVICE ROLL CALL, "Each sign | on a good day." (~62 s vertical, signs3kit social cut, lofi · E)
// Twelve signs in zodiac order, one warm, specific good-day moment each, with a light visual gag.
//   0.0–3.6    "Each sign | *on a good day.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one good day per sign (3.8 s each):
//              ♈ every light turned green · ♉ the bakery saved the last croissant · ♊ the whole group chat laughed
//              · ♋ a paper-plane note: "thinking of you" · ♌ a stranger loved the outfit · ♍ the laundry folded perfectly
//              · ♎ picked the restaurant on the first try · ♏ trusted someone, and the lock opened into a heart
//              · ♐ laughed so hard they snorted · ♑ logged off on time (door sign: GONE FOR THE DAY)
//              · ♒ the weird idea? everyone loved it (lightbulb) · ♓ happy tears only (under a rainbow)
//  49.2        "Small wins. | *Big glow.*"  The twelve fly up into a group photo.
//  52.4        LESSON UNLOCKED: "Notice the small wins. | They *add up.*"  DAY: GOOD
//  58.3        "Taurus shared | *the croissant.*" over the match card: Taurus + Pisces (the croissant and the happy tears).
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', WOOD = '#c98f2a', ORANGE = '#ffb34a', GREEN = '#3ddc6e'

// ── props
const CROISSANT = [
  '....OOOO....',
  '..OOoOOoOO..',
  '.OOoOOOOoOO.',
  'OOoOOOOOOoOO',
  'OoOO....OOoO',
  'OO........OO',
]
const CROISSANT_C = { O: '#e7a24a', o: '#c0782e' }
const PLANE = [
  'W...........',
  'WWW.........',
  '.WWWWW......',
  '.WWWWWWWW...',
  '..WWWWWWWWWW',
  '..WWWGWWWW..',
  '...WGGW.....',
  '...WG.......',
  '....G.......',
]
const LOCK_SHUT = ['..GGGG..', '.G....G.', '.G....G.', 'YYYYYYYY', 'YYYKKYYY', 'YYYKKYYY', 'YYYYYYYY', 'YYYYYYYY']
const LOCK_OPEN = ['......GGGG', '.....G....', '.....G....', 'YYYYYYYY..', 'YYYYYYYY..', 'YYYYYYYY..', 'YYYYYYYY..', 'YYYYYYYY..']
const BULB = ['..YYYY..', '.YYWWYY.', 'YYWWYYYY', 'YYYYYYYY', 'YYYYYYYY', '.YYYYYY.', '..YYYY..', '..GGGG..', '..GGGG..', '...GG...']
const SHIRTF = ['SSSSSSSSSS', 'SssssssssS', 'SSSSSSSSSS']

// a traffic light that turns green, with a road of passed green lights behind
function trafficLight(x, cx, cy, k, green) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-60, -150, 120, 300); x.fillRect(-10, 150, 20, 120)
  x.fillStyle = '#2a2350'; x.fillRect(-52, -142, 104, 284)
  const lamp = (y, col, on) => { x.fillStyle = INK; x.beginPath(); x.arc(0, y, 38, 0, Math.PI * 2); x.fill(); x.fillStyle = on ? col : '#4a4060'; x.beginPath(); x.arc(0, y, 32, 0, Math.PI * 2); x.fill() }
  lamp(-90, RED, !green); lamp(0, GOLD, false); lamp(90, GREEN, green)
  if (green) { x.globalAlpha = 0.35; x.fillStyle = GREEN; x.beginPath(); x.arc(0, 90, 64, 0, Math.PI * 2); x.fill() }
  x.restore()
}
// group-chat messages stacking up
function chat(x, t, P, lt) {
  const msgs = ['HAHAHA', 'dead', 'STOP', 'iconic']
  msgs.forEach((m, i) => {
    const k = pop01(t, P.t0 + 0.5 + i * 0.28, 0.25, 2.2)
    bubble(x, 760 + (i % 2 ? 60 : -40), 620 + i * 120, m, k, { size: 34, col: [MINT, PINK, SKYB, GOLD][i], tail: i % 2 ? 'br' : 'bl' })
  })
}
// a stack of folded laundry, perfectly square
function laundry(x, cx, bottom, n) {
  const COLS = [SKYB, PINK, MINT, LAV, BONE]
  for (let i = 0; i < n; i++) drawBits(x, SHIRTF, { S: COLS[i % 5], s: 'rgba(255,255,255,0.55)' }, cx, bottom - i * 44, 22)
}
// a menu with one item circled
function menu(x, cx, cy, k, circ) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-128, -180, 268, 372)
  x.fillStyle = INK; x.fillRect(-140, -192, 280, 384)
  x.fillStyle = '#fff4e2'; x.fillRect(-132, -184, 264, 368)
  x.fillStyle = INK; x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('MENU', 0, -146)
  x.fillStyle = '#b9b0a0'; for (let i = 0; i < 5; i++) { x.fillRect(-100, -86 + i * 58, 150 - (i % 2) * 40, 14); x.fillRect(70, -86 + i * 58, 30, 14) }
  if (circ > 0.01) { x.strokeStyle = RED; x.lineWidth = 7; x.beginPath(); x.ellipse(-24, -21, 112, 34, 0, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * clamp(circ)); x.stroke() }
  x.restore()
}
// a door sign on a string
function doorSign(x, cx, cy, k, flip) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.strokeStyle = INK; x.lineWidth = 5; x.beginPath(); x.moveTo(-90, -70); x.lineTo(0, -150); x.lineTo(90, -70); x.stroke()
  x.fillStyle = INK; x.beginPath(); x.arc(0, -150, 10, 0, Math.PI * 2); x.fill()
  x.scale(1, Math.max(0.05, Math.abs(Math.cos(Math.PI * clamp(flip)))))
  x.fillStyle = INK; x.fillRect(-160, -76, 320, 152)
  const back = flip > 0.5
  x.fillStyle = back ? MINT : '#fff4e2'; x.fillRect(-152, -68, 304, 136)
  x.fillStyle = INK; x.font = `800 ${back ? 36 : 40}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  if (back) { x.fillText('GONE FOR', 0, -20); x.fillText('THE DAY ✦', 0, 24) } else x.fillText('AT WORK', 0, 2)
  x.restore()
}
// a rainbow arc
function rainbow(x, cx, cy, p) {
  if (p <= 0.01) return
  const COLS = [RED, ORANGE, GOLD, GREEN, SKYB, LAV]
  x.save(); x.lineCap = 'butt'
  COLS.forEach((c, i) => { x.strokeStyle = c; x.lineWidth = 22; x.beginPath(); x.arc(cx, cy, 300 - i * 22, Math.PI, Math.PI + Math.PI * clamp(p)); x.stroke() })
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Every light | *turned green.*', mood: lt => lt > 1.1 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -170 }, hops: [1.2, 1.7],
    front(x, t, lt, P) {
      trafficLight(x, 790, 820, pop01(t, P.t0 + 0.2, 0.35, 2), lt > 1.0)
      label(x, 790, 1120, 'GREEN. GREEN. GREEN.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'The bakery saved | *the last croissant.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, CROISSANT, CROISSANT_C, 790, 860, 22 * pop01(t, P.t0 + 0.3, 0.35, 2))
      label(x, 790, 1020, 'RESERVED: TAURUS', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 860, P.t0 + 1.1, 7, 190, 0.3)
    } },
  { sign: 'gemini', cap: 'The whole group chat | *laughed.*', mood: lt => lt > 1.0 ? 'squint' : 'happy', star: { x: -190 }, hops: [0.9, 1.3, 1.7],
    front(x, t, lt, P) { chat(x, t, P, lt) } },
  { sign: 'cancer', cap: 'A note said | *“thinking of you.”*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, -1], star: { x: -180 },
    front(x, t, lt, P) {
      const fly = ease.inOutCubic(prog(lt, 0.2, 1.1))
      if (lt > 0.15 && fly < 1) drawBits(x, PLANE, { W: '#fff4e2', G: '#b9b0a0' }, lerp(980, 640, fly), lerp(560, 760, fly) + Math.sin(fly * 9) * 20, 9, { rot: 0.2 })
      if (fly >= 1) {
        const k = pop01(t, P.t0 + 1.1 * 1.29, 0.3, 2.2)
        x.save(); x.translate(760, 840); x.rotate(0.05); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-150, -80, 300, 160); x.fillStyle = '#fff4e2'; x.fillRect(-142, -72, 284, 144)
        x.fillStyle = INK; x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('thinking', 0, -18); x.fillText('of you ♥︎', 0, 24)
        x.restore()
        hearts(x, t, 760, 840, P.t0 + 1.5, { n: 4, life: 1.6, spread: 200, cell: 6, seed: 3 })
      }
    } },
  { sign: 'leo', cap: 'A stranger said | *“love your outfit.”*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -180 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'libra', 820, 990, 190 * k, { mood: 'happy', look: [-1, 0], seed: 41, glyph: false })
      bubble(x, 800, 660, 'love your | outfit!', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 34, tail: 'bc' })
      label(x, 380, 620, 'DAY: MADE', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 38, bg: GOLD, rot: -0.05 })
      sparkles(x, t, 380, 860, P.t0 + 1.3, 7, 180, 0.6)
    } },
  { sign: 'virgo', cap: 'The laundry | *folded perfectly.*', mood: lt => lt > 1.5 ? 'heart' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      laundry(x, 790, 1130, Math.min(6, Math.floor(clamp((lt - 0.2) / 1.1) * 6)))
      label(x, 790, 610, 'CREASES: CRISP', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Picked the restaurant | *on the first try.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -190 }, hops: [1.4, 1.8],
    front(x, t, lt, P) {
      menu(x, 780, 850, pop01(t, P.t0 + 0.2, 0.35, 2), prog(lt, 0.7, 1.1))
      label(x, 780, 1100, 'FIRST TRY!!', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 38, bg: PINK, rot: -0.04 })
    } },
  { sign: 'scorpio', cap: 'Trusted someone. | They were *worth it.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), open = lt > 1.1
      drawBits(x, open ? LOCK_OPEN : LOCK_SHUT, { G: '#c9c9d8', Y: GOLD, K: INK }, 790 + (open ? 20 : 0), 840, 22 * k, { rot: !open ? Math.sin(lt * 18) * 0.04 : 0 })
      if (open) hearts(x, t, 790, 820, P.t0 + 1.1 * 1.29, { n: 6, life: 1.8, spread: 180, cell: 8, seed: 8 })
      label(x, 790, 1080, 'UNLOCKED', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Laughed so hard | they *snorted.*', mood: lt => Math.floor(lt * 3) % 2 ? 'squint' : 'happy', star: { x: -150 }, hops: [0.7, 1.1, 1.5, 1.9], squash: lt => 0.06 * Math.sin(lt * 20),
    front(x, t, lt, P) {
      bubble(x, 780, 700, '*SNORT*', pop01(t, P.t0 + 1.0, 0.25, 2.6), { size: 52, col: GOLD, tail: 'bl' })
      label(x, 780, 1040, 'BEST. DAY.', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 38, bg: LAV, rot: -0.04 })
    } },
  { sign: 'capricorn', cap: 'Logged off | *right on time.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -190 }, hops: [1.4],
    front(x, t, lt, P) {
      doorSign(x, 780, 860, pop01(t, P.t0 + 0.2, 0.35, 2), prog(lt, 0.8, 1.2))
      label(x, 780, 1090, 'EVENING: ALL MINE', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Your weird idea? | *Everyone loved it.*', mood: lt => lt > 1.2 ? 'wide' : 'wink', look: [1, -1], star: { x: -190 }, hops: [1.3],
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2.2), on = lt > 0.8
      drawBits(x, BULB, { Y: on ? GOLD : '#6b6280', W: on ? '#fff' : '#8a8aa0', G: '#c9c9d8' }, F.x + 40, F.top - 70, 12 * k)
      for (const [id, px, d] of [['aries', 700, 0], ['virgo', 830, 0.1], ['leo', 940, 0.2]]) {
        const kk = pop01(t, P.t0 + 0.9 + d, 0.3, 2.2)
        if (kk > 0.01) signChar(x, t, id, px, 1050, 110 * kk, { mood: 'heart', seed: 50 + d * 10, glyph: false, hops: [P.t0 + 1.4 + d] })
      }
      label(x, 800, 720, 'GENIUS, ACTUALLY', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Happy tears. | *Only happy ones.*', mood: 'sparkle', tears: 2, star: { x: -40, y: 40 }, hops: [1.4],
    back(x, t, lt, P) { rainbow(x, 540, 1120, ease.outCubic(prog(lt, 0.3, 1.3))) },
    front(x, t, lt, P) {
      label(x, 540, 1160, 'FORECAST: RAINBOWS', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
      hearts(x, t, 540, 820, P.t0 + 1.3, { n: 5, life: 1.8, spread: 240, cell: 7, seed: 9 })
    } },
]

const F = makeFilm({
  id: 'v3a017', key: 'E', accent: GOLD,
  title: 'Each sign | *on a good day.*',
  cameos: CAMEOS,
  ending: 'card',
  card: { a: 'taurus', b: 'pisces', chip: 'ALIGNED' },
  group: { cap: 'Small wins. | *Big glow.*' },
  lesson: { text: 'Notice the small wins. | They *add up.*', chip: 'DAY: GOOD' },
  last: {
    text: 'Taurus shared | *the croissant.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 10, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
