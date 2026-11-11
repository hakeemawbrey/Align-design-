// v3a051: zodiac.advice444, ADVICE SOLO, "Signs you're | a healed Aquarius." (~51 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole way through (makeFilm solo mode, 9 cards): a relatable Aquarius truth with a warm reframe, one gag each.
//   0.0–3.6    "Signs you’re a | *healed Aquarius.*"  One big Aquarius pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              a reply sent the same day (label: SAME DAY. WOW.) · a FEELINGS switch flips ON · the velvet rope comes
//              down and Libra walks in · a hug with a timer: 0:07 · the party clock says 1 AM: STILL HERE
//              · a profile bio that's actually filled in: BIO: HONEST · the brain gears slow down: BRAIN: OFF (NICE)
//              · popcorn, a sad film, real tears · cocoa mug: WEIRD + WARM
//  37.8        "Still cool. | *Now cozy.*"  Aquarius comes back, big.
//  41.0        LESSON UNLOCKED: "Letting people in | *keeps you free.*"  HEART: UNLOCKED
//  46.9        "Taurus got | *the long hug.*" over the match card: Aquarius + Taurus (the seven-second hug, paid off).
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const TEAL = '#5fe0d4', RED = '#e23d4e', WOOD = '#c98f2a', BROWN = '#7a4426'
const S = 'aquarius'

// ── props
const POPCORN = [
  '.WYW.WW.',
  'WWWYWWYW',
  'YWWWWWWW',
  'RWRWRWRW',
  'RWRWRWRW',
  '.RWRWRW.',
  '.RWRWRW.',
  '.RWRWRW.',
  '..RWRW..',
]
const POPCORN_C = { W: '#fff4e2', Y: GOLD, R: RED }
const MUG = [
  '..s.s....',
  '.s.s.....',
  '..s.s....',
  'MMMMMMM..',
  'MCCCCCMMM',
  'MMMMMMM.M',
  'MMMMMMM.M',
  'MMMMMMMMM',
  'MMMMMMM..',
  '.MMMMM...',
]
const MUG_C = { M: TEAL, C: BROWN, s: '#efe6d6' }

// a phone with a chat: their message, then your reply
function phone(x, cx, cy, k, reply) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -182, 256, 380)
  x.fillStyle = INK; x.fillRect(-134, -194, 268, 388)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -184, 248, 368)
  x.fillStyle = '#140c30'; x.fillRect(-112, -160, 224, 320)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillStyle = LAV; x.fillRect(-100, -136, 150, 60)
  x.fillStyle = INK; x.font = `800 28px ${INTER}`; x.fillText('hey :)', -25, -106)
  if (reply > 0.01) {
    x.save(); x.translate(30, -10); x.scale(reply, reply)
    x.fillStyle = TEAL; x.fillRect(-80, -34, 170, 68)
    x.fillStyle = INK; x.font = `800 28px ${INTER}`; x.fillText('hi!! :)', 5, 0)
    x.restore()
    x.fillStyle = MINT; x.font = `700 20px ${MONO}`; x.fillText('sent: 2 min later', 0, 70)
  }
  x.restore()
}
// a light switch, flipping from OFF to ON
function toggle(x, cx, cy, k, on) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-92, -132, 196, 276)
  x.fillStyle = INK; x.fillRect(-100, -140, 200, 280)
  x.fillStyle = BONE; x.fillRect(-90, -130, 180, 260)
  x.fillStyle = INK; x.fillRect(-42, -90, 84, 180)
  x.fillStyle = '#3a3360'; x.fillRect(-34, -82, 68, 164)
  const y = lerp(30, -30, on)
  x.fillStyle = INK; x.fillRect(-40, y - 46, 80, 92)
  x.fillStyle = on > 0.5 ? MINT : '#9d9ab0'; x.fillRect(-32, y - 38, 64, 76)
  x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText('ON', 0, -110); x.fillText('OFF', 0, 112)
  x.restore()
}
// a velvet rope between two posts; it unhooks and drops
function rope(x, cx, cy, k, drop) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  for (const px of [-150, 150]) {
    x.fillStyle = INK; x.fillRect(px - 16, -150, 32, 260); x.fillRect(px - 44, 100, 88, 26)
    x.fillStyle = GOLD; x.fillRect(px - 9, -142, 18, 246); x.fillRect(px - 36, 104, 72, 16)
    x.fillStyle = GOLD; x.beginPath(); x.arc(px, -150, 22, 0, Math.PI * 2); x.fill()
  }
  x.strokeStyle = INK; x.lineWidth = 22; x.beginPath()
  const sag = 40 + drop * 160
  x.moveTo(-150, -110); x.quadraticCurveTo(lerp(0, -120, drop), -110 + sag * 2, lerp(150, -110, drop), lerp(-110, 90, drop)); x.stroke()
  x.strokeStyle = RED; x.lineWidth = 14; x.stroke()
  x.restore()
}
// a round clock face
function clock(x, cx, cy, k, h, m) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 118, 0, Math.PI * 2); x.fill()
  x.fillStyle = BONE; x.beginPath(); x.arc(0, 0, 104, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.fillRect(Math.cos(a) * 86 - 5, Math.sin(a) * 86 - 5, 10, 10) }
  const ha = (h / 12) * Math.PI * 2 - Math.PI / 2, ma = (m / 60) * Math.PI * 2 - Math.PI / 2
  x.strokeStyle = INK; x.lineCap = 'round'; x.lineWidth = 12; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(ha) * 50, Math.sin(ha) * 50); x.stroke()
  x.lineWidth = 8; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(ma) * 78, Math.sin(ma) * 78); x.stroke()
  x.fillStyle = RED; x.beginPath(); x.arc(0, 0, 10, 0, Math.PI * 2); x.fill()
  x.restore()
}
// a dating profile card with a real, filled-in bio
function profile(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-140, -190, 296, 396)
  x.fillStyle = INK; x.fillRect(-150, -200, 300, 400)
  x.fillStyle = '#fff4e2'; x.fillRect(-140, -190, 280, 380)
  x.fillStyle = TEAL; x.fillRect(-140, -190, 280, 150)
  x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  x.fillText('ABOUT ME', -120, -10)
  const lines = ['i love space,', 'bad puns and', 'you, maybe :)']
  x.font = `800 28px ${INTER}`
  lines.forEach((l, i) => { const p = clamp((lt - 0.7 - i * 0.3) * 3); if (p > 0) x.fillText(l.slice(0, Math.round(l.length * p)), -120, 40 + i * 44) })
  x.restore()
  signChar(x, 0, 'aquarius', cx + 4, cy - 120 * k, 110 * k, { mood: 'happy', glyph: false, seed: 31 })
}
// three gears in a thought cloud, slowing down
function gears(x, t, cx, cy, k, spin) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; for (const [px, py, r] of [[-120, 20, 90], [0, -40, 110], [120, 20, 90], [0, 60, 90]]) { x.beginPath(); x.arc(px, py, r + 6, 0, Math.PI * 2); x.fill() }
  x.fillStyle = BONE; for (const [px, py, r] of [[-120, 20, 90], [0, -40, 110], [120, 20, 90], [0, 60, 90]]) { x.beginPath(); x.arc(px, py, r, 0, Math.PI * 2); x.fill() }
  const gear = (gx, gy, r, a, col) => {
    x.save(); x.translate(gx, gy); x.rotate(a)
    x.fillStyle = INK; for (let i = 0; i < 8; i++) { x.save(); x.rotate(i * Math.PI / 4); x.fillRect(-12, -r - 14, 24, 28); x.restore() }
    x.beginPath(); x.arc(0, 0, r + 4, 0, Math.PI * 2); x.fill()
    x.fillStyle = col; x.beginPath(); x.arc(0, 0, r - 2, 0, Math.PI * 2); x.fill()
    x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r * 0.3, 0, Math.PI * 2); x.fill()
    x.restore()
  }
  gear(-60, 0, 48, spin, TEAL); gear(52, -10, 40, -spin * 1.2 + 0.3, GOLD); gear(10, 70, 32, spin * 1.5, PINK)
  x.restore()
  x.fillStyle = INK
  for (const [px, py, r] of [[cx - 170 * k, cy + 170 * k, 16], [cx - 210 * k, cy + 220 * k, 10]]) { x.beginPath(); x.arc(px, py, r * k, 0, Math.PI * 2); x.fill() }
}

const CAMEOS = [
  { sign: S, cap: 'You reply | *the same day.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -210 }, hops: [1.3],
    front(x, t, lt, P) {
      phone(x, 780, 860, pop01(t, P.t0 + 0.2, 0.3, 2), pop01(t, P.t0 + 0.9, 0.3, 2.2))
      label(x, 780, 1120, 'SAME DAY. WOW.', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04 })
    } },
  { sign: S, cap: 'Feelings? | *Switched on.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: { x: -210 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      toggle(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), ease.outBack(prog(lt, 0.9, 1.1)))
      if (lt > 1.1) hearts(x, t, 650, 820, P.t0 + 1.2, { n: 6, life: 1.8, spread: 120, cell: 7, seed: 2 })
      label(x, 790, 1110, 'NOT A GLITCH', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You let people | *get close.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -230 },
    front(x, t, lt, P) {
      const drop = ease.inOutCubic(prog(lt, 0.8, 1.3))
      rope(x, 600, 960, pop01(t, P.t0 + 0.2, 0.35, 2), drop)
      const k = pop01(t, P.t0 + 0.3, 0.35, 2), walk = ease.inOutCubic(prog(lt, 1.3, 1.9))
      if (k > 0.01) signChar(x, t, 'libra', lerp(860, 690, walk), 960, 180 * k, { mood: lt > 1.7 ? 'sparkle' : 'neutral', look: [-1, 0], seed: 22, glyph: false, hops: [P.t0 + 2.3] })
      label(x, 600, 640, 'COME IN', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 40, bg: GOLD, rot: -0.05 })
    } },
  { sign: S, cap: 'Hugs last | *longer than a second.*', mood: lt => lt > 1.0 ? 'heart' : 'wide', star: { x: -80, y: 20, s: 270 }, hops: [0.7],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'taurus', 700, 920, 250 * k, { mood: 'heart', look: [-1, 0], seed: 23, glyph: false, squash: lt > 0.8 ? 0.06 : 0 })
      const secs = Math.min(7, Math.max(0, Math.floor((lt - 0.7) * 5)))
      label(x, 600, 650, `HUG: 0:0${secs}`, pop01(t, P.t0 + 0.7, 0.3, 2.2), { size: 44, bg: BONE, rot: -0.03, font: MONO, weight: 700 })
      if (lt > 1.6) label(x, 600, 1130, 'NEW RECORD', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: PINK, rot: 0.05 })
    } },
  { sign: S, cap: 'You show up. | *And stay.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, -1], star: { x: -210, y: 30 }, hops: [1.5],
    front(x, t, lt, P) {
      const m = lerp(0, 60, ease.inOutCubic(prog(lt, 0.6, 1.4)))
      clock(x, 780, 820, pop01(t, P.t0 + 0.2, 0.35, 2), 12 + m / 60, m)
      label(x, 780, 660, '1 AM', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 34, bg: LAV, rot: 0.06, font: MONO, weight: 700 })
      label(x, 780, 1050, 'STILL HERE', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 40, bg: GOLD, rot: -0.04 })
    } },
  { sign: S, cap: 'Your match meets | *the real you.*', mood: lt => lt > 1.4 ? 'wink' : 'happy', look: [1, 0], star: { x: -220 }, hops: [1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      profile(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      label(x, 790, 1130, 'BIO: HONEST', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Your big brain | *gets days off.*', mood: lt => lt > 1.2 ? 'sleepy' : 'squint', look: [1, -1], star: { x: -210, y: 90 }, hops: [],
    front(x, t, lt, P) {
      const spin = t * 3 * (1 - ease.outCubic(prog(lt, 0.6, 1.4))) + ease.outCubic(prog(lt, 0.6, 1.4)) * 2
      gears(x, t, 760, 720, pop01(t, P.t0 + 0.2, 0.35, 2), spin)
      label(x, 760, 1080, 'BRAIN: OFF (NICE)', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You cry | *at movies* now.', mood: lt => lt > 1.0 ? 'wide' : 'happy', tears: lt => lt > 1.0 ? 2 : 0, look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      drawBits(x, POPCORN, POPCORN_C, 790, 980, 20 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.06 })
      bubble(x, 760, 650, 'the DOG | came home', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 38, tail: 'bl' })
      if (lt > 1.6) label(x, 790, 1160, 'HUMAN AFTER ALL', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Still weird. | *Now warm too.*', mood: lt => lt > 1.2 ? 'heart' : 'wink', look: [1, 0], star: { x: -200 }, hops: [1.4],
    front(x, t, lt, P) {
      drawBits(x, MUG, MUG_C, 790, 900, 26 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 1110, 'WEIRD + WARM', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 40, bg: GOLD, rot: 0.04 })
      hearts(x, t, 790, 740, P.t0 + 1.3, { n: 5, life: 1.6, spread: 140, cell: 6, seed: 7 })
    } },
]

const F = makeFilm({
  id: 'v3a051', key: 'D', accent: TEAL, solo: S, ending: 'card',
  title: 'Signs you’re a | *healed Aquarius.*',
  cameos: CAMEOS,
  card: { a: 'aquarius', b: 'taurus', chip: 'ALIGNED' },
  group: { cap: 'Still cool. | *Now cozy.*', mood: 'heart' },
  lesson: { text: 'Letting people in | *keeps you free.*', chip: 'HEART: UNLOCKED' },
  last: {
    text: 'Taurus got | *the long hug.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 8, life: 2.2, spread: 700, cell: 8, seed: 6 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
