// kswe01 · SIGN SWAP · "Aries Woke Up Patient" (16 s vertical, Month 2 boost m11 #1, chiptune · C, hard cut)
//   0.0   frame 0: the bedroom, Aries mid-lunge at a phone that says "typing…", the swap bolt mid-strike, Aries already
//         half Taurus-green. Hook "Aries woke up *patient.*"  0.45 record-scratch freeze · 0.85 whip zoom · SWAP tag.
//   2.6   the phone: "had fun today!" sent 2:14 PM… it's 4:20 PM. "No reply. *2 hours.*" Old-Aries drafts pop up
//         ("hello??", "u there", "HELLO") and each gets a red X.
//   6.4   the kitchen: Taurus-Aries puts the phone face down and stirs a pot of soup: "we don't chase. we *simmer.*"
//         ♓ Pisces (the roommate) peeks in.
//   10.2  BZZT: "sorry! was at work. dinner tonight?" Aries sparkles; Pisces cries happy tears into the soup.
//   14.6  last line "Waiting *can* be calm." holds, hard cut at 16.0.
import { makeSwap } from './swapfilm.js'
import { star, swapper, swapBolt, swapTag, phone, bubble, label, sticker, bed, mug, shadow, hearts, sparkles, R, box, INK, GOLD, PINK, RED, BONE, SIGN, pop01, outK, prog, ease, clamp, lerp, r3 } from './swapkit.js'

const FROM = 'aries', TO = 'taurus'
const A = SIGN(FROM), B = SIGN(TO)
const morph = t => clamp(0.45 + t / 0.6 * 0.55)          // frame 0 is mid-swap

// ── shot painters
function bedroom(x, t) {
  bed(x, 540, 1180, { col: '#c8504a', k: 0.6 + 0.1 * Math.sin(t * 3) })
  // the phone on the bed, "typing…"
  x.save(); x.translate(760, 1080); x.rotate(-0.2)
  box(x, -60, -100, 120, 200, '#1a1430', { b: 6 }); R(x, '#f6f2ea', -50, -90, 100, 180)
  for (let i = 0; i < 3; i++) R(x, '#6a6488', -32 + i * 26, -6 + Math.sin(t * 12 - i) * 6, 14, 14)
  x.restore()
  swapBolt(x, t, -0.25, { x1: 460, y1: 180, x2: 420, y2: 1000, colA: A.color, colB: B.color, dur: 1.1 })
  const k = morph(t)
  shadow(x, 420, 1190, 300)
  swapper(x, t, 420 + Math.sin(t * 40) * 4 * (1 - k), 930, 330, FROM, TO, k, { mood: t < 1.8 ? 'wide' : 'squint', look: [1, 0.4], squash: -0.12 * (1 - k), hops: [1.4] })
  swapTag(x, t, 540, 1330, FROM, TO, 1.85, { out: 2.6 })
}
const SENT = [{ from: 'me', text: 'had fun today!', at: -1 }]
const DRAFTS = [['hello??', 3.9, 260, 760], ['u there', 4.5, 820, 900], ['HELLO', 5.1, 300, 1440]]
function phoneShot(x, t, S) {
  phone(x, t, { cx: 540, cy: 1000, w: 520, h: 640, title: 'my crush ♡', clock: t < 3.2 ? '2:14 PM' : '4:20 PM', lines: SENT, accent: '#e9604a', size: 36, rot: -0.02 })
  // the clock jumps 2 hours
  if (t > 3.1 && t < 3.6) sparkles(x, t, 340, 600, 3.15, 8, 90, 1)
  // old-Aries drafts pop up, then get a red X each
  for (const [txt, at, dx, dy] of DRAFTS) {
    const k = pop01(t, at, 0.22, 2.6)
    if (k <= 0.01) continue
    bubble(x, t, dx, dy, at, 99, txt, { col: '#ffd6cc', size: 44, k, tail: 0.4, rot: (dx > 540 ? 0.06 : -0.06) })
    const xk = ease.outCubic(prog(t, at + 0.3, at + 0.45))
    if (xk > 0) {
      x.save(); x.translate(dx, dy); x.lineCap = 'square'
      for (const [w, c] of [[22, INK], [12, RED]]) { x.strokeStyle = c; x.lineWidth = w; x.beginPath(); x.moveTo(-90 * xk, -40 * xk); x.lineTo(90 * xk, 40 * xk); x.moveTo(90 * xk, -40 * xk); x.lineTo(-90 * xk, 40 * xk); x.stroke() }
      x.restore()
    }
  }
  // the swapped thumb hovering (Taurus-green) at the bottom
  const k = pop01(t, S.shot.at + 0.2, 0.3)
  swapper(x, t, 870, 1640, 220, FROM, TO, 1, { pop: k, mood: t < 5.4 ? 'squint' : 'happy', look: [-1, -1], soul: true })
}
function stove(x, t, steam) {
  box(x, 120, 860, 520, 330, '#5a5a6e', { b: 6 }); R(x, INK, 150, 890, 460, 10)
  for (const kx of [240, 500]) { R(x, INK, kx - 50, 875, 100, 14); R(x, '#ff7a3a', kx - 40, 878, 80, 6) }
  // the pot
  box(x, 160, 720, 200, 150, '#8a8aa8', { b: 6, hi: 'rgba(255,255,255,0.25)' }); R(x, INK, 140, 720, 240, 14)
  R(x, '#e9b24a', 172, 734, 176, 18)
  for (let i = 0; i < 4; i++) { const p = (t * 0.7 + i / 4) % 1; x.save(); x.globalAlpha = steam * 0.55 * (1 - p); R(x, '#ffffff', 190 + i * 40 + Math.sin(t * 3 + i) * 10, 690 - p * 220, 14, 30); x.restore() }
}
function kitchen(x, t, S) {
  const reply = t >= 10.2
  stove(x, t, 1)
  // the counter with the phone face down
  box(x, 660, 1000, 380, 190, '#8a6a4a', { b: 6 })
  const lift = reply ? ease.outCubic(prog(t, 10.2, 10.45)) : 0
  const buzz = reply && t < 10.9 ? Math.sin(t * 80) * 6 : 0
  x.save(); x.translate(850 + buzz, 985 - lift * 10); x.rotate(0.05)
  box(x, -90, -16, 180, 30, reply ? '#ffd98a' : '#1a1430', { b: 5 }); x.restore()
  if (reply && t < 10.8) sparkles(x, t, 850, 960, 10.2, 8, 80, 2, [GOLD, BONE])
  // Taurus-Aries stirs the soup (spoon), calm
  const stir = Math.sin(t * 4) * 18
  R(x, INK, 260 + stir - 6, 600, 12, 140); R(x, '#c99a4a', 260 + stir - 3, 603, 6, 134)
  shadow(x, 470, 1195, 260)
  swapper(x, t, 470, 960, 300, FROM, TO, 1, { mood: reply ? 'sparkle' : t > 7.2 ? 'happy' : 'neutral', look: reply ? [1, 0.2] : [-1, -0.2], hops: reply ? [10.25, 10.6] : [6.6, 7.3, 7.8] })
  bubble(x, t, 520, 640, 7.0, 9.9, 'we don’t chase.\nwe *simmer.*'.replace(/\*/g, ''), { size: 44, tail: -0.1 })
  // Pisces the roommate peeks in from the right, then cries into the soup
  const pk = ease.outCubic(prog(t, 8.2, 8.7))
  const px = lerp(1220, 900, pk)
  if (t > 8.1) star(x, t, reply ? lerp(900, 330, ease.inOutCubic(prog(t, 11.2, 11.9))) : px, reply ? lerp(1010, 640, ease.inOutCubic(prog(t, 11.2, 11.9))) : 1010, 250, 'pisces', { mood: reply ? 'sparkle' : 'wide', look: [-1, 0], tears: reply ? 3 : 1, hops: [8.7, 11.25, 12.4, 13.0] })
  if (reply) hearts(x, t, 10.5, 470, 760, { n: 6 })
  if (t > 12.0) bubble(x, t, 640, 1330, 12.1, 16.2, 'this is so HEALTHY', { size: 40, col: '#d9d4ff', tail: -0.6 })
}

function overlay(x, t) {
  sticker(x, t, '2 HOURS LATER', 330, 1560, 3.15, 6.3, { col: GOLD, size: 36, rot: -0.06 })
}

const EP = makeSwap({
  duration: 16, ending: 'cut',
  hook: { text: 'Aries woke up *patient.*', out: [2.4, 2.6], top: 230 },
  caps: [
    { at: 2.7, out: [6.1, 6.3], text: 'No reply. *2 hours.*', top: 230 },
    { at: 6.5, out: [9.9, 10.1], text: 'Phone *face down.*', top: 230 },
  ],
  shots: [
    { at: 0, room: 'bed', cam: [1.0, 540, 960], push: 0.05, draw: bedroom },
    { at: 2.6, room: 'sofa', cam: [1.0, 540, 960], push: 0.04, draw: phoneShot },
    { at: 6.4, room: 'kitchen', cam: [1.42, 540, 870], push: 0.05, draw: kitchen },
  ],
  fx: [
    { kind: 'whip', at: -0.2, from: 1.45 },
    { kind: 'shake', at: 0.0, len: 0.45, amp: 22 },
    { kind: 'rec', at: 0.55, len: 1.25, caption: 'yep. *still Aries inside.*', top: 1520 },
    { kind: 'notify', at: 10.2, out: [14.3, 14.55], title: 'texts', body: 'my crush: sorry! was at work. *dinner tonight?*', glyph: '♡', color: '#e9604a', y: 130 },
    { kind: 'shake', at: 10.25, len: 0.45, amp: 14 },
  ],
  flash: [{ at: 1.8, col: B.color, a: 0.45 }],
  punch: [{ at: 10.3, dur: 1.3, z: 0.12, x: 640, y: 950 }],
  overlay,
  last: { at: 14.6, text: 'Waiting *can* be calm.', top: 300 },
  cues: [
    ['glitter', 0.0, 0.5], ['riser', 1.4, 1.8, 0.04], ['pop', 1.85, 1174.66, 0.05, 0],
    ['tick', 3.15, 0.06], ['pop', 3.2, 880, 0.03, 0],
    ...DRAFTS.flatMap(([, at]) => [['pop', r3(at), 659.25, 0.04, 0], ['tick', r3(at + 0.32), 0.07]]),
    ['tick', 6.6, 0.05], ['pluck', 7.05, 523.25, 0.03, 0.5, 0], ['pop', 8.3, 783.99, 0.03, 0.4],
    ['tick', 10.2, 0.08], ['tick', 10.26, 0.06], ['tick', 10.32, 0.06], ['bell', 10.25, 1318.51, 0.05, 1.4, 0], ['glitter', 10.3, 11.0],
    ['pop', 12.1, 1046.5, 0.035, -0.3],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
