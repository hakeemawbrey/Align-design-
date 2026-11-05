// kbhe07: BRAIN VS HEART, Ep 7 "'Where Do You Wanna Eat?'" (12.6 s vertical, star_talk post, music: house · D). LOOPS.
// Inside ♎ Libra's head. The window: the chat ("where do you wanna eat?") with a giant decision wheel spinning over it.
//   0.00   frame 0: mid whip zoom; the wheel is a blur, Brain and Heart mid-spin on the console. Title
//          "'Where do you wanna eat?' | *Libra:*"
//   1.20   the wheel stops on… YOU PICK.  1.40 Brain unrolls a pros-and-cons list to the floor.
//   1.50   BRAIN: "pros: noodles. cons: *also* noodles."   3.10 HEART: "whatever makes *THEM* happy!"
//   4.40   loading bar "deciding…" stalls at 99 % → "Error: everything sounds nice".  6.90 shake: both shout at once:
//   7.00   BRAIN + HEART: "THE *NOODLE* PLACE."  8.00 Libra types it, sends (8.6).  9.40 reply + notification:
//          "perfect. and dessert?"  10.0 both freeze, eyes wide.  10.40 the wheel drops back in and spins; they spin
//          again; 12.1–12.6 loop-back to frame 0.
// Pisces cam: sniffles through the spin, happy tears at the decision. Pure f(t).
import { whipZoom, whipZoomCues, slamTitle, slamTitleCues, screenShake, shakeCues, loadingBar, loadingBarCues, notification, notificationCues, loopBack, loopCues } from '../../hookkit.js'
import { makeBuild, drawChat, bubbleCues, key, stepObj, clamp, lerp, prog, ease, pop01, sparkles, R, INK, BONE, GOLD, INTER } from '../../kbhe01/bhkit.js'

export const DURATION = 12.6
const SIGN = 'libra'
const WHIP = { at: -0.24, len: 0.5, from: 2.4, cy: 1250 }
const HOOK = { at: -1, text: "'Where do you wanna eat?' | *Libra:*", top: 168, size: 92 }
const SHAKE = { at: 0.3, len: 0.4, amp: 16 }
const LOAD = { at: 4.4, len: 2.4, label: 'deciding…', stallAt: 99, error: 'Error: everything sounds nice', y: 760 }
const SHOUT = { at: 6.95, len: 0.5, amp: 30 }
const NOTIF = { at: 9.4, out: [11.4, 11.7], title: 'texts', body: 'Kit: perfect. and *dessert?*', glyph: '♉', time: 'now', y: 110 }
const T = { stop: 1.2, scroll: [1.4, 2.0], shout: 7.0, type: 8.0, sent: 8.6, reply: 9.4, freeze: 10.0, wheel2: 10.4 }
const BOTH = { bg: '#fff1c8', fg: INK, acc: '#d0306a', tag: 'BRAIN + HEART' }
const BUB = [
  { t0: 1.5, t1: 2.95, who: 'brain', x: 400, y: 1195, tail: -140, text: 'pros: noodles. cons: *also* noodles.', size: 42, maxW: 560 },
  { t0: 3.1, t1: 4.3, who: 'heart', x: 690, y: 1195, tail: 130, text: 'whatever makes *THEM* happy!', size: 44, maxW: 520 },
  { t0: T.shout, t1: 7.95, who: BOTH, x: 540, y: 1205, tail: 0, text: 'THE *NOODLE* PLACE.', size: 58, shake: 4 },
]
const MSGS = [{ at: -3, side: 'L', text: 'where do you wanna eat?' }, { at: T.sent, side: 'R', text: 'the noodle place!', status: 'Delivered' }, { at: T.reply, side: 'L', text: 'perfect. and dessert?' }]
const SEGS = [['NOODLES', '#ff8a5a'], ['TACOS', '#ffd23a'], ['YOU PICK', '#c9a6ff'], ['PIZZA', '#ff5c7a'], ['SALAD', '#5fd38a'], ['SOUP', '#7fd0ff']]

// wheel angle: segment k is under the top pointer when angle = -(k + 0.5)·step
const STEP = Math.PI * 2 / SEGS.length
function wheelAngle(t) {
  if (t < T.stop) return -(2.5 * STEP) - 9 * Math.pow(1 - t / T.stop, 2) * 6
  if (t < T.wheel2) return -(2.5 * STEP)
  return -(2.5 * STEP) - 22 * Math.pow(prog(t, T.wheel2, DURATION + 1.2), 2) * 6
}
function wheel(x, t, cx, cy, Rr, alpha) {
  if (alpha <= 0.01) return
  x.save(); x.globalAlpha = alpha
  x.fillStyle = 'rgba(8,4,20,0.55)'; x.fillRect(70, 470, 940, 560)
  const a0 = wheelAngle(t)
  x.fillStyle = INK; x.beginPath(); x.arc(cx, cy, Rr + 14, 0, 7); x.fill()
  SEGS.forEach(([lbl, col], i) => {
    const a = a0 + i * STEP - Math.PI / 2
    x.fillStyle = col; x.beginPath(); x.moveTo(cx, cy); x.arc(cx, cy, Rr, a, a + STEP); x.closePath(); x.fill()
    x.strokeStyle = INK; x.lineWidth = 5; x.stroke()
    x.save(); x.translate(cx, cy); x.rotate(a + STEP / 2); x.fillStyle = INK; x.font = `800 28px ${INTER}`; x.textAlign = 'right'; x.textBaseline = 'middle'; x.fillText(lbl, Rr - 18, 0); x.restore()
  })
  x.fillStyle = INK; x.beginPath(); x.arc(cx, cy, 30, 0, 7); x.fill(); x.fillStyle = GOLD; x.beginPath(); x.arc(cx, cy, 20, 0, 7); x.fill()
  x.fillStyle = INK; x.beginPath(); x.moveTo(cx - 26, cy - Rr - 34); x.lineTo(cx + 26, cy - Rr - 34); x.lineTo(cx, cy - Rr + 8); x.closePath(); x.fill()
  x.fillStyle = '#ff3b5c'; x.beginPath(); x.moveTo(cx - 17, cy - Rr - 28); x.lineTo(cx + 17, cy - Rr - 28); x.lineTo(cx, cy - Rr - 2); x.closePath(); x.fill()
  x.restore()
}

function brainP(t) {
  const P = stepObj(t, [
    [0, { mood: 'dizzy', mouth: 'wobble', arms: [2.4, 2.4], look: [0, 0] }],
    [T.stop + 0.1, { mood: 'wide', mouth: 'o', arms: [0.4, 0.4], look: [0.5, -1] }],
    [T.scroll[0], { mood: 'neutral', mouth: 'open', arms: [1.4, 1.4], look: [0, 1] }],
    [3.1, { mood: 'sad', mouth: 'frown', arms: [1.4, 1.4], look: [1, 0] }],
    [4.4, { mood: 'shut', mouth: 'wobble', arms: [0.4, 0.4] }],
    [T.shout, { mood: 'angry', mouth: 'scream', arms: [2.8, 2.8], look: [0, 0] }],
    [8.0, { mood: 'happy', mouth: 'smile', arms: [0.4, 0.4], look: [0.5, -1] }],
    [T.freeze, { mood: 'wide', mouth: 'o', arms: [2.9, 2.9], look: [0.5, -1] }],
    [T.wheel2 + 0.3, { mood: 'dizzy', mouth: 'wobble', arms: [2.4, 2.4], look: [0, 0] }],
  ])
  const spin = t < T.stop + 0.1 ? Math.sin(t * 10) * 0.6 : t > T.wheel2 + 0.3 ? Math.sin(t * 10) * 0.6 * prog(t, T.wheel2 + 0.3, T.wheel2 + 1) : 0
  const xx = key(t, [[6.6, 250], [T.shout, 360, ease.outBack], [8.0, 360], [8.4, 250]])
  return { ...P, x: xx, y: 1440, rot: spin, hops: [T.stop + 0.1, 1.5, T.shout, T.freeze] }
}
function heartP(t) {
  const P = stepObj(t, [
    [0, { mood: 'dizzy', mouth: 'grin', arms: [2.4, 2.4], look: [0, 0] }],
    [T.stop + 0.1, { mood: 'wide', mouth: 'o', arms: [0.4, 0.4], look: [-0.5, -1] }],
    [3.1, { mood: 'love', mouth: 'grin', arms: [2.6, 2.6], look: [-1, 0] }],
    [4.4, { mood: 'shut', mouth: 'wobble', arms: [0.4, 0.4] }],
    [T.shout, { mood: 'angry', mouth: 'scream', arms: [2.8, 2.8], look: [0, 0] }],
    [8.0, { mood: 'love', mouth: 'grin', arms: [0.6, 0.6], look: [-0.5, -1] }],
    [T.freeze, { mood: 'wide', mouth: 'o', arms: [2.9, 2.9], look: [-0.5, -1] }],
    [T.wheel2 + 0.3, { mood: 'dizzy', mouth: 'grin', arms: [2.4, 2.4], look: [0, 0] }],
  ])
  const spin = t < T.stop + 0.1 ? -Math.sin(t * 10 + 1) * 0.6 : t > T.wheel2 + 0.3 ? -Math.sin(t * 10 + 1) * 0.6 * prog(t, T.wheel2 + 0.3, T.wheel2 + 1) : 0
  const xx = key(t, [[6.6, 830], [T.shout, 720, ease.outBack], [8.0, 720], [8.4, 830]])
  return { ...P, x: xx, y: 1440, rot: spin, hops: [T.stop + 0.1, 3.1, 3.5, T.shout, T.freeze] }
}

const build = makeBuild({
  sign: SIGN, blinks: [],
  view: (x, t, Rw) => {
    drawChat(x, t, Rw, { title: 'Kit', sub: 'online', msgs: MSGS, avatar: '#e9b24a', draft: [{ t: T.type, type: 'type', text: 'the noodle place!', cps: 30 }, { t: T.sent, type: 'clear' }], sendFlash: [T.sent] })
    const wa = t < T.stop + 0.9 ? 1 - prog(t, T.stop + 0.6, T.stop + 0.9) : pop01(t, T.wheel2, 0.35, 2)
    wheel(x, t, 540, Rw.y + 300, 220, clamp(wa))
    if (t > T.stop && t < T.stop + 0.9) { const k = pop01(t, T.stop, 0.3, 2.6); x.save(); x.translate(540, Rw.y + 300); x.scale(k, k); x.fillStyle = INK; x.fillRect(-170, -40, 340, 80); x.fillStyle = '#c9a6ff'; x.fillRect(-164, -34, 328, 68); x.fillStyle = INK; x.font = `800 44px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('YOU PICK.', 0, 2); x.restore() }
  },
  desk: t => ({ button: { label: 'SEND', press: [T.sent], glow: 0.4, col: '#5fd38a' }, score: { b: [[0, 0], [T.shout + 0.3, 1]], h: [[0, 0], [T.shout + 0.3, 1]] }, cam: { tears: [[0, 1], [T.shout, 3]], mood: [[0, 'wide'], [T.shout, 'happy'], [T.freeze, 'wide']], look: [0, -1] } }),
  brain: brainP, heart: heartP,
  alarm: t => (t > 4.4 && t < 6.9 ? 0.35 : 0),
  front: (x, t, B) => {
    // the pros-and-cons scroll unrolling from Brain's hands to the floor
    if (B && t > T.scroll[0] && t < 4.6) {
      const u = ease.outCubic(prog(t, ...T.scroll)) * (1 - prog(t, 4.3, 4.6))
      const hx = (B.hl.x + B.hr.x) / 2, hy = Math.min(B.hl.y, B.hr.y)
      const len = 30 + 360 * u
      R(x, INK, hx - 66, hy - 10, 132, len + 20); R(x, '#fffbea', hx - 60, hy - 4, 120, len + 8)
      x.fillStyle = INK; x.font = `700 18px ${INTER}`; x.textAlign = 'left'
      const rows = ['PROS', '+ noodles', '+ cosy', '+ close by', 'CONS', '- noodles?', '- or tacos', '- or…']
      rows.forEach((r, i) => { if (16 + i * 24 < len) { x.fillStyle = i % 4 === 0 ? '#d0306a' : INK; x.fillText(r, hx - 50, hy + 22 + i * 24) } })
      R(x, INK, hx - 72, hy + len - 6, 144, 22); R(x, '#e2cfa6', hx - 66, hy + len, 132, 12)
    }
    sparkles(x, t, 540, 1150, T.shout, 14, 230, 1, [GOLD, BONE, '#ff8a5a'])
  },
  bubbles: BUB,
})

export const SCENES = [build, whipZoom(WHIP), screenShake(SHAKE), screenShake(SHOUT), slamTitle(HOOK), loadingBar(LOAD), notification(NOTIF), loopBack([build, whipZoom(WHIP), slamTitle(HOOK)], { duration: DURATION, len: 0.5 })]
export const CUES = [
  ...whipZoomCues(WHIP), ...shakeCues(SHAKE), ...slamTitleCues(HOOK),
  ...Array.from({ length: 10 }, (_, i) => ['tick', +(i * 0.12 * (1 + i * 0.08)).toFixed(2), 0.04]),
  ['bell', T.stop, 1174.66, 0.04, 0.8, 0], ['pop', T.stop + 0.05, 880, 0.05, 0],
  ['whoosh', T.scroll[0], 0.5, 0.04], ...loadingBarCues(LOAD),
  ...shakeCues(SHOUT), ['glitter', T.shout, T.shout + 0.5],
  ...Array.from({ length: 10 }, (_, i) => ['tick', +(T.type + i * 0.06).toFixed(2), 0.02]), ['pop', T.sent, 1174.66, 0.05, 0.2],
  ...notificationCues(NOTIF), ['pluck', T.freeze, 587.33, 0.05, 0.5, 0], ['riser', T.wheel2, DURATION - 0.3, 0.04],
  ...Array.from({ length: 14 }, (_, i) => ['tick', +(T.wheel2 + 0.3 + i * 0.12).toFixed(2), 0.035]),
  ...bubbleCues(BUB), ...loopCues({ duration: DURATION, len: 0.5 }),
]
