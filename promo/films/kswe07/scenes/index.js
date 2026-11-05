// kswe07 · SIGN SWAP · "Libra Woke Up Decisive" (15 s vertical, Month 2 boost m11 #7, house · G, hard cut)
//   0.0   frame 0: the café, Libra mid-coin-flip, the coin frozen mid-air, the swap bolt mid-strike, half Aries-red.
//         Hook "Libra woke up *decisive.*"  0.5 record-scratch freeze: "the coin never *landed.*"
//   2.4   the menu: a speedrun HUD, "LIBRA · ORDERING · ANY%", picked in a blink. "Ordered in *one second.*"
//   5.4   the phone: "dinner friday?" sent to the crush, instantly. "Then texted *first.*" Then the terror stare.
//   9.4   "YES!! 7pm?" drops in. Aries-Libra jumps; ♓ Pisces (the friend across the table) cries into the menu.
//   13.0  last line "Asked first. *Lived.*" holds, hard cut at 15.0.
import { makeSwap } from '../../kswe01/scenes/swapfilm.js'
import { star, swapper, swapBolt, swapTag, phone, bubble, sticker, shadow, hearts, sparkles, table, mug, label, R, box, INK, GOLD, PINK, RED, BONE, SIGN, pop01, outK, prog, ease, clamp, lerp, r3 } from '../../kswe01/scenes/swapkit.js'

const FROM = 'libra', TO = 'aries'
const A = SIGN(FROM), B = SIGN(TO)

function coin(x, cx, cy, spin) {
  const w = Math.abs(Math.cos(spin)) * 70 + 8
  x.fillStyle = INK; x.beginPath(); x.ellipse(cx, cy, w + 6, 76, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; x.beginPath(); x.ellipse(cx, cy, w, 70, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#ffe9a8'; x.beginPath(); x.ellipse(cx - w * 0.2, cy - 20, w * 0.3, 20, 0, 0, Math.PI * 2); x.fill()
}
function menuCard(x, cx, cy, s = 1, rot = 0, pick = -1) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  box(x, -150, -200, 300, 400, '#7a2a3a', { b: 6 }); R(x, '#f4ecdc', -130, -180, 260, 360)
  label(x, 'MENU', 0, -140, { size: 40, col: '#7a2a3a', font: 'Inter', weight: 800 })
  ;['noodles', 'soup', 'dumplings', 'salad', 'pie'].forEach((n, i) => {
    if (i === pick) R(x, B.color, -116, -102 + i * 56, 232, 46)
    x.font = "700 30px 'Space Mono'"; x.fillStyle = i === pick ? '#fff' : INK; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(n, -100, -78 + i * 56)
  })
  x.restore()
}
function opening(x, t) {
  table(x, 540, 1130, 620)
  swapBolt(x, t, -0.25, { x1: 380, y1: 160, x2: 360, y2: 900, colA: A.color, colB: B.color, dur: 1.1 })
  const k = clamp(0.45 + t / 0.6 * 0.55)
  shadow(x, 360, 1195, 280)
  swapper(x, t, 360, 960, 320, FROM, TO, k, { mood: t < 0.5 ? 'squint' : 'wide', look: [1, -1], hops: [1.9] })
  // the coin: frozen mid-air, then it just… drops, ignored
  const drop = ease.inQuad(prog(t, 1.75, 2.2))
  coin(x, 640, lerp(640, 1100, drop), t * 14)
  swapTag(x, t, 540, 1360, FROM, TO, 1.9, { out: 2.4 })
}
function menuShot(x, t) {
  table(x, 540, 1130, 620)
  menuCard(x, 700, 900, 1.15, 0.06, t > 3.5 ? 0 : -1)
  shadow(x, 330, 1195, 260)
  swapper(x, t, 330, 960, 300, FROM, TO, 1, { mood: t < 3.5 ? 'squint' : 'happy', look: [1, -0.3], hops: [3.5] })
  if (t > 3.5) { sparkles(x, t, 700, 790, 3.5, 10, 140, 1); sticker(x, t, 'DONE.', 700, 1120, 3.55, 5.3, { col: B.color, ink: '#fff', size: 54, rot: -0.1 }) }
}
function phoneShot(x, t) {
  table(x, 540, 1130, 620)
  mug(x, 760, 1130, '#e9b24a', 1, 1, t)
  const terror = t > 6.6 && t < 9.4
  shadow(x, 360, 1195, 270)
  swapper(x, t, 360 + (terror ? Math.sin(t * 50) * 4 : 0), 960, 300, FROM, TO, 1, { mood: t < 6.4 ? 'squint' : terror ? 'wide' : 'sparkle', look: [1, 0.6], blink: terror ? false : undefined, hops: [6.3, 9.45, 9.8, 10.2] })
  phone(x, t, { cx: 700, cy: 820, w: 380, h: 520, rot: 0.06, title: 'crush ♡', clock: '1:12 PM', lines: [{ from: 'me', text: 'dinner friday?', at: 6.3 }, ...(t > 9.4 ? [{ from: 'them', text: 'YES!! 7pm?', at: 9.4 }] : [])], size: 32, accent: B.color, typing: [8.3, 9.4] })
  if (terror) sticker(x, t, '4 SECONDS LATER', 540, 1430, 7.2, 9.3, { col: GOLD, size: 40, rot: 0.04 })
  // Pisces across the table, menu up, crying
  if (t > 9.6) {
    const pk = ease.outCubic(prog(t, 9.6, 10.1))
    star(x, t, 760, lerp(1900, 1470, pk), 280, 'pisces', { mood: 'sparkle', look: [-0.6, -0.6], tears: 3, hops: [10.2, 10.8, 11.4, 12.0] })
    menuCard(x, 780, lerp(2100, 1670, pk), 0.6, -0.1)
    hearts(x, t, 9.6, 360, 780, { n: 6 })
  }
}

const EP = makeSwap({
  duration: 15, ending: 'cut',
  hook: { text: 'Libra woke up *decisive.*', out: [2.2, 2.4], top: 220 },
  caps: [
    { at: 2.5, out: [5.2, 5.4], text: 'Ordered in *one second.*', top: 1480 },
    { at: 5.5, out: [9.2, 9.4], text: 'Then texted *first.*', top: 230 },
  ],
  shots: [
    { at: 0, room: 'cafe', cam: [1.12, 540, 1000], push: 0.05, draw: opening },
    { at: 2.4, room: 'cafe', cam: [1.12, 540, 1000], push: 0.04, draw: menuShot },
    { at: 5.4, room: 'cafe', cam: [1.12, 540, 1020], push: 0.05, draw: phoneShot },
  ],
  fx: [
    { kind: 'whip', at: -0.2, from: 1.45 },
    { kind: 'rec', at: 0.5, len: 1.2, caption: 'the coin never *landed.*', top: 1540 },
    { kind: 'hud', at: 2.6, out: [5.1, 5.3], title: 'LIBRA · ORDERING · ANY%', splits: [{ at: 3.0, name: 'open menu' }, { at: 3.5, name: 'pick' }] },
    { kind: 'shake', at: 6.35, len: 0.3, amp: 12 },
    { kind: 'notify', at: 9.4, out: [12.8, 13.0], title: 'texts', body: 'crush: YES!! *7pm?*', glyph: '♡', color: B.color, y: 140 },
    { kind: 'shake', at: 9.45, len: 0.45, amp: 20 },
  ],
  flash: [{ at: 1.85, col: B.color, a: 0.4 }],
  punch: [{ at: 7.2, dur: 2.0, z: 0.08, x: 480, y: 940 }],
  last: { at: 13.0, text: 'Asked first. *Lived.*', top: 300 },
  cues: [
    ['glitter', 0.0, 0.5], ['pop', 1.9, 1174.66, 0.05, 0], ['tick', 2.2, 0.06], ['tick', 2.26, 0.04],
    ['bell', 3.52, 1567.98, 0.04, 1.0, 0], ['tom', 3.56, 100, { gain: 0.2, decay: 0.15 }],
    ['pop', 6.3, 1046.5, 0.045, 0.3], ...[7.3, 7.8, 8.3, 8.8].map(t => ['tick', t, 0.04]),
    ['glitter', 9.5, 10.2], ['pluck', 10.2, 659.25, 0.035, 0.5, 0.3], ['pluck', 10.35, 587.33, 0.035, 0.5, 0.3],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
