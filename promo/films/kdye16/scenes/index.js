// kdye16: DATE YOURSELF, "A Whole Saturday, Just Me" (67 s vertical, LONG, star_advice post, lofi · D). Row: month2/m16.md.
// Feeling: perfectionism, never resting. Engine: ../../kdye01/dykit.js · props: ../../kdye01/props.js.
// Promise up front: "wait for the last thing on the list". Running gag: the list keeps trying to add chores (crossed out).
//   0.0–3.4   FRAME 0: ♍ Virgo mid-scream as a to-do list unrolls down the screen and hits the floor. Whip at 0.12.
//             Hook "Virgo's to-do list has | *ONE item* today." Stamp at 1.3. Promise sticker 3.5–9.
//   CH 1 MORNING        3.4 no alarm (slept till 9:47; "clean grout" crossed) · 10.4 slow coffee ("reply to emails" crossed)
//   CH 2 THE FUN ERRAND 18.0 the flower market (Pisces cries at the tulips) · 25.6 the walk home ("fold socks" crossed)
//   CH 3 AFTERNOON      33.0 the library (no highlighter) · 40.6 a nap in a sun patch ("deep clean" crossed)
//   CH 4 EVENING        48.0 cook something simple · 56.0 "things I liked today", then the ONE item: "be proud of me" ✓
//   65.2–67   last line "Rest was on the list | *all along.*", hard cut.
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { makeDate } from '../../kdye01/dykit.js'
import {
  INK, BONE, GOLD, PINK, RED, INTER, MONO, R, box, room, street, mug, plant, book, plate, shadow, glow, drawBits, windowFrame, sun,
  sparkles, hearts, confetti, bubble, label, pop01, outK, r3, CORAL, SKYB, MINT,
} from '../../kdye01/props.js'

const D = 67.0
const VIR = '#a8e07a'
const ST = { alarm: [3.4, 10.4], coffee: [10.4, 18.0], flowers: [18.0, 25.6], walk: [25.6, 33.0], library: [33.0, 40.6], nap: [40.6, 48.0], cook: [48.0, 56.0], list: [56.0, 67.0] }
const CHORES = [[6.6, 'clean the grout'], [13.6, 'reply to emails'], [28.8, 'fold the socks'], [44.0, 'deep clean the oven'], [51.0, 'reorganise the spices']]

// the chore gag: a list strip drops in from the top, gets a red line, flies off
function chore(x, t) {
  for (const [t0, txt] of CHORES) {
    const u = t - t0
    if (u < 0 || u > 2.2) continue
    const drop = ease.outBack(clamp(u / 0.35)), fly = ease.inCubic(prog(u, 1.6, 2.2))
    x.save(); x.translate(540 + fly * 900, lerp(-120, 720, drop) - fly * 200); x.rotate(-0.05 + fly * 0.8)
    box(x, -260, -50, 520, 100, BONE, { b: 6 }); R(x, '#b8acd0', -260, -50, 16, 100)
    x.font = `800 34px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('+ ' + txt, 0, 2)
    const c = ease.outCubic(prog(u, 0.7, 0.95)); if (c > 0) R(x, RED, -240, -8, 480 * c, 16)
    x.restore()
    if (u > 0.95 && u < 1.6) label(x, 'NOT TODAY', 540, 820, { size: 46, col: RED, font: INTER, weight: 800, rot: 0.06 })
  }
}
function bedroom(x, sky = 'dawn') { room(x, { wall: '#4a5a7a', wall2: '#435372', floor: '#3a3048', floorY: 1320, win: { x: 680, y: 560, w: 300, h: 280, sky } }) }
function kitchen(x) { room(x, { wall: '#4a6a5a', wall2: '#436353', floor: '#3a2a2a', floorY: 1320, win: { x: 700, y: 560, w: 280, h: 260, sky: 'day' } }); box(x, 40, 1060, 1000, 36, '#c9b8a0', { b: 7 }); box(x, 60, 1096, 960, 224, '#7a5a3a', { b: 7 }) }

function opener(x, t, S) {
  bedroom(x, 'dawn')
  // the giant list unrolling down the screen
  const len = lerp(900, 1500, clamp((t + 0.6) / 1.4))
  x.save(); x.translate(600, 520); x.rotate(-0.04)
  box(x, -170, 0, 340, len, BONE, { b: 6 })
  for (let i = 0; i < len / 44; i++) { R(x, '#8a88c0', -140, 20 + i * 44, 200 + ((i * 53) % 80), 8); R(x, INK, -150 + 0, 16 + i * 44, 14, 14) }
  x.restore()
  label(x, 'TO-DO', 600, 490, { size: 40, col: GOLD, font: INTER, weight: 800 })
  S.hero(x, t, { x: 260, y: 1180, s: 280, mood: 'wide', look: [1, -0.6], squash: -0.12 })
  label(x, 'AAAA', 260, 960, { size: 54, col: RED, font: INTER, weight: 800, rot: -0.1 })
  S.pis(x, t, { x: 930, y: 1480, s: 130, mood: 'wide', look: [-1, -0.6] }, 1)
}

function alarm(x, t, S) {
  const { u } = S
  bedroom(x, 'day')
  box(x, 120, 1100, 620, 120, '#c9a6ff', { b: 7 }); box(x, 120, 1040, 160, 70, BONE, { b: 5 })
  // the clock: 7:00 flashing, then 9:47
  const late = u > 1.4
  box(x, 780, 1010, 180, 110, INK, { b: 6 }); label(x, late ? '9:47' : (Math.floor(t * 3) % 2 ? '7:00' : ''), 870, 1066, { size: 50, col: late ? MINT : RED })
  if (late) label(x, 'slept in', 870, 960, { size: 28, col: BONE })
  S.hero(x, t, { x: 400, y: 1000, s: 250, mood: u < 1.4 ? 'sleepy' : u < 2.2 ? 'wide' : 'happy', look: [1, 0.2], squash: u > 2.2 && u < 3.2 ? -0.12 * Math.sin((u - 2.2) * 3) : 0, hops: [S.a + 2.2] })
  chore(x, t)
}
function coffee(x, t, S) {
  const { u } = S
  kitchen(x)
  mug(x, 560, 1060, { col: '#ffd0e4', steam: 1, t, s: 1.6 })
  S.hero(x, t, { x: 300, y: 940, s: 250, mood: u > 3.8 ? 'heart' : 'happy', look: [1, 0.4], hops: [S.a + 3.8] })
  if (u > 3.8) hearts(x, t, S.a + 3.8, 560, 860, { n: 4 })
  chore(x, t)
}
function flowers(x, t, S) {
  const { u } = S
  street(x, t, { horizon: 1260, sky: 'day', lamps: [], tint: '#3a3260' })
  for (let i = 0; i < 6; i++) R(x, i % 2 ? BONE : '#5fd38a', 120 + i * 140, 700, 140, 90)
  box(x, 140, 1040, 800, 220, '#6b4428', { b: 7 })
  const FL = ['.P.', 'PYP', '.P.']
  for (let i = 0; i < 12; i++) { const fx = 190 + (i % 6) * 130, fy = 990 - Math.floor(i / 6) * 70; R(x, '#3f8f5a', fx - 3, fy, 6, 60); drawBits(x, FL, { P: [PINK, CORAL, '#c9a6ff', GOLD][i % 4], Y: GOLD }, fx, fy, 11) }
  S.pis(x, t, { x: 820, y: 860, s: 150, mood: 'sparkle', look: [-1, 0.4] }, 3)
  bubble(x, t, 800, 680, S.a + 1.2, S.a + 5.6, 'the TULIPS', { size: 28, col: '#c9ecfb' })
  S.hero(x, t, { x: 300, y: 1260, s: 240, mood: u > 3.4 ? 'sparkle' : 'happy', look: [1, -0.6], hops: [S.a + 3.4] })
}
function bouquet(x, cx, cy, s = 1) { const FL = ['.P.', 'PYP', '.P.']; for (let i = 0; i < 5; i++) { R(x, '#3f8f5a', cx - 20 + i * 10, cy, 6, 80 * s); drawBits(x, FL, { P: [PINK, CORAL, '#c9a6ff', GOLD, PINK][i], Y: GOLD }, cx - 40 + i * 22, cy - 10 - (i % 2) * 20, 10 * s) } }
function walk(x, t, S) {
  const { u } = S
  street(x, t, { horizon: 1260, sky: 'day', lamps: [160, 920], tint: '#3a3260' })
  const wx = lerp(200, 760, prog(u, 0, 7.2))
  S.hero(x, t, { x: wx, y: 1120, s: 250, mood: 'sparkle', look: [1, -0.2], hops: Array.from({ length: 14 }, (_, i) => S.a + i * 0.52) })
  bouquet(x, wx + 120, 1060, 1.2)
  chore(x, t)
}
function library(x, t, S) {
  const { u } = S
  room(x, { wall: '#3a2a52', wall2: '#33244a', floor: '#2a1f40', floorY: 1320, stripes: false })
  const cols = ['#e8628a', '#4f7cd8', GOLD, '#5fd38a', '#c9a6ff', CORAL]
  for (let r = 0; r < 3; r++) { const y = 420 + r * 220; R(x, INK, 40, y + 180, 1000, 20); for (let i = 0; i < 22; i++) { const h = 120 + ((i * 37 + r * 11) % 50); box(x, 60 + i * 44, y + 180 - h, 30, h, cols[(i + r) % cols.length], { b: 3 }) } }
  book(x, 640, 1160, { open: 1, col: '#4f7cd8', s: 1.2 })
  S.hero(x, t, { x: 330, y: 1160, s: 240, mood: u > 3.6 ? 'sparkle' : 'happy', look: [1, 0.6], hops: [S.a + 3.6] })
  // a highlighter, rejected
  const hk = pop01(t, S.a + 3.2, 0.3, 2) * outK(t, [S.a + 5.0, S.a + 5.6])
  if (hk > 0.01) { x.save(); x.translate(lerp(820, 1300, prog(u, 4.6, 5.6)), 940); x.rotate(0.6 + u); box(x, -18, -70, 36, 140, '#e8f05a', { b: 4 }); x.restore() }
}
function nap(x, t, S) {
  const { u } = S
  bedroom(x, 'day')
  // the sun patch moving across the floor
  const px = lerp(160, 760, prog(u, 0, 7.4))
  x.save(); x.globalAlpha = 0.35; x.fillStyle = '#ffe9a8'; x.beginPath(); x.moveTo(px, 1320); x.lineTo(px + 300, 1320); x.lineTo(px + 360, 1500); x.lineTo(px - 60, 1500); x.fill(); x.restore()
  box(x, 140, 1080, 760, 160, '#5f8ad0', { b: 7, hi: '#7fa8e8' }); box(x, 140, 980, 120, 100, '#5f8ad0', { b: 6 }); box(x, 780, 980, 120, 100, '#5f8ad0', { b: 6 })
  S.hero(x, t, { x: 520, y: 1000, s: 250, mood: 'sleepy', look: [0, 0], squash: 0.12 })
  chore(x, t)
}
function cook(x, t, S) {
  const { u } = S
  kitchen(x)
  box(x, 480, 930, 260, 130, '#4a4460', { b: 7 })
  for (let i = 0; i < 4; i++) { const p = ((t * 0.6 + i / 4) % 1); x.save(); x.globalAlpha = 0.6 * (1 - p); R(x, '#fff6ea', 520 + i * 50 + 10 * Math.sin(t * 3 + i), 890 - p * 220, 14, 30); x.restore() }
  if (u > 4.2) plate(x, 860, 1050, 180, { food: (c, px, py) => drawBits(c, ['..YYYY..', '.YYRYYY.', 'YYYYYRYY'], { Y: '#ffe08a', R: '#e8504a' }, px, py, 9) })
  sparkles(x, t, 860, 1020, S.a + 4.2, 10, 140, 1)
  S.hero(x, t, { x: 280, y: 960, s: 240, mood: u > 4.2 ? 'heart' : 'happy', look: [1, 0.4], hops: [S.a + 1.0, S.a + 2.0, S.a + 4.2] })
  chore(x, t)
}
function list(x, t, S) {
  const { u } = S
  bedroom(x, 'night')
  // the evening list on the bed
  x.save(); x.translate(560, 880); x.rotate(-0.03)
  box(x, -260, -260, 520, 520, BONE, { b: 7 })
  x.font = `800 36px ${INTER}`; x.fillStyle = INK; x.textAlign = 'left'; x.textBaseline = 'middle'
  x.fillText('things I liked today:', -230, -210)
  const liked = ['the warm coffee', 'the tulips', 'that nap'];
  liked.forEach((s, i) => { if (u > 1.0 + i * 0.9) { x.font = `700 32px ${MONO}`; x.fillStyle = '#3b3a8a'; x.fillText('· ' + s, -220, -140 + i * 64) } })
  if (u > 4.6) {
    R(x, INK, -240, 70, 480, 6)
    x.font = `800 30px ${INTER}`; x.fillStyle = INK; x.fillText("today's ONE item:", -230, 120)
    x.font = `italic 500 52px 'EB Garamond', serif`; x.fillStyle = '#b2402a'; x.fillText('be proud of me', -200, 190)
    R(x, INK, -238, 166, 34, 34); R(x, BONE, -234, 170, 26, 26)
    if (u > 6.4) drawBits(x, ['.....G', '....GG', 'G..GG.', 'GGGG..', '.GG...'], { G: '#3fb06a' }, -220, 180, 9)
  }
  x.restore()
  if (u > 6.4) { confetti(x, t, S.a + 6.4, 540, 760); sparkles(x, t, 340, 940, S.a + 6.4, 12, 160, 1) }
  S.hero(x, t, { x: 230, y: 1240, s: 230, mood: u > 6.4 ? 'heart' : 'happy', look: [1, -0.6], hops: [S.a + 6.4] })
  S.pis(x, t, { x: 880, y: 1240, s: 160, mood: u > 6.4 ? 'happy' : 'sparkle', look: [-1, -0.6], hops: [S.a + 6.5] }, u > 6.4 ? 3 : 2)
}

const stop = (k, draw, cues = []) => ({ a: ST[k][0], b: ST[k][1], sticker: null, draw, cues })
const EP = makeDate({
  id: 'kdye16', sign: 'virgo', name: 'Virgo', D, ending: 'cut',
  hook: "Virgo's to-do list has | *ONE item* today.", hookSize: 100, hookAccent: VIR,
  fx: [{ kind: 'whip', o: { at: 0.12, len: 0.45, from: 1.5 } }],
  promise: { text: 'wait for *the last thing* on the list', at: 3.6, out: [9.4, 9.7], top: 400 },
  chapters: [
    { at: 3.4, out: [17.6, 18.0], n: 1, title: 'MORNING' },
    { at: 18.0, out: [32.6, 33.0], n: 2, title: 'THE FUN ERRAND' },
    { at: 33.0, out: [47.6, 48.0], n: 3, title: 'AFTERNOON' },
    { at: 48.0, out: [64.6, 65.0], n: 4, title: 'EVENING' },
  ],
  opener,
  stops: [
    stop('alarm', alarm, [['pluck', 0.2, 1760, 0.02, 0.2, 0], ['pluck', 0.55, 1760, 0.02, 0.2, 0], ['pop', 1.4, 659.25, 0.04, 0.3], ['whoosh', 2.2, 0.3, 0.03]]),
    stop('coffee', coffee, [['whoosh', 0.02, 0.4, 0.035], ['pluck', 3.8, 1174.66, 0.04, 0.5, 0]]),
    stop('flowers', flowers, [['whoosh', 0.02, 0.4, 0.035], ['glitter', 0.3, 0.9], ['pop', 1.2, 880, 0.03, 0.4], ['pop', 3.4, 1318.51, 0.04, -0.3]]),
    stop('walk', walk, [['whoosh', 0.02, 0.4, 0.035], ...Array.from({ length: 14 }, (_, i) => ['tick', r3(i * 0.52), 0.015])]),
    stop('library', library, [['whoosh', 0.02, 0.4, 0.035], ['tick', 1.0, 0.03], ['tick', 2.2, 0.03], ['pop', 3.2, 987.77, 0.03, 0.4], ['whoosh', 4.6, 0.4, 0.03]]),
    stop('nap', nap, [['whoosh', 0.02, 0.4, 0.035], ['pluck', 1.0, 440, 0.02, 1.2, 0], ['pluck', 3.0, 392, 0.02, 1.2, 0]]),
    stop('cook', cook, [['whoosh', 0.02, 0.4, 0.035], ['tick', 1.0, 0.03], ['tick', 2.0, 0.03], ['pop', 4.2, 1318.51, 0.045, 0.3], ['glitter', 4.2, 4.6]]),
    stop('list', list, [['whoosh', 0.02, 0.4, 0.035], ['tick', 1.0, 0.04], ['tick', 1.9, 0.04], ['tick', 2.8, 0.04], ['riser', 3.6, 4.6, 0.02], ['pop', 4.6, 880, 0.04, 0], ['pop', 6.4, 1567.98, 0.06, 0], ['bell', 6.45, 2093, 0.04, 1.4, 0], ['glitter', 6.4, 7.0]]),
  ],
  lines: [
    { t: 4.0, who: 'stars', text: "today's list has *one* thing on it." },
    { t: 7.4, who: 'hero', text: 'but the grout. the *grout.*' },
    { t: 11.0, who: 'stars', text: "drink it while it's *hot.* for once." },
    { t: 14.8, who: 'hero', text: "it's… so *warm.*" },
    { t: 18.8, who: 'hero', text: 'which ones are *for me?*' },
    { t: 21.8, who: 'stars', text: '*all* of them, if you like.' },
    { t: 26.4, who: 'stars', text: 'carry them like a *trophy.*' },
    { t: 30.0, who: 'hero', text: "emails can *wait.* flowers can't." },
    { t: 33.8, who: 'stars', text: 'read for *fun.* not for notes.' },
    { t: 37.0, who: 'hero', text: 'no highlighter? *wild.*' },
    { t: 41.4, who: 'stars', text: 'a nap is not a *failure.*' },
    { t: 45.4, who: 'hero', text: 'zzz… *productive* zzz…' },
    { t: 48.8, who: 'stars', text: 'something simple. *no* stress.' },
    { t: 52.8, who: 'hero', text: 'pasta. *perfect.* done.' },
    { t: 56.6, who: 'stars', text: 'now: things you *liked* today.' },
    { t: 60.0, who: 'stars', text: 'and the *one* item?' },
  ],
  boxes: [[3.8, 10.2, [0, 1]], [10.8, 17.8, [2, 3]], [18.6, 25.4, [4, 5]], [26.2, 32.8, [6, 7]], [33.6, 40.4, [8, 9]], [41.2, 47.8, [10, 11]], [48.6, 55.8, [12, 13]], [56.4, 64.6, [14, 15]]],
  last: { t: 65.2, text: 'Rest was on the list | *all along.*', top: 300, size: 100, accent: VIR },
  cues: [['tick', 0.0, 0.05], ...CHORES.flatMap(([t0]) => [['whoosh', t0, 0.3, 0.03], ['tick', r3(t0 + 0.7), 0.06], ['pop', r3(t0 + 0.95), 440, 0.04, 0], ['whoosh', r3(t0 + 1.6), 0.4, 0.03]])],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [PINK, SKYB, plant, shadow, glow, windowFrame, sun]
