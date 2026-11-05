// kswe03 · SIGN SWAP · "Gemini Woke Up With a Plan" (14 s vertical, Month 2 boost m11 #3, jazzy · Bb, hard cut)
//   0.0   frame 0: the group chat phone mid-explosion (47 unread), Gemini mid-yawn, the swap bolt mid-strike, a
//         clipboard popping into its hand, half Capricorn-green. Hook "Gemini woke up *organised.*"
//   0.6   record-scratch freeze: "the group chat. *hour one.*"
//   2.4   the chat: "where are we eating??" and a pile-up of maybes from six signs.
//   6.2   Cap-Gemini, clipboard out, types: "7pm. the noodle place. I booked." The chat goes silent… then relief.
//   9.4   ♓ Pisces in bed, sobbing at the phone: "someone DECIDED"
//   12.2  last line "Someone *finally* picked." holds, hard cut at 14.0.
import { makeSwap } from '../../kswe01/scenes/swapfilm.js'
import { star, swapper, swapBolt, swapTag, phone, bubble, sticker, shadow, hearts, sparkles, label, R, box, INK, GOLD, PINK, RED, BONE, SIGN, pop01, outK, prog, ease, clamp, lerp, r3 } from '../../kswe01/scenes/swapkit.js'

const FROM = 'gemini', TO = 'capricorn'
const A = SIGN(FROM), B = SIGN(TO)

function clipboard(x, cx, cy, s = 1, rot = 0, ticks = 0) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  box(x, -70, -95, 140, 190, '#b07a48', { b: 6 }); R(x, '#fffbea', -58, -80, 116, 166)
  box(x, -30, -108, 60, 26, '#8a8aa8', { b: 4 })
  for (let i = 0; i < 4; i++) { R(x, '#c9c2b0', -30, -54 + i * 36, 70, 8); R(x, INK, -50, -60 + i * 36, 16, 16); if (i < ticks) R(x, B.color, -47, -57 + i * 36, 10, 10) }
  x.restore()
}
const CHAT = [
  { from: '♌ LEO', text: 'where are we eating??', at: -1, col: '#c45a12' },
  { from: '♎ LIBRA', text: 'i’m fine with anything', at: -1, col: '#a0309a' },
  { from: '♈ ARIES', text: 'ANYWHERE. NOW.', at: -1, col: '#c0402a' },
  { from: '♍ VIRGO', text: 'not too far pls', at: 2.9, col: '#b8306a' },
  { from: '♎ LIBRA', text: 'actually maybe not pizza', at: 3.5, col: '#a0309a' },
  { from: '♐ SAG', text: 'what about that place we went that one time', at: 4.1, col: '#6a30b0' },
  { from: '♉ TAURUS', text: 'i just want noodles', at: 4.8, col: '#a07a20' },
  { from: '♌ LEO', text: '…so???', at: 5.4, col: '#c45a12' },
  { from: 'me', text: '7pm. the noodle place. i booked.', at: 7.1 },
  { from: '♉ TAURUS', text: 'yes. thank you.', at: 8.4, col: '#a07a20' },
  { from: '♈ ARIES', text: 'LEGEND', at: 8.6, col: '#c0402a' },
  { from: '♎ LIBRA', text: 'see you at 7 ♡', at: 8.8, col: '#a0309a' },
]
function opening(x, t) {
  swapBolt(x, t, -0.25, { x1: 380, y1: 200, x2: 360, y2: 1000, colA: A.color, colB: B.color, dur: 1.1 })
  const k = clamp(0.5 + t / 0.6 * 0.5)
  shadow(x, 360, 1190, 280)
  const r = swapper(x, t, 360, 960, 320, FROM, TO, k, { mood: t < 0.6 ? 'sleepy' : 'wide', look: [1, 0], zzz: false, hops: [1.9] })
  clipboard(x, 520, 1010, pop01(t, -0.2, 0.4) * 1.1, 0.15)
  // the exploding phone
  const shk = Math.sin(t * 60) * 6
  phone(x, t, { cx: 780 + shk, cy: 760, w: 380, h: 560, rot: 0.12, title: 'dinner??', clock: '6:40 PM', lines: CHAT.slice(0, 3), size: 26, unread: '47', glow: 1, accent: B.color })
  swapTag(x, t, 540, 1340, FROM, TO, 1.9, { out: 2.4 })
  void r
}
function chatShot(x, t) {
  phone(x, t, { cx: 540, cy: 1080, w: 700, h: 1000, title: 'dinner??', clock: t < 6.2 ? '7:38 PM' : '7:41 PM', lines: CHAT.filter(l => t >= l.at), size: 34, unread: t < 6.2 ? String(47 + Math.floor((t - 2.4) * 3)) : null, accent: B.color })
}
function planShot(x, t, S) {
  const typed = t > 6.8
  shadow(x, 330, 1190, 260)
  swapper(x, t, 330, 960, 300, FROM, TO, 1, { mood: t < 7.2 ? 'squint' : t < 8.3 ? 'neutral' : 'happy', look: [1, -0.3], hops: [6.9, 7.2, 8.4] })
  clipboard(x, 160, 1040, 1.0, -0.15, Math.min(4, Math.floor((t - 6.3) * 3)))
  phone(x, t, { cx: 760, cy: 900, w: 460, h: 820, title: 'dinner??', clock: '7:41 PM', lines: CHAT.slice(4).filter(l => t >= l.at), size: 30, accent: B.color, typing: typed ? null : [6.3, 6.8] })
  // the silence: crickets
  if (t > 7.4 && t < 8.3) { label(x, '…', 760, 1380, { size: 90, col: BONE }); label(x, '*crickets*', 760, 1460, { size: 30, col: '#b8b0d8' }) }
  if (t > 8.4) sparkles(x, t, 760, 1100, 8.4, 10, 160, 2)
  void S
}
function pisShot(x, t) {
  box(x, 140, 1080, 800, 110, '#7a5ad8', { b: 6, hi: 'rgba(255,255,255,0.2)' }); box(x, 160, 1000, 200, 80, '#f4ecdc', { b: 5 })
  shadow(x, 540, 1195, 300)
  star(x, t, 540, 930, 330, 'pisces', { mood: 'sparkle', look: [0.4, 0.5], tears: 3, hops: [9.6, 10.2, 10.8, 11.4] })
  phone(x, t, { cx: 820, cy: 1290, w: 260, h: 380, rot: -0.2, title: 'dinner??', clock: '7:41', lines: [{ from: 'me', text: '7pm. booked.', at: -1 }], size: 22, accent: B.color })
  bubble(x, t, 540, 620, 9.7, 14.2, 'someone DECIDED', { size: 50, col: '#d9d4ff', tail: 0 })
  hearts(x, t, 10.0, 540, 820, { n: 6, col: '#8fe3ff' })
}

const EP = makeSwap({
  duration: 14, ending: 'cut',
  hook: { text: 'Gemini woke up *organised.*', out: [2.2, 2.4], top: 230 },
  caps: [
    { at: 2.5, out: [6.0, 6.2], text: '“Where are we *eating?*”', top: 200, size: 86 },
    { at: 7.4, out: [9.2, 9.4], text: 'The chat: *silent.*', top: 230 },
  ],
  shots: [
    { at: 0, room: 'sofa', cam: [1.0, 540, 960], push: 0.05, draw: opening },
    { at: 2.4, room: 'sofa', cam: [1.0, 540, 960], push: 0.04, draw: chatShot },
    { at: 6.2, room: 'office', cam: [1.05, 540, 980], push: 0.05, draw: planShot },
    { at: 9.4, room: 'bed', cam: [1.1, 540, 960], push: 0.06, draw: pisShot },
  ],
  fx: [
    { kind: 'whip', at: -0.2, from: 1.45 },
    { kind: 'shake', at: 0.0, len: 0.5, amp: 22 },
    { kind: 'rec', at: 0.6, len: 1.2, caption: 'the group chat. *hour one.*', top: 1520 },
    { kind: 'shake', at: 7.12, len: 0.3, amp: 12 },
  ],
  flash: [{ at: 1.85, col: B.color, a: 0.4 }],
  punch: [{ at: 9.6, dur: 1.5, z: 0.14, x: 540, y: 880 }],
  last: { at: 12.2, text: 'Someone *finally* picked.', top: 290 },
  cues: [
    ['glitter', 0.0, 0.5], ['pop', 1.9, 1174.66, 0.05, 0],
    ...CHAT.filter(l => l.at > 2).map(l => ['pop', r3(l.at), l.from === 'me' ? 1046.5 : 783.99, 0.035, l.from === 'me' ? 0.3 : -0.3]),
    ...[6.35, 6.5, 6.65].map(t => ['tick', t, 0.03]), ['tom', 7.12, 90, { gain: 0.2, decay: 0.2 }],
    ['tick', 7.6, 0.02], ['tick', 7.85, 0.02], ['tick', 8.1, 0.02], ['glitter', 8.4, 9.0],
    ['pluck', 9.75, 659.25, 0.035, 0.5, 0.3], ['pluck', 9.9, 587.33, 0.035, 0.5, 0.3], ['pluck', 10.5, 523.25, 0.03, 0.5, -0.3],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
