// kswe16 · SIGN SWAP · "One Hour Before the Date" (75 s vertical, Month 2 boost m11 #16, long, cinematic · D, hard cut)
// ♑ Capricorn and ♓ Pisces swap bodies at 7:00 PM. Each keeps its own plans, in the wrong body. Cap (in Pisces' crying body) goes on its date; Pisces (in Cap's steady
// body) goes to its friend's birthday dinner. The promise: "wait for the twist." The twist: Pisces cries anyway.
//   0.0   frame 0: the bedroom, Capricorn mid-scream at the mirror where Pisces stares back, the clock flashing 7:00.
//         Hook "Swapped. One hour before *the date.*"   3.0 "Wait for *the twist.*"
//   5.0   CH 1 · THE PANIC: Cap-in-Pisces can't stop crying ("WHY IS MY FACE LEAKING"); an incoming call from "my body";
//         Pisces-in-Cap: "i can't cry!! i tried a sad song. NOTHING."
//   18.0  CH 2 · THE PLAN: notes swap on two phones; getting ready: the loading bar stalls at 99%; 7:52.
//   31.0  CH 3 · THE DATE: the café, ♊ Gemini. The menu: "molten chocolate cake" → tears. Gemini hands a napkin:
//         "honestly? that's adorable."  Cap: "i'm usually less… damp."  Gemini: "i like damp."
//   47.0  CH 4 · THE TWIST: the birthday dinner, Pisces-in-Cap holding it together… the toast: "to the friend who always
//         shows up." One tear cracks the steady face, then the fountain. "Pisces cries *anyway.*"
//   61.0  CH 5 · WHAT THEY LEARNED: midnight, the swap back (a bolt). Cap lets a sunset photo make it tear up on purpose;
//         Pisces writes its first calendar. Pisces cries again (happy).
//   72.6  last line "Some things *don't* swap." holds, hard cut at 75.0.
import { makeSwap } from '../../kswe01/scenes/swapfilm.js'
import { star, swapper, swapBolt, swapTag, phone, bubble, sticker, shadow, hearts, sparkles, mirror, bed, table, mug, tissues, clockFace, label, R, box, INK, GOLD, PINK, RED, BONE, SIGN, pop01, outK, prog, ease, clamp, lerp, r3 } from '../../kswe01/scenes/swapkit.js'

const CP = SIGN('capricorn'), PS = SIGN('pisces')
const capIn = (x, t, px, py, s, k, o) => swapper(x, t, px, py, s, 'capricorn', 'pisces', k, o)  // Cap's soul, Pisces' body (it cries)
const pisIn = (x, t, px, py, s, k, o) => swapper(x, t, px, py, s, 'pisces', 'capricorn', k, o)  // Pisces' soul, Cap's body

// ── 0 · the cold open
function opening(x, t) {
  bed(x, 300, 1180, { col: '#2fc79a', k: 0.2 })
  mirror(x, 760, 820, 300, 520, xx => capIn(xx, t, 760, 880, 240, 1, { mood: 'wide', look: [-1, 0], soul: false, tears: 2, blink: false }))
  swapBolt(x, t, -0.25, { x1: 380, y1: 200, x2: 360, y2: 900, colA: CP.color, colB: PS.color, dur: 1.1 })
  shadow(x, 360, 1195, 280)
  const k = clamp(0.5 + t / 0.6 * 0.5)
  capIn(x, t, 360 + Math.sin(t * 40) * 5 * (t < 1.4 ? 1 : 0), 960, 300, k, { mood: 'wide', look: [1, -0.2], squash: -0.08, blink: false, tears: t > 0.8 ? 2 : 0, hops: [2.2, 3.2] })
  clockFace(x, 280, 600, '7:00 PM', { size: 64, blink: true, t })
  swapTag(x, t, 540, 1390, 'capricorn', 'pisces', 2.0, { out: 4.8, both: true })
}
// ── 1 · the panic
const PANIC_LINES = [['WHY IS MY FACE\nLEAKING', 5.6, 8.0], ['it’s a SOCK.\nwhy am i crying at a SOCK', 8.2, 10.4]]
function panic(x, t) {
  bed(x, 540, 1180, { col: '#2fc79a', k: 0.2 })
  tissues(x, 820, 1150, 1.2)
  shadow(x, 420, 1195, 290)
  capIn(x, t, 420, 960, 300, 1, { mood: t < 8.2 ? 'wide' : 'sparkle', look: [0.6, 0.4], tears: t < 6.4 ? 2 : 3, hops: [5.4, 6.2, 8.3, 9.1] })
  if (t > 8.0) { box(x, 700, 1060, 90, 60, '#ff8fb1', { b: 5 }); R(x, '#fff', 700, 1060, 90, 14) }   // the sock
  for (const [txt, a, b] of PANIC_LINES) bubble(x, t, 470, 640, a, b, txt, { size: 44, tail: -0.2 })
}
function callShot(x, t) {
  // after the call is answered: Pisces-in-Cap, in its own flat, perfectly dry
  shadow(x, 540, 1195, 300)
  pisIn(x, t, 540, 960, 320, 1, { mood: t < 14.6 ? 'squint' : 'wide', look: [0, 0], hops: [13.0, 14.6, 15.6] })
  // a tiny music note: "tried a sad song"
  if (t > 13.6) for (let i = 0; i < 3; i++) { const p = ((t - 13.6) * 0.8 + i / 3) % 1; label(x, '♪', 740 + Math.sin(p * 6 + i) * 30, 860 - p * 240, { size: 56, col: '#9fe8ff', alpha: 1 - p }) }
  bubble(x, t, 540, 620, 12.8, 17.8, 'i can’t cry!! i tried\na sad song. NOTHING.', { size: 46, tail: 0, col: '#c9f2d4' })
  sticker(x, t, '7:12 PM', 830, 1430, 15.0, 17.8, { col: RED, ink: '#fff', size: 44, rot: 0.06 })
}
// ── 2 · the plan
const NOTES_P = [{ from: 'them', text: 'my body cries at menus. LET IT.', at: 19.4 }, { from: 'them', text: 'also at dogs. and sunsets. and socks', at: 21.0 }]
const NOTES_C = [{ from: 'them', text: 'my body does not cry. good luck.', at: 20.2 }, { from: 'them', text: 'arrive 10 min early. always.', at: 21.8 }]
function planShot(x, t) {
  phone(x, t, { cx: 290, cy: 960, w: 470, h: 560, rot: -0.05, title: 'my body ♑', clock: '7:31 PM', lines: NOTES_P, size: 36, accent: CP.color })
  phone(x, t, { cx: 790, cy: 960, w: 470, h: 560, rot: 0.05, title: 'my body ♓', clock: '7:31 PM', lines: NOTES_C, size: 36, accent: PS.color })
  label(x, 'CAP, READING', 290, 1300, { size: 30, col: CP.color, font: 'Inter', weight: 800 }); label(x, 'PISCES, READING', 790, 1300, { size: 30, col: PS.color, font: 'Inter', weight: 800 })
  capIn(x, t, 290, 1540, 220, 1, { mood: 'wide', look: [0, -1], tears: 2, hops: [19.5, 21.1] })
  pisIn(x, t, 790, 1540, 220, 1, { mood: 'squint', look: [0, -1], hops: [20.3, 21.9] })
}
function readyShot(x, t) {
  mirror(x, 540, 780, 340, 560, xx => capIn(xx, t, 540, 860, 280, 1, { mood: 'squint', look: [0, 0], soul: false, tears: 1 }))
  // outfit cycling: three tops flash on the reflection
  const outfit = Math.floor((t - 24.4) / 0.7)
  if (t > 24.4 && t < 28.4) { const c = ['#e8344e', '#2f8a4a', '#f2c75c', '#ffffff', '#5a8cd8', '#2a2350'][outfit % 6]; box(x, 470, 950, 140, 50, c, { b: 5 }) }
  shadow(x, 300, 1195, 260)
  capIn(x, t, 300, 990, 270, 1, { mood: t < 28.4 ? 'neutral' : 'happy', look: [1, -0.5], tears: 1, hops: [24.6, 25.3, 26.0, 26.7, 28.6] })
  sticker(x, t, '7:52 PM', 820, 1300, 28.6, 30.8, { col: RED, ink: '#fff', size: 48, rot: 0.06 })
}
// ── 3 · the date
function menu(x, cx, cy, s = 1, rot = 0, hi = -1) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  box(x, -150, -190, 300, 380, '#7a2a3a', { b: 6 }); R(x, '#f4ecdc', -130, -170, 260, 340)
  label(x, 'DESSERTS', 0, -130, { size: 34, col: '#7a2a3a', font: 'Inter', weight: 800 })
  ;['molten choc cake', 'lemon tart', 'apple pie'].forEach((n, i) => { if (i === hi) R(x, '#ffd1de', -120, -94 + i * 60, 240, 46); x.font = "700 26px 'Space Mono'"; x.fillStyle = INK; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(n, -108, -70 + i * 60) })
  x.restore()
}
function dateShot(x, t) {
  table(x, 540, 1130, 640)
  mug(x, 660, 1130, '#e9b24a', 1, 1, t)
  shadow(x, 300, 1195, 260); shadow(x, 790, 1195, 250)
  const teary = t > 34.4
  capIn(x, t, 300, 970, 290, 1, { mood: t < 34.4 ? 'neutral' : t < 39.6 ? 'sparkle' : 'happy', look: [1, t < 37 ? 0.6 : 0], tears: !teary ? 0 : t < 35.4 ? 1 : 3, hops: [34.5, 35.4, 39.7, 43.2] })
  star(x, t, 790, 980, 270, 'gemini', { mood: t < 37.4 ? 'happy' : t < 41 ? 'wide' : 'heart', look: [-1, 0], seed: 3, hops: [37.5, 41.2, 43.3, 44.6] })
  if (t < 37.2) menu(x, 545, 900, 0.7, -0.08, t > 34.4 ? 0 : -1)
  if (t > 37.4 && t < 46.8) { const nk = ease.outCubic(prog(t, 37.4, 37.9)); box(x, lerp(700, 470, nk) - 40, 960, 80, 60, '#ffffff', { b: 4 }) }
  bubble(x, t, 330, 640, 34.6, 37.2, 'it’s just… a really\nnice CAKE', { size: 42, tail: -0.4 })
  bubble(x, t, 720, 640, 38.0, 41.0, 'honestly?\nthat’s adorable.', { size: 42, tail: 0.4, col: '#ffe7a8' })
  bubble(x, t, 330, 620, 41.0, 43.2, 'i’m usually less… damp.', { size: 40, tail: -0.4 })
  bubble(x, t, 720, 620, 43.3, 46.8, 'i like damp.', { size: 48, tail: 0.4, col: '#ffe7a8' })
  hearts(x, t, 43.4, 790, 820, { n: 6 }); hearts(x, t, 44.0, 300, 820, { n: 5 })
}
// ── 4 · the twist
function twistShot(x, t) {
  // the birthday table: a cake with candles, friends around
  table(x, 540, 1130, 860, '#8a5a3a', '#e8dcc6')
  box(x, 680, 1040, 160, 90, '#fff3f8', { b: 6 }); for (let i = 0; i < 4; i++) { R(x, INK, 700 + i * 36, 1000, 12, 44); R(x, i % 2 ? PINK : '#9fe8ff', 702 + i * 36, 1002, 8, 40); R(x, '#ffd27a', 702 + i * 36, 990 + Math.sin(t * 12 + i) * 3, 8, 12) }
  star(x, t, 160, 1000, 180, 'aries', { mood: 'happy', look: [1, 0], seed: 4, hops: [50.2, 53.6] })
  star(x, t, 920, 1000, 180, 'leo', { mood: t < 52.4 ? 'happy' : 'heart', look: [-1, 0], seed: 5, hops: [50.4, 52.5] })
  const crack = t > 54.6, flood = t > 56.2
  shadow(x, 430, 1195, 280)
  pisIn(x, t, 430 + (t > 53.6 && t < 56.2 ? Math.sin(t * 46) * 4 : 0), 960, 290, 1, { mood: t < 52.4 ? 'neutral' : t < 56.2 ? 'squint' : 'sparkle', look: [0.6, -0.2], tears: flood ? 3 : crack ? 1 : 0, blink: t > 53.6 && t < 56.2 ? false : undefined, hops: [56.3, 56.9, 57.5, 58.1, 58.7] })
  bubble(x, t, 820, 640, 50.6, 54.4, 'to the friend who\nALWAYS shows up', { size: 42, tail: 0.5, col: '#ffe7a8' })
  if (t > 56.2) bubble(x, t, 430, 640, 56.4, 60.8, 'it’s STILL me in here', { size: 44, tail: -0.2, col: '#d9d4ff' })
}
// ── 5 · what they learned
function backShot(x, t) {
  swapBolt(x, t, 61.4, { x1: 300, y1: 600, x2: 780, y2: 600, colA: CP.color, colB: PS.color, dur: 0.8 })
  const back = ease.outCubic(prog(t, 61.4, 62.0))
  shadow(x, 300, 1195, 270); shadow(x, 780, 1195, 270)
  capIn(x, t, 300, 970, 290, 1 - back, { soul: back < 0.5, mood: t < 62 ? 'wide' : 'happy', look: [1, 0], hops: [62.1, 63.0] })
  pisIn(x, t, 780, 970, 290, 1 - back, { soul: back < 0.5, mood: t < 62 ? 'wide' : 'happy', look: [-1, 0], tears: t > 62 ? 2 : 0, hops: [62.2, 63.1] })
  clockFace(x, 540, 600, '12:00 AM', { size: 60 })
  bubble(x, t, 540, 1420, 63.0, 65.8, 'same time next week?', { size: 44, tail: null })
}
function learnShot(x, t) {
  // Cap: a sunset photo on the phone, a tear on purpose. Pisces: its first calendar.
  phone(x, t, { cx: 270, cy: 780, w: 300, h: 420, rot: -0.08, title: 'sunset', clock: '6:12 PM', lines: [], accent: CP.color })
  x.save(); const g = x.createLinearGradient(0, 640, 0, 960); g.addColorStop(0, '#ff9a6a'); g.addColorStop(1, '#ff5c8e'); x.fillStyle = g; x.translate(270, 780); x.rotate(-0.08); x.fillRect(-120, -100, 240, 260); x.fillStyle = '#ffd17a'; x.beginPath(); x.arc(0, 120, 70, Math.PI, 0); x.fill(); x.restore()
  shadow(x, 270, 1395, 240)
  star(x, t, 270, 1190, 260, 'capricorn', { mood: t < 68 ? 'neutral' : 'happy', look: [0, -0.8], tears: t > 67 ? 1 : 0, hops: [67.2, 68.4] })
  bubble(x, t, 280, 1500, 67.4, 72.4, 'it’s… nice?', { size: 42, tail: null })
  box(x, 640, 640, 340, 300, '#fffbea', { b: 6 }); R(x, PS.color, 640, 640, 340, 50); label(x, 'MY WEEK', 810, 666, { size: 28, col: '#fff', font: 'Inter', weight: 800 })
  for (let i = 0; i < 7; i++) { R(x, '#c9c2b0', 660 + (i % 4) * 80, 710 + Math.floor(i / 4) * 100, 60, 70); if (t > 66.4 + i * 0.25) R(x, ['#ff8fb1', '#9fe8ff', '#ffe7a8'][i % 3], 666 + (i % 4) * 80, 716 + Math.floor(i / 4) * 100, 48, 58) }
  shadow(x, 810, 1395, 240)
  star(x, t, 810, 1190, 260, 'pisces', { mood: 'sparkle', look: [0, -0.8], tears: 3, hops: [66.5, 67.1, 67.7, 68.3, 68.9, 69.5, 70.1] })
}

const T0 = 5.0
const EP = makeSwap({
  duration: 75, ending: 'cut', shade: 1,
  hook: { text: 'Swapped. One hour before *the date.*', out: [2.8, 3.0], top: 210, size: 92 },
  caps: [
    { at: 3.05, out: [4.8, 5.0], text: 'Wait for *the twist.*', top: 230 },
    { at: 31.6, out: [34.2, 34.4], text: 'First date. *Cap, as Pisces.*', top: 230, size: 80 },
    { at: 47.6, out: [50.2, 50.4], text: 'Meanwhile: *Pisces, as Cap.*', top: 230, size: 80 },
    { at: 56.3, out: [60.6, 60.8], text: 'The twist: Pisces cries *anyway.*', top: 230, size: 80 },
  ],
  shots: [
    { at: 0, room: 'bed', cam: [1.05, 540, 980], push: 0.05, draw: opening },
    { at: T0, room: 'bed', cam: [1.15, 540, 980], push: 0.06, draw: panic },
    { at: 12.6, room: 'sofa', cam: [1.15, 540, 980], push: 0.06, draw: callShot },
    { at: 18.0, room: 'sofa', roomOpts: { dark: 0.5 }, cam: [1.0, 540, 960], push: 0.03, draw: planShot },
    { at: 24.2, room: 'bed', cam: [1.1, 540, 960], push: 0.05, draw: readyShot },
    { at: 31.0, room: 'cafe', cam: [1.12, 540, 1000], push: 0.06, draw: dateShot },
    { at: 47.0, room: 'dinner', roomOpts: { warm: 0.4 }, cam: [1.1, 540, 1000], push: 0.08, draw: twistShot },
    { at: 61.0, room: 'hall', roomOpts: { dark: 0.3 }, cam: [1.1, 540, 1000], push: 0.04, draw: backShot },
    { at: 66.0, room: 'sofa', roomOpts: { warm: 0.4 }, cam: [1.0, 540, 1000], push: 0.04, draw: learnShot },
  ],
  fx: [
    { kind: 'whip', at: -0.2, from: 1.45 },
    { kind: 'shake', at: 0.0, len: 0.6, amp: 28 },
    { kind: 'rec', at: 0.9, len: 1.1, caption: 'my date is at *8.*', top: 1560 },
    { kind: 'chapter', at: T0, out: [9.4, 9.6], n: 1, title: 'the panic' },
    { kind: 'call', at: 10.6, out: [12.5, 12.6], name: 'my *body*', sub: 'incoming call…', glyph: '♑︎', color: CP.color, answerAt: 12.1 },
    { kind: 'chapter', at: 18.0, out: [22.4, 22.6], n: 2, title: 'the plan' },
    { kind: 'load', at: 26.6, len: 2.2, label: 'getting ready…', stallAt: 99, error: null, y: 1520 },
    { kind: 'chapter', at: 31.0, out: [33.4, 33.6], n: 3, title: 'the date' },
    { kind: 'shake', at: 35.4, len: 0.4, amp: 14 },
    { kind: 'chapter', at: 47.0, out: [49.4, 49.6], n: 4, title: 'the twist' },
    { kind: 'caught', at: 54.6, x: 430, y: 930, r: 170, out: [56.0, 56.15], label: 'a TEAR', arrow: 'br', rec: false },
    { kind: 'shake', at: 56.2, len: 0.6, amp: 24 },
    { kind: 'chapter', at: 61.0, out: [64.6, 64.8], n: 5, title: 'what they learned' },
    { kind: 'shake', at: 61.4, len: 0.5, amp: 20 },
  ],
  flash: [{ at: 2.0, col: PS.color, a: 0.4 }, { at: 56.2, col: '#8fe3ff', a: 0.45 }],
  punch: [
    { at: 8.2, dur: 1.6, z: 0.08, x: 480, y: 900 }, { at: 14.6, dur: 1.4, z: 0.1, x: 540, y: 900 },
    { at: 34.4, dur: 1.4, z: 0.1, x: 360, y: 900 }, { at: 43.3, dur: 1.6, z: 0.08, x: 600, y: 900 },
    { at: 52.4, dur: 1.4, z: 0.08, x: 600, y: 900 }, { at: 54.6, dur: 1.4, z: 0.14, x: 450, y: 900 },
    { at: 67.2, dur: 1.4, z: 0.06, x: 540, y: 1000 },
  ],
  last: { at: 72.6, text: 'Some things *don’t* swap.', top: 300 },
  cues: [
    ['glitter', 0.0, 0.6], ['tom', 0.02, 70, { gain: 0.25, decay: 0.25 }], ['pop', 2.0, 1174.66, 0.05, 0],
    ...PANIC_LINES.map(([, a]) => ['pop', a, 880, 0.04, 0]), ['pluck', 6.2, 659.25, 0.035, 0.5, 0.3], ['pluck', 6.35, 587.33, 0.035, 0.5, 0.3],
    ['pop', 12.8, 783.99, 0.04, 0], ['pluck', 13.7, 440, 0.03, 0.8, 0.4], ['pluck', 14.0, 392, 0.03, 0.8, 0.4], ['tick', 15.0, 0.06],
    ...[19.4, 20.2, 21.0, 21.8].map((t, i) => ['pop', t, i % 2 ? 880 : 1046.5, 0.04, i % 2 ? -0.3 : 0.3]),
    ...[24.6, 25.3, 26.0, 26.7].map(t => ['whoosh', t, 0.2, 0.03]), ['tick', 28.6, 0.06],
    ['pop', 34.6, 783.99, 0.035, -0.3], ['pluck', 35.4, 659.25, 0.035, 0.5, -0.3], ['pluck', 35.55, 587.33, 0.035, 0.5, -0.3],
    ['pop', 38.0, 987.77, 0.035, 0.3], ['pop', 41.0, 783.99, 0.035, -0.3], ['pop', 43.3, 1174.66, 0.04, 0.3], ['glitter', 43.4, 44.2],
    ['pop', 50.6, 987.77, 0.035, 0.3], ...[53.6, 53.9, 54.2].map(t => ['tick', t, 0.03]), ['bell', 54.62, 1318.51, 0.03, 1.0, 0],
    ['glitter', 56.2, 57.0], ['pluck', 56.3, 783.99, 0.04, 0.6, 0], ['pluck', 56.45, 659.25, 0.04, 0.6, 0], ['pluck', 56.6, 587.33, 0.035, 0.6, 0],
    ['glitter', 61.4, 62.0], ['pop', 63.0, 880, 0.035, 0], ['pop', 67.4, 783.99, 0.03, -0.3],
    ...Array.from({ length: 7 }, (_, i) => ['pop', r3(66.4 + i * 0.25), [523.25, 587.33, 659.25, 698.46, 783.99, 880, 987.77][i], 0.025, 0.3]),
    ['pluck', 68.4, 659.25, 0.035, 0.5, 0.3], ['pluck', 68.55, 587.33, 0.035, 0.5, 0.3],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
