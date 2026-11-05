// kdye19: DATE YOURSELF, "The Unbirthday" (69.6 s vertical, LONG, star_advice post, funk · E, LOOP). Row: month2/m16.md.
// Feeling: waiting for other people to celebrate you. Engine: ../../kdye01/dykit.js · props: ../../kdye01/props.js.
// Promise up front: "wait for the card it writes itself". Payoff: "Proud of you. No reason. Just you."
//   0.0–3.4   FRAME 0: ♌ Leo mid-shout "SURPRISE!" to an empty room, a party popper mid-burst. Whip at 0.12.
//             Hook "Leo throws a party. | *Guest list: Leo.*" Stamp at 1.3.
//   CH 1 THE CAKE FOR NO REASON  3.4 baking · 11.0 decorating ("TUESDAY"), Pisces cries at the candles through the window
//   CH 2 THE PLAYLIST            19.0 the solo dance · 26.6 the spin under a disco ball
//   CH 3 THE TOAST               34.0 cocoa raised "to me" · 41.6 the candles and the wish
//   CH 4 THE CARD                49.0 writing it · 58.0 reading it (Leo's happy tears, Pisces fountains)
//   67.8–69.6  last line "You don't need a reason | to *celebrate you.*", then a loop back to frame 0.
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { makeDate } from '../../kdye01/dykit.js'
import {
  INK, BONE, GOLD, PINK, RED, INTER, MONO, R, box, room, mug, candle, table, windowFrame, shadow, glow, drawBits,
  sparkles, hearts, confetti, bubble, label, pop01, outK, r3, CORAL, SKYB, MINT,
} from '../../kdye01/props.js'

const D = 69.6
const LEO = '#ffb04a'
const ST = { bake: [3.4, 11.0], deco: [11.0, 19.0], dance: [19.0, 26.6], spin: [26.6, 34.0], toast: [34.0, 41.6], wish: [41.6, 49.0], write: [49.0, 58.0], read: [58.0, 69.6] }
const NOTE = ['..NN', '..NN', '..N.', '..N.', 'NNN.', 'NNN.']
function party(x, t, { lights = 0 } = {}) {
  room(x, { wall: '#5a3a6a', wall2: '#52345f', floor: '#3a2a4a', floorY: 1320, stripes: true })
  // bunting
  for (let i = 0; i < 12; i++) { const bx = 40 + i * 90, by = 520 + 30 * Math.sin(i * 0.6); x.fillStyle = INK; x.beginPath(); x.moveTo(bx - 4, by - 4); x.lineTo(bx + 74, by - 4); x.lineTo(bx + 35, by + 70); x.fill(); x.fillStyle = [GOLD, PINK, SKYB, MINT][i % 4]; x.beginPath(); x.moveTo(bx, by); x.lineTo(bx + 70, by); x.lineTo(bx + 35, by + 62); x.fill() }
  if (lights > 0) { x.save(); x.globalCompositeOperation = 'lighter'; ['255,90,160', '90,200,255', '255,210,90'].forEach((c, i) => glow(x, 200 + i * 340, 900 + 140 * Math.sin(t * 3 + i), 420, c, 0.2 * lights * (0.6 + 0.4 * Math.sin(t * 8 + i * 2)))); x.restore() }
}
function cake(x, cx, base, t, { text = 'TUESDAY', lit = 0, frost = 1 } = {}) {
  box(x, cx - 170, base - 150, 340, 150, '#ffd0e4', { b: 7 })
  R(x, '#ff8fb1', cx - 170, base - 150, 340, 30)
  if (frost > 0) { x.font = `800 ${38}px ${INTER}`; x.fillStyle = '#b2402a'; x.textAlign = 'center'; x.textBaseline = 'middle'; const n = Math.floor(text.length * frost); x.fillText(text.slice(0, n), cx, base - 70) }
  if (lit > 0) for (let i = 0; i < 4; i++) candle(x, cx - 105 + i * 70, base - 150, t, { h: 60, col: [SKYB, GOLD, MINT, PINK][i], lit })
}
const POPPER = ['....GG', '...GGR', '..GGR.', '.GGR..', 'GGR...', 'GR....']

function opener(x, t, S) {
  party(x, t)
  confetti(x, t, -0.5, 700, 760, { n: 40, life: 4 })
  drawBits(x, POPPER, { G: GOLD, R: RED }, 760, 900, 18, { rot: -0.2 })
  S.hero(x, t, { x: 420, y: 1080, s: 300, mood: 'wide', look: [0, 0], squash: -0.1 })
  label(x, 'SURPRISE!', 540, 760, { size: 90, col: GOLD, font: INTER, weight: 800, rot: -0.06 })
  label(x, '(guests: 0)', 540, 850, { size: 32, col: BONE })
  S.pis(x, t, { x: 930, y: 1480, s: 130, mood: 'wide', look: [-1, -0.6] }, 1)
}
function bake(x, t, S) {
  const { u } = S
  party(x, t)
  box(x, 600, 940, 300, 380, '#8c86a8', { b: 7 }); R(x, '#2a2048', 630, 1000, 240, 160); x.save(); x.globalCompositeOperation = 'lighter'; glow(x, 750, 1080, 160, '255,140,60', 0.4); x.restore()
  box(x, 200, 1080, 220, 120, BONE, { b: 6 }); const a = t * 6; R(x, INK, 300 + Math.cos(a) * 40, 960, 12, 130)
  const ph = u > 2.4 && u < 4.6
  S.hero(x, t, { x: 320, y: 900, s: 220, mood: ph ? 'squint' : 'happy', look: ph ? [0, 1] : [0.6, 0.4], hops: [S.a + 0.6, S.a + 1.2, S.a + 1.8] })
  if (ph) bubble(x, t, 320, 700, S.a + 2.4, S.a + 4.6, 'any birthday texts?', { size: 30, col: '#d8d0f0' })
}
function deco(x, t, S) {
  const { u } = S
  party(x, t)
  windowFrame(x, { x: 740, y: 640, w: 260, h: 260, sky: 'night' })
  x.save(); x.beginPath(); x.rect(740, 640, 260, 260); x.clip(); S.pis(x, t, { x: 870, y: 820, s: 150, mood: 'sparkle', look: [-1, 0.6] }, u > 4.0 ? 3 : 2); x.restore()
  table(x, 420, 1220, 520)
  cake(x, 420, 1220, t, { frost: clamp(prog(u, 0.4, 2.4)), lit: clamp(prog(u, 3.6, 4.0)) })
  S.hero(x, t, { x: 180, y: 1100, s: 200, mood: u > 4 ? 'sparkle' : 'happy', look: [1, 0.4], hops: [S.a + 4.0] })
}
function dance(x, t, S) {
  const { u } = S
  party(x, t, { lights: 1 })
  const pose = Math.floor(u * 2.2) % 4
  S.hero(x, t, { x: 540 + [0, -80, 0, 80][pose], y: 1060, s: 300, mood: ['happy', 'wink', 'sparkle', 'happy'][pose], look: [0, 0], squash: [0.1, -0.08, 0.12, -0.08][pose], hops: Array.from({ length: 18 }, (_, i) => S.a + i * 0.455) })
  for (let i = 0; i < 5; i++) { const p = ((t * 0.5 + i / 5) % 1); drawBits(x, NOTE, { N: [GOLD, PINK, SKYB][i % 3] }, 180 + i * 180, 1100 - p * 500, 9, { alpha: Math.sin(Math.PI * p) }) }
}
function spin(x, t, S) {
  const { u } = S
  party(x, t, { lights: 1 })
  // disco ball
  R(x, INK, 538, 0, 4, 640); x.save(); x.translate(540, 700); for (let i = -3; i <= 3; i++) for (let j = -3; j <= 3; j++) if (i * i + j * j <= 10) R(x, (i + j + Math.floor(t * 6)) % 2 ? '#e8e2f4' : '#9a94b8', i * 22 - 11, j * 22 - 11, 20, 20); x.restore()
  const sp = u > 2.0 && u < 3.2
  S.hero(x, t, { x: 540, y: 1100, s: 290, mood: sp ? 'wide' : 'sparkle', look: [0, 0], squash: sp ? 0.25 * Math.sin((u - 2) * 25) : 0, hops: [S.a + 3.2] })
  if (u > 3.2) { confetti(x, t, S.a + 3.2, 540, 900); sparkles(x, t, 540, 1000, S.a + 3.2, 12, 220, 1) }
  if (u > 3.2 && u < 5) label(x, '10/10', 820, 900, { size: 64, col: GOLD, font: INTER, weight: 800, rot: 0.1 })
}
function toast(x, t, S) {
  const { u } = S
  party(x, t)
  windowFrame(x, { x: 600, y: 640, w: 380, h: 380, sky: 'night' })
  // the reflection in the window
  x.save(); x.beginPath(); x.rect(600, 640, 380, 380); x.clip(); x.globalAlpha = 0.45; S.hero(x, t, { x: 790, y: 900, s: 200, mood: 'happy', look: [-1, 0] }); x.restore()
  const raise = ease.outBack(prog(u, 1.0, 1.6))
  S.hero(x, t, { x: 300, y: 1120, s: 260, mood: 'happy', look: [1, -0.4] })
  mug(x, lerp(400, 520, raise), lerp(1150, 980, raise), { col: GOLD, steam: 1, t })
  if (u > 2.0 && u < 3.4) label(x, 'clink', 600, 880, { size: 44, col: BONE, font: INTER, weight: 800, alpha: outK(t, [S.a + 3.0, S.a + 3.4]) })
}
function wish(x, t, S) {
  const { u } = S
  party(x, t)
  table(x, 540, 1220, 520)
  const out = u > 3.6
  cake(x, 540, 1220, t, { lit: out ? 0 : 1 })
  if (out) for (let i = 0; i < 4; i++) { const p = clamp((u - 3.6) / 1.5); x.save(); x.globalAlpha = 0.6 * (1 - p); R(x, '#c9c2d8', 440 + i * 70, 1000 - p * 140, 10, 26); x.restore() }
  S.hero(x, t, { x: 540, y: 880, s: 220, mood: u > 1.0 && u < 3.4 ? 'sleepy' : 'happy', look: [0, 1], zzz: false, squash: u > 3.3 && u < 3.7 ? -0.15 : 0 })
  if (u > 1.0 && u < 3.4) label(x, '(wishing)', 540, 690, { size: 30, col: BONE })
  S.pis(x, t, { x: 920, y: 1100, s: 130, mood: 'sparkle', look: [-1, 0] }, 3)
}
function card(x, t, S, read) {
  const { u } = S
  party(x, t)
  const open = read ? 1 : clamp(prog(u, 0.4, 1.0))
  x.save(); x.translate(560, 820); x.rotate(-0.03)
  box(x, -280, -200, 560, 400, '#fff1c8', { b: 7 }); R(x, PINK, -280, -200, 560, 18)
  const msg = ['Proud of you.', 'No reason.', 'Just you.'], full = msg.join(' ')
  const n = read ? full.length : Math.floor(full.length * clamp(prog(u, 3.0, 7.6)))
  let k = 0
  x.font = `italic 500 64px 'EB Garamond', serif`; x.fillStyle = '#b2402a'; x.textAlign = 'center'; x.textBaseline = 'middle'
  msg.forEach((m, i) => { const s = full.slice(k, Math.min(n, k + m.length)); k += m.length + 1; x.fillText(s, 0, -100 + i * 100) })
  x.restore()
  void open
  if (!read) { S.hero(x, t, { x: 220, y: 1220, s: 220, mood: u < 3 ? 'neutral' : 'happy', look: [1, -0.6], hops: [S.a + 3.0] }); return }
  sparkles(x, t, 560, 820, S.a + 0.3, 14, 300, 1)
  hearts(x, t, S.a + 1.0, 260, 1000, { n: 6 })
  S.hero(x, t, { x: 260, y: 1220, s: 240, mood: 'heart', look: [1, -0.6], tears: 2, hops: [S.a + 0.4] })
  S.pis(x, t, { x: 860, y: 1220, s: 170, mood: 'happy', look: [-1, -0.6] }, 3)
}

const stop = (k, draw, cues = []) => ({ a: ST[k][0], b: ST[k][1], sticker: null, draw, cues })
const EP = makeDate({
  id: 'kdye19', sign: 'leo', name: 'Leo', D, ending: 'loop',
  hook: 'Leo throws a party. | *Guest list: Leo.*', hookSize: 104, hookAccent: LEO,
  fx: [{ kind: 'whip', o: { at: 0.12, len: 0.45, from: 1.5 } }],
  promise: { text: 'wait for *the card* it writes itself', at: 3.6, out: [10.0, 10.3], top: 400 },
  chapters: [
    { at: 3.4, out: [18.6, 19.0], n: 1, title: 'THE CAKE FOR NO REASON' },
    { at: 19.0, out: [33.6, 34.0], n: 2, title: 'THE PLAYLIST' },
    { at: 34.0, out: [48.6, 49.0], n: 3, title: 'THE TOAST' },
    { at: 49.0, out: [67.2, 67.6], n: 4, title: 'THE CARD' },
  ],
  opener,
  stops: [
    stop('bake', bake, [['tick', 0.6, 0.03], ['tick', 1.2, 0.03], ['tick', 1.8, 0.03], ['pop', 2.4, 659.25, 0.03, 0.3]]),
    stop('deco', deco, [['whoosh', 0.02, 0.4, 0.035], ...Array.from({ length: 7 }, (_, i) => ['tick', r3(0.4 + i * 0.28), 0.02]), ['glitter', 3.6, 4.1], ['pluck', 4.0, 1174.66, 0.04, 0.5, 0.4]]),
    stop('dance', dance, [['whoosh', 0.02, 0.4, 0.035], ...Array.from({ length: 16 }, (_, i) => ['tick', r3(i * 0.455), 0.025])]),
    stop('spin', spin, [['riser', 1.0, 2.0, 0.02], ['whoosh', 2.0, 1.2, 0.05], ['pop', 3.2, 1567.98, 0.06, 0], ['glitter', 3.2, 3.8]]),
    stop('toast', toast, [['whoosh', 0.02, 0.4, 0.035], ['whoosh', 1.0, 0.3, 0.03], ['bell', 2.0, 2349.32, 0.04, 0.8, 0.3]]),
    stop('wish', wish, [['whoosh', 0.02, 0.4, 0.035], ['whoosh', 3.4, 0.6, 0.05], ['pop', 3.7, 440, 0.03, 0]]),
    stop('write', (x, t, S) => card(x, t, S, false), [['whoosh', 0.4, 0.3, 0.03], ...Array.from({ length: 16 }, (_, i) => ['tick', r3(3.0 + i * 0.28), 0.02])]),
    stop('read', (x, t, S) => card(x, t, S, true), [['pop', 0.3, 1567.98, 0.05, 0], ['bell', 0.35, 2093, 0.04, 1.6, 0], ['glitter', 0.3, 1.0]]),
  ],
  lines: [
    { t: 4.0, who: 'stars', text: "whose birthday is it?" },
    { t: 7.4, who: 'hero', text: "*nobody's!* that's the point." },
    { t: 11.6, who: 'hero', text: 'it says *TUESDAY.* for Tuesday.' },
    { t: 15.0, who: 'pisces', text: 'the candles are so *pretty.*' },
    { t: 19.8, who: 'stars', text: 'your playlist. *your* rules.' },
    { t: 23.0, who: 'hero', text: "no one's *watching.* perfect." },
    { t: 27.4, who: 'hero', text: 'the *spin!* nailed it.' },
    { t: 30.6, who: 'stars', text: 'the floor *loves* you.' },
    { t: 34.8, who: 'hero', text: 'a toast… to *me.*' },
    { t: 38.0, who: 'stars', text: 'say why. *out loud.*' },
    { t: 42.2, who: 'hero', text: 'I just like *being* me.' },
    { t: 45.6, who: 'stars', text: 'make a wish. then *keep* it.' },
    { t: 49.8, who: 'stars', text: 'now the card. *be* kind.' },
    { t: 53.4, who: 'hero', text: 'dear Leo… *hmm.*' },
    { t: 58.8, who: 'hero', text: "I'm crying. at *my own* card." },
    { t: 62.6, who: 'stars', text: 'read it again. *slowly.*' },
  ],
  boxes: [[3.8, 10.8, [0, 1]], [11.4, 18.8, [2, 3]], [19.6, 26.4, [4, 5]], [27.2, 33.8, [6, 7]], [34.6, 41.4, [8, 9]], [42.0, 48.8, [10, 11]], [49.6, 57.8, [12, 13]], [58.6, 67.0, [14, 15]]],
  last: { t: 67.8, text: "You don't need a reason | to *celebrate you.*", top: 300, size: 92, accent: LEO },
  cues: [['pop', 0.0, 1760, 0.05, 0.2], ['glitter', 0.0, 0.8]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [CORAL, MONO, shadow, pop01]
