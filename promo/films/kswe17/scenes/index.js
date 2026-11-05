// kswe17 · SIGN SWAP · "The Honest Swap" (75 s vertical, Month 2 boost m11 #17, long, funk · Bb, hard cut)
// Best friends ♎ Libra and ♏ Scorpio each have one hard talk they keep avoiding. They swap, and do each other's.
//   0.0   frame 0: the sofa, Libra mid-flinch at a phone ringing "the situationship", the swap bolt mid-strike,
//         Scorpio's eyes already open in Libra's body. Hook "Wait for the verdict: *who did better?*"
//   2.8   "Best friends. *Swapped.*"
//   5.0   CH 1 · THE DEAL: the two to-do lists (Libra: "end the situationship (kindly)"; Scorpio: "tell them i like
//         them"). "you do mine. i do yours." A handshake.
//   17.0  CH 2 · LIBRA'S HARD TALK (done by Scorpio, in Libra's body): the café, ♊ the situationship. "i like hanging
//         out. but i want something clear, and this isn't it." "…okay. thanks for being straight with me." CLEAR ✓ KIND ✓
//   33.0  CH 3 · SCORPIO'S HARD TALK (done by Libra, in Scorpio's body): the snowy street, ♉ the crush. "i really like
//         you. no pressure. i just wanted you to know." "…i like you too." Hearts.
//   50.0  CH 4 · THE VERDICT: ♓ Pisces the judge, gavel, two score cards… 10 and 10. "IT'S A TIE." Pisces sobbing:
//         "you were both so BRAVE"
//   63.0  CH 5 · NEXT TIME, THEMSELVES: the swap back; each tries its own: Libra types an honest text itself; Scorpio
//         says "i'm proud of you" out loud.
//   72.6  last line "Two hard talks. *Both* done." holds, hard cut at 75.0.
import { makeSwap } from '../../kswe01/scenes/swapfilm.js'
import { star, swapper, swapBolt, swapTag, phone, bubble, sticker, shadow, hearts, sparkles, table, mug, label, R, box, INK, GOLD, PINK, RED, BONE, SIGN, pop01, outK, prog, ease, clamp, lerp, r3 } from '../../kswe01/scenes/swapkit.js'

const LI = SIGN('libra'), SC = SIGN('scorpio')
const scoIn = (x, t, px, py, s, k, o) => swapper(x, t, px, py, s, 'scorpio', 'libra', k, o)   // Scorpio's soul, Libra's body
const libIn = (x, t, px, py, s, k, o) => swapper(x, t, px, py, s, 'libra', 'scorpio', k, o)   // Libra's soul, Scorpio's body

function sofa(x, cx, cy) {
  box(x, cx - 360, cy - 200, 720, 120, '#5a3a7a', { b: 6 }); box(x, cx - 390, cy - 90, 780, 110, '#6a4a8a', { b: 6, hi: 'rgba(255,255,255,0.18)' })
  box(x, cx - 410, cy - 160, 60, 180, '#5a3a7a', { b: 6 }); box(x, cx + 350, cy - 160, 60, 180, '#5a3a7a', { b: 6 })
}
function opening(x, t) {
  sofa(x, 540, 1170)
  swapBolt(x, t, -0.25, { x1: 300, y1: 640, x2: 780, y2: 640, colA: LI.color, colB: SC.color, dur: 1.1 })
  const k = clamp(0.5 + t / 0.6 * 0.5), flinch = 1 - ease.outCubic(clamp(t / 1.0))
  libIn(x, t, 300 - flinch * 30, 960, 290, k, { mood: 'wide', look: [1, 0.5], squash: -0.08 * flinch, blink: false, hops: [2.2] })
  scoIn(x, t, 780, 960, 290, k, { mood: t < 0.8 ? 'squint' : 'wide', look: [-1, 0], hops: [2.3] })
  // the ringing phone between them
  const buzz = Math.sin(t * 70) * 8
  phone(x, t, { cx: 540 + buzz, cy: 1050, w: 220, h: 330, rot: 0.1, title: 'the situationship', clock: '6:14 PM', lines: [], size: 20, accent: '#8a8498', glow: 1 })
  swapTag(x, t, 540, 1380, 'libra', 'scorpio', 2.1, { out: 4.8, both: true })
}
// ── CH 1: the deal
function todo(x, t, cx, cy, title, items, col, at) {
  const k = pop01(t, at, 0.3, 2.2)
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(cx < 540 ? -0.05 : 0.05); x.scale(k, k)
  box(x, -200, -170, 400, 340, '#fffbea', { b: 6 }); R(x, col, -200, -170, 400, 60)
  label(x, title, 0, -140, { size: 30, col: '#fff', font: 'Inter', weight: 800 })
  items.forEach((it, i) => { R(x, INK, -170, -80 + i * 90, 26, 26); x.font = "700 28px Inter"; x.fillStyle = INK; x.textAlign = 'left'; x.textBaseline = 'top'; it.split('\n').forEach((ln, j) => x.fillText(ln, -128, -84 + i * 90 + j * 32)) })
  x.restore()
}
function dealShot(x, t) {
  sofa(x, 540, 1170)
  todo(x, t, 290, 560, 'LIBRA · TO DO', ['end the situationship\n(kindly!!)', 'pick a lamp'], LI.color, 5.6)
  todo(x, t, 790, 560, 'SCORPIO · TO DO', ['tell them i like them', 'NOT text first?'], SC.color, 6.4)
  libIn(x, t, 300, 960, 280, 1, { mood: t < 9 ? 'neutral' : 'happy', look: [1, 0], hops: [9.2, 13.2, 13.6] })
  scoIn(x, t, 780, 960, 280, 1, { mood: t < 9 ? 'neutral' : 'happy', look: [-1, 0], hops: [9.4, 13.3, 13.7] })
  bubble(x, t, 540, 1290, 9.2, 12.8, 'you do mine. i do yours.', { size: 46, tail: null })
  // the handshake
  if (t > 13.0) { const hk = ease.outCubic(prog(t, 13.0, 13.4)); box(x, lerp(380, 500, hk), 990, 70, 50, LI.color, { b: 5 }); box(x, lerp(640, 520, hk), 990, 70, 50, SC.color, { b: 5 }); if (t > 13.4) sparkles(x, t, 540, 1010, 13.4, 10, 120, 1) }
}
// ── CH 2: Libra's hard talk, by Scorpio
function talk1(x, t) {
  table(x, 540, 1130, 620)
  mug(x, 430, 1130, '#c96a3a', 1, 1, t); mug(x, 650, 1130, '#e9b24a', 1, 1, t)
  shadow(x, 340, 1195, 260); shadow(x, 740, 1195, 250)
  scoIn(x, t, 340, 970, 290, 1, { mood: t < 24 ? 'squint' : 'neutral', look: [1, 0], hops: [19.6, 21.0, 22.4, 24.2] })
  star(x, t, 740, 980, 270, 'gemini', { mood: t < 26.2 ? 'neutral' : t < 28.2 ? 'wide' : 'happy', look: [-1, 0], seed: 3, hops: [26.3, 28.3] })
  bubble(x, t, 430, 640, 19.4, 22.2, 'i like hanging out\nwith you.', { size: 44, tail: -0.4 })
  bubble(x, t, 450, 620, 22.3, 26.0, 'but i want something clear,\nand this isn’t it.', { size: 40, tail: -0.4 })
  bubble(x, t, 640, 640, 26.4, 30.4, '…okay. thanks for being\nstraight with me.', { size: 40, tail: 0.4, col: '#ffe7a8' })
  // CLEAR ✓  KIND ✓ stamps
  for (const [txt, at, cx, col] of [['CLEAR ✓', 29.0, 330, LI.color], ['KIND ✓', 29.5, 750, '#2fc79a']]) sticker(x, t, txt, cx, 1360, at, 32.8, { col, ink: '#fff', size: 54, rot: cx < 540 ? -0.08 : 0.08 })
}
// ── CH 3: Scorpio's hard talk, by Libra
function talk2(x, t) {
  shadow(x, 360, 1310, 250); shadow(x, 720, 1310, 250)
  const nerv = t < 41 ? Math.sin(t * 30) * 3 : 0
  libIn(x, t, 360 + nerv, 1180, 280, 1, { mood: t < 41.4 ? 'wide' : t < 44.6 ? 'neutral' : 'heart', look: [1, 0], blink: t < 41 ? false : undefined, hops: [36.4, 38.4, 41.5, 44.7, 45.3] })
  star(x, t, 720, 1180, 270, 'taurus', { mood: t < 41.4 ? 'neutral' : t < 43.4 ? 'wide' : 'heart', look: [-1, 0], seed: 3, hops: [43.5, 44.8] })
  bubble(x, t, 430, 860, 36.2, 39.0, 'so. um.', { size: 46, tail: -0.4 })
  bubble(x, t, 470, 840, 39.1, 43.2, 'i really like you.\nno pressure. i just\nwanted you to know.', { size: 40, tail: -0.4 })
  bubble(x, t, 660, 860, 43.5, 48.6, '…i like you too.', { size: 46, tail: 0.4, col: '#ffe7a8' })
  hearts(x, t, 44.6, 360, 1000, { n: 6 }); hearts(x, t, 44.8, 720, 1000, { n: 6 })
}
// ── CH 4: the verdict
function scoreCard(x, t, cx, cy, at, n, col) {
  const k = pop01(t, at, 0.35, 2.8)
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(cx < 540 ? -0.06 : 0.06); x.scale(k, k)
  box(x, -110, -130, 220, 260, '#fffbea', { b: 8 }); label(x, String(n), 0, 0, { size: 150, col, font: 'Inter', weight: 800 }); x.restore()
}
function verdict(x, t) {
  // the judge's bench
  box(x, 220, 1000, 640, 190, '#7a4a2a', { b: 8, hi: 'rgba(255,255,255,0.15)' })
  shadow(x, 540, 1000, 260)
  star(x, t, 540, 820, 290, 'pisces', { mood: t < 55.2 ? 'neutral' : 'sparkle', look: [0, 0], tears: t < 55.2 ? 1 : 3, hops: [51.4, 52.8, 55.3, 55.9, 56.5, 57.1, 57.7] })
  // the gavel
  const g = t > 52.6 && t < 53.0 ? Math.sin((t - 52.6) / 0.4 * Math.PI) : 0
  x.save(); x.translate(760, 980); x.rotate(-0.6 + g * 0.9); R(x, INK, -8, -10, 16, 120); R(x, '#a0703a', -4, -6, 8, 112); box(x, -50, -40, 100, 50, '#a0703a', { b: 6 }); x.restore()
  scoreCard(x, t, 230, 1420, 53.6, 10, LI.color)
  scoreCard(x, t, 850, 1420, 54.4, 10, SC.color)
  label(x, 'LIBRA’S TALK', 230, 1600, { size: 26, col: LI.color, font: 'Inter', weight: 800, alpha: t > 53.6 ? 1 : 0 })
  label(x, 'SCORPIO’S TALK', 850, 1600, { size: 26, col: SC.color, font: 'Inter', weight: 800, alpha: t > 54.4 ? 1 : 0 })
  bubble(x, t, 540, 520, 56.0, 62.8, 'you were both\nso BRAVE', { size: 48, col: '#d9d4ff', tail: 0 })
}
// ── CH 5: next time, themselves
function backShot(x, t) {
  sofa(x, 540, 1170)
  swapBolt(x, t, 63.3, { x1: 300, y1: 640, x2: 780, y2: 640, colA: SC.color, colB: LI.color, dur: 0.8 })
  const back = ease.outCubic(prog(t, 63.3, 63.9))
  libIn(x, t, 300, 960, 280, 1 - back, { soul: back < 0.5, mood: 'happy', look: [1, 0], hops: [64.0, 66.6] })
  scoIn(x, t, 780, 960, 280, 1 - back, { soul: back < 0.5, mood: t < 68.6 ? 'neutral' : 'heart', look: [-1, 0], hops: [64.1, 68.7] })
  phone(x, t, { cx: 300, cy: 600, w: 300, h: 380, rot: -0.08, title: 'the lamp shop', clock: '7:40 PM', lines: [{ from: 'me', text: 'i’ll take the green one. final answer.', at: 66.4 }], size: 24, accent: LI.color })
  bubble(x, t, 760, 640, 68.6, 75.2, 'i’m proud of you.\n(out loud. wow.)', { size: 42, tail: 0.2 })
}

const EP = makeSwap({
  duration: 75, ending: 'cut', shade: 1,
  hook: { text: 'Wait for the verdict: *who did better?*', out: [2.6, 2.8], top: 210, size: 92 },
  caps: [
    { at: 2.85, out: [4.8, 5.0], text: 'Best friends. *Swapped.*', top: 230 },
    { at: 17.6, out: [19.2, 19.4], text: 'Scorpio, *as Libra:*', top: 230 },
    { at: 33.6, out: [36.0, 36.2], text: 'Libra, *as Scorpio:*', top: 230 },
    { at: 55.2, out: [57.6, 57.8], text: 'The verdict: *a tie.*', top: 230 },
  ],
  shots: [
    { at: 0, room: 'sofa', cam: [1.1, 540, 980], push: 0.05, draw: opening },
    { at: 5.0, room: 'sofa', cam: [1.14, 540, 920], push: 0.05, draw: dealShot },
    { at: 17.0, room: 'cafe', cam: [1.16, 540, 990], push: 0.05, draw: talk1 },
    { at: 33.0, room: 'street', roomOpts: { snow: 0.8 }, cam: [1.16, 540, 1120], push: 0.05, draw: talk2 },
    { at: 50.0, room: 'studio', cam: [1.12, 540, 1060], push: 0.05, draw: verdict },
    { at: 63.0, room: 'sofa', roomOpts: { warm: 0.4 }, cam: [1.14, 540, 920], push: 0.04, draw: backShot },
  ],
  fx: [
    { kind: 'whip', at: -0.2, from: 1.45 },
    { kind: 'shake', at: 0.0, len: 0.6, amp: 26 },
    { kind: 'rec', at: 0.8, len: 1.1, caption: 'avoiding it. *since August.*', top: 1560 },
    { kind: 'chapter', at: 5.0, out: [8.8, 9.0], n: 1, title: 'the deal' },
    { kind: 'chapter', at: 17.0, out: [19.2, 19.4], n: 2, title: 'libra’s hard talk' },
    { kind: 'chapter', at: 33.0, out: [35.6, 35.8], n: 3, title: 'scorpio’s hard talk' },
    { kind: 'chapter', at: 50.0, out: [52.4, 52.6], n: 4, title: 'the verdict' },
    { kind: 'shake', at: 52.8, len: 0.3, amp: 18 },
    { kind: 'chapter', at: 63.0, out: [65.8, 66.0], n: 5, title: 'next time, themselves' },
    { kind: 'shake', at: 63.3, len: 0.5, amp: 20 },
  ],
  flash: [{ at: 2.0, col: SC.color, a: 0.4 }, { at: 44.6, col: PINK, a: 0.3 }, { at: 54.4, col: GOLD, a: 0.35 }],
  punch: [
    { at: 13.2, dur: 1.4, z: 0.1, x: 540, y: 980 }, { at: 22.3, dur: 1.6, z: 0.06, x: 480, y: 900 }, { at: 26.4, dur: 1.6, z: 0.06, x: 600, y: 900 },
    { at: 39.1, dur: 1.8, z: 0.06, x: 480, y: 1100 }, { at: 43.5, dur: 1.6, z: 0.06, x: 600, y: 1100 },
    { at: 55.3, dur: 1.4, z: 0.1, x: 540, y: 820 }, { at: 68.6, dur: 1.4, z: 0.05, x: 600, y: 920 },
  ],
  last: { at: 72.6, text: 'Two hard talks. *Both* done.', top: 300 },
  cues: [
    ['glitter', 0.0, 0.6], ['tom', 0.02, 70, { gain: 0.25, decay: 0.25 }], ['pop', 2.1, 1174.66, 0.05, 0],
    ...[0.0, 0.5, 1.0].map(t => ['pop', t + 0.02, 1318.51, 0.03, 0]),
    ['pop', 5.6, 783.99, 0.04, -0.3], ['pop', 6.4, 880, 0.04, 0.3], ['pop', 9.2, 987.77, 0.04, 0], ['clap', 13.4, { gain: 0.16 }], ['glitter', 13.4, 13.9],
    ['pop', 19.4, 783.99, 0.035, -0.3], ['pop', 22.3, 783.99, 0.035, -0.3], ['pop', 26.4, 987.77, 0.035, 0.3], ['tom', 29.0, 110, { gain: 0.2, decay: 0.15 }], ['tom', 29.5, 130, { gain: 0.2, decay: 0.15 }],
    ...[36.4, 36.9, 37.4, 37.9, 38.4].map(t => ['tick', t, 0.025]), ['pop', 39.1, 783.99, 0.035, -0.3], ['pop', 43.5, 1174.66, 0.04, 0.3], ['glitter', 44.6, 45.4],
    ['tom', 52.8, 80, { gain: 0.3, decay: 0.25 }], ['tom', 53.6, 120, { gain: 0.22, decay: 0.15 }], ['tom', 54.4, 120, { gain: 0.22, decay: 0.15 }], ['bell', 54.5, 1567.98, 0.04, 1.2, 0],
    ['pluck', 55.3, 659.25, 0.035, 0.5, 0], ['pluck', 55.45, 587.33, 0.035, 0.5, 0], ['pluck', 56.1, 523.25, 0.03, 0.5, 0],
    ['glitter', 63.3, 63.9], ['pop', 66.4, 1046.5, 0.04, -0.3], ['pop', 68.6, 880, 0.04, 0.3],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
