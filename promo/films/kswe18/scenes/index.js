// kswe18 · SIGN SWAP · "Texting Speed Swap" (60 s vertical, Month 2 boost m11 #18, long, synthwave · Em, loop)
// ♊ Gemini texts fast. ♉ Taurus texts slow. They're texting each other. Then they swap.
//   0.0   frame 0: split screen, Gemini's thumbs mid-blur over a phone (speed lines), Taurus' one thumb hovering, the
//         swap bolt cracking down the middle. Hook "Fast texter. Slow texter. *Swapped.*"   2.8 "The ending, *though.*"
//   5.0   CH 1 · THE MISMATCH: Gemini sends nine bubbles; "3 HOURS LATER" Taurus: "ok". Gemini spirals.
//   15.0  CH 2 · GEMINI, AS TAURUS: the thumbs move s l o w; "typing… 12%"; "WHY ARE MY THUMBS SO CALM"
//   27.0  CH 3 · TAURUS, AS GEMINI: 40 messages, a voice note, a cat picture. "MESSAGES SENT: 40". "i can't STOP"
//   39.0  CH 4 · THE MIDDLE SPEED: a bench in the snow. "a good-morning text. a call at 9. deal?" "deal." ♓ Pisces,
//         the mutual friend, sobbing: "COMMUNICATION"
//   51.0  CH 5 · THE NEXT MORNING: both phones light up "good morning :)" at the same second… then the bolt again.
//   54.8  last line "Found the *middle* speed."  59.55–60.0 eases back into frame 0 (loop).
import { makeSwap } from '../../kswe01/scenes/swapfilm.js'
import { star, swapper, swapBolt, swapTag, phone, bubble, sticker, shadow, hearts, sparkles, drawBits, label, R, box, INK, GOLD, PINK, RED, BONE, SIGN, pop01, outK, prog, ease, clamp, lerp, r3 } from '../../kswe01/scenes/swapkit.js'

const GE = SIGN('gemini'), TA = SIGN('taurus')
// Gemini and Taurus are both golden, so every Taurus BODY wears little pixel bull horns (that's the tell)
const HORN = ['H....', 'HH...', '.HH..', '..HHH', '...HH']
function horns(x, r, size, k = 1) {
  if (k < 0.5) return
  const c = Math.max(3, Math.round(size / 40))
  for (const d of [-1, 1]) {
    const cx = r.x + d * size * 0.2, cy = r.top + size * 0.2
    x.save(); x.translate(cx, cy); x.scale(d < 0 ? 1 : -1, 1)
    HORN.forEach((row, j) => [...row].forEach((ch, i) => { if (ch !== 'H') return; x.fillStyle = INK; x.fillRect((i - 4) * c - 2, (j - 4) * c - 2, c + 4, c + 4) }))
    HORN.forEach((row, j) => [...row].forEach((ch, i) => { if (ch !== 'H') return; x.fillStyle = '#fff3d8'; x.fillRect((i - 4) * c, (j - 4) * c, c, c) }))
    x.restore()
  }
}
const gemIn = (x, t, px, py, s, k, o) => { const r = swapper(x, t, px, py, s, 'gemini', 'taurus', k, o); horns(x, r, s, k); return r }   // Gemini's soul, Taurus' body
const tauIn = (x, t, px, py, s, k, o) => { const r = swapper(x, t, px, py, s, 'taurus', 'gemini', k, o); horns(x, r, s, 1 - k); return r }   // Taurus' soul, Gemini's body
const tau = (x, t, px, py, s, o) => { const r = star(x, t, px, py, s, 'taurus', o); horns(x, r, s); return r }

function thumb(x, cx, cy, col, blur, t) {
  const n = blur ? 4 : 1
  for (let i = 0; i < n; i++) { const dx = blur ? Math.sin(t * 60 + i * 1.7) * 40 : 0; x.save(); x.globalAlpha = blur ? 0.35 + 0.15 * i : 1; box(x, cx - 34 + dx, cy - 60, 68, 120, col, { b: 6 }); x.restore() }
}
function speedLines(x, cx, cy, t) { x.save(); x.strokeStyle = 'rgba(255,250,230,0.6)'; x.lineWidth = 6; for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2 + t * 3, r0 = 120 + (i % 3) * 20; x.beginPath(); x.moveTo(cx + Math.cos(a) * r0, cy + Math.sin(a) * r0); x.lineTo(cx + Math.cos(a) * (r0 + 70), cy + Math.sin(a) * (r0 + 70)); x.stroke() } x.restore() }
function divider(x) { R(x, INK, 532, 0, 16, 1920); R(x, GOLD, 536, 0, 8, 1920) }
function opening(x, t) {
  const k = clamp(0.5 + t / 0.6 * 0.5)
  // left: Gemini, thumbs blurring
  phone(x, t, { cx: 270, cy: 820, w: 380, h: 560, title: 'taurus ♉', clock: '9:02 PM', lines: [{ from: 'me', text: 'ok so', at: -1 }, { from: 'me', text: 'wait', at: -1 }, { from: 'me', text: 'ALSO', at: -1 }], size: 30, accent: GE.color })
  thumb(x, 270, 1180, GE.color, true, t); speedLines(x, 270, 1180, t)
  gemIn(x, t, 270, 1480, 260, k, { mood: 'wide', look: [0, -1], hops: [2.2] })
  // right: Taurus, one slow thumb hovering
  phone(x, t, { cx: 810, cy: 820, w: 380, h: 560, title: 'gemini ♊', clock: '9:02 PM', lines: [{ from: 'them', text: 'ALSO', at: -1 }], size: 30, accent: TA.color })
  thumb(x, 810, 1170 - Math.sin(t * 1.5) * 10, TA.color, false, t)
  tauIn(x, t, 810, 1480, 260, k, { mood: 'squint', look: [0, -1], hops: [2.3] })
  divider(x)
  swapBolt(x, t, -0.25, { x1: 540, y1: 200, x2: 540, y2: 1700, colA: GE.color, colB: TA.color, dur: 1.1 })
  swapTag(x, t, 540, 1780, 'gemini', 'taurus', 2.1, { out: 4.8, both: true })
}
// ── CH 1: the mismatch (before the swap, as themselves)
const NINE = ['hi!!', 'ok so', 'today was WILD', 'a pigeon stole my fry', 'like the WHOLE fry', 'anyway', 'how was your day', 'hello??', 'u alive']
function mismatch(x, t) {
  const gl = NINE.map((s, i) => ({ from: 'me', text: s, at: r3(5.4 + i * 0.42) }))
  phone(x, t, { cx: 270, cy: 900, w: 460, h: 900, title: 'taurus ♉', clock: t < 10.6 ? '9:04 PM' : '12:04 AM', lines: [...gl, ...(t > 10.8 ? [{ from: 'them', text: 'ok', at: 10.8 }] : [])], size: 28, accent: GE.color })
  phone(x, t, { cx: 810, cy: 900, w: 460, h: 900, title: 'gemini ♊', clock: t < 10.6 ? '9:04 PM' : '12:04 AM', lines: [...NINE.map((s, i) => ({ from: 'them', text: s, at: r3(5.4 + i * 0.42) })), ...(t > 10.8 ? [{ from: 'me', text: 'ok', at: 10.8 }] : [])], size: 28, accent: TA.color, typing: [9.6, 10.6] })
  divider(x)
  star(x, t, 270, 1580, 220, 'gemini', { mood: t < 10.8 ? 'happy' : 'wide', look: [0, -1], hops: NINE.map((s, i) => 5.4 + i * 0.42) })
  tau(x, t, 810, 1580, 220, { mood: t < 10.8 ? 'sleepy' : 'happy', zzz: true, look: [0, -1], hops: [10.8] })
  sticker(x, t, '3 HOURS LATER', 540, 560, 9.7, 11.6, { col: GOLD, size: 52, rot: -0.05 })
  if (t > 11.6) bubble(x, t, 270, 1300, 11.8, 14.8, 'OK?? just OK??', { size: 40, tail: 0, col: '#ffe7a8' })
}
// ── CH 2: Gemini, as Taurus
function slowShot(x, t) {
  phone(x, t, { cx: 540, cy: 880, w: 620, h: 760, title: 'taurus ♉ (in my body??)', clock: '9:30 PM', lines: [], size: 34, accent: TA.color })
  const msg = 'hey how are', n = Math.min(msg.length, Math.floor(Math.max(0, t - 16.2) * 1.0))
  box(x, 270, 1170, 540, 90, '#ffffff', { b: 6 }); x.font = "700 46px Inter"; x.fillStyle = INK; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(msg.slice(0, n) + (Math.floor(t * 2) % 2 ? '|' : ''), 300, 1216)
  thumb(x, 640, 1400 - Math.abs(Math.sin(t * 1.0)) * 30, TA.color, false, t)
  shadow(x, 300, 1690, 230)
  gemIn(x, t, 300, 1520, 260, 1, { mood: t < 20 ? 'squint' : 'wide', look: [1, -1], blink: t > 20 ? false : undefined, hops: [20.2, 23.0] })
  bubble(x, t, 540, 420, 20.2, 26.8, 'WHY ARE MY\nTHUMBS SO CALM', { size: 52, tail: -0.4 })
}
// ── CH 3: Taurus, as Gemini
const CAT = ['B.....B', 'BB...BB', 'BBBBBBB', 'BWBBBWB', 'BBBPBBB', '.BBBBB.']
function fastShot(x, t) {
  const sent = Math.min(40, Math.max(0, Math.floor((t - 27.6) * 5)))
  const lines = Array.from({ length: sent }, (_, i) => ({ from: 'me', text: ['also', 'WAIT', 'ok one more', 'lol', 'did u see', 'brb', 'back', 'omg'][i % 8], at: 27.6 + i * 0.2 }))
  phone(x, t, { cx: 540, cy: 880, w: 620, h: 860, title: 'gemini ♊ (in my body??)', clock: '9:31 PM', lines, size: 30, accent: GE.color })
  // a voice note + a cat picture fly in
  if (t > 31.6) { const vk = pop01(t, 31.6, 0.3, 2.4); x.save(); x.translate(820, 620); x.rotate(0.08); x.scale(vk, vk); box(x, -170, -50, 340, 100, GE.color, { b: 6 }); for (let i = 0; i < 12; i++) { const h = 14 + 40 * Math.abs(Math.sin(t * 8 + i)); R(x, INK, -140 + i * 24, -h / 2, 14, h) } x.restore() }
  if (t > 33.6) { const ck = pop01(t, 33.6, 0.3, 2.4); x.save(); x.translate(260, 700); x.rotate(-0.1); x.scale(ck, ck); box(x, -110, -100, 220, 200, '#fff3c8', { b: 6 }); drawBits(x, CAT, { B: '#e9a060', W: '#ffffff', P: PINK }, 0, 10, 20); x.restore() }
  thumb(x, 640, 1400, GE.color, true, t); speedLines(x, 640, 1400, t)
  shadow(x, 300, 1690, 230)
  tauIn(x, t, 300, 1520, 260, 1, { mood: t < 34 ? 'wide' : 'sparkle', look: [1, -1], hops: [28.0, 30.0, 32.0, 34.0, 36.0] })
  sticker(x, t, `MESSAGES SENT: ${sent}`, 780, 1640, 27.8, 38.8, { col: GE.color, size: 40, rot: 0.05 })
  bubble(x, t, 540, 420, 35.2, 38.8, 'i can’t STOP', { size: 56, tail: -0.4 })
}
// ── CH 4: the middle speed
function benchShot(x, t) {
  box(x, 200, 1160, 680, 50, '#8a5a3a', { b: 6 }); R(x, INK, 240, 1210, 24, 100); R(x, INK, 816, 1210, 24, 100)
  shadow(x, 380, 1320, 240); shadow(x, 700, 1320, 240)
  gemIn(x, t, 380, 1060, 250, 1, { mood: t < 44 ? 'neutral' : 'happy', look: [1, 0], hops: [41.8, 44.2, 46.0] })
  tauIn(x, t, 700, 1060, 250, 1, { mood: t < 44 ? 'neutral' : 'happy', look: [-1, 0], hops: [42.4, 44.3, 46.1] })
  bubble(x, t, 540, 720, 41.6, 44.0, 'a good-morning text.\na call at 9.', { size: 44, tail: -0.3 })
  bubble(x, t, 540, 720, 44.1, 46.4, 'deal.', { size: 56, tail: 0.3, col: '#ffe7a8' })
  hearts(x, t, 44.3, 540, 900, { n: 7 })
  if (t > 46.4) {
    const pk = ease.outCubic(prog(t, 46.4, 47.0))
    star(x, t, 540, lerp(1950, 1560, pk), 260, 'pisces', { mood: 'sparkle', look: [0, -0.6], tears: 3, hops: [47.1, 47.7, 48.3, 48.9, 49.5, 50.1] })
    bubble(x, t, 540, 1800, 47.2, 50.9, 'COMMUNICATION', { size: 46, col: '#d9d4ff', tail: null })
  }
}
// ── CH 5: the next morning, then the loop
function morningShot(x, t) {
  phone(x, t, { cx: 270, cy: 820, w: 380, h: 560, title: 'taurus ♉', clock: '8:00 AM', lines: [{ from: 'them', text: 'good morning :)', at: 51.8 }], size: 32, accent: GE.color })
  phone(x, t, { cx: 810, cy: 820, w: 380, h: 560, title: 'gemini ♊', clock: '8:00 AM', lines: [{ from: 'them', text: 'good morning :)', at: 51.8 }], size: 32, accent: TA.color })
  star(x, t, 270, 1400, 260, 'gemini', { mood: 'happy', look: [0, -1], hops: [51.9, 53.4] })
  tau(x, t, 810, 1400, 260, { mood: 'happy', look: [0, -1], hops: [51.95, 53.5] })
  divider(x)
  if (t > 51.8 && t < 52.5) { sparkles(x, t, 270, 800, 51.8, 8, 120, 1); sparkles(x, t, 810, 800, 51.8, 8, 120, 2) }
}

const EP = makeSwap({
  duration: 60, ending: 'loop', shade: 1,
  hook: { text: 'Fast texter. Slow texter. *Swapped.*', out: [2.6, 2.8], top: 210, size: 92 },
  caps: [
    { at: 2.85, out: [4.8, 5.0], text: 'The ending, *though.*', top: 230 },
    { at: 17.7, out: [19.9, 20.1], text: 'Gemini, *as Taurus:*', top: 230 },
    { at: 29.7, out: [34.8, 35.0], text: 'Taurus, *as Gemini:*', top: 230 },
  ],
  shots: [
    { at: 0, room: 'studio', cam: [1.0, 540, 960], push: 0.04, draw: opening },
    { at: 5.0, room: 'studio', cam: [1.0, 540, 960], push: 0.03, draw: mismatch },
    { at: 15.0, room: 'bed', roomOpts: { dark: 0.4 }, cam: [1.0, 540, 960], push: 0.05, draw: slowShot },
    { at: 27.0, room: 'bed', roomOpts: { dark: 0.4 }, cam: [1.0, 540, 960], push: 0.05, draw: fastShot },
    { at: 39.0, room: 'street', roomOpts: { snow: 0.8 }, cam: [1.12, 540, 1060], push: 0.03, draw: benchShot },
    { at: 51.0, room: 'studio', roomOpts: { warm: 0.5 }, cam: [1.0, 540, 960], push: 0.03, draw: morningShot },
  ],
  fx: [
    { kind: 'whip', at: -0.2, from: 1.45 },
    { kind: 'shake', at: 0.0, len: 0.5, amp: 24 },
    { kind: 'glitch', at: 0.7, len: 0.8, text: 'TEXTING SPEED: *ERROR*', dialog: false },
    { kind: 'chapter', at: 5.0, out: [9.0, 9.2], n: 1, title: 'the mismatch' },
    { kind: 'chapter', at: 15.0, out: [17.4, 17.6], n: 2, title: 'gemini, as taurus' },
    { kind: 'load', at: 22.4, len: 3.6, label: 'typing…', stallAt: 12, error: 'Error: thumbs too relaxed', y: 1560 },
    { kind: 'chapter', at: 27.0, out: [29.4, 29.6], n: 3, title: 'taurus, as gemini' },
    { kind: 'chapter', at: 39.0, out: [41.4, 41.6], n: 4, title: 'the middle speed' },
    { kind: 'chapter', at: 51.0, out: [53.4, 53.6], n: 5, title: 'the next morning' },
  ],
  flash: [{ at: 2.05, col: GOLD, a: 0.35 }, { at: 10.8, col: TA.color, a: 0.3 }, { at: 44.3, col: PINK, a: 0.3 }, { at: 51.8, col: '#ffe7a8', a: 0.35 }],
  punch: [{ at: 10.8, dur: 1.4, z: 0.06, x: 540, y: 1000 }, { at: 20.2, dur: 1.6, z: 0.06, x: 540, y: 900 }, { at: 35.2, dur: 1.6, z: 0.06, x: 540, y: 900 }],
  last: { at: 54.8, text: 'Found the *middle* speed.', top: 300 },
  cues: [
    ['glitter', 0.0, 0.6], ['tom', 0.02, 70, { gain: 0.25, decay: 0.25 }], ['pop', 2.1, 1174.66, 0.05, 0],
    ...NINE.map((s, i) => ['pop', r3(5.4 + i * 0.42), [523.25, 587.33, 659.25, 698.46, 783.99, 880, 987.77, 1046.5, 1174.66][i], 0.03, -0.3]),
    ['tick', 9.7, 0.06], ['pop', 10.8, 392, 0.05, 0.3], ['pop', 11.8, 1318.51, 0.035, -0.3],
    ...Array.from({ length: 10 }, (_, i) => ['tick', r3(16.2 + i * 1.0), 0.03]), ['pop', 20.2, 880, 0.04, 0],
    ...Array.from({ length: 40 }, (_, i) => ['pop', r3(27.6 + i * 0.2), [987.77, 1174.66, 1318.51][i % 3], 0.012, (i % 2 ? 0.3 : -0.3)]),
    ['whoosh', 31.6, 0.3, 0.04], ['pop', 33.6, 1567.98, 0.04, -0.3], ['pop', 35.2, 783.99, 0.04, 0],
    ['pop', 41.6, 783.99, 0.035, -0.3], ['pop', 44.1, 1174.66, 0.04, 0.3], ['glitter', 44.3, 45.0],
    ['pluck', 47.1, 659.25, 0.035, 0.5, 0], ['pluck', 47.25, 587.33, 0.035, 0.5, 0], ['pluck', 47.9, 523.25, 0.03, 0.5, 0],
    ['pop', 51.8, 1318.51, 0.04, -0.4], ['pop', 51.8, 1567.98, 0.04, 0.4], ['bell', 51.85, 2093, 0.025, 1.0, 0],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
