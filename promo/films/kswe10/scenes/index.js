// kswe10 · SIGN SWAP · "Capricorn Woke Up Glowing" (16 s vertical, Month 2 boost m11 #10, pop · A, hard cut)
//   0.0   frame 0: the office, Capricorn mid-spreadsheet, the swap bolt mid-strike, half Leo-orange, and a ring light
//         clicking on full blast. Hook "Capricorn woke up *a Leo.*"  0.8 achievement: "smiled *before 9 AM.*"
//   2.8   the dating profile (a fictional app screen): the photo is the grumpy one. Leo-Cap swipes to the smiling one.
//   7.8   "you look so happy!" drops in. Leo-Cap… actually is.
//   9.8   ♓ Pisces the coworker sobs at the glow-up.
//   14.2  last line "Posted the *smiling* one." holds, hard cut at 16.0.
import { makeSwap } from '../../kswe01/scenes/swapfilm.js'
import { star, swapper, swapBolt, swapTag, bubble, sticker, shadow, hearts, sparkles, label, R, box, INK, GOLD, PINK, RED, BONE, SIGN, pop01, outK, prog, ease, clamp, lerp, r3 } from '../../kswe01/scenes/swapkit.js'

const FROM = 'capricorn', TO = 'leo'
const A = SIGN(FROM), B = SIGN(TO)

function ringLight(x, cx, cy, Rr, on) {
  R(x, INK, cx - 7, cy + Rr - 6, 14, 1190 - cy - Rr + 6); R(x, '#5a5470', cx - 3, cy + Rr, 6, 1190 - cy - Rr)
  if (on > 0) { x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(cx, cy, Rr * 0.5, cx, cy, Rr * 3.4); g.addColorStop(0, `rgba(255,248,225,${0.35 * on})`); g.addColorStop(1, 'rgba(255,248,225,0)'); x.fillStyle = g; x.fillRect(cx - Rr * 3.4, cy - Rr * 3.4, Rr * 6.8, Rr * 6.8); x.restore() }
  const N = 40, c = 20
  for (let pass = 0; pass < 2; pass++) for (let i = 0; i < N; i++) {
    const a = (i / N) * Math.PI * 2, px = Math.round((cx + Math.cos(a) * Rr) / 4) * 4, py = Math.round((cy + Math.sin(a) * Rr) / 4) * 4
    if (pass === 0) R(x, INK, px - c / 2 - 4, py - c / 2 - 4, c + 8, c + 8)
    else R(x, on > 0.5 ? (i % 2 ? '#fffbea' : '#fff1c8') : '#6a6488', px - c / 2, py - c / 2, c, c)
  }
}
function poster(x) { box(x, 620, 300, 340, 260, '#24303e', { b: 8 }); for (let i = 0; i < 4; i++) R(x, '#3a4a5e', 650, 330 + i * 56, 280, 30) }
function monitor(x, cx, cy) {
  box(x, cx - 200, cy - 140, 400, 260, '#1a2a44', { b: 8 }); R(x, INK, cx - 20, cy + 126, 40, 60); box(x, cx - 90, cy + 180, 180, 20, '#5a5470', { b: 5 })
  for (let j = 0; j < 6; j++) for (let i = 0; i < 5; i++) R(x, (i + j) % 3 ? '#2fc79a' : '#7fe3ff', cx - 180 + i * 72, cy - 120 + j * 40, 64, 30)
}
function opening(x, t) {
  poster(x)
  monitor(x, 330, 880)
  const on = t < 0.15 ? 0.5 : 1
  ringLight(x, 800, 760, 150, on)
  swapBolt(x, t, -0.25, { x1: 560, y1: 160, x2: 540, y2: 900, colA: A.color, colB: B.color, dur: 1.1 })
  const k = clamp(0.45 + t / 0.6 * 0.55)
  shadow(x, 560, 1195, 300)
  swapper(x, t, 560, 960, 330, FROM, TO, k, { mood: t < 0.7 ? 'squint' : 'sparkle', look: [1, -0.5], glow: 0.8 + on * 0.6, hops: [2.0] })
  sparkles(x, t, 800, 760, 0.15, 12, 220, 1, ['#fffbea', GOLD, BONE])
  swapTag(x, t, 540, 1360, FROM, TO, 2.1, { out: 2.8 })
}
// the fictional dating profile (no real app: a neutral card, "PROFILE · EDIT PHOTO")
function profile(x, t, cx, cy, swipe) {
  box(x, cx - 280, cy - 440, 560, 880, '#1a1430', { b: 10 })
  R(x, '#f6f2ea', cx - 264, cy - 424, 528, 848)
  label(x, 'PROFILE · EDIT PHOTO', cx, cy - 384, { size: 24, col: INK, font: "'Space Mono'", weight: 700 })
  x.save(); x.beginPath(); x.rect(cx - 230, cy - 340, 460, 520); x.clip()
  R(x, '#c9d6ff', cx - 230, cy - 340, 460, 520)
  // the grumpy photo slides out, the smiling one slides in
  const off = ease.inOutCubic(swipe) * 470
  R(x, '#9aa4c8', cx - 230 - off, cy - 340, 460, 520)
  star(x, t, cx - off, cy - 60, 260, { color: A.color, glyph: null }, { mood: 'squint', look: [0, 0], blink: false, bob: 0, glow: 0.3 })
  R(x, '#ffe2b8', cx + 240 - off, cy - 340, 460, 520)
  star(x, t, cx + 470 - off, cy - 60, 260, { color: B.color, glyph: null }, { mood: 'happy', look: [0, 0], bob: 0, glow: 0.6 })
  x.restore()
  label(x, swipe < 0.5 ? '“accountant. busy.”' : '“accountant. loves a good sunrise.”', cx, cy + 250, { size: 28, col: INK, font: 'Inter', weight: 700 })
  box(x, cx - 160, cy + 320, 320, 70, swipe > 0.95 ? B.color : '#c9c2b0', { b: 5 }); label(x, swipe > 0.95 ? 'POSTED ✓' : 'POST', cx, cy + 356, { size: 32, col: swipe > 0.95 ? '#fff' : INK, font: 'Inter', weight: 800 })
}
function profileShot(x, t) {
  const sw = prog(t, 5.6, 6.2)
  profile(x, t, 540, 960, sw)
  if (t > 6.25) sparkles(x, t, 540, 1316, 6.25, 10, 160, 2)
  swapper(x, t, 860, 1660, 230, FROM, TO, 1, { mood: t < 5.6 ? 'squint' : 'sparkle', look: [-1, -1], hops: [5.65, 6.25] })
  // the swiping thumb
  if (t > 5.3 && t < 6.4) { const fx = lerp(760, 320, ease.inOutCubic(prog(t, 5.5, 6.2))); box(x, fx - 34, 980, 68, 110, '#f39a3a', { b: 6 }) }
}
function glowShot(x, t) {
  poster(x)
  monitor(x, 230, 880)
  ringLight(x, 880, 740, 120, 1)
  shadow(x, 520, 1195, 300)
  swapper(x, t, 480, 960, 320, FROM, TO, 1, { mood: t < 8.4 ? 'wide' : 'heart', look: [0, 0], glow: 1.3, hops: [8.4, 8.9, 10.0] })
  hearts(x, t, 8.4, 480, 800, { n: 7 })
  if (t > 9.8) {
    const pk = ease.outCubic(prog(t, 9.8, 10.4))
    star(x, t, lerp(1250, 750, pk), 1080, 250, 'pisces', { mood: 'sparkle', look: [-1, 0], tears: 3, hops: [10.5, 11.1, 11.7, 12.3, 12.9, 13.5] })
    bubble(x, t, 700, 1330, 10.5, 16.2, 'the GLOW-UP', { size: 48, col: '#d9d4ff', tail: null })
  }
}

const EP = makeSwap({
  duration: 16, ending: 'cut',
  hook: { text: 'Capricorn woke up *a Leo.*', out: [2.6, 2.8], top: 220 },
  caps: [
    { at: 2.9, out: [5.4, 5.6], text: 'The profile pic: *the grumpy one.*', top: 210, size: 80 },
    { at: 5.8, out: [7.6, 7.8], text: 'Swiped to *the smiling one.*', top: 210, size: 80 },
  ],
  shots: [
    { at: 0, room: 'office', cam: [1.05, 540, 980], push: 0.05, draw: opening },
    { at: 2.8, room: 'office', roomOpts: { dark: 0.4 }, cam: [1.0, 540, 960], push: 0.03, draw: profileShot },
    { at: 7.8, room: 'office', cam: [1.25, 540, 1000], push: 0.05, draw: glowShot },
  ],
  fx: [
    { kind: 'whip', at: -0.2, from: 1.45 },
    { kind: 'shake', at: 0.12, len: 0.4, amp: 20 },
    { kind: 'ach', at: 0.8, out: [2.4, 2.65], text: 'smiled *before 9 AM.*', y: 1520 },
    { kind: 'notify', at: 7.8, out: [10.6, 10.85], title: 'messages', body: 'new match: you look *so happy!*', glyph: '♡', color: B.color, y: 140 },
  ],
  flash: [{ at: 0.15, col: '#fffbea', a: 0.6 }, { at: 6.25, col: B.color, a: 0.3 }],
  punch: [{ at: 8.4, dur: 1.4, z: 0.06, x: 520, y: 960 }],
  last: { at: 14.2, text: 'Posted the *smiling* one.', top: 300 },
  cues: [
    ['tick', 0.15, 0.08], ['glitter', 0.15, 0.7], ['pop', 2.1, 1174.66, 0.05, 0],
    ['whoosh', 5.7, 0.4, 0.04], ['pop', 6.2, 987.77, 0.04, 0], ['bell', 6.25, 1567.98, 0.04, 1.0, 0],
    ['glitter', 8.4, 9.1], ['pluck', 10.5, 659.25, 0.035, 0.5, 0.3], ['pluck', 10.65, 587.33, 0.035, 0.5, 0.3], ['pluck', 11.3, 523.25, 0.03, 0.5, -0.3],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
