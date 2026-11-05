// kswe14 · SIGN SWAP · "Swapped With the Date" (20 s vertical, Month 2 boost m11 #14, jazzy · F, hard cut)
//   0.0   frame 0: the café, ♌ Leo and ♒ Aquarius mid-cheers across the table, mugs clinking, the swap bolt zig-zagging
//         between them. Hook "We swapped. *On the first date.*"  0.6 freeze: "first date. *minute three.*"
//   2.8   Leo, in Aquarius' body: "why do i suddenly want to talk about SPACE" (planets orbit its head).
//   6.8   Aquarius, in Leo's body: "why do i want a photo of US" (phone up, a selfie, a sparkle).
//   10.8  both, at once: "oh. so THIS is your head." They get each other. Hearts.
//   13.8  ♓ Pisces the barista brings two latte-art hearts and cries over them: "you GET each other"
//   18.2  last line "Get it now? *Get them.*" holds, hard cut at 20.0.
import { makeSwap } from '../../kswe01/scenes/swapfilm.js'
import { star, swapper, swapBolt, swapTag, phone, bubble, sticker, shadow, hearts, sparkles, table, mug, heart, label, R, box, INK, GOLD, PINK, RED, BONE, SIGN, pop01, outK, prog, ease, clamp, lerp, r3 } from '../../kswe01/scenes/swapkit.js'

const LE = SIGN('leo'), AQ = SIGN('aquarius')
const leoIn = (x, t, px, py, s, k, o) => swapper(x, t, px, py, s, 'leo', 'aquarius', k, o)   // Leo's soul, Aquarius' body
const aquaIn = (x, t, px, py, s, k, o) => swapper(x, t, px, py, s, 'aquarius', 'leo', k, o)  // Aquarius' soul, Leo's body

function planets(x, t, cx, cy, Rr) {
  for (let i = 0; i < 3; i++) {
    const a = t * (1.6 + i * 0.4) + i * 2.1, px = cx + Math.cos(a) * Rr, py = cy + Math.sin(a) * Rr * 0.35
    const c = ['#ffb38a', '#9fe8ff', '#d9b8ff'][i], r = 22 + i * 6
    x.fillStyle = INK; x.beginPath(); x.arc(px, py, r + 5, 0, Math.PI * 2); x.fill(); x.fillStyle = c; x.beginPath(); x.arc(px, py, r, 0, Math.PI * 2); x.fill()
    if (i === 2) { x.strokeStyle = INK; x.lineWidth = 6; x.beginPath(); x.ellipse(px, py, r * 1.8, r * 0.5, -0.3, 0, Math.PI * 2); x.stroke() }
  }
}
function setting(x, t) { table(x, 540, 1130, 620) }
function opening(x, t) {
  setting(x, t)
  swapBolt(x, t, -0.25, { x1: 330, y1: 820, x2: 750, y2: 820, colA: LE.color, colB: AQ.color, dur: 1.1 })
  const k = clamp(0.45 + t / 0.6 * 0.55)
  shadow(x, 300, 1195, 260); shadow(x, 780, 1195, 260)
  leoIn(x, t, 300, 960, 290, k, { mood: t < 0.6 ? 'happy' : 'wide', look: [1, 0], hops: [2.2] })
  aquaIn(x, t, 780, 960, 290, k, { mood: t < 0.6 ? 'happy' : 'wide', look: [-1, 0], hops: [2.3] })
  // the clink
  const c = ease.outCubic(clamp(0.6 + t / 0.5))
  mug(x, lerp(440, 515, c), 1010, '#e9b24a', 1.1); mug(x, lerp(640, 575, c), 1010, '#c96a3a', 1.1)
  if (t < 0.5) sparkles(x, t, 545, 940, -0.1, 8, 70, 1)
  swapTag(x, t, 540, 1380, 'leo', 'aquarius', 2.1, { out: 2.8, both: true })
}
function spaceShot(x, t) {
  setting(x, t)
  shadow(x, 300, 1195, 260); shadow(x, 780, 1195, 260)
  const r = leoIn(x, t, 300, 960, 290, 1, { mood: t < 3.6 ? 'wide' : 'sparkle', look: [1, -0.6], hops: [3.0, 3.6, 4.2, 4.8] })
  aquaIn(x, t, 780, 960, 290, 1, { mood: 'neutral', look: [-1, 0] })
  if (t > 3.4) planets(x, t, 300, r.top - 40, 200)
  bubble(x, t, 460, 640, 3.2, 6.7, 'why do i suddenly want\nto talk about SPACE', { size: 42, tail: -0.5 })
}
function selfieShot(x, t) {
  setting(x, t)
  shadow(x, 300, 1195, 260); shadow(x, 780, 1195, 260)
  leoIn(x, t, 300, 960, 290, 1, { mood: t < 8.6 ? 'neutral' : 'happy', look: [1, 0], hops: [8.6] })
  aquaIn(x, t, 780, 960, 290, 1, { mood: t < 7.6 ? 'wide' : 'sparkle', look: [-1, -0.4], hops: [7.2, 7.8, 8.6] })
  // the selfie phone up high
  const k = pop01(t, 7.4, 0.3, 2.2)
  x.save(); x.translate(820, lerp(1100, 600, clamp(k))); x.rotate(-0.15); box(x, -70, -110, 140, 220, '#1a1430', { b: 6 }); R(x, '#ffe2b8', -58, -96, 116, 186)
  star(x, t, -26, 0, 60, { color: AQ.color, glyph: null }, { mood: 'happy', bob: 0, glow: 0.3 }); star(x, t, 26, 0, 60, { color: LE.color, glyph: null }, { mood: 'happy', bob: 0, glow: 0.3 }); x.restore()
  if (t > 8.6 && t < 9.1) { x.save(); x.globalAlpha = 0.6 * (1 - (t - 8.6) / 0.5); x.fillStyle = '#fff'; x.fillRect(0, 0, 1080, 1920); x.restore() }
  bubble(x, t, 600, 520, 7.0, 10.7, 'why do i want\na photo of US', { size: 44, tail: 0.5 })
}
function getShot(x, t) {
  setting(x, t)
  shadow(x, 300, 1195, 260); shadow(x, 780, 1195, 260)
  leoIn(x, t, 300, 960, 290, 1, { mood: t < 11.8 ? 'wide' : 'heart', look: [1, 0], hops: [11.0, 11.9, 14.0] })
  aquaIn(x, t, 780, 960, 290, 1, { mood: t < 11.8 ? 'wide' : 'heart', look: [-1, 0], hops: [11.05, 11.95, 14.1] })
  bubble(x, t, 540, 640, 11.0, 13.6, 'oh. so THIS\nis your head.', { size: 48, tail: 0 })
  hearts(x, t, 11.9, 300, 800, { n: 5 }); hearts(x, t, 12.0, 780, 800, { n: 5 })
  if (t > 13.8) {
    const pk = ease.outCubic(prog(t, 13.8, 14.4)), py = lerp(1900, 1440, pk)
    star(x, t, 540, py, 360, 'pisces', { mood: 'sparkle', look: [0, -0.6], tears: 3, hops: [14.5, 15.1, 15.7, 16.3, 16.9] })
    // two latte-art hearts on a tray
    box(x, 340, py + 170, 400, 30, '#8a6a4a', { b: 5 })
    for (const lx of [430, 650]) { box(x, lx - 50, py + 90, 100, 80, '#f4ecdc', { b: 5 }); R(x, '#a0703a', lx - 40, py + 98, 80, 22); heart(x, lx, py + 108, 3, '#fff3e0', { outline: null }) }
    bubble(x, t, 540, 1760, 14.6, 20.2, 'you GET each other', { size: 44, col: '#d9d4ff', tail: 0 })
  }
}

const EP = makeSwap({
  duration: 20, ending: 'cut',
  hook: { text: 'We swapped. *On the first date.*', out: [2.6, 2.8], top: 220, size: 98 },
  caps: [
    { at: 2.9, out: [6.6, 6.8], text: 'Leo, *as Aquarius:*', top: 230 },
    { at: 6.9, out: [10.6, 10.8], text: 'Aquarius, *as Leo:*', top: 230 },
    { at: 10.9, out: [13.6, 13.8], text: 'Now they *get it.*', top: 230 },
  ],
  shots: [
    { at: 0, room: 'cafe', cam: [1.12, 540, 1000], push: 0.05, draw: opening },
    { at: 2.8, room: 'cafe', cam: [1.12, 540, 1000], push: 0.05, draw: spaceShot },
    { at: 6.8, room: 'cafe', cam: [1.12, 540, 1000], push: 0.05, draw: selfieShot },
    { at: 10.8, room: 'cafe', roomOpts: { warm: 0.4 }, cam: [1.08, 540, 1060], push: 0.04, draw: getShot },
  ],
  fx: [
    { kind: 'whip', at: -0.2, from: 1.45 },
    { kind: 'shake', at: 0.0, len: 0.5, amp: 24 },
    { kind: 'rec', at: 0.6, len: 1.3, caption: 'first date. *minute three.*', top: 1560 },
  ],
  flash: [{ at: 2.05, col: GOLD, a: 0.35 }, { at: 11.9, col: PINK, a: 0.3 }],
  punch: [{ at: 3.6, dur: 1.4, z: 0.08, x: 440, y: 880 }, { at: 7.8, dur: 1.4, z: 0.08, x: 640, y: 880 }],
  last: { at: 18.2, text: 'Get it now? *Get them.*', top: 300 },
  cues: [
    ['glitter', 0.0, 0.5], ['pop', 0.05, 1567.98, 0.05, 0], ['bell', 0.08, 2093, 0.03, 0.8, 0], ['pop', 2.1, 1174.66, 0.05, 0],
    ['pop', 3.2, 880, 0.035, -0.3], ['glitter', 3.4, 3.9], ['pop', 7.0, 987.77, 0.035, 0.3], ['tick', 8.6, 0.08], ['bell', 8.62, 1760, 0.03, 0.6, 0.3],
    ['pop', 11.0, 783.99, 0.04, 0], ['glitter', 11.9, 12.6],
    ['pluck', 14.5, 659.25, 0.035, 0.5, 0], ['pluck', 14.65, 587.33, 0.035, 0.5, 0], ['pluck', 15.3, 523.25, 0.03, 0.5, 0],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
