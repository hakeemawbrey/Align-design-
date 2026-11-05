// kswe20 · SIGN SWAP · "Swap Back by Midnight" (90 s vertical, Month 2 boost m11 #20, long, house · A, loop)
// Flatmates ♈ Aries and ♍ Virgo swap at 6:00 PM. To swap back by midnight, each must do the other's hardest thing.
//   0.0   frame 0: the bedroom, Aries and Virgo mid-tumble out of bed, the clock flashing 6:00 PM, the swap bolt cracking
//         between them. Hook "Swapped. *Six hours* to swap back."   2.8 "Will they *make it?*"
//   5.0   the rule card: "to swap back, each does the other's hardest thing." ARIES (in Virgo's body): write a slow,
//         thoughtful message. VIRGO (in Aries' body): ask someone out. On the spot.
//   14.0  CH 1 · THE SLOW MESSAGE: Aries-as-Virgo at the desk, "hey" typed and deleted; a word counter crawls; 8:30 PM.
//   30.0  CH 2 · THE ASK: the café, ♐ the barista. Virgo-as-Aries with a pros/cons clipboard; the Aries legs walk it to
//         the counter anyway; 10:15 PM.
//   46.0  CH 3 · THE NEAR-MISS: split screen at 11:40: Virgo blurts "never mind!", Aries types "k". Record scratch:
//         "nope. *not like this.*" Both breathe, and go again.
//   62.0  CH 4 · 11:59: Aries sends the real message ("i've been thinking about what you said, and you were right.
//         thank you for being patient with me."). Virgo: "would you like to get dinner sometime?" "…yes!" 3-2-1.
//   76.0  CH 5 · MIDNIGHT: the bolt, swapped back. ♓ Pisces, the neighbour, sobbing in the doorway. Then a flash across
//         the hall: ♎ Libra and ♊ Gemini just swapped.
//   85.6  last line "See you *next* swap."  89.55–90.0 eases back into frame 0 (loop).
import { makeSwap } from '../../kswe01/scenes/swapfilm.js'
import { star, swapper, swapBolt, swapTag, phone, bubble, sticker, shadow, hearts, sparkles, bed, table, mug, clockFace, label, R, box, INK, GOLD, PINK, RED, BONE, SIGN, pop01, outK, prog, ease, clamp, lerp, r3 } from '../../kswe01/scenes/swapkit.js'

const AR = SIGN('aries'), VI = SIGN('virgo')
const arIn = (x, t, px, py, s, k, o) => swapper(x, t, px, py, s, 'aries', 'virgo', k, o)   // Aries' soul, Virgo's body
const viIn = (x, t, px, py, s, k, o) => swapper(x, t, px, py, s, 'virgo', 'aries', k, o)   // Virgo's soul, Aries' body
const CLOCK = [[0, '6:00 PM'], [14, '8:30 PM'], [30, '10:15 PM'], [46, '11:40 PM'], [62, '11:59 PM'], [76, '12:00 AM']]
const clockAt = t => { let c = CLOCK[0][1]; for (const [a, s] of CLOCK) if (t >= a) c = s; return c }

function opening(x, t) {
  bed(x, 540, 1180, { col: '#e8344e', k: 0.7 })
  swapBolt(x, t, -0.25, { x1: 330, y1: 700, x2: 760, y2: 700, colA: AR.color, colB: VI.color, dur: 1.1 })
  const k = clamp(0.5 + t / 0.6 * 0.5), fall = ease.outCubic(clamp(0.3 + t / 1.0))
  arIn(x, t, lerp(400, 300, fall), lerp(820, 960, fall), 290, k, { mood: 'wide', look: [1, 0], squash: -0.1 * (1 - fall), blink: false, hops: [2.2] })
  viIn(x, t, lerp(680, 780, fall), lerp(820, 960, fall), 290, k, { mood: 'wide', look: [-1, 0], squash: -0.1 * (1 - fall), blink: false, hops: [2.3] })
  clockFace(x, 540, 560, '6:00 PM', { size: 70, blink: true, t })
  swapTag(x, t, 540, 1400, 'aries', 'virgo', 2.1, { out: 4.8, both: true })
}
function ruleShot(x, t) {
  // the rule card: a scroll unrolling
  const u = ease.outCubic(prog(t, 5.2, 5.9)), h = 760 * u
  box(x, 150, 360, 780, 40, '#c99a4a', { b: 6 })
  if (h > 10) { box(x, 170, 400, 740, h, '#f4e8cc', { b: 6 }); box(x, 150, 400 + h, 780, 40, '#c99a4a', { b: 6 }) }
  if (u > 0.95) {
    label(x, 'THE RULE', 540, 470, { size: 40, col: '#7a2a3a', font: 'Inter', weight: 800 })
    x.font = "700 34px Inter"; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
    ;['to swap back by midnight,', 'each of you does the other’s', 'hardest thing.'].forEach((l, i) => x.fillText(l, 540, 540 + i * 46))
    sticker(x, t, 'ARIES: write a slow, thoughtful message', 540, 800, 7.4, 13.8, { col: AR.color, ink: '#fff', size: 34, rot: -0.03 })
    sticker(x, t, 'VIRGO: ask someone out. on the spot.', 540, 940, 9.6, 13.8, { col: VI.color, ink: '#fff', size: 34, rot: 0.03 })
  }
  arIn(x, t, 300, 1440, 260, 1, { mood: t < 7.4 ? 'neutral' : 'wide', look: [0.6, -1], hops: [7.5] })
  viIn(x, t, 780, 1440, 260, 1, { mood: t < 9.6 ? 'neutral' : 'wide', look: [-0.6, -1], blink: t > 9.6 ? false : undefined, hops: [9.7] })
}
// ── CH 1: the slow message
const MSG = 'i’ve been thinking about what you said, and you were right. thank you for being patient with me.'
function slowShot(x, t) {
  table(x, 540, 1130, 640)
  phone(x, t, { cx: 560, cy: 760, w: 600, h: 520, title: 'my best friend ♌', clock: clockAt(t), lines: [], accent: AR.color })
  // the draft: "hey" typed then deleted, then the real one crawling in
  let draft
  if (t < 17.0) draft = 'hey'.slice(0, Math.floor((t - 14.6) * 3))
  else if (t < 18.0) draft = 'hey'.slice(0, Math.max(0, 3 - Math.floor((t - 17.0) * 4)))
  else draft = MSG.slice(0, Math.floor((t - 18.4) * 2.2))
  const lines = wrapText(x, draft, 500, "700 34px Inter").slice(-4)
  box(x, 270, 840, 580, 200, '#ffffff', { b: 6 }); x.font = "700 34px Inter"; x.fillStyle = INK; x.textAlign = 'left'; x.textBaseline = 'top'; lines.forEach((l, i) => x.fillText(l + (i === lines.length - 1 && Math.floor(t * 2) % 2 ? '|' : ''), 290, 860 + i * 44))
  const words = draft.trim() ? draft.trim().split(/\s+/).length : 0
  if (t > 18.4) sticker(x, t, `WORD ${words} OF 19`, 820, 520, 18.6, 29.8, { col: GOLD, size: 36, rot: 0.06 })
  shadow(x, 300, 1430, 260)
  arIn(x, t, 300, 1240, 280, 1, { mood: t < 20 ? 'squint' : t < 26 ? 'neutral' : 'happy', look: [1, -1], hops: [17.1, 21.0, 25.0, 28.0] })
  bubble(x, t, 300, 1560, 21.0, 25.6, 'why does it take\nSO LONG to mean it', { size: 40, tail: null })
}
function wrapText(x, text, maxW, font) { x.save(); x.font = font; const out = []; let cur = ''; for (const w of text.split(' ')) { const n = cur ? cur + ' ' + w : w; if (x.measureText(n).width > maxW && cur) { out.push(cur); cur = w } else cur = n } if (cur) out.push(cur); x.restore(); return out.length ? out : [''] }
// ── CH 2: the ask
function askShot(x, t) {
  box(x, 600, 940, 440, 250, '#7a4a2a', { b: 6, hi: 'rgba(255,255,255,0.18)' })   // the counter
  mug(x, 700, 940, '#e9b24a', 1, 1, t)
  star(x, t, 840, 820, 250, 'sagittarius', { mood: t < 42 ? 'happy' : 'wide', look: [-1, 0.2], seed: 3, hops: [33.0, 42.2] })
  const walk = ease.inOutCubic(prog(t, 37.6, 40.4)), px = lerp(220, 420, walk)
  shadow(x, px, 1195, 250)
  viIn(x, t, px, 980, 270, 1, { mood: t < 40.6 ? 'wide' : 'squint', look: [1, -0.2], blink: t > 38 && t < 40.6 ? false : undefined, hops: t > 37.6 && t < 40.4 ? [37.8, 38.3, 38.8, 39.3, 39.8] : [41.0] })
  // the pros/cons clipboard
  const ck = pop01(t, 31.0, 0.3, 2.2) * outK(t, [37.2, 37.6])
  if (ck > 0.01) {
    x.save(); x.translate(330, 520); x.rotate(-0.05); x.scale(ck, ck)
    box(x, -230, -200, 460, 400, '#fffbea', { b: 6 }); R(x, VI.color, -230, -200, 460, 60)
    label(x, 'ASK THEM OUT?', 0, -170, { size: 32, col: '#fff', font: 'Inter', weight: 800 })
    ;[['PRO: they laughed at my joke', 31.6], ['CON: what if no', 32.6], ['PRO: they drew a heart on my cup', 33.6], ['CON: what if YES', 34.6]].forEach(([s, at], i) => { if (t > at) { x.font = "700 26px Inter"; x.fillStyle = s.startsWith('PRO') ? '#1f8a5a' : RED; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(s, -200, -100 + i * 70) } })
    x.restore()
  }
  if (t > 37.6) bubble(x, t, 420, 640, 37.8, 40.4, 'my LEGS are\nwalking??', { size: 44, tail: -0.2 })
  if (t > 40.6) bubble(x, t, 440, 660, 41.0, 45.8, 'hi. um. hello.', { size: 44, tail: -0.2 })
}
// ── CH 3: the near-miss
function nearShot(x, t) {
  R(x, INK, 532, 0, 16, 1920); R(x, GOLD, 536, 0, 8, 1920)
  // left: Virgo-as-Aries at the counter
  viIn(x, t, 270, 1150, 300, 1, { mood: t < 49 ? 'wide' : t < 53.4 ? 'squint' : 'neutral', look: [1, 0], hops: [47.0, 53.6, 57.0] })
  bubble(x, t, 270, 820, 46.6, 49.4, 'never mind!', { size: 54, tail: 0, col: '#ffd6cc' })
  // right: Aries-as-Virgo at the phone
  phone(x, t, { cx: 810, cy: 700, w: 400, h: 520, title: 'my best friend ♌', clock: '11:40 PM', lines: [], accent: AR.color })
  box(x, 640, 860, 340, 70, '#ffffff', { b: 5 }); x.font = "700 34px Inter"; x.fillStyle = INK; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(t > 49.6 && t < 53.4 ? 'k' : '', 660, 896)
  arIn(x, t, 810, 1150, 300, 1, { mood: t < 49.6 ? 'neutral' : t < 53.4 ? 'squint' : 'neutral', look: [0, -1], hops: [49.7, 53.6, 57.2] })
  if (t > 55.6) { bubble(x, t, 270, 1400, 55.8, 61.6, 'breathe.', { size: 54, tail: null }); bubble(x, t, 810, 1400, 56.2, 61.6, 'again.', { size: 54, tail: null }) }
}
// ── CH 4: 11:59
function finalShot(x, t) {
  R(x, INK, 532, 0, 16, 1920); R(x, GOLD, 536, 0, 8, 1920)
  phone(x, t, { cx: 810, cy: 820, w: 420, h: 700, title: 'my best friend ♌', clock: '11:59 PM', lines: [{ from: 'me', text: MSG, at: 63.4 }, ...(t > 67.2 ? [{ from: 'them', text: 'oh my heart. thank you for saying that.', at: 67.2 }] : [])], size: 26, accent: AR.color })
  arIn(x, t, 810, 1450, 300, 1, { mood: t < 63.4 ? 'neutral' : 'sparkle', look: [0, -1], hops: [63.5, 67.3, 70.0] })
  star(x, t, 280, 820, 260, 'sagittarius', { mood: t < 70.4 ? 'neutral' : 'heart', look: [0, 0.4], seed: 3, hops: [70.5] })
  viIn(x, t, 270, 1450, 300, 1, { mood: t < 68 ? 'neutral' : t < 70.4 ? 'wide' : 'heart', look: [0, -1], hops: [68.0, 70.6, 71.4] })
  bubble(x, t, 270, 1130, 68.0, 70.3, 'would you like to get\ndinner sometime?', { size: 40, tail: 0 })
  bubble(x, t, 300, 560, 70.4, 75.6, '…yes!', { size: 56, tail: 0, col: '#ffe7a8' })
  hearts(x, t, 70.6, 270, 1260, { n: 6 }); hearts(x, t, 67.4, 810, 1260, { n: 6 })
}
// ── CH 5: midnight
function midnightShot(x, t) {
  bed(x, 540, 1180, { col: '#e8344e', k: 0.7 })
  swapBolt(x, t, 76.2, { x1: 330, y1: 700, x2: 760, y2: 700, colA: VI.color, colB: AR.color, dur: 0.9 })
  const back = ease.outCubic(prog(t, 76.2, 76.9))
  arIn(x, t, 300, 960, 290, 1 - back, { soul: back < 0.5, mood: t < 77 ? 'wide' : 'happy', look: [1, 0], hops: [77.0, 79.6] })
  viIn(x, t, 780, 960, 290, 1 - back, { soul: back < 0.5, mood: t < 77 ? 'wide' : 'happy', look: [-1, 0], hops: [77.1, 79.7] })
  clockFace(x, 540, 560, '12:00 AM', { size: 70 })
  if (t > 77.6) {
    const pk = ease.outCubic(prog(t, 77.6, 78.2))
    star(x, t, 540, lerp(1950, 1500, pk), 280, 'pisces', { mood: 'sparkle', look: [0, -0.6], tears: 3, hops: [78.3, 78.9, 79.5, 80.1, 80.7, 81.3] })
    bubble(x, t, 540, 1770, 78.4, 81.6, 'YOU DID IT', { size: 48, col: '#d9d4ff', tail: null })
  }
  // across the hall: Libra and Gemini, mid-swap
  if (t > 81.8) {
    const k = clamp((t - 82.0) / 0.6)
    x.save(); x.globalAlpha = ease.outCubic(prog(t, 81.8, 82.2)); R(x, 'rgba(6,4,18,0.75)', 0, 0, 1080, 1920); x.restore()
    swapBolt(x, t, 82.0, { x1: 330, y1: 900, x2: 750, y2: 900, colA: SIGN('libra').color, colB: SIGN('gemini').color, dur: 1.0 })
    swapper(x, t, 330, 1020, 280, 'libra', 'gemini', k, { mood: 'wide', look: [1, 0], blink: false })
    swapper(x, t, 750, 1020, 280, 'gemini', 'libra', k, { mood: 'wide', look: [-1, 0], blink: false })
    swapTag(x, t, 540, 1420, 'libra', 'gemini', 82.6, { out: 89.4, both: true })
  }
}

const EP = makeSwap({
  duration: 90, ending: 'loop', shade: 1,
  hook: { text: 'Swapped. *Six hours* to swap back.', out: [2.6, 2.8], top: 210, size: 92 },
  caps: [
    { at: 2.85, out: [4.8, 5.0], text: 'Will they *make it?*', top: 230 },
    { at: 82.4, out: [85.2, 85.4], text: 'Meanwhile, *across the hall…*', top: 230, size: 84 },
  ],
  shots: [
    { at: 0, room: 'bed', cam: [1.1, 540, 960], push: 0.05, draw: opening },
    { at: 5.0, room: 'bed', roomOpts: { dark: 0.35 }, cam: [1.0, 540, 960], push: 0.03, draw: ruleShot },
    { at: 14.0, room: 'office', roomOpts: { dark: 0.3 }, cam: [1.05, 540, 980], push: 0.06, draw: slowShot },
    { at: 30.0, room: 'cafe', cam: [1.12, 540, 980], push: 0.06, draw: askShot },
    { at: 46.0, room: 'studio', cam: [1.0, 540, 960], push: 0.03, draw: nearShot },
    { at: 62.0, room: 'studio', roomOpts: { warm: 0.3 }, cam: [1.0, 540, 960], push: 0.03, draw: finalShot },
    { at: 76.0, room: 'bed', roomOpts: { warm: 0.3 }, cam: [1.1, 540, 960], push: 0.04, draw: midnightShot },
  ],
  fx: [
    { kind: 'whip', at: -0.2, from: 1.45 },
    { kind: 'shake', at: 0.0, len: 0.6, amp: 28 },
    { kind: 'glitch', at: 0.8, len: 0.9, text: 'SWAP.EXE: *6 hours remaining*', buttons: ['OK', 'PANIC'] },
    { kind: 'chapter', at: 14.0, out: [16.4, 16.6], n: 1, title: 'the slow message' },
    { kind: 'chapter', at: 30.0, out: [30.9, 31.0], n: 2, title: 'the ask' },
    { kind: 'chapter', at: 46.0, out: [46.5, 46.6], n: 3, title: 'the near-miss' },
    { kind: 'rec', at: 53.6, len: 2.0, caption: 'nope. *not like this.*', top: 1560 },
    { kind: 'chapter', at: 62.0, out: [64.4, 64.6], n: 4, title: '11:59' },
    { kind: 'count', at: 72.6, from: 3, gap: 0.6, go: 'MIDNIGHT', y: 960 },
    { kind: 'chapter', at: 76.0, out: [78.4, 78.6], n: 5, title: 'midnight' },
    { kind: 'shake', at: 76.2, len: 0.6, amp: 24 },
    { kind: 'shake', at: 82.0, len: 0.5, amp: 22 },
  ],
  flash: [{ at: 2.05, col: VI.color, a: 0.4 }, { at: 63.4, col: AR.color, a: 0.3 }, { at: 70.4, col: PINK, a: 0.35 }],
  punch: [
    { at: 21.0, dur: 1.6, z: 0.06, x: 400, y: 1100 }, { at: 37.8, dur: 1.6, z: 0.08, x: 420, y: 900 }, { at: 41.0, dur: 1.6, z: 0.06, x: 600, y: 900 },
  ],
  last: { at: 85.6, text: 'See you *next* swap.', top: 300 },
  cues: [
    ['glitter', 0.0, 0.6], ['tom', 0.02, 70, { gain: 0.25, decay: 0.25 }], ['pop', 2.1, 1174.66, 0.05, 0],
    ['whoosh', 5.2, 0.5, 0.04], ['pop', 7.4, 880, 0.04, -0.3], ['pop', 9.6, 987.77, 0.04, 0.3],
    ...[14.6, 14.9, 15.2].map(t => ['tick', t, 0.03]), ...[17.0, 17.25, 17.5].map(t => ['tick', t, 0.03]),
    ...Array.from({ length: 22 }, (_, i) => ['tick', r3(18.4 + i * 0.5), 0.02]), ['pop', 21.0, 783.99, 0.035, 0],
    ...[31.6, 32.6, 33.6, 34.6].map((t, i) => ['pop', t, i % 2 ? 659.25 : 987.77, 0.035, 0]), ...[37.8, 38.3, 38.8, 39.3, 39.8].map(t => ['tick', t, 0.04]), ['pop', 41.0, 880, 0.035, 0],
    ['pop', 46.6, 1174.66, 0.04, -0.4], ['tick', 49.6, 0.08], ['pop', 55.8, 659.25, 0.03, -0.3], ['pop', 56.2, 659.25, 0.03, 0.3],
    ['pop', 63.4, 1046.5, 0.045, 0.3], ['pop', 67.2, 1318.51, 0.04, 0.3], ['pop', 68.0, 783.99, 0.035, -0.3], ['bell', 70.45, 1567.98, 0.04, 1.2, -0.3], ['glitter', 70.6, 71.4],
    ['glitter', 76.2, 76.9], ['pluck', 78.3, 659.25, 0.035, 0.5, 0], ['pluck', 78.45, 587.33, 0.035, 0.5, 0], ['glitter', 82.0, 82.7],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
