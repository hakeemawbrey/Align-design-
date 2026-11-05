// kdye20: DATE YOURSELF, "The Evening Walk" (71.4 s vertical, LONG, star_advice post, cinematic · Gm). Row: month2/m16.md.
// Feeling: missing an ex. Engine: ../../kdye01/dykit.js · props: ../../kdye01/props.js.
// Promise up front: "wait for what it does with the letter". Payoff: it folds the letter into a paper star, keeps it, and
// starts a new one: "Dear me,". Nothing is sent; nobody is checked on. Warm, healthy.
//   0.0–3.4   FRAME 0: ♏ Scorpio mid-dash out of its door, scarf whipping. Record scratch + sudden silence at 0.4.
//             Hook "Scorpio, missing them? | *Take yourself out.*" Stamp at 1.9.
//   CH 1 THE STREETLIGHTS      3.4 the lamps click on as it passes · 11.0 a memory bubble, one deep breath
//   CH 2 THE WINDOW DISPLAYS   19.0 the toy-train window (Pisces cries inside the display) · 26.6 one cocoa, extra hot
//   CH 3 THE LETTER            34.0 a bench, the letter it writes · 43.0 not sending it
//   CH 4 THE WAY HOME          52.0 the paper star · 61.0 "Dear me,"
//   70.2–71.4  last line "Missing them is allowed. | *So is your evening.*", hard cut.
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { makeDate } from '../../kdye01/dykit.js'
import {
  INK, BONE, GOLD, PINK, RED, INTER, MONO, R, box, room, street, lampPost, bench, mug, door, shadow, glow, drawBits,
  sparkles, hearts, bubble, label, pop01, outK, r3, CORAL, SKYB, MINT,
} from '../../kdye01/props.js'
import { drawPixelStar } from '../../sky.js'

const D = 71.4
const SCO = '#c86aff'
const ST = { lamps: [3.4, 11.0], memory: [11.0, 19.0], toys: [19.0, 26.6], cocoa: [26.6, 34.0], write: [34.0, 43.0], keep: [43.0, 52.0], fold: [52.0, 61.0], dearme: [61.0, 72.0] }
function scarf(x, F, t, s = 1) { // a red scarf flapping from the sprite's neck
  const nx = F.ox, ny = F.oy - F.S * 0.16
  R(x, INK, nx - 60 * s, ny - 6, 120 * s, 30); R(x, '#e8344e', nx - 56 * s, ny - 2, 112 * s, 22)
  for (let i = 0; i < 5; i++) { const w = 6 * Math.sin(t * 9 + i); R(x, i % 2 ? '#e8344e' : '#ff6b7f', nx + 40 * s + i * 24 * s, ny + 4 + w + i * 4, 26 * s, 18) }
}
const STARBM = ['....G....', '...GGG...', 'GGGGGGGGG', '.GGGGGGG.', '..GGGGG..', '.GGG.GGG.', 'GG.....GG']
function nightStreet(x, t, lit = [1, 1, 1]) {
  street(x, t, { horizon: 1260, sky: 'night', lamps: [], tint: '#2b2150' })
  ;[150, 540, 930].forEach((lx, i) => lampPost(x, lx, 1270, t, lit[i] > 0))
}
function letterPaper(x, cx, cy, lines, { rot = 0, s = 1, title = null } = {}) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  box(x, -220, -170, 440, 340, '#f4e8cc', { b: 6 })
  if (title) { x.font = `italic 500 46px 'EB Garamond', serif`; x.fillStyle = '#2c2a7a'; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(title, -190, -120) }
  for (let i = 0; i < lines; i++) R(x, '#8a88c0', -190, -70 + i * 40, 360 - ((i * 53) % 120), 6)
  x.restore()
}

function opener(x, t, S) {
  nightStreet(x, t, [0, 0, 1])
  door(x, 300, 1270, { open: 1, col: '#7a4fb0' })
  const F = S.hero(x, t, { x: 560, y: 1080, s: 280, mood: 'wide', look: [1, 0], squash: -0.1 })
  scarf(x, F, t)
  S.pis(x, t, { x: 930, y: 1480, s: 130, mood: 'wide', look: [-1, -0.6] }, 2)
}
function lamps(x, t, S) {
  const { u } = S
  const hx = lerp(80, 1000, prog(u, 0, 7.6))
  nightStreet(x, t, [hx > 150, hx > 540, hx > 930].map(Number))
  const F = S.hero(x, t, { x: hx, y: 1130, s: 220, mood: 'neutral', look: [1, -0.3], hops: Array.from({ length: 14 }, (_, i) => S.a + i * 0.55) })
  scarf(x, F, t, 0.8)
}
function memory(x, t, S) {
  const { u } = S
  nightStreet(x, t)
  // a memory bubble: two little silhouettes on this same street, then it pops
  const k = pop01(t, S.a + 0.4, 0.4, 2) * outK(t, [S.a + 4.6, S.a + 5.0])
  if (k > 0.01) {
    x.save(); x.translate(560, 720); x.scale(k, k)
    x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 300, 200, 0, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#3a2d66'; x.beginPath(); x.ellipse(0, 0, 288, 188, 0, 0, Math.PI * 2); x.fill()
    x.globalAlpha = 0.6; drawPixelStar(x, -60, 20, 90, 2, '#c9a6ff'); drawPixelStar(x, 70, 20, 90, 2, '#8a7ab8'); x.restore()
    for (let i = 0; i < 3; i++) R(x, '#3a2d66', 420 - i * 30, 940 + i * 36, 22 - i * 5, 22 - i * 5)
  }
  if (u > 5.0 && u < 5.6) label(x, 'pop.', 560, 720, { size: 44, col: BONE, font: INTER, weight: 800 })
  const breathe = u > 5.4 ? 1 + 0.06 * Math.sin((u - 5.4) * 3) : 1
  const F = S.hero(x, t, { x: 400, y: 1130, s: 230 * breathe, mood: u > 6 ? 'happy' : 'sleepy', look: [0.4, -1], zzz: false, tears: u > 1.0 && u < 5.4 ? 1 : 0 })
  scarf(x, F, t, 0.8)
}
function toys(x, t, S) {
  const { u } = S
  street(x, t, { horizon: 1300, sky: 'night', lamps: [80, 1000], tint: '#2b2150' })
  box(x, 140, 520, 800, 640, '#2a3a6a', { b: 10 })
  x.save(); x.globalCompositeOperation = 'lighter'; glow(x, 540, 840, 500, '255,210,140', 0.3); x.restore()
  for (let i = 0; i < 10; i++) { x.save(); x.globalCompositeOperation = 'lighter'; glow(x, 180 + i * 80, 560, 30, ['255,120,120', '255,220,120', '120,220,255'][i % 3], 0.6); x.restore() }
  // the tiny train on its loop
  R(x, '#8c86a8', 180, 1060, 720, 10)
  const tx = 180 + ((u * 160) % 720)
  box(x, tx, 1010, 90, 50, '#e8504a', { b: 4 }); box(x, tx - 100, 1020, 80, 40, '#4f7cd8', { b: 4 }); box(x, tx - 190, 1020, 80, 40, GOLD, { b: 4 })
  x.save(); x.beginPath(); x.rect(140, 520, 800, 640); x.clip(); S.pis(x, t, { x: 780, y: 880, s: 150, mood: 'sparkle', look: [-0.6, 1] }, 3); x.restore()
  const F = S.hero(x, t, { x: 300, y: 1320, s: 220, mood: u > 2 ? 'sparkle' : 'neutral', look: [0.6, -1] })
  scarf(x, F, t, 0.8)
}
function cocoa(x, t, S) {
  const { u } = S
  street(x, t, { horizon: 1300, sky: 'night', lamps: [80, 1000], tint: '#2b2150' })
  box(x, 200, 600, 680, 520, '#6a3a2a', { b: 8 }); for (let i = 0; i < 7; i++) R(x, i % 2 ? BONE : '#3fb06a', 200 + i * 97, 600, 97, 70)
  x.save(); x.globalCompositeOperation = 'lighter'; glow(x, 540, 880, 400, '255,200,120', 0.3); x.restore()
  S.npc(x, t, { sign: 'cancer', x: 640, y: 940, s: 140, mood: 'happy', look: [-1, 0.4] })
  const got = u > 2.6
  const F = S.hero(x, t, { x: 380, y: 1260, s: 230, mood: got ? 'heart' : 'happy', look: [0.6, -0.6], hops: [S.a + 2.6] })
  scarf(x, F, t, 0.8)
  if (got) { mug(x, 500, 1240, { col: '#e8504a', steam: 1, t }); hearts(x, t, S.a + 2.7, 380, 1090, { n: 4 }) }
}
function benchScene(x, t) {
  nightStreet(x, t)
  bench(x, 540, 1400, 640)
}
function write(x, t, S) {
  const { u } = S
  benchScene(x, t)
  const n = Math.floor(clamp(prog(u, 0.6, 7.6)) * 6)
  letterPaper(x, 600, 820, n, { title: 'dear you,', rot: -0.03 })
  const F = S.hero(x, t, { x: 300, y: 1200, s: 230, mood: 'neutral', look: [1, -0.6], tears: u > 3 ? 1 : 0 })
  scarf(x, F, t, 0.8)
}
function keep(x, t, S) {
  const { u } = S
  benchScene(x, t)
  letterPaper(x, 600, 820, 6, { title: 'dear you,', rot: -0.03 })
  // the send button that never gets pressed
  const k = pop01(t, S.a + 0.6, 0.3, 2.2) * outK(t, [S.a + 4.4, S.a + 4.8])
  if (k > 0.01) { x.save(); x.translate(600, 1080); x.scale(k, k); box(x, -110, -36, 220, 72, '#5fd38a', { b: 6 }); x.font = `800 34px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('SEND?', 0, 2); x.restore() }
  if (u > 4.4 && u < 5.6) label(x, 'no.', 600, 1080, { size: 48, col: BONE, font: INTER, weight: 800 })
  const F = S.hero(x, t, { x: 300, y: 1200, s: 230, mood: u > 4.6 ? 'happy' : 'neutral', look: [1, -0.6], hops: [S.a + 4.6] })
  scarf(x, F, t, 0.8)
}
function fold(x, t, S) {
  const { u } = S
  benchScene(x, t)
  const p = clamp(prog(u, 0.6, 4.6))
  if (p < 1) letterPaper(x, 600, 820, 6, { rot: p * 3, s: 1 - 0.8 * p })
  const sk = pop01(t, S.a + 4.6, 0.4, 2.4)
  if (sk > 0.01) { drawBits(x, STARBM, { G: GOLD }, 600, 820, 22 * sk); x.save(); x.globalCompositeOperation = 'lighter'; glow(x, 600, 820, 260, '255,220,140', 0.35 * sk); x.restore() }
  sparkles(x, t, 600, 820, S.a + 4.6, 12, 200, 1)
  const F = S.hero(x, t, { x: 300, y: 1200, s: 230, mood: u > 4.6 ? 'sparkle' : 'neutral', look: [1, -0.8], hops: [S.a + 4.7] })
  scarf(x, F, t, 0.8)
}
function dearMe(x, t, S) {
  const { u } = S
  room(x, { wall: '#3b2c5e', wall2: '#34274f', floor: '#2a1f40', floorY: 1320, win: { x: 760, y: 620, w: 240, h: 220, sky: 'night' } })
  box(x, 140, 1100, 800, 36, '#6b4428', { b: 7 })
  x.save(); x.globalCompositeOperation = 'lighter'; glow(x, 300, 980, 300, '255,214,150', 0.3); x.restore()
  drawBits(x, STARBM, { G: GOLD }, 840, 1060, 9)
  const n = Math.floor(clamp(prog(u, 1.6, 6.0)) * 4)
  letterPaper(x, 520, 900, n, { title: u > 0.8 ? 'dear me,' : null, rot: 0.02, s: 0.9 })
  S.hero(x, t, { x: 220, y: 1220, s: 220, mood: 'happy', look: [1, -0.6] })
  S.pis(x, t, { x: 930, y: 1230, s: 130, mood: 'happy', look: [-1, -0.6] }, 3)
}

const stop = (k, draw, cues = []) => ({ a: ST[k][0], b: ST[k][1], sticker: null, draw, cues })
const EP = makeDate({
  id: 'kdye20', sign: 'scorpio', name: 'Scorpio', D, ending: 'cut',
  hook: 'Scorpio, missing them? | *Take yourself out.*', hookSize: 100, hookAccent: SCO,
  stampAt: 1.9,
  fx: [{ kind: 'scratch', o: { at: 0.4, len: 1.2, caption: 'missing them. *again.*', top: 1600 } }],
  promise: { text: 'wait for what it does with *the letter*', at: 3.6, out: [10.4, 10.7], top: 400 },
  chapters: [
    { at: 3.4, out: [18.6, 19.0], n: 1, title: 'THE STREETLIGHTS' },
    { at: 19.0, out: [33.6, 34.0], n: 2, title: 'THE WINDOW DISPLAYS' },
    { at: 34.0, out: [51.6, 52.0], n: 3, title: 'THE LETTER' },
    { at: 52.0, out: [69.6, 70.0], n: 4, title: 'THE WAY HOME' },
  ],
  opener,
  stops: [
    stop('lamps', lamps, [[0.6, 'tick'], [3.3, 'tick'], [7.2, 'tick']].map(([a]) => ['pluck', a, 1318.51, 0.03, 0.6, 0])),
    stop('memory', memory, [['pluck', 0.4, 523.25, 0.03, 1.0, 0], ['pop', 5.0, 880, 0.04, 0]]),
    stop('toys', toys, [['whoosh', 0.02, 0.4, 0.035], ['glitter', 0.4, 1.0], ['pluck', 2.0, 1174.66, 0.035, 0.5, 0.3]]),
    stop('cocoa', cocoa, [['whoosh', 0.02, 0.4, 0.035], ['pop', 2.6, 1318.51, 0.045, -0.2]]),
    stop('write', write, [['whoosh', 0.02, 0.4, 0.035], ...Array.from({ length: 6 }, (_, i) => ['tick', r3(0.6 + i * 1.17), 0.02])]),
    stop('keep', keep, [['pop', 0.6, 880, 0.04, 0], ['tick', 4.4, 0.05], ['pluck', 4.6, 659.25, 0.04, 0.8, 0]]),
    stop('fold', fold, [['whoosh', 0.6, 0.3, 0.02], ['whoosh', 2.0, 0.3, 0.02], ['whoosh', 3.4, 0.3, 0.02], ['bell', 4.6, 1760, 0.05, 1.6, 0], ['glitter', 4.6, 5.2]]),
    stop('dearme', dearMe, [['whoosh', 0.02, 0.4, 0.035], ['pluck', 0.8, 1174.66, 0.04, 0.6, 0]]),
  ],
  lines: [
    { t: 4.0, who: 'hero', text: "I'm *fine.* just… walking." },
    { t: 7.4, who: 'stars', text: 'walk. the lamps will *follow.*' },
    { t: 11.6, who: 'hero', text: "they'd have *loved* this street." },
    { t: 15.0, who: 'stars', text: 'missing someone is *allowed.*' },
    { t: 19.8, who: 'pisces', text: 'the tiny *train!!*' },
    { t: 22.8, who: 'stars', text: 'look how much is still *lovely.*' },
    { t: 27.4, who: 'hero', text: 'one cocoa. *extra* hot.' },
    { t: 30.6, who: 'stars', text: 'warm hands. *warm* you.' },
    { t: 34.8, who: 'hero', text: 'dear you… I *miss*…' },
    { t: 38.6, who: 'stars', text: 'write it all. *every* bit.' },
    { t: 43.8, who: 'hero', text: 'should I *send* it?' },
    { t: 47.0, who: 'stars', text: 'you can mean it and *keep* it.' },
    { t: 52.8, who: 'hero', text: 'a paper *star.* for me.' },
    { t: 56.4, who: 'stars', text: "keep it close. it's *yours.*" },
    { t: 61.8, who: 'hero', text: 'dear *me,*…' },
    { t: 65.2, who: 'stars', text: "now that's a *good* letter." },
  ],
  boxes: [[3.8, 10.8, [0, 1]], [11.4, 18.8, [2, 3]], [19.6, 26.4, [4, 5]], [27.2, 33.8, [6, 7]], [34.6, 42.8, [8, 9]], [43.6, 51.6, [10, 11]], [52.6, 60.8, [12, 13]], [61.6, 69.6, [14, 15]]],
  last: { t: 70.2, text: 'Missing them is allowed. | *So is your evening.*', top: 300, size: 88, accent: SCO },
  cues: [['whoosh', 0.0, 0.4, 0.04]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [PINK, RED, MONO, CORAL, SKYB, MINT, shadow, bubble]
